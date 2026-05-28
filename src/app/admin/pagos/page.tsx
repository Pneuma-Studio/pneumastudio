import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getAllPagos, getAllClientes } from '@/lib/notion';
import PagosClient from './PagosClient';

export const dynamic = 'force-dynamic';

export default async function PagosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase?.auth?.getUser();
  if (!user) redirect('/admin/login');

  const [pagos, clientes] = await Promise.all([
    getAllPagos()?.catch(() => []),
    getAllClientes()?.catch(() => []),
  ]);

  // Enrich pagos with client names
  const clienteMap = Object.fromEntries(clientes?.map(c => [c?.id, c?.nombre]));
  const enrichedPagos = pagos?.map(p => ({ ...p, clienteNombre: clienteMap?.[p?.clienteId] || 'Cliente desconocido' }));

  return <PagosClient pagos={enrichedPagos} />;
}
