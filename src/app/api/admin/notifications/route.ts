import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { getAllClientes, getAllPagos } from '@/lib/notion';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminClient();

  const [clientes, pagos, leadsRes] = await Promise.all([
    getAllClientes(),
    getAllPagos(),
    supabase.from('leads').select('id', { count: 'exact', head: true }).eq('estado', 'Nuevo'),
  ]);

  const morosos = clientes.filter((c: { estado: string }) => c.estado === 'Moroso').length;
  const vencidos = pagos.filter((p: { estado: string }) => p.estado === 'Vencido').length;
  const leads = leadsRes.count ?? 0;

  const notifications: Array<{ type: string; count: number; label: string; color: string }> = [];

  if (morosos > 0) notifications.push({
    type: 'moroso',
    count: morosos,
    label: `${morosos} cliente${morosos > 1 ? 's' : ''} moroso${morosos > 1 ? 's' : ''}`,
    color: '#EF4444',
  });

  if (vencidos > 0) notifications.push({
    type: 'vencido',
    count: vencidos,
    label: `${vencidos} pago${vencidos > 1 ? 's' : ''} vencido${vencidos > 1 ? 's' : ''}`,
    color: '#F59E0B',
  });

  if (leads > 0) notifications.push({
    type: 'lead',
    count: leads,
    label: `${leads} lead${leads > 1 ? 's' : ''} nuevo${leads > 1 ? 's' : ''}`,
    color: '#3B82F6',
  });

  return NextResponse.json({
    notifications,
    total: notifications.reduce((s, n) => s + n.count, 0),
  });
}
