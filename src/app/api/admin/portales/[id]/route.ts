import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { Resend } from 'resend';

const STAGE_LABELS: Record<string, string> = {
  propuesta: 'Propuesta',
  diseno: 'Diseño',
  desarrollo: 'Desarrollo',
  qa: 'QA / Revisión',
  lanzamiento: '¡Lanzamiento!',
};

const STAGE_DESCRIPTIONS: Record<string, string> = {
  propuesta: 'Estamos preparando la propuesta y estrategia para tu proyecto.',
  diseno: 'Estamos trabajando en el diseño visual y la experiencia de usuario.',
  desarrollo: 'El equipo está construyendo tu proyecto.',
  qa: 'Estamos revisando y probando que todo funcione perfectamente.',
  lanzamiento: 'Tu proyecto está listo y publicado. ¡Felicidades!',
};

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { stage, preview_url, notas } = body;

  const supabase = createAdminClient();

  // Get current record to detect stage change
  const { data: current } = await supabase
    .from('project_portals')
    .select('stage, client_email, project_name, client_name, token')
    .eq('id', id)
    .single();

  const updates: Record<string, any> = { updated_at: new Date().toISOString() };
  if (stage !== undefined) updates.stage = stage;
  if (preview_url !== undefined) updates.preview_url = preview_url?.trim() || null;
  if (notas !== undefined) updates.notas = notas?.trim() || null;

  const { data, error } = await supabase
    .from('project_portals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send email notification when stage changes and client_email is set
  if (
    stage !== undefined &&
    stage !== current?.stage &&
    current?.client_email &&
    process.env.RESEND_API_KEY
  ) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pneumastudio.mx'}/portal/${current.token}`;
      const stageLabel = STAGE_LABELS[stage] ?? stage;
      const stageDesc = STAGE_DESCRIPTIONS[stage] ?? '';
      const isLaunch = stage === 'lanzamiento';

      await resend.emails.send({
        from,
        to: current.client_email,
        subject: `${isLaunch ? '🚀 ' : ''}Tu proyecto avanzó a: ${stageLabel} — Pneuma Studio`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#050D1A;color:#fff;border-radius:12px;padding:32px;">
            <h2 style="color:#00C4A0;margin-top:0;">
              ${isLaunch ? '🚀 ' : ''}Actualización de tu proyecto
            </h2>
            <p style="color:#C8D5E8;line-height:1.7;">
              Hola <strong>${current.client_name}</strong>, tu proyecto
              <strong style="color:#fff;"> ${current.project_name}</strong> ha avanzado
              a una nueva etapa.
            </p>
            <div style="margin:24px 0;padding:20px;background:rgba(0,196,160,0.08);border:1px solid rgba(0,196,160,0.25);border-radius:10px;">
              <div style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#8A9BB5;margin-bottom:6px;">Etapa actual</div>
              <div style="font-size:22px;font-weight:700;color:#00C4A0;">${stageLabel}</div>
              <p style="color:#C8D5E8;margin:8px 0 0;font-size:14px;line-height:1.6;">${stageDesc}</p>
            </div>
            <a href="${portalUrl}" style="display:inline-block;background:#00C4A0;color:#050D1A;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
              Ver mi portal
            </a>
            <p style="color:rgba(138,155,181,0.6);font-size:11px;margin-top:32px;">
              Pneuma Studio · Monterrey, Nuevo León, México
            </p>
          </div>
        `,
      });
    } catch (emailErr: any) {
      console.error('[portales] Stage email error:', emailErr?.message);
    }
  }

  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const supabase = createAdminClient();
  const { error } = await supabase.from('project_portals').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
