'use client';

import { useState, useEffect, useCallback } from 'react';

const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAYS_ES = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const EVENT_COLORS = ['#00C4A0','#3B82F6','#8B5CF6','#F59E0B','#EC4899','#EF4444'];

interface CalendarEvent {
  id: string;
  nombre: string;
  fecha: string;
}

interface SlotInfo {
  id: string;
  total_slots: number;
  taken_slots: number;
}

export default function DisponibilidadClient() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [slot, setSlot] = useState<SlotInfo>({ id: '', total_slots: 5, taken_slots: 0 });
  const [loading, setLoading] = useState(true);
  const [addDay, setAddDay] = useState<number | null>(null);
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');

  const monthLabel = `${MONTHS_ES[viewMonth]} ${viewYear}`;
  const isCurrentMonth = viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const fetchData = useCallback(async (month: number, year: number) => {
    setLoading(true);
    const label = `${MONTHS_ES[month]} ${year}`;
    try {
      const [evRes, slotsRes] = await Promise.all([
        fetch(`/api/admin/disponibilidad/calendar?mes=${encodeURIComponent(label)}`),
        fetch('/api/admin/disponibilidad'),
      ]);
      if (evRes.ok) setEvents(await evRes.json());
      if (slotsRes.ok) {
        const allSlots: Array<SlotInfo & { month_label: string; is_active: boolean }> = await slotsRes.json();
        const match = allSlots.find(s => s.month_label === label && s.is_active);
        setSlot(match ?? { id: '', total_slots: 5, taken_slots: 0 });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(viewMonth, viewYear); }, [viewMonth, viewYear, fetchData]);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  async function updateTotalSlots(delta: number) {
    const newTotal = slot.total_slots + delta;
    if (newTotal < 1 || newTotal < slot.taken_slots) return;
    const optimistic = { ...slot, total_slots: newTotal };
    setSlot(optimistic);

    if (slot.id) {
      const res = await fetch(`/api/admin/disponibilidad/${slot.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total_slots: newTotal }),
      });
      if (res.ok) { const d = await res.json(); setSlot(s => ({ ...s, total_slots: d.total_slots })); }
      else setSlot(slot);
    } else {
      const res = await fetch('/api/admin/disponibilidad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ month_label: monthLabel, total_slots: newTotal, taken_slots: 0 }),
      });
      if (res.ok) { const d = await res.json(); setSlot({ id: d.id, total_slots: d.total_slots, taken_slots: d.taken_slots }); }
      else setSlot(slot);
    }
  }

  async function addEvent() {
    if (!newName.trim() || addDay === null) return;
    setAdding(true);
    setAddError('');
    try {
      const fecha = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(addDay).padStart(2, '0')}`;
      const res = await fetch('/api/admin/disponibilidad/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: newName.trim(), fecha }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Error al agendar');
      const ev: CalendarEvent = await res.json();
      setEvents(prev => [...prev, ev].sort((a, b) => a.fecha.localeCompare(b.fecha)));
      setSlot(s => ({ ...s, taken_slots: s.taken_slots + 1 }));
      setAddDay(null);
      setNewName('');
    } catch (err: any) {
      setAddError(err.message);
    } finally {
      setAdding(false);
    }
  }

  async function removeEvent(id: string) {
    if (!confirm('¿Eliminar este proyecto del calendario?')) return;
    setEvents(prev => prev.filter(e => e.id !== id));
    setSlot(s => ({ ...s, taken_slots: Math.max(0, s.taken_slots - 1) }));
    await fetch('/api/admin/disponibilidad/calendar', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  }

  // Build calendar grid cells
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const available = slot.total_slots - slot.taken_slots;
  const isCritical = available <= 1;
  const accentColor = isCritical ? '#ef4444' : '#00C4A0';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Disponibilidad</h1>
        <p className="text-sm" style={{ color: '#8A9BB5' }}>
          Agenda proyectos en el calendario. La barra pública se actualiza sola.
        </p>
      </div>

      {/* Availability bar */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${isCritical ? 'rgba(239,68,68,0.25)' : 'rgba(0,196,160,0.2)'}`,
        }}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: accentColor }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: accentColor }} />
            </span>
            <span className="text-sm font-600 text-white">{monthLabel}</span>
            {isCurrentMonth && (
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,196,160,0.1)', color: '#00C4A0' }}>
                Mes actual · público
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: '#8A9BB5' }}>Capacidad máx.</span>
            <button
              onClick={() => updateTotalSlots(-1)}
              disabled={slot.total_slots <= slot.taken_slots + 1}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold disabled:opacity-30"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#FFF' }}
            >−</button>
            <span className="w-7 text-center text-sm font-bold text-white">{slot.total_slots}</span>
            <button
              onClick={() => updateTotalSlots(1)}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#FFF' }}
            >+</button>
          </div>
        </div>

        <div className="flex gap-1.5 mb-3">
          {Array.from({ length: slot.total_slots }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-7 rounded-lg"
              style={{
                background: i < slot.taken_slots ? 'rgba(255,255,255,0.1)' : `${accentColor}1A`,
                border: i < slot.taken_slots ? '1px solid rgba(255,255,255,0.12)' : `1px solid ${accentColor}40`,
              }}
            />
          ))}
        </div>

        <p className="text-xs" style={{ color: accentColor }}>
          {available} de {slot.total_slots} {available === 1 ? 'lugar disponible' : 'lugares disponibles'}
          {slot.taken_slots > 0 && ` — ${slot.taken_slots} ${slot.taken_slots === 1 ? 'proyecto agendado' : 'proyectos agendados'}`}
        </p>
      </div>

      {/* Calendar */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Month nav */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="text-base font-700 text-white">{monthLabel}</h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#8A9BB5' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {DAYS_ES.map(d => (
            <div key={d} className="py-2 text-center text-xs font-600" style={{ color: '#8A9BB5' }}>{d}</div>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-5 h-5 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#00C4A0' }} />
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {cells.map((day, idx) => {
              if (day === null) {
                return (
                  <div
                    key={`e-${idx}`}
                    style={{
                      minHeight: 88,
                      borderRight: (idx + 1) % 7 !== 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
                  />
                );
              }

              const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayEvents = events.filter(e => e.fecha === dateStr);
              const isToday = isCurrentMonth && day === today.getDate();

              return (
                <div
                  key={day}
                  className="group p-2 cursor-pointer transition-colors"
                  style={{
                    minHeight: 88,
                    borderRight: (idx + 1) % 7 !== 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: isToday ? 'rgba(0,196,160,0.04)' : 'transparent',
                  }}
                  onClick={() => setAddDay(day)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs font-600 w-6 h-6 flex items-center justify-center rounded-full"
                      style={{
                        background: isToday ? '#00C4A0' : 'transparent',
                        color: isToday ? '#050D1A' : '#8A9BB5',
                      }}
                    >
                      {day}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 text-sm leading-none" style={{ color: '#00C4A0' }}>+</span>
                  </div>

                  <div className="space-y-0.5">
                    {dayEvents.map((ev, i) => (
                      <div
                        key={ev.id}
                        className="text-xs px-1.5 py-0.5 rounded truncate"
                        style={{
                          background: `${EVENT_COLORS[i % EVENT_COLORS.length]}20`,
                          color: EVENT_COLORS[i % EVENT_COLORS.length],
                          border: `1px solid ${EVENT_COLORS[i % EVENT_COLORS.length]}35`,
                        }}
                        onClick={e => { e.stopPropagation(); removeEvent(ev.id); }}
                        title={`Click para eliminar: ${ev.nombre}`}
                      >
                        {ev.nombre}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-xs" style={{ color: 'rgba(138,155,181,0.6)' }}>
        Click en un día para agendar un proyecto · Click en un proyecto para eliminarlo
      </p>

      {/* Add project modal */}
      {addDay !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={e => { if (e.target === e.currentTarget) { setAddDay(null); setNewName(''); setAddError(''); } }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 space-y-4"
            style={{ background: '#0A1628', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div>
              <h3 className="text-base font-bold text-white">Agendar proyecto</h3>
              <p className="text-xs mt-0.5" style={{ color: '#8A9BB5' }}>
                {addDay} de {monthLabel}
              </p>
            </div>

            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') addEvent();
                if (e.key === 'Escape') { setAddDay(null); setNewName(''); setAddError(''); }
              }}
              placeholder="Nombre del cliente o proyecto"
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            />

            {addError && (
              <p className="text-xs px-3 py-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                {addError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={addEvent}
                disabled={!newName.trim() || adding}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 flex items-center justify-center gap-2"
                style={{ background: '#00C4A0', color: '#050D1A' }}
              >
                {adding && (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#050D1A' }} />
                )}
                {adding ? 'Agendando...' : 'Agendar'}
              </button>
              <button
                onClick={() => { setAddDay(null); setNewName(''); setAddError(''); }}
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
