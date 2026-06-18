export interface ScopeSection {
  titulo: string;
  items: string; // one per line
  nota: string;  // optional callout box
}

export interface InversionConcepto {
  nombre: string;
  inicial: string;
  mensualidad: string;
}

export interface DocumentoForm {
  tipo: 'propuesta' | 'contrato';

  // Client
  clienteNombre: string;
  clienteNombreCompleto: string;
  clienteCiudad: string;
  clienteDominio: string;

  // Project
  proyectoTitulo: string;
  proyectoSubtitulo: string;

  // Dates
  fechaDoc: string;
  validezFecha: string;
  fechaInicio: string;

  // Context
  contextoObjetivo: string;

  // Scope
  alcanceSecciones: ScopeSection[];

  // Investment
  conceptosInversion: InversionConcepto[];
  totalInicial: string;
  mensualidad: string;
  mantenimiento: string;
  opcionPago: 'A' | 'B';

  // Requirements
  requisitos: string;

  // Phase 2 (propuesta only)
  fase2Items: string;
}

export function parseMXN(val: string): number {
  return parseFloat(val.replace(/[$,\sMXN]/g, '')) || 0;
}

export function formatMXN(n: number): string {
  return '$' + n.toLocaleString('es-MX', { minimumFractionDigits: 0 }) + ' MXN';
}

export function calcPagos(total: number, opcion: 'A' | 'B') {
  if (opcion === 'A') {
    const half = Math.round(total / 2);
    return [
      { label: 'Primer pago — Al firmar', pct: 50, monto: formatMXN(half) },
      { label: 'Segundo pago — A la entrega', pct: 50, monto: formatMXN(total - half) },
    ];
  }
  const p1 = Math.round(total * 0.35);
  const p2 = Math.round(total * 0.35);
  const p3 = total - p1 - p2;
  return [
    { label: 'Primer pago — Anticipo', pct: 35, monto: formatMXN(p1), cuando: 'Al firmar' },
    { label: 'Segundo pago — Contra entrega', pct: 35, monto: formatMXN(p2), cuando: 'A la entrega y aprobación' },
    { label: 'Tercer pago — Diferido', pct: 30, monto: formatMXN(p3), cuando: '2 meses después de la entrega' },
  ];
}
