import { getAllClientes, getPagosByMonth, getMRR } from '@/lib/notion';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const [clientes, pagosThisMonth, mrr] = await Promise.all([
    getAllClientes().catch(() => []),
    getPagosByMonth(year, month).catch(() => []),
    getMRR().catch(() => ({ mxn: 0, usd: 0 })),
  ]);

  const cobradoMXN = pagosThisMonth.filter(p => p.estado === 'Pagado' && p.moneda === 'MXN').reduce((s, p) => s + p.monto, 0);
  const cobradoUSD = pagosThisMonth.filter(p => p.estado === 'Pagado' && p.moneda === 'USD').reduce((s, p) => s + p.monto, 0);

  const pendienteMXN = pagosThisMonth.filter(p => p.estado === 'Pendiente' && p.moneda === 'MXN').reduce((s, p) => s + p.monto, 0);
  const pendienteUSD = pagosThisMonth.filter(p => p.estado === 'Pendiente' && p.moneda === 'USD').reduce((s, p) => s + p.monto, 0);

  const activos = clientes.filter(c => c.estado === 'Activo');
  const enStripe = activos.filter(c => c.metodoPago === 'Stripe').length;
  const porTransferencia = activos.filter(c => c.metodoPago === 'Transferencia SPEI').length;

  return (
    <DashboardClient
      clientes={clientes}
      pagosThisMonth={pagosThisMonth}
      mrr={mrr}
      cobradoMXN={cobradoMXN}
      cobradoUSD={cobradoUSD}
      pendienteMXN={pendienteMXN}
      pendienteUSD={pendienteUSD}
      activosCount={activos.length}
      enStripe={enStripe}
      porTransferencia={porTransferencia}
      currentYear={year}
      currentMonth={month}
    />
  );
}
