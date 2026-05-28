'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const techStack = [
  'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'PostgreSQL', 'MongoDB', 'AWS', 'Vercel', 'Framer Motion',
  'React', 'GraphQL', 'Redis',
  'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'PostgreSQL', 'MongoDB', 'AWS', 'Vercel', 'Framer Motion',
  'React', 'GraphQL', 'Redis',
];

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16" style={{ background: '#050D1A' }}>
      <AnimatedGridBackground />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-12 pb-8">
        {/* Label */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-teal" />
          <span className="label-tag text-primary">{t('hero.label')}</span>
        </div>

        {/* Logo-style headline matching cover slide */}
        <div className="mb-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-800 text-white tracking-tight leading-tight mb-3" style={{ letterSpacing: '-0.03em' }}>
            <span className="block">{t('hero.h1.line1')}</span>
            <span className="block" style={{ color: '#ffffff' }}>{t('hero.h1.line2')}</span>
          </h1>
          {/* Teal subtitle line — matches cover slide */}
          <p className="mt-4 text-sm sm:text-base font-600 tracking-widest uppercase" style={{ color: '#00C4A0', letterSpacing: '0.18em' }}>
            PREMIUM DIGITAL COMMERCE &amp; AUTOMATION STUDIO
          </p>
        </div>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10" style={{ fontWeight: 400 }}>
          {t('hero.sub')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link href="/contact" className="btn-primary text-base px-7 py-3.5">
            {t('hero.cta.primary')}
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <Link href="/portfolio" className="btn-ghost text-base px-7 py-3.5">
            {t('hero.cta.secondary')}
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center items-center mb-16">
          {[
            { num: t('hero.stat1.num'), label: t('hero.stat1.label') },
            { num: t('hero.stat2.num'), label: t('hero.stat2.label') },
            { num: t('hero.stat3.num'), label: t('hero.stat3.label') },
          ]?.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-800 text-primary tracking-tight">{stat?.num}</span>
              <span className="label-tag text-muted-foreground">{stat?.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div
        className="relative z-10 w-full overflow-hidden border-t border-b border-white/5 py-4 bg-background-secondary/40 backdrop-blur-sm"
        style={{ minHeight: '48px' }}
      >
        <div className="flex gap-12 marquee-track">
          {techStack?.map((tech, i) => (
            <span key={i} className="label-tag text-muted-foreground whitespace-nowrap flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary/50" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}