import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_BLOG_DB_ID;

  if (!apiKey || !dbId) {
    return NextResponse.json({ error: 'Missing env vars', apiKey: !!apiKey, dbId: !!dbId });
  }

  try {
    const notion = new Client({ auth: apiKey });

    // 1. Check DB metadata (column names)
    const db = await notion.databases.retrieve({ database_id: dbId });
    const properties = Object.keys((db as any).properties);

    // 2. Fetch all pages (no filter) to see raw data
    const res = await notion.databases.query({
      database_id: dbId,
      page_size: 10,
    });

    const pages = res.results.map((page: any) => {
      const p = page.properties;
      return {
        id: page.id,
        Estado: p['Estado']?.select?.name ?? null,
        FechaPublicacion: p['FechaPublicacion']?.date?.start ?? null,
        Titulo: p['Título']?.title?.[0]?.plain_text ?? p['Title']?.title?.[0]?.plain_text ?? null,
        Slug: p['Slug']?.rich_text?.[0]?.plain_text ?? null,
      };
    });

    return NextResponse.json({ ok: true, dbProperties: properties, totalPages: res.results.length, pages });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, code: err.code, status: err.status }, { status: 500 });
  }
}
