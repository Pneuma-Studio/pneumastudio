'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

type IndustryFilter = 'all' | 'Ecommerce' | 'Healthcare' | 'Marketplace' | 'Architecture' | 'Retail';

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
    sub1: '12 Suppliers in Real Time',
    sub1Es: '12 Proveedores en Tiempo Real',
    sub2: 'MercadoLibre Integration',
    sub2Es: 'Integración MercadoLibre',
    iconPath: 'M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495',
  },
  {
    industry: 'Architecture',
    name: 'Professional Substrate Ecommerce',
    nameEs: 'Ecommerce de Sustratos Profesionales',
    problem: 'Premium single-product store for a professional substrate brand. Deep UX, custom configurator, and dynamic checkout.',
    problemEs: 'Tienda premium de producto único. UX profundo, configurador a medida y checkout dinámico.',
    metric: '+58%',
    metricLabel: 'Online Sales',
    metricLabelEs: 'Ventas Online',
    sub1: 'Single-Product Deep UX',
    sub1Es: 'UX Profundo de Producto Único',
    sub2: 'Custom Configurator Built',
    sub2Es: 'Configurador a Medida Construido',
    iconPath: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
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
  },
];

const filters: { key: IndustryFilter; labelEs: string; labelEn: string }[] = [
  { key: 'all', labelEs: 'Todos', labelEn: 'All' },
  { key: 'Ecommerce', labelEs: 'Ecommerce', labelEn: 'Ecommerce' },
  { key: 'Healthcare', labelEs: 'Salud', labelEn: 'Healthcare' },
  { key: 'Marketplace', labelEs: 'Marketplace', labelEn: 'Marketplace' },
  { key: 'Architecture', labelEs: 'Arquitectura', labelEn: 'Architecture' },
  { key: 'Retail', labelEs: 'Retail', labelEn: 'Retail' },
];

export default function PortfolioCaseStudies() {
  const { lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<IndustryFilter>('all');

  const filtered = activeFilter === 'all'
    ? caseStudies
    : caseStudies.filter((cs) => cs.industry === activeFilter);

  return (
    <section className="section-padding" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                className="rounded-2xl overflow-hidden h-full flex flex-col group hover:border-primary/40 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="p-5 flex flex-col flex-1">
                  {/* Teal square icon badge */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                    style={{ background: 'rgba(0,196,160,0.15)', border: '1px solid rgba(0,196,160,0.2)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={cs.iconPath} />
                    </svg>
                  </div>

                  {/* Project name */}
                  <h3 className="font-700 text-sm text-white mb-3 leading-snug">
                    {lang === 'es' ? cs.nameEs : cs.name}
                  </h3>

                  {/* Problem description */}
                  <p className="text-xs leading-relaxed mb-5" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? cs.problemEs : cs.problem}
                  </p>

                  {/* Hero metric — large teal */}
                  <div className="mb-4">
                    <span
                      className="text-3xl font-800 leading-none block"
                      style={{ color: '#00C4A0' }}
                    >
                      {cs.metric}
                    </span>
                    <span className="text-xs font-600 mt-1 block" style={{ color: '#00C4A0' }}>
                      {lang === 'es' ? cs.metricLabelEs : cs.metricLabel}
                    </span>
                  </div>

                  {/* Supporting metrics — teal-border pills */}
                  <div className="flex flex-col gap-2 mt-auto">
                    {[
                      lang === 'es' ? cs.sub1Es : cs.sub1,
                      lang === 'es' ? cs.sub2Es : cs.sub2,
                    ].map((sub, j) => (
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