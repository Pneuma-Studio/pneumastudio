import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import DisponibilidadClient from './DisponibilidadClient';

export default async function DisponibilidadPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  return <DisponibilidadClient />;
}
