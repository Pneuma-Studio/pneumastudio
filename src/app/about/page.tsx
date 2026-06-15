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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pneumastudio.mx';

export const metadata = {
  title: 'Nosotros — Equipo, Tecnología y Metodología',
  description:
    'Conoce al equipo de Pneuma Studio: arquitectos digitales basados en Monterrey, Nuevo León. Next.js, TypeScript, PostgreSQL y metodología ágil al servicio de tu negocio.',
  keywords: [
    'equipo desarrollo web Monterrey',
    'arquitectos digitales Nuevo León',
    'agencia tecnológica Monterrey',
    'metodología desarrollo software México',
  ],
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: 'Nosotros — Equipo y Metodología | Pneuma Studio',
    description:
      'Más que desarrolladores, somos arquitectos digitales. Conoce el stack tecnológico y la metodología de Pneuma Studio en Monterrey.',
    url: `${siteUrl}/about`,
  },
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