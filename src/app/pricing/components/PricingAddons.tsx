'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

type Currency = 'MXN' | 'USD';

const addons = [
  {
    name: 'Mercado Libre Integration',
    nameEs: 'Integración Mercado Libre',
    mxnInitial: '$8,000',
    mxnMonthly: '$1,500',
    usdInitial: '$1,000',
    usdMonthly: '$300',
  },
  {
    name: 'WhatsApp Advanced Automation',
    nameEs: 'Automatización WhatsApp Avanzada',
    mxnInitial: '$12,000',
    mxnMonthly: '$2,200',
    usdInitial: '$2,200',
    usdMonthly: '$450',
  },
  {
    name: 'Advanced SEO + Content',
    nameEs: 'SEO Avanzado + Contenido',
    mxnInitial: '—',
    mxnMonthly: '$5,000',
    usdInitial: '—',
    usdMonthly: '$1,500',
  },
  {
    name: 'Priority Support',
    nameEs: 'Soporte Prioritario',
    mxnInitial: '—',
    mxnMonthly: '$2,500',
    usdInitial: '—',
    usdMonthly: '$500',
  },
];

export default function PricingAddons() {
  const { t, lang } = useLanguage();
  const [currency, setCurrency] = useState<Currency>('MXN');

  return (
    <section className="pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          <h2 className="text-xl font-800 mb-6 text-center">{t('pricing.addons')}</h2>

          {/* Currency toggle */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-1 p-1 rounded-xl border border-white/10">
              {(['MXN', 'USD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-700 transition-all duration-200 ${
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

          <div className="glass-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3.5 text-xs font-700 text-muted-foreground uppercase tracking-wider">
                    {lang === 'es' ? 'Módulo' : 'Module'}
                  </th>
                  <th className="text-right px-5 py-3.5 text-xs font-700 text-muted-foreground uppercase tracking-wider">
                    {lang === 'es' ? 'Inicial' : 'Initial'}
                  </th>
                  <th className="text-right px-5 py-3.5 text-xs font-700 text-muted-foreground uppercase tracking-wider">
                    {lang === 'es' ? '/mes' : '/mo'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {addons.map((addon, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-4 text-sm font-600">
                      {lang === 'es' ? addon.nameEs : addon.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-right text-muted-foreground">
                      {currency === 'MXN' ? addon.mxnInitial : addon.usdInitial}
                    </td>
                    <td className="px-5 py-4 text-sm text-right text-primary font-600">
                      {currency === 'MXN' ? `+${addon.mxnMonthly}/mes` : `+${addon.usdMonthly}/mo`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}