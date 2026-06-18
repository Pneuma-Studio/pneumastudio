import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { DocumentoForm, parseMXN, formatMXN, calcPagos } from './types';

const TEAL = '#00C4A0';
const NAVY = '#0d2137';
const BODY = '#374151';
const LIGHT = '#6B7280';
const BORDER = '#E5E7EB';

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 9, color: BODY, paddingTop: 36, paddingBottom: 44, paddingHorizontal: 44 },

  // Header
  headerLogo: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: NAVY, letterSpacing: 4, textAlign: 'center' },
  headerStudio: { fontSize: 8, fontFamily: 'Helvetica', color: NAVY, letterSpacing: 6, textAlign: 'center', marginTop: -2 },
  headerTagline: { fontSize: 7.5, color: TEAL, textAlign: 'center', marginTop: 4, fontFamily: 'Helvetica-Bold', letterSpacing: 1 },
  headerContact: { fontSize: 7.5, color: LIGHT, textAlign: 'center', marginTop: 2 },
  headerDivider: { borderBottomWidth: 1, borderBottomColor: TEAL, marginTop: 10, marginBottom: 14 },

  // Document title block
  docTitle: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: NAVY, textAlign: 'center', marginBottom: 4 },
  docSubtitle: { fontSize: 10, color: TEAL, textAlign: 'center', marginBottom: 3 },
  docClient: { fontSize: 9, color: LIGHT, textAlign: 'center', marginBottom: 14 },

  // Info table
  infoTable: { borderWidth: 1, borderColor: BORDER, marginBottom: 18 },
  infoRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: BORDER },
  infoRowLast: { flexDirection: 'row' },
  infoLabel: { width: '35%', paddingHorizontal: 8, paddingVertical: 5, fontSize: 8.5, color: BODY },
  infoValue: { flex: 1, paddingHorizontal: 8, paddingVertical: 5, fontSize: 8.5, color: NAVY, fontFamily: 'Helvetica-Bold', borderLeftWidth: 1, borderLeftColor: BORDER },

  // Section heading
  sectionWrap: { marginBottom: 14, marginTop: 6 },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: NAVY, paddingBottom: 4, borderBottomWidth: 1.5, borderBottomColor: TEAL, marginBottom: 8 },

  // Sub-section heading
  subHead: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: TEAL, marginBottom: 5 },

  // Bullet
  bulletRow: { flexDirection: 'row', marginBottom: 3, paddingLeft: 4 },
  bullet: { fontSize: 9, color: BODY, marginRight: 5, marginTop: 0.5 },
  bulletText: { flex: 1, fontSize: 8.5, color: BODY, lineHeight: 1.4 },

  // Callout box
  callout: { borderWidth: 1, borderColor: BORDER, borderRadius: 3, padding: 8, marginVertical: 8, backgroundColor: '#F9FAFB' },
  calloutTitle: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: NAVY, marginBottom: 3 },
  calloutText: { fontSize: 8, color: BODY, lineHeight: 1.4 },

  // Table
  table: { borderWidth: 1, borderColor: BORDER, marginBottom: 8 },
  tableHeader: { flexDirection: 'row', backgroundColor: NAVY },
  tableRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: BORDER },
  tableRowAlt: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: BORDER, backgroundColor: '#F9FAFB' },
  tableRowBold: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: BORDER, backgroundColor: '#EFF6FF' },
  thCell: { paddingHorizontal: 8, paddingVertical: 5, fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#FFFFFF' },
  tdCell: { paddingHorizontal: 8, paddingVertical: 5, fontSize: 8.5, color: BODY },
  tdBold: { paddingHorizontal: 8, paddingVertical: 5, fontSize: 8.5, color: NAVY, fontFamily: 'Helvetica-Bold' },

  // Payment box
  payBox: { borderWidth: 1, borderColor: BORDER, borderRadius: 3, padding: 10, marginTop: 8 },
  payBoxTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: NAVY, marginBottom: 6 },
  payLine: { fontSize: 8.5, color: BODY, marginBottom: 3 },
  payAmount: { fontFamily: 'Helvetica-Bold', color: TEAL },

  // Note text
  note: { fontSize: 7.5, color: LIGHT, marginBottom: 3, lineHeight: 1.4 },

  // Signature block
  sigBlock: { flexDirection: 'row', marginTop: 20, gap: 30 },
  sigCol: { flex: 1 },
  sigLabel: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: NAVY, marginBottom: 20 },
  sigLine: { borderBottomWidth: 1, borderBottomColor: NAVY, marginBottom: 4 },
  sigName: { fontSize: 8, color: BODY },
  sigInfo: { fontSize: 7.5, color: LIGHT },

  // Footer
  footer: { position: 'absolute', bottom: 18, left: 44, right: 44, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 6, flexDirection: 'row', justifyContent: 'center' },
  footerText: { fontSize: 7, color: LIGHT, textAlign: 'center' },
});

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <View style={s.sectionWrap}>
      <Text style={s.sectionTitle}>{number}. {title.toUpperCase()}</Text>
    </View>
  );
}

function BulletList({ items }: { items: string }) {
  const lines = items.split('\n').map(l => l.trim()).filter(Boolean);
  return (
    <View>
      {lines.map((line, i) => (
        <View key={i} style={s.bulletRow}>
          <Text style={s.bullet}>•</Text>
          <Text style={s.bulletText}>{line}</Text>
        </View>
      ))}
    </View>
  );
}

export default function PropuestaPDF({ data }: { data: DocumentoForm }) {
  const total = parseMXN(data.totalInicial);
  const pagos = calcPagos(total, data.opcionPago);

  const timeline = [
    { etapa: '1. Brief y configuración', desc: 'Definición de categorías, estilo y requerimientos del proyecto', dur: '2–3 días' },
    { etapa: '2. Diseño y desarrollo', desc: 'Desarrollo de la plataforma conforme al alcance acordado', dur: '8–12 días' },
    { etapa: '3. Dominio y configuración', desc: 'Registro de dominio, hosting, SSL y configuración técnica', dur: '2–3 días' },
    { etapa: '4. Carga de contenido', desc: 'Alta de contenido inicial: productos, textos, imágenes', dur: '2–4 días' },
    { etapa: '5. Pruebas y ajustes', desc: 'Pruebas funcionales, revisión y ajustes finales', dur: '2–3 días' },
    { etapa: '6. Capacitación y entrega', desc: 'Capacitación para gestión autónoma de la plataforma', dur: '1 día' },
    { etapa: 'TIEMPO TOTAL ESTIMADO', desc: '', dur: '3–4 semanas' },
  ];

  const garantias = [
    '30 días de soporte técnico gratuito posterior a la entrega',
    '2 rondas de ajustes incluidas durante el desarrollo',
    'Capacitación para gestión autónoma de la plataforma incluida',
    'Hosting, dominio, SSL y mantenimiento incluidos en la mensualidad',
    'El dominio es propiedad del cliente desde el día 1',
  ];

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <Text style={s.headerLogo}>PNEUMA</Text>
        <Text style={s.headerStudio}>STUDIO</Text>
        <Text style={s.headerTagline}>PREMIUM DIGITAL COMMERCE & AUTOMATION STUDIO</Text>
        <Text style={s.headerContact}>studio@pneumastudio.mx  |  +52 81 1633 3559  |  @pneumastudiomx</Text>
        <View style={s.headerDivider} />

        {/* Title */}
        <Text style={s.docTitle}>PROPUESTA DE {data.proyectoTitulo.toUpperCase()}</Text>
        <Text style={s.docSubtitle}>{data.proyectoSubtitulo}</Text>
        <Text style={s.docClient}>{data.clienteNombre} — {data.clienteCiudad}</Text>

        {/* Info table */}
        <View style={s.infoTable}>
          {[
            ['Cliente', data.clienteNombre],
            ['Dominio', data.clienteDominio || 'Por definir'],
            ['Fecha de propuesta', data.fechaDoc],
            ['Validez de la propuesta', data.validezFecha],
            ['Elaborado por', 'Nazre Assad — Pneuma Studio'],
          ].map(([campo, detalle], i, arr) => (
            <View key={i} style={i === arr.length - 1 ? s.infoRowLast : s.infoRow}>
              <Text style={s.infoLabel}>{campo}</Text>
              <Text style={s.infoValue}>{detalle}</Text>
            </View>
          ))}
        </View>

        {/* I. Contexto */}
        <SectionHeading number="I" title="Contexto y Objetivo" />
        <Text style={{ fontSize: 8.5, color: BODY, lineHeight: 1.5, marginBottom: 18 }}>{data.contextoObjetivo}</Text>

        {/* II. Alcance */}
        <SectionHeading number="II" title="Alcance del Proyecto" />
        {data.alcanceSecciones.map((sec, i) => (
          <View key={i} style={{ marginBottom: 12 }}>
            <Text style={s.subHead}>{sec.titulo}</Text>
            <BulletList items={sec.items} />
            {sec.nota.trim() && (
              <View style={s.callout}>
                <Text style={s.calloutText}>{sec.nota}</Text>
              </View>
            )}
          </View>
        ))}

        {/* III. Inversión */}
        <SectionHeading number="III" title="Inversión" />
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={[s.thCell, { flex: 2 }]}>Concepto</Text>
            <Text style={[s.thCell, { flex: 1 }]}>Inversión Inicial</Text>
            <Text style={[s.thCell, { flex: 1 }]}>Mensualidad</Text>
          </View>
          {data.conceptosInversion.map((c, i) => (
            <View key={i} style={i % 2 === 1 ? s.tableRowAlt : s.tableRow}>
              <Text style={[s.tdCell, { flex: 2 }]}>{c.nombre}</Text>
              <Text style={[s.tdCell, { flex: 1 }]}>{c.inicial}</Text>
              <Text style={[s.tdCell, { flex: 1 }]}>{c.mensualidad}</Text>
            </View>
          ))}
          <View style={s.tableRowBold}>
            <Text style={[s.tdBold, { flex: 2 }]}>TOTAL</Text>
            <Text style={[s.tdBold, { flex: 1 }]}>{data.totalInicial}</Text>
            <Text style={[s.tdBold, { flex: 1 }]}>{data.mensualidad ? `${data.mensualidad} / mes` : '—'}</Text>
          </View>
        </View>

        {data.mensualidad && (
          <Text style={s.note}>* La mensualidad incluye hosting, SSL, servidor, base de datos, monitoreo y soporte técnico del sistema activo.</Text>
        )}
        {data.mantenimiento && (
          <Text style={s.note}>* Mantenimiento variable {data.mantenimiento} el mes utilizado.</Text>
        )}

        {/* Payment conditions */}
        <View style={s.payBox}>
          <Text style={s.payBoxTitle}>Condiciones de pago</Text>
          {data.opcionPago === 'A' ? (
            <View>
              <Text style={s.payLine}>Opción A — 2 pagos:</Text>
              <Text style={s.payLine}>
                <Text style={s.payAmount}>{pagos[0].monto}</Text> al firmar  |  <Text style={s.payAmount}>{pagos[1].monto}</Text> a la entrega
              </Text>
            </View>
          ) : (
            <View>
              <Text style={s.payLine}>Opción B — 3 parcialidades sin recargo:</Text>
              <Text style={s.payLine}>
                <Text style={s.payAmount}>{pagos[0].monto}</Text> al firmar  |  <Text style={s.payAmount}>{pagos[1].monto}</Text> a la entrega  |  <Text style={s.payAmount}>{pagos[2].monto}</Text> 2 meses después
              </Text>
            </View>
          )}
        </View>

        {/* IV. Tiempos */}
        <SectionHeading number="IV" title="Tiempos de Entrega" />
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={[s.thCell, { flex: 1.2 }]}>Etapa</Text>
            <Text style={[s.thCell, { flex: 2 }]}>Descripción</Text>
            <Text style={[s.thCell, { flex: 0.8 }]}>Duración estimada</Text>
          </View>
          {timeline.map((row, i) => (
            <View key={i} style={i === timeline.length - 1 ? s.tableRowBold : (i % 2 === 1 ? s.tableRowAlt : s.tableRow)}>
              <Text style={[i === timeline.length - 1 ? s.tdBold : s.tdCell, { flex: 1.2 }]}>{row.etapa}</Text>
              <Text style={[s.tdCell, { flex: 2 }]}>{row.desc}</Text>
              <Text style={[i === timeline.length - 1 ? s.tdBold : s.tdCell, { flex: 0.8 }]}>{row.dur}</Text>
            </View>
          ))}
        </View>

        {/* V. Requisitos */}
        <SectionHeading number="V" title={`Lo que necesitamos de ${data.clienteNombre.split(' ')[0]}`} />
        <BulletList items={data.requisitos} />

        {/* VI. Fase 2 */}
        {data.fase2Items.trim() && (
          <View style={{ marginTop: 6 }}>
            <SectionHeading number="VI" title="Fase 2 — Crecimiento Futuro" />
            <Text style={{ fontSize: 8.5, color: BODY, lineHeight: 1.4, marginBottom: 6 }}>
              Una vez validado el proyecto inicial, podrás expandir la plataforma con módulos adicionales:
            </Text>
            <BulletList items={data.fase2Items} />
            <Text style={{ fontSize: 8, color: LIGHT, marginTop: 6, lineHeight: 1.4 }}>
              Estos módulos se pueden activar en cualquier momento sin modificar el sistema base.
            </Text>
          </View>
        )}

        {/* VII. Garantías */}
        <SectionHeading number={data.fase2Items.trim() ? 'VII' : 'VI'} title="Garantías y Soporte" />
        <BulletList items={garantias.join('\n')} />

        {/* VIII. Aceptación */}
        <SectionHeading number={data.fase2Items.trim() ? 'VIII' : 'VII'} title="Aceptación de Propuesta" />
        <Text style={{ fontSize: 8.5, color: BODY, lineHeight: 1.5, marginBottom: 8 }}>
          Al firmar el presente documento, {data.clienteNombre} acepta los términos, alcance, inversión y condiciones de pago descritos en esta propuesta. El inicio del proyecto queda sujeto a la recepción del anticipo correspondiente.
        </Text>
        <View style={s.sigBlock}>
          <View style={s.sigCol}>
            <Text style={s.sigLabel}>PNEUMA STUDIO</Text>
            <View style={s.sigLine} />
            <Text style={s.sigName}>Nazre Assad — Fundador</Text>
            <Text style={s.sigInfo}>Fecha: ____________________</Text>
          </View>
          <View style={s.sigCol}>
            <Text style={s.sigLabel}>{data.clienteNombre.toUpperCase()}</Text>
            <View style={s.sigLine} />
            <Text style={s.sigName}>Nombre y cargo: ____________________</Text>
            <Text style={s.sigInfo}>Fecha: ____________________</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>Pneuma Studio — We design systems. We build the future. — @pneumastudiomx</Text>
        </View>
      </Page>
    </Document>
  );
}
