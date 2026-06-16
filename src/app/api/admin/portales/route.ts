import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { randomBytes } from 'crypto';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('project_portals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { client_name, project_name, stage, preview_url, notas, client_email, notion_client_id } = body;

  if (!client_name?.trim() || !project_name?.trim()) {
    return NextResponse.json({ error: 'Nombre de cliente y proyecto son requeridos' }, { status: 400 });
  }

  const token = randomBytes(16).toString('hex');

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('project_portals')
    .insert({
      token,
      client_name: client_name.trim(),
      project_name: project_name.trim(),
      stage: stage ?? 'propuesta',
      preview_url: preview_url?.trim() || null,
      notas: notas?.trim() || null,
      client_email: client_email?.trim() || null,
      notion_client_id: notion_client_id?.trim() || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
