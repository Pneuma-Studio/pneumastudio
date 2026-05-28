import { NextRequest, NextResponse } from 'next/server';
import { updatePagoStatus, deletePago } from '@/lib/notion';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    await updatePagoStatus(id, body.estado, body.referencia, body.factura, body.fechaCobro);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating pago:', error);
    return NextResponse.json({ error: error.message || 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await deletePago(id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting pago:', error);
    return NextResponse.json({ error: error.message || 'Error interno' }, { status: 500 });
  }
}
