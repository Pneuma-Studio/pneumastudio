import { getAllClientes } from '@/lib/notion';
import ClientesListClient from './ClientesListClient';

export const dynamic = 'force-dynamic';

export default async function ClientesPage() {
  const clientes = await getAllClientes().catch(() => []);
  return <ClientesListClient clientes={clientes} />;
}
