'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import Icon from '@/components/ui/AppIcon';

interface ServiceCard {
  icon: string;
  title: string;
  titleEs: string;
  desc: string;
  descEs: string;
  tag?: string;
  tagEs?: string;
  price: string;
}

const services: ServiceCard[] = [
  {
    icon: 'ShoppingCartIcon',
    title: 'Ecommerce Platforms',
    titleEs: 'Plataformas Ecommerce',
    desc: 'Custom-built, conversion-optimized storefronts with full catalog management.',
    descEs: 'Tiendas construidas a medida, optimizadas para conversión con gestión de catálogo.',
    tag: 'CORE',
    tagEs: 'NÚCLEO',
    price: 'Desde $45,900 MXN',
  },
  {
    icon: 'BuildingStorefrontIcon',
    title: 'Marketplace Systems',
    titleEs: 'Sistemas Marketplace',
    desc: 'Multi-vendor, multi-category commerce engines with real-time sync.',
    descEs: 'Motores de comercio multi-vendedor y multi-categoría con sincronización en tiempo real.',
    tag: 'CORE',
    tagEs: 'NÚCLEO',
    price: 'Desde $75,900 MXN',
  },
  {
    icon: 'CubeIcon',
    title: 'Inventory & POS',
    titleEs: 'Inventario & POS',
    desc: 'Real-time stock sync across all channels, locations, and platforms.',
    descEs: 'Sincronización de inventario en tiempo real en todos los canales y sucursales.',
    price: 'Desde $45,900 MXN',
  },
  {
    icon: 'UserGroupIcon',
    title: 'CRM Dashboards',
    titleEs: 'CRM Dashboards',
    desc: 'Customer intelligence centralized in a unified, actionable view.',
    descEs: 'Inteligencia de clientes centralizada en una vista unificada y accionable.',
    price: 'Desde $75,900 MXN',
  },
  {
    icon: 'ChatBubbleLeftRightIcon',
    title: 'WhatsApp Automation',
    titleEs: 'Automatización WhatsApp',
    desc: 'Conversational commerce, support flows, and order notifications.',
    descEs: 'Comercio conversacional, flujos de soporte y notificaciones de pedidos.',
    tag: 'POPULAR',
    tagEs: 'POPULAR',
    price: 'Desde $25,000 MXN',
  },
  {
    icon: 'CalendarDaysIcon',
    title: 'Appointment Systems',
    titleEs: 'Sistemas de Citas',
    desc: 'Booking, automated reminders, and full calendar management.',
    descEs: 'Reservas, recordatorios automáticos y gestión completa de calendario.',
    price: 'Desde $25,000 MXN',
  },
  {
    icon: 'ChartBarIcon',
    title: 'Business Analytics',
    titleEs: 'Analytics de Negocio',
    desc: 'Real-time data visualization for faster, smarter decisions.',
    descEs: 'Visualización de datos en tiempo real para decisiones más inteligentes.',
    price: 'Desde $45,900 MXN',
  },
  {
    icon: 'Squares2X2Icon',
    title: 'Custom Admin Panels',
    titleEs: 'Paneles Admin a Medida',
    desc: 'Tailored control centers built around your exact operation.',
    descEs: 'Centros de control personalizados construidos alrededor de tu operación.',
    price: 'Desde $45,900 MXN',
  },
  {
    icon: 'CpuChipIcon',
    title: 'AI-assisted Workflows',
    titleEs: 'Flujos con Asistencia IA',
    desc: 'Intelligent automation and process optimization at every layer.',
    descEs: 'Automatización inteligente y optimización de procesos en cada capa.',
    tag: 'NEW',
    tagEs: 'NUEVO',
    price: 'Desde $75,900 MXN',
  },
  {
    icon: 'PuzzlePieceIcon',
    title: 'API Integrations',
    titleEs: 'Integraciones API',
    desc: 'Connect any platform, tool, or data source seamlessly.',
    descEs: 'Conecta cualquier plataforma, herramienta o fuente de datos sin fricción.',
    price: 'Desde $25,000 MXN',
  },
  {
    icon: 'TagIcon',
    title: 'Mercado Libre',
    titleEs: 'Mercado Libre',
    desc: 'Full ML catalog, listing automation, and order management.',
    descEs: 'Catálogo ML completo, automatización de listados y gestión de pedidos.',
    price: 'Desde $25,000 MXN',
  },
  {
    icon: 'MapPinIcon',
    title: 'Multi-location Systems',
    titleEs: 'Sistemas Multi-sucursal',
    desc: 'Centralized operations and reporting across all branches.',
    descEs: 'Operaciones y reportes centralizados en todas las sucursales.',
    price: 'Desde $75,900 MXN',
  },
];

export default function ServicesGrid() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#0A1628' }}>
      {/* Ambient orbs */}
      <div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <ScrollAnimator>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
              <span className="label-tag text-primary">{lang === 'es' ? 'CATÁLOGO COMPLETO' : 'FULL CATALOG'}</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-800 text-white mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              {lang === 'es' ? 'Cada sistema que tu negocio necesita.' : 'Every system your business needs.'}
            </h2>
            <p className="text-sm max-w-xl" style={{ color: '#8A9BB5' }}>
              {lang === 'es'
                ? 'Desde tiendas hasta automatizaciones — construidos para operar a escala desde el día uno.'
                : 'From storefronts to automations — built to operate at scale from day one.'}
            </p>
          </div>
        </ScrollAnimator>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ScrollAnimator key={i} delay={i * 50}>
              <div
                className="rounded-xl p-6 h-full service-card relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Tag badge */}
                {service.tag && (
                  <div
                    className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] font-700 tracking-widest"
                    style={{
                      background: service.tag === 'POPULAR' || service.tagEs === 'POPULAR'
                        ? 'rgba(0,196,160,0.15)'
                        : 'rgba(99,102,241,0.12)',
                      color: service.tag === 'POPULAR' || service.tagEs === 'POPULAR'
                        ? '#00C4A0'
                        : '#a5b4fc',
                      border: `1px solid ${service.tag === 'POPULAR' || service.tagEs === 'POPULAR' ? 'rgba(0,196,160,0.25)' : 'rgba(99,102,241,0.2)'}`,
                    }}
                  >
                    {lang === 'es' ? service.tagEs : service.tag}
                  </div>
                )}

                {/* Teal square icon badge */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(0,196,160,0.12)',
                    border: '1px solid rgba(0,196,160,0.15)',
                  }}
                >
                  <Icon name={service.icon as any} size={22} className="text-primary" />
                </div>

                <h3 className="font-700 text-base mb-2.5 text-white">
                  {lang === 'es' ? service.titleEs : service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#8A9BB5' }}>
                  {lang === 'es' ? service.descEs : service.desc}
                </p>
                <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-xs font-700 tracking-wide" style={{ color: '#00C4A0' }}>
                    {service.price}
                  </span>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>

        <p className="mt-8 text-xs" style={{ color: 'rgba(138,155,181,0.5)' }}>
          {lang === 'es'
            ? '* Cada servicio incluye una mensualidad base de mantenimiento y soporte.'
            : '* Every service includes a base monthly maintenance and support fee.'}
        </p>
      </div>
    </section>
  );
}
