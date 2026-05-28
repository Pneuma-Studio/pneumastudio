'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

const steps = [
  {
    num: '01',
    en: 'Business Analysis',
    es: 'Análisis de Negocio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    bullets: ['Goals & constraints', 'Competitive landscape', 'User personas'],
  },
  {
    num: '02',
    en: 'UX Strategy',
    es: 'Estrategia UX',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    bullets: ['Information architecture', 'User journeys', 'Wireframes'],
  },
  {
    num: '03',
    en: 'Platform Architecture',
    es: 'Arquitectura de Plataforma',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    bullets: ['Technical stack selection', 'System design', 'Integrations map'],
  },
  {
    num: '04',
    en: 'Premium UI Design',
    es: 'Diseño UI Premium',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    bullets: ['Design systems', 'Component libraries', 'Motion guidelines'],
  },
  {
    num: '05',
    en: 'Development',
    es: 'Desarrollo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    bullets: ['Agile sprint cycles', 'QA & code review', 'Staging environments'],
  },
  {
    num: '06',
    en: 'Automation',
    es: 'Automatización',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
      </svg>
    ),
    bullets: ['Workflow automation', 'API integrations', 'Notification systems'],
  },
  {
    num: '07',
    en: 'Launch',
    es: 'Lanzamiento',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    bullets: ['Performance audit', 'SEO & deployment', 'Team training'],
  },
  {
    num: '08',
    en: 'Scaling',
    es: 'Escalado',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    bullets: ['Analytics review', 'Feature iteration', 'Infrastructure scaling'],
  },
];

export default function MethodologySection() {
  const { t, lang } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          <div className="mb-12">
            {/* Teal left-border label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
              <span className="label-tag text-primary">
                {lang === 'es' ? 'METODOLOGÍA' : 'METHODOLOGY'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-800 text-white" style={{ letterSpacing: '-0.02em' }}>
              {lang === 'es' ? 'Nuestro Enfoque: Arquitectos Digitales Estratégicos' : 'Our Approach: Strategic Digital System Architects'}
            </h2>
          </div>
        </ScrollAnimator>

        {/* 4×2 grid of numbered cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps?.map((step, i) => (
            <ScrollAnimator key={step?.num} delay={i * 60}>
              <div
                className="rounded-xl p-5 h-full flex flex-col group hover:border-primary/30 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Number badge + icon row */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-700 px-2 py-0.5 rounded"
                    style={{
                      background: 'rgba(0,196,160,0.12)',
                      color: '#00C4A0',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {step?.num}
                  </span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(0,196,160,0.12)' }}
                  >
                    {step?.icon}
                  </div>
                </div>
                <h3 className="font-700 text-sm text-white mb-3 leading-snug">
                  {lang === 'es' ? step?.es : step?.en}
                </h3>
                <div className="flex flex-col gap-1.5 mt-auto">
                  {step?.bullets?.map((b, j) => (
                    <p key={j} className="text-xs leading-relaxed" style={{ color: '#8A9BB5' }}>
                      {b}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>

        {/* Tagline — "More than developers. Architects." */}
        <ScrollAnimator delay={300}>
          <div className="flex items-center gap-4 pt-6 border-t border-white/5">
            <div className="w-8 h-0.5" style={{ background: '#00C4A0' }} />
            <p className="text-xl sm:text-2xl font-800 text-white">
              {lang === 'es' ? 'Más que desarrolladores. ' : 'More than developers. '}
              <span style={{ color: '#00C4A0' }}>{lang === 'es' ? 'Arquitectos.' : 'Architects.'}</span>
            </p>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}