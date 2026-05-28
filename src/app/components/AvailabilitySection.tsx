'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';

const TOTAL_SLOTS = 5;
const TAKEN_SLOTS = 3; // Update this number each month

export default function AvailabilitySection() {
  const { lang } = useLanguage();
  const available = TOTAL_SLOTS - TAKEN_SLOTS;
  const isCritical = available <= 1;
  const isLow = available <= 2;

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: '#050D1A' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 400,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: isCritical
            ? 'radial-gradient(ellipse, rgba(239,68,68,0.07) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(0,196,160,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <ScrollAnimator>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-1 h-5 rounded-full"
              style={{ background: isCritical ? '#ef4444' : '#00C4A0' }}
            />
            <span className="label-tag" style={{ color: isCritical ? '#ef4444' : '#00C4A0' }}>
              {lang === 'es' ? 'DISPONIBILIDAD' : 'AVAILABILITY'}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-800 text-white mb-3"
            style={{ letterSpacing: '-0.025em' }}
          >
            {lang === 'es' ? (
              <>
                Capacidad limitada.{' '}
                <span
                  style={{
                    background: isCritical
                      ? 'linear-gradient(135deg, #ef4444 0%, #FFFFFF 100%)'
                      : 'linear-gradient(135deg, #00C4A0 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Resultados sin comprometer.
                </span>
              </>
            ) : (
              <>
                Limited capacity.{' '}
                <span
                  style={{
                    background: isCritical
                      ? 'linear-gradient(135deg, #ef4444 0%, #FFFFFF 100%)'
                      : 'linear-gradient(135deg, #00C4A0 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Results without compromise.
                </span>
              </>
            )}
          </h2>
          <p className="text-sm mb-12 max-w-xl" style={{ color: '#8A9BB5' }}>
            {lang === 'es' ?'Aceptamos máximo 5 proyectos por mes para garantizar atención personalizada y calidad de producción en cada entrega.' :'We accept a maximum of 5 projects per month to guarantee personalized attention and production quality in every delivery.'}
          </p>
        </ScrollAnimator>

        {/* Availability card */}
        <ScrollAnimator delay={100}>
          <div
            className="rounded-2xl p-8 sm:p-10 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              border: isCritical
                ? '1px solid rgba(239,68,68,0.3)'
                : '1px solid rgba(0,196,160,0.2)',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: isCritical
                  ? 'linear-gradient(90deg, transparent, rgba(239,68,68,0.6), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(0,196,160,0.5), transparent)',
              }}
            />

            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
              {/* Left: slot visual */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  {/* Pulsing dot */}
                  <span className="relative flex h-3 w-3">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: isCritical ? '#ef4444' : '#00C4A0' }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-3 w-3"
                      style={{ background: isCritical ? '#ef4444' : '#00C4A0' }}
                    />
                  </span>
                  <span
                    className="text-sm font-600"
                    style={{ color: isCritical ? '#ef4444' : '#00C4A0' }}
                  >
                    {lang === 'es'
                      ? `${available} lugar${available !== 1 ? 'es' : ''} disponible${available !== 1 ? 's' : ''} — Junio 2026`
                      : `${available} slot${available !== 1 ? 's' : ''} available — June 2026`}
                  </span>
                </div>

                {/* Slot bars */}
                <div className="flex gap-2 mb-6">
                  {Array.from({ length: TOTAL_SLOTS })?.map((_, i) => {
                    const isTaken = i < TAKEN_SLOTS;
                    return (
                      <div
                        key={i}
                        className="flex-1 h-10 rounded-lg flex items-center justify-center relative overflow-hidden"
                        style={{
                          background: isTaken
                            ? 'rgba(255,255,255,0.06)'
                            : isCritical
                            ? 'rgba(239,68,68,0.12)'
                            : 'rgba(0,196,160,0.1)',
                          border: isTaken
                            ? '1px solid rgba(255,255,255,0.08)'
                            : isCritical
                            ? '1px solid rgba(239,68,68,0.35)'
                            : '1px solid rgba(0,196,160,0.3)',
                        }}
                      >
                        {isTaken ? (
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            className="w-4 h-4"
                            style={{ color: 'rgba(255,255,255,0.2)' }}
                          >
                            <path
                              d="M4 8h8"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            className="w-4 h-4"
                            style={{ color: isCritical ? '#ef4444' : '#00C4A0' }}
                          >
                            <path
                              d="M8 3v10M3 8h10"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                    <span className="text-xs" style={{ color: '#8A9BB5' }}>
                      {lang === 'es' ? 'Ocupado' : 'Taken'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{
                        background: isCritical ? 'rgba(239,68,68,0.12)' : 'rgba(0,196,160,0.1)',
                        border: isCritical ? '1px solid rgba(239,68,68,0.35)' : '1px solid rgba(0,196,160,0.3)',
                      }}
                    />
                    <span className="text-xs" style={{ color: '#8A9BB5' }}>
                      {lang === 'es' ? 'Disponible' : 'Available'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="hidden lg:block w-px self-stretch"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              />

              {/* Right: context + CTA */}
              <div className="flex-1 flex flex-col gap-5">
                <div>
                  <div
                    className="text-5xl font-800 mb-1"
                    style={{
                      color: isCritical ? '#ef4444' : '#00C4A0',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {available}/{TOTAL_SLOTS}
                  </div>
                  <p className="text-sm" style={{ color: '#8A9BB5' }}>
                    {lang === 'es'
                      ? `lugar${available !== 1 ? 'es' : ''} disponible${available !== 1 ? 's' : ''} este mes`
                      : `slot${available !== 1 ? 's' : ''} available this month`}
                  </p>
                </div>

                {isLow && (
                  <div
                    className="flex items-start gap-3 rounded-xl p-4"
                    style={{
                      background: isCritical ? 'rgba(239,68,68,0.07)' : 'rgba(234,179,8,0.07)',
                      border: isCritical ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(234,179,8,0.2)',
                    }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: isCritical ? '#ef4444' : '#eab308' }}
                    >
                      <path
                        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495z"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 8v3M10 13.5v.5"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      />
                    </svg>
                    <p className="text-xs leading-relaxed" style={{ color: isCritical ? '#ef4444' : '#eab308' }}>
                      {lang === 'es'
                        ? isCritical
                          ? 'Queda solo 1 lugar. Si tienes un proyecto en mente, este es el momento.' :'Quedan pocos lugares. Los proyectos se asignan por orden de contacto.'
                        : isCritical
                        ? 'Only 1 slot left. If you have a project in mind, now is the time.' :'Few slots remaining. Projects are assigned on a first-contact basis.'}
                    </p>
                  </div>
                )}

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-600 transition-all duration-200 w-fit"
                  style={{
                    background: isCritical ? 'rgba(239,68,68,0.12)' : 'rgba(0,196,160,0.1)',
                    border: isCritical ? '1px solid rgba(239,68,68,0.35)' : '1px solid rgba(0,196,160,0.3)',
                    color: isCritical ? '#ef4444' : '#00C4A0',
                  }}
                >
                  {lang === 'es' ? 'Reservar mi lugar' : 'Reserve my slot'}
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
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
