import React, { Suspense } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ContactHero from '@/app/contact/components/ContactHero';
import dynamic from 'next/dynamic';

const ContactMain = dynamic(() => import('@/app/contact/components/ContactMain'), { ssr: true });
const FAQSection = dynamic(() => import('@/app/components/FAQSection'), { ssr: true });

export const metadata = {
  title: 'Contacto — Pneuma Studio',
  description: 'Inicia tu proyecto con Pneuma Studio. Respondemos en menos de 24 horas. WhatsApp: +52 811 280 3360.',
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