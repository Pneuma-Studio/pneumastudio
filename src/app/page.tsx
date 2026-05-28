import React, { Suspense } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import HeroSection from '@/app/components/HeroSection';
import dynamic from 'next/dynamic';

// Lazy-load below-fold sections — reduces initial JS parse/execute cost
const FeaturedServicesSection = dynamic(
  () => import('@/app/components/FeaturedServicesSection'),
  { ssr: true }
);
const FeaturedPortfolioSection = dynamic(
  () => import('@/app/components/FeaturedPortfolioSection'),
  { ssr: true }
);
const HomeCTASection = dynamic(
  () => import('@/app/components/HomeCTASection'),
  { ssr: true }
);
const CinematicStatement = dynamic(
  () => import('@/app/components/CinematicStatement'),
  { ssr: true }
);
const ProcessSection = dynamic(
  () => import('@/app/components/ProcessSection'),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () => import('@/app/components/TestimonialsSection'),
  { ssr: true }
);
const GuaranteesSection = dynamic(
  () => import('@/app/components/GuaranteesSection'),
  { ssr: true }
);
const FAQSection = dynamic(
  () => import('@/app/components/FAQSection'),
  { ssr: true }
);
const AvailabilitySection = dynamic(
  () => import('@/app/components/AvailabilitySection'),
  { ssr: true }
);

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          {/* Hero is above-fold — loaded eagerly */}
          <HeroSection />
          {/* Below-fold sections — lazy loaded */}
          <Suspense fallback={<div className="h-96" />}>
            <FeaturedServicesSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <FeaturedPortfolioSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <TestimonialsSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <ProcessSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <GuaranteesSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <FAQSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <AvailabilitySection />
          </Suspense>
          <Suspense fallback={<div className="h-32" />}>
            <CinematicStatement />
          </Suspense>
          <Suspense fallback={<div className="h-48" />}>
            <HomeCTASection />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  );
}