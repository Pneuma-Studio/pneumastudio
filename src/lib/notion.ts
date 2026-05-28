import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const CLIENTES_DB = process.env.NOTION_CLIENTES_DB_ID!;
const PAGOS_DB = process.env.NOTION_PAGOS_DB_ID!;

// ─── Types ────────────────────────────────────────────────────────────────────

export type ClienteEstado = 'Activo' | 'Pausado' | 'Cancelado' | 'Moroso';
export type ClientePaquete = 'Starter' | 'Esencial' | 'Profesional' | 'Premium' | 'Enterprise' | 'Personalizado';
export type ClienteMoneda = 'MXN' | 'USD';
export type ClienteMetodoPago = 'Stripe' | 'Transferencia SPEI' | 'Efectivo' | 'Otro';
export type ClienteFechaCobro = '1' | '5' | '10' | '15' | '20';

export interface Cliente {
  id: string;
  nombre: string;
  empresa: string;
  email: string;
  whatsapp: string;
  paquete: ClientePaquete;
  addons: string[];
  moneda: ClienteMoneda;
  inversionInicial: number;
  mensualidad: number;
  fechaInicio: string;
  fechaCobro: ClienteFechaCobro;
  estado: ClienteEstado;
  metodoPago: ClienteMetodoPago;
  stripeCustomerId: string;
  notas: string;
}

export type PagoEstado = 'Pagado' | 'Pendiente' | 'Vencido' | 'Fallido';
export type PagoTipo = 'Anticipo' | 'Saldo Final' | 'Mensualidad' | 'Mantenimiento' | 'Add-on';
export type PagoMetodo = 'Stripe' | 'Transferencia SPEI' | 'Efectivo' | 'Otro';

export interface Pago {
  id: string;
  idPago: string;
  clienteId: string;
  clienteNombre: string;
  tipo: PagoTipo;
  monto: number;
  moneda: ClienteMoneda;
  fechaCobro: string;
  estado: PagoEstado;
  metodo: PagoMetodo;
  referencia: string;
  factura: boolean;
  notas: string;
}

export interface ClienteInput {
  nombre: string;
  empresa: string;
  email: string;
  whatsapp: string;
  paquete: ClientePaquete;
  addons: string[];
  moneda: ClienteMoneda;
  inversionInicial: number;
  mensualidad: number;
  fechaInicio: string;
  fechaCobro: ClienteFechaCobro;
  estado: ClienteEstado;
  metodoPago: ClienteMetodoPago;
  stripeCustomerId?: string;
  notas?: string;
}

export interface PaymentInput {
  clienteId: string;
  tipo: PagoTipo;
  monto: number;
  moneda: ClienteMoneda;
  fechaCobro: string;
  estado: PagoEstado;
  metodo: PagoMetodo;
  referencia?: string;
  factura?: boolean;
  notas?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractText(prop: any): string {
  if (!prop) return '';
  if (prop.type === 'title') return prop.title?.[0]?.plain_text ?? '';
  if (prop.type === 'rich_text') return prop.rich_text?.[0]?.plain_text ?? '';
  if (prop.type === 'email') return prop.email ?? '';
  if (prop.type === 'phone_number') return prop.phone_number ?? '';
  return '';
}

function extractSelect(prop: any): string {
  return prop?.select?.name ?? '';
}

function extractMultiSelect(prop: any): string[] {
  return prop?.multi_select?.map((s: any) => s.name) ?? [];
}

function extractNumber(prop: any): number {
  return prop?.number ?? 0;
}

function extractDate(prop: any): string {
  return prop?.date?.start ?? '';
}

function extractCheckbox(prop: any): boolean {
  return prop?.checkbox ?? false;
}

function mapCliente(page: any): Cliente {
  const p = page.properties;
  return {
    id: page.id,
    nombre: extractText(p['Nombre']),
    empresa: extractText(p['Empresa']),
    email: extractText(p['Email']),
    whatsapp: extractText(p['WhatsApp']),
    paquete: extractSelect(p['Paquete']) as ClientePaquete,
    addons: extractMultiSelect(p['Add-ons']),
    moneda: extractSelect(p['Moneda']) as ClienteMoneda,
    inversionInicial: extractNumber(p['Inversión Inicial']),
    mensualidad: extractNumber(p['Mensualidad']),
    fechaInicio: extractDate(p['Fecha de Inicio']),
    fechaCobro: extractSelect(p['Fecha de Cobro']) as ClienteFechaCobro,
    estado: extractSelect(p['Estado']) as ClienteEstado,
    metodoPago: extractSelect(p['Método de Pago']) as ClienteMetodoPago,
    stripeCustomerId: extractText(p['Stripe Customer ID']),
    notas: extractText(p['Notas']),
  };
}

function mapPago(page: any): Pago {
  const p = page.properties;
  const clienteRelation = p['Cliente']?.relation?.[0];
  return {
    id: page.id,
    idPago: extractText(p['ID Pago']),
    clienteId: clienteRelation?.id ?? '',
    clienteNombre: '',
    tipo: extractSelect(p['Tipo']) as PagoTipo,
    monto: extractNumber(p['Monto']),
    moneda: extractSelect(p['Moneda']) as ClienteMoneda,
    fechaCobro: extractDate(p['Fecha de Cobro']),
    estado: extractSelect(p['Estado']) as PagoEstado,
    metodo: extractSelect(p['Método']) as PagoMetodo,
    referencia: extractText(p['Referencia']),
    factura: extractCheckbox(p['Factura']),
    notas: extractText(p['Notas']),
  };
}

// ─── Client Operations ────────────────────────────────────────────────────────

export async function getAllClientes(): Promise<Cliente[]> {
  const pages: any[] = [];
  let cursor: string | undefined;

  do {
    const res: any = await notion.databases.query({
      database_id: CLIENTES_DB,
      start_cursor: cursor,
      page_size: 100,
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  return pages.map(mapCliente);
}

export async function getActiveClientes(): Promise<Cliente[]> {
  const res: any = await notion.databases.query({
    database_id: CLIENTES_DB,
    filter: { property: 'Estado', select: { equals: 'Activo' } },
  });
  return res.results.map(mapCliente);
}

export async function getClienteById(id: string): Promise<Cliente | null> {
  try {
    const page: any = await notion.pages.retrieve({ page_id: id });
    return mapCliente(page);
  } catch {
    return null;
  }
}

export async function createCliente(data: ClienteInput): Promise<Cliente> {
  const page: any = await notion.pages.create({
    parent: { database_id: CLIENTES_DB },
    properties: {
      'Nombre': { title: [{ text: { content: data.nombre } }] },
      'Empresa': { rich_text: [{ text: { content: data.empresa } }] },
      'Email': { email: data.email },
      'WhatsApp': { phone_number: data.whatsapp },
      'Paquete': { select: { name: data.paquete } },
      'Add-ons': { multi_select: data.addons.map(a => ({ name: a })) },
      'Moneda': { select: { name: data.moneda } },
      'Inversión Inicial': { number: data.inversionInicial },
      'Mensualidad': { number: data.mensualidad },
      'Fecha de Inicio': { date: { start: data.fechaInicio } },
      'Fecha de Cobro': { select: { name: data.fechaCobro } },
      'Estado': { select: { name: data.estado } },
      'Método de Pago': { select: { name: data.metodoPago } },
      'Stripe Customer ID': { rich_text: [{ text: { content: data.stripeCustomerId ?? '' } }] },
      'Notas': { rich_text: [{ text: { content: data.notas ?? '' } }] },
    },
  });
  return mapCliente(page);
}

export async function updateCliente(id: string, data: Partial<ClienteInput>): Promise<void> {
  const props: any = {};
  if (data.nombre !== undefined) props['Nombre'] = { title: [{ text: { content: data.nombre } }] };
  if (data.empresa !== undefined) props['Empresa'] = { rich_text: [{ text: { content: data.empresa } }] };
  if (data.email !== undefined) props['Email'] = { email: data.email };
  if (data.whatsapp !== undefined) props['WhatsApp'] = { phone_number: data.whatsapp };
  if (data.paquete !== undefined) props['Paquete'] = { select: { name: data.paquete } };
  if (data.addons !== undefined) props['Add-ons'] = { multi_select: data.addons.map(a => ({ name: a })) };
  if (data.moneda !== undefined) props['Moneda'] = { select: { name: data.moneda } };
  if (data.inversionInicial !== undefined) props['Inversión Inicial'] = { number: data.inversionInicial };
  if (data.mensualidad !== undefined) props['Mensualidad'] = { number: data.mensualidad };
  if (data.fechaInicio !== undefined) props['Fecha de Inicio'] = { date: { start: data.fechaInicio } };
  if (data.fechaCobro !== undefined) props['Fecha de Cobro'] = { select: { name: data.fechaCobro } };
  if (data.estado !== undefined) props['Estado'] = { select: { name: data.estado } };
  if (data.metodoPago !== undefined) props['Método de Pago'] = { select: { name: data.metodoPago } };
  if (data.stripeCustomerId !== undefined) props['Stripe Customer ID'] = { rich_text: [{ text: { content: data.stripeCustomerId } }] };
  if (data.notas !== undefined) props['Notas'] = { rich_text: [{ text: { content: data.notas } }] };

  await notion.pages.update({ page_id: id, properties: props });
}

// ─── Payment Operations ───────────────────────────────────────────────────────

export async function getAllPagos(): Promise<Pago[]> {
  const pages: any[] = [];
  let cursor: string | undefined;

  do {
    const res: any = await notion.databases.query({
      database_id: PAGOS_DB,
      start_cursor: cursor,
      page_size: 100,
      sorts: [{ property: 'Fecha de Cobro', direction: 'descending' }],
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  return pages.map(mapPago);
}

export async function getPagosByCliente(clienteId: string): Promise<Pago[]> {
  const res: any = await notion.databases.query({
    database_id: PAGOS_DB,
    filter: { property: 'Cliente', relation: { contains: clienteId } },
    sorts: [{ property: 'Fecha de Cobro', direction: 'descending' }],
  });
  return res.results.map(mapPago);
}

export async function getPagosByMonth(year: number, month: number): Promise<Pago[]> {
  const start = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const end = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

  const res: any = await notion.databases.query({
    database_id: PAGOS_DB,
    filter: {
      and: [
        { property: 'Fecha de Cobro', date: { on_or_after: start } },
        { property: 'Fecha de Cobro', date: { on_or_before: end } },
      ],
    },
    sorts: [{ property: 'Fecha de Cobro', direction: 'descending' }],
  });
  return res.results.map(mapPago);
}

export async function getMRR(): Promise<{ mxn: number; usd: number }> {
  const activos = await getActiveClientes();
  const mxn = activos.filter(c => c.moneda === 'MXN').reduce((s, c) => s + c.mensualidad, 0);
  const usd = activos.filter(c => c.moneda === 'USD').reduce((s, c) => s + c.mensualidad, 0);
  return { mxn, usd };
}

export async function createPago(data: PaymentInput): Promise<Pago> {
  const now = new Date();
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  const idPago = `PAY-${now.getFullYear()}-${seq}`;

  const page: any = await notion.pages.create({
    parent: { database_id: PAGOS_DB },
    properties: {
      'ID Pago': { title: [{ text: { content: idPago } }] },
      'Cliente': { relation: [{ id: data.clienteId }] },
      'Tipo': { select: { name: data.tipo } },
      'Monto': { number: data.monto },
      'Moneda': { select: { name: data.moneda } },
      'Fecha de Cobro': { date: { start: data.fechaCobro } },
      'Estado': { select: { name: data.estado } },
      'Método': { select: { name: data.metodo } },
      'Referencia': { rich_text: [{ text: { content: data.referencia ?? '' } }] },
      'Factura': { checkbox: data.factura ?? false },
      'Notas': { rich_text: [{ text: { content: data.notas ?? '' } }] },
    },
  });
  return mapPago(page);
}

export async function updatePagoStatus(
  pagoId: string,
  estado: PagoEstado,
  referencia?: string,
  factura?: boolean,
  fechaCobro?: string
): Promise<void> {
  const props: any = { 'Estado': { select: { name: estado } } };
  if (referencia !== undefined) props['Referencia'] = { rich_text: [{ text: { content: referencia } }] };
  if (factura !== undefined) props['Factura'] = { checkbox: factura };
  if (fechaCobro !== undefined) props['Fecha de Cobro'] = { date: { start: fechaCobro } };
  await notion.pages.update({ page_id: pagoId, properties: props });
}

export async function updatePago(pagoId: string, data: Partial<PaymentInput>): Promise<void> {
  const props: any = {};
  if (data.tipo !== undefined) props['Tipo'] = { select: { name: data.tipo } };
  if (data.monto !== undefined) props['Monto'] = { number: data.monto };
  if (data.moneda !== undefined) props['Moneda'] = { select: { name: data.moneda } };
  if (data.fechaCobro !== undefined) props['Fecha de Cobro'] = { date: { start: data.fechaCobro } };
  if (data.estado !== undefined) props['Estado'] = { select: { name: data.estado } };
  if (data.metodo !== undefined) props['Método'] = { select: { name: data.metodo } };
  if (data.referencia !== undefined) props['Referencia'] = { rich_text: [{ text: { content: data.referencia } }] };
  if (data.factura !== undefined) props['Factura'] = { checkbox: data.factura };
  if (data.notas !== undefined) props['Notas'] = { rich_text: [{ text: { content: data.notas } }] };
  await notion.pages.update({ page_id: pagoId, properties: props });
}

export async function deletePago(pagoId: string): Promise<void> {
  await notion.pages.update({ page_id: pagoId, properties: { 'Estado': { select: { name: 'Fallido' } } } });
}

export async function generateMonthlyPayments(year: number, month: number): Promise<Pago[]> {
  const activos = await getActiveClientes();
  const existing = await getPagosByMonth(year, month);
  const existingClientIds = new Set(existing.filter(p => p.tipo === 'Mensualidad').map(p => p.clienteId));

  const toCreate = activos.filter(c => !existingClientIds.has(c.id));
  const created: Pago[] = [];

  for (const cliente of toCreate) {
    const day = parseInt(cliente.fechaCobro || '1', 10);
    const fechaCobro = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const pago = await createPago({
      clienteId: cliente.id,
      tipo: 'Mensualidad',
      monto: cliente.mensualidad,
      moneda: cliente.moneda,
      fechaCobro,
      estado: 'Pendiente',
      metodo: cliente.metodoPago,
    });
    created.push(pago);
  }

  return created;
}

export async function findPagoByStripeCustomer(stripeCustomerId: string, year: number, month: number): Promise<Pago | null> {
  // Find client by Stripe Customer ID
  const clientesRes: any = await notion.databases.query({
    database_id: CLIENTES_DB,
    filter: { property: 'Stripe Customer ID', rich_text: { equals: stripeCustomerId } },
  });

  if (!clientesRes.results.length) return null;
  const clienteId = clientesRes.results[0].id;

  // Find pending payment for this month
  const pagos = await getPagosByMonth(year, month);
  return pagos.find(p => p.clienteId === clienteId && p.estado === 'Pendiente') ?? null;
}
