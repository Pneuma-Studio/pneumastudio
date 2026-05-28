'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

const guarantees = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    titleEs: 'Precio fijo, sin sorpresas',
    titleEn: 'Fixed price, no surprises',
    descEs: 'Lo que cotizamos es lo que pagas. Sin costos adicionales por cambios de alcance menores ni cargos ocultos al final del proyecto.',
    descEn: 'What we quote is what you pay. No extra charges for minor scope changes or hidden fees at project end.',
    tag: 'Sin letra chica',
    tagEn: 'No fine print',
    featured: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    titleEs: '2 rondas de revisión incluidas',
    titleEn: '2 revision rounds included',
    descEs: 'Cada proyecto incluye dos rondas de ajustes sin costo. Tu feedback importa y está contemplado desde el inicio.',
    descEn: 'Every project includes two rounds of adjustments at no cost. Your feedback matters and is planned from day one.',
    tag: 'Feedback estructurado',
    tagEn: 'Structured feedback',
    featured: false,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titleEs: 'Entrega en el plazo acordado',
    titleEn: 'Delivery on the agreed timeline',
    descEs: 'Nos comprometemos con fechas reales. Si por alguna razón interna nos retrasamos, compensamos con trabajo adicional sin costo.',
    descEn: 'We commit to realistic dates. If we are delayed for internal reasons, we compensate with additional work at no charge.',
    tag: '3–5 semanas',
    tagEn: '3–5 weeks',
    featured: false,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    titleEs: 'Código tuyo, siempre',
    titleEn: 'Your code, always',
    descEs: 'Al finalizar el proyecto recibes acceso completo al repositorio. El código es 100% tuyo — sin dependencias de plataformas propietarias.',
    descEn: 'At project completion you get full repository access. The code is 100% yours — no proprietary platform lock-in.',
    tag: 'Propiedad total',
    tagEn: 'Full ownership',
    featured: false,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    titleEs: '30 días de soporte post-lanzamiento',
    titleEn: '30-day post-launch support',
    descEs: 'Una vez que tu plataforma está live, te acompañamos durante 30 días para resolver cualquier ajuste o incidencia sin costo adicional.',
    descEn: 'Once your platform is live, we support you for 30 days to resolve any adjustments or issues at no extra cost.',
    tag: 'Soporte incluido',
    tagEn: 'Support included',
    featured: true,
  },
];

export default function GuaranteesSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: '#0A1628' }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 350,
          top: '-40px',
          right: '-60px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,196,160,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 300,
          bottom: '-40px',
          left: '-60px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(30,64,175,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <ScrollAnimator>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
            <span className="label-tag text-primary">
              {lang === 'es' ? 'NUESTRAS GARANTÍAS' : 'OUR GUARANTEES'}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-800 text-white mb-3"
            style={{ letterSpacing: '-0.025em' }}
          >
            {lang === 'es' ? (
              <>
                Lo que prometemos,{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  lo cumplimos.
                </span>
              </>
            ) : (
              <>
                What we promise,{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  we deliver.
                </span>
              </>
            )}
          </h2>
          <p className="text-sm mb-12 max-w-xl" style={{ color: '#8A9BB5' }}>
            {lang === 'es' ?'Trabajar con nosotros no debería sentirse como un riesgo. Estas son las promesas concretas que hacemos a cada cliente.' :'Working with us should not feel like a risk. These are the concrete promises we make to every client.'}
          </p>
        </ScrollAnimator>

        {/* Bento grid — asymmetric layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {guarantees?.map((g, i) => (
            <ScrollAnimator
              key={i}
              delay={i * 80}
              className={
                g?.featured && i === 0
                  ? 'sm:col-span-2 lg:col-span-2'
                  : g?.featured && i === 4
                  ? 'sm:col-span-2 lg:col-span-1' :''
              }
            >
              <div
                className="rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden h-full service-card"
                style={{
                  background: g?.featured
                    ? 'rgba(0,196,160,0.05)'
                    : 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  border: g?.featured
                    ? '1px solid rgba(0,196,160,0.2)'
                    : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: g?.featured
                      ? 'linear-gradient(90deg, transparent, rgba(0,196,160,0.7), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(0,196,160,0.3), transparent)',
                  }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: 'rgba(0,196,160,0.1)',
                    border: '1px solid rgba(0,196,160,0.25)',
                  }}
                >
                  {g?.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-base font-700 text-white mb-2">
                    {lang === 'es' ? g?.titleEs : g?.titleEn}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? g?.descEs : g?.descEn}
                  </p>
                </div>

                {/* Tag */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg w-fit mt-auto"
                  style={{
                    background: 'rgba(0,196,160,0.07)',
                    border: '1px solid rgba(0,196,160,0.2)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00C4A0' }} />
                  <span className="text-xs font-600" style={{ color: '#00C4A0' }}>
                    {lang === 'es' ? g?.tag : g?.tagEn}
                  </span>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
