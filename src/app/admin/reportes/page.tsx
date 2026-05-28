import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import { getAllClientes, getAllPagos } from '@/lib/notion';
import ReportesClient from './ReportesClient';

export const dynamic = 'force-dynamic';

export default async function ReportesPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const [clientes, pagos] = await Promise.all([
    getAllClientes().catch(() => []),
    getAllPagos().catch(() => []),
  ]);

  const clienteMap = Object.fromEntries(clientes.map(c => [c.id, c]));
  const enrichedPagos = pagos.map(p => ({ ...p, clienteNombre: clienteMap[p.clienteId]?.nombre || 'Desconocido' }));

  return <ReportesClient clientes={clientes} pagos={enrichedPagos} />;
}
