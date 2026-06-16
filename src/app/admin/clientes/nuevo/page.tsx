'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PAQUETES = ['Starter', 'Esencial', 'Profesional', 'Premium', 'Enterprise', 'Personalizado'];
const ADDONS = ['WhatsApp Avanzado', 'Mercado Libre', 'SEO Avanzado', 'Soporte Priority'];
const MONEDAS = ['MXN', 'USD'];
const DIAS_COBRO = ['1', '5', '10', '15', '20'];
const ESTADOS = ['Activo', 'Pausado', 'Cancelado', 'Moroso'];
const METODOS_PAGO = ['Transferencia SPEI', 'Efectivo', 'Stripe', 'Otro'];
const PASARELAS_PAGO = ['Stripe', 'Conekta', 'Mercado Pago', 'Clip', 'Otra', 'No aplica'];
const PASARELA_CON_ID = ['Stripe', 'Conekta', 'Mercado Pago', 'Clip'];
const PASARELA_LABEL: Record<string, string> = {
  'Stripe': 'Stripe Customer ID',
  'Conekta': 'Conekta Customer ID',
  'Mercado Pago': 'Mercado Pago Customer ID',
  'Clip': 'Clip Merchant ID',
};
const TIPOS_PAGO = ['Anticipo', 'Abono', 'Saldo Final', 'Mantenimiento', 'Add-on'];

function Field({ label, children, required, hint }: { label: string; children: React.ReactNode; required?: boolean; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: '#8A9BB5' }}>
        {label}{required && <span style={{ color: '#EF4444' }}> *</span>}
        {hint && <span className="ml-1 text-xs font-normal" style={{ color: 'rgba(138,155,181,0.6)' }}>{hint}</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#FFFFFF',
};

interface PlanItem {
  tipo: string;
  porcentaje: string;
  fecha: string;
}

function fmtDate(d: string) {
  if (!d) return d;
  const [y, m, day] = d.split('-');
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${day}/${months[parseInt(m)-1]}/${y}`;
}

function fmt(n: number) {
  return n.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function NuevoClientePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{
    nombre: string;
    planPago: Array<{ tipo: string; monto: number; fecha: string }>;
    moneda: string;
  } | null>(null);

  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    email: '',
    whatsapp: '',
    paquete: 'Esencial',
    addons: [] as string[],
    moneda: 'MXN',
    inversionInicial: '',
    mensualidad: '',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaCobro: '1',
    estado: 'Activo',
    metodoPago: 'Transferencia SPEI',
    pasarelaPago: 'No aplica',
    stripeCustomerId: '',
    notas: '',
    empresaDescripcion: '',
    empresaGiro: '',
    empresaSitioWeb: '',
  });

  const [planPago, setPlanPago] = useState<PlanItem[]>([
    { tipo: 'Anticipo', porcentaje: '50', fecha: new Date().toISOString().split('T')[0] },
  ]);

  // Keep first plan item date in sync with fechaInicio
  useEffect(() => {
    if (planPago.length > 0 && planPago[0].fecha === '') {
      setPlanPago(prev => prev.map((item, i) => i === 0 ? { ...item, fecha: form.fechaInicio } : item));
    }
  }, [form.fechaInicio]);

  function set(key: string, value: any) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function toggleAddon(addon: string) {
    setForm(f => ({
      ...f,
      addons: f.addons.includes(addon) ? f.addons.filter(a => a !== addon) : [...f.addons, addon],
    }));
  }

  function addPlanItem() {
    setPlanPago(prev => [...prev, { tipo: 'Saldo Final', porcentaje: '', fecha: form.fechaInicio }]);
  }

  function removePlanItem(i: number) {
    setPlanPago(prev => prev.filter((_, idx) => idx !== i));
  }

  function updatePlanItem(i: number, field: keyof PlanItem, value: string) {
    setPlanPago(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  }

  const inversionNum = parseFloat(form.inversionInicial) || 0;
  const totalPct = planPago.reduce((s, item) => s + (parseFloat(item.porcentaje) || 0), 0);
  const pctOk = planPago.length === 0 || Math.abs(totalPct - 100) < 0.01;

  function getPlanMontos(): Array<{ tipo: string; monto: number; fecha: string }> {
    return planPago
      .filter(item => (parseFloat(item.porcentaje) || 0) > 0 && item.fecha)
      .map(item => ({
        tipo: item.tipo,
        monto: Math.round(((parseFloat(item.porcentaje) || 0) / 100) * inversionNum),
        fecha: item.fecha,
      }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (planPago.length > 0 && !pctOk) {
      setError(`El plan de cobro suma ${totalPct}% — debe sumar exactamente 100%`);
      return;
    }

    setLoading(true);
    try {
      const planMontos = getPlanMontos();
      const res = await fetch('/api/admin/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          inversionInicial: inversionNum,
          mensualidad: parseFloat(form.mensualidad) || 0,
          planPago: planMontos.length > 0 ? planMontos : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al registrar cliente');
      }

      setSuccess({ nombre: form.nombre, planPago: getPlanMontos(), moneda: form.moneda });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center space-y-6">
        <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(34,197,94,0.15)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">¡Cliente registrado!</h2>
          <p className="text-sm mb-4" style={{ color: '#8A9BB5' }}>
            <strong className="text-white">{success.nombre}</strong> fue registrado exitosamente en Notion.
          </p>
          {success.planPago.length > 0 && (
            <div className="rounded-xl p-4 text-left mb-4 space-y-2" style={{ background: 'rgba(0,196,160,0.06)', border: '1px solid rgba(0,196,160,0.2)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#00C4A0' }}>Pagos generados:</p>
              {success.planPago.map((p, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span style={{ color: '#8A9BB5' }}>{p.tipo}</span>
                  <span className="font-semibold text-white">
                    ${fmt(p.monto)} {success.moneda} · {fmtDate(p.fecha)}
                  </span>
                </div>
              ))}
            </div>
          )}
          {form.pasarelaPago !== 'No aplica' && form.pasarelaPago !== 'Otra' && !form.stripeCustomerId && (
            <div className="rounded-xl px-4 py-3 text-sm mb-4" style={{ background: 'rgba(103,114,229,0.1)', border: '1px solid rgba(103,114,229,0.2)', color: '#6772E5' }}>
              Recuerda configurar el cliente en <strong>{form.pasarelaPago}</strong> y actualizar el ID en su perfil.
            </div>
          )}
          <div className="flex gap-3 justify-center">
            <button onClick={() => router.push('/admin/dashboard')} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: '#00C4A0', color: '#050D1A' }}>
              Ver dashboard
            </button>
            <button
              onClick={() => {
                setSuccess(null);
                setForm(f => ({ ...f, nombre: '', empresa: '', email: '', whatsapp: '', empresaDescripcion: '', empresaGiro: '', empresaSitioWeb: '' }));
                setPlanPago([{ tipo: 'Anticipo', porcentaje: '50', fecha: new Date().toISOString().split('T')[0] }]);
              }}
              className="px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}
            >
              Registrar otro
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Nuevo cliente</h1>
        <p className="text-sm mt-1" style={{ color: '#8A9BB5' }}>Registra un nuevo cliente en Notion</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos básicos */}
        <section className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-sm font-semibold text-white">Datos del cliente</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nombre" required>
              <input required value={form.nombre} onChange={e => set('nombre', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="Nombre completo" />
            </Field>
            <Field label="Empresa">
              <input value={form.empresa} onChange={e => set('empresa', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="Nombre de empresa" />
            </Field>
            <Field label="Email" required>
              <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="email@empresa.com" />
            </Field>
            <Field label="WhatsApp">
              <input value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="+52 81 1234 5678" />
            </Field>
          </div>
        </section>

        {/* Empresa info */}
        <section className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-sm font-semibold text-white">Información de la empresa <span className="text-xs font-normal" style={{ color: '#8A9BB5' }}>(opcional)</span></h2>
          <Field label="Descripción">
            <textarea value={form.empresaDescripcion} onChange={e => set('empresaDescripcion', e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={inputStyle} placeholder="¿A qué se dedica la empresa?" />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Giro">
              <input value={form.empresaGiro} onChange={e => set('empresaGiro', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="ej. Moda y belleza" />
            </Field>
            <Field label="Sitio Web">
              <input type="url" value={form.empresaSitioWeb} onChange={e => set('empresaSitioWeb', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="https://empresa.com" />
            </Field>
          </div>
        </section>

        {/* Paquete y add-ons */}
        <section className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-sm font-semibold text-white">Paquete y servicios</h2>
          <Field label="Paquete" required>
            <select value={form.paquete} onChange={e => set('paquete', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
              {PAQUETES.map(p => <option key={p} value={p} style={{ background: '#0A1628' }}>{p}</option>)}
            </select>
          </Field>
          <Field label="Add-ons">
            <div className="flex flex-wrap gap-2 mt-1">
              {ADDONS.map(a => (
                <button key={a} type="button" onClick={() => toggleAddon(a)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: form.addons.includes(a) ? 'rgba(0,196,160,0.15)' : 'rgba(255,255,255,0.06)', border: form.addons.includes(a) ? '1px solid rgba(0,196,160,0.3)' : '1px solid rgba(255,255,255,0.08)', color: form.addons.includes(a) ? '#00C4A0' : '#8A9BB5' }}>
                  {a}
                </button>
              ))}
            </div>
          </Field>
        </section>

        {/* Financiero */}
        <section className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-sm font-semibold text-white">Información financiera</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Moneda">
              <select value={form.moneda} onChange={e => set('moneda', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                {MONEDAS.map(m => <option key={m} value={m} style={{ background: '#0A1628' }}>{m}</option>)}
              </select>
            </Field>
            <Field label="Inversión inicial" hint="(monto total del proyecto)">
              <input type="number" min="0" value={form.inversionInicial} onChange={e => set('inversionInicial', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="0" />
            </Field>
            <Field label="Mensualidad" required>
              <input required type="number" min="0" value={form.mensualidad} onChange={e => set('mensualidad', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="0" />
            </Field>
            <Field label="Día de cobro mensual">
              <select value={form.fechaCobro} onChange={e => set('fechaCobro', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                {DIAS_COBRO.map(d => <option key={d} value={d} style={{ background: '#0A1628' }}>Día {d}</option>)}
              </select>
            </Field>
            <Field label="Fecha de inicio">
              <input type="date" value={form.fechaInicio} onChange={e => set('fechaInicio', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
            </Field>
            <Field label="Método de pago" hint="¿Cómo te paga el cliente a ti?">
              <select value={form.metodoPago} onChange={e => set('metodoPago', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                {METODOS_PAGO.map(m => <option key={m} value={m} style={{ background: '#0A1628' }}>{m}</option>)}
              </select>
            </Field>
            <Field label="Pasarela de pago" hint="¿Cuál usa en su tienda?">
              <select value={form.pasarelaPago} onChange={e => set('pasarelaPago', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                {PASARELAS_PAGO.map(p => <option key={p} value={p} style={{ background: '#0A1628' }}>{p}</option>)}
              </select>
            </Field>
          </div>
          {PASARELA_CON_ID.includes(form.pasarelaPago) && (
            <Field label={PASARELA_LABEL[form.pasarelaPago] ?? 'ID en la pasarela'}>
              <input value={form.stripeCustomerId} onChange={e => set('stripeCustomerId', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="ID del cliente en la pasarela" />
            </Field>
          )}
        </section>

        {/* Plan de cobro inicial */}
        <section className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Plan de cobro inicial</h2>
              <p className="text-xs mt-0.5" style={{ color: '#8A9BB5' }}>
                {inversionNum > 0 ? `Define cómo se dividen los $${fmt(inversionNum)} ${form.moneda} del proyecto` : 'Ingresa la inversión inicial para configurar el plan de cobro'}
              </p>
            </div>
            {inversionNum > 0 && planPago.length > 0 && (
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: pctOk ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', color: pctOk ? '#22C55E' : '#EF4444' }}>
                {totalPct}% de 100%
              </span>
            )}
          </div>

          {inversionNum === 0 ? (
            <div className="flex items-center gap-2 text-sm py-2" style={{ color: 'rgba(138,155,181,0.5)' }}>
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth={1.2}/><path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round"/></svg>
              Llena el campo "Inversión inicial" arriba para habilitar el plan de cobro.
            </div>
          ) : planPago.length === 0 ? (
            <p className="text-sm" style={{ color: 'rgba(138,155,181,0.5)' }}>Sin plan definido — se generará un anticipo del 50% al guardar.</p>
          ) : (
              <div className="space-y-2">
                {/* Headers */}
                <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-medium px-1" style={{ color: '#8A9BB5' }}>
                  <div className="col-span-4">Tipo</div>
                  <div className="col-span-2">%</div>
                  <div className="col-span-3">Monto</div>
                  <div className="col-span-3">Fecha</div>
                </div>

                {planPago.map((item, i) => {
                  const monto = Math.round(((parseFloat(item.porcentaje) || 0) / 100) * inversionNum);
                  return (
                    <div key={i} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-12 sm:col-span-4">
                        <select
                          value={item.tipo}
                          onChange={e => updatePlanItem(i, 'tipo', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                          style={inputStyle}
                        >
                          {TIPOS_PAGO.map(t => <option key={t} value={t} style={{ background: '#0A1628' }}>{t}</option>)}
                        </select>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={item.porcentaje}
                            onChange={e => updatePlanItem(i, 'porcentaje', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl text-sm outline-none pr-6"
                            style={inputStyle}
                            placeholder="0"
                          />
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs" style={{ color: '#8A9BB5' }}>%</span>
                        </div>
                      </div>
                      <div className="col-span-8 sm:col-span-3">
                        <div className="px-3 py-2 rounded-xl text-sm font-medium" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: monto > 0 ? '#ffffff' : '#8A9BB5' }}>
                          ${fmt(monto)} <span style={{ color: '#8A9BB5', fontWeight: 400 }}>{form.moneda}</span>
                        </div>
                      </div>
                      <div className="col-span-11 sm:col-span-3">
                        <input
                          type="date"
                          value={item.fecha}
                          onChange={e => updatePlanItem(i, 'fecha', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                          style={inputStyle}
                        />
                      </div>
                      <div className="col-span-1 flex justify-end">
                        {planPago.length > 1 && (
                          <button type="button" onClick={() => removePlanItem(i)} className="p-1.5 rounded-lg transition-colors" style={{ color: '#EF4444' }} title="Eliminar">
                            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          {inversionNum > 0 && (
            <button
              type="button"
              onClick={addPlanItem}
              className="text-sm font-medium flex items-center gap-1.5"
              style={{ color: '#00C4A0' }}
            >
              <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
              Agregar pago
            </button>
          )}
        </section>

        {/* Estado y notas */}
        <section className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-sm font-semibold text-white">Estado y notas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Estado">
              <select value={form.estado} onChange={e => set('estado', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                {ESTADOS.map(s => <option key={s} value={s} style={{ background: '#0A1628' }}>{s}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Notas internas">
            <textarea value={form.notas} onChange={e => set('notas', e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={inputStyle} placeholder="Notas sobre el cliente..." />
          </Field>
        </section>

        {error && (
          <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444' }}>
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all" style={{ background: loading ? 'rgba(0,196,160,0.4)' : '#00C4A0', color: '#050D1A', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Registrando...' : 'Registrar cliente'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl font-medium text-sm" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
