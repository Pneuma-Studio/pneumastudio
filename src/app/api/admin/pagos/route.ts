import { NextRequest, NextResponse } from 'next/server';
import { createPago } from '@/lib/notion';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();

    const pago = await createPago({
      clienteId: body.clienteId,
      tipo: body.tipo,
      monto: body.monto,
      moneda: body.moneda,
      fechaCobro: body.fechaCobro,
      estado: body.estado,
      metodo: body.metodo,
      referencia: body.referencia || '',
      factura: body.factura || false,
      notas: body.notas || '',
    });

    return NextResponse.json({ pago }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating pago:', error);
    return NextResponse.json({ error: error.message || 'Error interno' }, { status: 500 });
  }
}
