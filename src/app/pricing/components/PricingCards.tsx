'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

type Currency = 'MXN' | 'USD';

interface PricingTier {
  name: string;
  popular?: boolean;
  mxnInitial: string;
  mxnMonthly: string;
  mxnMaintenance: string;
  usdInitial: string;
  usdMonthly: string;
  features: string[];
  featuresEs: string[];
  expandedFeatures: string[];
  expandedFeaturesEs: string[];
  description: string;
  descriptionEs: string;
  cta: string;
  ctaEs: string;
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    mxnInitial: '$25,000',
    mxnMonthly: '$699',
    mxnMaintenance: '$1,500',
    usdInitial: '$2,999',
    usdMonthly: '$199',
    description: 'Ideal for businesses establishing their first professional web presence.',
    descriptionEs: 'Ideal para negocios que establecen su primera presencia web profesional.',
    features: [
      'Professional website',
      'Custom domain',
      'Contact forms',
      'Pre-configured WhatsApp messages',
    ],
    featuresEs: [
      'Sitio web profesional',
      'Dominio personalizado',
      'Formulario de contacto',
      'Mensajes preconfigurados WhatsApp',
    ],
    expandedFeatures: [
      'Professional website',
      'Custom domain',
      'Contact forms',
      'Pre-configured WhatsApp messages',
      'Google Analytics installed',
      'Mobile-responsive design',
      'Monthly support (4 hrs)',
      '$1,500 MXN/mo maintenance (variable — only when needed)',
    ],
    expandedFeaturesEs: [
      'Sitio web profesional',
      'Dominio personalizado',
      'Formulario de contacto',
      'Mensajes preconfigurados de WhatsApp',
      'Google Analytics instalado',
      'Diseño adaptable a móvil',
      'Soporte mensual (4 hrs)',
      'Mantenimiento $1,500 MXN/mes (variable — solo cuando se necesite)',
    ],
    cta: 'Start with Starter',
    ctaEs: 'Comenzar con Starter',
  },
  {
    name: 'Esencial',
    mxnInitial: '$45,900',
    mxnMonthly: '$999',
    mxnMaintenance: '$2,000',
    usdInitial: '$5,999',
    usdMonthly: '$359',
    description: 'Professional digital presence with a premium multi-page website.',
    descriptionEs: 'Presencia digital profesional con sitio web premium multi-página.',
    features: [
      'Everything in Starter +',
      'Premium multi-page website',
      'Advanced contact forms',
      'Advanced Google Analytics',
    ],
    featuresEs: [
      'Todo lo de Starter +',
      'Sitio web premium multi-página',
      'Formularios de contacto avanzados',
      'Google Analytics avanzado',
    ],
    expandedFeatures: [
      'Everything in Starter +',
      'Premium multi-page website',
      'Advanced contact & lead capture forms',
      'Advanced Google Analytics',
      'Monthly support (8 hrs)',
      '$2,000 MXN/mo maintenance (required)',
    ],
    expandedFeaturesEs: [
      'Todo lo de Starter +',
      'Sitio web premium multi-página',
      'Formularios avanzados de contacto y captura de leads',
      'Google Analytics avanzado',
      'Soporte mensual (8 hrs)',
      'Mantenimiento $2,000 MXN/mes (requerido)',
    ],
    cta: 'Start with Essential',
    ctaEs: 'Comenzar con Esencial',
  },
  {
    name: 'Professional',
    popular: true,
    mxnInitial: '$75,900',
    mxnMonthly: '$1,699',
    mxnMaintenance: '$4,000',
    usdInitial: '$10,999',
    usdMonthly: '$699',
    description: 'A complete commercial platform with checkout, payments, and advanced analytics.',
    descriptionEs: 'Plataforma comercial completa con checkout, pagos y analítica avanzada.',
    features: [
      'Everything in Esencial +',
      'Shopping cart & payments',
      'Admin panel & coupons',
      'Advanced analytics & sales dashboard',
    ],
    featuresEs: [
      'Todo lo de Esencial +',
      'Carrito de compras y pagos',
      'Panel admin y cupones',
      'Analytics avanzado y dashboard de ventas',
    ],
    expandedFeatures: [
      'Everything in Esencial +',
      'Shopping cart & checkout',
      'Card payment processing',
      'Admin panel',
      'Coupons & site content manager',
      'Advanced analytics',
      'Sales dashboard',
      'Lead capture system',
      'Monthly support (12 hrs)',
      '$4,000 MXN/mo maintenance (required)',
    ],
    expandedFeaturesEs: [
      'Todo lo de Esencial +',
      'Carrito de compras y checkout',
      'Pagos con tarjeta',
      'Panel administrativo',
      'Cupones y gestor de contenido del sitio',
      'Analytics avanzado',
      'Dashboard de ventas',
      'Sistema de captura de prospectos',
      'Soporte mensual (12 hrs)',
      'Mantenimiento $4,000 MXN/mes (requerido)',
    ],
    cta: 'Start with Professional',
    ctaEs: 'Comenzar con Professional',
  },
  {
    name: 'Premium',
    mxnInitial: '$125,900',
    mxnMonthly: '$2,699',
    mxnMaintenance: '$7,500',
    usdInitial: '$17,999',
    usdMonthly: '$999',
    description: 'Full commerce intelligence with CRM, smart responses, and priority support.',
    descriptionEs: 'Inteligencia comercial completa con CRM, respuestas inteligentes y soporte prioritario.',
    features: [
      'Everything in Professional +',
      'Customer purchase history',
      'Intelligent responses & CRM follow-up',
      'Priority support',
    ],
    featuresEs: [
      'Todo lo de Professional +',
      'Historial de compras por cliente',
      'Respuestas inteligentes y seguimiento CRM',
      'Soporte prioritario',
    ],
    expandedFeatures: [
      'Everything in Professional +',
      'Customer purchase history',
      'Commercial follow-up system',
      'Intelligent automated responses',
      'Advanced reports',
      'Product profitability analytics',
      'Priority support',
      '$7,500 MXN/mo maintenance (required)',
    ],
    expandedFeaturesEs: [
      'Todo lo de Professional +',
      'Historial de compras por cliente',
      'Sistema de seguimiento comercial',
      'Respuestas inteligentes automatizadas',
      'Reportes avanzados',
      'Rentabilidad por producto',
      'Soporte prioritario',
      'Mantenimiento $7,500 MXN/mes (requerido)',
    ],
    cta: 'Start with Premium',
    ctaEs: 'Comenzar con Premium',
  },
  {
    name: 'Enterprise',
    mxnInitial: 'Desde $180,000',
    mxnMonthly: 'Desde $4,900',
    mxnMaintenance: 'Negociable',
    usdInitial: 'From $35,000',
    usdMonthly: 'From $4,000',
    description: 'Fully custom architecture with a dedicated team, SLA, and enterprise-grade support.',
    descriptionEs: 'Arquitectura completamente personalizada con equipo dedicado, SLA y soporte enterprise.',
    features: [
      'Everything in Premium +',
      'Custom architecture',
      'Dedicated team',
      'SLA & enterprise support',
    ],
    featuresEs: [
      'Todo lo de Premium +',
      'Arquitectura personalizada',
      'Equipo dedicado',
      'SLA y soporte enterprise',
    ],
    expandedFeatures: [
      'Everything in Premium +',
      'Fully custom system architecture',
      'Dedicated support team',
      'Guaranteed SLA uptime',
      'Dedicated account manager',
      '4-hr guaranteed response time',
      'Negotiated hourly rate for development',
      'Negotiable maintenance fee',
    ],
    expandedFeaturesEs: [
      'Todo lo de Premium +',
      'Arquitectura de sistema totalmente personalizada',
      'Equipo de soporte dedicado',
      'SLA de disponibilidad garantizado',
      'Gerente de cuenta asignado',
      'Tiempo de respuesta garantizado en 4 hrs',
      'Tarifa horaria pactada para desarrollo',
      'Tarifa de mantenimiento negociable',
    ],
    cta: 'Contact for Enterprise',
    ctaEs: 'Contactar para Enterprise',
  },
];

export default function PricingCards() {
  const { t, lang } = useLanguage();
  const [currency, setCurrency] = useState<Currency>('MXN');
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const activeTier = tiers.find(t => t.name === expandedTier) ?? null;

  useEffect(() => {
    if (!expandedTier) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpandedTier(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [expandedTier]);

  return (
    <section className="pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Currency Toggle */}
        <ScrollAnimator>
          <div className="flex justify-center mb-10">
            <div
              className="flex items-center gap-1 p-1 rounded-xl"
              style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
            >
              {(['MXN', 'USD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-5 py-2 rounded-lg text-sm font-700 transition-all duration-200 ${
                    currency === c
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {c === 'MXN' ? '🇲🇽 MXN' : '🇺🇸 USD'}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimator>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch">
          {tiers.map((tier, i) => (
            <ScrollAnimator key={tier.name} delay={i * 70} className="h-full">
              {tier.popular ? (
                <div
                  className="relative rounded-xl flex flex-col h-full cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '2px solid #00C4A0',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 0 40px rgba(0,196,160,0.18), 0 0 80px rgba(0,196,160,0.06), 0 8px 32px rgba(0,0,0,0.4)',
                    transform: 'scale(1.02)',
                  }}
                  onClick={() => setExpandedTier(tier.name)}
                >
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className="label-tag px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1.5"
                      style={{ background: '#00C4A0', color: '#050D1A', boxShadow: '0 0 16px rgba(0,196,160,0.5)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#050D1A', opacity: 0.6 }} />
                      {t('pricing.popular')}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,196,160,0.12) 0%, transparent 60%)' }} />
                  <div className="relative p-5 flex flex-col flex-1">
                    <h3 className="font-800 text-base mb-4" style={{ color: '#00C4A0' }}>{tier.name}</h3>
                    <div className="mb-5">
                      <div className="text-2xl font-800 mb-1" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {currency === 'MXN' ? tier.mxnInitial : tier.usdInitial}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t('pricing.initial')} +{' '}
                        <span className="font-600" style={{ color: '#00C4A0' }}>
                          {currency === 'MXN' ? tier.mxnMonthly : tier.usdMonthly}
                        </span>/{t('pricing.monthly')}
                      </p>
                    </div>
                    <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                      {(lang === 'es' ? tier.featuresEs : tier.features).map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckIcon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#00C4A0' }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-center gap-1.5 mt-auto pt-3" style={{ borderTop: '1px solid rgba(0,196,160,0.15)' }}>
                      <span className="text-xs font-600" style={{ color: 'rgba(0,196,160,0.7)' }}>
                        {lang === 'es' ? 'Ver todo lo incluido' : 'See everything included'}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ color: 'rgba(0,196,160,0.7)' }}>
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="relative rounded-xl flex flex-col h-full service-card cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}
                  onClick={() => setExpandedTier(tier.name)}
                >
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-800 text-base mb-4 text-white">{tier.name}</h3>
                    <div className="mb-5">
                      <div className="text-2xl font-800 text-foreground mb-1">
                        {currency === 'MXN' ? tier.mxnInitial : tier.usdInitial}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t('pricing.initial')} +{' '}
                        <span className="text-primary font-600">
                          {currency === 'MXN' ? tier.mxnMonthly : tier.usdMonthly}
                        </span>/{t('pricing.monthly')}
                      </p>
                    </div>
                    <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                      {(lang === 'es' ? tier.featuresEs : tier.features).map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-center gap-1.5 mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-xs font-600" style={{ color: 'rgba(138,155,181,0.6)' }}>
                        {lang === 'es' ? 'Ver todo lo incluido' : 'See everything included'}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ color: 'rgba(138,155,181,0.6)' }}>
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </ScrollAnimator>
          ))}
        </div>

        {/* Note */}
        <ScrollAnimator delay={200}>
          <p className="text-center text-sm text-muted-foreground mt-8 max-w-lg mx-auto">
            * {t('pricing.note')}
          </p>
        </ScrollAnimator>
      </div>

      {/* Modal */}
      {activeTier && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setExpandedTier(null); }}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(8,18,34,0.98)',
              border: activeTier.popular ? '1px solid rgba(0,196,160,0.4)' : '1px solid rgba(255,255,255,0.1)',
              boxShadow: activeTier.popular
                ? '0 0 60px rgba(0,196,160,0.15), 0 24px 48px rgba(0,0,0,0.6)'
                : '0 24px 48px rgba(0,0,0,0.6)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{
              background: activeTier.popular
                ? 'linear-gradient(90deg, transparent, #00C4A0, transparent)'
                : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            }} />

            {/* Inner glow */}
            {activeTier.popular && (
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,196,160,0.08) 0%, transparent 55%)' }} />
            )}

            <div className="relative p-7">
              {/* Close button */}
              <button
                onClick={() => setExpandedTier(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="mb-6">
                {activeTier.popular && (
                  <span className="inline-flex items-center gap-1.5 label-tag px-2.5 py-1 rounded-full mb-3" style={{ background: 'rgba(0,196,160,0.12)', color: '#00C4A0', border: '1px solid rgba(0,196,160,0.25)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00C4A0' }} />
                    {t('pricing.popular')}
                  </span>
                )}
                <h2 className="text-2xl font-800 text-white mb-1">{activeTier.name}</h2>
                <p className="text-sm" style={{ color: '#8A9BB5' }}>
                  {lang === 'es' ? activeTier.descriptionEs : activeTier.description}
                </p>
              </div>

              {/* Price block */}
              <div className="rounded-xl p-4 mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-end gap-3 flex-wrap">
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: '#8A9BB5' }}>{t('pricing.initial')}</p>
                    <div className="text-3xl font-800" style={activeTier.popular ? {
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    } : { color: '#FFFFFF' }}>
                      {currency === 'MXN' ? activeTier.mxnInitial : activeTier.usdInitial} {currency}
                    </div>
                  </div>
                  <div className="pb-1">
                    <p className="text-xs mb-0.5" style={{ color: '#8A9BB5' }}>{lang === 'es' ? 'Mensualidad' : 'Monthly'}</p>
                    <div className="text-lg font-700" style={{ color: '#00C4A0' }}>
                      {currency === 'MXN' ? activeTier.mxnMonthly : activeTier.usdMonthly}/{t('pricing.monthly')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features list */}
              <div className="mb-7">
                <p className="text-xs font-700 tracking-widest mb-4" style={{ color: 'rgba(138,155,181,0.5)' }}>
                  {lang === 'es' ? 'QUÉ INCLUYE' : "WHAT'S INCLUDED"}
                </p>
                <ul className="flex flex-col gap-3">
                  {(lang === 'es' ? activeTier.expandedFeaturesEs : activeTier.expandedFeatures).map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#C8D5E8' }}>
                      <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(0,196,160,0.12)', border: '1px solid rgba(0,196,160,0.2)' }}>
                        <CheckIcon className="w-3 h-3" style={{ color: '#00C4A0' }} />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className={activeTier.popular ? 'btn-primary text-center py-3 px-6 block' : 'btn-ghost text-center py-3 px-6 block text-sm font-700'}
                style={activeTier.popular ? { boxShadow: '0 0 20px rgba(0,196,160,0.3)' } : {}}
                onClick={() => setExpandedTier(null)}
              >
                {lang === 'es' ? activeTier.ctaEs : activeTier.cta}
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
