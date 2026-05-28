'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';

export default function PortfolioHero() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#050D1A' }}>
      <AnimatedGridBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
          <span className="label-tag text-primary">
            {lang === 'es' ? 'CASOS DE ESTUDIO' : 'CASE STUDIES'}
          </span>
        </div>

        <h1
          className="font-800 mb-5"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.08 }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.7) 50%, #00C4A0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {lang === 'es' ? 'Resultados,' : 'Results,'}
          </span>
          <br />
          <span className="text-white">
            {lang === 'es' ? 'No Promesas.' : 'Not Promises.'}
          </span>
        </h1>

        <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#8A9BB5' }}>
          {lang === 'es'
            ? 'Cada proyecto es una prueba de que los sistemas correctos transforman negocios.'
            : 'Every project is proof that the right systems transform businesses.'}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-6 mt-8">
          {[
            { num: '+68%', label: lang === 'es' ? 'Conversión' : 'Conversion' },
            { num: '-80%', label: lang === 'es' ? 'Carga Admin' : 'Admin Load' },
            { num: '3×', label: lang === 'es' ? 'Volumen Pedidos' : 'Order Volume' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xl font-800" style={{ color: '#00C4A0' }}>{stat.num}</span>
              <span className="text-xs" style={{ color: '#8A9BB5' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
