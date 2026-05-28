import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { findPagoByStripeCustomer, updatePagoStatus } from '@/lib/notion';
import { createAdminClient } from '@/lib/supabase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2025-04-30.basil' });

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!process.env.STRIPE_WEBHOOK_SECRET || !sig) {
    return NextResponse.json({ error: 'Missing webhook secret or signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  try {
    // New client from Stripe Checkout → auto-occupy one availability slot
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === 'paid' || session.mode === 'subscription') {
        const supabase = createAdminClient();
        const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        const monthLabel = `${MONTHS_ES[now.getMonth()]} ${now.getFullYear()}`;

        // Find the active slot for this month
        const { data: activeSlot } = await supabase
          .from('availability_slots')
          .select('id, taken_slots, total_slots')
          .eq('month_label', monthLabel)
          .eq('is_active', true)
          .single();

        if (activeSlot && activeSlot.taken_slots < activeSlot.total_slots) {
          await supabase
            .from('availability_slots')
            .update({ taken_slots: activeSlot.taken_slots + 1 })
            .eq('id', activeSlot.id);
          console.log(`📅 Lugar ocupado automáticamente en ${monthLabel} (Stripe checkout ${session.id})`);
        }
      }
    }

    if (event.type === 'invoice.paid') {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
      const invoiceId = invoice.id;

      if (customerId) {
        const pago = await findPagoByStripeCustomer(customerId, year, month);
        if (pago) {
          await updatePagoStatus(pago.id, 'Pagado', invoiceId, false, now.toISOString().split('T')[0]);
          console.log(`✅ Pago marcado como Pagado para cliente Stripe ${customerId}`);
        }
      }
    }

    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;

      if (customerId) {
        const pago = await findPagoByStripeCustomer(customerId, year, month);
        if (pago) {
          await updatePagoStatus(pago.id, 'Fallido', undefined, undefined, undefined);
          console.log(`❌ Pago marcado como Fallido para cliente Stripe ${customerId}`);
          // TODO: sendOverdueWhatsAppAlert(cliente, pago) — integrate with Twilio/Leadsales
        }
      }
    }
  } catch (err: any) {
    console.error('Error processing Stripe webhook:', err.message);
    // Return 200 to prevent Stripe from retrying — log the error internally
  }

  return NextResponse.json({ received: true });
}
