'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function AboutHero() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <AnimatedGridBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="label-tag text-primary block mb-4">
          {lang === 'es' ? 'TECNOLOGÍA & METODOLOGÍA' : 'TECHNOLOGY & METHODOLOGY'}
        </span>
        <h1 className="text-display font-800 mb-5">{t('about.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {lang === 'es' ?'Cada decisión técnica tiene un propósito. Cada línea de código sirve al negocio.' :'Every technical decision has a purpose. Every line of code serves the business.'}
        </p>
      </div>
    </section>
  );
}