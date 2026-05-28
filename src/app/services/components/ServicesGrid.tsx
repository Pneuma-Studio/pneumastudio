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
}

const services: ServiceCard[] = [
  {
    icon: 'ShoppingCartIcon',
    title: 'Ecommerce Platforms',
    titleEs: 'Plataformas Ecommerce',
    desc: 'Custom-built, conversion-optimized storefronts.',
    descEs: 'Tiendas construidas a medida, optimizadas para conversión.',
  },
  {
    icon: 'BuildingStorefrontIcon',
    title: 'Marketplace Systems',
    titleEs: 'Sistemas Marketplace',
    desc: 'Multi-vendor, multi-category commerce engines.',
    descEs: 'Motores de comercio multi-vendedor y multi-categoría.',
  },
  {
    icon: 'CubeIcon',
    title: 'Inventory & POS',
    titleEs: 'Inventario & POS',
    desc: 'Real-time stock sync across all channels.',
    descEs: 'Sincronización de inventario en tiempo real en todos los canales.',
  },
  {
    icon: 'UserGroupIcon',
    title: 'CRM Dashboards',
    titleEs: 'CRM Dashboards',
    desc: 'Customer intelligence in a unified view.',
    descEs: 'Inteligencia de clientes en una vista unificada.',
  },
  {
    icon: 'ChatBubbleLeftRightIcon',
    title: 'WhatsApp Automation',
    titleEs: 'Automatización WhatsApp',
    desc: 'Conversational commerce & support flows.',
    descEs: 'Comercio conversacional y flujos de soporte automatizados.',
  },
  {
    icon: 'CalendarDaysIcon',
    title: 'Appointment Systems',
    titleEs: 'Sistemas de Citas',
    desc: 'Booking, reminders, calendar automation.',
    descEs: 'Reservas, recordatorios y automatización de calendario.',
  },
  {
    icon: 'ChartBarIcon',
    title: 'Business Analytics',
    titleEs: 'Analytics de Negocio',
    desc: 'Data visualization for smarter decisions.',
    descEs: 'Visualización de datos para decisiones más inteligentes.',
  },
  {
    icon: 'Squares2X2Icon',
    title: 'Custom Admin Panels',
    titleEs: 'Paneles Admin a Medida',
    desc: 'Tailored control centers for operations.',
    descEs: 'Centros de control personalizados para operaciones.',
  },
  {
    icon: 'CpuChipIcon',
    title: 'AI-assisted Workflows',
    titleEs: 'Flujos con Asistencia IA',
    desc: 'Intelligent automation & process optimization.',
    descEs: 'Automatización inteligente y optimización de procesos.',
  },
  {
    icon: 'PuzzlePieceIcon',
    title: 'API Integrations',
    titleEs: 'Integraciones API',
    desc: 'Connect any platform, tool, or data source.',
    descEs: 'Conecta cualquier plataforma, herramienta o fuente de datos.',
  },
  {
    icon: 'TagIcon',
    title: 'Mercado Libre',
    titleEs: 'Mercado Libre',
    desc: 'Full ML catalog & order management.',
    descEs: 'Gestión completa de catálogo y pedidos en ML.',
  },
  {
    icon: 'MapPinIcon',
    title: 'Multi-location Systems',
    titleEs: 'Sistemas Multi-sucursal',
    desc: 'Centralized ops across multiple branches.',
    descEs: 'Operaciones centralizadas en múltiples sucursales.',
  },
];

export default function ServicesGrid() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ScrollAnimator key={i} delay={i * 50}>
              <div
                className="rounded-xl p-6 h-full service-card"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Teal square icon badge */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300"
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
                <p className="text-sm leading-relaxed" style={{ color: '#8A9BB5' }}>
                  {lang === 'es' ? service.descEs : service.desc}
                </p>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}