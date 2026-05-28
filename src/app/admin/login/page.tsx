'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import LoginForm from './LoginForm';

export default async function AdminLoginPage() {
  // If already logged in, redirect to dashboard
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    redirect('/admin/dashboard');
  }

  async function loginAction(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      redirect('/admin/login?error=missing');
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      redirect('/admin/login?error=invalid');
    }

    redirect('/admin/dashboard');
  }

  return <LoginForm loginAction={loginAction} />;
}
