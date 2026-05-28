'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function PricingHero() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-24 sm:py-28 overflow-hidden" style={{ background: '#050D1A' }}>
      <AnimatedGridBackground />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
          <span className="label-tag text-primary">
            {lang === 'es' ? 'PRECIOS' : 'PRICING'}
          </span>
        </div>
        <h1
          className="font-800 mb-5"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.08 }}
        >
          <span className="text-white">
            {lang === 'es' ? 'Precios Transparentes.' : 'Transparent Pricing.'}
          </span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {lang === 'es' ? 'Sin Sorpresas.' : 'No Surprises.'}
          </span>
        </h1>
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#8A9BB5' }}>
          {lang === 'es'
            ? 'Elige el paquete que se adapta a tu etapa de crecimiento.'
            : 'Choose the package that fits your growth stage.'}
        </p>
      </div>
    </section>
  );
}
