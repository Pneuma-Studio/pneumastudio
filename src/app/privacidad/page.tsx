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

export default function PrivacidadPage() {
  const fecha = '15 de junio de 2025';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
            <span className="label-tag text-primary">LEGAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-800 text-white mb-2" style={{ letterSpacing: '-0.025em' }}>Aviso de Privacidad</h1>
          <p className="text-sm mb-10" style={{ color: '#8A9BB5' }}>Última actualización: {fecha}</p>

          <div className="prose-dark space-y-8" style={{ color: '#C8D5E8', lineHeight: '1.8' }}>

            <section>
              <h2 className="text-xl font-700 text-white mb-3">1. Identidad y domicilio del Responsable</h2>
              <p>
                <strong style={{ color: '#fff' }}>Pneuma Studio</strong> (en adelante "el Responsable"), con domicilio en Monterrey, Nuevo León, México, es responsable del tratamiento de sus datos personales de conformidad con la <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em> (LFPDPPP) y su Reglamento.
              </p>
              <p className="mt-3">
                Contacto de privacidad: <a href="mailto:pneumastudiomx@gmail.com" style={{ color: '#00C4A0' }}>pneumastudiomx@gmail.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-700 text-white mb-3">2. Datos personales que recabamos</h2>
              <p>A través del sitio web <strong style={{ color: '#fff' }}>pneumastudio.mx</strong> podemos recabar los siguientes datos personales:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número telefónico / WhatsApp</li>
                <li>Nombre de empresa u organización</li>
                <li>Información de proyecto o requerimientos comerciales</li>
              </ul>
              <p className="mt-3">No recabamos datos personales sensibles (datos de salud, biométricos, financieros, etc.).</p>
            </section>

            <section>
              <h2 className="text-xl font-700 text-white mb-3">3. Finalidades del tratamiento</h2>
              <p><strong style={{ color: '#fff' }}>Finalidades primarias (necesarias para la relación comercial):</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Responder solicitudes de información, cotización y contacto</li>
                <li>Proveer los servicios de desarrollo web y automatización digital contratados</li>
                <li>Gestión de pagos y facturación</li>
                <li>Comunicación relacionada con proyectos en curso</li>
              </ul>
              <p className="mt-4"><strong style={{ color: '#fff' }}>Finalidades secundarias (puede oponerse):</strong></p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Envío de información sobre nuevos servicios o actualizaciones de Pneuma Studio</li>
                <li>Invitaciones a eventos, webinars o contenido relevante</li>
              </ul>
              <p className="mt-3">Si no desea que sus datos sean tratados para finalidades secundarias, puede enviar un correo a <a href="mailto:pneumastudiomx@gmail.com" style={{ color: '#00C4A0' }}>pneumastudiomx@gmail.com</a> con el asunto "Oposición finalidades secundarias".</p>
            </section>

            <section>
              <h2 className="text-xl font-700 text-white mb-3">4. Transferencia de datos</h2>
              <p>Sus datos personales podrán ser compartidos con las siguientes categorías de terceros, únicamente cuando sea necesario para la prestación del servicio:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong style={{ color: '#fff' }}>Proveedores de infraestructura tecnológica</strong> (Vercel, Supabase, Netlify) — alojamiento de datos</li>
                <li><strong style={{ color: '#fff' }}>Procesadores de pago</strong> (Stripe) — únicamente para gestión de pagos</li>
                <li><strong style={{ color: '#fff' }}>Herramientas de productividad</strong> (Notion) — gestión interna de proyectos</li>
              </ul>
              <p className="mt-3">Dichos terceros actúan como encargados del tratamiento y están obligados contractualmente a mantener la confidencialidad de los datos.</p>
            </section>

            <section>
              <h2 className="text-xl font-700 text-white mb-3">5. Uso de cookies y tecnologías de seguimiento</h2>
              <p>Este sitio utiliza las siguientes tecnologías:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong style={{ color: '#fff' }}>Google Analytics 4</strong> — análisis de tráfico anónimo (puede desactivarse en configuración del navegador)</li>
                <li><strong style={{ color: '#fff' }}>Cookies funcionales</strong> — para recordar preferencias de idioma y consentimiento</li>
              </ul>
              <p className="mt-3">Puede deshabilitar el uso de cookies a través de la configuración de su navegador, aunque esto puede afectar la funcionalidad del sitio.</p>
            </section>

            <section>
              <h2 className="text-xl font-700 text-white mb-3">6. Derechos ARCO</h2>
              <p>Usted tiene derecho a <strong style={{ color: '#fff' }}>Acceder, Rectificar, Cancelar u Oponerse</strong> al tratamiento de sus datos personales (derechos ARCO). Para ejercerlos:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Envíe un correo a <a href="mailto:pneumastudiomx@gmail.com" style={{ color: '#00C4A0' }}>pneumastudiomx@gmail.com</a> con el asunto "Derechos ARCO"</li>
                <li>Incluya su nombre completo, datos de contacto y una descripción clara de la solicitud</li>
                <li>Responderemos en un plazo máximo de 20 días hábiles</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-700 text-white mb-3">7. Cambios al Aviso de Privacidad</h2>
              <p>Nos reservamos el derecho de actualizar este Aviso de Privacidad en cualquier momento. Cualquier modificación será publicada en <a href="/privacidad" style={{ color: '#00C4A0' }}>pneumastudio.mx/privacidad</a>. El uso continuado del sitio después de la publicación de cambios implica la aceptación de los mismos.</p>
            </section>

            <div className="mt-10 p-5 rounded-xl" style={{ background: 'rgba(0,196,160,0.05)', border: '1px solid rgba(0,196,160,0.15)' }}>
              <p className="text-sm" style={{ color: '#8A9BB5' }}>
                Si tiene dudas sobre este Aviso de Privacidad puede contactarnos en{' '}
                <a href="mailto:pneumastudiomx@gmail.com" style={{ color: '#00C4A0' }}>pneumastudiomx@gmail.com</a>{' '}
                o a través de WhatsApp al <a href="https://wa.me/528112803360" style={{ color: '#00C4A0' }}>+52 811 280 3360</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
