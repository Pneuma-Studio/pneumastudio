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
                  {lang === 'es' ?'Pneuma Studio diseña y construye ecosistemas digitales comerciales completos que redefinen la infraestructura competitiva.' :'Pneuma Studio architects and builds complete commercial digital ecosystems that redefine competitive infrastructure.'}
                </p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: '#8A9BB5' }}>
                  {lang === 'es' ?'Nos especializamos en storefronts de alto rendimiento, back-ends operativos automatizados e interfaces de negocio premium. Diseñamos sistemas que no solo escriben código — construyen el futuro de tus operaciones comerciales.'
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
                    {lang === 'es' ?'"Un socio tecnológico estratégico para negocios modernos y agencias que buscan escalar sin fricción."' : '"A strategic technology partner for modern businesses and agencies looking to scale without friction."'}
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

      {/* ── 6 SERVICES GRID ── */}
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
                {lang === 'es' ? 'Ver todos' : 'View all'}
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

          {/* Bottom CTA strip */}
          <ScrollAnimator delay={450}>
            <div
              className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-5"
              style={{
                background: 'rgba(0,196,160,0.05)',
                border: '1px solid rgba(0,196,160,0.15)',
              }}
            >
              <p className="text-sm font-600" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {lang === 'es' ?'¿Buscas algo más específico? Explora todos nuestros servicios.' :'Looking for something more specific? Explore all our services.'}
              </p>
              <Link
                href="/services"
                className="btn-ghost text-sm px-6 py-2.5 shrink-0 flex items-center gap-2"
              >
                {lang === 'es' ? 'Ver todos los servicios' : 'View All Services'}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </ScrollAnimator>
        </div>
      </section>
    </>
  );
}
