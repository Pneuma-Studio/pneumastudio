'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';

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
            <Image
              src="/assets/images/pneuma-studio-icon.png"
              alt="Pneuma Studio"
              width={72}
              height={63}
              className="object-contain mb-3"
              priority
            />
            <Image
              src="/assets/images/pneuma-studio-wordmark.png"
              alt=""
              width={160}
              height={80}
              className="object-contain mb-1"
              style={{ filter: 'brightness(0) invert(1)' }}
              priority
            />
            <p className="text-sm" style={{ color: '#8A9BB5' }}>
              Panel de Administración
            </p>
          </div>

          {/* Form */}
          <form action={loginAction} className="space-y-4" suppressHydrationWarning>
            <div suppressHydrationWarning>
              <label className="block text-sm font-medium mb-2" style={{ color: '#8A9BB5' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="studio@pneumastudio.mx"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                suppressHydrationWarning
              />
            </div>

            <div suppressHydrationWarning>
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
                suppressHydrationWarning
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
