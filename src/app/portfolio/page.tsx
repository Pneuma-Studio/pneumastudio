import React, { Suspense } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PortfolioHero from '@/app/portfolio/components/PortfolioHero';
import dynamic from 'next/dynamic';

const PortfolioCaseStudies = dynamic(
  () => import('@/app/portfolio/components/PortfolioCaseStudies'),
  { ssr: true }
);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pneumastudio.mx';

export const metadata = {
  title: 'Portafolio — Casos de Éxito con Resultados Reales',
  description:
    'Casos de estudio de Pneuma Studio: +68% conversión, −80% carga administrativa, 3× volumen de pedidos. Plataformas ecommerce y automatizaciones construidas en Monterrey.',
  keywords: [
    'portafolio agencia digital Monterrey',
    'casos de éxito ecommerce México',
    'resultados desarrollo web',
    'ejemplos tienda online México',
    'proyectos automatización WhatsApp',
  ],
  alternates: { canonical: `${siteUrl}/portfolio` },
  openGraph: {
    title: 'Portafolio — Resultados Reales | Pneuma Studio',
    description:
      '+68% conversión, −80% carga admin, 3× pedidos. Casos de éxito reales de ecommerce y automatización en México.',
    url: `${siteUrl}/portfolio`,
  },
};

export default function PortfolioPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-16">
          <PortfolioHero />
          <Suspense fallback={<div className="h-96" />}>
            <PortfolioCaseStudies />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  );
}