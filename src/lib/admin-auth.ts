import { cookies } from 'next/headers';
import { createHash } from 'crypto';

const COOKIE_NAME = 'admin_session';

function buildToken(): string {
  return createHash('sha256')
    .update(`${process.env.ADMIN_EMAIL}:${process.env.ADMIN_PASSWORD}:pneumastudio`)
    .digest('hex');
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const store = await cookies();
  const val = store.get(COOKIE_NAME)?.value;
  return val === buildToken() ? { email: process.env.ADMIN_EMAIL as string } : null;
}

export async function setAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, buildToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
