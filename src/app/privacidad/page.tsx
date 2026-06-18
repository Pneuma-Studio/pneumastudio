import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pneumastudio.mx';

export const metadata = {
  title: 'Aviso de Privacidad — Pneuma Studio',
  description: 'Aviso de privacidad de Pneuma Studio conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).',
  alternates: { canonical: `${siteUrl}/privacidad` },
  robots: { index: false, follow: false },
};

function SectionCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Top accent */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, #00C4A0, transparent)' }} />
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4">
          {/* Number badge */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-800 shrink-0 mt-0.5"
            style={{ background: 'rgba(0,196,160,0.12)', border: '1px solid rgba(0,196,160,0.25)', color: '#00C4A0' }}
          >
            {number}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-700 text-white mb-4" style={{ letterSpacing: '-0.01em' }}>{title}</h2>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#A8BDD4' }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#00C4A0' }} />
      <span>{children}</span>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center text-xs font-600 px-2.5 py-1 rounded-lg mr-1 mb-1"
      style={{ background: 'rgba(0,196,160,0.08)', border: '1px solid rgba(0,196,160,0.2)', color: '#00C4A0' }}
    >
      {children}
    </span>
  );
}

export default function PrivacidadPage() {
  const fecha = '15 de junio de 2025';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main style={{ background: '#050D1A' }}>
        {/* Hero */}
        <section className="pt-28 pb-12 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
              <span className="label-tag text-primary">LEGAL</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-800 text-white mb-3"
              style={{ letterSpacing: '-0.025em' }}
            >
              Aviso de{' '}
              <span style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Privacidad
              </span>
            </h1>
            <p className="text-sm" style={{ color: '#8A9BB5' }}>
              Última actualización: <span style={{ color: '#C8D5E8' }}>{fecha}</span>
              <span className="mx-2" style={{ color: 'rgba(138,155,181,0.4)' }}>·</span>
              Conforme a la <span style={{ color: '#C8D5E8' }}>LFPDPPP</span>
            </p>
          </div>
        </section>

        {/* Sections */}
        <section className="pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4">

            <SectionCard number="1" title="Identidad y domicilio del Responsable">
              <p>
                <strong className="text-white">Pneuma Studio</strong>, con domicilio en Monterrey, Nuevo León, México, es responsable del tratamiento de sus datos personales de conformidad con la <em style={{ color: '#C8D5E8' }}>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em> (LFPDPPP) y su Reglamento.
              </p>
              <div
                className="flex items-center gap-3 mt-4 p-3 rounded-xl"
                style={{ background: 'rgba(0,196,160,0.05)', border: '1px solid rgba(0,196,160,0.12)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" stroke="#00C4A0" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span style={{ color: '#A8BDD4' }}>
                  Contacto de privacidad:{' '}
                  <a href="mailto:studio@pneumastudio.mx" style={{ color: '#00C4A0' }} className="font-600">studio@pneumastudio.mx</a>
                </span>
              </div>
            </SectionCard>

            <SectionCard number="2" title="Datos personales que recabamos">
              <p>A través de <strong className="text-white">pneumastudio.mx</strong> podemos recabar los siguientes datos:</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Pill>Nombre completo</Pill>
                <Pill>Correo electrónico</Pill>
                <Pill>Teléfono / WhatsApp</Pill>
                <Pill>Empresa u organización</Pill>
                <Pill>Requerimientos del proyecto</Pill>
              </div>
              <div
                className="mt-4 flex items-start gap-2.5 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0 mt-0.5" stroke="#8A9BB5" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ color: '#8A9BB5' }}>No recabamos datos sensibles (salud, biométricos, financieros, etc.).</span>
              </div>
            </SectionCard>

            <SectionCard number="3" title="Finalidades del tratamiento">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-700 uppercase tracking-wider mb-3" style={{ color: '#00C4A0' }}>
                    Primarias — necesarias para la relación comercial
                  </p>
                  <div className="space-y-2">
                    <DataItem>Responder solicitudes de información, cotización y contacto</DataItem>
                    <DataItem>Proveer los servicios de desarrollo web y automatización digital contratados</DataItem>
                    <DataItem>Gestión de pagos y facturación</DataItem>
                    <DataItem>Comunicación relacionada con proyectos en curso</DataItem>
                  </div>
                </div>
                <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div>
                  <p className="text-xs font-700 uppercase tracking-wider mb-3" style={{ color: '#8A9BB5' }}>
                    Secundarias — puede oponerse
                  </p>
                  <div className="space-y-2">
                    <DataItem>Envío de información sobre nuevos servicios o actualizaciones</DataItem>
                    <DataItem>Invitaciones a eventos, webinars o contenido relevante</DataItem>
                  </div>
                  <p className="mt-3" style={{ color: '#8A9BB5' }}>
                    Para oponerse, envíe un correo a{' '}
                    <a href="mailto:studio@pneumastudio.mx" style={{ color: '#00C4A0' }}>studio@pneumastudio.mx</a>{' '}
                    con el asunto <span className="text-white font-600">"Oposición finalidades secundarias"</span>.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard number="4" title="Transferencia de datos">
              <p>Sus datos podrán compartirse únicamente cuando sea necesario para prestar el servicio:</p>
              <div className="mt-4 space-y-3">
                {[
                  { label: 'Infraestructura tecnológica', tools: 'Vercel · Supabase · Netlify', desc: 'Alojamiento de datos' },
                  { label: 'Procesadores de pago', tools: 'Stripe', desc: 'Gestión de pagos exclusivamente' },
                  { label: 'Herramientas de productividad', tools: 'Notion', desc: 'Gestión interna de proyectos' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start justify-between gap-4 p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div>
                      <p className="text-sm font-600 text-white mb-0.5">{item.label}</p>
                      <p className="text-xs" style={{ color: '#8A9BB5' }}>{item.desc}</p>
                    </div>
                    <span className="text-xs font-600 shrink-0 px-2.5 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', color: '#A8BDD4', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {item.tools}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3" style={{ color: '#8A9BB5' }}>
                Todos están obligados contractualmente a mantener la confidencialidad de los datos.
              </p>
            </SectionCard>

            <SectionCard number="5" title="Cookies y tecnologías de seguimiento">
              <div className="space-y-3">
                {[
                  { name: 'Google Analytics 4', desc: 'Análisis de tráfico anónimo', note: 'Desactivable desde configuración del navegador' },
                  { name: 'Cookies funcionales', desc: 'Preferencias de idioma y consentimiento', note: 'Necesarias para el funcionamiento del sitio' },
                ].map((cookie) => (
                  <div
                    key={cookie.name}
                    className="p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <p className="text-sm font-600 text-white mb-1">{cookie.name}</p>
                    <p className="text-xs mb-1.5" style={{ color: '#A8BDD4' }}>{cookie.desc}</p>
                    <p className="text-xs" style={{ color: '#8A9BB5' }}>↳ {cookie.note}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard number="6" title="Derechos ARCO">
              <p>Usted tiene derecho a:</p>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { letter: 'A', word: 'Acceder', desc: 'Ver sus datos' },
                  { letter: 'R', word: 'Rectificar', desc: 'Corregir datos' },
                  { letter: 'C', word: 'Cancelar', desc: 'Eliminar datos' },
                  { letter: 'O', word: 'Oponerse', desc: 'Al tratamiento' },
                ].map((right) => (
                  <div
                    key={right.letter}
                    className="p-3 rounded-xl text-center"
                    style={{ background: 'rgba(0,196,160,0.05)', border: '1px solid rgba(0,196,160,0.15)' }}
                  >
                    <div className="text-xl font-800 mb-1" style={{ color: '#00C4A0' }}>{right.letter}</div>
                    <p className="text-xs font-700 text-white">{right.word}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#8A9BB5' }}>{right.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-xs font-700 uppercase tracking-wider" style={{ color: '#8A9BB5' }}>Para ejercerlos:</p>
                <DataItem>Envíe un correo a <a href="mailto:studio@pneumastudio.mx" style={{ color: '#00C4A0' }}>studio@pneumastudio.mx</a> con el asunto <span className="text-white font-600">"Derechos ARCO"</span></DataItem>
                <DataItem>Incluya su nombre completo, datos de contacto y descripción de la solicitud</DataItem>
                <DataItem>Responderemos en un plazo máximo de <span className="text-white font-600">20 días hábiles</span></DataItem>
              </div>
            </SectionCard>

            <SectionCard number="7" title="Cambios al Aviso de Privacidad">
              <p>
                Nos reservamos el derecho de actualizar este aviso en cualquier momento. Cualquier modificación será publicada en{' '}
                <a href="/privacidad" style={{ color: '#00C4A0' }}>pneumastudio.mx/privacidad</a>.
                El uso continuado del sitio implica la aceptación de los cambios.
              </p>
            </SectionCard>

            {/* Contact footer */}
            <div
              className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ background: 'rgba(0,196,160,0.04)', border: '1px solid rgba(0,196,160,0.15)' }}
            >
              <div>
                <p className="text-sm font-600 text-white mb-1">¿Dudas sobre este aviso?</p>
                <p className="text-xs" style={{ color: '#8A9BB5' }}>Estamos disponibles por correo o WhatsApp.</p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <a
                  href="mailto:studio@pneumastudio.mx"
                  className="text-xs font-600 px-4 py-2 rounded-lg transition-all duration-200"
                  style={{ background: 'rgba(0,196,160,0.1)', color: '#00C4A0', border: '1px solid rgba(0,196,160,0.25)' }}
                >
                  studio@pneumastudio.mx
                </a>
                <a
                  href="https://wa.me/5218116333559"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-600 px-4 py-2 rounded-lg transition-all duration-200"
                  style={{ background: 'rgba(37,211,102,0.08)', color: '#25D366', border: '1px solid rgba(37,211,102,0.2)' }}
                >
                  WhatsApp
                </a>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
