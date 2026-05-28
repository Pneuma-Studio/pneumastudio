'use client';

import React, { useEffect, useRef } from 'react';
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf: number;
    let tx = 0.5, ty = 0.5;
    let cx = 0.5, cy = 0.5;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width;
      ty = (e.clientY - rect.top) / rect.height;
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      section.style.setProperty('--sx', `${cx * 100}%`);
      section.style.setProperty('--sy', `${cy * 100}%`);
      raf = requestAnimationFrame(tick);
    };

    section.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      section.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-spotlight relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      style={{ background: '#050D1A' }}
    >
      <AnimatedGridBackground />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-12 pb-8">

        {/* Location chip */}
        <div className="hero-reveal inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full" style={{ animationDelay: '0ms', background: 'rgba(0,196,160,0.08)', border: '1px solid rgba(0,196,160,0.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C4A0] animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#00C4A0', letterSpacing: '0.14em' }}>
            Live in Monterrey, MX
          </span>
        </div>

        {/* Headline */}
        <div className="mb-6 overflow-hidden">
          <h1
            className="hero-reveal text-5xl sm:text-6xl lg:text-7xl font-800 text-white tracking-tight leading-tight"
            style={{ letterSpacing: '-0.03em', animationDelay: '80ms' }}
          >
            <span className="block">{t('hero.h1.line1')}</span>
            <span className="block text-gradient-hero">{t('hero.h1.line2')}</span>
          </h1>
        </div>

        {/* Studio label */}
        <p
          className="hero-reveal mt-3 text-sm sm:text-base font-600 tracking-widest uppercase"
          style={{ color: '#00C4A0', letterSpacing: '0.18em', animationDelay: '160ms' }}
        >
          PREMIUM DIGITAL COMMERCE &amp; AUTOMATION STUDIO
        </p>

        {/* Subheadline */}
        <p
          className="hero-reveal text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 mt-5"
          style={{ fontWeight: 400, animationDelay: '240ms' }}
        >
          {t('hero.sub')}
        </p>

        {/* CTAs */}
        <div className="hero-reveal flex flex-col sm:flex-row gap-4 justify-center mb-14" style={{ animationDelay: '320ms' }}>
          <Link href="/contact" className="btn-primary text-base px-7 py-3.5">
            {t('hero.cta.primary')}
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <Link href="/portfolio" className="btn-ghost text-base px-7 py-3.5">
            {t('hero.cta.secondary')}
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-reveal flex flex-col sm:flex-row gap-6 sm:gap-12 justify-center items-center mb-16" style={{ animationDelay: '400ms' }}>
          {[
            { num: t('hero.stat1.num'), label: t('hero.stat1.label') },
            { num: t('hero.stat2.num'), label: t('hero.stat2.label') },
            { num: t('hero.stat3.num'), label: t('hero.stat3.label') },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-800 tracking-tight" style={{ color: '#00C4A0' }}>{stat.num}</span>
              <span className="label-tag text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div
        className="relative z-10 w-full overflow-hidden border-t border-b border-white/5 py-4 backdrop-blur-sm"
        style={{ background: 'rgba(10,22,40,0.4)', minHeight: '48px' }}
      >
        <div className="flex gap-12 marquee-track">
          {techStack.map((tech, i) => (
            <span key={i} className="label-tag text-muted-foreground whitespace-nowrap flex items-center gap-2">
              <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(0,196,160,0.5)' }} />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
