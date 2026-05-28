'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactMain() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = lang === 'es' ? 'Nombre requerido' : 'Name required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = lang === 'es' ? 'Email válido requerido' : 'Valid email required';
    }
    if (!formData.message.trim()) newErrors.message = lang === 'es' ? 'Mensaje requerido' : 'Message required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push(`/confirmation?source=contact&email=${encodeURIComponent(formData.email)}`);
  };

  const serviceOptions = lang === 'es'
    ? ['Plataforma Ecommerce', 'Automatización WhatsApp', 'Paquete Completo', 'White-Label / Agencia', 'Otro']
    : ['Ecommerce Platform', 'WhatsApp Automation', 'Full Package', 'White-Label Partnership', 'Other'];

  const budgetOptions = lang === 'es'
    ? ['Menos de $25k MXN', '$25k–$75k MXN', '$75k–$180k MXN', '$180k+ MXN / Custom USD']
    : ['Under $25k MXN', '$25k–$75k MXN', '$75k–$180k MXN', '$180k+ MXN / Custom USD'];

  const contactCards = [
    {
      href: 'https://wa.me/528112803360?text=Hola%20Nazre%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Pneuma%20Studio',
      target: '_blank',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      iconBg: 'rgba(37,211,102,0.1)',
      label: 'WhatsApp',
      value: '+52 811 280 3360',
    },
    {
      href: 'mailto:pneumastudiomx@gmail.com',
      target: undefined,
      icon: <EnvelopeIcon className="w-5 h-5" style={{ color: '#00C4A0' }} />,
      iconBg: 'rgba(0,196,160,0.1)',
      label: 'Email',
      value: 'pneumastudiomx@gmail.com',
    },
    {
      href: 'tel:+528112803360',
      target: undefined,
      icon: <PhoneIcon className="w-5 h-5" style={{ color: '#00C4A0' }} />,
      iconBg: 'rgba(0,196,160,0.1)',
      label: lang === 'es' ? 'Teléfono' : 'Phone',
      value: '+52 811 280 3360',
    },
    {
      href: 'https://instagram.com/pneumastudiomx',
      target: '_blank',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C4A0" strokeWidth={1.5}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="#00C4A0" stroke="none" />
        </svg>
      ),
      iconBg: 'rgba(0,196,160,0.1)',
      label: 'Instagram',
      value: '@pneumastudiomx',
    },
  ];

  return (
    <section className="pt-4 pb-16 relative overflow-hidden" style={{ background: '#050D1A' }}>
      {/* Ambient orbs */}
      <div
        className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — Contact info */}
          <ScrollAnimator>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">
                  {lang === 'es' ? 'CONTACTO DIRECTO' : 'DIRECT CONTACT'}
                </span>
              </div>

              <h2
                className="text-2xl font-800 text-white mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                {lang === 'es' ? 'Habla con nosotros.' : 'Talk to us.'}
              </h2>

              {/* Contact cards */}
              {contactCards.map((card, i) => (
                <a
                  key={i}
                  href={card.href}
                  target={card.target}
                  rel={card.target ? 'noopener noreferrer' : undefined}
                  className="rounded-xl p-5 flex items-center gap-4 service-card"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: card.iconBg, border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <p className="font-700 text-sm text-white">{card.label}</p>
                    <p className="text-sm" style={{ color: '#8A9BB5' }}>{card.value}</p>
                  </div>
                  <div className="ml-auto">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#00C4A0" strokeWidth={1.5}>
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              ))}

              {/* CTA button */}
              <a
                href="https://wa.me/528112803360?text=Hola%20Nazre%2C%20me%20gustar%C3%ADa%20agendar%20una%20llamada%20de%2030%20minutos%20con%20Pneuma%20Studio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center py-3.5 mt-2 inline-flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {lang === 'es' ? 'Agendar Llamada de 30 min' : 'Book a 30-min Call'}
              </a>

              <p className="text-xs text-center" style={{ color: '#8A9BB5' }}>
                {lang === 'es' ? '✓ Respondemos en menos de 24 horas' : '✓ We respond within 24 hours'}
              </p>

              {/* Compact CTA cards */}
              <div className="grid grid-cols-3 gap-2 mt-1">
                {[
                  {
                    iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                    title: lang === 'es' ? 'Agendar Reunión' : 'Schedule Meeting',
                    href: 'https://wa.me/528112803360?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20reuni%C3%B3n%20con%20Pneuma%20Studio',
                    external: true,
                  },
                  {
                    iconPath: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
                    title: lang === 'es' ? 'Ser Agencia Socia' : 'Become Partner',
                    href: 'https://wa.me/528112803360?text=Hola%2C%20me%20interesa%20ser%20agencia%20socia%20de%20Pneuma%20Studio',
                    external: true,
                  },
                  {
                    iconPath: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
                    title: lang === 'es' ? 'Iniciar Proyecto' : 'Start Project',
                    href: '/contact',
                    external: false,
                  },
                ].map((card, i) => {
                  const cardClass = "rounded-xl p-3 flex flex-col items-center gap-2 text-center group service-card cursor-pointer";
                  const cardStyle = { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' };
                  const inner = (
                    <>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                        style={{ background: 'rgba(0,196,160,0.12)' }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="#00C4A0" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={card.iconPath} />
                        </svg>
                      </div>
                      <span className="text-xs font-600 text-white leading-tight">{card.title}</span>
                    </>
                  );
                  return card.external ? (
                    <a key={i} href={card.href} target="_blank" rel="noopener noreferrer" className={cardClass} style={cardStyle}>
                      {inner}
                    </a>
                  ) : (
                    <a key={i} href={card.href} className={cardClass} style={cardStyle}>
                      {inner}
                    </a>
                  );
                })}
              </div>

              {/* Tagline below CTA cards — centered */}
              <div className="mt-3 relative flex flex-col items-center text-center">
                <p
                  className="text-base font-700 text-white"
                >
                  {lang === 'es' ?'Diseñamos sistemas. Construimos el futuro.' :'We design systems. We build the future.'}
                </p>
              </div>
            </div>
          </ScrollAnimator>

          {/* Right — Lead capture form */}
          <ScrollAnimator delay={100}>
            {submitted ? (
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[400px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(0,196,160,0.1)',
                    border: '1px solid rgba(0,196,160,0.3)',
                    boxShadow: '0 0 30px rgba(0,196,160,0.15)',
                  }}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#00C4A0" strokeWidth={2}>
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-800 mb-3" style={{ color: '#00C4A0' }}>
                  {lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A9BB5' }}>
                  {t('contact.form.success')}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 sm:p-8 flex flex-col gap-4 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
                noValidate
              >
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-20 h-px" style={{ background: 'linear-gradient(90deg, #00C4A0, transparent)' }} />
                <div className="absolute top-0 left-0 h-20 w-px" style={{ background: 'linear-gradient(180deg, #00C4A0, transparent)' }} />

                <h3 className="font-800 text-lg text-white mb-1">
                  {lang === 'es' ? 'Cuéntanos tu proyecto' : 'Tell us about your project'}
                </h3>

                <div>
                  <label className="label-tag block mb-1.5" style={{ color: '#8A9BB5' }}>
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    className={`input-field ${errors.name ? 'border-red-500/60' : ''}`}
                    placeholder={lang === 'es' ? 'Ej: Carlos Martínez' : 'E.g. John Smith'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="label-tag block mb-1.5" style={{ color: '#8A9BB5' }}>
                    {t('contact.form.company')}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={lang === 'es' ? 'Ej: Distribuidora Noreste' : 'E.g. Acme Corp'}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-tag block mb-1.5" style={{ color: '#8A9BB5' }}>
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      className={`input-field ${errors.email ? 'border-red-500/60' : ''}`}
                      placeholder="correo@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="label-tag block mb-1.5" style={{ color: '#8A9BB5' }}>
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      className="input-field"
                      placeholder="+52 81 XXXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="label-tag block mb-1.5" style={{ color: '#8A9BB5' }}>
                    {t('contact.form.service')}
                  </label>
                  <select
                    className="input-field"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="">{lang === 'es' ? 'Selecciona una opción' : 'Select an option'}</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-tag block mb-1.5" style={{ color: '#8A9BB5' }}>
                    {t('contact.form.budget')}
                  </label>
                  <select
                    className="input-field"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="">{lang === 'es' ? 'Selecciona rango' : 'Select range'}</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-tag block mb-1.5" style={{ color: '#8A9BB5' }}>
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    className={`input-field resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                    rows={4}
                    placeholder={
                      lang === 'es' ?'Describe brevemente tu negocio y lo que necesitas...' :'Briefly describe your business and what you need...'
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (lang === 'es' ? 'Enviando...' : 'Sending...') : t('contact.form.submit')}
                </button>
              </form>
            )}
          </ScrollAnimator>
        </div>
      </div>
    </section>
  );
}
