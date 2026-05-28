import React, { Suspense } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ServicesHero from '@/app/services/components/ServicesHero';
import dynamic from 'next/dynamic';

const ServicesGrid = dynamic(() => import('@/app/services/components/ServicesGrid'), { ssr: true });
const ServicesCTA = dynamic(() => import('@/app/services/components/ServicesCTA'), { ssr: true });

export const metadata = {
  title: 'Servicios — Pneuma Studio',
  description: 'Ecommerce, automatización WhatsApp, marketplaces y sistemas de gestión empresarial. Construidos para escalar.',
};

export default function ServicesPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-16">
          <ServicesHero />
          <Suspense fallback={<div className="h-96" />}>
            <ServicesGrid />
          </Suspense>
          <Suspense fallback={<div className="h-48" />}>
            <ServicesCTA />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  );
}