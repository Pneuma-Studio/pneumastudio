'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import Icon from '@/components/ui/AppIcon';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Who We Are section — slide 2 layout
// Automation 6-card 2×3 grid — slide 7
// UX/Experience 5-card horizontal row — slide 8
// Vision quote block — slide 10

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
    desc: 'Depth, motion, and light digital spaces that feel alive.',
    descEs: 'Profundidad, movimiento y espacios digitales que se sienten vivos.',
  },
];

export default function FeaturedServicesSection() {
  const { t, lang } = useLanguage();

  return (
    <>
      {/* ── WHO WE ARE — Slide 2 layout ── */}
      <section className="section-padding" style={{ background: '#050D1A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollAnimator>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">
                  {lang === 'es' ? 'QUIÉNES SOMOS' : 'WHO WE ARE'}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-800 text-white" style={{ letterSpacing: '-0.02em' }}>
                {lang === 'es' ?'Tecnología premium para negocios que quieren escalar.' :'Premium technology for businesses that want to scale.'}
              </h2>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left — copy + quote */}
            <ScrollAnimator delay={80}>
              <div>
                <p className="text-base font-700 text-white leading-snug mb-4">
                  {lang === 'es' ?'Pneuma Studio diseña y construye ecosistemas digitales comerciales completos que redefinen la infraestructura competitiva.' :'Pneuma Studio architects and builds complete commercial digital ecosystems that redefine competitive infrastructure.'}
                </p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: '#8A9BB5' }}>
                  {lang === 'es' ?'Nos especializamos en storefronts de alto rendimiento, back-ends operativos automatizados e interfaces de negocio premium. Nuestro enfoque es diseñar sistemas que no solo escriben código, sino que construyen el futuro de tus operaciones comerciales.'
                    : "We specialize in high-performance ecommerce storefronts, automated operational back-ends, and premium business interfaces. Our focus is on designing systems that don't just write code, but build the future of your commercial operations."}
                </p>
                {/* Vision quote block with teal left border */}
                <div
                  className="rounded-lg p-5"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderLeft: '3px solid #00C4A0',
                  }}
                >
                  <p className="text-sm font-700 leading-relaxed" style={{ color: '#00C4A0' }}>
                    {lang === 'es' ?'"Un socio tecnológico estratégico para negocios modernos y agencias que buscan escalar sin fricción."' : '"A strategic technology partner for modern businesses and agencies looking to scale without friction."'}
                  </p>
                </div>
              </div>
            </ScrollAnimator>

            {/* Right — feature rows with teal square icon badges */}
            <ScrollAnimator delay={120}>
              <div className="flex flex-col gap-3">
                {whoWeAreFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl service-card"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,196,160,0.12)' }}
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

      {/* ── SERVICES GRID — Slide 3 layout ── */}
      <section className="section-padding" style={{ background: '#0A1628' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollAnimator>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                  <span className="label-tag text-primary">SYSTEMS</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-800 text-white" style={{ letterSpacing: '-0.02em' }}>
                  {lang === 'es' ? 'Lo Que Construimos: Soluciones Digitales' : 'What We Build: Digital Solutions'}
                </h2>
              </div>
              <Link href="/services" className="flex items-center gap-2 text-sm font-600 text-muted-foreground hover:text-primary transition-colors group shrink-0">
                {lang === 'es' ? 'Ver todos los servicios' : 'View all services'}
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
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

      {/* ── AUTOMATION 6-CARD 2×3 GRID — Slide 7 ── */}
      <section className="section-padding" style={{ background: '#050D1A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollAnimator>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">SYSTEMS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-800 text-white" style={{ letterSpacing: '-0.02em' }}>
                {lang === 'es' ? 'Automatiza operaciones. Escala inteligentemente.' : 'Automate operations. Scale intelligently.'}
              </h2>
              <p className="mt-2 text-sm italic" style={{ color: '#00C4A0' }}>
                {lang === 'es' ?'¿Tu operación realmente está escalando o solo se está volviendo más compleja?' :'Is your operation truly scaling or just getting more complex?'}
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
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
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

      {/* ── UX/EXPERIENCE 5-CARD HORIZONTAL ROW — Slide 8 ── */}
      <section className="section-padding" style={{ background: '#0A1628' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollAnimator>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">EXPERIENCE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-800 text-white leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {lang === 'es' ?'Cada interacción está diseñada para elevar la percepción de la marca.' :'Every interaction is designed to elevate the perception of the brand.'}
              </h2>
              <div className="mt-4">
                <p className="text-base font-700 text-white">
                  {lang === 'es' ?'Pneuma Studio no construye herramientas, construye experiencias digitales. El UX premium no es un lujo; es el producto.'
                    : "Pneuma Studio doesn't build tools, it builds digital experiences. Premium UX is not a luxury; it is the product."}
                </p>
                <p className="text-sm mt-2" style={{ color: '#8A9BB5' }}>
                  {lang === 'es' ?'Interfaces cinematográficas y navegación fluida para elevar la percepción de marca en cada interacción.' :'Cinematic interfaces and fluid navigation to elevate brand perception through every interaction.'}
                </p>
              </div>
            </div>
          </ScrollAnimator>

          {/* 5-card horizontal row */}
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
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
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

          {/* Footer tag */}
          <ScrollAnimator delay={300}>
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
              <span className="label-tag text-primary">
                {lang === 'es' ? 'ARQUITECTANDO INFRAESTRUCTURA COMPETITIVA' : 'ARCHITECTING COMPETITIVE INFRASTRUCTURE'}
              </span>
              <span className="text-xs" style={{ color: '#8A9BB5' }}>Pneuma Studio Design System v2.0</span>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* ── VISION QUOTE BLOCK — Slide 10 ── */}
      <section className="section-padding" style={{ background: '#050D1A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollAnimator>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">VISION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-800 text-white" style={{ letterSpacing: '-0.02em' }}>
                {lang === 'es' ? 'El Futuro Es Infraestructura Digital' : 'The Future Is Digital Infrastructure'}
              </h2>
            </div>
          </ScrollAnimator>

          {/* Large quote block with teal inline highlight */}
          <ScrollAnimator delay={80}>
            <div
              className="rounded-xl p-6 sm:p-8 mb-10"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderLeft: '3px solid #00C4A0',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeftWidth: '3px',
                borderLeftColor: '#00C4A0',
              }}
            >
              <p className="text-base sm:text-lg font-700 text-white leading-relaxed">
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
            {[
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
                desc: 'The ability to do more with less, scaling operations without scaling technical headcount.',
                descEs: 'La capacidad de hacer más con menos, escalando operaciones sin aumentar el equipo técnico.',
              },
            ].map((pillar, i) => (
              <ScrollAnimator key={i} delay={i * 70}>
                <div
                  className="rounded-xl p-5 h-full service-card"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
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