'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ScrollAnimator from '@/components/ScrollAnimator';
import { useRouter } from 'next/navigation';

interface PartnerFormData {
  name: string;
  agency: string;
  email: string;
  phone: string;
  model: string;
  website: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  agency?: string;
}

export default function PartnerForm() {
  const { lang } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState<PartnerFormData>({
    name: '',
    agency: '',
    email: '',
    phone: '',
    model: '',
    website: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = lang === 'es' ? 'Nombre requerido' : 'Name required';
    }
    if (!formData.agency.trim()) {
      newErrors.agency = lang === 'es' ? 'Nombre de agencia requerido' : 'Agency name required';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = lang === 'es' ? 'Email válido requerido' : 'Valid email required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('send failed');
      router.push(`/confirmation?source=partner&email=${encodeURIComponent(formData.email)}`);
    } catch {
      setLoading(false);
      alert(lang === 'es' ? 'Error al enviar. Intenta por WhatsApp.' : 'Send failed. Try via WhatsApp.');
    }
  };

  const modelOptions = lang === 'es'
    ? ['Comisión (15%)', 'Mayoreo (–30%)', 'Aún no lo sé']
    : ['Commission (15%)', 'Wholesale (–30%)', "I'm not sure yet"];

  const steps = [
    {
      step: '01',
      title: lang === 'es' ? 'Revisamos tu perfil' : 'We review your profile',
      desc: lang === 'es' ? 'Analizamos tu agencia y el tipo de clientes que manejas.' : 'We analyze your agency and the type of clients you handle.',
      iconPath: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    },
    {
      step: '02',
      title: lang === 'es' ? 'Llamada de alineación' : 'Alignment call',
      desc: lang === 'es' ? 'Una llamada de 30 min para definir el modelo y los términos.' : 'A 30-min call to define the model and terms.',
      iconPath: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z',
    },
    {
      step: '03',
      title: lang === 'es' ? 'Acuerdo de confidencialidad' : 'Confidentiality agreement',
      desc: lang === 'es' ? 'Firmamos un NDA para proteger a ambas partes.' : 'We sign an NDA to protect both parties.',
      iconPath: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    },
    {
      step: '04',
      title: lang === 'es' ? 'Primer proyecto juntos' : 'First project together',
      desc: lang === 'es' ? 'Lanzamos el primer proyecto bajo tu marca.' : 'We launch the first project under your brand.',
      iconPath: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
    },
  ];

  return (
    <section id="partner-form" className="section-padding relative overflow-hidden" style={{ background: '#0A1628' }}>
      {/* Ambient orb */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Info */}
          <ScrollAnimator>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
                <span className="label-tag text-primary">
                  {lang === 'es' ? 'ÚNETE A LA RED' : 'JOIN THE NETWORK'}
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-800 text-white mb-4"
                style={{ letterSpacing: '-0.025em', lineHeight: 1.08 }}
              >
                {lang === 'es' ? 'Conviértete en Agencia Socia.' : 'Become an Agency Partner.'}
              </h2>
              <p className="text-sm leading-relaxed mb-10" style={{ color: '#8A9BB5' }}>
                {lang === 'es'
                  ? 'Completa el formulario y nos pondremos en contacto en menos de 24 horas para discutir cómo podemos trabajar juntos.'
                  : "Fill out the form and we'll get in touch within 24 hours to discuss how we can work together."}
              </p>

              {/* Steps */}
              <div className="flex flex-col gap-5">
                {steps.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,196,160,0.12)', border: '1px solid rgba(0,196,160,0.2)' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#00C4A0" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                      </svg>
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-[10px] font-700 px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(0,196,160,0.12)', color: '#00C4A0', letterSpacing: '0.05em' }}
                        >
                          {item.step}
                        </span>
                        <h4 className="text-sm font-700 text-white">{item.title}</h4>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: '#8A9BB5' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimator>

          {/* Right — Form */}
          <ScrollAnimator delay={150}>
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-20 h-px" style={{ background: 'linear-gradient(90deg, #00C4A0, transparent)' }} />
              <div className="absolute top-0 left-0 h-20 w-px" style={{ background: 'linear-gradient(180deg, #00C4A0, transparent)' }} />

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
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
                  <h3 className="text-xl font-800 text-white">
                    {lang === 'es' ? '¡Solicitud enviada!' : 'Application sent!'}
                  </h3>
                  <p className="text-sm" style={{ color: '#8A9BB5' }}>
                    {lang === 'es' ? 'Nos pondremos en contacto en menos de 24 horas.' : "We'll be in touch within 24 hours."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate suppressHydrationWarning>
                  <h3 className="text-base font-700 text-white mb-1">
                    {lang === 'es' ? 'Información de la Agencia' : 'Agency Information'}
                  </h3>

                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === 'es' ? 'Tu nombre completo *' : 'Your full name *'}
                      className={`w-full rounded-lg px-4 py-3 text-sm text-white placeholder-muted-foreground outline-none transition-all duration-200 ${errors.name ? 'border-red-500/50' : ''}`}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: errors.name ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="agency"
                      value={formData.agency}
                      onChange={handleChange}
                      placeholder={lang === 'es' ? 'Nombre de tu agencia *' : 'Your agency name *'}
                      className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-muted-foreground outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: errors.agency ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                    {errors.agency && <p className="text-red-400 text-xs mt-1">{errors.agency}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={lang === 'es' ? 'Correo electrónico *' : 'Email address *'}
                      className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-muted-foreground outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: errors.email ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={lang === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                    className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-muted-foreground outline-none transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />

                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder={lang === 'es' ? 'Sitio web de tu agencia' : 'Your agency website'}
                    className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-muted-foreground outline-none transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />

                  <select
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full rounded-lg px-4 py-3 text-sm text-white outline-none transition-all duration-200 appearance-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <option value="" style={{ background: '#0A1628', color: '#8A9BB5' }}>
                      {lang === 'es' ? 'Modelo de interés' : 'Model of interest'}
                    </option>
                    {modelOptions.map((opt) => (
                      <option key={opt} value={opt} style={{ background: '#0A1628', color: '#fff' }}>{opt}</option>
                    ))}
                  </select>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder={lang === 'es' ? 'Cuéntanos sobre tu agencia y los clientes que manejas' : 'Tell us about your agency and the clients you handle'}
                    className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-muted-foreground outline-none transition-all duration-200 resize-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3.5 text-sm font-700 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {lang === 'es' ? 'Enviando...' : 'Sending...'}
                      </>
                    ) : (
                      lang === 'es' ? 'Enviar Solicitud de Asociación' : 'Send Partnership Application'
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollAnimator>
        </div>
      </div>
    </section>
  );
}
