'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import AppLogo from '@/components/ui/AppLogo';

export default function FounderSection() {
  const { t, lang } = useLanguage();

  return (
    <section className="section-padding bg-background-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollAnimator>
          <div className="glass-card rounded-2xl p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Avatar placeholder */}
              <div className="shrink-0 w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <AppLogo
                  src="/assets/images/Pneuma_Studio_Logo_Final_Draft_Sin_Fondo_-_copia-1779900651659.png"
                  size={40}
                />
              </div>

              <div className="flex-1">
                <span className="label-tag text-primary block mb-2">
                  {t('about.founder.title')}
                </span>
                <h3 className="text-2xl font-800 mb-1">Nazre Assad</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Pneuma Studio · Monterrey, Nuevo León, México
                </p>
                <blockquote className="text-base leading-relaxed text-muted-foreground border-l-2 border-primary/40 pl-5">
                  {lang === 'es' ?'"Pneuma Studio fue construido sobre una convicción: los negocios más competitivos de la próxima década ganarán a través de sistemas, no solo productos."'
                    : '"Pneuma Studio was built on one conviction: the most competitive businesses of the next decade will win through systems, not just products."'}
                </blockquote>
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}