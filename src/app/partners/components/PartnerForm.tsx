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
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push(`/confirmation?source=partner&email=${encodeURIComponent(formData.email)}`);
  };

  const modelOptions = lang === 'es'
    ? ['Comisión (15%)', 'Mayoreo (–30%)', 'Aún no lo sé']
    : ['Commission (15%)', 'Wholesale (–30%)', "I'm not sure yet"];

  return (
    <section id="partner-form" className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Info */}
          <ScrollAnimator>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-8 bg-primary rounded-full" />
                <span className="label-tag text-primary">
                  {lang === 'es' ? 'ÚNETE A LA RED' : 'JOIN THE NETWORK'}
                </span>
              </div>
              <h2 className="text-display font-800 text-foreground mb-4" style={{ letterSpacing: '-0.025em' }}>
                {lang === 'es' ? 'Conviértete en Agencia Socia.' : 'Become an Agency Partner.'}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {lang === 'es' ?'Completa el formulario y nos pondremos en contacto en menos de 24 horas para discutir cómo podemos trabajar juntos.'
                  : "Fill out the form and we'll get in touch within 24 hours to discuss how we can work together."}
              </p>

              {/* What happens next */}
              <div className="flex flex-col gap-4">
                {[
                  {
                    step: '01',
                    title: lang === 'es' ? 'Revisamos tu perfil' : 'We review your profile',
                    desc: lang === 'es' ? 'Analizamos tu agencia y el tipo de clientes que manejas.' : 'We analyze your agency and the type of clients you handle.',
                  },
                  {
                    step: '02',
                    title: lang === 'es' ? 'Llamada de alineación' : 'Alignment call',
                    desc: lang === 'es' ? 'Una llamada de 30 min para definir el modelo y los términos.' : 'A 30-min call to define the model and terms.',
                  },
                  {
                    step: '03',
                    title: lang === 'es' ? 'Acuerdo de confidencialidad' : 'Confidentiality agreement',
                    desc: lang === 'es' ? 'Firmamos un NDA para proteger a ambas partes.' : 'We sign an NDA to protect both parties.',
                  },
                  {
                    step: '04',
                    title: lang === 'es' ? 'Primer proyecto juntos' : 'First project together',
                    desc: lang === 'es' ? 'Lanzamos el primer proyecto bajo tu marca.' : 'We launch the first project under your brand.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="label-tag text-primary text-[10px]">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-700 text-foreground mb-0.5">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimator>

          {/* Right — Form */}
          <ScrollAnimator delay={150}>
            <div className="glass-card rounded-2xl p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-800 text-foreground">
                    {lang === 'es' ? '¡Solicitud enviada!' : 'Application sent!'}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {lang === 'es' ?'Nos pondremos en contacto en menos de 24 horas.' : "We'll be in touch within 24 hours."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate suppressHydrationWarning>
                  <h3 className="text-base font-700 text-foreground mb-1">
                    {lang === 'es' ? 'Información de la Agencia' : 'Agency Information'}
                  </h3>

                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === 'es' ? 'Tu nombre completo *' : 'Your full name *'}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:bg-white/8 ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Agency */}
                  <div>
                    <input
                      type="text"
                      name="agency"
                      value={formData.agency}
                      onChange={handleChange}
                      placeholder={lang === 'es' ? 'Nombre de tu agencia *' : 'Your agency name *'}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:bg-white/8 ${errors.agency ? 'border-red-500/50' : 'border-white/10'}`}
                    />
                    {errors.agency && <p className="text-red-400 text-xs mt-1">{errors.agency}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={lang === 'es' ? 'Correo electrónico *' : 'Email address *'}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:bg-white/8 ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={lang === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:bg-white/8"
                  />

                  {/* Website */}
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder={lang === 'es' ? 'Sitio web de tu agencia' : 'Your agency website'}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:bg-white/8"
                  />

                  {/* Model */}
                  <select
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:bg-white/8 appearance-none"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <option value="" className="bg-background text-muted-foreground">
                      {lang === 'es' ? 'Modelo de interés' : 'Model of interest'}
                    </option>
                    {modelOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>
                    ))}
                  </select>

                  {/* Message */}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder={lang === 'es' ? 'Cuéntanos sobre tu agencia y los clientes que manejas' : 'Tell us about your agency and the clients you handle'}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:bg-white/8 resize-none"
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
