'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const caseStudies = [
  {
    industry: 'Ecommerce',
    industryEs: 'Ecommerce',
    name: 'Bellísima',
    nameEs: 'Bellísima',
    problem: 'From manual WhatsApp orders to a fully automated self-service platform.',
    problemEs: 'De pedidos manuales por WhatsApp a una plataforma automatizada de autoservicio.',
    metric: '+68%',
    metricLabel: 'Conversion',
    metricLabelEs: 'Conversión',
    sub1: '2,400 SKUs Automatizados',
    sub2: '0 Pedidos Manuales',
    logoPath: '/assets/images/bellisima-logo.webp',
    logoBg: true,
    url: 'https://www.bellisima.mx',
  },
  {
    industry: 'Healthcare',
    industryEs: 'Salud',
    name: 'Santa Cruz Veterinaria',
    nameEs: 'Santa Cruz Veterinaria',
    problem: 'Digitizing physical records and automating appointment reminder workflows.',
    problemEs: 'Digitalizando registros físicos y automatizando recordatorios de citas.',
    metric: '-80%',
    metricLabel: 'Admin Workload',
    metricLabelEs: 'Carga Administrativa',
    sub1: 'Reservas Online Activadas',
    sub2: 'Retención de Clientes Mejorada',
    logoPath: '/assets/images/santacruz-veterinaria-logo.png',
    logoBg: true,
    url: 'https://www.santacruzveterinaria.mx',
  },
  {
    industry: 'Retail',
    industryEs: 'Retail',
    name: 'Luxon',
    nameEs: 'Luxon',
    problem: 'Premium e-commerce for a home renovation brand: blinds, wallpaper, smart film and awnings.',
    problemEs: 'Tienda premium para marca de renovaciones: persianas, papel tapiz, smart film y toldos.',
    metric: '+91%',
    metricLabel: 'Online Leads',
    metricLabelEs: 'Leads Online',
    sub1: 'Catálogo Completo',
    sub2: 'Sistema de Cotización',
    logoPath: '/assets/images/luxon-logo.png',
    logoBg: false,
    url: 'https://luxonmonterrey.com',
  },
];

export default function FeaturedPortfolioSection() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#0A1628' }}>
      {/* Ambient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 400,
          top: '-80px',
          right: '-100px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,196,160,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 350,
          bottom: '-60px',
          left: '-80px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(30,64,175,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header row */}
        <ScrollAnimator>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">
                  {lang === 'es' ? 'CASOS DE ESTUDIO' : 'CASE STUDIES'}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-800 text-white mb-3" style={{ letterSpacing: '-0.025em' }}>
                {lang === 'es' ? (
                  <>
                    Proyectos que{' '}
                    <span style={{ background: 'linear-gradient(135deg, #00C4A0 0%, #FFFFFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      generan resultados.
                    </span>
                  </>
                ) : (
                  <>
                    Projects that{' '}
                    <span style={{ background: 'linear-gradient(135deg, #00C4A0 0%, #FFFFFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      deliver results.
                    </span>
                  </>
                )}
              </h2>
              <p className="text-sm max-w-lg" style={{ color: '#8A9BB5' }}>
                {lang === 'es'
                  ? 'Tres proyectos reales. Resultados medibles. Impacto directo en el negocio.'
                  : 'Three real projects. Measurable results. Direct business impact.'}
              </p>
            </div>

            <Link
              href="/portfolio"
              className="group flex items-center gap-2 text-sm font-600 transition-colors shrink-0"
              style={{ color: '#8A9BB5' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00C4A0')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8A9BB5')}
            >
              {lang === 'es' ? 'Ver portafolio completo' : 'View full portfolio'}
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollAnimator>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {caseStudies.map((cs, i) => (
            <ScrollAnimator key={i} delay={i * 100} className="h-full">
              <div
                className="rounded-2xl overflow-hidden h-full flex flex-col service-card relative cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
                onClick={() => window.open(cs.url, '_blank')}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,160,0.5), transparent)' }}
                />

                <div className="p-6 flex flex-col flex-1">
                  {/* Logo — uniform container */}
                  <div
                    className="w-full mb-5 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                    style={{
                      height: '72px',
                      background: cs.logoBg ? '#FFFFFF' : 'rgba(255,255,255,0.06)',
                      border: cs.logoBg ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <Image
                      src={cs.logoPath}
                      alt={cs.name}
                      width={200}
                      height={60}
                      className="object-contain"
                      style={{ maxHeight: '48px', width: 'auto' }}
                    />
                  </div>

                  {/* Client name + industry tag */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-700 text-base text-white leading-snug">
                      {lang === 'es' ? cs.nameEs : cs.name}
                    </h3>
                    <span
                      className="label-tag px-2 py-0.5 rounded-md shrink-0"
                      style={{ background: 'rgba(0,196,160,0.08)', border: '1px solid rgba(0,196,160,0.2)', color: '#00C4A0' }}
                    >
                      {lang === 'es' ? cs.industryEs : cs.industry}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed mb-5" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? cs.problemEs : cs.problem}
                  </p>

                  {/* Hero metric */}
                  <div className="mb-5">
                    <span
                      className="text-5xl font-800 leading-none block"
                      style={{
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {cs.metric}
                    </span>
                    <span className="text-xs font-600 mt-1.5 block" style={{ color: 'rgba(0,196,160,0.8)' }}>
                      {lang === 'es' ? cs.metricLabelEs : cs.metricLabel}
                    </span>
                  </div>

                  <div className="w-full h-px mb-4" style={{ background: 'rgba(255,255,255,0.06)' }} />

                  {/* Supporting pills */}
                  <div className="flex flex-col gap-2 mt-auto">
                    {[cs.sub1, cs.sub2].map((sub, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-600 text-white"
                        style={{ background: 'rgba(0,196,160,0.06)', border: '1px solid rgba(0,196,160,0.15)' }}
                      >
                        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: '#00C4A0' }} />
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <ScrollAnimator delay={350}>
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-5"
            style={{ background: 'rgba(0,196,160,0.05)', border: '1px solid rgba(0,196,160,0.15)' }}
          >
            <p className="text-sm font-600" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {lang === 'es'
                ? '¿Quieres ver más casos? Explora el portafolio completo.'
                : 'Want to see more? Explore the full portfolio.'}
            </p>
            <Link href="/portfolio" className="btn-ghost text-sm px-6 py-2.5 shrink-0 flex items-center gap-2">
              {lang === 'es' ? 'Ver Portafolio' : 'View Portfolio'}
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
