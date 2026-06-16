import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import LeadsClient from './LeadsClient';

export default async function LeadsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  return <LeadsClient />;
}
