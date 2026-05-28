'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface AvailabilitySlot {
  id: string;
  month_label: string;
  total_slots: number;
  taken_slots: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const MONTH_OPTIONS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = [CURRENT_YEAR, CURRENT_YEAR + 1];

export default function DisponibilidadClient() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // New slot form
  const [newMonth, setNewMonth] = useState('Julio');
  const [newYear, setNewYear] = useState(CURRENT_YEAR);
  const [newTotal, setNewTotal] = useState(5);
  const [newTaken, setNewTaken] = useState(0);
  const [creating, setCreating] = useState(false);

  const supabase = createClient();

  async function fetchSlots() {
    setLoading(true);
    const { data, error } = await supabase
      .from('availability_slots')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError('Error al cargar los datos: ' + error.message);
    } else {
      setSlots(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchSlots();
  }, []);

  async function updateSlot(id: string, field: 'taken_slots' | 'total_slots' | 'is_active', value: number | boolean) {
    setSaving(id);
    setError(null);
    const { error } = await supabase
      .from('availability_slots')
      .update({ [field]: value })
      .eq('id', id);

    if (error) {
      setError('Error al guardar: ' + error.message);
    } else {
      setSuccess('Guardado correctamente');
      setTimeout(() => setSuccess(null), 2500);
      await fetchSlots();
    }
    setSaving(null);
  }

  async function createSlot() {
    setCreating(true);
    setError(null);
    const label = `${newMonth} ${newYear}`;
    const { error } = await supabase
      .from('availability_slots')
      .insert({ month_label: label, total_slots: newTotal, taken_slots: newTaken, is_active: true });

    if (error) {
      setError('Error al crear: ' + error.message);
    } else {
      setSuccess('Mes creado correctamente');
      setTimeout(() => setSuccess(null), 2500);
      await fetchSlots();
    }
    setCreating(false);
  }

  async function deleteSlot(id: string) {
    if (!confirm('¿Eliminar este mes?')) return;
    setSaving(id);
    const { error } = await supabase.from('availability_slots').delete().eq('id', id);
    if (error) {
      setError('Error al eliminar: ' + error.message);
    } else {
      setSuccess('Eliminado');
      setTimeout(() => setSuccess(null), 2500);
      await fetchSlots();
    }
    setSaving(null);
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Disponibilidad</h1>
        <p className="text-sm" style={{ color: '#8A9BB5' }}>
          Gestiona los lugares disponibles por mes. Los cambios se reflejan en tiempo real en el sitio.
        </p>
      </div>

      {/* Feedback */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}>
          ✓ {success}
        </div>
      )}

      {/* Existing slots */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider" style={{ color: '#8A9BB5' }}>
          Meses configurados
        </h2>

        {loading ? (
          <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-sm" style={{ color: '#8A9BB5' }}>Cargando...</div>
          </div>
        ) : slots.length === 0 ? (
          <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-sm" style={{ color: '#8A9BB5' }}>No hay meses configurados. Crea uno abajo.</div>
          </div>
        ) : (
          <div className="space-y-3">
            {slots?.map((slot) => {
              const available = slot.total_slots - slot.taken_slots;
              const isCritical = available <= 1;
              const isLow = available <= 2;
              const accentColor = !slot.is_active ? '#6B7280' : isCritical ? '#ef4444' : '#00C4A0';

              return (
                <div
                  key={slot.id}
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${slot.is_active ? (isCritical ? 'rgba(239,68,68,0.25)' : 'rgba(0,196,160,0.2)') : 'rgba(255,255,255,0.08)'}`,
                    opacity: saving === slot.id ? 0.6 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Month label + status */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-base font-semibold text-white">{slot.month_label}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: slot.is_active ? `${accentColor}18` : 'rgba(107,114,128,0.15)',
                            color: slot.is_active ? accentColor : '#6B7280',
                          }}
                        >
                          {slot.is_active ? `${available}/${slot.total_slots} disponibles` : 'Inactivo'}
                        </span>
                      </div>

                      {/* Slot bars */}
                      <div className="flex gap-1.5 mb-3">
                        {Array.from({ length: slot.total_slots })?.map((_, i) => {
                          const isTaken = i < slot.taken_slots;
                          return (
                            <div
                              key={i}
                              className="h-6 rounded flex-1"
                              style={{
                                background: isTaken
                                  ? 'rgba(255,255,255,0.08)'
                                  : slot.is_active
                                  ? `${accentColor}20`
                                  : 'rgba(255,255,255,0.04)',
                                border: isTaken
                                  ? '1px solid rgba(255,255,255,0.1)'
                                  : slot.is_active
                                  ? `1px solid ${accentColor}50`
                                  : '1px solid rgba(255,255,255,0.06)',
                              }}
                            />
                          );
                        })}
                      </div>

                      {/* Controls */}
                      <div className="flex flex-wrap items-center gap-4">
                        {/* Taken slots */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs" style={{ color: '#8A9BB5' }}>Ocupados:</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateSlot(slot.id, 'taken_slots', Math.max(0, slot.taken_slots - 1))}
                              disabled={saving === slot.id || slot.taken_slots <= 0}
                              className="w-6 h-6 rounded flex items-center justify-center text-sm font-bold transition-all disabled:opacity-40"
                              style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }}
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-white">{slot.taken_slots}</span>
                            <button
                              onClick={() => updateSlot(slot.id, 'taken_slots', Math.min(slot.total_slots, slot.taken_slots + 1))}
                              disabled={saving === slot.id || slot.taken_slots >= slot.total_slots}
                              className="w-6 h-6 rounded flex items-center justify-center text-sm font-bold transition-all disabled:opacity-40"
                              style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total slots */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs" style={{ color: '#8A9BB5' }}>Total:</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateSlot(slot.id, 'total_slots', Math.max(1, slot.total_slots - 1))}
                              disabled={saving === slot.id || slot.total_slots <= 1}
                              className="w-6 h-6 rounded flex items-center justify-center text-sm font-bold transition-all disabled:opacity-40"
                              style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }}
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-white">{slot.total_slots}</span>
                            <button
                              onClick={() => updateSlot(slot.id, 'total_slots', slot.total_slots + 1)}
                              disabled={saving === slot.id}
                              className="w-6 h-6 rounded flex items-center justify-center text-sm font-bold transition-all disabled:opacity-40"
                              style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF' }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Active toggle */}
                        <button
                          onClick={() => updateSlot(slot.id, 'is_active', !slot.is_active)}
                          disabled={saving === slot.id}
                          className="flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-all disabled:opacity-40"
                          style={{
                            background: slot.is_active ? 'rgba(0,196,160,0.1)' : 'rgba(107,114,128,0.15)',
                            border: slot.is_active ? '1px solid rgba(0,196,160,0.3)' : '1px solid rgba(107,114,128,0.3)',
                            color: slot.is_active ? '#00C4A0' : '#6B7280',
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: slot.is_active ? '#00C4A0' : '#6B7280' }}
                          />
                          {slot.is_active ? 'Activo' : 'Inactivo'}
                        </button>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => deleteSlot(slot.id)}
                      disabled={saving === slot.id}
                      className="self-start sm:self-center p-2 rounded-lg transition-all disabled:opacity-40 hover:bg-red-500/10"
                      style={{ color: '#6B7280' }}
                      title="Eliminar"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create new month */}
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <h2 className="text-sm font-semibold text-white mb-4">Agregar nuevo mes</h2>
        <div className="flex flex-wrap gap-4 items-end">
          {/* Month */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color: '#8A9BB5' }}>Mes</label>
            <select
              value={newMonth}
              onChange={(e) => setNewMonth(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {MONTH_OPTIONS.map((m) => (
                <option key={m} value={m} style={{ background: '#0A1628' }}>{m}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color: '#8A9BB5' }}>Año</label>
            <select
              value={newYear}
              onChange={(e) => setNewYear(Number(e.target.value))}
              className="px-3 py-2 rounded-xl text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {YEAR_OPTIONS.map((y) => (
                <option key={y} value={y} style={{ background: '#0A1628' }}>{y}</option>
              ))}
            </select>
          </div>

          {/* Total */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color: '#8A9BB5' }}>Total lugares</label>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setNewTotal(Math.max(1, newTotal - 1))}
                className="w-8 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold text-white">{newTotal}</span>
              <button
                onClick={() => setNewTotal(newTotal + 1)}
                className="w-8 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Taken */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color: '#8A9BB5' }}>Ocupados</label>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setNewTaken(Math.max(0, newTaken - 1))}
                className="w-8 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold text-white">{newTaken}</span>
              <button
                onClick={() => setNewTaken(Math.min(newTotal, newTaken + 1))}
                className="w-8 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Create button */}
          <button
            onClick={createSlot}
            disabled={creating}
            className="px-5 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
            style={{ background: '#00C4A0', color: '#050D1A' }}
          >
            {creating ? 'Creando...' : 'Crear mes'}
          </button>
        </div>

        {/* Preview */}
        <div className="mt-4 text-xs" style={{ color: '#8A9BB5' }}>
          Vista previa: <span className="text-white font-medium">{newMonth} {newYear}</span> — {newTotal - newTaken} de {newTotal} lugares disponibles
        </div>
      </div>
    </div>
  );
}
