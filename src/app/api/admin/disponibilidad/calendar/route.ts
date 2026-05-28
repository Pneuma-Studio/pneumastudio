import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { createAdminClient } from '@/lib/supabase/admin';

const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function monthRange(monthLabel: string): { from: string; to: string } | null {
  const parts = monthLabel.trim().split(' ');
  if (parts.length !== 2) return null;
  const mIdx = MONTHS_ES.findIndex(m => m.toLowerCase() === parts[0].toLowerCase());
  if (mIdx === -1) return null;
  const year = parseInt(parts[1]);
  const month = mIdx + 1;
  const from = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const to = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
  return { from, to };
}

// Recount events for a month and sync taken_slots in availability_slots
async function syncTakenSlots(supabase: ReturnType<typeof createAdminClient>, monthLabel: string) {
  const range = monthRange(monthLabel);
  if (!range) return;

  const { count } = await supabase
    .from('calendar_events')
    .select('*', { count: 'exact', head: true })
    .gte('fecha', range.from)
    .lte('fecha', range.to);

  const taken = count ?? 0;

  const { data: existing } = await supabase
    .from('availability_slots')
    .select('id')
    .eq('month_label', monthLabel)
    .eq('is_active', true)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('availability_slots')
      .update({ taken_slots: taken })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('availability_slots')
      .insert({ month_label: monthLabel, total_slots: 5, taken_slots: taken, is_active: true });
  }
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const monthLabel = searchParams.get('mes') ?? '';
  const range = monthRange(monthLabel);
  if (!range) return NextResponse.json([]);

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .gte('fecha', range.from)
    .lte('fecha', range.to)
    .order('fecha', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { nombre, fecha } = await req.json();
  if (!nombre || !fecha) return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('calendar_events')
    .insert({ nombre, fecha })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const date = new Date(fecha + 'T12:00:00');
  const monthLabel = `${MONTHS_ES[date.getMonth()]} ${date.getFullYear()}`;
  await syncTakenSlots(supabase, monthLabel);

  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'No id' }, { status: 400 });

  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from('calendar_events')
    .select('fecha')
    .eq('id', id)
    .single();

  const { error } = await supabase.from('calendar_events').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (existing?.fecha) {
    const date = new Date(existing.fecha + 'T12:00:00');
    const monthLabel = `${MONTHS_ES[date.getMonth()]} ${date.getFullYear()}`;
    await syncTakenSlots(supabase, monthLabel);
  }

  return NextResponse.json({ ok: true });
}
