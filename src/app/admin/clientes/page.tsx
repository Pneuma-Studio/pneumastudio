import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import { getAllClientes } from '@/lib/notion';
import ClientesListClient from './ClientesListClient';

export const dynamic = 'force-dynamic';

export default async function ClientesPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const clientes = await getAllClientes().catch(() => []);
  return <ClientesListClient clientes={clientes} />;
}
