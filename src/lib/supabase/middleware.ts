import { NextResponse, type NextRequest } from 'next/server';

const COOKIE_NAME = 'admin_session';

async function buildToken(): Promise<string> {
  const data = new TextEncoder().encode(
    `${process.env.ADMIN_EMAIL}:${process.env.ADMIN_PASSWORD}:pneumastudio`
  );
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;
  const expectedToken = await buildToken();
  const isAuthenticated = sessionCookie === expectedToken;

  if (isAdminRoute && !isLoginPage && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  if (isLoginPage && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request: { headers: request.headers } });
}
