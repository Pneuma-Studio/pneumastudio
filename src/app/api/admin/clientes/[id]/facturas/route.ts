import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { createAdminClient } from '@/lib/supabase/admin';

const BUCKET = 'facturas';
type Params = { params: Promise<{ id: string }> };

async function ensureBucket(supabase: ReturnType<typeof createAdminClient>) {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.some(b => b.name === BUCKET)) {
    await supabase.storage.createBucket(BUCKET, { public: false });
  }
}

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('facturas')
    .select('*')
    .eq('notion_client_id', id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const supabase = createAdminClient();
  await ensureBucket(supabase);

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const numero = (formData.get('numero') as string)?.trim();
  const monto = parseFloat(formData.get('monto') as string) || 0;
  const moneda = (formData.get('moneda') as string) || 'MXN';
  const fecha = (formData.get('fecha') as string) || null;

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  if (!numero) return NextResponse.json({ error: 'Número de factura requerido' }, { status: 400 });

  // Get client name for metadata
  const { data: clientRow } = await supabase
    .from('facturas')
    .select('client_name')
    .eq('notion_client_id', id)
    .limit(1)
    .single();

  const sanitized = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filename = `${Date.now()}__${numero.replace(/[^a-zA-Z0-9-]/g, '_')}__${sanitized}`;
  const path = `${id}/${filename}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, arrayBuffer, { contentType: file.type, upsert: false });

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  // Get client_name from body if not in table yet
  const clientName = (formData.get('client_name') as string) || clientRow?.client_name || id;

  const { data: inserted, error: dbError } = await supabase
    .from('facturas')
    .insert({
      notion_client_id: id,
      client_name: clientName,
      numero_factura: numero,
      monto,
      moneda,
      fecha_factura: fecha || null,
      path,
      original_name: file.name,
      size: file.size,
    })
    .select()
    .single();

  if (dbError) {
    await supabase.storage.from(BUCKET).remove([path]);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json(inserted, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();
  const { id: facturaId, path } = await req.json();

  if (path) {
    await supabase.storage.from(BUCKET).remove([path]);
  }
  if (facturaId) {
    await supabase.from('facturas').delete().eq('id', facturaId);
  }

  return NextResponse.json({ ok: true });
}
