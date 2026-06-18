'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import PropuestaPDF from '@/lib/pdf/PropuestaPDF';
import ContratoPDF from '@/lib/pdf/ContratoPDF';
import type { DocumentoForm } from '@/lib/pdf/types';

interface Props {
  form: DocumentoForm;
  fileName: string;
}

export default function PDFButtons({ form, fileName }: Props) {
  const ready = !!form.clienteNombre;
  const doc = form.tipo === 'propuesta'
    ? <PropuestaPDF data={form} />
    : <ContratoPDF data={form} />;
  const label = form.tipo === 'propuesta' ? 'Propuesta' : 'Contrato';

  return (
    <PDFDownloadLink document={doc} fileName={fileName}>
      {({ loading }) => (
        <button
          disabled={loading || !ready}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 24px', borderRadius: 12, fontSize: 13, fontWeight: 700,
            cursor: !ready || loading ? 'not-allowed' : 'pointer',
            background: '#00C4A0', color: '#050D1A', border: 'none',
            opacity: !ready ? 0.5 : 1,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {loading ? 'Generando...' : `Descargar ${label} PDF`}
        </button>
      )}
    </PDFDownloadLink>
  );
}
