'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

export default function PartnersHero() {
  const { lang } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 bg-background overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" />
      {/* Teal glow top-left */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <span className="label-tag text-primary">
              {lang === 'es' ? 'ALIANZAS ESTRATÉGICAS' : 'STRATEGIC PARTNERSHIP'}
            </span>
          </div>
          <h1 className="text-display font-800 text-foreground mb-4 leading-tight" style={{ letterSpacing: '-0.025em' }}>
            {lang === 'es' ?'Tu socio tecnológico white-label.' :'Your white-label technology partner.'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {lang === 'es' ?'Nosotros construimos. Tú pones la marca. Tu cliente gana.' :'We build. You brand. Your client wins.'}
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={200}>
          <p className="mt-6 text-base text-muted-foreground max-w-2xl leading-relaxed">
            {lang === 'es' ?'Si eres una agencia de marketing, branding o creatividad que cierra clientes que necesitan plataformas digitales — somos tu socio tecnológico silencioso.' : "If you're a marketing, branding, or creative agency closing clients who need digital platforms — we're your silent tech partner."}
          </p>
        </ScrollAnimator>
      </div>
    </section>
  );
}
