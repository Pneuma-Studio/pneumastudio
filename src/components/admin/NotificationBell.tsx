'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Notification {
  type: string;
  count: number;
  label: string;
  color: string;
}

const LINKS: Record<string, string> = {
  moroso: '/admin/clientes',
  vencido: '/admin/pagos',
  lead: '/admin/leads',
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/admin/notifications')
      .then(r => r.ok ? r.json() : { notifications: [], total: 0 })
      .then(d => { setItems(d.notifications ?? []); setTotal(d.total ?? 0); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all"
        style={{
          background: open ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#8A9BB5',
        }}
        title="Notificaciones"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {!loading && total > 0 && (
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full font-bold"
            style={{ background: '#EF4444', color: '#fff', fontSize: '9px' }}
          >
            {total > 9 ? '9+' : total}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-11 w-72 rounded-2xl shadow-xl z-50"
          style={{ background: '#0A1628', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs font-semibold text-white">Alertas</p>
          </div>
          <div className="py-2">
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="w-4 h-4 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#00C4A0' }} />
              </div>
            ) : items.length === 0 ? (
              <div className="px-4 py-4 text-xs text-center" style={{ color: '#8A9BB5' }}>
                Sin alertas pendientes ✓
              </div>
            ) : (
              items.map((n, i) => (
                <Link
                  key={n.type}
                  href={LINKS[n.type] ?? '/admin/dashboard'}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 transition-colors"
                  style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: n.color }} />
                  <span className="flex-1 text-sm text-white">{n.label}</span>
                  <span className="text-xs font-bold" style={{ color: n.color }}>{n.count}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
