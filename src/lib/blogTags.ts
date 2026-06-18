const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  // Temáticas
  'Ecommerce':          { bg: 'rgba(59,130,246,0.12)',  text: '#3B82F6', border: 'rgba(59,130,246,0.28)' },
  'Automatización':     { bg: 'rgba(0,196,160,0.12)',   text: '#00C4A0', border: 'rgba(0,196,160,0.28)' },
  'CRM & Ventas':       { bg: 'rgba(139,92,246,0.12)',  text: '#A78BFA', border: 'rgba(139,92,246,0.28)' },
  'Analytics':          { bg: 'rgba(99,102,241,0.12)',  text: '#818CF8', border: 'rgba(99,102,241,0.28)' },
  'Negocios Digitales': { bg: 'rgba(245,158,11,0.12)',  text: '#FBB438', border: 'rgba(245,158,11,0.28)' },
  'Herramientas':       { bg: 'rgba(100,116,139,0.15)', text: '#94A3B8', border: 'rgba(100,116,139,0.32)' },
  'Caso de Éxito':      { bg: 'rgba(234,179,8,0.12)',   text: '#EAB308', border: 'rgba(234,179,8,0.28)' },
  // Formatos
  'Guía':               { bg: 'rgba(14,165,233,0.12)',  text: '#38BDF8', border: 'rgba(14,165,233,0.28)' },
  'Opinión':            { bg: 'rgba(244,63,94,0.12)',   text: '#FB7185', border: 'rgba(244,63,94,0.28)' },
  'Tendencias':         { bg: 'rgba(168,85,247,0.12)',  text: '#C084FC', border: 'rgba(168,85,247,0.28)' },
  'Rápido':             { bg: 'rgba(34,197,94,0.12)',   text: '#4ADE80', border: 'rgba(34,197,94,0.28)' },
};

const DEFAULT = { bg: 'rgba(0,196,160,0.1)', text: '#00C4A0', border: 'rgba(0,196,160,0.2)' };

export function getTagStyle(tag: string): React.CSSProperties {
  const c = TAG_COLORS[tag] ?? DEFAULT;
  return { background: c.bg, color: c.text, border: `1px solid ${c.border}` };
}
