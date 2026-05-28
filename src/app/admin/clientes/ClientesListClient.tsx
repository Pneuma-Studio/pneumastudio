'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Cliente } from '@/lib/notion';

function fmt(n: number) {
  return n.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const PAQUETE_COLORS: Record<string, string> = {
  Starter: '#6B7280', Esencial: '#3B82F6', Profesional: '#00C4A0', Premium: '#8B5CF6', Enterprise: '#F59E0B',
};

const ESTADO_COLORS: Record<string, { bg: string; text: string }> = {
  Activo: { bg: 'rgba(34,197,94,0.15)', text: '#22C55E' },
  Moroso: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' },
  Pausado: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  Cancelado: { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' },
};

export default function ClientesListClient({ clientes }: { clientes: Cliente[] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('Todos');

  const filtered = useMemo(() => {
    let list = [...clientes];
    if (filter !== 'Todos') list = list.filter(c => c.estado === filter);
    if (search) list = list.filter(c => c.nombre.toLowerCase().includes(search.toLowerCase()) || c.empresa.toLowerCase().includes(search.toLowerCase()));
    return list.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [clientes, filter, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Clientes</h1>
          <p className="text-sm mt-1" style={{ color: '#8A9BB5' }}>{clientes.length} clientes registrados</p>
        </div>
        <Link href="/admin/clientes/nuevo" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: '#00C4A0', color: '#050D1A' }}>
          + Nuevo cliente
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8A9BB5' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Buscar cliente..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }} />
        </div>
        <div className="flex gap-1 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {['Todos','Activo','Moroso','Pausado','Cancelado'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: filter === f ? 'rgba(0,196,160,0.15)' : 'transparent', color: filter === f ? '#00C4A0' : '#8A9BB5' }}>
              {f === 'Todos' ? 'Todos' : f + 's'}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-sm mb-4" style={{ color: '#8A9BB5' }}>No hay clientes registrados</p>
          <Link href="/admin/clientes/nuevo" className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: '#00C4A0', color: '#050D1A' }}>
            Registrar primer cliente →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(c => {
            const estadoStyle = ESTADO_COLORS[c.estado] ?? { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' };
            const paqueteColor = PAQUETE_COLORS[c.paquete] ?? '#6B7280';
            return (
              <Link
                key={c.id}
                href={`/admin/clientes/${c.id}`}
                className="rounded-2xl p-5 space-y-3 block transition-all hover:scale-[1.01]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-white">{c.nombre}</div>
                    {c.empresa && <div className="text-xs mt-0.5" style={{ color: '#8A9BB5' }}>{c.empresa}</div>}
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: estadoStyle.bg, color: estadoStyle.text }}>{c.estado}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: `${paqueteColor}20`, color: paqueteColor }}>{c.paquete}</span>
                  <span className="text-sm font-bold text-white">${fmt(c.mensualidad)} {c.moneda}/mes</span>
                </div>
                <div className="text-xs" style={{ color: '#8A9BB5' }}>Cobro: Día {c.fechaCobro} · {c.metodoPago}</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
