import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { updateCliente } from '@/lib/notion';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  try {
    await updateCliente(id, body);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[clientes PATCH]', err?.message);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
