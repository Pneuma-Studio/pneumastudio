'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Nav
    'nav.services': 'Servicios',
    'nav.portfolio': 'Portafolio',
    'nav.pricing': 'Precios',
    'nav.partners': 'White-Label',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.blog': 'Blog',
    'nav.cta': 'Iniciar Proyecto',
    // Hero
    'hero.label': 'PREMIUM DIGITAL COMMERCE STUDIO',
    'hero.h1.line1': 'Diseñamos sistemas.',
    'hero.h1.line2': 'Construimos el futuro.',
    'hero.sub': 'Plataformas ecommerce de alto rendimiento, automatización WhatsApp y ecosistemas digitales comerciales — para empresas establecidas en cualquier parte del mundo, listas para escalar.',
    'hero.cta.primary': 'Agendar una Llamada',
    'hero.cta.secondary': 'Ver Nuestro Trabajo',
    'hero.stat1.num': '12+',
    'hero.stat1.label': 'Proyectos Entregados',
    'hero.stat2.num': '5',
    'hero.stat2.label': 'Industrias Atendidas',
    'hero.stat3.num': '3–5 sem',
    'hero.stat3.label': 'Entrega Promedio',
    // Services
    'services.title': 'Soluciones Digitales Construidas para Escalar',
    'services.sub': 'Cada sistema que construimos está diseñado con arquitectura de producción, no prototipos.',
    // Portfolio
    'portfolio.title': 'Resultados, No Promesas',
    'portfolio.sub': 'Cada proyecto es una prueba de que los sistemas correctos transforman negocios.',
    'portfolio.filter.all': 'Todos',
    'portfolio.view': 'Ver Caso de Estudio',
    // Pricing
    'pricing.title': 'Precios Transparentes. Sin Sorpresas.',
    'pricing.sub': 'Elige el paquete que se adapta a tu etapa de crecimiento.',
    'pricing.popular': 'Más Popular',
    'pricing.initial': 'Inicial',
    'pricing.monthly': 'mes',
    'pricing.cta': 'Comenzar con',
    'pricing.addons': 'Módulos Adicionales',
    'pricing.note': 'El mantenimiento se cobra únicamente los meses en que se soliciten cambios.',
    // About
    'about.title': 'Construido para Rendimiento. Diseñado para Escalar.',
    'about.tagline': 'Más que desarrolladores. Arquitectos.',
    'about.founder.title': 'Fundador',
    // Contact
    'contact.title': 'Construyamos la Próxima Generación de Negocios Digitales.',
    'contact.sub': 'Cuéntanos sobre tu proyecto. Respondemos en menos de 24 horas.',
    'contact.form.name': 'Nombre completo',
    'contact.form.company': 'Empresa / Negocio',
    'contact.form.email': 'Correo electrónico',
    'contact.form.phone': 'Teléfono / WhatsApp',
    'contact.form.service': 'Servicio de interés',
    'contact.form.budget': 'Rango de presupuesto',
    'contact.form.message': 'Cuéntanos sobre tu proyecto',
    'contact.form.submit': 'Enviar Mensaje',
    'contact.form.success': 'Te contactaremos en menos de 24 horas.',
    // Footer
    'footer.tagline': 'Diseñamos sistemas. Construimos el futuro.',
    'footer.rights': '© 2026 Pneuma Studio · Todos los derechos reservados.',
  },
  en: {
    // Nav
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.pricing': 'Pricing',
    'nav.partners': 'White-Label',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'nav.cta': 'Start a Project',
    // Hero
    'hero.label': 'PREMIUM DIGITAL COMMERCE STUDIO',
    'hero.h1.line1': 'We design systems.',
    'hero.h1.line2': 'We build the future.',
    'hero.sub': 'High-performance ecommerce platforms, WhatsApp automation, and commercial digital ecosystems — for established businesses anywhere in the world, ready to scale.',
    'hero.cta.primary': 'Schedule a Call',
    'hero.cta.secondary': 'View Our Work',
    'hero.stat1.num': '12+',
    'hero.stat1.label': 'Projects Delivered',
    'hero.stat2.num': '5',
    'hero.stat2.label': 'Industries Served',
    'hero.stat3.num': '3–5 wks',
    'hero.stat3.label': 'Average Delivery',
    // Services
    'services.title': 'Digital Solutions Built for Scale',
    'services.sub': 'Every system we build is designed with production architecture, not prototypes.',
    // Portfolio
    'portfolio.title': 'Results, Not Promises',
    'portfolio.sub': 'Every project is proof that the right systems transform businesses.',
    'portfolio.filter.all': 'All',
    'portfolio.view': 'View Case Study',
    // Pricing
    'pricing.title': 'Transparent Pricing. No Surprises.',
    'pricing.sub': 'Choose the package that fits your growth stage.',
    'pricing.popular': 'Most Popular',
    'pricing.initial': 'Initial',
    'pricing.monthly': 'mo',
    'pricing.cta': 'Start with',
    'pricing.addons': 'Add-on Modules',
    'pricing.note': 'Maintenance is charged only in months when changes are requested.',
    // About
    'about.title': 'Built for Performance. Engineered to Scale.',
    'about.tagline': 'More than developers. Architects.',
    'about.founder.title': 'Founder',
    // Contact
    'contact.title': "Let's Build the Next Generation of Digital Businesses.",
    'contact.sub': 'Tell us about your project. We respond within 24 hours.',
    'contact.form.name': 'Full name',
    'contact.form.company': 'Company / Business',
    'contact.form.email': 'Email address',
    'contact.form.phone': 'Phone / WhatsApp',
    'contact.form.service': 'Service interest',
    'contact.form.budget': 'Budget range',
    'contact.form.message': 'Tell us about your project',
    'contact.form.submit': 'Send Message',
    'contact.form.success': "We'll be in touch within 24 hours.",
    // Footer
    'footer.tagline': 'We design systems. We build the future.',
    'footer.rights': '© 2026 Pneuma Studio · All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[lang][key] || translations['es'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}