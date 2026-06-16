import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { generateMonthlyPayments } from '@/lib/notion';

async function authorize(req: NextRequest): Promise<boolean> {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get('authorization');
    if (authHeader === `Bearer ${cronSecret}`) return true;
  }
  return !!(await getAdminSession());
}

async function run(year?: number, month?: number) {
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = month ?? (now.getMonth() + 1);
  const created = await generateMonthlyPayments(y, m);
  return {
    ok: true,
    year: y,
    month: m,
    created: created.length,
    mensaje: created.length === 0 ? 'Todos los clientes ya tienen mensualidad este mes' : `${created.length} mensualidad(es) generada(s)`,
  };
}

export async function GET(req: NextRequest) {
  if (!(await authorize(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const url = new URL(req.url);
    const year = url.searchParams.get('year') ? parseInt(url.searchParams.get('year')!) : undefined;
    const month = url.searchParams.get('month') ? parseInt(url.searchParams.get('month')!) : undefined;
    return NextResponse.json(await run(year, month));
  } catch (err: any) {
    console.error('[cron/generar-pagos]', err?.message);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await authorize(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json().catch(() => ({}));
    return NextResponse.json(await run(body.year, body.month));
  } catch (err: any) {
    console.error('[cron/generar-pagos]', err?.message);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
