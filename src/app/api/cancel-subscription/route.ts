import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSupabaseService } from '@/lib/supabase-service';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { subscriptionId, userId } = await req.json();

    if (!subscriptionId || !userId) {
      return NextResponse.json(
        { message: 'Missing required fields: subscriptionId, userId' },
        { status: 400 }
      );
    }

    console.log('Cancelling subscription:', subscriptionId, 'for user:', userId);

    // Cancel the subscription in Stripe
    const cancelledSubscription = await stripe.subscriptions.cancel(subscriptionId);
    
    console.log('Stripe subscription cancelled:', cancelledSubscription.id);

    // Update the subscription status in Supabase
    const supabase = getSupabaseService();
    if (!supabase) {
      return NextResponse.json(
        { message: 'Database service unavailable' },
        { status: 500 }
      );
    }

    const { error } = await supabase
      .from('user_subscriptions')
      .update({ 
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscriptionId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating subscription in database:', error);
      return NextResponse.json(
        { message: 'Failed to update subscription status in database' },
        { status: 500 }
      );
    }

    console.log('Subscription status updated to cancelled in database');

    return NextResponse.json({
      message: 'Subscription cancelled successfully',
      subscriptionId: cancelledSubscription.id,
      status: cancelledSubscription.status
    });

  } catch (error) {
    console.error('Error cancelling subscription:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { message: `Stripe error: ${error.message}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST to cancel subscription.' },
    { status: 405 }
  );
} 