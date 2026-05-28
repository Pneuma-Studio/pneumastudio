'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import Link from 'next/link';

const faqs = [
  {
    qEs: '¿Qué pasa si ya tengo un sitio web?',
    qEn: 'What if I already have a website?',
    aEs: 'Podemos partir de lo que ya tienes. Hacemos una auditoría técnica y de diseño para identificar qué vale la pena conservar y qué necesita reconstruirse. En muchos casos migramos el contenido y mejoramos la arquitectura sin empezar desde cero.',
    aEn: 'We can build on what you already have. We run a technical and design audit to identify what is worth keeping and what needs to be rebuilt. In many cases we migrate content and improve the architecture without starting from scratch.',
  },
  {
    qEs: '¿Puedo migrar mi tienda actual a una nueva plataforma?',
    qEn: 'Can I migrate my current store to a new platform?',
    aEs: 'Sí. Hemos migrado tiendas de Shopify, WooCommerce y plataformas propietarias a arquitecturas más rápidas y escalables. El proceso incluye migración de productos, clientes, historial de pedidos y configuración de pagos.',
    aEn: 'Yes. We have migrated stores from Shopify, WooCommerce, and proprietary platforms to faster, more scalable architectures. The process includes migration of products, customers, order history, and payment configuration.',
  },
  {
    qEs: '¿Quién me da soporte después del lanzamiento?',
    qEn: 'Who provides support after launch?',
    aEs: 'Nosotros mismos. Los primeros 30 días post-lanzamiento incluyen soporte directo con Nazre para resolver cualquier ajuste o incidencia. Después del período inicial, ofrecemos planes de mantenimiento mensual si los necesitas.',
    aEn: 'We do. The first 30 days post-launch include direct support with Nazre to resolve any adjustments or issues. After the initial period, we offer monthly maintenance plans if you need them.',
  },
  {
    qEs: '¿Trabajan con negocios pequeños o solo con empresas grandes?',
    qEn: 'Do you work with small businesses or only large companies?',
    aEs: 'Trabajamos con negocios que tienen claridad sobre lo que quieren construir, sin importar el tamaño. Nuestros proyectos van desde startups en etapa temprana hasta marcas establecidas. Lo que importa es que el proyecto tenga potencial real y que haya alineación en la visión.',
    aEn: 'We work with businesses that have clarity on what they want to build, regardless of size. Our projects range from early-stage startups to established brands. What matters is that the project has real potential and that there is alignment on the vision.',
  },
  {
    qEs: '¿Cuánto tiempo tarda un proyecto típico?',
    qEn: 'How long does a typical project take?',
    aEs: 'La mayoría de los proyectos se entregan en 3 a 5 semanas desde que se firma el contrato. Proyectos más complejos con integraciones avanzadas pueden tomar hasta 8 semanas. Siempre definimos un timeline claro antes de comenzar.',
    aEn: 'Most projects are delivered in 3 to 5 weeks from contract signing. More complex projects with advanced integrations can take up to 8 weeks. We always define a clear timeline before starting.',
  },
  {
    qEs: '¿Qué incluye exactamente el precio?',
    qEn: 'What exactly does the price include?',
    aEs: 'Diseño UI/UX, desarrollo frontend y backend, integración de pagos, configuración de hosting, dos rondas de revisión y 30 días de soporte post-lanzamiento. Lo que cotizamos es lo que pagas — sin sorpresas al final.',
    aEn: 'UI/UX design, frontend and backend development, payment integration, hosting configuration, two revision rounds, and 30 days of post-launch support. What we quote is what you pay — no surprises at the end.',
  },
  {
    qEs: '¿Puedo ver el código del proyecto?',
    qEn: 'Can I see the project code?',
    aEs: 'Sí, el código es 100% tuyo. Al finalizar el proyecto recibes acceso completo al repositorio en GitHub. No hay dependencias de plataformas propietarias ni licencias que te aten a nosotros.',
    aEn: 'Yes, the code is 100% yours. At project completion you receive full access to the GitHub repository. There are no proprietary platform dependencies or licenses that tie you to us.',
  },
  {
    qEs: '¿Cómo es el proceso de pago?',
    qEn: 'What is the payment process?',
    aEs: '50% al inicio del proyecto y 50% al momento de la entrega final. Aceptamos transferencia bancaria y tarjeta de crédito. Para proyectos grandes podemos acordar un esquema de pagos por hitos.',
    aEn: '50% at project start and 50% at final delivery. We accept bank transfer and credit card. For larger projects we can agree on a milestone-based payment schedule.',
  },
];

export default function FAQSection() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="section-padding relative overflow-hidden"
      style={{ background: '#050D1A' }}
    >
      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 400,
          top: '30%',
          right: '-100px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(30,64,175,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <ScrollAnimator>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
            <span className="label-tag text-primary">
              {lang === 'es' ? 'PREGUNTAS FRECUENTES' : 'FREQUENTLY ASKED QUESTIONS'}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-800 text-white mb-3"
            style={{ letterSpacing: '-0.025em' }}
          >
            {lang === 'es' ? (
              <>
                Las dudas que todos tienen{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00C4A0 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  antes de contratar.
                </span>
              </>
            ) : (
              <>
                The questions everyone has{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00C4A0 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  before hiring.
                </span>
              </>
            )}
          </h2>
          <p className="text-sm mb-12 max-w-xl" style={{ color: '#8A9BB5' }}>
            {lang === 'es' ?'Respuestas directas a las preguntas reales que nos hacen los clientes antes de tomar una decisión.' :'Direct answers to the real questions clients ask us before making a decision.'}
          </p>
        </ScrollAnimator>

        {/* Two-column FAQ layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollAnimator key={i} delay={i * 60}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left rounded-2xl p-5 relative overflow-hidden transition-all duration-300 group"
                  style={{
                    background: isOpen ? 'rgba(0,196,160,0.05)' : 'rgba(255,255,255,0.04)',
                    border: isOpen
                      ? '1px solid rgba(0,196,160,0.25)'
                      : '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Top accent when open */}
                  {isOpen && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(0,196,160,0.6), transparent)',
                      }}
                    />
                  )}

                  {/* Question row */}
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="text-sm font-600 leading-snug text-left"
                      style={{ color: isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.85)' }}
                    >
                      {lang === 'es' ? faq.qEs : faq.qEn}
                    </span>
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300"
                      style={{
                        background: isOpen ? 'rgba(0,196,160,0.15)' : 'rgba(255,255,255,0.06)',
                        border: isOpen ? '1px solid rgba(0,196,160,0.3)' : '1px solid rgba(255,255,255,0.1)',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        className="w-3 h-3"
                        style={{ color: isOpen ? '#00C4A0' : '#8A9BB5' }}
                      >
                        <path
                          d="M6 1v10M1 6h10"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Answer */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? '300px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed mt-4 text-left"
                      style={{ color: '#8A9BB5' }}
                    >
                      {lang === 'es' ? faq.aEs : faq.aEn}
                    </p>
                  </div>
                </button>
              </ScrollAnimator>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <ScrollAnimator delay={500}>
          <div
            className="mt-10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              background: 'rgba(0,196,160,0.04)',
              border: '1px solid rgba(0,196,160,0.15)',
            }}
          >
            <div>
              <p className="text-sm font-600 text-white mb-1">
                {lang === 'es' ? '¿Tienes una pregunta que no está aquí?' : 'Have a question that is not here?'}
              </p>
              <p className="text-xs" style={{ color: '#8A9BB5' }}>
                {lang === 'es' ?'Escríbenos directamente y te respondemos en menos de 24 horas.' :'Write to us directly and we will respond in less than 24 hours.'}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-600 shrink-0 transition-all duration-200"
              style={{
                background: 'rgba(0,196,160,0.1)',
                border: '1px solid rgba(0,196,160,0.3)',
                color: '#00C4A0',
              }}
            >
              {lang === 'es' ? 'Hacer mi pregunta' : 'Ask my question'}
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
