'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

export default function PartnerBenefits() {
  const { lang } = useLanguage();

  const pillars = [
    {
      iconPath: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
      title: lang === 'es' ? 'Confidencial' : 'Confidential',
      desc: lang === 'es'
        ? 'Nunca contactamos a tus clientes directamente. Tu relación, tu marca, tu control.'
        : 'We never contact your clients directly. Your relationship, your brand, your control.',
    },
    {
      iconPath: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z',
      title: lang === 'es' ? 'Tu Marca' : 'Your Brand',
      desc: lang === 'es'
        ? 'Todos los entregables — diseño, código, documentación — bajo el nombre de tu agencia.'
        : 'All deliverables — design, code, documentation — under your agency\'s name.',
    },
    {
      iconPath: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
      title: lang === 'es' ? 'Entrega Rápida' : 'Fast Delivery',
      desc: lang === 'es'
        ? 'Sprints estructurados de 3–5 semanas. Sin proyectos de 6 meses que dañan tu cash flow.'
        : '3–5 week structured sprints. No 6-month projects that damage your cash flow.',
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#050D1A' }}>
      {/* Ambient orb */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <ScrollAnimator>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
              <span className="label-tag text-primary">
                {lang === 'es' ? 'POR QUÉ ELEGIRNOS' : 'WHY CHOOSE US'}
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-800 text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              {lang === 'es'
                ? 'Construido para proteger tu agencia.'
                : 'Built to protect your agency.'}
            </h2>
          </div>
        </ScrollAnimator>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <ScrollAnimator key={i} delay={i * 100}>
              <div
                className="rounded-xl p-7 flex flex-col gap-5 h-full service-card relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,160,0.4), transparent)' }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(0,196,160,0.12)', border: '1px solid rgba(0,196,160,0.2)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#00C4A0" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={p.iconPath} />
                  </svg>
                </div>

                <div>
                  <h3 className="text-base font-800 text-white mb-2">{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8A9BB5' }}>{p.desc}</p>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
