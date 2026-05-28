'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function ContactHero() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#050D1A' }}>
      <AnimatedGridBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Teal left-border label — centered version */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
          <span className="label-tag text-primary">
            {lang === 'es' ? 'PRÓXIMA GENERACIÓN' : 'NEXT GENERATION'}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-800 text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
          {t('contact.title')}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: '#8A9BB5' }}>{t('contact.sub')}</p>
      </div>
    </section>
  );
}