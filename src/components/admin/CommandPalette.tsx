'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface StaticCommand {
  id: string;
  label: string;
  sub: string;
  group: string;
  href: string;
  icon: React.ReactNode;
}

interface ClientResult {
  id: string;
  nombre: string;
  empresa: string;
  estado: string;
  paquete: string;
}

const COMMANDS: StaticCommand[] = [
  { id: 'dashboard', label: 'Dashboard', sub: 'Ver overview', group: 'Navegar', href: '/admin/dashboard', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
  )},
  { id: 'clientes', label: 'Clientes', sub: 'Lista de clientes', group: 'Navegar', href: '/admin/clientes', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )},
  { id: 'pagos', label: 'Pagos', sub: 'Historial de pagos', group: 'Navegar', href: '/admin/pagos', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
  )},
  { id: 'facturas', label: 'Facturas', sub: 'Gestión de facturas', group: 'Navegar', href: '/admin/facturas', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  )},
  { id: 'actividad', label: 'Actividad', sub: 'Historial de cambios', group: 'Navegar', href: '/admin/actividad', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  )},
  { id: 'reportes', label: 'Reportes', sub: 'Análisis y métricas', group: 'Navegar', href: '/admin/reportes', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  )},
  { id: 'nuevo-cliente', label: 'Nuevo cliente', sub: 'Registrar un cliente', group: 'Acciones', href: '/admin/clientes/nuevo', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  )},
  { id: 'nuevo-pago', label: 'Nuevo pago', sub: 'Registrar un pago', group: 'Acciones', href: '/admin/pagos/nuevo', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  )},
];

const ESTADO_DOTS: Record<string, string> = {
  Activo: '#22C55E',
  Moroso: '#EF4444',
  Pausado: '#F59E0B',
  Cancelado: '#6B7280',
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [clients, setClients] = useState<ClientResult[]>([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const clientsCacheRef = useRef<ClientResult[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load all clients once when palette opens
  const loadClients = useCallback(async () => {
    if (clientsCacheRef.current) return;
    setClientsLoading(true);
    try {
      const res = await fetch('/api/admin/clientes-list');
      if (res.ok) {
        const data = await res.json();
        clientsCacheRef.current = data;
        setClients(data);
      }
    } catch {
      // ignore
    } finally {
      setClientsLoading(false);
    }
  }, []);

  const q = query.trim().toLowerCase();

  const filteredCommands = q
    ? COMMANDS.filter(c => c.label.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q))
    : COMMANDS;

  const filteredClients = q.length >= 2
    ? (clientsCacheRef.current ?? clients).filter(c =>
        c.nombre.toLowerCase().includes(q) || c.empresa.toLowerCase().includes(q)
      ).slice(0, 5)
    : [];

  // Flat list for keyboard nav
  const allResults = [
    ...filteredCommands,
    ...filteredClients.map(c => ({ id: c.id, href: `/admin/clientes/${c.id}`, _client: c })),
  ] as any[];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(v => !v);
        setQuery('');
        setSelected(0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
      loadClients();
    }
  }, [open, loadClients]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(v => Math.min(v + 1, allResults.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(v => Math.max(v - 1, 0)); }
      if (e.key === 'Enter') {
        const item = allResults[selected];
        if (item) { router.push(item.href); setOpen(false); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, allResults, selected, router]);

  useEffect(() => { setSelected(0); }, [query]);

  if (!open) return null;

  let globalIdx = -1;

  const GROUPS = ['Navegar', 'Acciones'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(8,18,34,0.98)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 96px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,196,160,0.12), 0 0 40px rgba(0,196,160,0.06)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A9BB5" strokeWidth="2" className="flex-shrink-0">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar clientes, páginas o ejecutar acciones..."
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-600"
          />
          {clientsLoading && (
            <div className="w-3.5 h-3.5 rounded-full border-2 border-transparent animate-spin flex-shrink-0" style={{ borderTopColor: '#00C4A0' }} />
          )}
          <kbd
            className="text-xs px-2 py-1 rounded-md hidden sm:block"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'monospace' }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="py-1.5 max-h-80 overflow-y-auto">
          {allResults.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm" style={{ color: '#4A5568' }}>
              Sin resultados para &ldquo;{query}&rdquo;
            </p>
          ) : (
            <>
              {/* Static commands by group */}
              {GROUPS.map(group => {
                const cmds = filteredCommands.filter(c => c.group === group);
                if (!cmds.length) return null;
                return (
                  <div key={group}>
                    <p className="px-4 pt-3 pb-1 text-xs font-semibold tracking-wider uppercase" style={{ color: '#374151' }}>
                      {group}
                    </p>
                    {cmds.map(cmd => {
                      globalIdx++;
                      const idx = globalIdx;
                      const isActive = selected === idx;
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => { router.push(cmd.href); setOpen(false); }}
                          onMouseEnter={() => setSelected(idx)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                          style={{
                            background: isActive ? 'rgba(0,196,160,0.08)' : 'transparent',
                            borderLeft: isActive ? '2px solid #00C4A0' : '2px solid transparent',
                          }}
                        >
                          <span
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: isActive ? 'rgba(0,196,160,0.15)' : 'rgba(255,255,255,0.05)', color: isActive ? '#00C4A0' : '#8A9BB5' }}
                          >
                            {cmd.icon}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium" style={{ color: isActive ? '#FFFFFF' : '#D1D5DB' }}>{cmd.label}</p>
                            <p className="text-xs truncate" style={{ color: '#6B7280' }}>{cmd.sub}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}

              {/* Dynamic client results */}
              {filteredClients.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-xs font-semibold tracking-wider uppercase" style={{ color: '#374151' }}>
                    Clientes
                  </p>
                  {filteredClients.map(client => {
                    globalIdx++;
                    const idx = globalIdx;
                    const isActive = selected === idx;
                    const dotColor = ESTADO_DOTS[client.estado] ?? '#6B7280';
                    return (
                      <button
                        key={client.id}
                        onClick={() => { router.push(`/admin/clientes/${client.id}`); setOpen(false); }}
                        onMouseEnter={() => setSelected(idx)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                        style={{
                          background: isActive ? 'rgba(0,196,160,0.08)' : 'transparent',
                          borderLeft: isActive ? '2px solid #00C4A0' : '2px solid transparent',
                        }}
                      >
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                          style={{ background: isActive ? 'rgba(0,196,160,0.15)' : 'rgba(255,255,255,0.05)', color: isActive ? '#00C4A0' : '#8A9BB5' }}
                        >
                          {client.nombre.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium" style={{ color: isActive ? '#FFFFFF' : '#D1D5DB' }}>{client.nombre}</p>
                          <p className="text-xs truncate" style={{ color: '#6B7280' }}>
                            {client.empresa && `${client.empresa} · `}{client.paquete}
                          </p>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dotColor }} />
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-4 px-4 py-2.5 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: '#4A5568' }}
        >
          <span className="flex items-center gap-1.5">
            <kbd style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>↑↓</kbd>
            navegar
          </span>
          <span className="flex items-center gap-1.5">
            <kbd style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>↵</kbd>
            abrir
          </span>
          <span className="ml-auto flex items-center gap-1">
            <kbd style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4, fontFamily: 'monospace' }}>⌘K</kbd>
            para cerrar
          </span>
        </div>
      </div>
    </div>
  );
}
