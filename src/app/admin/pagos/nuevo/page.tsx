'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TIPOS = ['Anticipo', 'Saldo Final', 'Mensualidad', 'Mantenimiento', 'Add-on'];
const METODOS = ['Stripe', 'Transferencia SPEI', 'Efectivo', 'Otro'];
const ESTADOS = ['Pagado', 'Pendiente', 'Vencido', 'Fallido'];

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#FFFFFF',
};

export default function NuevoPagoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    clienteId: '',
    tipo: 'Mensualidad',
    monto: '',
    moneda: 'MXN',
    fechaCobro: new Date().toISOString().split('T')[0],
    estado: 'Pagado',
    metodo: 'Transferencia SPEI',
    referencia: '',
    factura: false,
    notas: '',
  });

  function set(key: string, value: any) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, monto: parseFloat(form.monto) || 0 }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Error');
      router.push('/admin/pagos');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Registrar pago</h1>
        <p className="text-sm mt-1" style={{ color: '#8A9BB5' }}>Registra un pago manual en Notion</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Notion Cliente ID *</label>
          <input required value={form.clienteId} onChange={e => set('clienteId', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="ID de la página del cliente en Notion" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Tipo</label>
            <select value={form.tipo} onChange={e => set('tipo', e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
              {TIPOS.map(t => <option key={t} value={t} style={{ background: '#0A1628' }}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Estado</label>
            <select value={form.estado} onChange={e => set('estado', e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
              {ESTADOS.map(s => <option key={s} value={s} style={{ background: '#0A1628' }}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Monto *</label>
            <input required type="number" min="0" value={form.monto} onChange={e => set('monto', e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="0" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Moneda</label>
            <select value={form.moneda} onChange={e => set('moneda', e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
              {['MXN','USD'].map(m => <option key={m} value={m} style={{ background: '#0A1628' }}>{m}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Fecha</label>
          <input type="date" value={form.fechaCobro} onChange={e => set('fechaCobro', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Método</label>
          <select value={form.metodo} onChange={e => set('metodo', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
            {METODOS.map(m => <option key={m} value={m} style={{ background: '#0A1628' }}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Referencia</label>
          <input value={form.referencia} onChange={e => set('referencia', e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} placeholder="Ref. bancaria o ID Stripe" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Notas</label>
          <textarea value={form.notas} onChange={e => set('notas', e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={inputStyle} />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.factura} onChange={e => set('factura', e.target.checked)} className="w-4 h-4 rounded" />
          <span className="text-sm" style={{ color: '#8A9BB5' }}>Factura / CFDI emitida</span>
        </label>

        {error && <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444' }}>{error}</div>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl font-semibold text-sm" style={{ background: loading ? 'rgba(0,196,160,0.4)' : '#00C4A0', color: '#050D1A' }}>
            {loading ? 'Registrando...' : 'Registrar pago'}
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
