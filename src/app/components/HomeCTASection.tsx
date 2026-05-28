'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import { ArrowRightIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function HomeCTASection() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding" style={{ background: '#050D1A' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          <div
            className="relative rounded-2xl overflow-hidden p-8 sm:p-12 text-center"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,196,160,0.06) 0%, transparent 70%)',
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">
                  {lang === 'es' ? 'PRÓXIMA GENERACIÓN' : 'NEXT GENERATION'}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-800 text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
                {lang === 'es' ?'Construyamos la próxima generación de negocios digitales.' : "Let's build the next generation of digital businesses."}
              </h2>
              <p className="text-sm leading-relaxed max-w-xl mx-auto mb-8" style={{ color: '#8A9BB5' }}>
                {lang === 'es' ?'Agenda una llamada de 30 minutos. Sin compromiso. Solo una conversación directa sobre tu negocio.' :'Schedule a 30-minute call. No commitment. Just a direct conversation about your business.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary px-8 py-3.5">
                  <CalendarIcon className="w-5 h-5" />
                  {lang === 'es' ? 'Agendar Llamada' : 'Schedule a Call'}
                </Link>
                <Link href="/pricing" className="btn-ghost px-8 py-3.5">
                  {lang === 'es' ? 'Ver Precios' : 'View Pricing'}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}