import { NextRequest, NextResponse } from 'next/server';
import { createCliente, createPago, getAllClientes } from '@/lib/notion';
import { getAdminSession } from '@/lib/admin-auth';
import { logAudit } from '@/lib/supabase/audit';
import { Resend } from 'resend';
import type { PagoTipo } from '@/lib/notion';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const clientes = await getAllClientes().catch(() => []);
  return NextResponse.json(
    clientes.map(c => ({ id: c.id, nombre: c.nombre, empresa: c.empresa }))
  );
}

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'Pneuma Studio <studio@pneumastudio.mx>';

interface PlanItem {
  tipo: PagoTipo;
  monto: number;
  fecha: string;
}

async function sendWelcomeEmail(nombre: string, email: string, empresa: string, paquete: string) {
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Bienvenido a Pneuma Studio, ${nombre.split(' ')[0]}`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#050D1A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#E2E8F0;">
  <div style="max-width:560px;margin:40px auto;padding:0 20px;">
    <div style="background:#0A1628;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
      <div style="padding:36px 36px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
        <p style="font-size:12px;color:#00C4A0;font-weight:600;letter-spacing:1px;margin:0 0 10px;">PNEUMA STUDIO</p>
        <h1 style="font-size:24px;font-weight:700;color:#FFFFFF;margin:0 0 8px;">¡Bienvenido, ${nombre.split(' ')[0]}!</h1>
        <p style="font-size:14px;color:#8A9BB5;margin:0;">Estamos emocionados de trabajar contigo.</p>
      </div>
      <div style="padding:32px 36px;">
        <p style="color:#8A9BB5;line-height:1.7;margin:0 0 24px;">
          Hola <strong style="color:#fff;">${nombre}</strong>, tu cuenta en Pneuma Studio ha sido creada exitosamente${empresa ? ` para <strong style="color:#fff;">${empresa}</strong>` : ''}.
        </p>

        <div style="background:rgba(0,196,160,0.06);border:1px solid rgba(0,196,160,0.15);border-radius:12px;padding:20px;margin-bottom:24px;">
          <p style="font-size:11px;font-weight:600;color:#00C4A0;letter-spacing:0.5px;margin:0 0 12px;text-transform:uppercase;">Tu plan</p>
          <p style="font-size:18px;font-weight:700;color:#ffffff;margin:0;">${paquete}</p>
        </div>

        <p style="color:#8A9BB5;line-height:1.7;margin:0 0 24px;font-size:14px;">
          En los próximos días te contactaremos para coordinar el inicio de tu proyecto. Mientras tanto, si tienes alguna pregunta no dudes en escribirnos.
        </p>

        <a href="https://wa.me/528116333559" style="display:inline-block;background:#00C4A0;color:#050D1A;padding:12px 24px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:700;margin-bottom:8px;">
          Contáctanos por WhatsApp
        </a>
      </div>
      <div style="padding:16px 36px;border-top:1px solid rgba(255,255,255,0.06);">
        <p style="margin:0;font-size:11px;color:rgba(138,155,181,0.5);text-align:center;">
          Pneuma Studio · Monterrey, NL · <a href="https://pneumastudio.mx" style="color:rgba(0,196,160,0.6);text-decoration:none;">pneumastudio.mx</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`,
    });
  } catch {
    // Welcome email failure is non-fatal
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();

    const cliente = await createCliente({
      nombre: body.nombre,
      empresa: body.empresa || '',
      email: body.email,
      whatsapp: body.whatsapp || '',
      paquete: body.paquete,
      addons: body.addons || [],
      moneda: body.moneda,
      inversionInicial: body.inversionInicial || 0,
      mensualidad: body.mensualidad,
      fechaInicio: body.fechaInicio,
      fechaCobro: body.fechaCobro,
      estado: body.estado,
      metodoPago: body.metodoPago,
      pasarelaPago: body.pasarelaPago || '',
      stripeCustomerId: body.stripeCustomerId || '',
      notas: body.notas || '',
      empresaDescripcion: body.empresaDescripcion || '',
      empresaGiro: body.empresaGiro || '',
      empresaSitioWeb: body.empresaSitioWeb || '',
    });

    const planPago: PlanItem[] = body.planPago ?? [];

    if (planPago.length > 0) {
      for (const item of planPago) {
        if (item.monto > 0) {
          await createPago({
            clienteId: cliente.id,
            tipo: item.tipo,
            monto: item.monto,
            moneda: body.moneda,
            fechaCobro: item.fecha,
            estado: 'Pendiente',
            metodo: body.metodoPago,
          });
        }
      }
    } else if (body.inversionInicial > 0) {
      await createPago({
        clienteId: cliente.id,
        tipo: 'Anticipo',
        monto: body.inversionInicial * 0.5,
        moneda: body.moneda,
        fechaCobro: body.fechaInicio,
        estado: 'Pendiente',
        metodo: body.metodoPago,
      });
    }

    // Welcome email (non-blocking)
    if (body.email) {
      sendWelcomeEmail(body.nombre, body.email, body.empresa || '', body.paquete);
    }

    // Audit log (non-blocking)
    logAudit({
      entity_type: 'cliente',
      entity_id: cliente.id,
      entity_name: body.nombre,
      action: 'create',
      details: { paquete: body.paquete, estado: body.estado, moneda: body.moneda },
    });

    return NextResponse.json({ cliente }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating cliente:', error);
    return NextResponse.json({ error: error.message || 'Error interno' }, { status: 500 });
  }
}
