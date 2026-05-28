import { NextRequest, NextResponse } from 'next/server';
import { createCliente, createPago } from '@/lib/notion';
import { getAdminSession } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();

    const cliente = await createCliente({
      nombre: body.nombre,
      empresa: body.empresa || '',
      email: body.email,
      whatsapp: body.whatsapp || '',
      paquete: body.paquete,
      addons: body.addons || [],
      moneda: body.moneda,
      inversionInicial: body.inversionInicial || 0,
      mensualidad: body.mensualidad,
      fechaInicio: body.fechaInicio,
      fechaCobro: body.fechaCobro,
      estado: body.estado,
      metodoPago: body.metodoPago,
      stripeCustomerId: body.stripeCustomerId || '',
      notas: body.notas || '',
    });

    if (body.inversionInicial > 0) {
      await createPago({
        clienteId: cliente.id,
        tipo: 'Anticipo',
        monto: body.inversionInicial * 0.5,
        moneda: body.moneda,
        fechaCobro: body.fechaInicio,
        estado: 'Pendiente',
        metodo: body.metodoPago,
        referencia: '',
        factura: false,
        notas: 'Anticipo 50% generado automáticamente',
      });
    }

    return NextResponse.json({ cliente }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating cliente:', error);
    return NextResponse.json({ error: error.message || 'Error interno' }, { status: 500 });
  }
}
