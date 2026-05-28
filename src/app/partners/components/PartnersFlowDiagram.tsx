'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

interface FlowNode {
  tag: string;
  tagEs: string;
  title: string;
  titleEs: string;
  subtitle: string;
  subtitleEs: string;
  isCenter?: boolean;
}

const nodes: FlowNode[] = [
  {
    tag: 'THE AGENCY',
    tagEs: 'LA AGENCIA',
    title: 'Agency Partner',
    titleEs: 'Agencia Socia',
    subtitle: 'Branding · Strategy · Marketing',
    subtitleEs: 'Branding · Estrategia · Marketing',
  },
  {
    tag: 'THE ARCHITECT',
    tagEs: 'EL ARQUITECTO',
    title: 'Pneuma Studio',
    titleEs: 'Pneuma Studio',
    subtitle: 'Development · Systems · UI/UX',
    subtitleEs: 'Desarrollo · Sistemas · UI/UX',
    isCenter: true,
  },
  {
    tag: 'THE RESULT',
    tagEs: 'EL RESULTADO',
    title: 'Final Client',
    titleEs: 'Cliente Final',
    subtitle: 'Premium Platform · Delivered',
    subtitleEs: 'Plataforma Premium · Entregada',
  },
];

const benefitData = [
  {
    iconPath: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
    titleEs: 'Desarrollo white-label',
    titleEn: 'White-label development',
    descEs: 'Tu marca al frente, nuestro código de alto nivel por detrás.',
    descEn: 'Your brand front and center, our high-end code underneath.',
  },
  {
    iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    titleEs: 'Ejecución rápida',
    titleEn: 'Fast execution',
    descEs: 'Sprints ágiles estructurados para entrega premium garantizada.',
    descEn: 'Structured agile sprints for guaranteed on-time premium delivery.',
  },
  {
    iconPath: 'M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3',
    titleEs: 'UI/UX Premium',
    titleEn: 'Premium UI/UX',
    descEs: 'Diseño de alto nivel que justifica tarifas y prestigio top-tier.',
    descEn: 'High-end design that justifies top-tier retainer fees and prestige.',
  },
  {
    iconPath: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    titleEs: 'Soporte continuo',
    titleEn: 'Ongoing support',
    descEs: 'Atención técnica continua, mantenimiento e iteraciones del sistema.',
    descEn: 'Continuous technical care, maintenance, and system iterations.',
  },
  {
    iconPath: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
    titleEs: 'Sistemas escalables',
    titleEn: 'Scalable systems',
    descEs: 'Arquitecturas diseñadas para manejar crecimiento y lógica compleja.',
    descEn: 'Architectures built to handle growth and complex business logic.',
  },
];

export default function PartnersFlowDiagram() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#0A1628' }}>
      {/* Ambient orbs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section header */}
        <ScrollAnimator>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
              <span className="label-tag text-primary">
                {lang === 'es' ? 'CÓMO FUNCIONA' : 'HOW IT WORKS'}
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-800 text-white mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              {lang === 'es'
                ? 'Escala sin escalar headcount.'
                : 'Scale without scaling headcount.'}
            </h2>
            <p className="text-sm max-w-lg" style={{ color: '#8A9BB5' }}>
              {lang === 'es'
                ? 'Tu agencia vende. Nosotros construimos. El cliente recibe una plataforma premium bajo tu nombre.'
                : 'Your agency sells. We build. The client gets a premium platform under your name.'}
            </p>
          </div>
        </ScrollAnimator>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left â€” Flow Diagram */}
          <ScrollAnimator>
            <div className="flex flex-col items-center gap-0">
              {nodes.map((node, i) => (
                <React.Fragment key={i}>
                  <div
                    className="w-full max-w-sm rounded-xl p-7 text-center relative overflow-hidden"
                    style={node.isCenter ? {
                      background: 'rgba(0,196,160,0.08)',
                      border: '1px solid rgba(0,196,160,0.35)',
                      boxShadow: '0 0 30px rgba(0,196,160,0.1)',
                    } : {
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {node.isCenter && (
                      <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, #00C4A0, transparent)' }}
                      />
                    )}
                    <p className="label-tag text-primary mb-3">
                      {lang === 'es' ? node.tagEs : node.tag}
                    </p>
                    {node.isCenter ? (
                      <div className="flex flex-col items-center gap-2">
                        <img src="/assets/images/pneuma-studio-wordmark.png?v=2" alt="Pneuma Studio" style={{ height: 150, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                      </div>
                    ) : (
                      <h3 className="text-xl font-800 text-white mb-2">
                        {lang === 'es' ? node.titleEs : node.title}
                      </h3>
                    )}
                    <p className="text-sm mt-2" style={{ color: '#8A9BB5' }}>
                      {lang === 'es' ? node.subtitleEs : node.subtitle}
                    </p>
                  </div>

                  {i < nodes.length - 1 && (
                    <div className="flex flex-col items-center py-1">
                      <div className="w-px h-5" style={{ background: 'rgba(0,196,160,0.4)' }} />
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                        <path d="M7 8L0 0h14L7 8z" fill="#00C4A0" fillOpacity="0.6" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </ScrollAnimator>

          {/* Right â€” Benefits */}
          <ScrollAnimator delay={150}>
            <div className="flex flex-col gap-3">
              {benefitData.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 flex items-start gap-4 service-card"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0,196,160,0.12)', border: '1px solid rgba(0,196,160,0.2)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-700 text-white text-sm mb-1">{lang === 'es' ? item.titleEs : item.titleEn}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: '#8A9BB5' }}>{lang === 'es' ? item.descEs : item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </div>
    </section>
  );
}

