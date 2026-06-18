import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import '../styles/tailwind.css';
import { LanguageProvider } from '@/context/LanguageContext';
import CookieBanner from '@/components/CookieBanner';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Suspense } from 'react';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pneumastudio.mx';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#organization`,
      name: 'Pneuma Studio',
      alternateName: 'Pneuma Studio MX',
      description:
        'Agencia de desarrollo web, ecommerce y automatización digital en Monterrey, Nuevo León. Creamos plataformas de comercio electrónico, automatización por WhatsApp y sistemas empresariales a medida.',
      url: siteUrl,
      telephone: '+52-811-280-3360',
      email: 'studio@pneumastudio.mx',
      priceRange: '$$$',
      currenciesAccepted: 'MXN, USD',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Monterrey',
        addressRegion: 'Nuevo León',
        postalCode: '64000',
        addressCountry: 'MX',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.6866,
        longitude: -100.3161,
      },
      areaServed: [
        { '@type': 'City', name: 'Monterrey' },
        { '@type': 'AdministrativeArea', name: 'Nuevo León' },
        { '@type': 'Country', name: 'México' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios Digitales Pneuma Studio',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Plataformas Ecommerce',
              description: 'Tiendas en línea personalizadas, optimizadas para conversión con gestión de catálogo completa.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Automatización WhatsApp',
              description: 'Comercio conversacional, flujos de soporte y notificaciones de pedidos por WhatsApp.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Sistemas Marketplace',
              description: 'Motores de comercio multi-vendedor y multi-categoría con sincronización en tiempo real.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'CRM Dashboards',
              description: 'Inteligencia de clientes centralizada en una vista unificada y accionable.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Inventario y POS',
              description: 'Sincronización de inventario en tiempo real en todos los canales y sucursales.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Sistemas de Citas',
              description: 'Reservas online, recordatorios automáticos y gestión completa de calendario.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Analytics de Negocio',
              description: 'Visualización de datos en tiempo real para decisiones más rápidas e inteligentes.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Flujos con Inteligencia Artificial',
              description: 'Automatización inteligente y optimización de procesos empresariales con IA.',
            },
          },
        ],
      },
      sameAs: [
        'https://www.instagram.com/pneumastudiomx',
        'https://wa.me/528112803360',
      ],
      foundingDate: '2024',
      knowsLanguage: ['es', 'en'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Pneuma Studio',
      description: 'Agencia digital en Monterrey — ecommerce, automatización WhatsApp y sistemas empresariales.',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'es-MX',
    },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pneuma Studio | Agencia Digital en Monterrey, Nuevo León',
    template: '%s | Pneuma Studio — Monterrey, MX',
  },
  description:
    'Pneuma Studio: agencia de ecommerce, automatización WhatsApp y sistemas empresariales en Monterrey, Nuevo León. Plataformas digitales construidas para escalar en México y EE.UU.',
  keywords: [
    // Local — Monterrey / Nuevo León
    'agencia digital Monterrey',
    'agencia web Monterrey',
    'desarrollo web Monterrey',
    'diseño web Monterrey',
    'agencia ecommerce Monterrey',
    'ecommerce Monterrey',
    'tienda en línea Monterrey',
    'tienda online Monterrey',
    'desarrollo de software Monterrey',
    'automatización WhatsApp Monterrey',
    'sistemas empresariales Monterrey',
    'agencia digital Nuevo León',
    'desarrollo web Nuevo León',
    'software a medida Monterrey',
    'agencia tecnología Monterrey',
    // Nacional — México
    'agencia digital México',
    'desarrollo web México',
    'agencia ecommerce México',
    'ecommerce México',
    'automatización WhatsApp negocios',
    'automatización WhatsApp México',
    'plataforma ecommerce personalizada México',
    'marketplace software México',
    'CRM personalizado México',
    'sistema de inventario México',
    'integraciones API México',
    'Mercado Libre automatización México',
    'sistema multi-sucursal México',
    'panel administrativo a medida',
    'analytics de negocio México',
    // Servicios específicos
    'plataformas ecommerce',
    'sistemas marketplace',
    'inventario y POS digital',
    'CRM dashboard personalizado',
    'sistema de citas online',
    'flujos de automatización con IA',
    'integraciones API negocios',
    // Marca
    'Pneuma Studio',
    'pneumastudiomx',
  ],
  authors: [{ name: 'Pneuma Studio', url: siteUrl }],
  creator: 'Pneuma Studio',
  publisher: 'Pneuma Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: 'en_US',
    url: siteUrl,
    siteName: 'Pneuma Studio',
    title: 'Pneuma Studio | Agencia Digital en Monterrey, México',
    description:
      'Ecommerce, automatización WhatsApp y sistemas empresariales construidos en Monterrey para negocios en México y EE.UU. Entrega en 3–5 semanas.',
    images: [
      {
        url: '/assets/images/pneuma-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'Pneuma Studio — Agencia Digital en Monterrey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pneuma Studio | Agencia Digital en Monterrey',
    description:
      'Ecommerce, automatización WhatsApp y sistemas empresariales — Monterrey, Nuevo León, México',
    images: ['/assets/images/pneuma-studio-logo.png'],
    creator: '@pneumastudiomx',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    shortcut: '/favicon.ico',
  },
  other: {
    'geo.region': 'MX-NL',
    'geo.placename': 'Monterrey, Nuevo León, México',
    'geo.position': '25.6866;-100.3161',
    'ICBM': '25.6866, -100.3161',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className={plusJakartaSans.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
        {gaId && gaId !== 'your-google-analytics-id-here' && (
          <Suspense fallback={null}>
            <GoogleAnalytics gaId={gaId} />
          </Suspense>
        )}
      </body>
    </html>
  );
}