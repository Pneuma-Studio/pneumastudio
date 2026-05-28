'use client';

import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

export default function CinematicStatement() {
  const { lang } = useLanguage();

  return (
    <section className="relative overflow-hidden" style={{ background: '#050D1A', padding: '100px 0' }}>
      {/* Deep orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 900, height: 900,
          borderRadius: '50%',
          filter: 'blur(120px)',
          background: 'radial-gradient(circle, rgba(0,196,160,0.09) 0%, rgba(30,64,175,0.07) 50%, transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Horizontal rule top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,160,0.3) 30%, rgba(0,196,160,0.3) 70%, transparent)' }}
      />
      {/* Horizontal rule bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,160,0.3) 30%, rgba(0,196,160,0.3) 70%, transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <ScrollAnimator>
          {/* Label */}
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-8"
            style={{ color: 'rgba(0,196,160,0.7)' }}
          >
            {lang === 'es' ? 'FILOSOFÍA' : 'PHILOSOPHY'}
          </p>

          {/* Large quote */}
          <blockquote
            className="text-3xl sm:text-4xl lg:text-5xl font-800 leading-snug mb-6"
            style={{
              letterSpacing: '-0.03em',
              paddingBottom: '0.25em',
              background: 'linear-gradient(160deg, #FFFFFF 0%, rgba(255,255,255,0.75) 50%, #00C4A0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {lang === 'es'
              ? '"No construimos software. Construimos la infraestructura comercial que define quién gana en la próxima década."'
              : '"We don\'t build software. We build the commercial infrastructure that defines who wins in the next decade."'}
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-12" style={{ background: 'rgba(0,196,160,0.4)' }} />
            <span className="text-sm font-medium" style={{ color: '#8A9BB5' }}>
              Pneuma Studio
            </span>
            <div className="h-px w-12" style={{ background: 'rgba(0,196,160,0.4)' }} />
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
