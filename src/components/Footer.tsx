'use client';

import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Main row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-8">
          {/* Left — Logo + tagline */}
          <div className="max-w-xs">
            <div className="flex items-center mb-2">
              <AppLogo
                src="/assets/images/Pneuma_Studio_Logo_Final_Draft_Sin_Fondo_-_copia-1779900651659.png"
                size={140}
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.tagline')}
            </p>
            <p className="label-tag text-primary mt-1">Monterrey, México</p>
          </div>

          {/* Center — Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { href: '/services', label: t('nav.services') },
              { href: '/portfolio', label: t('nav.portfolio') },
              { href: '/pricing', label: t('nav.pricing') },
              { href: '/about', label: t('nav.about') },
              { href: '/contact', label: t('nav.contact') },
            ]?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link?.label}
              </Link>
            ))}
          </div>

          {/* Right — Social + contact */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:pneumastudiomx@gmail.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              pneumastudiomx@gmail.com
            </a>
            <a
              href="https://wa.me/528112803360"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              +52 811 280 3360
            </a>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://instagram.com/pneumastudiomx"
                target="_blank"
                rel="noopener noreferrer"
                className="label-tag text-muted-foreground hover:text-primary transition-colors"
              >
                @pneumastudiomx
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5">
          <p className="text-xs text-muted-foreground text-center">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}