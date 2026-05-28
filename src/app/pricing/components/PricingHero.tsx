'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function PricingHero() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative py-24 sm:py-28 overflow-hidden">
      <AnimatedGridBackground />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <span className="label-tag text-primary block mb-4">
          {lang === 'es' ? 'PRECIOS' : 'PRICING'}
        </span>
        <h1 className="text-display font-800 mb-5">{t('pricing.title')}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{t('pricing.sub')}</p>
      </div>
    </section>
  );
}