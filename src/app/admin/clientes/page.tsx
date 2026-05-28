import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getAllClientes } from '@/lib/notion';
import ClientesListClient from './ClientesListClient';

export const dynamic = 'force-dynamic';

export default async function ClientesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase?.auth?.getUser();
  if (!user) redirect('/admin/login');

  const clientes = await getAllClientes()?.catch(() => []);

  return <ClientesListClient clientes={clientes} />;
}
