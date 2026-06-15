import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json();
  const { name, company, email, phone, service, budget, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
  }

  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const to = process.env.ADMIN_NOTIFY_EMAIL || 'pneumastudiomx@gmail.com';

  try {
    await resend.emails.send({
      from,
      to,
      subject: `🚀 Nuevo prospecto: ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050D1A; color: #fff; border-radius: 12px; padding: 32px;">
          <h2 style="color: #00C4A0; margin-top: 0;">Nuevo prospecto desde pneumastudio.mx</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #8A9BB5; width: 140px;">Nombre</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">${name}</td></tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #8A9BB5;">Empresa</td><td style="padding: 8px 0; color: #fff;">${company}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #8A9BB5;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00C4A0;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #8A9BB5;">Teléfono</td><td style="padding: 8px 0;"><a href="https://wa.me/${phone.replace(/\D/g, '')}" style="color: #00C4A0;">${phone}</a></td></tr>` : ''}
            ${service ? `<tr><td style="padding: 8px 0; color: #8A9BB5;">Servicio</td><td style="padding: 8px 0; color: #fff;">${service}</td></tr>` : ''}
            ${budget ? `<tr><td style="padding: 8px 0; color: #8A9BB5;">Presupuesto</td><td style="padding: 8px 0; color: #00C4A0; font-weight: 600;">${budget}</td></tr>` : ''}
          </table>
          <div style="margin-top: 24px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #00C4A0;">
            <p style="color: #8A9BB5; margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Mensaje</p>
            <p style="color: #fff; margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <div style="margin-top: 24px; display: flex; gap: 12px;">
            <a href="mailto:${email}" style="display: inline-block; background: #00C4A0; color: #050D1A; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">Responder por Email</a>
            ${phone ? `<a href="https://wa.me/${phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(name)}%2C%20soy%20Nazre%20de%20Pneuma%20Studio.%20Vi%20tu%20solicitud%20y%20me%20gustar%C3%ADa%20platicar%20contigo." style="display: inline-block; background: #25D366; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">Responder por WhatsApp</a>` : ''}
          </div>
          <p style="color: rgba(138,155,181,0.5); font-size: 11px; margin-top: 32px;">Enviado desde pneumastudio.mx · ${new Date().toLocaleString('es-MX', { timeZone: 'America/Monterrey' })}</p>
        </div>
      `,
    });

    // Confirmation email to the prospect
    await resend.emails.send({
      from,
      to: email,
      subject: 'Recibimos tu mensaje — Pneuma Studio',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050D1A; color: #fff; border-radius: 12px; padding: 32px;">
          <h2 style="color: #00C4A0; margin-top: 0;">Hola, ${name.split(' ')[0]} 👋</h2>
          <p style="color: #C8D5E8; line-height: 1.7;">Recibimos tu mensaje y te responderemos en <strong style="color: #fff;">menos de 24 horas</strong>. Mientras tanto, si tienes alguna pregunta urgente puedes escribirnos directamente por WhatsApp.</p>
          <a href="https://wa.me/528112803360?text=Hola%20Nazre%2C%20acabo%20de%20llenar%20el%20formulario%20de%20contacto%20en%20pneumastudio.mx" style="display: inline-block; margin-top: 16px; background: #25D366; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700;">Escribir por WhatsApp</a>
          <p style="color: rgba(138,155,181,0.6); font-size: 12px; margin-top: 32px;">Pneuma Studio · Monterrey, Nuevo León, México</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Error al enviar email' }, { status: 500 });
  }
}
