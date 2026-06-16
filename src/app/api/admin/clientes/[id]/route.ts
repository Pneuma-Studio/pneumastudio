import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { updateCliente, getClienteById } from '@/lib/notion';
import { logAudit } from '@/lib/supabase/audit';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  try {
    // Capture before-state for audit diff
    const before = await getClienteById(id).catch(() => null);

    await updateCliente(id, body);

    // Build change diff for audit
    const changes: Record<string, { from: any; to: any }> = {};
    if (before) {
      const tracked = ['nombre', 'estado', 'paquete', 'mensualidad', 'metodoPago', 'moneda'] as const;
      for (const key of tracked) {
        if (body[key] !== undefined && body[key] !== (before as any)[key]) {
          changes[key] = { from: (before as any)[key], to: body[key] };
        }
      }
    }

    logAudit({
      entity_type: 'cliente',
      entity_id: id,
      entity_name: before?.nombre ?? id,
      action: 'update',
      details: { changes },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[clientes PATCH]', err?.message);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
