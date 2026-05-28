'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

const frontend = [
  { name: 'Next.js', desc: 'React framework for production grade apps', descEs: 'Framework React para apps de producción' },
  { name: 'TypeScript', desc: 'Type-safe development for robust codebases', descEs: 'Código robusto y tipado' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling for performant UI', descEs: 'UI utilitaria y de alto rendimiento' },
  { name: 'Framer Motion', desc: 'Production-ready motion library for React', descEs: 'Animaciones listas para producción' },
];

const backend = [
  { name: 'Node.js Runtime', desc: 'Scalable event-driven server environment', descEs: 'Servidor escalable orientado a eventos' },
  { name: 'REST & GraphQL APIs', desc: 'Efficient and flexible data communication', descEs: 'Comunicación de datos eficiente y flexible' },
  { name: 'Database Architecture', desc: 'PostgreSQL, MongoDB & Redis caching', descEs: 'PostgreSQL, MongoDB y Redis caching' },
  { name: 'Cloud Integrations', desc: 'AWS, Vercel & GCP serverless deployments', descEs: 'Despliegues serverless en AWS, Vercel y GCP' },
];

const badges = [
  {
    iconPath: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    label: 'FAST LOADING',
    sub: 'Sub-second LCP',
    subEs: 'LCP Menor a 1s',
  },
  {
    iconPath: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
    label: 'SCALABLE',
    sub: 'Elastic Arch',
    subEs: 'Arquitectura Elástica',
  },
  {
    iconPath: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
    label: 'SEO OPTIMIZED',
    sub: 'Meta & SSR',
    subEs: 'Meta & SSR',
  },
  {
    iconPath: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3m-3 3.75h3',
    label: 'MOBILE-FIRST',
    sub: 'Responsive UX',
    subEs: 'UX Responsivo',
  },
  {
    iconPath: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
    label: 'ENTERPRISE',
    sub: 'Production Ready',
    subEs: 'Listo para Producción',
  },
];

export default function TechStackSection() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding" style={{ background: '#050D1A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
              <span className="label-tag text-primary">SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-800 text-white" style={{ letterSpacing: '-0.02em' }}>
              {lang === 'es' ? 'Stack Tecnológico & Rendimiento' : 'Technology Stack & Performance'}
            </h2>
            <p className="mt-2 text-sm" style={{ color: '#00C4A0' }}>
              {lang === 'es' ? 'Construido para rendimiento y escalabilidad.' : 'Built for performance and scalability.'}
            </p>
          </div>
        </ScrollAnimator>

        {/* Two-column tech cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Frontend */}
          <ScrollAnimator delay={100}>
            <div
              className="rounded-xl p-6 service-card"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Card header with teal square icon badge */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,196,160,0.15)', border: '1px solid rgba(0,196,160,0.2)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                  </svg>
                </div>
                <h3 className="font-700 text-base text-white">
                  {lang === 'es' ? 'Arquitectura Frontend' : 'Frontend Architecture'}
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {frontend?.map((item) => (
                  <div key={item?.name} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#00C4A0' }} />
                    <div>
                      <span className="font-700 text-sm text-white">{item?.name}</span>
                      <p className="text-xs mt-0.5" style={{ color: '#8A9BB5' }}>
                        {lang === 'es' ? item?.descEs : item?.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimator>

          {/* Backend */}
          <ScrollAnimator delay={150}>
            <div
              className="rounded-xl p-6 service-card"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,196,160,0.15)', border: '1px solid rgba(0,196,160,0.2)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <h3 className="font-700 text-base text-white">
                  {lang === 'es' ? 'Backend & Infraestructura' : 'Backend & Infrastructure'}
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {backend?.map((item) => (
                  <div key={item?.name} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#00C4A0' }} />
                    <div>
                      <span className="font-700 text-sm text-white">{item?.name}</span>
                      <p className="text-xs mt-0.5" style={{ color: '#8A9BB5' }}>
                        {lang === 'es' ? item?.descEs : item?.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimator>
        </div>

        {/* Performance badges row */}
        <ScrollAnimator delay={200}>
          <div
            className="rounded-xl p-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
              {badges?.map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-3 text-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="#00C4A0" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={badge?.iconPath} />
                  </svg>
                  <div>
                    <p className="text-xs font-700 text-white tracking-widest">{badge?.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#00C4A0' }}>
                      {lang === 'es' ? badge?.subEs : badge?.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}