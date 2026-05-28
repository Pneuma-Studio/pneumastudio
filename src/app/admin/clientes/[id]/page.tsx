import { notFound } from 'next/navigation';
import { getClienteById, getPagosByCliente } from '@/lib/notion';
import ClienteDetailClient from './ClienteDetailClient';

export const dynamic = 'force-dynamic';

export default async function ClienteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [cliente, pagos] = await Promise.all([
    getClienteById(id).catch(() => null),
    getPagosByCliente(id).catch(() => []),
  ]);

  if (!cliente) notFound();

  return <ClienteDetailClient cliente={cliente} pagos={pagos} />;
}
