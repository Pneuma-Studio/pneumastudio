'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const navLinks = [
    { href: '/services', label: t('nav.services') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/partners', label: t('nav.partners') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
        style={{ borderColor: scrolled ? 'rgba(255,255,255,0.06)' : 'transparent' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group transition-opacity duration-200 hover:opacity-80">
            <Image src="/assets/images/pneuma-studio-icon.png" alt="Pneuma Studio" width={80} height={70} className="object-contain flex-shrink-0" priority />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-500 transition-colors duration-200"
                style={{ color: isActive(link.href) ? '#FFFFFF' : '#8A9BB5' }}
                onMouseEnter={(e) => { if (!isActive(link.href)) e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { if (!isActive(link.href)) e.currentTarget.style.color = '#8A9BB5'; }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#00C4A0', boxShadow: '0 0 6px rgba(0,196,160,0.8)' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="hidden sm:flex items-center gap-1 label-tag text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              aria-label="Toggle language"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            <Link
              href="/contact"
              className="hidden md:flex btn-primary text-sm py-2 px-4"
              style={{ boxShadow: '0 0 16px rgba(0,196,160,0.2)' }}
            >
              {t('nav.cta')}
            </Link>

            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] backdrop-blur-xl flex flex-col" style={{ background: 'rgba(5,13,26,0.98)' }}>
          {/* Top gradient border */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(0,196,160,0.4), transparent)' }}
          />
          <div
            className="flex items-center justify-between px-4 h-16"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <Image src="/assets/images/pneuma-studio-icon.png" alt="Pneuma Studio" width={68} height={60} className="object-contain flex-shrink-0" priority />
            </Link>
            <button
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col px-6 pt-8 gap-1 flex-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-700 py-3 transition-colors"
                style={{
                  color: isActive(link.href) ? '#00C4A0' : '#FFFFFF',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transitionDelay: `${i * 40}ms`,
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/contact"
                className="btn-primary flex-1 text-center"
                onClick={() => setMobileOpen(false)}
              >
                {t('nav.cta')}
              </Link>
              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="label-tag text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
            </div>
          </nav>

          <div className="px-6 pb-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00C4A0' }} />
              <p className="label-tag" style={{ color: 'rgba(0,196,160,0.7)' }}>pneumastudiomx@gmail.com</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

