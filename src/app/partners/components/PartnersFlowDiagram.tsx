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

export default function PartnersFlowDiagram() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Flow Diagram */}
          <ScrollAnimator>
            <div className="flex flex-col items-center gap-0">
              {nodes.map((node, i) => (
                <React.Fragment key={i}>
                  {/* Node card */}
                  <div
                    className={`w-full max-w-sm rounded-xl p-8 text-center transition-all duration-300 ${
                      node.isCenter
                        ? 'border-teal-glow bg-background relative z-10' :'glass-card'
                    }`}
                  >
                    <p className="label-tag text-primary mb-3">
                      {lang === 'es' ? node.tagEs : node.tag}
                    </p>
                    {node.isCenter ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src="/assets/images/Pneuma_Studio_Logo_Final_Draft_Sin_Fondo_-_copia-1779900651659.png"
                          alt="Pneuma Studio"
                          className="h-[35px] w-auto object-contain"
                        />
                      </div>
                    ) : (
                      <h3 className="text-xl font-800 text-foreground mb-2">
                        {lang === 'es' ? node.titleEs : node.title}
                      </h3>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">
                      {lang === 'es' ? node.subtitleEs : node.subtitle}
                    </p>
                  </div>

                  {/* Arrow connector */}
                  {i < nodes.length - 1 && (
                    <div className="flex flex-col items-center py-2">
                      <div className="w-px h-4 bg-primary/30" />
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="text-primary">
                        <path d="M8 10L0 0h16L8 10z" fill="currentColor" fillOpacity="0.7" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </ScrollAnimator>

          {/* Right — Benefits */}
          <ScrollAnimator delay={150}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <h2 className="text-xl font-800 text-foreground">
                  {lang === 'es' ?'Escala operaciones sin escalar headcount.' :'Scale operations without scaling headcount.'}
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    ),
                    title: lang === 'es' ? 'Desarrollo white-label' : 'White-label development',
                    desc: lang === 'es' ?'Tu marca al frente, nuestro código de alto nivel por detrás.' :'Your brand front and center, our high-end code underneath.',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    ),
                    title: lang === 'es' ? 'Ejecución rápida' : 'Fast execution',
                    desc: lang === 'es' ?'Sprints ágiles estructurados para entrega premium garantizada.' :'Structured agile sprints for guaranteed on-time premium delivery.',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    ),
                    title: lang === 'es' ? 'UI/UX Premium' : 'Premium UI/UX',
                    desc: lang === 'es' ?'Diseño de alto nivel que justifica tarifas y prestigio top-tier.' :'High-end design that justifies top-tier retainer fees and prestige.',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87" />
                        <path d="M16 3.13a4 4 0 010 7.75" />
                      </svg>
                    ),
                    title: lang === 'es' ? 'Soporte continuo' : 'Ongoing support',
                    desc: lang === 'es' ?'Atención técnica continua, mantenimiento e iteraciones del sistema.' :'Continuous technical care, maintenance, and system iterations.',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    ),
                    title: lang === 'es' ? 'Sistemas escalables' : 'Scalable systems',
                    desc: lang === 'es' ?'Arquitecturas diseñadas para manejar crecimiento y lógica compleja.' :'Architectures built to handle growth and complex business logic.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="glass-card-hover rounded-xl p-4 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-700 text-foreground text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </div>
    </section>
  );
}
