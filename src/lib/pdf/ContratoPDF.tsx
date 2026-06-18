import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { DocumentoForm, parseMXN, formatMXN, calcPagos } from './types';

const TEAL = '#00C4A0';
const NAVY = '#0d2137';
const BODY = '#374151';
const LIGHT = '#6B7280';
const BORDER = '#E5E7EB';

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 9, color: BODY, paddingTop: 36, paddingBottom: 44, paddingHorizontal: 44 },
  headerLogo: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: NAVY, letterSpacing: 4, textAlign: 'center' },
  headerStudio: { fontSize: 8, fontFamily: 'Helvetica', color: NAVY, letterSpacing: 6, textAlign: 'center', marginTop: -2 },
  headerTagline: { fontSize: 7.5, color: TEAL, textAlign: 'center', marginTop: 4, fontFamily: 'Helvetica-Bold', letterSpacing: 1 },
  headerContact: { fontSize: 7.5, color: LIGHT, textAlign: 'center', marginTop: 2 },
  headerDivider: { borderBottomWidth: 1, borderBottomColor: TEAL, marginTop: 10, marginBottom: 14 },
  docTitle: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: NAVY, textAlign: 'center', marginBottom: 4 },
  docSubtitle: { fontSize: 10, color: TEAL, textAlign: 'center', marginBottom: 3 },
  docCity: { fontSize: 9, color: LIGHT, textAlign: 'center', marginBottom: 14 },
  sectionWrap: { marginBottom: 14, marginTop: 6 },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: NAVY, paddingBottom: 4, borderBottomWidth: 1.5, borderBottomColor: TEAL, marginBottom: 8 },
  subHead: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: TEAL, marginBottom: 5 },
  body: { fontSize: 8.5, color: BODY, lineHeight: 1.5 },
  bulletRow: { flexDirection: 'row', marginBottom: 3, paddingLeft: 4 },
  bullet: { fontSize: 9, color: BODY, marginRight: 5, marginTop: 0.5 },
  bulletText: { flex: 1, fontSize: 8.5, color: BODY, lineHeight: 1.4 },
  callout: { borderWidth: 1, borderColor: BORDER, borderRadius: 3, padding: 8, marginVertical: 8, backgroundColor: '#FFFBEB' },
  calloutBold: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: NAVY, marginBottom: 3 },
  calloutText: { fontSize: 8, color: BODY, lineHeight: 1.4 },
  table: { borderWidth: 1, borderColor: BORDER, marginBottom: 8 },
  tableHeader: { flexDirection: 'row', backgroundColor: NAVY },
  tableRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: BORDER },
  tableRowAlt: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: BORDER, backgroundColor: '#F9FAFB' },
  tableRowBold: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: BORDER, backgroundColor: '#EFF6FF' },
  thCell: { paddingHorizontal: 8, paddingVertical: 5, fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#FFFFFF' },
  tdCell: { paddingHorizontal: 8, paddingVertical: 5, fontSize: 8.5, color: BODY },
  tdBold: { paddingHorizontal: 8, paddingVertical: 5, fontSize: 8.5, color: NAVY, fontFamily: 'Helvetica-Bold' },
  partesTable: { borderWidth: 1, borderColor: BORDER, marginBottom: 10 },
  partesRow: { flexDirection: 'row' },
  partesCol: { flex: 1, padding: 10, borderRightWidth: 1, borderRightColor: BORDER },
  partesColLast: { flex: 1, padding: 10 },
  partesLabel: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: NAVY, marginBottom: 4 },
  partesText: { fontSize: 8.5, color: BODY, lineHeight: 1.4 },
  note: { fontSize: 7.5, color: LIGHT, marginBottom: 3, lineHeight: 1.4 },
  sigBlock: { flexDirection: 'row', marginTop: 24, gap: 30 },
  sigCol: { flex: 1 },
  sigLabel: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: NAVY, marginBottom: 20 },
  sigLine: { borderBottomWidth: 1, borderBottomColor: NAVY, marginBottom: 4 },
  sigName: { fontSize: 8, color: BODY },
  sigInfo: { fontSize: 7.5, color: LIGHT },
  footer: { position: 'absolute', bottom: 18, left: 44, right: 44, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 6 },
  footerText: { fontSize: 7, color: LIGHT, textAlign: 'center' },
});

function Header() {
  return (
    <>
      <Text style={s.headerLogo}>PNEUMA</Text>
      <Text style={s.headerStudio}>STUDIO</Text>
      <Text style={s.headerTagline}>PREMIUM DIGITAL COMMERCE & AUTOMATION STUDIO</Text>
      <Text style={s.headerContact}>studio@pneumastudio.mx  |  +52 1 81 1633 3559  |  @pneumastudiomx</Text>
      <View style={s.headerDivider} />
    </>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <View style={s.sectionWrap}>
      <Text style={s.sectionTitle}>{number}. {title.toUpperCase()}</Text>
    </View>
  );
}

function BulletList({ items }: { items: string | string[] }) {
  const lines = (Array.isArray(items) ? items : items.split('\n')).map(l => l.trim()).filter(Boolean);
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

const OBLIGACIONES_PNEUMA = [
  'Desarrollar la plataforma conforme al alcance descrito en la Sección III de este contrato',
  'Entregar el proyecto en los tiempos estimados en la Sección IV, contados a partir de la recepción del anticipo y el material del cliente',
  'Mantener comunicación constante con el Cliente sobre el avance del proyecto',
  'Realizar hasta 2 rondas de ajustes incluidas sin costo adicional',
  'Proveer 30 días de soporte técnico gratuito posterior a la entrega',
  'Mantener la confidencialidad de la información del negocio del Cliente',
];

const timeline = [
  { etapa: '1. Brief y configuración', desc: 'Categorías, productos, paleta de colores y estilo', dur: '2–3 días' },
  { etapa: '2. Diseño y desarrollo', desc: 'Plataforma, catálogo, funcionalidades e integraciones', dur: '8–12 días' },
  { etapa: '3. Dominio y configuración', desc: 'Registro de dominio, hosting, SSL', dur: '2–3 días' },
  { etapa: '4. Carga de contenido', desc: 'Alta de contenido con fotos, descripción y precio', dur: '2–4 días' },
  { etapa: '5. Pruebas y ajustes', desc: 'Pruebas funcionales y control de calidad', dur: '2–3 días' },
  { etapa: '6. Capacitación y entrega', desc: 'Capacitación para gestión de productos y operación', dur: '1 día' },
  { etapa: 'TIEMPO TOTAL ESTIMADO', desc: '', dur: '3–4 semanas' },
];

export default function ContratoPDF({ data }: { data: DocumentoForm }) {
  const total = parseMXN(data.totalInicial);
  const pagos = calcPagos(total, 'B'); // Contrato always uses 3-payment structure

  return (
    <Document>
      {/* Page 1 */}
      <Page size="A4" style={s.page}>
        <Header />
        <Text style={s.docTitle}>CONTRATO DE PRESTACIÓN DE SERVICIOS</Text>
        <Text style={s.docSubtitle}>{data.proyectoTitulo}</Text>
        <Text style={s.docCity}>Monterrey, Nuevo León — {data.fechaDoc}</Text>

        {/* I. Partes */}
        <SectionHeading number="I" title="Partes del Contrato" />
        <Text style={[s.body, { marginBottom: 8 }]}>
          El presente contrato de prestación de servicios es celebrado entre:
        </Text>
        <View style={s.partesTable}>
          <View style={s.partesRow}>
            <View style={s.partesCol}>
              <Text style={s.partesLabel}>PRESTADOR DE SERVICIOS</Text>
              <Text style={s.partesText}>
                Pneuma Studio{'\n'}
                Representante: Nazre Hassam Miguel Assad Morales{'\n'}
                Monterrey, Nuevo León, México{'\n'}
                studio@pneumastudio.mx{'\n'}
                +52 1 81 1633 3559
              </Text>
            </View>
            <View style={s.partesColLast}>
              <Text style={s.partesLabel}>CLIENTE</Text>
              <Text style={s.partesText}>
                {data.clienteNombreCompleto || data.clienteNombre}{'\n'}
                {data.clienteCiudad}{'\n'}
                {data.clienteDominio ? `Dominio: ${data.clienteDominio}` : ''}
              </Text>
            </View>
          </View>
        </View>
        <Text style={[s.body, { marginBottom: 14 }]}>
          En adelante denominadas individualmente "La Parte" y en conjunto "Las Partes".
        </Text>

        {/* II. Objeto */}
        <SectionHeading number="II" title="Objeto del Contrato" />
        <Text style={[s.body, { marginBottom: 14 }]}>
          El presente contrato tiene por objeto establecer los términos y condiciones bajo los cuales Pneuma Studio desarrollará y entregará al Cliente: {data.proyectoSubtitulo}.
        </Text>

        {/* III. Alcance */}
        <SectionHeading number="III" title="Alcance y Entregables" />
        {data.alcanceSecciones.map((sec, i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <Text style={s.subHead}>{sec.titulo}</Text>
            <BulletList items={sec.items} />
            {sec.nota.trim() && (
              <View style={s.callout}>
                <Text style={s.calloutText}>{sec.nota}</Text>
              </View>
            )}
          </View>
        ))}

        <View style={s.footer} fixed>
          <Text style={s.footerText}>Pneuma Studio — We design systems. We build the future. — @pneumastudiomx</Text>
        </View>
      </Page>

      {/* Page 2 */}
      <Page size="A4" style={s.page}>
        {/* IV. Tiempos */}
        <SectionHeading number="IV" title="Fechas y Tiempos de Entrega" />
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

        {data.fechaInicio && (
          <View style={[s.callout, { backgroundColor: '#FFFBEB', borderColor: '#FCD34D' }]}>
            <Text style={s.calloutBold}>Fecha tentativa de inicio: {data.fechaInicio}</Text>
            <Text style={s.calloutText}>
              El inicio formal del proyecto queda sujeto a la recepción del primer pago (35%) y la entrega del material requerido por parte del Cliente.
            </Text>
          </View>
        )}

        {/* V. Inversión */}
        <SectionHeading number="V" title="Inversión y Condiciones de Pago" />
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={[s.thCell, { flex: 2.5 }]}>Concepto</Text>
            <Text style={[s.thCell, { flex: 1 }]}>Monto</Text>
          </View>
          {data.conceptosInversion.map((c, i) => (
            <View key={i} style={i % 2 === 1 ? s.tableRowAlt : s.tableRow}>
              <Text style={[s.tdCell, { flex: 2.5 }]}>{c.nombre}</Text>
              <Text style={[s.tdCell, { flex: 1 }]}>{c.inicial}</Text>
            </View>
          ))}
          <View style={s.tableRowBold}>
            <Text style={[s.tdBold, { flex: 2.5 }]}>TOTAL INVERSIÓN INICIAL</Text>
            <Text style={[s.tdBold, { flex: 1 }]}>{data.totalInicial}</Text>
          </View>
          {data.mensualidad && (
            <View style={s.tableRow}>
              <Text style={[s.tdCell, { flex: 2.5 }]}>Mensualidad (hosting, SSL, servidor, base de datos, monitoreo, soporte)</Text>
              <Text style={[s.tdCell, { flex: 1 }]}>{data.mensualidad} / mes</Text>
            </View>
          )}
          {data.mantenimiento && (
            <View style={s.tableRowAlt}>
              <Text style={[s.tdCell, { flex: 2.5 }]}>Mantenimiento variable (solo el mes que se requiera)</Text>
              <Text style={[s.tdCell, { flex: 1 }]}>{data.mantenimiento} / mes</Text>
            </View>
          )}
        </View>

        <Text style={[s.subHead, { marginTop: 8 }]}>Esquema de pagos acordado</Text>
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={[s.thCell, { flex: 2 }]}>Pago</Text>
            <Text style={[s.thCell, { flex: 0.6 }]}>Porcentaje</Text>
            <Text style={[s.thCell, { flex: 1 }]}>Monto</Text>
            <Text style={[s.thCell, { flex: 1.5 }]}>Cuándo</Text>
          </View>
          {pagos.map((p, i) => (
            <View key={i} style={i % 2 === 1 ? s.tableRowAlt : s.tableRow}>
              <Text style={[s.tdCell, { flex: 2 }]}>{p.label}</Text>
              <Text style={[s.tdCell, { flex: 0.6 }]}>{p.pct}%</Text>
              <Text style={[s.tdBold, { flex: 1 }]}>{p.monto}</Text>
              <Text style={[s.tdCell, { flex: 1.5 }]}>{(p as any).cuando || ''}</Text>
            </View>
          ))}
          <View style={s.tableRowBold}>
            <Text style={[s.tdBold, { flex: 2 }]}>TOTAL</Text>
            <Text style={[s.tdBold, { flex: 0.6 }]}>100%</Text>
            <Text style={[s.tdBold, { flex: 1 }]}>{data.totalInicial}</Text>
            <Text style={[s.tdCell, { flex: 1.5 }]}></Text>
          </View>
        </View>

        {data.mensualidad && (
          <Text style={s.note}>* La mensualidad de {data.mensualidad} MXN comienza a cobrarse a partir de la entrega del proyecto (segundo pago).</Text>
        )}
        <Text style={[s.note, { marginTop: 3 }]}>* Los pagos se realizarán vía link de pago, transferencia bancaria o método acordado entre las partes.</Text>

        {/* VI. Obligaciones */}
        <SectionHeading number="VI" title="Obligaciones de las Partes" />
        <Text style={s.subHead}>Pneuma Studio se compromete a:</Text>
        <BulletList items={OBLIGACIONES_PNEUMA.join('\n')} />
        <Text style={[s.subHead, { marginTop: 8 }]}>El Cliente se compromete a:</Text>
        <BulletList items={data.requisitos} />

        <View style={s.footer} fixed>
          <Text style={s.footerText}>Pneuma Studio — We design systems. We build the future. — @pneumastudiomx</Text>
        </View>
      </Page>

      {/* Page 3 — Legal clauses */}
      <Page size="A4" style={s.page}>
        <SectionHeading number="VII" title="Propiedad y Derechos" />
        <Text style={[s.body, { marginBottom: 14 }]}>
          Una vez liquidado el total de la inversión, el Cliente será propietario de la plataforma desarrollada. El dominio registrado será de propiedad exclusiva del Cliente desde el primer día.{'\n\n'}
          Pneuma Studio retiene el derecho de usar el proyecto como referencia en su portafolio, salvo solicitud expresa en contrario por parte del Cliente.
        </Text>

        <SectionHeading number="VIII" title="Confidencialidad" />
        <Text style={[s.body, { marginBottom: 14 }]}>
          Ambas partes se comprometen a mantener en estricta confidencialidad toda la información comercial, técnica y estratégica intercambiada durante la vigencia de este contrato y por un período de 2 años posteriores a su terminación.
        </Text>

        <SectionHeading number="IX" title="Modificaciones al Alcance" />
        <Text style={[s.body, { marginBottom: 14 }]}>
          Cualquier modificación al alcance original descrito en la Sección III deberá ser acordada por escrito entre las partes. Las modificaciones que representen trabajo adicional podrán generar un ajuste en el costo y/o los tiempos de entrega, lo cual será comunicado y aprobado por el Cliente antes de ejecutarse.
        </Text>

        <SectionHeading number="X" title="Terminación del Contrato" />
        <Text style={[s.body, { marginBottom: 14 }]}>
          Cualquiera de las partes podrá dar por terminado este contrato mediante notificación escrita. En caso de cancelación por parte del Cliente una vez iniciado el desarrollo, los pagos realizados hasta esa fecha no serán reembolsables, ya que corresponden al trabajo ejecutado.{'\n\n'}
          En caso de incumplimiento por parte de Pneuma Studio, se compromete a devolver los montos recibidos que no correspondan a trabajo entregado y aprobado.
        </Text>

        <SectionHeading number="XI" title="Resolución de Disputas" />
        <Text style={[s.body, { marginBottom: 14 }]}>
          Ante cualquier discrepancia, Las Partes se comprometen a buscar una solución amistosa en un plazo de 15 días hábiles. De no llegar a un acuerdo, se someterán a la jurisdicción de los tribunales competentes de Monterrey, Nuevo León, México.
        </Text>

        <SectionHeading number="XII" title="Firmas y Aceptación" />
        <Text style={[s.body, { marginBottom: 12 }]}>
          Las partes declaran haber leído, entendido y aceptado íntegramente los términos y condiciones del presente contrato, firmando de conformidad en la ciudad de Monterrey, Nuevo León, el día _____ de _________________ de 2026.
        </Text>
        <View style={s.sigBlock}>
          <View style={s.sigCol}>
            <Text style={s.sigLabel}>PNEUMA STUDIO</Text>
            <View style={s.sigLine} />
            <Text style={s.sigName}>Nazre Hassam Miguel Assad Morales — Fundador</Text>
            <Text style={s.sigInfo}>studio@pneumastudio.mx</Text>
            <Text style={[s.sigInfo, { marginTop: 6 }]}>Fecha: ____________________</Text>
          </View>
          <View style={s.sigCol}>
            <Text style={s.sigLabel}>CLIENTE</Text>
            <View style={s.sigLine} />
            <Text style={s.sigName}>{data.clienteNombreCompleto || data.clienteNombre}</Text>
            <Text style={[s.sigInfo, { marginTop: 6 }]}>Fecha: ____________________</Text>
          </View>
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerText}>Pneuma Studio — We design systems. We build the future. — @pneumastudiomx</Text>
        </View>
      </Page>
    </Document>
  );
}
