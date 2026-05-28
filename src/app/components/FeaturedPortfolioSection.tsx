'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const caseStudies = [
  {
    industry: 'Ecommerce',
    name: 'Beauty Distribution',
    nameEs: 'Distribución de Belleza',
    problem: 'From manual WhatsApp orders to a fully automated self-service platform.',
    problemEs: 'De pedidos manuales por WhatsApp a una plataforma automatizada de autoservicio.',
    metric: '+68%',
    metricLabel: 'Conversion',
    metricLabelEs: 'Conversión',
    sub1: '2,400 SKUs Automated',
    sub1Es: '2,400 SKUs Automatizados',
    sub2: '0 Manual Order Entry',
    sub2Es: '0 Pedidos Manuales',
    iconPath: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
  },
  {
    industry: 'Healthcare',
    name: 'K-Nino Veterinary',
    nameEs: 'K-Nino Veterinaria',
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
  },
  {
    industry: 'Marketplace',
    name: 'Auto Parts Marketplace',
    nameEs: 'Marketplace de Autopartes',
    problem: 'Static catalog transformed into a dynamic multi-supplier marketplace.',
    problemEs: 'Catálogo estático transformado en marketplace multi-proveedor dinámico.',
    metric: '3×',
    metricLabel: 'Order Volume',
    metricLabelEs: 'Volumen de Pedidos',
    sub1: '12 Suppliers Real Time',
    sub1Es: '12 Proveedores en Tiempo Real',
    sub2: 'MercadoLibre Integration',
    sub2Es: 'Integración MercadoLibre',
    iconPath: 'M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495',
  },
];

export default function FeaturedPortfolioSection() {
  const { t, lang } = useLanguage();

  return (
    <section className="section-padding" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">
                  {lang === 'es' ? 'CASOS DE ESTUDIO' : 'CASE STUDIES'}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-800 text-white" style={{ letterSpacing: '-0.02em' }}>
                {t('portfolio.title')}
              </h2>
              <p className="mt-2 text-sm" style={{ color: '#8A9BB5' }}>{t('portfolio.sub')}</p>
            </div>
            <Link href="/portfolio" className="flex items-center gap-2 text-sm font-600 text-muted-foreground hover:text-primary transition-colors group shrink-0">
              {lang === 'es' ? 'Ver todos los casos' : 'View all cases'}
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollAnimator>

        {/* Vertical case study cards — horizontal row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {caseStudies?.map((cs, i) => (
            <ScrollAnimator key={i} delay={i * 100}>
              <div
                className="rounded-2xl overflow-hidden h-full flex flex-col service-card"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="p-6 flex flex-col flex-1">
                  {/* Teal square icon badge */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                    style={{ background: 'rgba(0,196,160,0.15)', border: '1px solid rgba(0,196,160,0.2)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={cs?.iconPath} />
                    </svg>
                  </div>

                  <h3 className="font-700 text-base text-white mb-2 leading-snug">
                    {lang === 'es' ? cs?.nameEs : cs?.name}
                  </h3>
                  <p className="text-xs leading-relaxed mb-5" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? cs?.problemEs : cs?.problem}
                  </p>

                  {/* Hero metric — large teal */}
                  <div className="mb-4">
                    <span className="text-4xl font-800 leading-none block" style={{ color: '#00C4A0' }}>
                      {cs?.metric}
                    </span>
                    <span className="text-xs font-600 mt-1 block" style={{ color: '#00C4A0' }}>
                      {lang === 'es' ? cs?.metricLabelEs : cs?.metricLabel}
                    </span>
                  </div>

                  {/* Supporting metrics — teal-border pills */}
                  <div className="flex flex-col gap-2 mt-auto">
                    {[
                      lang === 'es' ? cs?.sub1Es : cs?.sub1,
                      lang === 'es' ? cs?.sub2Es : cs?.sub2,
                    ]?.map((sub, j) => (
                      <div
                        key={j}
                        className="px-3 py-1.5 rounded-lg text-xs font-600 text-white"
                        style={{
                          background: 'rgba(0,196,160,0.08)',
                          border: '1px solid rgba(0,196,160,0.2)',
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