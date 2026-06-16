'use client';

import React, { useState } from 'react';
import { trackEvent } from '@/lib/gtag';

// ─── Data ─────────────────────────────────────────────────────────────────────

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    price: 25000,
    priceFrom: false,
    monthly: 699,
    monthlyFrom: false,
    color: '#6B7280',
    includes: [
      'Sitio web profesional',
      'WhatsApp flotante',
      'SEO básico',
      'Analytics básico',
    ],
  },
  {
    id: 'esencial',
    name: 'Esencial',
    price: 45900,
    priceFrom: false,
    monthly: 999,
    monthlyFrom: false,
    color: '#3B82F6',
    includes: [
      'Todo lo del Starter',
      'Catálogo digital',
      'Formularios de contacto',
      'Diseño premium',
    ],
  },
  {
    id: 'profesional',
    name: 'Profesional',
    price: 75900,
    priceFrom: false,
    monthly: 1699,
    monthlyFrom: false,
    color: '#00C4A0',
    includes: [
      'Todo lo del Esencial',
      'Ecommerce completo (carrito + checkout + pagos)',
      'Panel administrativo',
      'Inventario & POS',
      'Analytics avanzado',
      'WhatsApp automatizado básico',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 125900,
    priceFrom: false,
    monthly: 2699,
    monthlyFrom: false,
    color: '#8B5CF6',
    includes: [
      'Todo lo del Profesional',
      'CRM avanzado',
      'Automatización con IA',
      'Recuperación de carritos',
      'Email marketing',
      'Programa de fidelización',
      'Reportes LTV',
      'Sistema de citas básico',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 180000,
    priceFrom: true,
    monthly: 4900,
    monthlyFrom: true,
    color: '#F59E0B',
    includes: [
      'Todo lo del Premium',
      'Multi-sucursal',
      'Integración ERP / SAP',
      'Integraciones API avanzadas',
      'SLA garantizado',
      'Gerente de cuenta dedicado',
    ],
  },
] as const;

type PackageId = typeof PACKAGES[number]['id'];

const ADDONS = [
  {
    id: 'meli',
    name: 'Integración MercadoLibre',
    desc: 'Catálogo y pedidos sincronizados en tiempo real',
    setup: 8000,
    monthly: 800,
    blockedBy: [] as PackageId[],
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Avanzado',
    desc: 'Flujos conversacionales complejos y campañas masivas',
    setup: 12000,
    monthly: 1200,
    blockedBy: [] as PackageId[],
  },
  {
    id: 'seo',
    name: 'SEO Avanzado + Contenido',
    desc: 'Posicionamiento orgánico y estrategia de contenido mensual',
    setup: 0,
    monthly: 5000,
    blockedBy: [] as PackageId[],
  },
  {
    id: 'soporte',
    name: 'Soporte Priority',
    desc: 'Tiempo de respuesta garantizado menor a 4 horas',
    setup: 0,
    monthly: 2500,
    blockedBy: [] as PackageId[],
  },
  {
    id: 'citas',
    name: 'Sistema de Citas',
    desc: 'Agenda online personalizada con recordatorios automáticos',
    setup: null,
    monthly: null,
    blockedBy: ['premium', 'enterprise'] as PackageId[],
  },
];

function fmt(n: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PricingCalculator() {
  const [selectedPackage, setSelectedPackage] = useState<PackageId | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  const pkg = PACKAGES.find(p => p.id === selectedPackage) ?? null;

  function toggleAddon(id: string) {
    setSelectedAddons(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function selectPackage(id: PackageId) {
    setSelectedPackage(id);
    // Deselect add-ons that become blocked by this package
    const blocked = ADDONS.filter(a => (a.blockedBy as readonly string[]).includes(id)).map(a => a.id);
    if (blocked.length) {
      setSelectedAddons(prev => {
        const next = new Set(prev);
        blocked.forEach(b => next.delete(b));
        return next;
      });
    }
  }

  const activeAddons = ADDONS.filter(a => selectedAddons.has(a.id));
  const addonSetup = activeAddons.reduce((s, a) => s + (a.setup ?? 0), 0);
  const addonMonthly = activeAddons.reduce((s, a) => s + (a.monthly ?? 0), 0);
  const totalSetup = (pkg?.price ?? 0) + addonSetup;
  const totalMonthly = (pkg?.monthly ?? 0) + addonMonthly;
  const hasMonthly = totalMonthly > 0;
  const hasCitas = selectedAddons.has('citas');
  const blockedAddons = selectedPackage
    ? ADDONS.filter(a => (a.blockedBy as readonly string[]).includes(selectedPackage))
    : [];

  const waLines = [
    pkg ? `Paquete: ${pkg.name} (${fmt(pkg.price)}${pkg.priceFrom ? '+' : ''})` : null,
    ...activeAddons.map(a => `Add-on: ${a.name}${a.setup ? ` (+${fmt(a.setup)})` : ''}${a.monthly ? ` +${fmt(a.monthly)}/mes` : ''}`),
    hasCitas ? 'Add-on: Sistema de Citas (cotizar)' : null,
  ].filter(Boolean).join('\n');

  const waMessage = !pkg
    ? 'Hola, me interesa cotizar una plataforma con Pneuma Studio.'
    : `Hola, me interesa cotizar con Pneuma Studio:\n\n${waLines}\n\nInversión inicial estimada: ${fmt(totalSetup)}${pkg.priceFrom ? '+' : ''}\nMensualidad estimada: ${pkg.monthlyFrom ? 'desde ' : ''}${fmt(totalMonthly)}/mes`;

  const waHref = `https://wa.me/528112803360?text=${encodeURIComponent(waMessage)}`;

  return (
    <section className="section-padding" style={{ background: '#050D1A' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
          <span className="label-tag text-primary">CALCULADORA</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-800 text-white mb-3" style={{ letterSpacing: '-0.025em' }}>
          Diseña tu plataforma
        </h2>
        <p className="text-base mb-10" style={{ color: '#8A9BB5' }}>
          Elige un paquete base y suma los add-ons que necesites.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Step 1 — Package */}
            <div>
              <p className="text-xs font-700 tracking-widest mb-4" style={{ color: '#8A9BB5' }}>
                1 · PAQUETE BASE
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {PACKAGES.map(p => {
                  const active = selectedPackage === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => selectPackage(p.id)}
                      className="text-left p-4 rounded-xl transition-all duration-200 relative"
                      style={{
                        background: active ? `${p.color}12` : 'rgba(255,255,255,0.03)',
                        border: active ? `1px solid ${p.color}60` : '1px solid rgba(255,255,255,0.06)',
                        boxShadow: active ? `0 0 20px ${p.color}18` : 'none',
                      }}
                    >
                      {/* Radio */}
                      <div
                        className="absolute top-3.5 right-3.5 w-4 h-4 rounded-full flex items-center justify-center transition-all"
                        style={{
                          border: active ? `4px solid ${p.color}` : '1.5px solid rgba(255,255,255,0.2)',
                          background: active ? `${p.color}20` : 'transparent',
                        }}
                      />
                      <p className="text-sm font-700 pr-6 mb-1" style={{ color: active ? '#fff' : '#C8D5E8' }}>
                        {p.name}
                      </p>
                      <p className="text-lg font-800" style={{ color: active ? p.color : 'rgba(200,213,232,0.5)' }}>
                        {p.priceFrom && <span className="text-xs font-500 mr-1">desde</span>}
                        {fmt(p.price)}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* What's included */}
              {pkg && (
                <div
                  className="mt-4 rounded-xl p-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="text-xs font-700 mb-3" style={{ color: '#8A9BB5' }}>
                    INCLUIDO EN {pkg.name.toUpperCase()}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <svg viewBox="0 0 12 10" fill="none" className="w-3 h-2.5 mt-0.5 shrink-0" style={{ color: pkg.color }}>
                          <path d="M1 5l3 3.5L11 1" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ color: '#C8D5E8' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Step 2 — Add-ons */}
            <div>
              <p className="text-xs font-700 tracking-widest mb-4" style={{ color: '#8A9BB5' }}>
                2 · ADD-ONS OPCIONALES
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDONS.map(addon => {
                  const isBlocked = selectedPackage
                    ? (addon.blockedBy as readonly string[]).includes(selectedPackage)
                    : false;
                  const active = selectedAddons.has(addon.id) && !isBlocked;
                  const isCotizar = addon.setup === null;

                  return (
                    <button
                      key={addon.id}
                      onClick={() => !isBlocked && !isCotizar && toggleAddon(addon.id)}
                      disabled={isBlocked}
                      className="text-left p-4 rounded-xl transition-all duration-200 relative"
                      style={{
                        background: isBlocked
                          ? 'rgba(0,196,160,0.05)'
                          : active
                          ? 'rgba(0,196,160,0.08)'
                          : 'rgba(255,255,255,0.03)',
                        border: isBlocked
                          ? '1px solid rgba(0,196,160,0.2)'
                          : active
                          ? '1px solid rgba(0,196,160,0.4)'
                          : '1px solid rgba(255,255,255,0.06)',
                        opacity: isBlocked ? 0.7 : 1,
                        cursor: isBlocked || isCotizar ? 'default' : 'pointer',
                      }}
                    >
                      {/* Indicator */}
                      {isBlocked ? (
                        <div
                          className="absolute top-3.5 right-3.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md"
                          style={{ background: 'rgba(0,196,160,0.15)', border: '1px solid rgba(0,196,160,0.3)' }}
                        >
                          <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2" style={{ color: '#00C4A0' }}>
                            <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                          </svg>
                          <span className="text-xs font-600" style={{ color: '#00C4A0', fontSize: '9px' }}>INCLUIDO</span>
                        </div>
                      ) : isCotizar ? null : (
                        <div
                          className="absolute top-3.5 right-3.5 w-4 h-4 rounded-md flex items-center justify-center transition-all"
                          style={{
                            background: active ? '#00C4A0' : 'rgba(255,255,255,0.08)',
                            border: active ? 'none' : '1px solid rgba(255,255,255,0.15)',
                          }}
                        >
                          {active && (
                            <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2">
                              <path d="M1 4l2.5 2.5L9 1" stroke="#050D1A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      )}

                      <p className="text-sm font-700 pr-16 mb-1" style={{ color: isBlocked ? '#8A9BB5' : active ? '#fff' : '#C8D5E8' }}>
                        {addon.name}
                      </p>
                      <p className="text-xs mb-2.5" style={{ color: '#8A9BB5' }}>{addon.desc}</p>

                      {isCotizar ? (
                        <a
                          href={`https://wa.me/528112803360?text=${encodeURIComponent(`Hola, me interesa cotizar un Sistema de Citas con Pneuma Studio.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-600 px-2.5 py-1 rounded-lg"
                          style={{ background: 'rgba(0,196,160,0.1)', color: '#00C4A0', border: '1px solid rgba(0,196,160,0.25)' }}
                        >
                          Cotizar →
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 flex-wrap">
                          {addon.setup > 0 && (
                            <span className="text-sm font-700" style={{ color: active ? '#00C4A0' : 'rgba(200,213,232,0.5)' }}>
                              +{fmt(addon.setup)}
                            </span>
                          )}
                          {addon.monthly > 0 && (
                            <span className="text-xs font-600 px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}>
                              +{fmt(addon.monthly)}/mes
                            </span>
                          )}
                          {addon.setup === 0 && addon.monthly > 0 && (
                            <span className="text-xs" style={{ color: '#8A9BB5' }}>sin costo inicial</span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Blocked explanation */}
              {blockedAddons.length > 0 && (
                <p className="text-xs mt-3 px-1" style={{ color: 'rgba(138,155,181,0.6)' }}>
                  * Los add-ons marcados como <strong style={{ color: '#00C4A0' }}>INCLUIDO</strong> ya forman parte de tu paquete {pkg?.name}. Los add-ons opcionales se suman a la inversión inicial.
                </p>
              )}
            </div>
          </div>

          {/* Summary panel */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="label-tag text-primary mb-4">TU SELECCIÓN</p>

              {!pkg ? (
                <p className="text-sm mb-6" style={{ color: '#8A9BB5' }}>Selecciona un paquete para ver tu cotización.</p>
              ) : (
                <ul className="space-y-2 mb-4">
                  {/* Package */}
                  <li className="flex items-center justify-between gap-2 text-sm">
                    <div>
                      <span className="font-600" style={{ color: '#fff' }}>Paquete {pkg.name}</span>
                    </div>
                    <span className="font-700 shrink-0" style={{ color: pkg.color }}>
                      {pkg.priceFrom && <span className="text-xs font-400 mr-0.5">desde</span>}
                      {fmt(pkg.price)}
                    </span>
                  </li>

                  {/* Active add-ons with setup cost */}
                  {activeAddons.filter(a => (a.setup ?? 0) > 0).map(a => (
                    <li key={a.id} className="flex items-center justify-between gap-2 text-sm">
                      <span style={{ color: '#C8D5E8' }}>{a.name}</span>
                      <span className="font-600 shrink-0" style={{ color: '#00C4A0' }}>+{fmt(a.setup!)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {pkg && (
                <>
                  <div className="pt-4 pb-4 mb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-xs mb-1" style={{ color: '#8A9BB5' }}>Inversión inicial estimada</p>
                    <p className="text-3xl font-800 text-white" style={{ letterSpacing: '-0.03em' }}>
                      {pkg.priceFrom && activeAddons.length === 0
                        ? <span className="text-xl font-500 mr-1">desde</span>
                        : null}
                      {fmt(totalSetup)}
                      {pkg.priceFrom && <span className="text-base font-500">+</span>}
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#8A9BB5' }}>
                      Pago inicial 50% + 50% al entregar
                    </p>
                  </div>

                  {/* Monthly costs */}
                  {hasMonthly && (
                    <div className="mb-4 p-3 rounded-xl" style={{ background: 'rgba(0,196,160,0.06)', border: '1px solid rgba(0,196,160,0.15)' }}>
                      <p className="text-xs mb-2 font-600" style={{ color: '#8A9BB5' }}>MENSUALIDAD</p>
                      {/* Package monthly */}
                      {pkg && (
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ color: '#8A9BB5' }}>Paquete {pkg.name}</span>
                          <span style={{ color: '#00C4A0' }}>
                            {pkg.monthlyFrom && <span className="mr-0.5">desde</span>}
                            {fmt(pkg.monthly)}/mes
                          </span>
                        </div>
                      )}
                      {/* Add-on monthlies */}
                      {activeAddons.filter(a => (a.monthly ?? 0) > 0).map(a => (
                        <div key={a.id} className="flex justify-between text-xs mb-1">
                          <span style={{ color: '#8A9BB5' }}>{a.name}</span>
                          <span style={{ color: '#00C4A0' }}>{fmt(a.monthly!)}/mes</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm font-700 pt-1.5 mt-1" style={{ borderTop: '1px solid rgba(0,196,160,0.15)' }}>
                        <span style={{ color: '#fff' }}>Total mensual</span>
                        <span style={{ color: '#00C4A0' }}>
                          {(pkg?.monthlyFrom) && <span className="text-xs font-400 mr-0.5">desde</span>}
                          {fmt(totalMonthly)}/mes
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'pricing_calculator', package: pkg?.name ?? 'none' })}
                className="btn-primary w-full text-center block text-sm"
              >
                {!pkg ? 'Solicitar cotización' : `Cotizar paquete ${pkg.name}`}
              </a>

              <p className="text-xs text-center mt-3" style={{ color: 'rgba(138,155,181,0.6)' }}>
                Estimado orientativo — precio final en propuesta formal
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
