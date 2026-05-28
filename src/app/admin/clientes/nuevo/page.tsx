'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PAQUETES = ['Starter', 'Esencial', 'Profesional', 'Premium', 'Enterprise'];
const ADDONS = ['WhatsApp Avanzado', 'Mercado Libre', 'SEO Avanzado', 'Soporte Priority'];
const MONEDAS = ['MXN', 'USD'];
const DIAS_COBRO = ['1', '5', '10', '15', '20'];
const ESTADOS = ['Activo', 'Pausado', 'Cancelado', 'Moroso'];
const METODOS_PAGO = ['Stripe', 'Transferencia SPEI', 'Otro'];

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: '#8A9BB5' }}>
        {label}{required && <span style={{ color: '#EF4444' }}> *</span>}
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

export default function NuevoClientePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{ nombre: string; anticipo: number; moneda: string } | null>(null);

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
    stripeCustomerId: '',
    notas: '',
  });

  function set(key: string, value: any) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function toggleAddon(addon: string) {
    setForm(f => ({
      ...f,
      addons: f.addons.includes(addon) ? f.addons.filter(a => a !== addon) : [...f.addons, addon],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          inversionInicial: parseFloat(form.inversionInicial) || 0,
          mensualidad: parseFloat(form.mensualidad) || 0,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al registrar cliente');
      }

      const anticipo = (parseFloat(form.inversionInicial) || 0) * 0.5;
      setSuccess({ nombre: form.nombre, anticipo, moneda: form.moneda });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center space-y-6">
        <div
          className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(34,197,94,0.15)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">¡Cliente registrado!</h2>
          <p className="text-sm mb-4" style={{ color: '#8A9BB5' }}>
            <strong className="text-white">{success.nombre}</strong> fue registrado exitosamente.
          </p>
          {success.anticipo > 0 && (
            <div
              className="rounded-xl px-4 py-3 text-sm mb-4"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#F59E0B' }}
            >
              Primer pago pendiente: <strong>${success.anticipo.toLocaleString('es-MX')} {success.moneda}</strong> anticipo (50%)
            </div>
          )}
          {form.metodoPago === 'Stripe' && (
            <div
              className="rounded-xl px-4 py-3 text-sm mb-4"
              style={{ background: 'rgba(103,114,229,0.1)', border: '1px solid rgba(103,114,229,0.2)', color: '#6772E5' }}
            >
              Recuerda crear la suscripción en Stripe y pegar el Customer ID en el perfil del cliente.
            </div>
          )}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ background: '#00C4A0', color: '#050D1A' }}
            >
              Ver dashboard
            </button>
            <button
              onClick={() => { setSuccess(null); setForm(f => ({ ...f, nombre: '', empresa: '', email: '', whatsapp: '' })); }}
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
        <section
          className="rounded-2xl p-6 space-y-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
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

        {/* Paquete y add-ons */}
        <section
          className="rounded-2xl p-6 space-y-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h2 className="text-sm font-semibold text-white">Paquete y servicios</h2>
          <Field label="Paquete" required>
            <select value={form.paquete} onChange={e => set('paquete', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
              {PAQUETES.map(p => <option key={p} value={p} style={{ background: '#0A1628' }}>{p}</option>)}
            </select>
          </Field>
          <Field label="Add-ons">
            <div className="flex flex-wrap gap-2 mt-1">
              {ADDONS.map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAddon(a)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: form.addons.includes(a) ? 'rgba(0,196,160,0.15)' : 'rgba(255,255,255,0.06)',
                    border: form.addons.includes(a) ? '1px solid rgba(0,196,160,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    color: form.addons.includes(a) ? '#00C4A0' : '#8A9BB5',
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </Field>
        </section>

        {/* Financiero */}
        <section
          className="rounded-2xl p-6 space-y-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h2 className="text-sm font-semibold text-white">Información financiera</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Moneda">
              <select value={form.moneda} onChange={e => set('moneda', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                {MONEDAS.map(m => <option key={m} value={m} style={{ background: '#0A1628' }}>{m}</option>)}
              </select>
            </Field>
            <Field label="Inversión inicial">
              <input type="number" min="0" value={form.inversionInicial} onChange={e => set('inversionInicial', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="0" />
            </Field>
            <Field label="Mensualidad" required>
              <input required type="number" min="0" value={form.mensualidad} onChange={e => set('mensualidad', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="0" />
            </Field>
            <Field label="Día de cobro">
              <select value={form.fechaCobro} onChange={e => set('fechaCobro', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                {DIAS_COBRO.map(d => <option key={d} value={d} style={{ background: '#0A1628' }}>Día {d}</option>)}
              </select>
            </Field>
            <Field label="Fecha de inicio">
              <input type="date" value={form.fechaInicio} onChange={e => set('fechaInicio', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
            </Field>
            <Field label="Método de pago">
              <select value={form.metodoPago} onChange={e => set('metodoPago', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                {METODOS_PAGO.map(m => <option key={m} value={m} style={{ background: '#0A1628' }}>{m}</option>)}
              </select>
            </Field>
          </div>
          {form.metodoPago === 'Stripe' && (
            <Field label="Stripe Customer ID">
              <input value={form.stripeCustomerId} onChange={e => set('stripeCustomerId', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="cus_xxx" />
            </Field>
          )}
        </section>

        {/* Estado y notas */}
        <section
          className="rounded-2xl p-6 space-y-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
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
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ background: loading ? 'rgba(0,196,160,0.4)' : '#00C4A0', color: '#050D1A', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Registrando...' : 'Registrar cliente'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl font-medium text-sm"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
