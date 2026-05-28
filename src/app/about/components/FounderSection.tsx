'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import AppLogo from '@/components/ui/AppLogo';

export default function FounderSection() {
  const { t, lang } = useLanguage();

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: '#050D1A' }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: '-120px',
          right: '-150px',
          background: 'radial-gradient(circle, rgba(0,196,160,0.08) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          bottom: '-80px',
          left: '-100px',
          background: 'radial-gradient(circle, rgba(30,64,175,0.07) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
            <span className="label-tag text-primary">
              {lang === 'es' ? 'FUNDADOR' : 'FOUNDER'}
            </span>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden p-8 sm:p-12"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Corner accent lines */}
            <div className="absolute top-0 left-0 w-20 h-px" style={{ background: 'linear-gradient(90deg, #00C4A0, transparent)' }} />
            <div className="absolute top-0 left-0 h-20 w-px" style={{ background: 'linear-gradient(180deg, #00C4A0, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-20 h-px" style={{ background: 'linear-gradient(270deg, #00C4A0, transparent)' }} />
            <div className="absolute bottom-0 right-0 h-20 w-px" style={{ background: 'linear-gradient(0deg, #00C4A0, transparent)' }} />

            {/* Inner ambient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,196,160,0.06) 0%, transparent 55%)' }}
            />

            <div className="relative flex flex-col sm:flex-row gap-8 items-start">
              {/* Avatar â€” logo badge */}
              <div className="shrink-0">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'rgba(0,196,160,0.08)',
                    border: '1px solid rgba(0,196,160,0.2)',
                    boxShadow: '0 0 24px rgba(0,196,160,0.12)',
                  }}
                >
                  <AppLogo
                    src="/assets/images/pneuma-studio-logo.png"
                    size={44}
                  />
                </div>
              </div>

              <div className="flex-1">
                <span className="label-tag text-primary block mb-2">
                  {t('about.founder.title')}
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-800 mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.7) 60%, #00C4A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Nazre Assad
                </h3>
                <p className="text-sm text-muted-foreground mb-8">
                  Pneuma Studio · Monterrey, Nuevo León, México
                </p>

                {/* The quote */}
                <div
                  className="relative rounded-xl p-6"
                  style={{
                    background: 'rgba(0,196,160,0.04)',
                    borderLeft: '3px solid #00C4A0',
                  }}
                >
                  <svg
                    className="absolute top-4 right-5 w-8 h-8 opacity-10"
                    viewBox="0 0 24 24"
                    fill="#00C4A0"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base sm:text-lg leading-relaxed font-600 text-white">
                    {lang === 'es'
                      ? '"Pneuma Studio fue construido sobre una convicción: los negocios más competitivos de la próxima década ganarán a través de sistemas, no solo productos."'
                      : '"Pneuma Studio was built on one conviction: the most competitive businesses of the next decade will win through systems, not just products."'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}

