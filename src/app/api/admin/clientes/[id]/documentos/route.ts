import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { createAdminClient } from '@/lib/supabase/admin';

const BUCKET = 'documentos';

async function ensureBucket(supabase: ReturnType<typeof createAdminClient>) {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === BUCKET);
  if (!exists) {
    await supabase.storage.createBucket(BUCKET, { public: false });
  }
}

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const supabase = createAdminClient();

  await ensureBucket(supabase);

  const { data, error } = await supabase.storage.from(BUCKET).list(id, {
    sortBy: { column: 'created_at', order: 'desc' },
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const docs = (data ?? [])
    .filter(f => f.name !== '.emptyFolderPlaceholder')
    .map(f => {
      // filename format: {timestamp}__{tipo}__{originalName}
      const parts = f.name.split('__');
      const tipo = parts.length >= 3 ? parts[1] : 'Documento';
      const originalName = parts.length >= 3 ? parts.slice(2).join('__') : f.name;
      return {
        path: `${id}/${f.name}`,
        name: f.name,
        originalName,
        tipo,
        size: f.metadata?.size ?? 0,
        createdAt: f.created_at ?? f.updated_at ?? '',
      };
    });

  return NextResponse.json(docs);
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const supabase = createAdminClient();

  await ensureBucket(supabase);

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const tipo = (formData.get('tipo') as string) || 'Documento';

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const sanitized = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filename = `${Date.now()}__${tipo}__${sanitized}`;
  const path = `${id}/${filename}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, arrayBuffer, { contentType: file.type, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: signedData } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 3600);

  return NextResponse.json({
    path,
    name: filename,
    originalName: file.name,
    tipo,
    size: file.size,
    createdAt: new Date().toISOString(),
    url: signedData?.signedUrl ?? '',
  });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await params;
  const supabase = createAdminClient();
  const { path } = await req.json();

  if (!path) return NextResponse.json({ error: 'No path provided' }, { status: 400 });

  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
