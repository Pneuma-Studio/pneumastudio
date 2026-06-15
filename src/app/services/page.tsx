import React, { Suspense } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ServicesHero from '@/app/services/components/ServicesHero';
import dynamic from 'next/dynamic';

const ServicesGrid = dynamic(() => import('@/app/services/components/ServicesGrid'), { ssr: true });
const ServicesCTA = dynamic(() => import('@/app/services/components/ServicesCTA'), { ssr: true });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pneumastudio.mx';

export const metadata = {
  title: 'Servicios de Ecommerce, WhatsApp y Sistemas Empresariales',
  description:
    'Ecommerce personalizado, automatización WhatsApp, marketplaces, CRM, inventario y sistemas a medida en Monterrey, México. Desde $25,000 MXN. Construidos para escalar.',
  keywords: [
    'servicios ecommerce Monterrey',
    'automatización WhatsApp empresas',
    'marketplace software México',
    'CRM personalizado Monterrey',
    'sistema de inventario Monterrey',
    'desarrollo web a medida México',
    'integraciones Mercado Libre',
    'sistemas multi-sucursal',
  ],
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: 'Servicios — Ecommerce, WhatsApp y Sistemas | Pneuma Studio',
    description:
      '12 sistemas digitales para escalar tu negocio: ecommerce, automatización WhatsApp, CRM, inventario, analytics y más. Monterrey, México.',
    url: `${siteUrl}/services`,
  },
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