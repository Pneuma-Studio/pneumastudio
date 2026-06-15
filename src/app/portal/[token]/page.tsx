import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const STAGES = [
  { key: 'propuesta', label: 'Propuesta' },
  { key: 'diseno', label: 'Diseño' },
  { key: 'desarrollo', label: 'Desarrollo' },
  { key: 'qa', label: 'QA' },
  { key: 'lanzamiento', label: 'Lanzamiento' },
];

const STAGE_DESCRIPTIONS: Record<string, string> = {
  propuesta: 'Estamos revisando los requisitos de tu proyecto y preparando la propuesta técnica.',
  diseno: 'El equipo está diseñando la arquitectura y los wireframes de tu plataforma.',
  desarrollo: 'Tu plataforma está en construcción activa. Pronto tendrás una vista previa.',
  qa: 'Estamos probando cada funcionalidad antes de entregarte el producto final.',
  lanzamiento: '¡Tu plataforma está lista! Coordinaremos el deploy a producción contigo.',
};

export default async function PortalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = await createClient();

  const { data: portal, error } = await supabase
    .from('project_portals')
    .select('*')
    .eq('token', token)
    .single();

  if (error || !portal) notFound();

  const currentStageIndex = STAGES.findIndex((s) => s.key === portal.stage);

  return (
    <div className="min-h-screen" style={{ background: '#050D1A' }}>
      {/* Top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 sm:px-6"
        style={{ background: 'rgba(5,13,26,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
      >
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image src="/assets/images/pneuma-studio-wordmark.png" alt="Pneuma Studio" width={120} height={40} className="object-contain" />
        </Link>
        <span className="ml-3 text-xs font-600 px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,196,160,0.1)', color: '#00C4A0', border: '1px solid rgba(0,196,160,0.2)' }}>
          Portal Cliente
        </span>
      </header>

      <main className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Greeting */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
              <span className="label-tag text-primary">PROYECTO</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-800 text-white mb-1" style={{ letterSpacing: '-0.025em' }}>
              {portal.project_name}
            </h1>
            <p className="text-base" style={{ color: '#8A9BB5' }}>
              Hola, {portal.client_name}. Aquí puedes seguir el avance de tu proyecto en tiempo real.
            </p>
          </div>

          {/* Stage progress */}
          <div
            className="rounded-2xl p-6 sm:p-8 mb-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="label-tag text-muted-foreground mb-6">ETAPA ACTUAL</p>

            {/* Stage stepper */}
            <div className="flex items-center gap-0 mb-8">
              {STAGES.map((stage, i) => {
                const done = i < currentStageIndex;
                const active = i === currentStageIndex;
                const upcoming = i > currentStageIndex;

                return (
                  <React.Fragment key={stage.key}>
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-700 transition-all"
                        style={{
                          background: done ? '#00C4A0' : active ? 'rgba(0,196,160,0.15)' : 'rgba(255,255,255,0.06)',
                          border: active ? '2px solid #00C4A0' : done ? 'none' : '1px solid rgba(255,255,255,0.12)',
                          color: done ? '#050D1A' : active ? '#00C4A0' : '#8A9BB5',
                          boxShadow: active ? '0 0 16px rgba(0,196,160,0.4)' : 'none',
                        }}
                      >
                        {done ? (
                          <svg viewBox="0 0 12 10" fill="none" className="w-3 h-2.5">
                            <path d="M1 5l3 3.5L11 1" stroke="#050D1A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          i + 1
                        )}
                      </div>
                      <span
                        className="text-xs font-500 mt-1.5 text-center leading-tight max-w-[52px]"
                        style={{ color: active ? '#fff' : done ? '#00C4A0' : '#8A9BB5', fontSize: '10px' }}
                      >
                        {stage.label}
                      </span>
                    </div>
                    {i < STAGES.length - 1 && (
                      <div
                        className="flex-1 h-px mx-1"
                        style={{ background: i < currentStageIndex ? '#00C4A0' : 'rgba(255,255,255,0.08)' }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Current stage description */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(0,196,160,0.05)', border: '1px solid rgba(0,196,160,0.15)' }}
            >
              <p className="text-sm font-600 text-white mb-1">
                {STAGES[currentStageIndex]?.label ?? 'En progreso'}
              </p>
              <p className="text-sm" style={{ color: '#8A9BB5' }}>
                {STAGE_DESCRIPTIONS[portal.stage] ?? 'Tu proyecto está siendo atendido por nuestro equipo.'}
              </p>
            </div>
          </div>

          {/* Preview URL */}
          {portal.preview_url && (
            <div
              className="rounded-2xl p-6 mb-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="label-tag text-muted-foreground mb-4">VISTA PREVIA</p>
              <p className="text-sm mb-4" style={{ color: '#8A9BB5' }}>
                Tu plataforma está disponible en el siguiente enlace. Puedes revisar el avance en cualquier momento.
              </p>
              <a
                href={portal.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                Ver plataforma en vivo
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <p className="text-xs mt-3" style={{ color: 'rgba(138,155,181,0.5)' }}>{portal.preview_url}</p>
            </div>
          )}

          {/* Contact */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-sm font-600 text-white mb-1">¿Tienes preguntas?</p>
            <p className="text-sm mb-4" style={{ color: '#8A9BB5' }}>Estamos disponibles por WhatsApp o correo.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/528112803360"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-600 px-4 py-2 rounded-lg transition-all duration-200"
                style={{ background: 'rgba(0,196,160,0.1)', color: '#00C4A0', border: '1px solid rgba(0,196,160,0.2)' }}
              >
                WhatsApp
              </a>
              <a
                href="mailto:pneumastudiomx@gmail.com"
                className="text-sm font-500 px-4 py-2 rounded-lg transition-colors"
                style={{ color: '#8A9BB5', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                pneumastudiomx@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
