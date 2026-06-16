'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Factura {
  id: string;
  notion_client_id: string;
  client_name: string;
  numero_factura: string;
  monto: number;
  moneda: string;
  fecha_factura: string;
  path: string;
  original_name: string;
  size: number;
  created_at: string;
}

function fmt(n: number) {
  return n.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtDate(d: string) {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${day}/${months[parseInt(m)-1]}/${y}`;
}

export default function FacturasClient() {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/facturas');
    if (res.ok) setFacturas(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const filtered = query.trim()
    ? facturas.filter(f =>
        f.client_name?.toLowerCase().includes(query.toLowerCase()) ||
        f.numero_factura?.toLowerCase().includes(query.toLowerCase())
      )
    : facturas;

  async function handleOpen(f: Factura) {
    const res = await fetch('/api/admin/documentos/signed-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: f.path, bucket: 'facturas' }),
    });
    if (res.ok) {
      const { url } = await res.json();
      window.open(url, '_blank');
    }
  }

  async function handleDelete(f: Factura) {
    if (!confirm(`¿Eliminar factura ${f.numero_factura} de ${f.client_name}?`)) return;
    setFacturas(prev => prev.filter(x => x.id !== f.id));
    await fetch(`/api/admin/clientes/${f.notion_client_id}/facturas`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: f.id, path: f.path }),
    });
  }

  const totalMXN = facturas.filter(f => f.moneda === 'MXN').reduce((s, f) => s + (f.monto || 0), 0);
  const totalUSD = facturas.filter(f => f.moneda === 'USD').reduce((s, f) => s + (f.monto || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Facturas</h1>
          <p className="text-sm mt-1" style={{ color: '#8A9BB5' }}>
            {loading ? 'Cargando...' : `${facturas.length} facturas registradas`}
            {!loading && totalMXN > 0 && ` · $${fmt(totalMXN)} MXN`}
            {!loading && totalUSD > 0 && ` · $${fmt(totalUSD)} USD`}
          </p>
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#8A9BB5" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por cliente o # factura..."
            className="pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none text-white w-72"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#00C4A0' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-sm" style={{ color: '#8A9BB5' }}>
            {query ? 'No se encontraron facturas con ese criterio' : 'Sin facturas registradas. Sube la primera desde el perfil de un cliente.'}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['# Factura','Cliente','Monto','Fecha','Archivo',''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium" style={{ color: '#8A9BB5' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((f, i) => (
                  <tr key={f.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-white">{f.numero_factura}</span>
                    </td>
                    <td className="px-4 py-3">
                      {f.notion_client_id ? (
                        <Link href={`/admin/clientes/${f.notion_client_id}`} className="text-white hover:underline">
                          {f.client_name}
                        </Link>
                      ) : (
                        <span className="text-white">{f.client_name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium" style={{ color: '#00C4A0' }}>
                      {f.monto > 0 ? `$${fmt(f.monto)} ${f.moneda}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: '#8A9BB5' }}>
                      {fmtDate(f.fecha_factura)}
                    </td>
                    <td className="px-4 py-3 text-xs max-w-[180px] truncate" style={{ color: '#8A9BB5' }}>
                      {f.original_name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleOpen(f)} className="text-xs font-medium" style={{ color: '#00C4A0' }}>Abrir</button>
                        <button onClick={() => handleDelete(f)} className="text-xs" style={{ color: '#8A9BB5' }}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="lg:hidden divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {filtered.map(f => (
              <div key={f.id} className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{f.numero_factura}</span>
                  {f.monto > 0 && <span className="text-sm font-medium" style={{ color: '#00C4A0' }}>${fmt(f.monto)} {f.moneda}</span>}
                </div>
                <div className="text-xs" style={{ color: '#8A9BB5' }}>
                  {f.client_name} · {fmtDate(f.fecha_factura)}
                </div>
                <button onClick={() => handleOpen(f)} className="text-xs font-medium" style={{ color: '#00C4A0' }}>
                  Abrir archivo
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
