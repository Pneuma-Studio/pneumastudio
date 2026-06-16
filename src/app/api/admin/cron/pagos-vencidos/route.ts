import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { getAllPagos, getClienteById } from '@/lib/notion';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'Pneuma Studio <hola@pneumastudio.mx>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hola@pneumastudio.mx';

function fmtDate(d: string) {
  if (!d) return d;
  const [y, m, day] = d.split('-');
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${day}/${months[parseInt(m)-1]}/${y}`;
}

function fmt(n: number) {
  return n.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

async function run() {
  const today = new Date().toISOString().split('T')[0];

  // Fetch all pagos and filter overdue ones
  const allPagos = await getAllPagos();
  const vencidos = allPagos.filter(
    p => p.estado === 'Pendiente' && p.fechaCobro && p.fechaCobro < today
  );

  if (vencidos.length === 0) {
    return { ok: true, enviados: 0, resultados: [], mensaje: 'Sin pagos vencidos' };
  }

  // Group by clienteId
  const byCliente: Record<string, typeof vencidos> = {};
  for (const p of vencidos) {
    if (!byCliente[p.clienteId]) byCliente[p.clienteId] = [];
    byCliente[p.clienteId].push(p);
  }

  const resultados: { cliente: string; email: string; pagos: number; ok: boolean; error?: string }[] = [];
  let enviados = 0;

  for (const [clienteId, pagos] of Object.entries(byCliente)) {
    const cliente = await getClienteById(clienteId);
    const email = cliente?.email;
    const nombre = cliente?.nombre ?? pagos[0].clienteNombre ?? 'Cliente';

    if (!email) {
      resultados.push({ cliente: nombre, email: '', pagos: pagos.length, ok: false, error: 'Sin email' });
      continue;
    }

    const pagosList = pagos
      .map(p => `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #1a2a40;">${fmtDate(p.fechaCobro)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #1a2a40;">${p.tipo}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #1a2a40;font-weight:600;">$${fmt(p.monto)} ${p.moneda}</td>
      </tr>`)
      .join('');

    const total = pagos.reduce((s, p) => s + p.monto, 0);
    const moneda = pagos[0].moneda;

    try {
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: `Recordatorio de pago pendiente — Pneuma Studio`,
        html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#050D1A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#E2E8F0;">
  <div style="max-width:540px;margin:40px auto;padding:0 20px;">
    <div style="background:#0A1628;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
      <div style="padding:32px 32px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
        <p style="font-size:12px;color:#00C4A0;font-weight:600;letter-spacing:1px;margin:0 0 8px;">PNEUMA STUDIO</p>
        <h1 style="font-size:22px;font-weight:700;color:#FFFFFF;margin:0;">Recordatorio de pago</h1>
      </div>
      <div style="padding:28px 32px;">
        <p style="margin:0 0 20px;color:#8A9BB5;">Hola <strong style="color:#fff;">${nombre}</strong>,</p>
        <p style="margin:0 0 24px;color:#8A9BB5;line-height:1.6;">Tenemos registrado${pagos.length > 1 ? 's' : ''} ${pagos.length} pago${pagos.length > 1 ? 's' : ''} pendiente${pagos.length > 1 ? 's' : ''} en tu cuenta. Si ya realizaste el pago, por favor ignora este mensaje.</p>

        <table style="width:100%;border-collapse:collapse;background:rgba(255,255,255,0.03);border-radius:10px;overflow:hidden;margin-bottom:24px;">
          <thead>
            <tr style="background:rgba(255,255,255,0.05);">
              <th style="padding:10px 12px;text-align:left;font-size:11px;color:#8A9BB5;font-weight:500;">Fecha</th>
              <th style="padding:10px 12px;text-align:left;font-size:11px;color:#8A9BB5;font-weight:500;">Tipo</th>
              <th style="padding:10px 12px;text-align:left;font-size:11px;color:#8A9BB5;font-weight:500;">Monto</th>
            </tr>
          </thead>
          <tbody style="color:#E2E8F0;font-size:13px;">
            ${pagosList}
          </tbody>
          ${pagos.length > 1 ? `<tfoot>
            <tr style="background:rgba(0,196,160,0.07);">
              <td colspan="2" style="padding:10px 12px;font-size:13px;color:#8A9BB5;">Total</td>
              <td style="padding:10px 12px;font-size:14px;font-weight:700;color:#00C4A0;">$${fmt(total)} ${moneda}</td>
            </tr>
          </tfoot>` : ''}
        </table>

        <p style="margin:0 0 8px;color:#8A9BB5;font-size:13px;">Para realizar tu pago o si tienes alguna duda, contáctanos:</p>
        <a href="https://wa.me/528112803360" style="display:inline-block;background:rgba(0,196,160,0.15);color:#00C4A0;padding:10px 20px;border-radius:10px;text-decoration:none;font-size:13px;font-weight:600;border:1px solid rgba(0,196,160,0.3);">
          Contactar por WhatsApp
        </a>
      </div>
      <div style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);">
        <p style="margin:0;font-size:11px;color:rgba(138,155,181,0.5);text-align:center;">Pneuma Studio · Monterrey, NL · pneumastudio.mx</p>
      </div>
    </div>
  </div>
</body>
</html>`,
      });
      enviados++;
      resultados.push({ cliente: nombre, email, pagos: pagos.length, ok: true });
    } catch (err: any) {
      resultados.push({ cliente: nombre, email, pagos: pagos.length, ok: false, error: err.message });
    }
  }

  // Admin summary email
  const summaryRows = resultados
    .map(r => `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #1a2a40;">${r.cliente}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #1a2a40;">${r.email || '—'}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #1a2a40;text-align:center;">${r.pagos}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #1a2a40;color:${r.ok ? '#22C55E' : '#EF4444'};">${r.ok ? '✓ Enviado' : `✗ ${r.error}`}</td>
    </tr>`)
    .join('');

  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `[Admin] Recordatorios enviados — ${vencidos.length} pagos vencidos`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#050D1A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#E2E8F0;">
  <div style="max-width:600px;margin:40px auto;padding:0 20px;">
    <div style="background:#0A1628;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
      <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
        <p style="font-size:11px;color:#00C4A0;font-weight:600;letter-spacing:1px;margin:0 0 6px;">PNEUMA STUDIO · ADMIN</p>
        <h1 style="font-size:18px;font-weight:700;color:#FFFFFF;margin:0;">Resumen de recordatorios de pago</h1>
        <p style="font-size:12px;color:#8A9BB5;margin:4px 0 0;">${new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div style="padding:24px 28px;">
        <div style="display:flex;gap:16px;margin-bottom:24px;flex-wrap:wrap;">
          <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:14px 20px;">
            <div style="font-size:22px;font-weight:700;color:#EF4444;">${vencidos.length}</div>
            <div style="font-size:11px;color:#8A9BB5;margin-top:2px;">Pagos vencidos</div>
          </div>
          <div style="background:rgba(0,196,160,0.1);border:1px solid rgba(0,196,160,0.2);border-radius:10px;padding:14px 20px;">
            <div style="font-size:22px;font-weight:700;color:#00C4A0;">${enviados}</div>
            <div style="font-size:11px;color:#8A9BB5;margin-top:2px;">Emails enviados</div>
          </div>
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px 20px;">
            <div style="font-size:22px;font-weight:700;color:#fff;">${Object.keys(byCliente).length}</div>
            <div style="font-size:11px;color:#8A9BB5;margin-top:2px;">Clientes afectados</div>
          </div>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="background:rgba(255,255,255,0.04);">
              <th style="padding:10px 12px;text-align:left;font-size:11px;color:#8A9BB5;font-weight:500;">Cliente</th>
              <th style="padding:10px 12px;text-align:left;font-size:11px;color:#8A9BB5;font-weight:500;">Email</th>
              <th style="padding:10px 12px;text-align:center;font-size:11px;color:#8A9BB5;font-weight:500;">Pagos</th>
              <th style="padding:10px 12px;text-align:left;font-size:11px;color:#8A9BB5;font-weight:500;">Estado</th>
            </tr>
          </thead>
          <tbody>
            ${summaryRows}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</body>
</html>`,
    });
  } catch {
    // Admin email failure is non-fatal
  }

  return { ok: true, enviados, resultados };
}

async function authorize(req: NextRequest): Promise<boolean> {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get('authorization');
    if (authHeader === `Bearer ${cronSecret}`) return true;
  }
  const session = await getAdminSession();
  return !!session;
}

export async function GET(req: NextRequest) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const result = await run();
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[cron/pagos-vencidos]', err?.message);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const result = await run();
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[cron/pagos-vencidos]', err?.message);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
