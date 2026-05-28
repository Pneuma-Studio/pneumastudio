'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

type Currency = 'MXN' | 'USD';

const addons = [
  {
    name: 'Mercado Libre Integration',
    nameEs: 'Integración Mercado Libre',
    desc: 'Full catalog sync, listing automation & order management',
    descEs: 'Sincronización de catálogo, automatización de listings y gestión de pedidos',
    mxnInitial: '$8,000',
    mxnMonthly: '$1,500',
    usdInitial: '$1,000',
    usdMonthly: '$300',
    iconPath: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
  },
  {
    name: 'WhatsApp Advanced Automation',
    nameEs: 'Automatización WhatsApp Avanzada',
    desc: 'Conversational commerce flows, order updates & support bots',
    descEs: 'Flujos de comercio conversacional, actualizaciones de pedidos y bots de soporte',
    mxnInitial: '$12,000',
    mxnMonthly: '$2,200',
    usdInitial: '$2,200',
    usdMonthly: '$450',
    iconPath: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z',
  },
  {
    name: 'Advanced SEO + Content',
    nameEs: 'SEO Avanzado + Contenido',
    desc: 'Technical SEO audit, on-page optimization & content strategy',
    descEs: 'Auditoría SEO técnica, optimización on-page y estrategia de contenido',
    mxnInitial: '—',
    mxnMonthly: '$5,000',
    usdInitial: '—',
    usdMonthly: '$1,500',
    iconPath: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  },
  {
    name: 'Priority Support',
    nameEs: 'Soporte Prioritario',
    desc: '24h response SLA, dedicated Slack channel & monthly reviews',
    descEs: 'SLA de respuesta en 24h, canal Slack dedicado y revisiones mensuales',
    mxnInitial: '—',
    mxnMonthly: '$2,500',
    usdInitial: '—',
    usdMonthly: '$500',
    iconPath: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
  },
];

export default function PricingAddons() {
  const { lang } = useLanguage();
  const [currency, setCurrency] = useState<Currency>('MXN');

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#050D1A' }}>
      {/* Ambient orb */}
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <ScrollAnimator>
          {/* Section header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
              <span className="label-tag text-primary">{lang === 'es' ? 'MÓDULOS ADICIONALES' : 'ADD-ON MODULES'}</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-800 text-white mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              {lang === 'es' ? 'Amplía tu plataforma.' : 'Extend your platform.'}
            </h2>
            <p className="text-sm" style={{ color: '#8A9BB5' }}>
              {lang === 'es'
                ? 'Agrega módulos a cualquier paquete sin compromisos adicionales.'
                : 'Add modules to any package with no additional commitments.'}
            </p>
          </div>

          {/* Currency toggle */}
          <div className="flex mb-8">
            <div
              className="flex items-center gap-1 p-1 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {(['MXN', 'USD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-5 py-2 rounded-lg text-xs font-700 transition-all duration-200 ${
                    currency === c
                      ? 'text-white'
                      : 'text-muted-foreground hover:text-white'
                  }`}
                  style={currency === c ? { background: '#00C4A0' } : {}}
                >
                  {c === 'MXN' ? '🇲🇽 MXN' : '🇺🇸 USD'}
                </button>
              ))}
            </div>
          </div>

          {/* Addon cards */}
          <div className="flex flex-col gap-3">
            {addons.map((addon, i) => (
              <div
                key={i}
                className="rounded-xl p-5 flex items-center gap-5 service-card"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,196,160,0.12)', border: '1px solid rgba(0,196,160,0.15)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={addon.iconPath} />
                  </svg>
                </div>

                {/* Title + desc */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-700 text-sm text-white mb-0.5">
                    {lang === 'es' ? addon.nameEs : addon.name}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? addon.descEs : addon.desc}
                  </p>
                </div>

                {/* Pricing */}
                <div className="text-right shrink-0">
                  {(currency === 'MXN' ? addon.mxnInitial : addon.usdInitial) !== '—' && (
                    <p className="text-xs mb-0.5" style={{ color: '#8A9BB5' }}>
                      {currency === 'MXN' ? addon.mxnInitial : addon.usdInitial}{' '}
                      <span className="text-[10px]">{lang === 'es' ? 'inicial' : 'setup'}</span>
                    </p>
                  )}
                  <p className="font-700 text-sm" style={{ color: '#00C4A0' }}>
                    +{currency === 'MXN' ? addon.mxnMonthly : addon.usdMonthly}
                    <span className="text-xs font-400">{currency === 'MXN' ? '/mes' : '/mo'}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
