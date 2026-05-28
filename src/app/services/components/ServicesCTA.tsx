'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

export default function ServicesCTA() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#050D1A' }}>
      {/* Ambient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,196,160,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <ScrollAnimator>
          <div
            className="rounded-2xl p-10 sm:p-14 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Corner accent lines */}
            <div className="absolute top-0 left-0 w-16 h-px" style={{ background: 'linear-gradient(90deg, #00C4A0, transparent)' }} />
            <div className="absolute top-0 left-0 h-16 w-px" style={{ background: 'linear-gradient(180deg, #00C4A0, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-16 h-px" style={{ background: 'linear-gradient(270deg, #00C4A0, transparent)' }} />
            <div className="absolute bottom-0 right-0 h-16 w-px" style={{ background: 'linear-gradient(0deg, #00C4A0, transparent)' }} />

            {/* Content */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
              <span className="label-tag text-primary">{lang === 'es' ? 'PERSONALIZADO' : 'CUSTOM BUILD'}</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-800 mb-4 text-white"
              style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
            >
              {lang === 'es' ? (
                <>
                  ¿No encuentras lo que{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    necesitas?
                  </span>
                </>
              ) : (
                <>
                  {"Don't see exactly what"}{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    you need?
                  </span>
                </>
              )}
            </h2>

            <p className="text-base leading-relaxed mb-8 max-w-xl" style={{ color: '#8A9BB5' }}>
              {lang === 'es'
                ? 'Construimos sistemas completamente a medida. Cuéntanos tu desafío y diseñamos la arquitectura correcta para tu negocio.'
                : 'We build fully custom systems. Tell us your challenge and we design the right architecture for your business.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                href="/contact"
                className="btn-primary px-8 py-3.5 inline-flex items-center gap-2"
              >
                {lang === 'es' ? 'Hablar con el Equipo' : 'Talk to the Team'}
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <p className="text-xs self-center" style={{ color: '#8A9BB5' }}>
                {lang === 'es' ? '✓ Respondemos en menos de 24 horas' : '✓ Response within 24 hours'}
              </p>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
