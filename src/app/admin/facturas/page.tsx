import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import FacturasClient from './FacturasClient';

export const dynamic = 'force-dynamic';

export default async function FacturasPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  return <FacturasClient />;
}
