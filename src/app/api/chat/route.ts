import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getClienteById, getPagosByCliente } from '@/lib/notion';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Eres el asistente virtual de Pneuma Studio, agencia digital en Monterrey, NL, México.
Eres amable, directo y profesional. Hablas en español mexicano.

Tienes DOS modos:

── MODO CLIENTE ──
Si alguien menciona que es cliente o da un número de factura (PS-XX):
1. Pide su número de factura si no lo dio
2. Usa buscar_cliente con ese número
3. Responde CUALQUIER duda sobre su plan, pagos, fechas, facturas, avance de proyecto, documentos, mensualidad, etc.
Pneuma Studio cree en la transparencia total: el cliente puede ver todo su expediente.

── MODO PROSPECTO ──
Si es alguien nuevo interesado en servicios, recopila esta información en conversación natural (no como cuestionario):
1. ¿Qué tipo de proyecto o sistema necesita?
2. ¿Cómo se llama su negocio y a qué se dedica (giro)?
3. ¿Cuál es su presupuesto aproximado en MXN?
4. ¿Para cuándo lo necesita?
5. Nombre completo
6. Email
7. WhatsApp (de preferencia)
Cuando tengas todos esos datos, usa crear_lead para registrarlo en el CRM.
Para dar estimados de precio, basa tu respuesta en los paquetes reales de Pneuma Studio (ver abajo).

── PAQUETES Y PRECIOS (MXN) ──
Starter        — $25,000 inicial + $699/mes | Sitio web profesional, dominio, formularios, WhatsApp preconfigurado, Analytics. Mantenimiento $1,500/mes (variable).
Esencial       — $45,900 inicial + $999/mes | Todo Starter + sitio multi-página premium, formularios avanzados, soporte 8 hrs/mes. Mantenimiento $2,000/mes.
Professional ★ — $75,900 inicial + $1,699/mes | Todo Esencial + carrito, pagos con tarjeta, panel admin, cupones, analytics avanzado, soporte 12 hrs/mes. Mantenimiento $4,000/mes.
Premium        — $125,900 inicial + $2,699/mes | Todo Professional + historial de compras, CRM follow-up, respuestas inteligentes, reportes avanzados. Mantenimiento $7,500/mes.
Enterprise     — Desde $180,000 inicial + desde $4,900/mes | Arquitectura a medida, equipo dedicado, SLA garantizado. Mantenimiento negociable.

── ADD-ONS ──
Integración Mercado Libre    — $8,000 inicial + $1,500/mes
Automatización WhatsApp Avz. — $12,000 inicial + $2,200/mes
SEO Avanzado + Contenido     — $5,000/mes
Soporte Prioritario          — $2,500/mes

Todos los precios en MXN. También disponibles en USD (ver página de precios para tipo de cambio).

Contacto directo: WhatsApp +52 1 81 1633 3559 · studio@pneumastudio.mx`;

const tools: Anthropic.Tool[] = [
  {
    name: 'buscar_cliente',
    description: 'Obtiene toda la información de un cliente de Pneuma Studio usando su número de factura.',
    input_schema: {
      type: 'object' as const,
      properties: {
        numero_factura: {
          type: 'string',
          description: 'Número de factura del cliente. Ejemplos: PS-42, PS42, 42',
        },
      },
      required: ['numero_factura'],
    },
  },
  {
    name: 'crear_lead',
    description: 'Registra un nuevo prospecto en el CRM de Pneuma Studio.',
    input_schema: {
      type: 'object' as const,
      properties: {
        nombre: { type: 'string', description: 'Nombre completo' },
        email: { type: 'string', description: 'Correo electrónico' },
        telefono: { type: 'string', description: 'Teléfono o WhatsApp (opcional)' },
        empresa: { type: 'string', description: 'Nombre del negocio/empresa' },
        giro: { type: 'string', description: 'Giro o industria del negocio' },
        servicio: { type: 'string', description: 'Servicio de interés' },
        presupuesto: { type: 'string', description: 'Presupuesto aproximado en MXN' },
        mensaje: { type: 'string', description: 'Resumen del proyecto que necesita' },
      },
      required: ['nombre', 'email', 'mensaje'],
    },
  },
];

async function ejecutarBuscarCliente(numeroFactura: string) {
  const supabase = createAdminClient();
  const normalized = numeroFactura.toUpperCase().replace(/^PS-?/, '').trim();

  const { data: facturas } = await supabase
    .from('facturas')
    .select('*')
    .or(`numero_factura.ilike.%${normalized}%,numero_factura.ilike.PS-${normalized}%`)
    .order('created_at', { ascending: false });

  if (!facturas?.length) {
    return { error: 'No encontré ninguna factura con ese número. ¿Puedes verificarlo?' };
  }

  const factura = facturas[0];
  const notionId = factura.notion_client_id;

  const [cliente, pagos, portalesResult, todasFacturasResult] = await Promise.all([
    notionId ? getClienteById(notionId) : Promise.resolve(null),
    notionId ? getPagosByCliente(notionId) : Promise.resolve([]),
    supabase.from('project_portals').select('*').eq('notion_client_id', notionId),
    supabase
      .from('facturas')
      .select('id, numero_factura, monto, moneda, fecha_factura, original_name, created_at')
      .eq('notion_client_id', notionId)
      .order('created_at', { ascending: false }),
  ]);

  return {
    cliente,
    ultimosPagos: pagos.slice(0, 10),
    portal: portalesResult.data?.[0] ?? null,
    facturas: todasFacturasResult.data ?? [],
  };
}

async function ejecutarCrearLead(datos: Record<string, string>) {
  const supabase = createAdminClient();

  const { error } = await supabase.from('leads').insert({
    name: datos.nombre,
    email: datos.email,
    phone: datos.telefono || null,
    company: datos.empresa ? `${datos.empresa}${datos.giro ? ` — ${datos.giro}` : ''}` : null,
    service: datos.servicio || null,
    budget: datos.presupuesto || null,
    message: datos.mensaje,
    status: 'nuevo',
    source: 'chatbot',
  });

  if (error) return { error: 'Error al registrar. Por favor contáctanos directamente.' };
  return { ok: true };
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Mensajes inválidos' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Servicio no configurado' }, { status: 500 });
  }

  const chatMessages: Anthropic.MessageParam[] = messages.map((m: { role: string; content: string }) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  let response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    tools,
    messages: chatMessages,
  });

  // Agentic loop: resolve all tool calls before returning
  while (response.stop_reason === 'tool_use') {
    const toolBlocks = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
    );

    const toolResults: Anthropic.ToolResultBlockParam[] = await Promise.all(
      toolBlocks.map(async (block) => {
        let result: unknown;
        if (block.name === 'buscar_cliente') {
          result = await ejecutarBuscarCliente((block.input as { numero_factura: string }).numero_factura);
        } else if (block.name === 'crear_lead') {
          result = await ejecutarCrearLead(block.input as Record<string, string>);
        } else {
          result = { error: 'Herramienta no reconocida' };
        }
        return {
          type: 'tool_result' as const,
          tool_use_id: block.id,
          content: JSON.stringify(result),
        };
      })
    );

    chatMessages.push(
      { role: 'assistant', content: response.content },
      { role: 'user', content: toolResults }
    );

    response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools,
      messages: chatMessages,
    });
  }

  const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === 'text');

  return NextResponse.json({
    message: textBlock?.text ?? 'Lo siento, no pude procesar tu mensaje.',
  });
}
