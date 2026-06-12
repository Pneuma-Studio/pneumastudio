'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

type IndustryFilter = 'all' | 'Ecommerce' | 'Healthcare' | 'Retail';

interface CaseStudy {
  industry: IndustryFilter;
  name: string;
  nameEs: string;
  problem: string;
  problemEs: string;
  metric: string;
  metricLabel: string;
  metricLabelEs: string;
  sub1: string;
  sub1Es: string;
  sub2: string;
  sub2Es: string;
  iconPath: string;
  comingSoon?: boolean;
  url?: string;
  logoPath?: string;
  logoBg?: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    industry: 'Ecommerce',
    name: 'Beauty Distribution Ecommerce',
    nameEs: 'Ecommerce de Distribución de Belleza',
    problem: 'From manual WhatsApp orders to a fully automated self-service platform.',
    problemEs: 'De pedidos manuales por WhatsApp a una plataforma automatizada de autoservicio.',
    metric: '+68%',
    metricLabel: 'Conversion',
    metricLabelEs: 'Conversión',
    sub1: '2,400 SKUs Automated',
    sub1Es: '2,400 SKUs Automatizados',
    sub2: '0 Manual Order Entry',
    sub2Es: '0 Captura Manual de Pedidos',
    iconPath: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
    url: 'https://www.bellisima.mx',
    logoPath: '/assets/images/bellisima-logo.webp',
    logoBg: true,
  },
  {
    industry: 'Healthcare',
    name: 'Veterinary Management',
    nameEs: 'Gestión Veterinaria',
    problem: 'Digitizing physical records and automating appointment reminder workflows.',
    problemEs: 'Digitalizando registros físicos y automatizando recordatorios de citas.',
    metric: '-80%',
    metricLabel: 'Admin Workload',
    metricLabelEs: 'Carga Administrativa',
    sub1: 'Online Bookings Activated',
    sub1Es: 'Reservas Online Activadas',
    sub2: 'Improved Client Retention',
    sub2Es: 'Retención de Clientes Mejorada',
    iconPath: 'M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z',
    url: 'https://www.santacruzveterinaria.mx',
    logoPath: '/assets/images/santacruz-veterinaria-logo.png',
    logoBg: true,
  },
  {
    industry: 'Retail',
    name: 'Luxon — Home Renovation',
    nameEs: 'Luxon — Renovaciones del Hogar',
    problem: 'Premium e-commerce for a home renovation brand: blinds, wallpaper, smart film, awnings, solar panels and curtains.',
    problemEs: 'Tienda premium para marca de renovaciones: persianas, papel tapiz, smart film, toldos, paneles solares y cortinas.',
    metric: '+91%',
    metricLabel: 'Online Leads',
    metricLabelEs: 'Leads Online',
    sub1: 'Full Product Catalog',
    sub1Es: 'Catálogo Completo',
    sub2: 'Quote Request System',
    sub2Es: 'Sistema de Cotización',
    iconPath: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
    url: 'https://luxonmonterrey.com',
    logoPath: '/assets/images/luxon-logo.png',
  },
  {
    industry: 'Ecommerce',
    name: 'Verdantis — Professional Substrate',
    nameEs: 'Verdantis — Sustratos Profesionales',
    problem: 'Premium single-product store for a professional substrate brand. Deep UX, custom configurator, and dynamic checkout.',
    problemEs: 'Tienda premium de producto único para marca de sustratos. UX profundo, configurador a medida y checkout dinámico.',
    metric: '+58%',
    metricLabel: 'Online Sales',
    metricLabelEs: 'Ventas Online',
    sub1: 'Single-Product Deep UX',
    sub1Es: 'UX Profundo de Producto Único',
    sub2: 'Custom Configurator Built',
    sub2Es: 'Configurador a Medida Construido',
    iconPath: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
    url: 'https://www.verdantis.mx',
    logoPath: '/assets/images/verdantis-logo.png',
  },
  {
    industry: 'Retail',
    name: 'Stationery Store',
    nameEs: 'Tienda de Papelería',
    problem: 'Full digital storefront for a premium stationery brand with catalog management and POS sync.',
    problemEs: 'Tienda digital completa para marca premium de papelería con gestión de catálogo y sincronización POS.',
    metric: '+73%',
    metricLabel: 'Online Revenue',
    metricLabelEs: 'Ingresos Online',
    sub1: 'Full Catalog Migrated',
    sub1Es: 'Catálogo Completo Migrado',
    sub2: 'POS + Web Sync Active',
    sub2Es: 'POS + Sincronización Web Activa',
    iconPath: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10',
    url: 'https://www.marchand.com.mx',
    logoPath: '/assets/images/marchand-logo.png',
  },
];

const filters: { key: IndustryFilter; labelEs: string; labelEn: string }[] = [
  { key: 'all', labelEs: 'Todos', labelEn: 'All' },
  { key: 'Ecommerce', labelEs: 'Ecommerce', labelEn: 'Ecommerce' },
  { key: 'Healthcare', labelEs: 'Salud', labelEn: 'Healthcare' },
  { key: 'Retail', labelEs: 'Retail', labelEn: 'Retail' },
];

export default function PortfolioCaseStudies() {
  const { lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<IndustryFilter>('all');

  const filtered = activeFilter === 'all'
    ? caseStudies
    : caseStudies.filter((cs) => cs.industry === activeFilter);

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#0A1628' }}>
      {/* Ambient orbs */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <ScrollAnimator>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
              <span className="label-tag text-primary">{lang === 'es' ? 'CASOS DE ESTUDIO' : 'CASE STUDIES'}</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-800 text-white mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              {lang === 'es' ? 'Proyectos que generan resultados.' : 'Projects that generate results.'}
            </h2>
            <p className="text-sm max-w-xl" style={{ color: '#8A9BB5' }}>
              {lang === 'es'
                ? 'Cada uno construido con arquitectura de producción y métricas reales.'
                : 'Each one built with production architecture and real metrics.'}
            </p>
          </div>
        </ScrollAnimator>

        {/* Filter Tabs */}
        <ScrollAnimator>
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-lg text-sm font-600 border transition-all duration-200 ${
                  activeFilter === f.key ? 'tab-active' : 'tab-inactive'
                }`}
              >
                {lang === 'es' ? f.labelEs : f.labelEn}
              </button>
            ))}
          </div>
        </ScrollAnimator>

        {/* Vertical case study cards — horizontal row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filtered.map((cs, i) => (
            <ScrollAnimator key={cs.name} delay={i * 80}>
              <div
                className={`rounded-2xl overflow-hidden h-full flex flex-col service-card relative ${cs.url ? 'cursor-pointer hover:scale-[1.02] transition-transform duration-200' : ''}`}
                style={{
                  background: cs.comingSoon ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  opacity: cs.comingSoon ? 0.7 : 1,
                }}
                onClick={() => cs.url && window.open(cs.url, '_blank')}
              >
                {cs.comingSoon && (
                  <div className="absolute top-3 right-3 z-10">
                    <span
                      className="text-xs font-600 px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', color: '#F59E0B' }}
                    >
                      {lang === 'es' ? 'Próximamente' : 'Coming Soon'}
                    </span>
                  </div>
                )}

                <div className="p-5 flex flex-col flex-1">
                  {/* Icon badge or brand logo */}
                  {cs.logoPath ? (
                    <div
                      className="mb-4 shrink-0 flex justify-center items-center rounded-lg p-2"
                      style={{ height: '64px', ...(cs.logoBg ? { background: '#FFFFFF' } : undefined) }}
                    >
                      <Image src={cs.logoPath} alt={cs.name} width={200} height={60} className="object-contain opacity-90" style={{ height: '48px', width: 'auto' }} />
                    </div>
                  ) : (
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                      style={{
                        background: cs.comingSoon ? 'rgba(245,158,11,0.1)' : 'rgba(0,196,160,0.15)',
                        border: cs.comingSoon ? '1px solid rgba(245,158,11,0.2)' : '1px solid rgba(0,196,160,0.2)',
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke={cs.comingSoon ? '#F59E0B' : '#00C4A0'} strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={cs.iconPath} />
                      </svg>
                    </div>
                  )}

                  {/* Project name */}
                  <h3 className="font-700 text-sm text-white mb-3 leading-snug">
                    {lang === 'es' ? cs.nameEs : cs.name}
                  </h3>

                  {/* Problem description */}
                  <p className="text-xs leading-relaxed mb-5" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? cs.problemEs : cs.problem}
                  </p>

                  {/* Hero metric */}
                  {!cs.comingSoon && (
                    <div className="mb-4">
                      <span
                        className="text-3xl font-800 leading-none block"
                        style={{
                          background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {cs.metric}
                      </span>
                      <span className="text-xs font-600 mt-1 block" style={{ color: 'rgba(0,196,160,0.8)' }}>
                        {lang === 'es' ? cs.metricLabelEs : cs.metricLabel}
                      </span>
                    </div>
                  )}

                  {/* Supporting pills */}
                  <div className="flex flex-col gap-2 mt-auto">
                    {[
                      lang === 'es' ? cs.sub1Es : cs.sub1,
                      lang === 'es' ? cs.sub2Es : cs.sub2,
                    ].map((sub, j) => (
                      <div
                        key={j}
                        className="px-3 py-1.5 rounded-lg text-xs font-600"
                        style={{
                          background: cs.comingSoon ? 'rgba(245,158,11,0.06)' : 'rgba(0,196,160,0.08)',
                          border: cs.comingSoon ? '1px solid rgba(245,158,11,0.15)' : '1px solid rgba(0,196,160,0.2)',
                          color: cs.comingSoon ? 'rgba(245,158,11,0.8)' : '#FFFFFF',
                        }}
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}