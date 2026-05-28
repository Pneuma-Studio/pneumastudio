'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface LoginFormProps {
  loginAction: (formData: FormData) => Promise<void>;
}

function LoginFormInner({ loginAction }: LoginFormProps) {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');

  const errorMessage =
    errorParam === 'invalid' ?'Credenciales incorrectas. Verifica tu email y contraseña.'
      : errorParam === 'missing' ?'Por favor ingresa tu email y contraseña.'
      : null;

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#050D1A' }}>
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,196,160,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,160,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-md mx-4">
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(0,196,160,0.12)', border: '1px solid rgba(0,196,160,0.3)' }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="#00C4A0" strokeWidth="2" fill="none" />
                <path d="M16 10L22 13V19L16 22L10 19V13L16 10Z" fill="#00C4A0" fillOpacity="0.3" />
                <circle cx="16" cy="16" r="3" fill="#00C4A0" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">Pneuma Studio</h1>
            <p className="text-sm mt-1" style={{ color: '#8A9BB5' }}>
              Panel de Administración
            </p>
          </div>

          {/* Form */}
          <form action={loginAction} className="space-y-4" suppressHydrationWarning>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#8A9BB5' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="pneumastudiomx@gmail.com"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#8A9BB5' }}>
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
            </div>

            {errorMessage && (
              <div
                className="px-4 py-3 rounded-xl text-sm"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#EF4444',
                }}
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all mt-2"
              style={{ background: '#00C4A0', color: '#050D1A', cursor: 'pointer' }}
            >
              Iniciar sesión
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: '#8A9BB5' }}>
            Acceso restringido · Solo uso interno
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginForm({ loginAction }: LoginFormProps) {
  return (
    <Suspense fallback={null}>
      <LoginFormInner loginAction={loginAction} />
    </Suspense>
  );
}
