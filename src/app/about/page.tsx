import React, { Suspense } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import AboutHero from '@/app/about/components/AboutHero';
import dynamic from 'next/dynamic';

const TechStackSection = dynamic(() => import('@/app/about/components/TechStackSection'), { ssr: true });
const MethodologySection = dynamic(() => import('@/app/about/components/MethodologySection'), { ssr: true });
const FounderSection = dynamic(() => import('@/app/about/components/FounderSection'), { ssr: true });

export const metadata = {
  title: 'Nosotros — Pneuma Studio',
  description: 'Conoce el equipo, la tecnología y la metodología detrás de Pneuma Studio. Más que desarrolladores, arquitectos.',
};

export default function AboutPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-16">
          <AboutHero />
          <Suspense fallback={<div className="h-96" />}>
            <TechStackSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <MethodologySection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <FounderSection />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  );
}