'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

export default function PartnershipModels() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#050D1A' }}>
      {/* Ambient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,196,160,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <ScrollAnimator>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
            <span className="label-tag text-primary">
              {lang === 'es' ? 'MODELOS DE ASOCIACIÓN' : 'PARTNERSHIP MODELS'}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-800 text-white mb-3"
            style={{ letterSpacing: '-0.025em' }}
          >
            {lang === 'es' ? 'Elige tu modelo.' : 'Choose your model.'}
          </h2>
          <p className="text-sm mb-12 max-w-xl" style={{ color: '#8A9BB5' }}>
            {lang === 'es'
              ? 'Dos formas de trabajar con nosotros. Ambas diseñadas para maximizar tu margen.'
              : 'Two ways to work with us. Both designed to maximize your margin.'}
          </p>
        </ScrollAnimator>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option A — Commission */}
          <ScrollAnimator delay={100}>
            <div
              className="rounded-2xl p-8 flex flex-col gap-5 h-full service-card relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="label-tag text-primary mb-2 block">
                    {lang === 'es' ? 'OPCIÓN A' : 'OPTION A'}
                  </span>
                  <h3 className="text-2xl font-800 text-white">
                    {lang === 'es' ? 'Comisión' : 'Commission'}
                  </h3>
                </div>
                <div className="text-right">
                  <span
                    className="text-4xl font-800"
                    style={{ color: '#00C4A0' }}
                  >
                    15%
                  </span>
                </div>
              </div>

              <div className="w-full h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

              <p className="text-sm leading-relaxed" style={{ color: '#8A9BB5' }}>
                {lang === 'es'
                  ? 'Vendes al precio completo. Te pagamos el 15% dentro de los 5 días hábiles posteriores al pago del cliente.'
                  : 'You sell at full price. We pay you 15% within 5 business days of client payment.'}
              </p>

              <ul className="flex flex-col gap-3">
                {(lang === 'es'
                  ? ['Sin inversión inicial', 'Pago garantizado en 5 días hábiles', 'Tú controlas el precio final', 'Ideal para agencias que inician']
                  : ['No upfront investment', 'Guaranteed payment in 5 business days', 'You control the final price', 'Ideal for agencies starting out']
                ).map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,196,160,0.15)', border: '1px solid rgba(0,196,160,0.3)' }}
                    >
                      <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="#00C4A0" strokeWidth={2}>
                        <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Availability note */}
              <div
                className="rounded-lg p-3.5 flex items-start gap-3 mt-auto"
                style={{
                  background: 'rgba(0,196,160,0.07)',
                  border: '1px solid rgba(0,196,160,0.2)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0 mt-0.5" stroke="#00C4A0" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs font-700 mb-0.5" style={{ color: '#00C4A0' }}>
                    {lang === 'es' ? 'Siempre disponible' : 'Always available'}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(0,196,160,0.75)' }}>
                    {lang === 'es'
                      ? 'Aplica para cualquier proyecto, en cualquier momento, sin compromisos mínimos.'
                      : 'Available for any project, at any time, with no minimum commitments.'}
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimator>

          {/* Option B — Wholesale */}
          <ScrollAnimator delay={200}>
            <div
              className="rounded-2xl p-8 flex flex-col gap-5 h-full relative overflow-hidden"
              style={{
                background: 'rgba(0,196,160,0.06)',
                border: '1px solid rgba(0,196,160,0.35)',
                boxShadow: '0 0 40px rgba(0,196,160,0.08), inset 0 1px 0 rgba(0,196,160,0.15)',
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #00C4A0, transparent)' }}
              />
              {/* Ambient glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.08) 0%, transparent 70%)', filter: 'blur(20px)' }}
              />

              <div className="flex items-start justify-between relative">
                <div>
                  <span className="label-tag text-primary mb-2 block">
                    {lang === 'es' ? 'OPCIÓN B' : 'OPTION B'}
                  </span>
                  <h3 className="text-2xl font-800 text-white">
                    {lang === 'es' ? 'Mayoreo' : 'Wholesale'}
                  </h3>
                </div>
                <div className="text-right">
                  <span
                    className="text-4xl font-800"
                    style={{ color: '#00C4A0' }}
                  >
                    –30%
                  </span>
                </div>
              </div>

              <div className="w-full h-px" style={{ background: 'rgba(0,196,160,0.2)' }} />

              <p className="text-sm leading-relaxed relative" style={{ color: '#8A9BB5' }}>
                {lang === 'es'
                  ? 'Compras con 30% de descuento. Tú fijas tu propio precio al cliente y te quedas con el margen completo.'
                  : 'You buy at 30% discount. You set your own price to the client and keep the full margin.'}
              </p>

              <ul className="flex flex-col gap-3 relative">
                {(lang === 'es'
                  ? ['Máximo margen de ganancia', 'Precio libre al cliente final', 'Control total de la relación', 'Ideal para agencias establecidas']
                  : ['Maximum profit margin', 'Free pricing to end client', 'Full control of the relationship', 'Ideal for established agencies']
                ).map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,196,160,0.15)', border: '1px solid rgba(0,196,160,0.3)' }}
                    >
                      <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="#00C4A0" strokeWidth={2}>
                        <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Access requirement */}
              <div
                className="relative rounded-lg p-3.5 flex items-start gap-3 mt-auto"
                style={{
                  background: 'rgba(251,191,36,0.07)',
                  border: '1px solid rgba(251,191,36,0.25)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0 mt-0.5" stroke="#FBB024" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <div>
                  <p className="text-xs font-700 mb-0.5" style={{ color: '#FBB024' }}>
                    {lang === 'es' ? 'Requisito de acceso' : 'Access requirement'}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(251,191,36,0.75)' }}>
                    {lang === 'es'
                      ? 'Mínimo 2 proyectos por mes para mantener este modelo.'
                      : 'Minimum 2 projects per month to maintain this model.'}
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimator>
        </div>

        {/* CTA */}
        <ScrollAnimator delay={300}>
          <div className="mt-10 flex justify-start">
            <a href="#partner-form" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base">
              {lang === 'es' ? 'Convertirme en Agencia Socia' : 'Become an Agency Partner'}
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
