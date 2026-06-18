import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createHmac } from 'crypto';

export const dynamic = 'force-dynamic';

const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function toDateMX(isoDate: string) {
  return new Date(isoDate).toLocaleDateString('en-CA', { timeZone: 'America/Monterrey' });
}

function toMonthLabel(fecha: string) {
  const [y, m] = fecha.split('-');
  return `${MONTHS_ES[parseInt(m) - 1]} ${y}`;
}

async function syncTakenSlots(supabase: ReturnType<typeof createAdminClient>, label: string) {
  const mIdx = MONTHS_ES.findIndex(m => label.startsWith(m));
  if (mIdx === -1) return;
  const year = parseInt(label.split(' ')[1]);
  const month = mIdx + 1;
  const from = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const to = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  const { count } = await supabase
    .from('calendar_events')
    .select('*', { count: 'exact', head: true })
    .gte('fecha', from)
    .lte('fecha', to);

  const taken = count ?? 0;
  const { data: existing } = await supabase
    .from('availability_slots')
    .select('id')
    .eq('month_label', label)
    .eq('is_active', true)
    .maybeSingle();

  if (existing) {
    await supabase.from('availability_slots').update({ taken_slots: taken }).eq('id', existing.id);
  } else {
    await supabase.from('availability_slots').insert({ month_label: label, total_slots: 5, taken_slots: taken, is_active: true });
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (secret) {
    const sig = req.headers.get('x-cal-signature-256') ?? '';
    const expected = 'sha256=' + createHmac('sha256', secret).update(rawBody).digest('hex');
    if (sig !== expected) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  let body: any;
  try { body = JSON.parse(rawBody); } catch { return NextResponse.json({ ok: true }); }

  const { triggerEvent, payload } = body ?? {};
  if (!triggerEvent || !payload) return NextResponse.json({ ok: true });

  const supabase = createAdminClient();
  const bookingUid = payload.uid as string | undefined;

  // ── New booking ──────────────────────────────────────────────────────────────
  if (triggerEvent === 'BOOKING_CREATED') {
    if (!bookingUid) return NextResponse.json({ ok: true });

    // Idempotency: skip if already registered
    const { data: dup } = await supabase
      .from('calendar_events')
      .select('id')
      .eq('cal_booking_uid', bookingUid)
      .maybeSingle();
    if (dup) return NextResponse.json({ ok: true, skipped: true });

    const fecha = toDateMX(payload.startTime);
    const attendee = (payload.attendees?.[0]?.name as string) ?? 'Cliente';
    const nombre = `${attendee} · Cita`;

    await supabase.from('calendar_events').insert({ nombre, fecha, cal_booking_uid: bookingUid });
    await syncTakenSlots(supabase, toMonthLabel(fecha));
  }

  // ── Cancellation ─────────────────────────────────────────────────────────────
  if (triggerEvent === 'BOOKING_CANCELLED') {
    if (!bookingUid) return NextResponse.json({ ok: true });

    const { data: ev } = await supabase
      .from('calendar_events')
      .select('fecha')
      .eq('cal_booking_uid', bookingUid)
      .maybeSingle();

    if (ev) {
      await supabase.from('calendar_events').delete().eq('cal_booking_uid', bookingUid);
      await syncTakenSlots(supabase, toMonthLabel(ev.fecha));
    }
  }

  // ── Reschedule (Cal.com also fires CANCELLED + CREATED, but handle explicitly) ─
  if (triggerEvent === 'BOOKING_RESCHEDULED') {
    if (!bookingUid) return NextResponse.json({ ok: true });

    const newFecha = toDateMX(payload.startTime);
    const { data: ev } = await supabase
      .from('calendar_events')
      .select('fecha')
      .eq('cal_booking_uid', bookingUid)
      .maybeSingle();

    if (ev) {
      const oldLabel = toMonthLabel(ev.fecha);
      const newLabel = toMonthLabel(newFecha);
      await supabase.from('calendar_events').update({ fecha: newFecha }).eq('cal_booking_uid', bookingUid);
      await syncTakenSlots(supabase, oldLabel);
      if (oldLabel !== newLabel) await syncTakenSlots(supabase, newLabel);
    }
  }

  return NextResponse.json({ ok: true });
}
