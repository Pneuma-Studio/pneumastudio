'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, lang } = useLanguage();

  const navLinks = [
    { href: '/services', label: t('nav.services') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/partners', label: t('nav.partners') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/contact#faq', label: lang === 'es' ? 'FAQ' : 'FAQ' },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: '#050D1A' }}>
      {/* Top separator */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,196,160,0.4), transparent)' }}
      />
      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          bottom: '-180px',
          left: '-120px',
          background: 'radial-gradient(circle, rgba(0,196,160,0.07) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 360,
          height: 360,
          bottom: '-100px',
          right: '-80px',
          background: 'radial-gradient(circle, rgba(30,64,175,0.06) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Left â€” Brand */}
          <div className="flex flex-col justify-center">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity duration-200">
              <Image src="/assets/images/pneuma-studio-logo.png" alt="Pneuma Studio" width={150} height={100} className="object-contain" />
            </Link>
          </div>

          {/* Center â€” Navigation */}
          <div>
            <p className="label-tag text-muted-foreground mb-5">
              {lang === 'es' ? 'NAVEGACIÓN' : 'NAVIGATION'}
            </p>
            <div className="flex flex-col gap-2.5">
              {navLinks?.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  className="text-sm font-500 transition-colors duration-200 w-fit"
                  style={{ color: '#8A9BB5' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#00C4A0')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#8A9BB5')}
                >
                  {link?.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right â€” Contact */}
          <div className="flex flex-col">
            <p className="label-tag text-muted-foreground mb-5">CONTACT</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:pneumastudiomx@gmail.com"
                className="group flex items-center gap-2.5 text-sm transition-colors duration-200"
                style={{ color: '#8A9BB5' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00C4A0')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8A9BB5')}
              >
                <span
                  className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,196,160,0.1)', border: '1px solid rgba(0,196,160,0.15)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="#00C4A0" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                pneumastudiomx@gmail.com
              </a>

              <a
                href="https://wa.me/528112803360"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm transition-colors duration-200"
                style={{ color: '#8A9BB5' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00C4A0')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8A9BB5')}
              >
                <span
                  className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,196,160,0.1)', border: '1px solid rgba(0,196,160,0.15)' }}
                >
                  <svg viewBox="0 0 24 24" fill="#00C4A0" className="w-3 h-3">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                +52 811 280 3360
              </a>

              <a
                href="https://instagram.com/pneumastudiomx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm transition-colors duration-200"
                style={{ color: '#8A9BB5' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00C4A0')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8A9BB5')}
              >
                <span
                  className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,196,160,0.1)', border: '1px solid rgba(0,196,160,0.15)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="#00C4A0" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </span>
                @pneumastudiomx
              </a>
            </div>

            {/* Tagline pushed to bottom of column */}
            <p
              className="text-sm leading-relaxed mt-auto pt-6 font-600"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.6) 50%, #00C4A0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('footer.tagline')}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(138,155,181,0.6)' }}>
            {t('footer.rights')}
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#00C4A0' }}
            />
            <span className="text-xs font-600" style={{ color: 'rgba(0,196,160,0.7)' }}>
              {lang === 'es' ? 'Construido en Monterrey, MX' : 'Built in Monterrey, MX'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

