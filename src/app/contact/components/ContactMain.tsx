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
    // Backend integration point — connect to email service here
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

  return (
    <section className="pt-4 pb-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — Contact info */}
          <ScrollAnimator>
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-800 mb-2">
                {lang === 'es' ? 'Habla con nosotros' : 'Talk to us'}
              </h2>

              {/* WhatsApp */}
              <a
                href="https://wa.me/528112803360?text=Hola%20Nazre%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20Pneuma%20Studio"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-hover rounded-xl p-5 flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-700 text-sm">WhatsApp</p>
                  <p className="text-muted-foreground text-sm">+52 811 280 3360</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:pneumastudiomx@gmail.com"
                className="glass-card-hover rounded-xl p-5 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <EnvelopeIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-700 text-sm">Email</p>
                  <p className="text-muted-foreground text-sm">pneumastudiomx@gmail.com</p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+528112803360"
                className="glass-card-hover rounded-xl p-5 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <PhoneIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-700 text-sm">{lang === 'es' ? 'Teléfono' : 'Phone'}</p>
                  <p className="text-muted-foreground text-sm">+52 811 280 3360</p>
                </div>
              </a>

              {/* Social */}
              <div className="glass-card rounded-xl p-5">
                <p className="font-700 text-sm mb-1">Instagram</p>
                <a
                  href="https://instagram.com/pneumastudiomx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm hover:text-primary-light transition-colors"
                >
                  @pneumastudiomx
                </a>
              </div>

              {/* Schedule a call */}
              <a
                href="https://wa.me/528112803360?text=Hola%20Nazre%2C%20me%20gustar%C3%ADa%20agendar%20una%20llamada%20de%2030%20minutos%20con%20Pneuma%20Studio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center py-3.5"
              >
                📅 {lang === 'es' ? 'Agendar Llamada de 30 min' : 'Book a 30-min Call'}
              </a>

              {/* Response time note */}
              <p className="text-xs text-muted-foreground text-center">
                {lang === 'es' ?'✓ Respondemos en menos de 24 horas' :'✓ We respond within 24 hours'}
              </p>
            </div>
          </ScrollAnimator>

          {/* Right — Lead capture form */}
          <ScrollAnimator delay={100}>
            {submitted ? (
              <div className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-5">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-xl font-800 mb-3 text-primary">
                  {lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('contact.form.success')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-4" noValidate>
                <h3 className="font-800 text-lg mb-1">
                  {lang === 'es' ? 'Cuéntanos tu proyecto' : 'Tell us about your project'}
                </h3>

                {/* Name */}
                <div>
                  <label className="label-tag text-muted-foreground block mb-1.5">
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

                {/* Company */}
                <div>
                  <label className="label-tag text-muted-foreground block mb-1.5">
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

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-tag text-muted-foreground block mb-1.5">
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
                    <label className="label-tag text-muted-foreground block mb-1.5">
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

                {/* Service interest */}
                <div>
                  <label className="label-tag text-muted-foreground block mb-1.5">
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

                {/* Budget */}
                <div>
                  <label className="label-tag text-muted-foreground block mb-1.5">
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

                {/* Message */}
                <div>
                  <label className="label-tag text-muted-foreground block mb-1.5">
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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? (lang === 'es' ? 'Enviando...' : 'Sending...')
                    : t('contact.form.submit')}
                </button>
              </form>
            )}
          </ScrollAnimator>
        </div>
      </div>
    </section>
  );
}