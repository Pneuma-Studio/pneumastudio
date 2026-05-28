'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function ContactHero() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: '#050D1A' }}>
      <AnimatedGridBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
          <span className="label-tag text-primary">
            {lang === 'es' ? 'PRÓXIMA GENERACIÓN' : 'NEXT GENERATION'}
          </span>
        </div>

        <h1
          className="font-800 mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
        >
          {lang === 'es' ? (
            <>
              <span className="text-white">Construyamos la Próxima</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Generación de Negocios Digitales.
              </span>
            </>
          ) : (
            <>
              <span className="text-white">{"Let's Build the Next Generation"}</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                of Digital Businesses.
              </span>
            </>
          )}
        </h1>

        <p className="text-base leading-relaxed" style={{ color: '#8A9BB5' }}>
          {lang === 'es'
            ? 'Cuéntanos sobre tu proyecto. Respondemos en menos de 24 horas.'
            : 'Tell us about your project. We respond within 24 hours.'}
        </p>
      </div>
    </section>
  );
}
