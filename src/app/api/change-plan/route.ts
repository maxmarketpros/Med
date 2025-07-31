import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSupabaseService } from '@/lib/supabase-service';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-config';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { 
      currentSubscriptionId, 
      newPriceId, 
      userId, 
      planType, 
      planDuration 
    } = await req.json();

    if (!currentSubscriptionId || !newPriceId || !userId || !planType || !planDuration) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Changing plan for subscription:', currentSubscriptionId, 'to price:', newPriceId);

    // Get the current subscription from Stripe
    const subscription = await stripe.subscriptions.retrieve(currentSubscriptionId);
    
    if (!subscription) {
      return NextResponse.json(
        { message: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Get the new price details
    const newPlan = Object.values(SUBSCRIPTION_PLANS).find(plan => plan.priceId === newPriceId);
    if (!newPlan) {
      return NextResponse.json(
        { message: 'Invalid price ID' },
        { status: 400 }
      );
    }

    // Update the subscription in Stripe
    const updatedSubscription = await stripe.subscriptions.update(currentSubscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: newPriceId,
      }],
      proration_behavior: 'create_prorations', // Pro-rate the change
    });

    console.log('Stripe subscription updated:', updatedSubscription.id);

    // Calculate new expiration date based on plan duration
    const currentPeriodEnd = new Date((updatedSubscription as any).current_period_end * 1000);

    // Update the subscription in Supabase
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
        plan_type: planType,
        plan_duration: planDuration,
        amount_paid: newPlan.price * 100, // Store in cents
        expires_at: currentPeriodEnd.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', currentSubscriptionId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating subscription in database:', error);
      return NextResponse.json(
        { message: 'Failed to update subscription in database' },
        { status: 500 }
      );
    }

    console.log('Subscription updated in database');

    return NextResponse.json({
      message: 'Plan changed successfully',
      subscriptionId: updatedSubscription.id,
      newPlan: {
        type: planType,
        duration: planDuration,
        price: newPlan.price
      }
    });

  } catch (error) {
    console.error('Error changing plan:', error);
    
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
    { message: 'Method not allowed. Use POST to change plan.' },
    { status: 405 }
  );
} 