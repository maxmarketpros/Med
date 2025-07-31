import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getSupabase } from '@/lib/supabase';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  console.log('Stripe webhook received');
  
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    console.error('No Stripe signature provided');
    return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
  }

  let event;

  try {
    const stripe = getStripe();
    
    if (!stripe) {
      console.error('Stripe not initialized');
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    // Use webhook secret for production, fall back to parsing JSON for development
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (webhookSecret) {
      console.log('Verifying webhook signature with secret');
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      console.warn('STRIPE_WEBHOOK_SECRET not set, parsing webhook without verification');
      event = JSON.parse(body);
    }
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    const supabase = getSupabase();
    
    if (!supabase) {
      console.error('Supabase not configured');
      return NextResponse.json({ error: 'Database not available' }, { status: 500 });
    }
    
    console.log('Processing webhook event:', event.type);
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);
        console.log('Session metadata:', session.metadata);
        
        // Store initial subscription data
        if (session.metadata) {
          try {
            const subscriptionData = {
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
            };
            
            console.log('Inserting subscription data:', JSON.stringify(subscriptionData, null, 2));
            
            const { data, error } = await supabase
              .from('user_subscriptions')
              .insert(subscriptionData)
              .select();
              
            if (error) {
              console.error('Supabase error details:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
              });
              throw new Error(`Database error: ${error.message}`);
            }
            
            console.log('Successfully created subscription:', data);
          } catch (insertError) {
            console.error('Error in subscription creation block:', insertError);
            console.error('Error type:', typeof insertError);
            console.error('Error stack:', insertError instanceof Error ? insertError.stack : 'No stack trace');
            throw insertError;
          }
        } else {
          console.error('No metadata found in checkout session');
          throw new Error('No metadata found in checkout session');
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
        if (invoice.subscription) {
          const { data, error } = await supabase
            .from('user_subscriptions')
            .update({
              status: 'active',
              payment_date: new Date().toISOString()
            })
            .eq('stripe_subscription_id', invoice.subscription)
            .select();
            
          if (error) {
            console.error('Error updating subscription on payment success:', error);
            throw error;
          }
          
          console.log('Updated subscription on payment success:', data);
        }
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        console.log('Subscription cancelled:', deletedSubscription.id);
        
        // Mark subscription as cancelled
        const { data: cancelData, error: cancelError } = await supabase
          .from('user_subscriptions')
          .update({ status: 'cancelled' })
          .eq('stripe_subscription_id', deletedSubscription.id)
          .select();
          
        if (cancelError) {
          console.error('Error cancelling subscription:', cancelError);
          throw cancelError;
        }
        
        console.log('Cancelled subscription:', cancelData);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        console.log('Invoice payment failed:', failedInvoice.id);
        
        // Mark subscription as past due
        if (failedInvoice.subscription) {
          const { data: pastDueData, error: pastDueError } = await supabase
            .from('user_subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', failedInvoice.subscription)
            .select();
            
          if (pastDueError) {
            console.error('Error marking subscription past due:', pastDueError);
            throw pastDueError;
          }
          
          console.log('Marked subscription past due:', pastDueData);
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    console.log('Webhook processed successfully');
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack',
      ...(error && typeof error === 'object' ? error : {})
    });
    
    return NextResponse.json({ 
      error: 'Webhook processing failed',
      details: error instanceof Error ? error.message : `Unknown error: ${String(error)}`,
      errorType: typeof error,
      errorConstructor: error?.constructor?.name || 'unknown'
    }, { status: 500 });
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