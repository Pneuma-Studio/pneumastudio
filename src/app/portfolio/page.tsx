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

export const metadata = {
  title: 'Portafolio — Pneuma Studio',
  description: 'Casos de estudio reales con resultados medibles. +68% conversión, -80% carga administrativa, 3× volumen de pedidos.',
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