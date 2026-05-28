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
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          <div className="cta-card relative rounded-2xl overflow-hidden p-10 sm:p-16 text-center">

            {/* Animated border glow */}
            <div className="cta-border-glow" aria-hidden="true" />

            {/* Inner ambient light */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,196,160,0.1) 0%, transparent 60%)' }}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-px" style={{ background: 'linear-gradient(90deg, #00C4A0, transparent)' }} />
            <div className="absolute top-0 left-0 h-16 w-px" style={{ background: 'linear-gradient(180deg, #00C4A0, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-16 h-px" style={{ background: 'linear-gradient(270deg, #00C4A0, transparent)' }} />
            <div className="absolute bottom-0 right-0 h-16 w-px" style={{ background: 'linear-gradient(0deg, #00C4A0, transparent)' }} />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00C4A0' }} />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: '#00C4A0' }}>
                  {lang === 'es' ? 'HABLEMOS' : "LET'S TALK"}
                </span>
              </div>

              <h2
                className="text-3xl sm:text-5xl font-800 text-white mb-5"
                style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}
              >
                {lang === 'es'
                  ? <>Construyamos algo<br /><span style={{ color: '#00C4A0' }}>extraordinario.</span></>
                  : <>Build something<br /><span style={{ color: '#00C4A0' }}>extraordinary.</span></>}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-10" style={{ color: '#8A9BB5' }}>
                {lang === 'es'
                  ? 'Agenda una llamada de 30 minutos. Sin compromiso. Solo una conversación directa sobre tu negocio y cómo escalarlo.'
                  : 'Schedule a 30-minute call. No commitment. Just a direct conversation about your business and how to scale it.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="btn-primary px-8 py-3.5 text-sm"
                  style={{ boxShadow: '0 0 32px rgba(0,196,160,0.3), 0 0 64px rgba(0,196,160,0.1)' }}
                >
                  <CalendarIcon className="w-5 h-5" />
                  {lang === 'es' ? 'Agendar Llamada' : 'Schedule a Call'}
                </Link>
                <Link href="/pricing" className="btn-ghost px-8 py-3.5 text-sm">
                  {lang === 'es' ? 'Ver Precios' : 'View Pricing'}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-xs mt-8" style={{ color: 'rgba(138,155,181,0.5)' }}>
                {lang === 'es' ? 'Respuesta en menos de 24 horas · Lunes a viernes' : 'Response within 24 hours · Monday to Friday'}
              </p>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
