import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import '../styles/tailwind.css';
import { LanguageProvider } from '@/context/LanguageContext';

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Pneuma Studio — Premium Digital Commerce & Automation',
  description: 'Pneuma Studio builds high-performance ecommerce platforms, WhatsApp automation, and custom digital systems for businesses in México and the USA.',
  keywords: ['agencia ecommerce Monterrey', 'desarrollo web Monterrey', 'automatización WhatsApp negocios', 'plataforma comercial digital México'],
  openGraph: {
    title: 'Pneuma Studio — We design systems. We build the future.',
    description: 'High-performance ecommerce platforms and WhatsApp automation built in 3–5 weeks.',
    type: 'website',
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pneuma Studio',
    description: 'Premium Digital Commerce & Automation Studio — Monterrey, México',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className={plusJakartaSans.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>

</body>
    </html>
  );
}