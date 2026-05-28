'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import Icon from '@/components/ui/AppIcon';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const featuredServices = [
  {
    icon: 'ShoppingCartIcon',
    title: 'Ecommerce Platforms',
    titleEs: 'Plataformas Ecommerce',
    desc: 'Custom-built, conversion-optimized storefronts',
    descEs: 'Tiendas construidas a medida, optimizadas para conversión',
  },
  {
    icon: 'ChatBubbleLeftRightIcon',
    title: 'WhatsApp Automation',
    titleEs: 'Automatización WhatsApp',
    desc: 'Conversational commerce & support flows',
    descEs: 'Comercio conversacional y flujos de soporte automatizados',
  },
  {
    icon: 'ChartBarIcon',
    title: 'Business Analytics',
    titleEs: 'Analytics de Negocio',
    desc: 'Data visualization for smarter decisions',
    descEs: 'Visualización de datos para decisiones más inteligentes',
  },
  {
    icon: 'CpuChipIcon',
    title: 'AI-assisted Workflows',
    titleEs: 'Flujos con IA',
    desc: 'Intelligent automation & process optimization',
    descEs: 'Automatización inteligente y optimización de procesos',
  },
  {
    icon: 'BuildingStorefrontIcon',
    title: 'Marketplace Systems',
    titleEs: 'Sistemas Marketplace',
    desc: 'Multi-vendor, multi-category commerce engines',
    descEs: 'Motores de comercio multi-vendedor y multi-categoría',
  },
  {
    icon: 'PuzzlePieceIcon',
    title: 'API Integrations',
    titleEs: 'Integraciones API',
    desc: 'Connect any platform, tool, or data source',
    descEs: 'Conecta cualquier plataforma, herramienta o fuente de datos',
  },
];

const whoWeAreFeatures = [
  {
    icon: 'GlobeAltIcon',
    title: 'Commercial Digital Ecosystems',
    titleEs: 'Ecosistemas Digitales Comerciales',
    desc: 'Interconnected platforms designed for end-to-end commerce.',
    descEs: 'Plataformas interconectadas diseñadas para comercio integral.',
  },
  {
    icon: 'ShoppingCartIcon',
    title: 'Ecommerce Platforms',
    titleEs: 'Plataformas Ecommerce',
    desc: 'Custom-built, high-performance storefronts optimized for growth.',
    descEs: 'Tiendas de alto rendimiento construidas a medida para crecer.',
  },
  {
    icon: 'CpuChipIcon',
    title: 'Automated Operational Systems',
    titleEs: 'Sistemas Operativos Automatizados',
    desc: 'Back-end automation that removes manual bottlenecks.',
    descEs: 'Automatización de back-end que elimina cuellos de botella manuales.',
  },
  {
    icon: 'BuildingStorefrontIcon',
    title: 'Marketplace Integrations',
    titleEs: 'Integraciones Marketplace',
    desc: 'Multi-vendor and multi-location commercial architecture.',
    descEs: 'Arquitectura comercial multi-vendedor y multi-sucursal.',
  },
  {
    icon: 'ComputerDesktopIcon',
    title: 'Premium Business Interfaces',
    titleEs: 'Interfaces de Negocio Premium',
    desc: 'Admin panels, dashboards, and mobile UX with luxury design.',
    descEs: 'Paneles admin, dashboards y UX móvil con diseño de lujo.',
  },
];

const automationCards = [
  {
    icon: 'ChatBubbleLeftRightIcon',
    title: 'WhatsApp Automation',
    titleEs: 'Automatización WhatsApp',
    desc: 'Auto-replies, order confirmations, and lead qualification via intelligent conversational flows.',
    descEs: 'Respuestas automáticas, confirmaciones de pedidos y calificación de leads mediante flujos conversacionales.',
  },
  {
    icon: 'CalendarDaysIcon',
    title: 'Appointment Reminders',
    titleEs: 'Recordatorios de Citas',
    desc: 'Automated SMS, WhatsApp, and email sequences deployed before and after client bookings.',
    descEs: 'Secuencias automatizadas de SMS, WhatsApp y email antes y después de las reservas.',
  },
  {
    icon: 'BellIcon',
    title: 'Inventory Sync',
    titleEs: 'Sincronización de Inventario',
    desc: 'Real-time stock updates across POS, ecommerce, marketplaces, and supplier feeds.',
    descEs: 'Actualizaciones de stock en tiempo real en POS, ecommerce, marketplaces y proveedores.',
  },
  {
    icon: 'UserGroupIcon',
    title: 'CRM Workflows',
    titleEs: 'Flujos CRM',
    desc: 'Lead capture to conversion pipelines automated end-to-end for zero-friction growth.',
    descEs: 'Pipelines de captura a conversión automatizados de extremo a extremo.',
  },
  {
    icon: 'ChartBarIcon',
    title: 'Analytics Dashboards',
    titleEs: 'Dashboards de Analytics',
    desc: 'Live KPIs: sales, traffic, conversion, and customer LTV in a unified high-end interface.',
    descEs: 'KPIs en vivo: ventas, tráfico, conversión y LTV en una interfaz unificada de alto nivel.',
  },
  {
    icon: 'UserPlusIcon',
    title: 'Lead Capture',
    titleEs: 'Captura de Leads',
    desc: 'Embedded forms, chatbots, and landing pages directly connected to your core CRM.',
    descEs: 'Formularios embebidos, chatbots y landing pages conectados directamente a tu CRM.',
  },
];

const uxCards = [
  {
    icon: 'DevicePhoneMobileIcon',
    title: 'Elegant Mobile Interfaces',
    titleEs: 'Interfaces Móviles Elegantes',
    desc: 'Thumb-optimized, gesture-driven, and buttery smooth responsiveness.',
    descEs: 'Optimizadas para el pulgar, gestos fluidos y responsividad perfecta.',
  },
  {
    icon: 'ShoppingCartIcon',
    title: 'Smooth Ecommerce',
    titleEs: 'Ecommerce Fluido',
    desc: 'Frictionless discovery through cart to final checkout flow.',
    descEs: 'Descubrimiento sin fricción desde el carrito hasta el checkout final.',
  },
  {
    icon: 'SparklesIcon',
    title: 'Luxury UI Design',
    titleEs: 'Diseño UI de Lujo',
    desc: 'Every pixel intentional; typography that commands brand attention.',
    descEs: 'Cada píxel intencional; tipografía que captura la atención de la marca.',
  },
  {
    icon: 'BoltIcon',
    title: 'Fast Navigation',
    titleEs: 'Navegación Rápida',
    desc: 'Sub-second page transitions and optimistic UI performance.',
    descEs: 'Transiciones de página en menos de un segundo y rendimiento UI optimista.',
  },
  {
    icon: 'FilmIcon',
    title: 'Cinematic Interfaces',
    titleEs: 'Interfaces Cinematográficas',
    desc: 'Depth, motion, and light — digital spaces that feel alive.',
    descEs: 'Profundidad, movimiento y luz — espacios digitales que se sienten vivos.',
  },
];

const visionPillars = [
  {
    icon: 'Squares2X2Icon',
    title: 'Systems',
    titleEs: 'Sistemas',
    desc: 'Proprietary platforms and custom architectures that competitors simply cannot replicate.',
    descEs: 'Plataformas propietarias y arquitecturas personalizadas que los competidores no pueden replicar.',
  },
  {
    icon: 'CpuChipIcon',
    title: 'Automation',
    titleEs: 'Automatización',
    desc: 'Operational efficiency that compounds over time, reducing errors and human overhead.',
    descEs: 'Eficiencia operativa que se acumula con el tiempo, reduciendo errores y carga humana.',
  },
  {
    icon: 'UserGroupIcon',
    title: 'Customer Experience',
    titleEs: 'Experiencia del Cliente',
    desc: 'Frictionless digital touchpoints that build long-term loyalty and brand prestige.',
    descEs: 'Puntos de contacto digitales sin fricción que construyen lealtad a largo plazo.',
  },
  {
    icon: 'ChartBarIcon',
    title: 'Data Intelligence',
    titleEs: 'Inteligencia de Datos',
    desc: 'Real-time analytics and predictive insights guiding every strategic decision.',
    descEs: 'Analytics en tiempo real e insights predictivos que guían cada decisión estratégica.',
  },
  {
    icon: 'BoltIcon',
    title: 'Operational Efficiency',
    titleEs: 'Eficiencia Operativa',
    desc: 'Do more with less — scale operations without scaling technical headcount.',
    descEs: 'Haz más con menos — escala operaciones sin aumentar el equipo técnico.',
  },
];

export default function FeaturedServicesSection() {
  const { lang } = useLanguage();

  return (
    <>
      {/* ── WHO WE ARE ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: '#050D1A' }}>
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.07) 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollAnimator>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">
                  {lang === 'es' ? 'QUIÉNES SOMOS' : 'WHO WE ARE'}
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-800"
                style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}
              >
                <span className="text-white">
                  {lang === 'es' ? 'Tecnología premium para negocios' : 'Premium technology for businesses'}
                </span>
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.7) 40%, #00C4A0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {lang === 'es' ? 'que quieren escalar.' : 'that want to scale.'}
                </span>
              </h2>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left — copy + stats + quote */}
            <ScrollAnimator delay={80}>
              <div>
                <p className="text-base font-700 text-white leading-snug mb-4">
                  {lang === 'es'
                    ? 'Pneuma Studio diseña y construye ecosistemas digitales comerciales completos que redefinen la infraestructura competitiva.'
                    : 'Pneuma Studio architects and builds complete commercial digital ecosystems that redefine competitive infrastructure.'}
                </p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: '#8A9BB5' }}>
                  {lang === 'es'
                    ? 'Nos especializamos en storefronts de alto rendimiento, back-ends operativos automatizados e interfaces de negocio premium. Diseñamos sistemas que no solo escriben código — construyen el futuro de tus operaciones comerciales.'
                    : "We specialize in high-performance storefronts, automated operational back-ends, and premium business interfaces. We design systems that don't just write code — they build the future of your commercial operations."}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { num: '12+', label: lang === 'es' ? 'Proyectos' : 'Projects' },
                    { num: '5', label: lang === 'es' ? 'Industrias' : 'Industries' },
                    { num: '3–5', label: lang === 'es' ? 'Sem. entrega' : 'Wks. delivery' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-4 text-center"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      <p className="text-2xl font-800 mb-0.5" style={{ color: '#00C4A0' }}>{stat.num}</p>
                      <p className="text-xs" style={{ color: '#8A9BB5' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Quote block */}
                <div
                  className="rounded-xl p-5 relative overflow-hidden"
                  style={{
                    background: 'rgba(0,196,160,0.06)',
                    border: '1px solid rgba(0,196,160,0.2)',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,160,0.5), transparent)' }}
                  />
                  <svg viewBox="0 0 24 24" fill="#00C4A0" className="w-5 h-5 mb-3 opacity-40">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-sm font-700 leading-relaxed" style={{ color: '#00C4A0' }}>
                    {lang === 'es'
                      ? '"Un socio tecnológico estratégico para negocios modernos y agencias que buscan escalar sin fricción."'
                      : '"A strategic technology partner for modern businesses and agencies looking to scale without friction."'}
                  </p>
                </div>
              </div>
            </ScrollAnimator>

            {/* Right — feature rows */}
            <ScrollAnimator delay={120}>
              <div className="flex flex-col gap-3">
                {whoWeAreFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl service-card"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,196,160,0.12)', border: '1px solid rgba(0,196,160,0.15)' }}
                    >
                      <Icon name={feat.icon as any} size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-700 text-sm text-white mb-0.5">
                        {lang === 'es' ? feat.titleEs : feat.title}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: '#8A9BB5' }}>
                        {lang === 'es' ? feat.descEs : feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: '#0A1628' }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,196,160,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollAnimator>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                  <span className="label-tag text-primary">SYSTEMS</span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-800 text-white"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {lang === 'es' ? 'Lo Que Construimos' : 'What We Build'}
                  <span style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, #00C4A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {lang === 'es' ? ': Soluciones Digitales' : ': Digital Solutions'}
                  </span>
                </h2>
              </div>
              <Link
                href="/services"
                className="flex items-center gap-2 text-sm font-600 shrink-0 transition-colors duration-200"
                style={{ color: '#8A9BB5' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00C4A0')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8A9BB5')}
              >
                {lang === 'es' ? 'Ver todos los servicios' : 'View all services'}
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredServices.map((service, i) => (
              <ScrollAnimator key={i} delay={i * 70}>
                <div
                  className="rounded-xl p-6 h-full service-card"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
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
                  <p className="text-sm leading-relaxed" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? service.descEs : service.desc}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTOMATION ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: '#050D1A' }}>
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.06) 0%, transparent 65%)', filter: 'blur(70px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollAnimator>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">AUTOMATION</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-800 text-white mb-3"
                style={{ letterSpacing: '-0.02em' }}
              >
                {lang === 'es' ? 'Automatiza operaciones.' : 'Automate operations.'}
                {' '}
                <span style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, #00C4A0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {lang === 'es' ? 'Escala inteligentemente.' : 'Scale intelligently.'}
                </span>
              </h2>
              <p className="text-sm max-w-xl" style={{ color: '#8A9BB5' }}>
                {lang === 'es'
                  ? '¿Tu operación realmente está escalando o solo se está volviendo más compleja?'
                  : 'Is your operation truly scaling or just getting more complex?'}
              </p>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {automationCards.map((card, i) => (
              <ScrollAnimator key={i} delay={i * 70}>
                <div
                  className="rounded-xl p-6 h-full service-card"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: 'rgba(0,196,160,0.12)',
                      border: '1px solid rgba(0,196,160,0.15)',
                    }}
                  >
                    <Icon name={card.icon as any} size={22} className="text-primary" />
                  </div>
                  <h3 className="font-700 text-base mb-2.5 text-white">
                    {lang === 'es' ? card.titleEs : card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? card.descEs : card.desc}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* ── UX / EXPERIENCE ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: '#0A1628' }}>
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)', filter: 'blur(70px)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollAnimator>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">EXPERIENCE</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-800 text-white leading-tight mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                {lang === 'es'
                  ? 'Cada interacción está diseñada para'
                  : 'Every interaction is designed to'}
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.7) 40%, #00C4A0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {lang === 'es' ? 'elevar la percepción de marca.' : 'elevate brand perception.'}
                </span>
              </h2>
              <p className="text-sm max-w-2xl" style={{ color: '#8A9BB5' }}>
                {lang === 'es'
                  ? 'Pneuma Studio no construye herramientas — construye experiencias digitales. El UX premium no es un lujo; es el producto.'
                  : "Pneuma Studio doesn't build tools — it builds digital experiences. Premium UX is not a luxury; it is the product."}
              </p>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {uxCards.map((card, i) => (
              <ScrollAnimator key={i} delay={i * 70}>
                <div
                  className="rounded-xl p-5 h-full service-card"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(0,196,160,0.12)',
                      border: '1px solid rgba(0,196,160,0.15)',
                    }}
                  >
                    <Icon name={card.icon as any} size={22} className="text-primary" />
                  </div>
                  <h3 className="font-700 text-sm mb-2 text-white leading-snug">
                    {lang === 'es' ? card.titleEs : card.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? card.descEs : card.desc}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>

          <ScrollAnimator delay={300}>
            <div
              className="flex items-center justify-between mt-10 pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">
                  {lang === 'es' ? 'ARQUITECTANDO INFRAESTRUCTURA COMPETITIVA' : 'ARCHITECTING COMPETITIVE INFRASTRUCTURE'}
                </span>
              </div>
              <span className="text-xs hidden sm:block" style={{ color: '#8A9BB5' }}>Pneuma Studio Design System v2.0</span>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="section-padding relative overflow-hidden" style={{ background: '#050D1A' }}>
        <div
          className="absolute top-0 right-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.06) 0%, transparent 65%)', filter: 'blur(80px)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <ScrollAnimator>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">VISION</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-800 text-white"
                style={{ letterSpacing: '-0.02em' }}
              >
                {lang === 'es' ? 'El Futuro Es Infraestructura Digital' : 'The Future Is Digital Infrastructure'}
              </h2>
            </div>
          </ScrollAnimator>

          {/* Cinematic quote block */}
          <ScrollAnimator delay={80}>
            <div
              className="rounded-2xl p-8 sm:p-10 mb-10 relative overflow-hidden"
              style={{
                background: 'rgba(0,196,160,0.05)',
                border: '1px solid rgba(0,196,160,0.18)',
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,160,0.6), transparent)' }}
              />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-px" style={{ background: '#00C4A0' }} />
              <div className="absolute top-0 left-0 h-16 w-px" style={{ background: '#00C4A0' }} />
              <div className="absolute bottom-0 right-0 w-16 h-px" style={{ background: 'rgba(0,196,160,0.4)' }} />
              <div className="absolute bottom-0 right-0 h-16 w-px" style={{ background: 'rgba(0,196,160,0.4)' }} />
              {/* Ambient inner glow */}
              <div
                className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,196,160,0.08) 0%, transparent 70%)' }}
              />

              <svg viewBox="0 0 24 24" fill="#00C4A0" className="w-8 h-8 mb-5 opacity-30">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-lg sm:text-xl font-700 text-white leading-relaxed relative">
                {lang === 'es' ? (
                  <>
                    Los negocios más competitivos de la próxima década no ganarán solo con productos.{' '}
                    <span style={{ color: '#00C4A0' }}>Ganarán a través de sistemas.</span>{' '}
                    Los negocios que automatizan más rápido, sirven mejor y operan con menos recursos dominarán el mercado.
                  </>
                ) : (
                  <>
                    The most competitive businesses of the next decade won&apos;t win through products alone.{' '}
                    <span style={{ color: '#00C4A0' }}>They&apos;ll win through systems.</span>{' '}
                    Businesses that automate faster, serve better, and operate leaner will dominate the market.
                  </>
                )}
              </p>
            </div>
          </ScrollAnimator>

          {/* 5 vision pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {visionPillars.map((pillar, i) => (
              <ScrollAnimator key={i} delay={i * 70}>
                <div
                  className="rounded-xl p-5 h-full service-card relative overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="absolute top-0 left-4 right-4 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,160,0.3), transparent)' }}
                  />
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(0,196,160,0.12)',
                      border: '1px solid rgba(0,196,160,0.15)',
                    }}
                  >
                    <Icon name={pillar.icon as any} size={22} className="text-primary" />
                  </div>
                  <h3 className="font-700 text-sm mb-2 text-white">
                    {lang === 'es' ? pillar.titleEs : pillar.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? pillar.descEs : pillar.desc}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
