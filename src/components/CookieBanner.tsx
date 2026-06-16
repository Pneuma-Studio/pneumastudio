'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'ps_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    window.dispatchEvent(new CustomEvent('ps:consent', { detail: 'accepted' }));
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{
          background: 'rgba(5,13,26,0.97)',
          border: '1px solid rgba(0,196,160,0.25)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,196,160,0.08)',
          pointerEvents: 'all',
        }}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-600 text-white mb-1">Usamos cookies</p>
          <p className="text-xs leading-relaxed" style={{ color: '#8A9BB5' }}>
            Utilizamos Google Analytics para mejorar tu experiencia. Consulta nuestro{' '}
            <Link href="/privacidad" className="underline transition-colors" style={{ color: '#00C4A0' }}>
              Aviso de Privacidad
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={reject}
            className="text-xs font-500 px-4 py-2 rounded-lg transition-colors duration-200"
            style={{ color: '#8A9BB5', border: '1px solid rgba(255,255,255,0.1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#8A9BB5')}
          >
            Solo necesarias
          </button>
          <button
            onClick={accept}
            className="text-xs font-600 px-4 py-2 rounded-lg transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #00C4A0, #00A085)',
              color: '#050D1A',
              boxShadow: '0 0 16px rgba(0,196,160,0.3)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 24px rgba(0,196,160,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 16px rgba(0,196,160,0.3)')}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
