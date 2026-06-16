'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const CONSENT_KEY = 'ps_cookie_consent';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consented, setConsented] = useState(false);

  // Check consent on mount
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') setConsented(true);

    // Listen for consent granted via CookieBanner
    function onConsent(e: CustomEvent) {
      if (e.detail === 'accepted') setConsented(true);
    }
    window.addEventListener('ps:consent', onConsent as EventListener);
    return () => window.removeEventListener('ps:consent', onConsent as EventListener);
  }, []);

  // Track route changes
  useEffect(() => {
    if (!consented || !window.gtag) return;
    window.gtag('config', gaId, { page_path: pathname });
  }, [pathname, searchParams, consented, gaId]);

  if (!consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
