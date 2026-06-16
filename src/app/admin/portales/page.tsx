import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import PortalesClient from './PortalesClient';

export default async function PortalesPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  return <PortalesClient />;
}
