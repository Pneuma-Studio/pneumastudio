import React, { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PartnersHero from './components/PartnersHero';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pneumastudio.mx';

export const metadata = {
  title: 'Partners — Programa de Socios y Agencias',
  description:
    'Únete al programa de socios de Pneuma Studio. Refiere clientes o colabora en proyectos digitales y genera ingresos recurrentes. Monterrey, México.',
  keywords: [
    'programa de socios agencia digital México',
    'partners desarrollo web Monterrey',
    'referidos agencia ecommerce',
    'colaboración agencia digital México',
    'ingresos recurrentes desarrollo web',
  ],
  alternates: { canonical: `${siteUrl}/partners` },
  openGraph: {
    title: 'Partners — Programa de Socios | Pneuma Studio',
    description:
      'Refiere negocios o co-desarrolla proyectos digitales con Pneuma Studio y genera ingresos recurrentes. Monterrey, Nuevo León.',
    url: `${siteUrl}/partners`,
  },
};
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
