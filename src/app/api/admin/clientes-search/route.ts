import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const CLIENTES_DB = process.env.NOTION_CLIENTES_DB_ID!;

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const q = request.nextUrl.searchParams.get('q')?.trim() ?? '';

  try {
    const res: any = await notion.databases.query({
      database_id: CLIENTES_DB,
      filter: q
        ? { property: 'Nombre', title: { contains: q } }
        : undefined,
      page_size: 20,
    });

    const clients = res.results
      .map((page: any) => {
        const p = page.properties;
        return {
          id: page.id,
          nombre: p['Nombre']?.title?.[0]?.plain_text ?? '',
          empresa: p['Empresa']?.rich_text?.[0]?.plain_text ?? '',
          email: p['Email']?.email ?? '',
        };
      })
      .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre, 'es'));

    return NextResponse.json(clients);
  } catch (err: any) {
    console.error('[clientes-search]', err?.message);
    return NextResponse.json([], { status: 200 });
  }
}
