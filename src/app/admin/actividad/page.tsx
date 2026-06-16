import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import ActividadClient from './ActividadClient';

export const dynamic = 'force-dynamic';

export default async function ActividadPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  return <ActividadClient />;
}
