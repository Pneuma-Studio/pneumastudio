import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_BLOG_DB_ID;

  // Step 1: check env vars
  if (!apiKey || !dbId) {
    return NextResponse.json({
      step: 'env_check',
      error: 'Missing env vars',
      NOTION_API_KEY: !!apiKey,
      NOTION_BLOG_DB_ID: !!dbId,
      dbIdValue: dbId ?? '(not set)',
    });
  }

  const notion = new Client({ auth: apiKey });

  // Step 2: retrieve DB metadata
  let dbMeta: any = null;
  try {
    dbMeta = await notion.databases.retrieve({ database_id: dbId });
  } catch (err: any) {
    return NextResponse.json({
      step: 'retrieve_db',
      error: err.message,
      code: err.code,
      status: err.status,
      hint: err.code === 'object_not_found'
        ? 'La integración NO tiene acceso a esta BD. Abre la BD en Notion → ... → Connections → agrega tu integración.'
        : err.code === 'unauthorized'
        ? 'NOTION_API_KEY inválida o sin permisos.'
        : 'Error desconocido al acceder a la BD.',
    }, { status: 500 });
  }

  const properties = dbMeta?.properties ? Object.keys(dbMeta.properties) : [];

  // Step 3: query pages (no filter)
  let pages: any[] = [];
  try {
    const res = await notion.databases.query({ database_id: dbId, page_size: 10 });
    pages = res.results.map((page: any) => {
      const p = page.properties ?? {};
      return {
        id: page.id,
        Estado: p['Estado']?.select?.name ?? '(vacío)',
        FechaPublicacion: p['FechaPublicacion']?.date?.start ?? '(vacío)',
        Titulo: p['Título']?.title?.[0]?.plain_text
          ?? p['Title']?.title?.[0]?.plain_text
          ?? '(vacío)',
        Slug: p['Slug']?.rich_text?.[0]?.plain_text ?? '(vacío)',
      };
    });
  } catch (err: any) {
    return NextResponse.json({
      step: 'query_pages',
      error: err.message,
      dbProperties: properties,
    }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    dbId,
    dbProperties: properties,
    totalPages: pages.length,
    pages,
    hint: pages.length === 0
      ? 'La BD está vacía o la integración no tiene posts visibles.'
      : 'Datos encontrados. Verifica que Estado="Publicado" y FechaPublicacion <= hoy.',
  });
}
