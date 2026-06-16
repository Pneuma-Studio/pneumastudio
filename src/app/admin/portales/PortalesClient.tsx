'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const STAGES = [
  { key: 'propuesta', label: 'Propuesta' },
  { key: 'diseno', label: 'Diseño' },
  { key: 'desarrollo', label: 'Desarrollo' },
  { key: 'qa', label: 'QA' },
  { key: 'lanzamiento', label: 'Lanzamiento' },
];

interface Portal {
  id: string;
  token: string;
  client_name: string;
  project_name: string;
  stage: string;
  preview_url: string | null;
  notas: string | null;
  client_email: string | null;
  notion_client_id: string | null;
  created_at: string;
}

interface NotionClient {
  id: string;
  nombre: string;
  empresa: string;
  email: string;
}

const STAGE_COLORS: Record<string, string> = {
  propuesta: '#8A9BB5',
  diseno: '#3B82F6',
  desarrollo: '#F59E0B',
  qa: '#8B5CF6',
  lanzamiento: '#00C4A0',
};

function ClientSearch({ value, onSelect }: {
  value: string;
  onSelect: (client: { name: string; email: string; id: string } | null) => void;
}) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<NotionClient[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function search(q: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!q.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/clientes-search?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const data: NotionClient[] = await res.json();
          setResults(data);
          setOpen(true);
        }
      } finally {
        setLoading(false);
      }
    }, 300);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    onSelect(null);
    search(q);
  }

  function pickClient(c: NotionClient) {
    setQuery(c.nombre);
    setOpen(false);
    onSelect({ name: c.nombre, email: c.email, id: c.id });
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          value={query}
          onChange={handleChange}
          onFocus={() => query && setOpen(true)}
          placeholder="Buscar cliente en Notion..."
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white pr-8"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#00C4A0' }} />
          </div>
        )}
      </div>
      {open && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20"
          style={{ background: '#0D1E38', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          {results.map(c => (
            <button
              key={c.id}
              onClick={() => pickClient(c)}
              className="w-full text-left px-4 py-2.5 text-sm transition-colors"
              style={{ color: '#fff' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <div className="font-500">{c.nombre}</div>
              {(c.empresa || c.email) && (
                <div className="text-xs mt-0.5" style={{ color: '#8A9BB5' }}>
                  {c.empresa || c.email}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PortalesClient() {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Portal | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notionClientId, setNotionClientId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [stage, setStage] = useState('propuesta');
  const [previewUrl, setPreviewUrl] = useState('');
  const [notas, setNotas] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchPortals = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/portales');
      if (res.ok) setPortals(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPortals(); }, [fetchPortals]);

  function openCreate() {
    setEditing(null);
    setClientName('');
    setClientEmail('');
    setNotionClientId('');
    setProjectName('');
    setStage('propuesta');
    setPreviewUrl('');
    setNotas('');
    setError('');
    setShowForm(true);
  }

  function openEdit(portal: Portal) {
    setEditing(portal);
    setClientName(portal.client_name);
    setClientEmail(portal.client_email ?? '');
    setNotionClientId(portal.notion_client_id ?? '');
    setProjectName(portal.project_name);
    setStage(portal.stage);
    setPreviewUrl(portal.preview_url ?? '');
    setNotas(portal.notas ?? '');
    setError('');
    setShowForm(true);
  }

  async function save() {
    if (!clientName.trim() || !projectName.trim()) {
      setError('Nombre de cliente y proyecto son requeridos');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (editing) {
        const res = await fetch(`/api/admin/portales/${editing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stage, preview_url: previewUrl, notas }),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        const updated = await res.json();
        setPortals(prev => prev.map(p => p.id === updated.id ? updated : p));
      } else {
        const res = await fetch('/api/admin/portales', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_name: clientName,
            project_name: projectName,
            stage,
            preview_url: previewUrl,
            notas,
            client_email: clientEmail,
            notion_client_id: notionClientId,
          }),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        const created = await res.json();
        setPortals(prev => [created, ...prev]);
      }
      setShowForm(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deletePortal(portal: Portal) {
    if (!confirm(`¿Eliminar el portal de ${portal.client_name}? Esta acción no se puede deshacer.`)) return;
    const res = await fetch(`/api/admin/portales/${portal.id}`, { method: 'DELETE' });
    if (res.ok) setPortals(prev => prev.filter(p => p.id !== portal.id));
  }

  function copyLink(token: string) {
    const url = `${window.location.origin}/portal/${token}`;
    navigator.clipboard.writeText(url);
    setCopied(token);
    setTimeout(() => setCopied(null), 2000);
  }

  const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Portales de Cliente</h1>
          <p className="text-sm" style={{ color: '#8A9BB5' }}>
            Genera un link privado para que cada cliente vea el avance de su proyecto.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-600"
          style={{ background: '#00C4A0', color: '#050D1A' }}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
          Nuevo portal
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-5 h-5 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#00C4A0' }} />
        </div>
      ) : portals.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-white font-600 mb-2">Sin portales todavía</p>
          <p className="text-sm mb-6" style={{ color: '#8A9BB5' }}>Crea el primer portal para un cliente.</p>
          <button
            onClick={openCreate}
            className="px-5 py-2.5 rounded-xl text-sm font-600"
            style={{ background: 'rgba(0,196,160,0.1)', color: '#00C4A0', border: '1px solid rgba(0,196,160,0.25)' }}
          >
            Crear portal
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {portals.map((portal) => {
            const stageColor = STAGE_COLORS[portal.stage] ?? '#8A9BB5';
            const stageLabel = STAGES.find(s => s.key === portal.stage)?.label ?? portal.stage;
            return (
              <div
                key={portal.id}
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-base font-700 text-white">{portal.project_name}</span>
                      <span
                        className="text-xs font-600 px-2 py-0.5 rounded-full"
                        style={{ background: `${stageColor}18`, color: stageColor, border: `1px solid ${stageColor}35` }}
                      >
                        {stageLabel}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: '#8A9BB5' }}>
                      {portal.client_name}
                      {portal.client_email && (
                        <span style={{ color: 'rgba(138,155,181,0.5)' }}> · {portal.client_email}</span>
                      )}
                    </p>
                    {portal.preview_url && (
                      <a
                        href={portal.preview_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs mt-1 inline-block truncate max-w-xs"
                        style={{ color: '#00C4A0' }}
                      >
                        {portal.preview_url}
                      </a>
                    )}
                    {portal.notas && (
                      <p className="text-xs mt-1 line-clamp-1" style={{ color: 'rgba(138,155,181,0.6)' }}>
                        📝 {portal.notas}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Copy link */}
                    <button
                      onClick={() => copyLink(portal.token)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-600 transition-all"
                      style={{
                        background: copied === portal.token ? 'rgba(0,196,160,0.15)' : 'rgba(255,255,255,0.06)',
                        color: copied === portal.token ? '#00C4A0' : '#8A9BB5',
                        border: copied === portal.token ? '1px solid rgba(0,196,160,0.3)' : '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {copied === portal.token ? (
                        <>
                          <svg viewBox="0 0 12 10" fill="none" className="w-3 h-2.5">
                            <path d="M1 5l3 3.5L11 1" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Copiado
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                            <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth={1.5} />
                            <path d="M11 5V4a2 2 0 00-2-2H4a2 2 0 00-2 2v5a2 2 0 002 2h1" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                          </svg>
                          Copiar link
                        </>
                      )}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => openEdit(portal)}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}
                      title="Editar"
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                        <path d="M11.5 2.5a1.5 1.5 0 012.12 2.12l-8.5 8.5-2.83.71.71-2.83 8.5-8.5z" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deletePortal(portal)}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}
                      title="Eliminar"
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                        <path d="M2 4h12M5 4V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5V4M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Stage steps mini */}
                <div className="flex items-center gap-1 mt-4">
                  {STAGES.map((s, i) => {
                    const currentIdx = STAGES.findIndex(x => x.key === portal.stage);
                    const done = i < currentIdx;
                    const active = i === currentIdx;
                    return (
                      <div key={s.key} className="flex items-center gap-1 flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div
                            className="w-full h-1.5 rounded-full"
                            style={{
                              background: done ? '#00C4A0' : active ? 'rgba(0,196,160,0.4)' : 'rgba(255,255,255,0.06)',
                            }}
                          />
                          <span className="text-xs mt-1" style={{ color: active ? '#fff' : done ? '#00C4A0' : '#8A9BB5', fontSize: '9px' }}>
                            {s.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            style={{ background: '#0A1628', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <h3 className="text-base font-bold text-white">
              {editing ? 'Editar portal' : 'Nuevo portal de cliente'}
            </h3>

            {!editing && (
              <>
                <div>
                  <label className="block text-xs font-600 mb-1.5" style={{ color: '#8A9BB5' }}>
                    Cliente <span style={{ color: 'rgba(138,155,181,0.5)' }}>(busca en Notion o escribe manualmente)</span>
                  </label>
                  <ClientSearch
                    value={clientName}
                    onSelect={c => {
                      if (c) {
                        setClientName(c.name);
                        setClientEmail(c.email);
                        setNotionClientId(c.id);
                      } else {
                        setNotionClientId('');
                      }
                    }}
                  />
                  {!notionClientId && (
                    <input
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      placeholder="o escribe el nombre manualmente..."
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white mt-2"
                      style={inputStyle}
                    />
                  )}
                  {notionClientId && (
                    <p className="text-xs mt-1" style={{ color: '#00C4A0' }}>
                      ✓ Vinculado a Notion · {clientEmail}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-600 mb-1.5" style={{ color: '#8A9BB5' }}>
                    Email del cliente{' '}
                    <span style={{ color: 'rgba(138,155,181,0.5)' }}>(para notificaciones de etapa)</span>
                  </label>
                  <input
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    placeholder="cliente@email.com"
                    type="email"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-xs font-600 mb-1.5" style={{ color: '#8A9BB5' }}>Nombre del proyecto</label>
                  <input
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    placeholder="ej. Tienda en línea Bellísima"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white"
                    style={inputStyle}
                  />
                </div>
              </>
            )}

            {editing && (
              <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-sm font-600 text-white">{editing.project_name}</p>
                <p className="text-xs" style={{ color: '#8A9BB5' }}>{editing.client_name}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-600 mb-1.5" style={{ color: '#8A9BB5' }}>Etapa actual</label>
              <div className="grid grid-cols-5 gap-1.5">
                {STAGES.map(s => (
                  <button
                    key={s.key}
                    onClick={() => setStage(s.key)}
                    className="py-2 rounded-lg text-xs font-600 transition-all"
                    style={{
                      background: stage === s.key ? 'rgba(0,196,160,0.15)' : 'rgba(255,255,255,0.04)',
                      border: stage === s.key ? '1px solid rgba(0,196,160,0.4)' : '1px solid rgba(255,255,255,0.08)',
                      color: stage === s.key ? '#00C4A0' : '#8A9BB5',
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-600 mb-1.5" style={{ color: '#8A9BB5' }}>
                URL de vista previa <span style={{ color: 'rgba(138,155,181,0.5)' }}>(opcional)</span>
              </label>
              <input
                value={previewUrl}
                onChange={e => setPreviewUrl(e.target.value)}
                placeholder="https://preview.vercel.app/..."
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-xs font-600 mb-1.5" style={{ color: '#8A9BB5' }}>
                Notas internas <span style={{ color: 'rgba(138,155,181,0.5)' }}>(solo tú las ves)</span>
              </label>
              <textarea
                value={notas}
                onChange={e => setNotas(e.target.value)}
                rows={3}
                placeholder="Notas sobre el proyecto, acuerdos, pendientes..."
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white resize-none"
                style={inputStyle}
              />
            </div>

            {error && (
              <p className="text-xs px-3 py-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl text-sm font-600 disabled:opacity-40 flex items-center justify-center gap-2"
                style={{ background: '#00C4A0', color: '#050D1A' }}
              >
                {saving && <div className="w-3.5 h-3.5 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#050D1A' }} />}
                {saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear portal'}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-xl text-sm"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
