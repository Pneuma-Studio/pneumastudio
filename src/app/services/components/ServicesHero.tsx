'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function ServicesHero() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#050D1A' }}>
      <AnimatedGridBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
          <span className="label-tag text-primary">SYSTEMS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-800 text-white mb-5" style={{ letterSpacing: '-0.03em' }}>
          {t('services.title')}
        </h1>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#8A9BB5' }}>
          {t('services.sub')}
        </p>
      </div>
    </section>
  );
}