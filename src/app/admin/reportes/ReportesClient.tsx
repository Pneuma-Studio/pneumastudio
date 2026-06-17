'use client';

import { useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';
import type { Cliente, Pago } from '@/lib/notion';

function fmt(n: number) {
  return n.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const MESES_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

const PAQUETE_COLORS: Record<string, string> = {
  Starter: '#6B7280', Esencial: '#3B82F6', Profesional: '#00C4A0', Premium: '#8B5CF6', Enterprise: '#F59E0B',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-sm space-y-1" style={{ background: '#0A1628', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="font-semibold text-white mb-2">{label}</div>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span style={{ color: '#8A9BB5' }}>{entry.name}:</span>
          <span className="text-white font-medium">${fmt(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function ReportesClient({ clientes, pagos }: { clientes: Cliente[]; pagos: Pago[] }) {
  const now = new Date();

  // Last 6 months revenue data
  const monthlyData = useMemo(() => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1, label: `${MESES_SHORT[d.getMonth()]} ${d.getFullYear()}` };
    });

    return months.map(({ year, month, label }) => {
      const monthStr = `${year}-${String(month).padStart(2, '0')}`;
      const monthPagos = pagos.filter(p => p.fechaCobro.startsWith(monthStr) && p.estado === 'Pagado');
      const mxn = monthPagos.filter(p => p.moneda === 'MXN').reduce((s, p) => s + p.monto, 0);
      const usd = monthPagos.filter(p => p.moneda === 'USD').reduce((s, p) => s + p.monto, 0);
      return { label, MXN: mxn, USD: usd };
    });
  }, [pagos]);

  // MRR by package
  const mrrByPackage = useMemo(() => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1, label: MESES_SHORT[d.getMonth()] };
    });

    return months.map(({ year, month, label }) => {
      const monthStr = `${year}-${String(month).padStart(2, '0')}`;
      const monthPagos = pagos.filter(p => p.fechaCobro.startsWith(monthStr) && p.estado === 'Pagado');
      const byPaquete: Record<string, number> = {};
      monthPagos.forEach(p => {
        const cliente = clientes.find(c => c.id === p.clienteId);
        if (cliente) {
          byPaquete[cliente.paquete] = (byPaquete[cliente.paquete] || 0) + p.monto;
        }
      });
      return { label, ...byPaquete };
    });
  }, [pagos, clientes]);

  // Client table sorted by MRR
  const clientesByValue = useMemo(() => {
    return clientes
      .filter(c => c.estado === 'Activo')
      .map(c => {
        const clientePagos = pagos.filter(p => p.clienteId === c.id && p.estado === 'Pagado');
        const totalCobrado = clientePagos.reduce((s, p) => s + p.monto, 0);
        const fechaInicio = c.fechaInicio ? new Date(c.fechaInicio) : new Date();
        const mesesActivo = Math.max(1, Math.round((now.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24 * 30)));
        return { ...c, totalCobrado, mesesActivo };
      })
      .sort((a, b) => b.mensualidad - a.mensualidad);
  }, [clientes, pagos]);

  // Metrics
  const avgMRR = clientesByValue.length > 0
    ? clientesByValue.reduce((s, c) => s + c.mensualidad, 0) / clientesByValue.length
    : 0;

  const canceladosThisYear = clientes.filter(c => c.estado === 'Cancelado').length;

  const morosos = clientes.filter(c => c.estado === 'Moroso');
  const totalVencido = pagos
    .filter(p => p.estado === 'Vencido')
    .reduce((s, p) => s + p.monto, 0);

  // Retention metrics
  const avgLTV = useMemo(() => {
    const active = clientes.filter(c => c.estado === 'Activo' && c.fechaInicio);
    if (!active.length) return 0;
    const sum = active.reduce((s, c) => {
      const months = Math.max(1, Math.round((now.getTime() - new Date(c.fechaInicio).getTime()) / (1000 * 60 * 60 * 24 * 30)));
      return s + c.mensualidad * months;
    }, 0);
    return sum / active.length;
  }, [clientes]);

  const avgTenure = useMemo(() => {
    const active = clientes.filter(c => c.estado === 'Activo' && c.fechaInicio);
    if (!active.length) return 0;
    return active.reduce((s, c) => {
      return s + Math.max(1, Math.round((now.getTime() - new Date(c.fechaInicio).getTime()) / (1000 * 60 * 60 * 24 * 30)));
    }, 0) / active.length;
  }, [clientes]);

  const churnRate = useMemo(() => {
    const relevant = clientes.filter(c => c.estado !== 'Pausado').length;
    const canceled = clientes.filter(c => c.estado === 'Cancelado').length;
    return relevant > 0 ? (canceled / relevant) * 100 : 0;
  }, [clientes]);

  const growthData = useMemo(() => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1, label: MESES_SHORT[d.getMonth()] };
    });
    return months.map(({ year, month, label }) => {
      const ms = `${year}-${String(month).padStart(2, '0')}`;
      return { label, Nuevos: clientes.filter(c => c.fechaInicio?.startsWith(ms)).length };
    });
  }, [clientes]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reportes</h1>
        <p className="text-sm mt-1" style={{ color: '#8A9BB5' }}>Análisis de ingresos y métricas</p>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'MRR promedio por cliente', value: `$${fmt(avgMRR)} MXN`, color: '#00C4A0' },
          { label: 'Clientes activos', value: String(clientesByValue.length), color: '#3B82F6' },
          { label: 'Cancelados este año', value: String(canceladosThisYear), color: '#6B7280' },
          { label: 'Total vencido', value: `$${fmt(totalVencido)} MXN`, color: '#EF4444' },
        ].map(m => (
          <div key={m.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-xs mb-2" style={{ color: '#8A9BB5' }}>{m.label}</div>
            <div className="text-xl font-bold" style={{ color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Monthly revenue chart */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h2 className="text-sm font-semibold text-white mb-4">Ingresos mensuales — últimos 6 meses</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="label" tick={{ fill: '#8A9BB5', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8A9BB5', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${fmt(v)}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#8A9BB5', fontSize: '12px' }} />
            <Line type="monotone" dataKey="MXN" stroke="#00C4A0" strokeWidth={2} dot={{ fill: '#00C4A0', r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="USD" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* MRR by package */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h2 className="text-sm font-semibold text-white mb-4">Composición de ingresos por paquete</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={mrrByPackage} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="label" tick={{ fill: '#8A9BB5', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8A9BB5', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${fmt(v)}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#8A9BB5', fontSize: '12px' }} />
            {Object.entries(PAQUETE_COLORS).map(([paquete, color]) => (
              <Bar key={paquete} dataKey={paquete} stackId="a" fill={color} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Client table by value */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="text-sm font-semibold text-white">Clientes por valor</h2>
        </div>
        {clientesByValue.length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: '#8A9BB5' }}>No hay clientes activos</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Cliente','Paquete','MRR','Total cobrado','Tiempo activo'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium" style={{ color: '#8A9BB5' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clientesByValue.map((c, i) => {
                  const paqueteColor = PAQUETE_COLORS[c.paquete] ?? '#6B7280';
                  return (
                    <tr key={c.id} style={{ borderBottom: i < clientesByValue.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <td className="px-4 py-3">
                        <Link href={`/admin/clientes/${c.id}`} className="font-medium text-white hover:underline">{c.nombre}</Link>
                        {c.empresa && <div className="text-xs" style={{ color: '#8A9BB5' }}>{c.empresa}</div>}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: `${paqueteColor}20`, color: paqueteColor }}>{c.paquete}</span>
                      </td>
                      <td className="px-4 py-3 font-medium text-white">${fmt(c.mensualidad)} <span style={{ color: '#8A9BB5' }}>{c.moneda}</span></td>
                      <td className="px-4 py-3 text-white">${fmt(c.totalCobrado)} <span style={{ color: '#8A9BB5' }}>{c.moneda}</span></td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#8A9BB5' }}>{c.mesesActivo} mes{c.mesesActivo !== 1 ? 'es' : ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Retention metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'LTV promedio', value: `$${fmt(avgLTV)} MXN`, sub: 'mensualidad × meses activos', color: '#8B5CF6' },
          { label: 'Churn rate', value: `${churnRate.toFixed(1)}%`, sub: 'clientes cancelados / total', color: '#EF4444' },
          { label: 'Permanencia promedio', value: `${Math.round(avgTenure)} meses`, sub: 'clientes activos', color: '#00C4A0' },
          { label: 'Total clientes', value: String(clientes.length), sub: `${clientesByValue.length} activos`, color: '#3B82F6' },
        ].map(m => (
          <div key={m.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-xs mb-2" style={{ color: '#8A9BB5' }}>{m.label}</div>
            <div className="text-xl font-bold" style={{ color: m.color }}>{m.value}</div>
            <div className="text-xs mt-1" style={{ color: 'rgba(138,155,181,0.6)' }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Client growth chart */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h2 className="text-sm font-semibold text-white mb-4">Nuevos clientes — últimos 6 meses</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={growthData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="label" tick={{ fill: '#8A9BB5', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fill: '#8A9BB5', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-xl p-3 text-sm" style={{ background: '#0A1628', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="font-semibold text-white mb-1">{label}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#00C4A0' }} />
                    <span style={{ color: '#8A9BB5' }}>Nuevos:</span>
                    <span className="text-white font-medium">{payload[0].value}</span>
                  </div>
                </div>
              );
            }} />
            <Bar dataKey="Nuevos" fill="#00C4A0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Morosos */}
      {morosos.length > 0 && (
        <div className="rounded-2xl p-5" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: '#EF4444' }}>Clientes morosos ({morosos.length})</h2>
          <div className="space-y-2">
            {morosos.map(c => (
              <div key={c.id} className="flex items-center justify-between">
                <Link href={`/admin/clientes/${c.id}`} className="text-sm font-medium text-white hover:underline">{c.nombre}</Link>
                <span className="text-sm" style={{ color: '#EF4444' }}>${ fmt(c.mensualidad)} {c.moneda}/mes</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
