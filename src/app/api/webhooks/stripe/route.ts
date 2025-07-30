import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getSupabase } from '@/lib/supabase';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
  }

  let event;

  try {
    const stripe = getStripe();
    
    // For production, uncomment this line and add STRIPE_WEBHOOK_SECRET to .env.local:
    // if (stripe && process.env.STRIPE_WEBHOOK_SECRET) {
    //   event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    // } else {
    //   event = JSON.parse(body);
    // }
    
    // For now, just parse the body as JSON to handle events
    event = JSON.parse(body);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    const supabase = getSupabase();
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);
        
        // Store initial subscription data
        if (session.metadata && supabase) {
          await supabase
            .from('user_subscriptions')
            .upsert({
              user_id: session.metadata.userId,
              stripe_session_id: session.id,
              stripe_customer_id: session.customer,
              stripe_subscription_id: session.subscription,
              plan_type: session.metadata.planType,
              plan_duration: session.metadata.planDuration,
              status: 'active',
              amount_paid: session.amount_total,
              currency: session.currency,
              payment_date: new Date().toISOString(),
              expires_at: calculateExpirationDate(session.metadata.planDuration)
            });
        }
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object;
        console.log('Subscription created:', subscription.id);
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        console.log('Invoice payment succeeded:', invoice.id);
        
        // Update subscription status on successful payment
        if (invoice.subscription && supabase) {
          await supabase
            .from('user_subscriptions')
            .update({
              status: 'active',
              payment_date: new Date().toISOString()
            })
            .eq('stripe_subscription_id', invoice.subscription);
        }
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        console.log('Subscription cancelled:', deletedSubscription.id);
        
        // Mark subscription as cancelled
        if (supabase) {
          await supabase
            .from('user_subscriptions')
            .update({ status: 'cancelled' })
            .eq('stripe_subscription_id', deletedSubscription.id);
        }
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        console.log('Invoice payment failed:', failedInvoice.id);
        
        // Mark subscription as past due
        if (failedInvoice.subscription && supabase) {
          await supabase
            .from('user_subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', failedInvoice.subscription);
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

function calculateExpirationDate(duration: string): string {
  const now = new Date();
  if (duration === '6 months') {
    now.setMonth(now.getMonth() + 6);
  } else if (duration === '12 months') {
    now.setFullYear(now.getFullYear() + 1);
  }
  return now.toISOString();
} 