import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import { getAllPagos, getAllClientes } from '@/lib/notion';
import PagosClient from './PagosClient';

export const dynamic = 'force-dynamic';

export default async function PagosPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const [pagos, clientes] = await Promise.all([
    getAllPagos().catch(() => []),
    getAllClientes().catch(() => []),
  ]);

  const clienteMap = Object.fromEntries(clientes.map(c => [c.id, c.nombre]));
  const enrichedPagos = pagos.map(p => ({ ...p, clienteNombre: clienteMap[p.clienteId] || 'Cliente desconocido' }));

  return <PagosClient pagos={enrichedPagos} />;
}
