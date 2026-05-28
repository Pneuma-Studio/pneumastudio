'use client';

import React, { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PartnersHero from './components/PartnersHero';
import dynamic from 'next/dynamic';

// Lazy-load below-fold partner sections
const PartnersFlowDiagram = dynamic(() => import('./components/PartnersFlowDiagram'), { ssr: true });
const PartnerBenefits = dynamic(() => import('./components/PartnerBenefits'), { ssr: true });
const PartnershipModels = dynamic(() => import('./components/PartnershipModels'), { ssr: true });
const PartnerForm = dynamic(() => import('./components/PartnerForm'), { ssr: true });

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PartnersHero />
      <Suspense fallback={<div className="h-64" />}>
        <PartnersFlowDiagram />
      </Suspense>
      <Suspense fallback={<div className="h-64" />}>
        <PartnerBenefits />
      </Suspense>
      <Suspense fallback={<div className="h-64" />}>
        <PartnershipModels />
      </Suspense>
      <Suspense fallback={<div className="h-96" />}>
        <PartnerForm />
      </Suspense>
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
