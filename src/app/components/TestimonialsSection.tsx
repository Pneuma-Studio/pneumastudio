'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

const testimonials = [
  {
    quote: 'Jamás imaginamos que pudiéramos presumir una tienda en línea así. Creemos que la tienda sola nos genera más ventas que lo que podemos invertir en Marketing.',
    quoteEn: 'We never imagined we could show off an online store like this. We believe the store alone generates more sales than everything we could invest in Marketing.',
    company: 'Verdantis',
    industry: 'Ecommerce',
    industryEs: 'Ecommerce',
    logo: '/assets/logos/verdantis.png',
    logoStyle: { filter: 'brightness(0.9)' },
    logoBg: false,
    href: 'https://www.verdantis.mx',
  },
  {
    quote: 'Trabajar con Pneuma Studio fue muy fácil, además lo que nos entregaron fue simplemente espectacular, plasmaron justo lo que veíamos en nuestra mente para Velvet Aura. 100% recomendados.',
    quoteEn: 'Working with Pneuma Studio was very easy — what they delivered was simply spectacular. They captured exactly what we envisioned for Velvet Aura. 100% recommended.',
    company: 'Velvet Aura',
    industry: 'Fashion',
    industryEs: 'Moda',
    logo: '/assets/logos/velvet-aura-icon.png',
    logoStyle: {},
    logoBg: false,
    href: 'https://www.velvetaura.mx',
  },
];

export default function TestimonialsSection() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#0A1628' }}>
      {/* Ambient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 350,
          top: '-60px',
          left: '-80px',
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
          right: '-60px',
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
              {lang === 'es' ? 'LO QUE DICEN NUESTROS CLIENTES' : 'WHAT OUR CLIENTS SAY'}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-800 text-white mb-3"
            style={{ letterSpacing: '-0.025em' }}
          >
            {lang === 'es' ? (
              <>
                Resultados que{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00C4A0 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  hablan por sí solos.
                </span>
              </>
            ) : (
              <>
                Results that{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00C4A0 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  speak for themselves.
                </span>
              </>
            )}
          </h2>
          <p className="text-sm mb-12 max-w-xl" style={{ color: '#8A9BB5' }}>
            {lang === 'es'
              ? 'La mejor prueba de nuestro trabajo es la voz de quienes ya confiaron en nosotros.'
              : 'The best proof of our work is the voice of those who already trusted us.'}
          </p>
        </ScrollAnimator>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {testimonials.map((t, i) => (
            <ScrollAnimator key={i} delay={i * 150} className="h-full">
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl p-8 flex flex-col h-full relative overflow-hidden service-card group block"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  textDecoration: 'none',
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,160,0.5), transparent)' }}
                />

                {/* Large opening quote mark */}
                <div className="mb-5">
                  <svg
                    viewBox="0 0 40 30"
                    fill="none"
                    className="w-10 h-8"
                    style={{ color: 'rgba(0,196,160,0.3)' }}
                  >
                    <path
                      d="M0 30V18C0 8.4 5.6 2.4 16.8 0L18 3.6C12.8 5.2 10 8.4 9.6 13.2H16V30H0ZM24 30V18C24 8.4 29.6 2.4 40.8 0L42 3.6C36.8 5.2 34 8.4 33.6 13.2H40V30H24Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Quote */}
                <p
                  className="text-base leading-relaxed flex-1 mb-6"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  {lang === 'es' ? t.quote : t.quoteEn}
                </p>

                {/* Divider */}
                <div className="w-full h-px mb-5" style={{ background: 'rgba(255,255,255,0.07)' }} />

                {/* Footer — logo + company + external link hint */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-700 text-white">{t.company}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#8A9BB5' }}>
                      {lang === 'es' ? t.industryEs : t.industry}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div
                      className="rounded-lg flex items-center justify-center"
                      style={t.logoBg
                        ? { background: 'rgba(255,255,255,0.92)', padding: '6px 10px' }
                        : { padding: '2px 0' }
                      }
                    >
                      <Image
                        src={t.logo}
                        alt={t.company}
                        width={80}
                        height={32}
                        className="object-contain"
                        style={{ maxHeight: 32, width: 'auto', ...t.logoStyle }}
                      />
                    </div>
                    {/* External link arrow */}
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#00C4A0' }}
                    >
                      <path
                        d="M3 13L13 3M13 3H7M13 3V9"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
