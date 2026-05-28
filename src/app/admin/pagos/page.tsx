import { getAllPagos, getAllClientes } from '@/lib/notion';
import PagosClient from './PagosClient';

export const dynamic = 'force-dynamic';

export default async function PagosPage() {
  const [pagos, clientes] = await Promise.all([
    getAllPagos().catch(() => []),
    getAllClientes().catch(() => []),
  ]);

  const clienteMap = Object.fromEntries(clientes.map(c => [c.id, c.nombre]));
  const enrichedPagos = pagos.map(p => ({ ...p, clienteNombre: clienteMap[p.clienteId] || 'Cliente desconocido' }));

  return <PagosClient pagos={enrichedPagos} />;
}
