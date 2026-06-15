import React, { Suspense } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PricingHero from '@/app/pricing/components/PricingHero';
import dynamic from 'next/dynamic';

const PricingCards = dynamic(() => import('@/app/pricing/components/PricingCards'), { ssr: true });
const PricingAddons = dynamic(() => import('@/app/pricing/components/PricingAddons'), { ssr: true });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pneumastudio.mx';

export const metadata = {
  title: 'Precios — Ecommerce y Automatización desde $25,000 MXN',
  description:
    'Precios transparentes para plataformas ecommerce y sistemas de automatización en México. Desde $25,000 MXN. Sin costos ocultos. Entrega en 3–5 semanas.',
  keywords: [
    'precios desarrollo web Monterrey',
    'costo ecommerce México',
    'precio automatización WhatsApp',
    'cuánto cuesta una tienda online México',
    'desarrollo web precio MXN',
    'agencia ecommerce precios México',
  ],
  alternates: { canonical: `${siteUrl}/pricing` },
  openGraph: {
    title: 'Precios — Desde $25,000 MXN Sin Costos Ocultos | Pneuma Studio',
    description:
      'Precios transparentes: ecommerce desde $45,900 MXN, automatización WhatsApp desde $25,000 MXN. Sin letra chica. Monterrey, México.',
    url: `${siteUrl}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-16">
          <PricingHero />
          <Suspense fallback={<div className="h-96" />}>
            <PricingCards />
          </Suspense>
          <Suspense fallback={<div className="h-64" />}>
            <PricingAddons />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  );
}