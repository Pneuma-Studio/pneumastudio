'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const MODULES = [
  { id: 'ecommerce', name: 'Plataforma Ecommerce', desc: 'Tienda en línea con catálogo, carrito y pagos', price: 45900 },
  { id: 'marketplace', name: 'Marketplace Multi-vendedor', desc: 'Motor multi-vendedor con comisiones y paneles', price: 75900 },
  { id: 'inventario', name: 'Inventario & POS', desc: 'Punto de venta y sincronización multi-sucursal', price: 45900 },
  { id: 'crm', name: 'CRM Dashboard', desc: 'Gestión de clientes y pipeline de ventas', price: 75900 },
  { id: 'whatsapp', name: 'Automatización WhatsApp', desc: 'Flujos conversacionales y notificaciones', price: 25000 },
  { id: 'citas', name: 'Sistema de Citas', desc: 'Agenda online con recordatorios automáticos', price: 25000 },
  { id: 'analytics', name: 'Analytics Dashboard', desc: 'Visualización de datos en tiempo real', price: 45900 },
  { id: 'admin', name: 'Panel Administrativo', desc: 'Back-office a medida para tu operación', price: 45900 },
  { id: 'ai', name: 'Flujos con IA', desc: 'Automatización inteligente de procesos', price: 75900 },
  { id: 'api', name: 'Integraciones API', desc: 'Conexión con sistemas y plataformas externas', price: 25000 },
  { id: 'meli', name: 'Sincronización MercadoLibre', desc: 'Catálogo y pedidos sincronizados en tiempo real', price: 25000 },
  { id: 'multisucursal', name: 'Multi-sucursal', desc: 'Gestión centralizada de múltiples ubicaciones', price: 75900 },
];

function fmt(n: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);
}

export default function PricingCalculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const total = MODULES.filter((m) => selected.has(m.id)).reduce((sum, m) => sum + m.price, 0);

  const waMessage = selected.size === 0
    ? 'Hola, me interesa cotizar una plataforma con Pneuma Studio.'
    : `Hola, me interesa cotizar los siguientes módulos con Pneuma Studio:\n${MODULES.filter((m) => selected.has(m.id)).map((m) => `• ${m.name}`).join('\n')}\n\nTotal estimado: ${fmt(total)} MXN`;

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
          Selecciona los módulos que necesitas y obtén un estimado al instante.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MODULES.map((mod) => {
              const active = selected.has(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => toggle(mod.id)}
                  className="text-left p-4 rounded-xl transition-all duration-200 relative"
                  style={{
                    background: active ? 'rgba(0,196,160,0.08)' : 'rgba(255,255,255,0.03)',
                    border: active ? '1px solid rgba(0,196,160,0.4)' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: active ? '0 0 16px rgba(0,196,160,0.12)' : 'none',
                  }}
                >
                  {/* Checkbox indicator */}
                  <div
                    className="absolute top-3.5 right-3.5 w-4 h-4 rounded-md flex items-center justify-center transition-all duration-200"
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
                  <p className="text-sm font-700 pr-6 mb-1" style={{ color: active ? '#fff' : '#C8D5E8' }}>{mod.name}</p>
                  <p className="text-xs mb-2.5" style={{ color: '#8A9BB5' }}>{mod.desc}</p>
                  <p className="text-sm font-700" style={{ color: active ? '#00C4A0' : 'rgba(200,213,232,0.5)' }}>
                    {fmt(mod.price)}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Summary panel */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="label-tag text-primary mb-4">TU SELECCIÓN</p>

              {selected.size === 0 ? (
                <p className="text-sm mb-6" style={{ color: '#8A9BB5' }}>Selecciona los módulos que necesitas.</p>
              ) : (
                <ul className="space-y-2 mb-6">
                  {MODULES.filter((m) => selected.has(m.id)).map((m) => (
                    <li key={m.id} className="flex items-center justify-between gap-2 text-sm">
                      <span style={{ color: '#C8D5E8' }}>{m.name}</span>
                      <span className="font-600 shrink-0" style={{ color: '#00C4A0' }}>{fmt(m.price)}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div
                className="pt-4 pb-5 mb-5"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-xs mb-1" style={{ color: '#8A9BB5' }}>Total estimado</p>
                <p className="text-3xl font-800 text-white" style={{ letterSpacing: '-0.03em' }}>
                  {total === 0 ? '—' : fmt(total)}
                </p>
                {total > 0 && (
                  <p className="text-xs mt-1" style={{ color: '#8A9BB5' }}>
                    Pago inicial 50% + 50% al entregar
                  </p>
                )}
              </div>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center block text-sm"
              >
                {selected.size === 0 ? 'Solicitar cotización' : `Cotizar ${selected.size} módulo${selected.size > 1 ? 's' : ''}`}
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
