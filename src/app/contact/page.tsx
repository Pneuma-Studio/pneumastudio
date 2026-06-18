import React, { Suspense } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ContactHero from '@/app/contact/components/ContactHero';
import dynamic from 'next/dynamic';

const ContactMain = dynamic(() => import('@/app/contact/components/ContactMain'), { ssr: true });
const FAQSection = dynamic(() => import('@/app/components/FAQSection'), { ssr: true });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pneumastudio.mx';

export const metadata = {
  title: 'Contacto — Inicia Tu Proyecto Digital en Monterrey',
  description:
    'Habla con Pneuma Studio hoy. Respondemos en menos de 24 horas. WhatsApp: +52 811 280 3360 · Email: studio@pneumastudio.mx. Monterrey, Nuevo León, México.',
  keywords: [
    'contacto agencia digital Monterrey',
    'contratar desarrollo web Monterrey',
    'presupuesto ecommerce México',
    'WhatsApp agencia digital Monterrey',
    'iniciar proyecto web México',
  ],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: 'Contacto — Inicia Tu Proyecto | Pneuma Studio',
    description:
      'Respuesta en menos de 24 horas. WhatsApp +52 811 280 3360. Monterrey, Nuevo León, México.',
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-16">
          <ContactHero />
          <Suspense fallback={<div className="h-48" />}>
            <ContactMain />
          </Suspense>
          <Suspense fallback={<div className="h-48" />}>
            <FAQSection />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  );
}