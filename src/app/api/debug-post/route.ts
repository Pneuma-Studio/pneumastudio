import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_BLOG_DB_ID;

  if (!apiKey || !dbId) {
    return NextResponse.json({ error: 'Missing env vars', apiKey: !!apiKey, dbId: !!dbId });
  }

  const notion = new Client({ auth: apiKey });

  // Step 1: query published posts
  let posts: any[] = [];
  let queryError: any = null;
  try {
    const today = new Date().toISOString().split('T')[0];
    const res: any = await notion.databases.query({
      database_id: dbId,
      filter: {
        and: [
          { property: 'Estado', select: { equals: 'Publicado' } },
          { property: 'FechaPublicación', date: { on_or_before: today } },
        ],
      },
      page_size: 10,
    });
    posts = res.results.map((page: any) => {
      const p = page.properties ?? {};
      return {
        id: page.id,
        titulo: p['Título']?.title?.[0]?.plain_text ?? p['Title']?.title?.[0]?.plain_text ?? '(vacío)',
        slug: p['Slug']?.rich_text?.[0]?.plain_text ?? '(vacío)',
        estado: p['Estado']?.select?.name ?? '(vacío)',
        fecha: p['FechaPublicación']?.date?.start ?? '(vacío)',
        rawSlugProp: JSON.stringify(p['Slug']),
      };
    });
  } catch (err: any) {
    queryError = { message: err.message, code: err.code };
  }

  if (queryError) {
    return NextResponse.json({ step: 'query', error: queryError });
  }

  if (!posts.length) {
    return NextResponse.json({ step: 'query', posts: [], hint: 'No posts found — check Estado=Publicado and FechaPublicación <= today' });
  }

  const post = posts[0];

  // Step 2: fetch blocks
  let blocks: any[] = [];
  let blocksError: any = null;
  try {
    const res: any = await notion.blocks.children.list({ block_id: post.id, page_size: 100 });
    blocks = res.results.map((b: any) => ({
      type: b.type,
      keys: b[b.type] ? Object.keys(b[b.type]) : [],
      raw: JSON.stringify(b[b.type]).slice(0, 200),
    }));
  } catch (err: any) {
    blocksError = { message: err.message, code: err.code };
  }

  return NextResponse.json({
    ok: true,
    posts,
    firstPost: post,
    blocks,
    blocksError,
  });
}
