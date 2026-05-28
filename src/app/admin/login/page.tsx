'use server';

import { redirect } from 'next/navigation';
import { getAdminSession, setAdminSession } from '@/lib/admin-auth';
import LoginForm from './LoginForm';

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect('/admin/dashboard');

  async function loginAction(formData: FormData) {
    'use server';
    const email = (formData.get('email') as string)?.trim();
    const password = formData.get('password') as string;

    if (!email || !password) {
      redirect('/admin/login?error=missing');
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      redirect('/admin/login?error=invalid');
    }

    await setAdminSession();
    redirect('/admin/dashboard');
  }

  return <LoginForm loginAction={loginAction} />;
}
