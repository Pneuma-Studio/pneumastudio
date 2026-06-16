'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Pago } from '@/lib/notion';

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
  Pagado: { bg: 'rgba(34,197,94,0.15)', text: '#22C55E' },
  Pendiente: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  Vencido: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' },
  Fallido: { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' },
};

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export default function PagosClient({ pagos: allPagos }: { pagos: Pago[] }) {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [estadoFilter, setEstadoFilter] = useState<string>('Todos');
  const [monedaFilter, setMonedaFilter] = useState<string>('Todos');
  const [tipoFilter, setTipoFilter] = useState<string>('Todos');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);
  const [reminderLoading, setReminderLoading] = useState(false);
  const [reminderResult, setReminderResult] = useState<{ enviados: number; marcadosVencido?: number; marcadosMorosos?: number } | null>(null);
  const [generarLoading, setGenerarLoading] = useState(false);
  const [generarResult, setGenerarResult] = useState<{ created: number; mensaje: string } | null>(null);

  const filtered = useMemo(() => {
    const monthStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}`;
    return allPagos.filter(p => {
      if (!p.fechaCobro.startsWith(monthStr)) return false;
      if (estadoFilter !== 'Todos' && p.estado !== estadoFilter) return false;
      if (monedaFilter !== 'Todos' && p.moneda !== monedaFilter) return false;
      if (tipoFilter !== 'Todos' && p.tipo !== tipoFilter) return false;
      return true;
    });
  }, [allPagos, selectedYear, selectedMonth, estadoFilter, monedaFilter, tipoFilter]);

  const summary = useMemo(() => {
    const pagadoMXN = filtered.filter(p => p.estado === 'Pagado' && p.moneda === 'MXN').reduce((s, p) => s + p.monto, 0);
    const pagadoUSD = filtered.filter(p => p.estado === 'Pagado' && p.moneda === 'USD').reduce((s, p) => s + p.monto, 0);
    const pendienteMXN = filtered.filter(p => p.estado === 'Pendiente' && p.moneda === 'MXN').reduce((s, p) => s + p.monto, 0);
    const vencidoMXN = filtered.filter(p => p.estado === 'Vencido' && p.moneda === 'MXN').reduce((s, p) => s + p.monto, 0);
    return { pagadoMXN, pagadoUSD, pendienteMXN, vencidoMXN };
  }, [filtered]);

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(p => p.id)));
  }

  async function handleBulkPaid() {
    if (!selected.size) return;
    setBulkLoading(true);
    try {
      await Promise.all([...selected].map(id =>
        fetch(`/api/admin/pagos/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado: 'Pagado' }),
        })
      ));
      window.location.reload();
    } catch {
      setBulkLoading(false);
    }
  }

  function downloadCSV() {
    const headers = ['Fecha','Cliente','Tipo','Monto','Moneda','Estado','Método','Referencia','Factura'];
    const rows = filtered.map(p => [
      p.fechaCobro,
      p.clienteNombre,
      p.tipo,
      p.monto,
      p.moneda,
      p.estado,
      p.metodo,
      p.referencia || '',
      p.factura ? 'Sí' : 'No',
    ]);
    const csv = [headers, ...rows]
      .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pagos-${selectedYear}-${String(selectedMonth).padStart(2,'0')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const years = Array.from({ length: 3 }, (_, i) => now.getFullYear() - i);

  async function handleSendReminders() {
    if (!confirm('¿Enviar recordatorios de pago a todos los clientes con pagos vencidos?')) return;
    setReminderLoading(true);
    setReminderResult(null);
    try {
      const res = await fetch('/api/admin/cron/pagos-vencidos', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setReminderResult({ enviados: data.enviados, marcadosVencido: data.marcadosVencido, marcadosMorosos: data.marcadosMorosos });
      }
    } catch {
      // silent
    } finally {
      setReminderLoading(false);
    }
  }

  async function handleGenerarMensualidades() {
    if (!confirm(`¿Generar mensualidades de ${MESES[selectedMonth - 1]} ${selectedYear} para todos los clientes activos sin mensualidad este mes?`)) return;
    setGenerarLoading(true);
    setGenerarResult(null);
    try {
      const res = await fetch('/api/admin/cron/generar-pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year: selectedYear, month: selectedMonth }),
      });
      const data = await res.json();
      if (res.ok) setGenerarResult({ created: data.created, mensaje: data.mensaje });
    } catch {
      // silent
    } finally {
      setGenerarLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Pagos</h1>
          <p className="text-sm mt-1" style={{ color: '#8A9BB5' }}>Todos los pagos registrados</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Feedback chips */}
          {reminderResult && (
            <span className="text-xs px-3 py-2 rounded-xl" style={{ background: 'rgba(0,196,160,0.1)', color: '#00C4A0', border: '1px solid rgba(0,196,160,0.2)' }}>
              ✓ {reminderResult.enviados} recordatorio{reminderResult.enviados !== 1 ? 's' : ''} enviado{reminderResult.enviados !== 1 ? 's' : ''}
              {reminderResult.marcadosVencido ? ` · ${reminderResult.marcadosVencido} marcados vencido` : ''}
              {reminderResult.marcadosMorosos ? ` · ${reminderResult.marcadosMorosos} → moroso` : ''}
            </span>
          )}
          {generarResult && (
            <span className="text-xs px-3 py-2 rounded-xl" style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.2)' }}>
              ✓ {generarResult.mensaje}
            </span>
          )}

          {/* CSV export */}
          <button
            onClick={downloadCSV}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium disabled:opacity-40"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#8A9BB5', border: '1px solid rgba(255,255,255,0.08)' }}
            title="Exportar a CSV"
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <path d="M8 1v9M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            CSV
          </button>

          {/* Generar mensualidades */}
          <button
            onClick={handleGenerarMensualidades}
            disabled={generarLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50"
            style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.2)' }}
          >
            {generarLoading ? (
              <div className="w-3.5 h-3.5 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#3B82F6' }} />
            ) : (
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                <path d="M2 8a6 6 0 1 0 6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/>
                <path d="M2 4v4h4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {generarLoading ? 'Generando...' : 'Generar mensualidades'}
          </button>

          {/* Send reminders */}
          <button
            onClick={handleSendReminders}
            disabled={reminderLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50"
            style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            {reminderLoading ? (
              <div className="w-3.5 h-3.5 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#EF4444' }} />
            ) : (
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                <path d="M8 1v2M8 13v2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M1 8h2M13 8h2M3.22 12.78l1.42-1.42M11.36 4.64l1.42-1.42" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round"/>
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth={1.4}/>
              </svg>
            )}
            {reminderLoading ? 'Enviando...' : 'Enviar recordatorios'}
          </button>

          <Link href="/admin/pagos/nuevo" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: '#00C4A0', color: '#050D1A' }}>
            + Registrar pago
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div
        className="rounded-2xl p-4 space-y-3"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2">
            <select value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))} className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#FFFFFF' }}>
              {MESES.map((m, i) => <option key={i} value={i + 1} style={{ background: '#0A1628' }}>{m}</option>)}
            </select>
            <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))} className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#FFFFFF' }}>
              {years.map(y => <option key={y} value={y} style={{ background: '#0A1628' }}>{y}</option>)}
            </select>
          </div>

          <div className="flex gap-1 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {['Todos','Pagados','Pendientes','Vencidos','Fallidos'].map(f => (
              <button key={f} onClick={() => setEstadoFilter(f === 'Todos' ? 'Todos' : f.replace(/s$/, ''))} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: estadoFilter === (f === 'Todos' ? 'Todos' : f.replace(/s$/, '')) ? 'rgba(0,196,160,0.15)' : 'transparent', color: estadoFilter === (f === 'Todos' ? 'Todos' : f.replace(/s$/, '')) ? '#00C4A0' : '#8A9BB5' }}>
                {f}
              </button>
            ))}
          </div>

          <div className="flex gap-1 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {['Todos','MXN','USD'].map(f => (
              <button key={f} onClick={() => setMonedaFilter(f)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: monedaFilter === f ? 'rgba(0,196,160,0.15)' : 'transparent', color: monedaFilter === f ? '#00C4A0' : '#8A9BB5' }}>
                {f}
              </button>
            ))}
          </div>

          <select value={tipoFilter} onChange={e => setTipoFilter(e.target.value)} className="px-3 py-2 rounded-xl text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#8A9BB5' }}>
            {['Todos','Anticipo','Mensualidad','Mantenimiento','Add-on','Saldo Final'].map(t => <option key={t} value={t} style={{ background: '#0A1628' }}>{t}</option>)}
          </select>
        </div>

        <div className="flex flex-wrap gap-4 text-sm pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span><span style={{ color: '#22C55E' }}>Pagado:</span> <strong className="text-white">${fmt(summary.pagadoMXN)} MXN{summary.pagadoUSD > 0 ? ` · $${fmt(summary.pagadoUSD)} USD` : ''}</strong></span>
          <span><span style={{ color: '#F59E0B' }}>Pendiente:</span> <strong className="text-white">${fmt(summary.pendienteMXN)} MXN</strong></span>
          <span><span style={{ color: '#EF4444' }}>Vencido:</span> <strong className="text-white">${fmt(summary.vencidoMXN)} MXN</strong></span>
          <span className="ml-auto text-xs" style={{ color: '#4A5568' }}>{filtered.length} pagos</span>
        </div>
      </div>

      {/* Bulk action */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(0,196,160,0.1)', border: '1px solid rgba(0,196,160,0.2)' }}>
          <span className="text-sm" style={{ color: '#00C4A0' }}>{selected.size} seleccionados</span>
          <button onClick={handleBulkPaid} disabled={bulkLoading} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: '#22C55E', color: '#050D1A' }}>
            {bulkLoading ? 'Procesando...' : 'Marcar todos como pagados'}
          </button>
          <button onClick={() => setSelected(new Set())} className="text-xs" style={{ color: '#8A9BB5' }}>Cancelar</button>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-sm" style={{ color: '#8A9BB5' }}>No hay pagos para el período seleccionado</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="w-4 h-4 rounded" />
                  </th>
                  {['Fecha','Cliente','Tipo','Monto','Estado','Método','Referencia','Factura'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium" style={{ color: '#8A9BB5' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const estadoStyle = ESTADO_COLORS[p.estado] ?? { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' };
                  const isOverdue = p.estado === 'Pendiente' && p.fechaCobro < new Date().toISOString().split('T')[0];
                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        background: isOverdue ? 'rgba(239,68,68,0.04)' : selected.has(p.id) ? 'rgba(0,196,160,0.04)' : 'transparent',
                      }}
                    >
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} className="w-4 h-4 rounded" />
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#8A9BB5' }}>{fmtDate(p.fechaCobro)}</td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/clientes/${p.clienteId}`} className="text-sm font-medium text-white hover:underline">{p.clienteNombre}</Link>
                      </td>
                      <td className="px-4 py-3 text-xs text-white">{p.tipo}</td>
                      <td className="px-4 py-3 font-medium text-white">${fmt(p.monto)} <span style={{ color: '#8A9BB5' }}>{p.moneda}</span></td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: estadoStyle.bg, color: estadoStyle.text }}>{p.estado}</span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#8A9BB5' }}>{p.metodo}</td>
                      <td className="px-4 py-3 text-xs max-w-[100px] truncate" style={{ color: '#8A9BB5' }}>{p.referencia || '—'}</td>
                      <td className="px-4 py-3 text-center text-xs">
                        {p.factura ? <span style={{ color: '#22C55E' }}>✓</span> : <span style={{ color: '#8A9BB5' }}>—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {filtered.map(p => {
              const estadoStyle = ESTADO_COLORS[p.estado] ?? { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' };
              return (
                <div key={p.id} className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Link href={`/admin/clientes/${p.clienteId}`} className="text-sm font-medium text-white">{p.clienteNombre}</Link>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: estadoStyle.bg, color: estadoStyle.text }}>{p.estado}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs" style={{ color: '#8A9BB5' }}>
                    <span>{fmtDate(p.fechaCobro)}</span>
                    <span>{p.tipo}</span>
                    <span className="font-bold text-white">${fmt(p.monto)} {p.moneda}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
