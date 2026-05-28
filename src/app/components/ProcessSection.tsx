'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

const steps = [
  {
    number: '01',
    titleEs: 'Discovery',
    titleEn: 'Discovery',
    descEs: 'Agendamos una llamada de 30 minutos. Entendemos tu negocio, tus objetivos y el sistema que necesitas construir.',
    descEn: 'We schedule a 30-minute call. We learn about your business, your goals, and the system you need built.',
    tagEs: 'Gratis · Sin compromiso',
    tagEn: 'Free · No commitment',
    iconPath: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5',
  },
  {
    number: '02',
    titleEs: 'Propuesta',
    titleEn: 'Proposal',
    descEs: 'Recibes una propuesta a medida: arquitectura, timeline y precio fijo. Sin costos ocultos, sin sorpresas.',
    descEn: 'You receive a custom proposal: architecture, timeline, and a fixed price. No hidden costs, no surprises.',
    tagEs: '24–48 hrs de respuesta',
    tagEn: '24–48 hr turnaround',
    iconPath: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  },
  {
    number: '03',
    titleEs: 'Build & Launch',
    titleEn: 'Build & Launch',
    descEs: 'Construimos tu plataforma con arquitectura de producción. En 3–5 semanas recibes las llaves de tu nuevo sistema.',
    descEn: 'We build your platform with production-grade architecture. In 3–5 weeks you get the keys to your new system.',
    tagEs: 'Entrega en 3–5 semanas',
    tagEn: '3–5 week delivery',
    iconPath: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
  },
];

export default function ProcessSection() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#050D1A' }}>
      {/* Ambient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 700,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,196,160,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <ScrollAnimator>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
            <span className="label-tag text-primary">
              {lang === 'es' ? 'CÓMO TRABAJAMOS' : 'HOW WE WORK'}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-800 text-white mb-3"
            style={{ letterSpacing: '-0.025em' }}
          >
            {lang === 'es' ? (
              <>
                De idea a plataforma{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  en 3 pasos.
                </span>
              </>
            ) : (
              <>
                From idea to platform{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  in 3 steps.
                </span>
              </>
            )}
          </h2>
          <p className="text-sm mb-12 max-w-xl" style={{ color: '#8A9BB5' }}>
            {lang === 'es' ?'Un proceso simple y transparente diseñado para que empieces a ver resultados lo antes posible.' :'A simple, transparent process designed to get you results as fast as possible.'}
          </p>
        </ScrollAnimator>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-8 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(0,196,160,0.3), rgba(0,196,160,0.15), rgba(0,196,160,0.3))' }}
          />

          {steps?.map((step, i) => (
            <ScrollAnimator key={i} delay={i * 120} className="h-full">
              <div
                className="rounded-2xl p-6 flex flex-col gap-4 relative service-card h-full"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,160,0.5), transparent)' }}
                />

                {/* Number badge */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: 'rgba(0,196,160,0.1)',
                      border: '1px solid rgba(0,196,160,0.25)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={step?.iconPath} />
                    </svg>
                  </div>
                  <span
                    className="text-4xl font-800 leading-none"
                    style={{ color: 'rgba(0,196,160,0.15)' }}
                  >
                    {step?.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-800 text-white mb-2">
                    {lang === 'es' ? step?.titleEs : step?.titleEn}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? step?.descEs : step?.descEn}
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
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#00C4A0' }}
                  />
                  <span className="text-xs font-600" style={{ color: '#00C4A0' }}>
                    {lang === 'es' ? step?.tagEs : step?.tagEn}
                  </span>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>

        {/* CTA */}
        <ScrollAnimator delay={400}>
          <div className="mt-10 flex justify-start">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base">
              {lang === 'es' ? 'Agendar mi Discovery Call' : 'Schedule my Discovery Call'}
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
