'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface AuditEntry {
  id: string;
  entity_type: string;
  entity_id: string;
  entity_name: string;
  action: string;
  details: Record<string, any>;
  created_at: string;
}

const ACTION_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  create: { label: 'Creado', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  update: { label: 'Actualizado', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  delete: { label: 'Eliminado', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
};

const ENTITY_ICONS: Record<string, React.ReactNode> = {
  cliente: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    </svg>
  ),
  pago: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Hace un momento';
  if (mins < 60) return `Hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `Hace ${days}d`;
  return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function getEntityHref(entry: AuditEntry): string | null {
  if (entry.entity_type === 'cliente') return `/admin/clientes/${entry.entity_id}`;
  return null;
}

function buildChangeDescription(details: Record<string, any>): string {
  if (!details?.changes) return '';
  const changes = Object.entries(details.changes as Record<string, { from: any; to: any }>);
  if (changes.length === 0) return '';
  return changes
    .slice(0, 3)
    .map(([key, { from, to }]) => `${key}: ${from ?? '—'} → ${to ?? '—'}`)
    .join(' · ');
}

function groupByDate(entries: AuditEntry[]): [string, AuditEntry[]][] {
  const groups: Record<string, AuditEntry[]> = {};
  for (const entry of entries) {
    const dateKey = new Date(entry.created_at).toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' });
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(entry);
  }
  return Object.entries(groups);
}

export default function ActividadClient() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [typeFilter, setTypeFilter] = useState('Todos');
  const LIMIT = 50;

  const fetchEntries = useCallback(async (off = 0) => {
    setLoading(true);
    const params = new URLSearchParams({ limit: String(LIMIT), offset: String(off) });
    if (typeFilter !== 'Todos') params.set('type', typeFilter.toLowerCase());
    const res = await fetch(`/api/admin/audit?${params}`);
    if (res.ok) {
      const { data, total: t } = await res.json();
      setEntries(off === 0 ? data : prev => [...prev, ...data]);
      setTotal(t);
      setOffset(off);
    }
    setLoading(false);
  }, [typeFilter]);

  useEffect(() => { fetchEntries(0); }, [fetchEntries]);

  const grouped = groupByDate(entries);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Historial de actividad</h1>
          <p className="text-sm mt-1" style={{ color: '#8A9BB5' }}>
            {loading ? 'Cargando...' : `${total} eventos registrados`}
          </p>
        </div>
        {/* Type filter */}
        <div className="flex gap-1 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {['Todos', 'Cliente', 'Pago'].map(f => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: typeFilter === f ? 'rgba(0,196,160,0.15)' : 'transparent',
                color: typeFilter === f ? '#00C4A0' : '#8A9BB5',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading && entries.length === 0 ? (
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#00C4A0' }} />
        </div>
      ) : entries.length === 0 ? (
        <div
          className="rounded-2xl p-16 text-center"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(0,196,160,0.1)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00C4A0" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <p className="text-white font-semibold mb-1">Sin actividad registrada</p>
          <p className="text-sm" style={{ color: '#8A9BB5' }}>Las acciones que hagas en el panel quedarán registradas aquí.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(([date, dayEntries]) => (
            <div key={date}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#4A5568' }}>
                {formatDate(dayEntries[0].created_at)}
              </p>
              <div
                className="rounded-2xl overflow-hidden divide-y"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {dayEntries.map(entry => {
                  const action = ACTION_LABELS[entry.action] ?? { label: entry.action, color: '#8A9BB5', bg: 'rgba(138,155,181,0.15)' };
                  const href = getEntityHref(entry);
                  const changeDesc = buildChangeDescription(entry.details);
                  return (
                    <div
                      key={entry.id}
                      className="flex items-start gap-4 px-5 py-4"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      {/* Entity icon */}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}
                      >
                        {ENTITY_ICONS[entry.entity_type] ?? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                          </svg>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ background: action.bg, color: action.color }}
                          >
                            {action.label}
                          </span>
                          <span className="text-xs capitalize" style={{ color: '#8A9BB5' }}>{entry.entity_type}</span>
                          {href ? (
                            <Link href={href} className="text-sm font-medium text-white hover:underline truncate">
                              {entry.entity_name}
                            </Link>
                          ) : (
                            <span className="text-sm font-medium text-white truncate">{entry.entity_name}</span>
                          )}
                        </div>
                        {changeDesc && (
                          <p className="text-xs mt-1 truncate" style={{ color: '#6B7280' }}>{changeDesc}</p>
                        )}
                      </div>

                      {/* Time */}
                      <span className="text-xs flex-shrink-0 mt-1" style={{ color: '#4A5568' }}>
                        {timeAgo(entry.created_at)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Load more */}
          {entries.length < total && (
            <div className="flex justify-center">
              <button
                onClick={() => fetchEntries(offset + LIMIT)}
                disabled={loading}
                className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {loading ? 'Cargando...' : `Cargar más (${total - entries.length} restantes)`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
