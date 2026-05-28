'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

export default function PartnerBenefits() {
  const { lang } = useLanguage();

  const pillars = [
    {
      icon: '🔒',
      title: lang === 'es' ? 'Confidencial' : 'Confidential',
      desc: lang === 'es' ?'Nunca contactamos a tus clientes directamente.' :'We never contact your clients directly.',
    },
    {
      icon: '🏷️',
      title: lang === 'es' ? 'Tu Marca' : 'Your Brand',
      desc: lang === 'es' ?'Todos los entregables bajo el nombre de tu agencia.' : "All deliverables under your agency\'s name.",
    },
    {
      icon: '⚡',
      title: lang === 'es' ? 'Entrega Rápida' : 'Fast Delivery',
      desc: lang === 'es' ?'Sprints de 3–5 semanas, no proyectos de 6 meses.' :'3–5 week sprints, not 6-month projects.',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <span className="label-tag text-primary">
              {lang === 'es' ? 'POR QUÉ ELEGIRNOS' : 'WHY CHOOSE US'}
            </span>
          </div>
        </ScrollAnimator>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars?.map((p, i) => (
            <ScrollAnimator key={i} delay={i * 100}>
              <div className="glass-card-hover rounded-xl p-7 flex flex-col gap-4 h-full">
                <div className="text-3xl">{p?.icon}</div>
                <div>
                  <h3 className="text-base font-800 text-foreground mb-2">{p?.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p?.desc}</p>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
}
