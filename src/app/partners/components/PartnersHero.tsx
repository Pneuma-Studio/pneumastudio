'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';
import ScrollAnimator from '@/components/ScrollAnimator';

export default function PartnersHero() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#050D1A' }}>
      <AnimatedGridBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
            <span className="label-tag text-primary">
              {lang === 'es' ? 'ALIANZAS ESTRATÉGICAS' : 'STRATEGIC PARTNERSHIP'}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-800 mb-5 leading-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            {lang === 'es' ? (
              <>
                Tu socio tecnológico{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  white-label.
                </span>
              </>
            ) : (
              <>
                Your{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  white-label
                </span>{' '}
                technology partner.
              </>
            )}
          </h1>

          <p className="text-lg font-600 text-white mb-3" style={{ maxWidth: '540px' }}>
            {lang === 'es'
              ? 'Nosotros construimos. Tú pones la marca. Tu cliente gana.'
              : 'We build. You brand. Your client wins.'}
          </p>

          <p className="text-base leading-relaxed" style={{ color: '#8A9BB5', maxWidth: '540px' }}>
            {lang === 'es'
              ? 'Si eres una agencia de marketing, branding o creatividad que cierra clientes que necesitan plataformas digitales — somos tu socio tecnológico silencioso.'
              : "If you're a marketing, branding, or creative agency closing clients who need digital platforms — we're your silent tech partner."}
          </p>
        </ScrollAnimator>

        {/* Trust badges */}
        <ScrollAnimator delay={160}>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {[
              { label: lang === 'es' ? '15% Comisión' : '15% Commission', icon: '◈' },
              { label: lang === 'es' ? '–30% Precio Mayoreo' : '–30% Wholesale Price', icon: '◈' },
              { label: 'NDA ' + (lang === 'es' ? 'incluido' : 'included'), icon: '◈' },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600"
                style={{
                  background: 'rgba(0,196,160,0.08)',
                  border: '1px solid rgba(0,196,160,0.2)',
                  color: '#00C4A0',
                }}
              >
                <span style={{ fontSize: '10px' }}>{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
