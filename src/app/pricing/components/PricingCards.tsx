'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import { CheckIcon } from '@heroicons/react/24/solid';

type Currency = 'MXN' | 'USD';

interface PricingTier {
  name: string;
  popular?: boolean;
  mxnInitial: string;
  mxnMonthly: string;
  usdInitial: string;
  usdMonthly: string;
  features: string[];
  featuresEs: string[];
  cta: string;
  ctaEs: string;
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    mxnInitial: '$25,000',
    mxnMonthly: '$699',
    usdInitial: '$2,999',
    usdMonthly: '$199',
    features: [
      'Single-page storefront',
      'Up to 100 products',
      'WhatsApp basic integration',
      'Monthly support (4 hrs)',
    ],
    featuresEs: [
      'Tienda de una página',
      'Hasta 100 productos',
      'Integración básica WhatsApp',
      'Soporte mensual (4 hrs)',
    ],
    cta: 'Start with Starter',
    ctaEs: 'Comenzar con Starter',
  },
  {
    name: 'Essential',
    mxnInitial: '$45,900',
    mxnMonthly: '$999',
    usdInitial: '$5,999',
    usdMonthly: '$359',
    features: [
      'Everything in Starter +',
      'Multi-page ecommerce',
      'Up to 500 products',
      'Admin panel included',
    ],
    featuresEs: [
      'Todo lo de Starter +',
      'Ecommerce multi-página',
      'Hasta 500 productos',
      'Panel admin incluido',
    ],
    cta: 'Start with Essential',
    ctaEs: 'Comenzar con Essential',
  },
  {
    name: 'Professional',
    popular: true,
    mxnInitial: '$75,900',
    mxnMonthly: '$1,699',
    usdInitial: '$10,999',
    usdMonthly: '$699',
    features: [
      'Everything in Essential +',
      'WhatsApp automation flows',
      'CRM dashboard',
      'Analytics & reporting',
    ],
    featuresEs: [
      'Todo lo de Essential +',
      'Flujos automatización WhatsApp',
      'Dashboard CRM',
      'Analytics y reportes',
    ],
    cta: 'Start with Professional',
    ctaEs: 'Comenzar con Professional',
  },
  {
    name: 'Premium',
    mxnInitial: '$125,900',
    mxnMonthly: '$2,699',
    usdInitial: '$17,999',
    usdMonthly: '$999',
    features: [
      'Everything in Professional +',
      'Multi-location system',
      'API integrations (3)',
      'Priority support (20 hrs/mo)',
    ],
    featuresEs: [
      'Todo lo de Professional +',
      'Sistema multi-sucursal',
      'Integraciones API (3)',
      'Soporte prioritario (20 hrs/mes)',
    ],
    cta: 'Start with Premium',
    ctaEs: 'Comenzar con Premium',
  },
  {
    name: 'Enterprise',
    mxnInitial: 'Desde $180,000',
    mxnMonthly: 'Desde $4,900',
    usdInitial: 'From $35,000',
    usdMonthly: 'From $4,000',
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
    cta: 'Contact for Enterprise',
    ctaEs: 'Contactar para Enterprise',
  },
];

export default function PricingCards() {
  const { t, lang } = useLanguage();
  const [currency, setCurrency] = useState<Currency>('MXN');

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
          {tiers.map((tier, i) => (
            <ScrollAnimator key={tier.name} delay={i * 70}>
              {tier.popular ? (
                /* Popular card — elevated treatment */
                <div
                  className="relative rounded-xl flex flex-col h-full"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '2px solid #00C4A0',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 0 40px rgba(0,196,160,0.18), 0 0 80px rgba(0,196,160,0.06), 0 8px 32px rgba(0,0,0,0.4)',
                    transform: 'scale(1.02)',
                  }}
                >
                  {/* Popular badge */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className="label-tag px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1.5"
                      style={{
                        background: '#00C4A0',
                        color: '#050D1A',
                        boxShadow: '0 0 16px rgba(0,196,160,0.5)',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: '#050D1A', opacity: 0.6 }}
                      />
                      {t('pricing.popular')}
                    </span>
                  </div>

                  {/* Inner ambient glow */}
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,196,160,0.12) 0%, transparent 60%)' }}
                  />

                  <div className="relative p-5 flex flex-col flex-1">
                    <h3 className="font-800 text-base mb-4" style={{ color: '#00C4A0' }}>{tier.name}</h3>

                    {/* Price */}
                    <div className="mb-5">
                      <div
                        className="text-2xl font-800 mb-1"
                        style={{
                          background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {currency === 'MXN' ? tier.mxnInitial : tier.usdInitial}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t('pricing.initial')} +{' '}
                        <span className="font-600" style={{ color: '#00C4A0' }}>
                          {currency === 'MXN' ? tier.mxnMonthly : tier.usdMonthly}
                        </span>
                        /{t('pricing.monthly')}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                      {(lang === 'es' ? tier.featuresEs : tier.features).map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckIcon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#00C4A0' }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/contact"
                      className="btn-primary text-center py-2.5 px-4 block"
                      style={{ boxShadow: '0 0 20px rgba(0,196,160,0.3)' }}
                    >
                      {lang === 'es' ? tier.ctaEs : tier.cta}
                    </Link>
                  </div>
                </div>
              ) : (
                /* Standard card */
                <div
                  className="relative rounded-xl flex flex-col h-full service-card"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-800 text-base mb-4 text-white">{tier.name}</h3>

                    {/* Price */}
                    <div className="mb-5">
                      <div className="text-2xl font-800 text-foreground mb-1">
                        {currency === 'MXN' ? tier.mxnInitial : tier.usdInitial}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t('pricing.initial')} +{' '}
                        <span className="text-primary font-600">
                          {currency === 'MXN' ? tier.mxnMonthly : tier.usdMonthly}
                        </span>
                        /{t('pricing.monthly')}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                      {(lang === 'es' ? tier.featuresEs : tier.features).map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link href="/contact" className="btn-ghost text-center py-2.5 px-4 block text-sm font-700">
                      {lang === 'es' ? tier.ctaEs : tier.cta}
                    </Link>
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
    </section>
  );
}
