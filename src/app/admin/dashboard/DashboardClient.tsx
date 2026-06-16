'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Cliente, Pago } from '@/lib/notion';

function fmt(n: number) {
  return n.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtDate(d: string) {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${day}/${months[parseInt(m)-1]}/${y}`;
}

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const PAQUETE_COLORS: Record<string, string> = {
  Starter: '#6B7280',
  Esencial: '#3B82F6',
  Profesional: '#00C4A0',
  Premium: '#8B5CF6',
  Enterprise: '#F59E0B',
};

const ESTADO_COLORS: Record<string, { bg: string; text: string }> = {
  Activo: { bg: 'rgba(34,197,94,0.15)', text: '#22C55E' },
  Moroso: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' },
  Pausado: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  Cancelado: { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' },
};

// ─── Sparkline ────────────────────────────────────────────────────────────────

function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const W = 72, H = 24;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 2) - 1;
    return [x, y] as [number, number];
  });
  const linePath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;
  const uid = color.replace('#', 'sg');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${uid})`} />
      <path d={linePath} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2" fill={color} />
    </svg>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KPICard({ title, subtitle, value, value2, accent, icon, sparkData, delta }: {
  title: string; subtitle: string; value: string; value2?: string;
  accent: string; icon: React.ReactNode; sparkData?: number[];
  delta?: number; // % change, positive = up, negative = down
}) {
  const deltaColor = delta !== undefined ? (delta >= 0 ? '#22C55E' : '#EF4444') : undefined;
  const deltaLabel = delta !== undefined
    ? `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}% vs mes ant.`
    : undefined;

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)` }}
      />

      <div className="flex items-center justify-between relative z-10">
        <span className="text-sm font-medium" style={{ color: '#8A9BB5' }}>{title}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}18`, color: accent }}>
          {icon}
        </div>
      </div>

      <div className="relative z-10">
        <div className="text-2xl font-bold text-white">{value}</div>
        {value2 && <div className="text-sm mt-0.5" style={{ color: '#8A9BB5' }}>{value2}</div>}
      </div>

      <div className="flex items-end justify-between relative z-10">
        <div className="flex flex-col gap-1">
          <div className="text-xs" style={{ color: '#8A9BB5' }}>{subtitle}</div>
          {deltaLabel && (
            <div className="text-xs font-medium" style={{ color: deltaColor }}>
              {delta! >= 0 ? '↑' : '↓'} {deltaLabel}
            </div>
          )}
        </div>
        {sparkData && sparkData.length >= 2 && <Sparkline data={sparkData} color={accent} />}
      </div>
    </div>
  );
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────

function MiniCalendar({ year, month, clientes }: { year: number; month: number; clientes: Cliente[] }) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const billingDays: Record<number, Cliente[]> = {};
  clientes.filter(c => c.estado === 'Activo').forEach(c => {
    const day = parseInt(c.fechaCobro || '1', 10);
    if (!billingDays[day]) billingDays[day] = [];
    billingDays[day].push(c);
  });

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
    >
      <div className="text-sm font-semibold text-white mb-4">{MESES[month - 1]} {year}</div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['D','L','M','X','J','V','S'].map(d => (
          <div key={d} className="text-xs font-medium" style={{ color: '#8A9BB5' }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {blanks.map(i => <div key={`b-${i}`} />)}
        {days.map(day => {
          const hasBilling = !!billingDays[day];
          const isToday = new Date().getDate() === day && new Date().getMonth() + 1 === month && new Date().getFullYear() === year;
          return (
            <div
              key={day}
              className="relative flex flex-col items-center justify-center rounded-lg py-1 text-xs cursor-default"
              style={{
                background: isToday ? 'rgba(0,196,160,0.2)' : 'transparent',
                color: isToday ? '#00C4A0' : '#FFFFFF',
                fontWeight: isToday ? '700' : '400',
              }}
              title={hasBilling ? billingDays[day].map(c => `${c.nombre} — $${fmt(c.mensualidad)} ${c.moneda}`).join('\n') : ''}
            >
              {day}
              {hasBilling && <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: '#00C4A0' }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  clientes: Cliente[];
  pagosThisMonth: Pago[];
  mrr: { mxn: number; usd: number };
  cobradoMXN: number;
  cobradoUSD: number;
  cobradoLastMXN: number;
  pendienteMXN: number;
  pendienteUSD: number;
  activosCount: number;
  morosoCount: number;
  pausadoCount: number;
  vencidoCount: number;
  enStripe: number;
  porTransferencia: number;
  currentYear: number;
  currentMonth: number;
}

export default function DashboardClient({
  clientes, pagosThisMonth, mrr, cobradoMXN, cobradoUSD, cobradoLastMXN,
  pendienteMXN, pendienteUSD, activosCount, morosoCount, pausadoCount,
  vencidoCount, enStripe, porTransferencia, currentYear, currentMonth,
}: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'Todos' | 'Activos' | 'Morosos' | 'Pausados'>('Todos');
  const [sortBy, setSortBy] = useState<'nombre' | 'mensualidad' | 'fechaCobro'>('fechaCobro');

  const mesNombre = MESES[currentMonth - 1];

  // % change vs last month
  const cobradoDelta = cobradoLastMXN > 0
    ? ((cobradoMXN - cobradoLastMXN) / cobradoLastMXN) * 100
    : cobradoMXN > 0 ? 100 : undefined;

  // Collection rate
  const totalBillable = cobradoMXN + pendienteMXN;
  const collectionRate = totalBillable > 0 ? Math.round((cobradoMXN / totalBillable) * 100) : 0;

  const cobradoSpark = useMemo(() => {
    const buckets = Array(7).fill(0);
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const bucketSize = Math.ceil(daysInMonth / 7);
    pagosThisMonth
      .filter(p => p.estado === 'Pagado' && p.moneda === 'MXN')
      .forEach(p => {
        if (!p.fechaCobro) return;
        const day = parseInt(p.fechaCobro.split('-')[2] || '1', 10);
        const bucket = Math.min(Math.floor((day - 1) / bucketSize), 6);
        buckets[bucket] += p.monto;
      });
    return buckets;
  }, [pagosThisMonth, currentYear, currentMonth]);

  const pendienteSpark = useMemo(() => {
    const buckets = Array(7).fill(0);
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const bucketSize = Math.ceil(daysInMonth / 7);
    pagosThisMonth
      .filter(p => p.estado === 'Pendiente' && p.moneda === 'MXN')
      .forEach(p => {
        if (!p.fechaCobro) return;
        const day = parseInt(p.fechaCobro.split('-')[2] || '1', 10);
        const bucket = Math.min(Math.floor((day - 1) / bucketSize), 6);
        buckets[bucket] += p.monto;
      });
    return buckets;
  }, [pagosThisMonth, currentYear, currentMonth]);

  const filtered = useMemo(() => {
    let list = [...clientes];
    if (filter === 'Activos') list = list.filter(c => c.estado === 'Activo');
    else if (filter === 'Morosos') list = list.filter(c => c.estado === 'Moroso');
    else if (filter === 'Pausados') list = list.filter(c => c.estado === 'Pausado');
    if (search) list = list.filter(c =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.empresa.toLowerCase().includes(search.toLowerCase())
    );
    list.sort((a, b) => {
      if (sortBy === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (sortBy === 'mensualidad') return b.mensualidad - a.mensualidad;
      return parseInt(a.fechaCobro || '1') - parseInt(b.fechaCobro || '1');
    });
    return list;
  }, [clientes, filter, search, sortBy]);

  const nextBillingDate = (c: Cliente) => {
    const day = parseInt(c.fechaCobro || '1', 10);
    const now = new Date();
    let m = now.getMonth() + 1;
    let y = now.getFullYear();
    if (day <= now.getDate()) {
      m += 1;
      if (m > 12) { m = 1; y += 1; }
    }
    return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Overview</h1>
          <p className="text-sm mt-1" style={{ color: '#8A9BB5' }}>{mesNombre} {currentYear}</p>
        </div>
        <Link
          href="/admin/clientes/nuevo"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: '#00C4A0', color: '#050D1A', boxShadow: '0 0 20px rgba(0,196,160,0.3)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nuevo cliente
        </Link>
      </div>

      {/* Alert banners */}
      {(morosoCount > 0 || vencidoCount > 0) && (
        <div className="flex flex-col gap-2">
          {morosoCount > 0 && (
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: '#EF4444' }} />
              <p className="text-sm" style={{ color: '#EF4444' }}>
                <strong>{morosoCount} cliente{morosoCount !== 1 ? 's' : ''} moroso{morosoCount !== 1 ? 's' : ''}</strong>
                {' '}— con pagos vencidos hace más de 30 días.{' '}
                <button onClick={() => setFilter('Morosos')} className="underline font-medium">Ver clientes</button>
              </p>
            </div>
          )}
          {vencidoCount > 0 && (
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-sm" style={{ color: '#F59E0B' }}>
                <strong>{vencidoCount} pago{vencidoCount !== 1 ? 's' : ''} vencido{vencidoCount !== 1 ? 's' : ''}</strong>
                {' '}este mes sin cobrar.{' '}
                <Link href="/admin/pagos" className="underline font-medium">Ver pagos</Link>
              </p>
            </div>
          )}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          title="MRR Total"
          subtitle="Ingresos recurrentes mensuales"
          value={`$${fmt(mrr.mxn)} MXN`}
          value2={mrr.usd > 0 ? `+ $${fmt(mrr.usd)} USD` : undefined}
          accent="#00C4A0"
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
        />
        <KPICard
          title="Cobrado este mes"
          subtitle={`${mesNombre} ${currentYear}`}
          value={`$${fmt(cobradoMXN)} MXN`}
          value2={cobradoUSD > 0 ? `+ $${fmt(cobradoUSD)} USD` : undefined}
          accent="#22C55E"
          sparkData={cobradoSpark}
          delta={cobradoDelta}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>}
        />
        <KPICard
          title="Por cobrar"
          subtitle="Pendiente este mes"
          value={`$${fmt(pendienteMXN)} MXN`}
          value2={pendienteUSD > 0 ? `+ $${fmt(pendienteUSD)} USD` : undefined}
          accent="#F59E0B"
          sparkData={pendienteSpark}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        />
        <KPICard
          title="Clientes activos"
          subtitle={`${enStripe} Stripe · ${porTransferencia} SPEI`}
          value={String(activosCount)}
          accent="#3B82F6"
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        />
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: 'Tasa de cobro',
            value: `${collectionRate}%`,
            color: collectionRate >= 80 ? '#22C55E' : collectionRate >= 50 ? '#F59E0B' : '#EF4444',
            hint: `${fmt(cobradoMXN)} / ${fmt(totalBillable)} MXN`,
          },
          {
            label: 'Pagos vencidos',
            value: String(vencidoCount),
            color: vencidoCount === 0 ? '#22C55E' : '#EF4444',
            hint: vencidoCount === 0 ? 'Todo al día' : 'Requieren atención',
          },
          {
            label: 'Morosos',
            value: String(morosoCount),
            color: morosoCount === 0 ? '#22C55E' : '#EF4444',
            hint: morosoCount === 0 ? 'Sin clientes morosos' : `+30 días sin pago`,
          },
          {
            label: 'Pausados',
            value: String(pausadoCount),
            color: pausadoCount === 0 ? '#8A9BB5' : '#F59E0B',
            hint: pausadoCount === 0 ? 'Ninguno pausado' : 'Sin cobros activos',
          },
        ].map(m => (
          <div
            key={m.label}
            className="rounded-xl px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-xs mb-1" style={{ color: '#8A9BB5' }}>{m.label}</p>
            <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}</p>
            <p className="text-xs mt-0.5" style={{ color: '#4A5568' }}>{m.hint}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Client table */}
        <div className="xl:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8A9BB5' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(0,196,160,0.4)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>
            <div className="flex gap-1 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {(['Todos','Activos','Morosos','Pausados'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{ background: filter === f ? 'rgba(0,196,160,0.15)' : 'transparent', color: filter === f ? '#00C4A0' : '#8A9BB5' }}
                >
                  {f}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#8A9BB5' }}
            >
              <option value="fechaCobro" style={{ background: '#0A1628' }}>Ordenar: Día cobro</option>
              <option value="nombre" style={{ background: '#0A1628' }}>Ordenar: Nombre</option>
              <option value="mensualidad" style={{ background: '#0A1628' }}>Ordenar: Monto</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div
              className="rounded-2xl p-12 flex flex-col items-center justify-center text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,196,160,0.1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C4A0" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                </svg>
              </div>
              <p className="text-white font-semibold mb-2">No tienes clientes registrados</p>
              <p className="text-sm mb-4" style={{ color: '#8A9BB5' }}>Comienza registrando tu primer cliente</p>
              <Link href="/admin/clientes/nuevo" className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: '#00C4A0', color: '#050D1A' }}>
                Registrar primer cliente →
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['Cliente','Paquete','Mensualidad','Próximo cobro','Estado','Método','Acciones'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-medium" style={{ color: '#8A9BB5' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c, i) => {
                      const estadoStyle = ESTADO_COLORS[c.estado] ?? { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' };
                      const paqueteColor = PAQUETE_COLORS[c.paquete] ?? '#6B7280';
                      const nextDate = nextBillingDate(c);
                      return (
                        <tr
                          key={c.id}
                          style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {c.estado === 'Moroso' && (
                                <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: '#EF4444' }} />
                              )}
                              <div>
                                <div className="font-medium text-white">{c.nombre}</div>
                                {c.empresa && <div className="text-xs" style={{ color: '#8A9BB5' }}>{c.empresa}</div>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: `${paqueteColor}20`, color: paqueteColor }}>
                              {c.paquete}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-white">
                            ${fmt(c.mensualidad)} <span style={{ color: '#8A9BB5' }}>{c.moneda}</span>
                          </td>
                          <td className="px-4 py-3 text-xs" style={{ color: '#8A9BB5' }}>{fmtDate(nextDate)}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: estadoStyle.bg, color: estadoStyle.text }}>
                              {c.estado}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {c.metodoPago === 'Stripe' ? (
                              <span className="text-xs font-medium" style={{ color: '#6772E5' }}>Stripe</span>
                            ) : c.metodoPago === 'Transferencia SPEI' ? (
                              <span className="text-xs font-medium" style={{ color: '#3B82F6' }}>SPEI</span>
                            ) : (
                              <span className="text-xs" style={{ color: '#8A9BB5' }}>{c.metodoPago}</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Link href={`/admin/clientes/${c.id}`} className="text-xs font-medium" style={{ color: '#00C4A0' }}>Ver</Link>
                              <span style={{ color: '#8A9BB5' }}>·</span>
                              <Link href={`/admin/clientes/${c.id}#pagos`} className="text-xs" style={{ color: '#8A9BB5' }}>Pagos</Link>
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
                {filtered.map(c => {
                  const estadoStyle = ESTADO_COLORS[c.estado] ?? { bg: 'rgba(107,114,128,0.15)', text: '#6B7280' };
                  const paqueteColor = PAQUETE_COLORS[c.paquete] ?? '#6B7280';
                  return (
                    <div key={c.id} className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">{c.nombre}</div>
                          {c.empresa && <div className="text-xs" style={{ color: '#8A9BB5' }}>{c.empresa}</div>}
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: estadoStyle.bg, color: estadoStyle.text }}>{c.estado}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${paqueteColor}20`, color: paqueteColor }}>{c.paquete}</span>
                        <span className="font-medium text-white">${fmt(c.mensualidad)} {c.moneda}</span>
                        <span style={{ color: '#8A9BB5' }}>Día {c.fechaCobro}</span>
                      </div>
                      <Link href={`/admin/clientes/${c.id}`} className="text-xs font-medium" style={{ color: '#00C4A0' }}>Ver detalle →</Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Mini calendar */}
        <div className="xl:col-span-1">
          <MiniCalendar year={currentYear} month={currentMonth} clientes={clientes} />
        </div>
      </div>
    </div>
  );
}
