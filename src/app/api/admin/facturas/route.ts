import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase().trim();

  const supabase = createAdminClient();

  let query = supabase
    .from('facturas')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const results = q
    ? (data ?? []).filter(f =>
        f.client_name?.toLowerCase().includes(q) ||
        f.numero_factura?.toLowerCase().includes(q)
      )
    : (data ?? []);

  return NextResponse.json(results);
}
