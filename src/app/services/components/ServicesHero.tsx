'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function ServicesHero() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#050D1A' }}>
      <AnimatedGridBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
          <span className="label-tag text-primary">SYSTEMS</span>
        </div>

        <h1
          className="font-800 mb-5"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.08 }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.75) 50%, #00C4A0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {lang === 'es' ? 'Soluciones Digitales' : 'Digital Solutions'}
          </span>
          <br />
          <span className="text-white">
            {lang === 'es' ? 'Construidas para Escalar.' : 'Built for Scale.'}
          </span>
        </h1>

        <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#8A9BB5' }}>
          {lang === 'es'
            ? 'Cada sistema que construimos está diseñado con arquitectura de producción, no prototipos.'
            : 'Every system we build is designed with production architecture, not prototypes.'}
        </p>
      </div>
    </section>
  );
}
