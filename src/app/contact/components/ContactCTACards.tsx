'use client';

import React from 'react';

import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

export default function ContactCTACards() {
  const { lang } = useLanguage();

  const cards = [
    {
      iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: lang === 'es' ? 'Agendar Reunión' : 'Schedule Meeting',
      href: 'https://wa.me/528112803360?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20reuni%C3%B3n%20con%20Pneuma%20Studio',
      external: true,
    },
    {
      iconPath: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
      title: lang === 'es' ? 'Ser Agencia Socia' : 'Become a Partner',
      href: 'https://wa.me/528112803360?text=Hola%2C%20me%20interesa%20ser%20agencia%20socia%20de%20Pneuma%20Studio',
      external: true,
    },
    {
      iconPath: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
      title: lang === 'es' ? 'Iniciar Proyecto' : 'Start a Project',
      href: '/contact',
      external: false,
    },
  ];

  return (
    <section className="pb-20" style={{ background: '#050D1A' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Contact info centered — matching final slide */}
        <ScrollAnimator delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center py-8 border-t border-white/5">
            <div>
              <p className="label-tag text-primary mb-2">WHATSAPP</p>
              <a
                href="https://wa.me/528112803360"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-600 hover:text-primary transition-colors"
              >
                +52 811 280 3360
              </a>
            </div>
            <div>
              <p className="label-tag text-primary mb-2">EMAIL</p>
              <a
                href="mailto:studio@pneumastudio.mx"
                className="text-white font-600 hover:text-primary transition-colors"
              >
                studio@pneumastudio.mx
              </a>
            </div>
            <div>
              <p className="label-tag text-primary mb-2">SOCIAL</p>
              <a
                href="https://instagram.com/pneumastudiomx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-600 hover:text-primary transition-colors"
              >
                @pneumastudiomx
              </a>
            </div>
          </div>
        </ScrollAnimator>

        {/* Final tagline */}
        <ScrollAnimator delay={300}>
          <div className="text-center pt-8 border-t border-white/5">
            <div className="w-16 h-px mx-auto mb-6" style={{ background: 'linear-gradient(to right, transparent, #00C4A0, transparent)' }} />
            <p className="text-lg font-700 text-white">
              {lang === 'es' ? 'Diseñamos sistemas. Construimos el futuro.' : 'We design systems. We build the future.'}
            </p>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}