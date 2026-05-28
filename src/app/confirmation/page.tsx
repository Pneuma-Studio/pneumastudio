'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function ConfirmationContent() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const source = searchParams?.get('source') ?? 'contact';
  const email = searchParams?.get('email') ?? '';
  const isPartner = source === 'partner';

  const contactSteps = lang === 'es'
    ? [
        { icon: '📬', title: 'Confirmación recibida', desc: 'Tu mensaje llegó a nuestro equipo.', done: true },
        { icon: '🔍', title: 'Revisamos tu proyecto', desc: 'Analizamos tus necesidades en las próximas horas.', done: false },
        { icon: '📞', title: 'Te contactamos', desc: 'Recibirás respuesta en menos de 24 horas por email o WhatsApp.', done: false },
        { icon: '🚀', title: 'Kickoff del proyecto', desc: 'Definimos alcance, tiempos y comenzamos a construir.', done: false },
      ]
    : [
        { icon: '📬', title: 'Submission received', desc: 'Your message reached our team.', done: true },
        { icon: '🔍', title: 'We review your project', desc: 'We analyze your needs within the next few hours.', done: false },
        { icon: '📞', title: 'We reach out', desc: "You'll hear back within 24 hours via email or WhatsApp.", done: false },
        { icon: '🚀', title: 'Project kickoff', desc: 'We define scope, timeline, and start building.', done: false },
      ];

  const partnerSteps = lang === 'es'
    ? [
        { icon: '📬', title: 'Solicitud recibida', desc: 'Tu perfil de agencia llegó a nuestro equipo.', done: true },
        { icon: '🔎', title: 'Evaluamos tu agencia', desc: 'Revisamos tu perfil y el tipo de clientes que manejas.', done: false },
        { icon: '📞', title: 'Llamada de alineación', desc: 'Agendamos 30 min para definir el modelo de colaboración.', done: false },
        { icon: '📄', title: 'Acuerdo de confidencialidad', desc: 'Firmamos un NDA para proteger a ambas partes.', done: false },
        { icon: '🤝', title: 'Primer proyecto juntos', desc: 'Lanzamos el primer proyecto bajo tu marca.', done: false },
      ]
    : [
        { icon: '📬', title: 'Application received', desc: 'Your agency profile reached our team.', done: true },
        { icon: '🔎', title: 'We evaluate your agency', desc: 'We review your profile and the clients you handle.', done: false },
        { icon: '📞', title: 'Alignment call', desc: 'We schedule 30 min to define the collaboration model.', done: false },
        { icon: '📄', title: 'Confidentiality agreement', desc: 'We sign an NDA to protect both parties.', done: false },
        { icon: '🤝', title: 'First project together', desc: 'We launch the first project under your brand.', done: false },
      ];

  const steps = isPartner ? partnerSteps : contactSteps;

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-start pt-24 pb-20 px-4">
      {/* Success badge */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center">
            <CheckCircleIcon className="w-10 h-10 text-primary" />
          </div>
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-background flex items-center justify-center text-xs">✓</span>
        </div>
        <span className="label-tag text-primary mb-3">
          {isPartner
            ? (lang === 'es' ? 'SOLICITUD ENVIADA' : 'APPLICATION SENT')
            : (lang === 'es' ? 'MENSAJE ENVIADO' : 'MESSAGE SENT')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-800 text-foreground text-center mb-3" style={{ letterSpacing: '-0.025em' }}>
          {isPartner
            ? (lang === 'es' ? '¡Bienvenido a la red!' : 'Welcome to the network!')
            : (lang === 'es' ? '¡Recibimos tu mensaje!' : 'We got your message!')}
        </h1>
        <p className="text-muted-foreground text-center max-w-md leading-relaxed">
          {isPartner
            ? (lang === 'es' ?'Tu solicitud de partnership está en revisión. Aquí está lo que sucede a continuación.' :'Your partnership application is under review. Here\'s what happens next.')
            : (lang === 'es' ?'Tu proyecto está en buenas manos. Aquí está lo que sucede a continuación.' :'Your project is in good hands. Here\'s what happens next.')}
        </p>
      </div>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Email verification prompt */}
        {email && (
          <div className="glass-card rounded-2xl p-5 flex items-start gap-4 border border-primary/20">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <EnvelopeIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-700 text-foreground mb-1">
                {lang === 'es' ? 'Revisa tu bandeja de entrada' : 'Check your inbox'}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {lang === 'es'
                  ? <>Enviamos una confirmación a <span className="text-primary font-600">{email}</span>. Si no lo ves, revisa tu carpeta de spam.</>
                  : <>We sent a confirmation to <span className="text-primary font-600">{email}</span>. If you don't see it, check your spam folder.</>}
              </p>
            </div>
          </div>
        )}

        {/* Next steps timeline */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-base font-700 text-foreground mb-6">
            {lang === 'es' ? 'Próximos pasos' : 'Next steps'}
          </h2>
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[19px] top-6 bottom-6 w-px bg-white/8" aria-hidden="true" />
            <div className="flex flex-col gap-6">
              {steps?.map((step, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10 text-base
                    ${step?.done
                      ? 'bg-primary/20 border border-primary/40' :'bg-white/5 border border-white/10'}`}
                  >
                    {step?.icon}
                  </div>
                  <div className="pt-1.5">
                    <p className={`text-sm font-700 mb-0.5 ${step?.done ? 'text-primary' : 'text-foreground'}`}>
                      {step?.title}
                      {step?.done && (
                        <span className="ml-2 text-[10px] font-600 bg-primary/15 text-primary px-2 py-0.5 rounded-full">
                          {lang === 'es' ? 'Completado' : 'Done'}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step?.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partnership-track guidance (only for partner source) */}
        {isPartner && (
          <div className="glass-card rounded-2xl p-6 border border-primary/15">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-sm">🤝</span>
              </div>
              <h2 className="text-sm font-700 text-foreground">
                {lang === 'es' ? 'Tu camino como Agencia Socia' : 'Your Agency Partner track'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(lang === 'es' ? [
                    { label: 'Modelo Comisión', detail: '15% por cada cliente referido que cierre.' },
                    { label: 'Modelo Mayoreo', detail: 'Acceso a precios –30% para reventa bajo tu marca.' },
                    { label: 'NDA incluido', detail: 'Protección total de la relación comercial.' },
                    { label: 'Soporte dedicado', detail: 'Canal directo con el equipo de Pneuma Studio.' },
                  ] : [
                    { label: 'Commission model', detail: '15% for every referred client that closes.' },
                    { label: 'Wholesale model', detail: 'Access to –30% pricing for resale under your brand.' },
                    { label: 'NDA included', detail: 'Full protection of the business relationship.' },
                    { label: 'Dedicated support', detail: 'Direct channel with the Pneuma Studio team.' },
                  ])?.map((item, i) => (
                <div key={i} className="bg-white/3 rounded-xl p-3.5 border border-white/6">
                  <p className="text-xs font-700 text-primary mb-1">{item?.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item?.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/528112803360?text=Hola%20Nazre%2C%20acabo%20de%20enviar%20un%20formulario%20en%20Pneuma%20Studio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 py-3.5 text-sm font-700 flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {lang === 'es' ? 'Escribir por WhatsApp' : 'Message on WhatsApp'}
          </a>
          <Link
            href="/"
            className="flex-1 py-3.5 text-sm font-700 flex items-center justify-center gap-2 rounded-xl border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-all duration-200"
          >
            {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
          </Link>
        </div>

        {/* Response time note */}
        <p className="text-xs text-muted-foreground text-center">
          {lang === 'es' ?'✓ Respondemos en menos de 24 horas · pneumastudiomx@gmail.com' :'✓ We respond within 24 hours · pneumastudiomx@gmail.com'}
        </p>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ConfirmationContent />
    </Suspense>
  );
}
