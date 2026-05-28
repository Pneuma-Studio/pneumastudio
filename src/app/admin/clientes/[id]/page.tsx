import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getClienteById, getPagosByCliente } from '@/lib/notion';
import ClienteDetailClient from './ClienteDetailClient';

export const dynamic = 'force-dynamic';

export default async function ClienteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const [cliente, pagos] = await Promise.all([
    getClienteById(id).catch(() => null),
    getPagosByCliente(id).catch(() => []),
  ]);

  if (!cliente) notFound();

  return <ClienteDetailClient cliente={cliente} pagos={pagos} />;
}
