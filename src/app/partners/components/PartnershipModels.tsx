'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';


export default function PartnershipModels() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 bg-background-secondary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <span className="label-tag text-primary">
              {lang === 'es' ? 'MODELOS DE ASOCIACIÓN' : 'PARTNERSHIP MODELS'}
            </span>
          </div>
          <h2 className="text-display font-800 text-foreground mb-2" style={{ letterSpacing: '-0.025em' }}>
            {lang === 'es' ? 'Elige tu modelo.' : 'Choose your model.'}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl">
            {lang === 'es' ?'Dos formas de trabajar con nosotros. Ambas diseñadas para maximizar tu margen.' :'Two ways to work with us. Both designed to maximize your margin.'}
          </p>
        </ScrollAnimator>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option A — Commission */}
          <ScrollAnimator delay={100}>
            <div className="glass-card rounded-2xl p-8 flex flex-col gap-5 h-full border border-white/8 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <span className="label-tag text-primary mb-2 block">
                    {lang === 'es' ? 'OPCIÓN A' : 'OPTION A'}
                  </span>
                  <h3 className="text-2xl font-800 text-foreground">
                    {lang === 'es' ? 'Comisión' : 'Commission'}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-800 text-primary">15%</span>
                </div>
              </div>

              <div className="w-full h-px bg-white/8" />

              <p className="text-sm text-muted-foreground leading-relaxed">
                {lang === 'es' ?'Vendes al precio completo. Te pagamos el 15% dentro de los 5 días hábiles posteriores al pago del cliente.' :'You sell at full price. We pay you 15% within 5 business days of client payment.'}
              </p>

              <ul className="flex flex-col gap-3 mt-auto">
                {(lang === 'es' ? ['Sin inversión inicial', 'Pago garantizado en 5 días hábiles', 'Tú controlas el precio final', 'Ideal para agencias que inician'] : ['No upfront investment', 'Guaranteed payment in 5 business days', 'You control the final price', 'Ideal for agencies starting out'])?.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-foreground/80">
                    <div className="w-4 h-4 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-primary" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimator>

          {/* Option B — Wholesale */}
          <ScrollAnimator delay={200}>
            <div className="rounded-2xl p-8 flex flex-col gap-5 h-full border-teal-glow bg-background transition-all duration-300 relative overflow-hidden">
              {/* Subtle glow bg */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

              <div className="flex items-start justify-between relative">
                <div>
                  <span className="label-tag text-primary mb-2 block">
                    {lang === 'es' ? 'OPCIÓN B' : 'OPTION B'}
                  </span>
                  <h3 className="text-2xl font-800 text-foreground">
                    {lang === 'es' ? 'Mayoreo' : 'Wholesale'}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-800 text-primary">–30%</span>
                </div>
              </div>

              <div className="w-full h-px bg-primary/20" />

              <p className="text-sm text-muted-foreground leading-relaxed relative">
                {lang === 'es' ?'Compras con 30% de descuento. Tú fijas tu propio precio al cliente y te quedas con el margen completo.' :'You buy at 30% discount. You set your own price to the client and keep the full margin.'}
              </p>

              <ul className="flex flex-col gap-3 mt-auto relative">
                {(lang === 'es' ? ['Máximo margen de ganancia', 'Precio libre al cliente final', 'Control total de la relación', 'Ideal para agencias establecidas'] : ['Maximum profit margin', 'Free pricing to end client', 'Full control of the relationship', 'Ideal for established agencies'])?.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-foreground/80">
                    <div className="w-4 h-4 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-primary" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimator>
        </div>

        {/* CTA */}
        <ScrollAnimator delay={300}>
          <div className="mt-10 text-center">
            <a href="#partner-form" className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base">
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
