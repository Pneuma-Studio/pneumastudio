import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import { getAllClientes, getPagosByMonth, getMRR } from '@/lib/notion';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;

  const [clientes, pagosThisMonth, pagosLastMonth, mrr] = await Promise.all([
    getAllClientes().catch(() => []),
    getPagosByMonth(year, month).catch(() => []),
    getPagosByMonth(prevYear, prevMonth).catch(() => []),
    getMRR().catch(() => ({ mxn: 0, usd: 0 })),
  ]);

  const cobradoMXN = pagosThisMonth.filter(p => p.estado === 'Pagado' && p.moneda === 'MXN').reduce((s, p) => s + p.monto, 0);
  const cobradoUSD = pagosThisMonth.filter(p => p.estado === 'Pagado' && p.moneda === 'USD').reduce((s, p) => s + p.monto, 0);
  const cobradoLastMXN = pagosLastMonth.filter(p => p.estado === 'Pagado' && p.moneda === 'MXN').reduce((s, p) => s + p.monto, 0);

  const pendienteMXN = pagosThisMonth.filter(p => p.estado === 'Pendiente' && p.moneda === 'MXN').reduce((s, p) => s + p.monto, 0);
  const pendienteUSD = pagosThisMonth.filter(p => p.estado === 'Pendiente' && p.moneda === 'USD').reduce((s, p) => s + p.monto, 0);

  const today = now.toISOString().split('T')[0];
  const vencidoCount = pagosThisMonth.filter(p => p.estado === 'Pendiente' && p.fechaCobro < today).length;

  const activos = clientes.filter(c => c.estado === 'Activo');
  const morosoCount = clientes.filter(c => c.estado === 'Moroso').length;
  const pausadoCount = clientes.filter(c => c.estado === 'Pausado').length;
  const enStripe = activos.filter(c => c.metodoPago === 'Stripe').length;
  const porTransferencia = activos.filter(c => c.metodoPago === 'Transferencia SPEI').length;

  return (
    <DashboardClient
      clientes={clientes}
      pagosThisMonth={pagosThisMonth}
      mrr={mrr}
      cobradoMXN={cobradoMXN}
      cobradoUSD={cobradoUSD}
      cobradoLastMXN={cobradoLastMXN}
      pendienteMXN={pendienteMXN}
      pendienteUSD={pendienteUSD}
      activosCount={activos.length}
      morosoCount={morosoCount}
      pausadoCount={pausadoCount}
      vencidoCount={vencidoCount}
      enStripe={enStripe}
      porTransferencia={porTransferencia}
      currentYear={year}
      currentMonth={month}
    />
  );
}
