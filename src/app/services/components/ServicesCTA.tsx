'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

export default function ServicesCTA() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <ScrollAnimator>
          <h2 className="text-display font-800 mb-4">
            {lang === 'es' ?'¿No ves exactamente lo que necesitas?' : "Don't see exactly what you need?"}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {lang === 'es' ?'Construimos sistemas a medida. Cuéntanos tu desafío y diseñamos la arquitectura correcta.' :'We build custom systems. Tell us your challenge and we design the right architecture.'}
          </p>
          <Link href="/contact" className="btn-primary px-8 py-3.5">
            {lang === 'es' ? 'Hablar con el Equipo' : 'Talk to the Team'}
          </Link>
        </ScrollAnimator>
      </div>
    </section>
  );
}