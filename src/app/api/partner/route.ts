import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, agency, email, phone, model, website, message } = body;

  if (!name?.trim() || !agency?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not set');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const adminTo = process.env.ADMIN_NOTIFY_EMAIL || 'studio@pneumastudio.mx';

  const errors: string[] = [];

  try {
    await resend.emails.send({
      from,
      to: adminTo,
      subject: `🤝 Nueva solicitud de partnership: ${agency} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050D1A; color: #fff; border-radius: 12px; padding: 32px;">
          <h2 style="color: #00C4A0; margin-top: 0;">Nueva solicitud de Agencia Socia</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #8A9BB5; width: 140px;">Nombre</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #8A9BB5;">Agencia</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">${agency}</td></tr>
            <tr><td style="padding: 8px 0; color: #8A9BB5;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00C4A0;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #8A9BB5;">Teléfono</td><td style="padding: 8px 0;"><a href="https://wa.me/${phone.replace(/\D/g, '')}" style="color: #00C4A0;">${phone}</a></td></tr>` : ''}
            ${website ? `<tr><td style="padding: 8px 0; color: #8A9BB5;">Sitio web</td><td style="padding: 8px 0;"><a href="${website}" style="color: #00C4A0;">${website}</a></td></tr>` : ''}
            ${model ? `<tr><td style="padding: 8px 0; color: #8A9BB5;">Modelo</td><td style="padding: 8px 0; color: #00C4A0; font-weight: 600;">${model}</td></tr>` : ''}
          </table>
          ${message ? `
          <div style="margin-top: 24px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #00C4A0;">
            <p style="color: #8A9BB5; margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Mensaje</p>
            <p style="color: #fff; margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</p>
          </div>` : ''}
          <div style="margin-top: 24px;">
            <a href="mailto:${email}" style="display: inline-block; background: #00C4A0; color: #050D1A; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin-right: 8px;">Responder por Email</a>
            ${phone ? `<a href="https://wa.me/${phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(name)}%2C%20soy%20Nazre%20de%20Pneuma%20Studio.%20Vi%20tu%20solicitud%20de%20partnership%20y%20me%20gustar%C3%ADa%20agendar%20una%20llamada." style="display: inline-block; background: #25D366; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">WhatsApp</a>` : ''}
          </div>
          <p style="color: rgba(138,155,181,0.5); font-size: 11px; margin-top: 32px;">Enviado desde pneumastudio.mx · ${new Date().toLocaleString('es-MX', { timeZone: 'America/Monterrey' })}</p>
        </div>
      `,
    });
  } catch (err: any) {
    console.error('Resend partner admin error:', JSON.stringify(err));
    errors.push(`admin: ${err?.message ?? 'unknown'}`);
  }

  try {
    await resend.emails.send({
      from,
      to: email,
      subject: 'Recibimos tu solicitud de partnership — Pneuma Studio',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050D1A; color: #fff; border-radius: 12px; padding: 32px;">
          <h2 style="color: #00C4A0; margin-top: 0;">Hola, ${name.split(' ')[0]} 👋</h2>
          <p style="color: #C8D5E8; line-height: 1.7;">Recibimos la solicitud de partnership de <strong style="color: #fff;">${agency}</strong>. Revisaremos tu perfil y te contactaremos en <strong style="color: #fff;">menos de 24 horas</strong> para agendar una llamada de alineación.</p>
          <a href="https://wa.me/528116333559?text=Hola%20Nazre%2C%20acabo%20de%20enviar%20mi%20solicitud%20de%20partnership%20desde%20pneumastudio.mx" style="display: inline-block; margin-top: 16px; background: #25D366; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700;">Escribir por WhatsApp</a>
          <p style="color: rgba(138,155,181,0.6); font-size: 12px; margin-top: 32px;">Pneuma Studio · Monterrey, Nuevo León, México</p>
        </div>
      `,
    });
  } catch (err: any) {
    console.error('Resend partner prospect error:', JSON.stringify(err));
    errors.push(`prospect: ${err?.message ?? 'unknown'}`);
  }

  if (errors.length === 2) {
    return NextResponse.json({ error: 'Email delivery failed', details: errors }, { status: 500 });
  }

  return NextResponse.json({ ok: true, warnings: errors.length ? errors : undefined });
}
