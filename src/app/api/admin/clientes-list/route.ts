import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { getAllClientes } from '@/lib/notion';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const clientes = await getAllClientes().catch(() => []);
  return NextResponse.json(
    clientes.map(c => ({
      id: c.id,
      nombre: c.nombre,
      empresa: c.empresa,
      estado: c.estado,
      paquete: c.paquete,
    }))
  );
}
