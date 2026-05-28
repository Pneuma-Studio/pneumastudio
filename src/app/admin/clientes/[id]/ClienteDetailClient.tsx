'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Cliente, Pago, PagoEstado, PagoTipo, PagoMetodo } from '@/lib/notion';

function fmt(n: number) {
  return n.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtDate(d: string) {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${day}/${months[parseInt(m)-1]}/${y}`;
}

const ESTADO_COLORS: Record<string, { bg: string; text: string }> = {
  Activo: { bg: 'rgba(34,197,94,0.15)', text: '#22C55E' },
  Moroso: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' },
  Pausado: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  Cancelado: { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' },
};

const PAGO_ESTADO_COLORS: Record<string, { bg: string; text: string }> = {
  Pagado: { bg: 'rgba(34,197,94,0.15)', text: '#22C55E' },
  Pendiente: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  Vencido: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' },
  Fallido: { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' },
};

const PAQUETE_COLORS: Record<string, string> = {
  Starter: '#6B7280', Esencial: '#3B82F6', Profesional: '#00C4A0', Premium: '#8B5CF6', Enterprise: '#F59E0B',
};

// ─── Mark as Paid Modal ───────────────────────────────────────────────────────

function MarkPaidModal({ pago, onClose, onConfirm }: {
  pago: Pago;
  onClose: () => void;
  onConfirm: (data: { referencia: string; factura: boolean; fecha: string }) => void;
}) {
  const [referencia, setReferencia] = useState(pago.referencia || '');
  const [factura, setFactura] = useState(pago.factura);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div className="w-full max-w-md rounded-2xl p-6 space-y-4" style={{ background: '#0A1628', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 className="text-lg font-bold text-white">Confirmar pago</h3>
        <p className="text-sm" style={{ color: '#8A9BB5' }}>
          Marcando <strong className="text-white">${fmt(pago.monto)} {pago.moneda}</strong> como pagado
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Fecha de pago</label>
            <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="w-full px-3 py-2 rounded-xl text-sm outline-none text-white" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Referencia / Número de confirmación</label>
            <input value={referencia} onChange={e => setReferencia(e.target.value)} className="w-full px-3 py-2 rounded-xl text-sm outline-none text-white" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} placeholder="Ref. bancaria o ID de Stripe" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={factura} onChange={e => setFactura(e.target.checked)} className="w-4 h-4 rounded" />
            <span className="text-sm" style={{ color: '#8A9BB5' }}>Factura / CFDI emitida</span>
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={() => onConfirm({ referencia, factura, fecha })} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: '#22C55E', color: '#050D1A' }}>
            Confirmar pago
          </button>
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Register Payment Modal ───────────────────────────────────────────────────

function RegisterPaymentModal({ clienteId, moneda, onClose, onSuccess }: {
  clienteId: string; moneda: string; onClose: () => void; onSuccess: (pago: Pago) => void;
}) {
  const [form, setForm] = useState({
    tipo: 'Mensualidad' as PagoTipo,
    monto: '',
    moneda: moneda,
    fechaCobro: new Date().toISOString().split('T')[0],
    metodo: 'Transferencia SPEI' as PagoMetodo,
    referencia: '',
    factura: false,
    notas: '',
    estado: 'Pagado' as PagoEstado,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, clienteId, monto: parseFloat(form.monto) || 0 }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Error');
      const data = await res.json();
      onSuccess(data.pago);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div className="w-full max-w-md rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto" style={{ background: '#0A1628', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h3 className="text-lg font-bold text-white">Registrar pago manual</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Tipo</label>
              <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value as PagoTipo }))} className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle}>
                {['Anticipo','Saldo Final','Mensualidad','Mantenimiento','Add-on'].map(t => <option key={t} value={t} style={{ background: '#0A1628' }}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Estado</label>
              <select value={form.estado} onChange={e => setForm(f => ({ ...f, estado: e.target.value as PagoEstado }))} className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle}>
                {['Pagado','Pendiente','Vencido','Fallido'].map(s => <option key={s} value={s} style={{ background: '#0A1628' }}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Monto *</label>
              <input required type="number" min="0" value={form.monto} onChange={e => setForm(f => ({ ...f, monto: e.target.value }))} className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle} placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Moneda</label>
              <select value={form.moneda} onChange={e => setForm(f => ({ ...f, moneda: e.target.value }))} className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle}>
                {['MXN','USD'].map(m => <option key={m} value={m} style={{ background: '#0A1628' }}>{m}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Fecha</label>
            <input type="date" value={form.fechaCobro} onChange={e => setForm(f => ({ ...f, fechaCobro: e.target.value }))} className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Método</label>
            <select value={form.metodo} onChange={e => setForm(f => ({ ...f, metodo: e.target.value as PagoMetodo }))} className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle}>
              {['Stripe','Transferencia SPEI','Otro'].map(m => <option key={m} value={m} style={{ background: '#0A1628' }}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Referencia</label>
            <input value={form.referencia} onChange={e => setForm(f => ({ ...f, referencia: e.target.value }))} className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle} placeholder="Ref. bancaria o ID Stripe" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#8A9BB5' }}>Notas</label>
            <textarea value={form.notas} onChange={e => setForm(f => ({ ...f, notas: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none" style={inputStyle} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.factura} onChange={e => setForm(f => ({ ...f, factura: e.target.checked }))} className="w-4 h-4 rounded" />
            <span className="text-sm" style={{ color: '#8A9BB5' }}>Factura / CFDI emitida</span>
          </label>
          {error && <div className="text-xs px-3 py-2 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: '#00C4A0', color: '#050D1A' }}>
              {loading ? 'Registrando...' : 'Registrar pago'}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ClienteDetailClient({ cliente, pagos: initialPagos }: { cliente: Cliente; pagos: Pago[] }) {
  const [pagos, setPagos] = useState(initialPagos);
  const [markingPaid, setMarkingPaid] = useState<Pago | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  const estadoStyle = ESTADO_COLORS[cliente.estado] ?? { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' };
  const paqueteColor = PAQUETE_COLORS[cliente.paquete] ?? '#6B7280';

  const totalCobrado = pagos.filter(p => p.estado === 'Pagado').reduce((s, p) => s + p.monto, 0);
  const saldoPendiente = pagos.filter(p => p.estado === 'Pendiente').reduce((s, p) => s + p.monto, 0);

  const nextBillingDate = () => {
    const day = parseInt(cliente.fechaCobro || '1', 10);
    const now = new Date();
    let m = now.getMonth() + 1;
    let y = now.getFullYear();
    if (day <= now.getDate()) {
      m += 1;
      if (m > 12) { m = 1; y += 1; }
    }
    return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  async function handleMarkPaid(pagoId: string, data: { referencia: string; factura: boolean; fecha: string }) {
    // Optimistic update
    setPagos(prev => prev.map(p => p.id === pagoId ? { ...p, estado: 'Pagado' as PagoEstado, referencia: data.referencia, factura: data.factura, fechaCobro: data.fecha } : p));
    setMarkingPaid(null);

    try {
      await fetch(`/api/admin/pagos/${pagoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'Pagado', referencia: data.referencia, factura: data.factura, fechaCobro: data.fecha }),
      });
    } catch {
      // Revert on error
      setPagos(initialPagos);
    }
  }

  async function handleMarkVencido(pagoId: string) {
    setPagos(prev => prev.map(p => p.id === pagoId ? { ...p, estado: 'Vencido' as PagoEstado } : p));
    try {
      await fetch(`/api/admin/pagos/${pagoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'Vencido' }),
      });
    } catch {
      setPagos(initialPagos);
    }
  }

  async function handleDelete(pagoId: string) {
    if (!confirm('¿Eliminar este pago?')) return;
    setPagos(prev => prev.filter(p => p.id !== pagoId));
    try {
      await fetch(`/api/admin/pagos/${pagoId}`, { method: 'DELETE' });
    } catch {
      setPagos(initialPagos);
    }
  }

  const waLink = `https://wa.me/${cliente.whatsapp?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${cliente.nombre}, te contactamos desde Pneuma Studio.`)}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/admin/dashboard" className="text-sm" style={{ color: '#8A9BB5' }}>← Dashboard</Link>
          </div>
          <h1 className="text-2xl font-bold text-white mt-2">{cliente.nombre}</h1>
          {cliente.empresa && <p className="text-sm mt-0.5" style={{ color: '#8A9BB5' }}>{cliente.empresa}</p>}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${paqueteColor}20`, color: paqueteColor }}>{cliente.paquete}</span>
            {cliente.addons.map(a => (
              <span key={a} className="px-2.5 py-1 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}>{a}</span>
            ))}
            <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: estadoStyle.bg, color: estadoStyle.text }}>{cliente.estado}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {cliente.whatsapp && (
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          )}
          <button
            onClick={() => setShowRegister(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: '#00C4A0', color: '#050D1A' }}
          >
            + Registrar pago
          </button>
        </div>
      </div>

      {/* Financial summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total cobrado', value: `$${fmt(totalCobrado)} ${cliente.moneda}`, color: '#22C55E' },
          { label: 'Saldo pendiente', value: `$${fmt(saldoPendiente)} ${cliente.moneda}`, color: '#F59E0B' },
          { label: 'Mensualidad activa', value: `$${fmt(cliente.mensualidad)} ${cliente.moneda}`, sub: `Próximo: ${fmtDate(nextBillingDate())}`, color: '#00C4A0' },
        ].map(card => (
          <div key={card.label} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-xs font-medium mb-2" style={{ color: '#8A9BB5' }}>{card.label}</div>
            <div className="text-xl font-bold" style={{ color: card.color }}>{card.value}</div>
            {card.sub && <div className="text-xs mt-1" style={{ color: '#8A9BB5' }}>{card.sub}</div>}
          </div>
        ))}
      </div>

      {/* Payment history */}
      <div id="pagos" className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="text-sm font-semibold text-white">Historial de pagos</h2>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}>{pagos.length} registros</span>
        </div>

        {pagos.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm" style={{ color: '#8A9BB5' }}>No hay pagos registrados</p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['Fecha','Tipo','Monto','Estado','Método','Referencia','Factura','Acciones'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium" style={{ color: '#8A9BB5' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((p, i) => {
                    const estadoPago = PAGO_ESTADO_COLORS[p.estado] ?? { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' };
                    const isOverdue = p.estado === 'Pendiente' && p.fechaCobro && p.fechaCobro < new Date().toISOString().split('T')[0];
                    return (
                      <tr
                        key={p.id}
                        style={{
                          borderBottom: i < pagos.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                          background: isOverdue ? 'rgba(239,68,68,0.04)' : 'transparent',
                        }}
                      >
                        <td className="px-4 py-3 text-xs" style={{ color: '#8A9BB5' }}>{fmtDate(p.fechaCobro)}</td>
                        <td className="px-4 py-3 text-xs text-white">{p.tipo}</td>
                        <td className="px-4 py-3 font-medium text-white">${fmt(p.monto)} <span style={{ color: '#8A9BB5' }}>{p.moneda}</span></td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: estadoPago.bg, color: estadoPago.text }}>{p.estado}</span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#8A9BB5' }}>{p.metodo}</td>
                        <td className="px-4 py-3 text-xs max-w-[120px] truncate" style={{ color: '#8A9BB5' }}>{p.referencia || '—'}</td>
                        <td className="px-4 py-3 text-center">
                          {p.factura ? <span style={{ color: '#22C55E' }}>✓</span> : <span style={{ color: '#8A9BB5' }}>—</span>}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {p.estado === 'Pendiente' && (
                              <>
                                <button onClick={() => setMarkingPaid(p)} className="text-xs font-medium" style={{ color: '#22C55E' }}>Pagar</button>
                                <span style={{ color: '#8A9BB5' }}>·</span>
                                <button onClick={() => handleMarkVencido(p.id)} className="text-xs" style={{ color: '#EF4444' }}>Vencer</button>
                                <span style={{ color: '#8A9BB5' }}>·</span>
                              </>
                            )}
                            <button onClick={() => handleDelete(p.id)} className="text-xs" style={{ color: '#8A9BB5' }}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {pagos.map(p => {
                const estadoPago = PAGO_ESTADO_COLORS[p.estado] ?? { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' };
                return (
                  <div key={p.id} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-white">{p.tipo}</div>
                        <div className="text-xs" style={{ color: '#8A9BB5' }}>{fmtDate(p.fechaCobro)}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">${fmt(p.monto)} {p.moneda}</div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: estadoPago.bg, color: estadoPago.text }}>{p.estado}</span>
                      </div>
                    </div>
                    {p.estado === 'Pendiente' && (
                      <button onClick={() => setMarkingPaid(p)} className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E' }}>
                        Marcar como pagado
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Client info */}
      <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h2 className="text-sm font-semibold text-white">Información del cliente</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          {[
            { label: 'Email', value: cliente.email },
            { label: 'WhatsApp', value: cliente.whatsapp },
            { label: 'Método de pago', value: cliente.metodoPago },
            { label: 'Fecha de inicio', value: fmtDate(cliente.fechaInicio) },
            { label: 'Día de cobro', value: `Día ${cliente.fechaCobro}` },
            { label: 'Stripe ID', value: cliente.stripeCustomerId || '—' },
          ].map(item => (
            <div key={item.label}>
              <div className="text-xs mb-0.5" style={{ color: '#8A9BB5' }}>{item.label}</div>
              <div className="text-white truncate">{item.value || '—'}</div>
            </div>
          ))}
        </div>
        {cliente.notas && (
          <div>
            <div className="text-xs mb-0.5" style={{ color: '#8A9BB5' }}>Notas</div>
            <div className="text-sm text-white">{cliente.notas}</div>
          </div>
        )}
      </div>

      {/* Modals */}
      {markingPaid && (
        <MarkPaidModal
          pago={markingPaid}
          onClose={() => setMarkingPaid(null)}
          onConfirm={data => handleMarkPaid(markingPaid.id, data)}
        />
      )}
      {showRegister && (
        <RegisterPaymentModal
          clienteId={cliente.id}
          moneda={cliente.moneda}
          onClose={() => setShowRegister(false)}
          onSuccess={pago => { setPagos(prev => [pago, ...prev]); setShowRegister(false); }}
        />
      )}
    </div>
  );
}
