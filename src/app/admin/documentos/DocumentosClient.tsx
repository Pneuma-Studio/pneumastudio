'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { DocumentoForm, ScopeSection, InversionConcepto } from '@/lib/pdf/types';
import { parseMXN, formatMXN } from '@/lib/pdf/types';

const PDFButtons = dynamic(() => import('./PDFButtons'), {
  ssr: false,
  loading: () => (
    <button disabled style={{ padding: '10px 24px', borderRadius: 12, fontSize: 13, fontWeight: 700, background: 'rgba(0,196,160,0.3)', color: '#050D1A', border: 'none', cursor: 'not-allowed' }}>
      Cargando generador...
    </button>
  ),
});

const DEFAULT_SCOPE: ScopeSection[] = [
  {
    titulo: 'Plataforma principal',
    items: 'Diseño responsive y profesional — óptimo en celular, tablet y computadora\nCatálogo de productos con fotos, descripción, precio y disponibilidad en tiempo real\nCategorías de productos para navegación fácil del cliente\nPanel administrativo para alta, edición y baja de contenido desde cualquier dispositivo\nFormulario de contacto e integración con botón flotante de WhatsApp',
    nota: '',
  },
];

const DEFAULT_CONCEPTOS: InversionConcepto[] = [
  { nombre: 'Desarrollo de plataforma + panel administrativo', inicial: '$40,000 MXN', mensualidad: 'No Aplica' },
  { nombre: 'Dominio personalizado + configuración', inicial: 'Propio', mensualidad: '$1,290 MXN' },
  { nombre: 'SEO básico + Google Analytics', inicial: 'Sin costo', mensualidad: 'No Aplica' },
];

const DEFAULT_REQUISITOS = `Logotipo en alta resolución (PNG o SVG con fondo transparente)
Fotos y contenido visual del proyecto
Definición del dominio deseado (ej: minegocio.com o .mx)
Retroalimentación oportuna en cada etapa de revisión`;

const DEFAULT_FASE2 = `Automatización WhatsApp — recordatorios, seguimiento y atención automática
Email marketing — campañas automáticas para clientes frecuentes
Analytics avanzado — dashboard de ventas y métricas clave
Integraciones con plataformas adicionales (Mercado Libre, CRM, etc.)`;

function todayStr() {
  const d = new Date();
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

const INPUT_STYLE: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10, padding: '10px 14px', color: '#FFF', fontSize: 13, outline: 'none',
};
const LABEL_STYLE: React.CSSProperties = { fontSize: 11, color: '#8A9BB5', marginBottom: 5, display: 'block', fontWeight: 600, letterSpacing: '0.04em' };
const TEXTAREA_STYLE: React.CSSProperties = { ...INPUT_STYLE, resize: 'vertical', minHeight: 90, lineHeight: 1.5 };

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} style={INPUT_STYLE}
        onFocus={e => (e.target.style.borderColor = 'rgba(0,196,160,0.5)')}
        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder, rows = 4 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} rows={rows} style={TEXTAREA_STYLE}
        onFocus={e => (e.target.style.borderColor = 'rgba(0,196,160,0.5)')}
        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 22px' }}>
      <h3 style={{ fontSize: 13, fontWeight: 700, color: '#FFF', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
    </div>
  );
}

export default function DocumentosClient() {
  const [form, setForm] = useState<DocumentoForm>({
    tipo: 'propuesta',
    clienteNombre: '',
    clienteNombreCompleto: '',
    clienteCiudad: 'Monterrey, Nuevo León',
    clienteDominio: 'Por definir',
    proyectoTitulo: 'PLATAFORMA COMERCIAL DIGITAL',
    proyectoSubtitulo: 'Tienda en Línea con Catálogo, Pagos y Dominio Propio',
    fechaDoc: todayStr(),
    validezFecha: '',
    fechaInicio: '',
    contextoObjetivo: '',
    alcanceSecciones: DEFAULT_SCOPE,
    conceptosInversion: DEFAULT_CONCEPTOS,
    totalInicial: '$45,000 MXN',
    mensualidad: '$1,290 MXN',
    mantenimiento: '$3,000 MXN',
    opcionPago: 'B',
    requisitos: DEFAULT_REQUISITOS,
    fase2Items: DEFAULT_FASE2,
  });

  const set = useCallback((key: keyof DocumentoForm, val: unknown) => {
    setForm(f => ({ ...f, [key]: val }));
  }, []);

  // Scope section helpers
  function updateScope(i: number, field: keyof ScopeSection, val: string) {
    const next = [...form.alcanceSecciones];
    next[i] = { ...next[i], [field]: val };
    set('alcanceSecciones', next);
  }
  function addScope() {
    set('alcanceSecciones', [...form.alcanceSecciones, { titulo: '', items: '', nota: '' }]);
  }
  function removeScope(i: number) {
    set('alcanceSecciones', form.alcanceSecciones.filter((_, idx) => idx !== i));
  }

  // Investment helpers
  function updateConcepto(i: number, field: keyof InversionConcepto, val: string) {
    const next = [...form.conceptosInversion];
    next[i] = { ...next[i], [field]: val };
    set('conceptosInversion', next);
  }
  function addConcepto() {
    set('conceptosInversion', [...form.conceptosInversion, { nombre: '', inicial: '', mensualidad: 'No Aplica' }]);
  }
  function removeConcepto(i: number) {
    set('conceptosInversion', form.conceptosInversion.filter((_, idx) => idx !== i));
  }

  const totalNum = parseMXN(form.totalInicial);
  const fileName = `${form.tipo === 'propuesta' ? 'Propuesta' : 'Contrato'}_${form.clienteNombre.replace(/\s+/g, '_') || 'Cliente'}_Pneuma_Studio.pdf`;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#FFF', marginBottom: 4 }}>Generador de Documentos</h1>
        <p style={{ fontSize: 13, color: '#8A9BB5' }}>Completa los campos y descarga la propuesta o contrato en PDF con el branding de Pneuma Studio.</p>
      </div>

      {/* Document type selector */}
      <div style={{ display: 'flex', gap: 10 }}>
        {(['propuesta', 'contrato'] as const).map(t => (
          <button key={t} onClick={() => set('tipo', t)}
            style={{
              padding: '8px 22px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: form.tipo === t ? '#00C4A0' : 'rgba(255,255,255,0.05)',
              color: form.tipo === t ? '#050D1A' : '#8A9BB5',
              border: form.tipo === t ? '1px solid #00C4A0' : '1px solid rgba(255,255,255,0.1)',
            }}>
            {t === 'propuesta' ? 'Propuesta' : 'Contrato'}
          </button>
        ))}
      </div>

      {/* Cliente */}
      <SectionCard title="Información del Cliente">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label="NOMBRE DEL CLIENTE" value={form.clienteNombre} onChange={v => set('clienteNombre', v)} placeholder="Ej: Yajaira Martínez" />
          <Field label="CIUDAD" value={form.clienteCiudad} onChange={v => set('clienteCiudad', v)} placeholder="Monterrey, Nuevo León" />
        </div>
        {form.tipo === 'contrato' && (
          <Field label="NOMBRE COMPLETO (LEGAL)" value={form.clienteNombreCompleto} onChange={v => set('clienteNombreCompleto', v)} placeholder="Nombre completo para el contrato legal" />
        )}
        <Field label="DOMINIO" value={form.clienteDominio} onChange={v => set('clienteDominio', v)} placeholder="Por definir / minegocio.com" />
      </SectionCard>

      {/* Proyecto */}
      <SectionCard title="Proyecto">
        <Field label="TIPO DE PROYECTO (TÍTULO)" value={form.proyectoTitulo} onChange={v => set('proyectoTitulo', v)} placeholder="PLATAFORMA COMERCIAL DIGITAL" />
        <Field label="DESCRIPCIÓN CORTA (SUBTÍTULO)" value={form.proyectoSubtitulo} onChange={v => set('proyectoSubtitulo', v)} placeholder="Tienda en Línea con Catálogo, Pagos y Dominio Propio" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Field label={form.tipo === 'propuesta' ? 'FECHA DE PROPUESTA' : 'FECHA DEL CONTRATO'} value={form.fechaDoc} onChange={v => set('fechaDoc', v)} placeholder="17 de junio de 2026" />
          {form.tipo === 'propuesta'
            ? <Field label="VALIDEZ DE LA PROPUESTA" value={form.validezFecha} onChange={v => set('validezFecha', v)} placeholder="Hasta el 1ro de agosto de 2026" />
            : <Field label="FECHA TENTATIVA DE INICIO" value={form.fechaInicio} onChange={v => set('fechaInicio', v)} placeholder="15 de agosto de 2026" />
          }
        </div>
      </SectionCard>

      {/* Contexto */}
      <SectionCard title="I. Contexto y Objetivo">
        <TextareaField label="DESCRIBE EL CONTEXTO Y OBJETIVO DEL PROYECTO" value={form.contextoObjetivo}
          onChange={v => set('contextoObjetivo', v)} rows={5}
          placeholder="Describe brevemente lo que el cliente necesita y cuál es el objetivo del proyecto..." />
      </SectionCard>

      {/* Alcance */}
      <SectionCard title="II. Alcance del Proyecto">
        <p style={{ fontSize: 11, color: '#8A9BB5', marginTop: -6 }}>Agrega secciones. Escribe un ítem por línea en cada sección.</p>
        {form.alcanceSecciones.map((sec, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input value={sec.titulo} onChange={e => updateScope(i, 'titulo', e.target.value)}
                placeholder="Nombre de la sección (ej: Plataforma de ventas)"
                style={{ ...INPUT_STYLE, flex: 1, fontSize: 12, fontWeight: 600 }}
                onFocus={e => (e.target.style.borderColor = 'rgba(0,196,160,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
              {form.alcanceSecciones.length > 1 && (
                <button onClick={() => removeScope(i)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '6px 10px', color: '#ef4444', cursor: 'pointer', fontSize: 11 }}>
                  Eliminar
                </button>
              )}
            </div>
            <textarea value={sec.items} onChange={e => updateScope(i, 'items', e.target.value)}
              placeholder="Un ítem por línea:&#10;Diseño responsive y profesional&#10;Catálogo de productos&#10;..."
              rows={5} style={TEXTAREA_STYLE}
              onFocus={e => (e.target.style.borderColor = 'rgba(0,196,160,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
            <textarea value={sec.nota} onChange={e => updateScope(i, 'nota', e.target.value)}
              placeholder="Nota o callout opcional (ej: ¿Por qué Mercado Pago? — déjalo vacío si no aplica)"
              rows={2} style={{ ...TEXTAREA_STYLE, fontSize: 12, color: '#8A9BB5' }}
              onFocus={e => (e.target.style.borderColor = 'rgba(0,196,160,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>
        ))}
        <button onClick={addScope} style={{ padding: '8px 16px', borderRadius: 10, fontSize: 12, cursor: 'pointer', background: 'rgba(0,196,160,0.08)', border: '1px solid rgba(0,196,160,0.2)', color: '#00C4A0', alignSelf: 'flex-start' }}>
          + Agregar sección
        </button>
      </SectionCard>

      {/* Inversión */}
      <SectionCard title="III. Inversión">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: '#8A9BB5', fontWeight: 600 }}>CONCEPTO</span>
            <span style={{ fontSize: 10, color: '#8A9BB5', fontWeight: 600 }}>INVERSIÓN INICIAL</span>
            <span style={{ fontSize: 10, color: '#8A9BB5', fontWeight: 600 }}>MENSUALIDAD</span>
            <span />
          </div>
          {form.conceptosInversion.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: 8, alignItems: 'center' }}>
              <input value={c.nombre} onChange={e => updateConcepto(i, 'nombre', e.target.value)}
                placeholder="Nombre del concepto" style={INPUT_STYLE}
                onFocus={e => (e.target.style.borderColor = 'rgba(0,196,160,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
              <input value={c.inicial} onChange={e => updateConcepto(i, 'inicial', e.target.value)}
                placeholder="$0 MXN" style={INPUT_STYLE}
                onFocus={e => (e.target.style.borderColor = 'rgba(0,196,160,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
              <input value={c.mensualidad} onChange={e => updateConcepto(i, 'mensualidad', e.target.value)}
                placeholder="No Aplica" style={INPUT_STYLE}
                onFocus={e => (e.target.style.borderColor = 'rgba(0,196,160,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
              {form.conceptosInversion.length > 1 && (
                <button onClick={() => removeConcepto(i)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '8px 10px', color: '#ef4444', cursor: 'pointer', fontSize: 11 }}>✕</button>
              )}
            </div>
          ))}
          <button onClick={addConcepto} style={{ padding: '7px 14px', borderRadius: 10, fontSize: 12, cursor: 'pointer', background: 'rgba(0,196,160,0.08)', border: '1px solid rgba(0,196,160,0.2)', color: '#00C4A0', alignSelf: 'flex-start' }}>
            + Agregar concepto
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 4 }}>
          <Field label="TOTAL INICIAL" value={form.totalInicial} onChange={v => set('totalInicial', v)} placeholder="$45,000 MXN" />
          <Field label="MENSUALIDAD" value={form.mensualidad} onChange={v => set('mensualidad', v)} placeholder="$1,290 MXN" />
          <Field label="MANTENIMIENTO VARIABLE" value={form.mantenimiento} onChange={v => set('mantenimiento', v)} placeholder="$3,000 MXN" />
        </div>

        {totalNum > 0 && (
          <div style={{ background: 'rgba(0,196,160,0.06)', border: '1px solid rgba(0,196,160,0.15)', borderRadius: 10, padding: 12 }}>
            <p style={{ fontSize: 11, color: '#8A9BB5', marginBottom: 8 }}>ESQUEMA DE PAGOS (calculado automáticamente)</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 10 }}>
              {(['A', 'B'] as const).map(op => (
                <label key={op} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12, color: form.opcionPago === op ? '#00C4A0' : '#8A9BB5' }}>
                  <input type="radio" name="opcionPago" checked={form.opcionPago === op} onChange={() => set('opcionPago', op)} style={{ accentColor: '#00C4A0' }} />
                  {op === 'A' ? '2 pagos (50% / 50%)' : '3 parcialidades (35% / 35% / 30%)'}
                </label>
              ))}
            </div>
            {form.opcionPago === 'A' ? (
              <p style={{ fontSize: 12, color: '#FFF' }}>
                <span style={{ color: '#00C4A0', fontWeight: 700 }}>{formatMXN(Math.round(totalNum / 2))}</span> al firmar  ·  <span style={{ color: '#00C4A0', fontWeight: 700 }}>{formatMXN(totalNum - Math.round(totalNum / 2))}</span> a la entrega
              </p>
            ) : (
              <p style={{ fontSize: 12, color: '#FFF' }}>
                <span style={{ color: '#00C4A0', fontWeight: 700 }}>{formatMXN(Math.round(totalNum * 0.35))}</span> al firmar  ·  <span style={{ color: '#00C4A0', fontWeight: 700 }}>{formatMXN(Math.round(totalNum * 0.35))}</span> a la entrega  ·  <span style={{ color: '#00C4A0', fontWeight: 700 }}>{formatMXN(totalNum - Math.round(totalNum * 0.35) * 2)}</span> 2 meses después
              </p>
            )}
          </div>
        )}
      </SectionCard>

      {/* Requisitos */}
      <SectionCard title="Lo que necesitamos del cliente">
        <TextareaField label="UN REQUISITO POR LÍNEA" value={form.requisitos} onChange={v => set('requisitos', v)} rows={5} placeholder="Logotipo en alta resolución&#10;Fotos del proyecto&#10;..." />
      </SectionCard>

      {/* Fase 2 (propuesta only) */}
      {form.tipo === 'propuesta' && (
        <SectionCard title="Fase 2 — Crecimiento Futuro (opcional)">
          <TextareaField label="UN MÓDULO POR LÍNEA (DEJAR VACÍO PARA OMITIR)" value={form.fase2Items} onChange={v => set('fase2Items', v)} rows={4} placeholder="Automatización WhatsApp&#10;Email marketing&#10;..." />
        </SectionCard>
      )}

      {/* Download buttons */}
      <div style={{ background: 'rgba(0,196,160,0.05)', border: '1px solid rgba(0,196,160,0.15)', borderRadius: 14, padding: '20px 22px' }}>
        <p style={{ fontSize: 13, color: '#FFF', fontWeight: 600, marginBottom: 4 }}>Descargar PDF</p>
        <p style={{ fontSize: 11, color: '#8A9BB5', marginBottom: 16 }}>
          El PDF se genera en tu navegador con todos los datos del formulario.
          {!form.clienteNombre && <span style={{ color: '#F59E0B' }}> — Ingresa el nombre del cliente primero.</span>}
        </p>
        <PDFButtons form={form} fileName={fileName} />
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
}
