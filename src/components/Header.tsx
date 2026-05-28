'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useLanguage } from '@/context/LanguageContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const navLinks = [
    { href: '/services', label: t('nav.services') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/partners', label: t('nav.partners') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <AppLogo
              src="/assets/images/Pneuma_Studio_Logo_Final_Draft_Sin_Fondo_-_copia-1779900651659.png"
              size={140}
              className="transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks?.map((link) => (
              <Link key={link?.href} href={link?.href} className="nav-link font-medium text-sm">
                {link?.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="hidden sm:flex items-center gap-1 label-tag text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/20"
              aria-label="Toggle language"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            <Link href="/contact" className="hidden md:flex btn-primary text-sm py-2 px-4">
              {t('nav.cta')}
            </Link>

            {/* Mobile hamburger */}
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
        <div className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-white/5">
            <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <AppLogo
                src="/assets/images/Pneuma_Studio_Logo_Final_Draft_Sin_Fondo_-_copia-1779900651659.png"
                size={140}
              />
            </Link>
            <button
              className="p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col px-6 pt-8 gap-2 flex-1">
            {navLinks?.map((link, i) => (
              <Link
                key={link?.href}
                href={link?.href}
                className="text-2xl font-700 py-3 border-b border-white/5 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link?.label}
              </Link>
            ))}
            <div className="mt-6 flex items-center gap-3">
              <Link href="/contact" className="btn-primary flex-1 text-center" onClick={() => setMobileOpen(false)}>
                {t('nav.cta')}
              </Link>
              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="label-tag text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded border border-white/10"
              >
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
            </div>
          </nav>
          <div className="px-6 pb-8">
            <p className="label-tag text-muted-foreground">pneumastudiomx@gmail.com</p>
          </div>
        </div>
      )}
    </>
  );
}