'use client';

import { useState, useEffect, useCallback } from 'react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string | null;
  status: string;
  source: string;
  created_at: string;
}

const COLUMNS = [
  { key: 'nuevo', label: 'Nuevo', color: '#3B82F6' },
  { key: 'contactado', label: 'Contactado', color: '#F59E0B' },
  { key: 'propuesta', label: 'Propuesta', color: '#8B5CF6' },
  { key: 'cerrado', label: 'Cerrado', color: '#22C55E' },
  { key: 'perdido', label: 'Perdido', color: '#EF4444' },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'hoy';
  if (days === 1) return 'ayer';
  if (days < 7) return `hace ${days} días`;
  return new Date(dateStr).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

function LeadModal({ lead, onClose, onUpdate }: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (updated: Lead) => void;
}) {
  const [saving, setSaving] = useState(false);

  async function moveTo(status: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) onUpdate(await res.json());
    } finally {
      setSaving(false);
    }
  }

  async function deleteLead() {
    if (!confirm(`¿Eliminar el lead de ${lead.name}?`)) return;
    await fetch(`/api/admin/leads/${lead.id}`, { method: 'DELETE' });
    onClose();
    onUpdate({ ...lead, id: '' });
  }

  const col = COLUMNS.find(c => c.key === lead.status);
  const waLink = lead.phone
    ? `https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${lead.name}, soy Nazre de Pneuma Studio. Vi tu solicitud y me gustaría platicar contigo.`)}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: '#0A1628', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">{lead.name}</h3>
              {lead.company && <p className="text-sm" style={{ color: '#8A9BB5' }}>{lead.company}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {col && (
                <span
                  className="text-xs font-600 px-2.5 py-1 rounded-full"
                  style={{ background: `${col.color}20`, color: col.color, border: `1px solid ${col.color}35` }}
                >
                  {col.label}
                </span>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          {/* Contact info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs mb-0.5" style={{ color: '#8A9BB5' }}>Email</div>
              <a href={`mailto:${lead.email}`} className="text-white hover:underline">{lead.email}</a>
            </div>
            {lead.phone && (
              <div>
                <div className="text-xs mb-0.5" style={{ color: '#8A9BB5' }}>Teléfono</div>
                <div className="text-white">{lead.phone}</div>
              </div>
            )}
            {lead.service && (
              <div>
                <div className="text-xs mb-0.5" style={{ color: '#8A9BB5' }}>Servicio</div>
                <div className="text-white">{lead.service}</div>
              </div>
            )}
            {lead.budget && (
              <div>
                <div className="text-xs mb-0.5" style={{ color: '#8A9BB5' }}>Presupuesto</div>
                <div style={{ color: '#00C4A0' }} className="font-600">{lead.budget}</div>
              </div>
            )}
            <div>
              <div className="text-xs mb-0.5" style={{ color: '#8A9BB5' }}>Fuente</div>
              <div className="text-white capitalize">{lead.source}</div>
            </div>
            <div>
              <div className="text-xs mb-0.5" style={{ color: '#8A9BB5' }}>Fecha</div>
              <div className="text-white">
                {new Date(lead.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>

          {lead.message && (
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-xs mb-2" style={{ color: '#8A9BB5' }}>Mensaje</div>
              <p className="text-sm text-white" style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{lead.message}</p>
            </div>
          )}

          {/* Quick actions */}
          <div className="flex gap-2 flex-wrap">
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-600"
              style={{ background: 'rgba(0,196,160,0.12)', color: '#00C4A0', border: '1px solid rgba(0,196,160,0.25)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                <path d="M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth={1.3} />
                <path d="M2 4l6 5 6-5" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
              </svg>
              Email
            </a>
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-600"
                style={{ background: 'rgba(37,211,102,0.12)', color: '#25D366', border: '1px solid rgba(37,211,102,0.25)' }}
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M8 0C3.6 0 0 3.6 0 8c0 1.4.4 2.8 1 4L0 16l4.1-.9C5.3 15.6 6.6 16 8 16c4.4 0 8-3.6 8-8s-3.6-8-8-8zm3.9 11.3c-.2.5-1 1-1.4 1-.4.1-.8.1-1.2 0-.4-.1-.9-.3-1.6-.6-1.8-.8-3-2.6-3.1-2.7-.1-.2-.9-1.2-.9-2.3 0-1.1.6-1.7.8-1.9.2-.2.4-.3.6-.3h.4c.2 0 .4 0 .5.4.2.4.7 1.7.7 1.8.1.1.1.3 0 .4-.1.1-.1.2-.3.4l-.3.3c-.1.1-.2.3-.1.5.1.2.6 1 1.3 1.7.9.8 1.7 1.1 1.9 1.2.2.1.4.1.5-.1.1-.2.5-.7.7-.9.2-.2.4-.2.6-.1l1.9.9c.2.1.4.2.5.3.1.1 0 .7-.2 1.2z" />
                </svg>
                WhatsApp
              </a>
            )}
          </div>

          {/* Move to status */}
          <div>
            <div className="text-xs font-600 mb-2" style={{ color: '#8A9BB5' }}>MOVER A</div>
            <div className="flex flex-wrap gap-2">
              {COLUMNS.filter(c => c.key !== lead.status).map(c => (
                <button
                  key={c.key}
                  onClick={() => moveTo(c.key)}
                  disabled={saving}
                  className="px-3 py-1.5 rounded-lg text-xs font-600 disabled:opacity-50 transition-all"
                  style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}30` }}
                >
                  → {c.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={deleteLead}
            className="text-xs"
            style={{ color: '#EF4444' }}
          >
            Eliminar lead
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      if (res.ok) setLeads(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  function handleUpdate(updated: Lead) {
    if (!updated.id) {
      setLeads(prev => prev.filter(l => l.id !== selected?.id));
      setSelected(null);
    } else {
      setLeads(prev => prev.map(l => l.id === updated.id ? updated : l));
      setSelected(updated);
    }
  }

  const total = leads.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Pipeline de Leads</h1>
        <p className="text-sm mt-1" style={{ color: '#8A9BB5' }}>
          {total} prospecto{total !== 1 ? 's' : ''} en total
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#00C4A0' }} />
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4" style={{ minWidth: `${COLUMNS.length * 280}px` }}>
            {COLUMNS.map(col => {
              const colLeads = leads.filter(l => l.status === col.key);
              return (
                <div
                  key={col.key}
                  className="flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    width: 280,
                    minWidth: 280,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Column header */}
                  <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                      <span className="text-sm font-600 text-white">{col.label}</span>
                    </div>
                    <span
                      className="text-xs font-700 px-2 py-0.5 rounded-full"
                      style={{ background: `${col.color}18`, color: col.color }}
                    >
                      {colLeads.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="flex flex-col gap-2 p-3 flex-1">
                    {colLeads.length === 0 ? (
                      <div className="flex items-center justify-center py-8">
                        <p className="text-xs" style={{ color: 'rgba(138,155,181,0.4)' }}>Sin leads</p>
                      </div>
                    ) : colLeads.map(lead => (
                      <button
                        key={lead.id}
                        onClick={() => setSelected(lead)}
                        className="text-left w-full rounded-xl p-3 transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${col.color}40`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
                      >
                        <div className="font-600 text-sm text-white truncate">{lead.name}</div>
                        {lead.company && (
                          <div className="text-xs truncate mt-0.5" style={{ color: '#8A9BB5' }}>{lead.company}</div>
                        )}
                        <div className="flex items-center justify-between mt-2 gap-2">
                          {lead.service && (
                            <span className="text-xs truncate" style={{ color: '#8A9BB5' }}>{lead.service}</span>
                          )}
                          {lead.budget && (
                            <span className="text-xs font-600 shrink-0" style={{ color: '#00C4A0' }}>{lead.budget}</span>
                          )}
                        </div>
                        <div className="text-xs mt-2" style={{ color: 'rgba(138,155,181,0.5)' }}>
                          {timeAgo(lead.created_at)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selected && (
        <LeadModal
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
