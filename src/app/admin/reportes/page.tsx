import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getAllClientes, getAllPagos } from '@/lib/notion';
import ReportesClient from './ReportesClient';

export const dynamic = 'force-dynamic';

export default async function ReportesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase?.auth?.getUser();
  if (!user) redirect('/admin/login');

  const [clientes, pagos] = await Promise.all([
    getAllClientes()?.catch(() => []),
    getAllPagos()?.catch(() => []),
  ]);

  const clienteMap = Object.fromEntries(clientes?.map(c => [c?.id, c]));
  const enrichedPagos = pagos?.map(p => ({ ...p, clienteNombre: clienteMap?.[p?.clienteId]?.nombre || 'Desconocido' }));

  return <ReportesClient clientes={clientes} pagos={enrichedPagos} />;
}
