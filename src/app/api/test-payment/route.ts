import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-config';

export async function POST(req: NextRequest) {
  try {
    const { planKey = 'CHEAT_SHEETS_6M', testUserId = 'test_user_123' } = await req.json();
    
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    // Use real plan data
    const plan = SUBSCRIPTION_PLANS[planKey as keyof typeof SUBSCRIPTION_PLANS];
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    console.log('Creating test checkout with real plan data:', {
      priceId: plan.priceId,
      planType: plan.access,
      planDuration: plan.duration
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: plan.priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/choose-plan`,
      customer_email: 'test@example.com',
      metadata: { 
        userId: testUserId,
        planType: plan.access,
        planDuration: plan.duration
      },
      subscription_data: {
        metadata: {
          userId: testUserId,
          planType: plan.access,
          planDuration: plan.duration
        }
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ 
      sessionId: session.id,
      sessionUrl: session.url,
      planData: {
        priceId: plan.priceId,
        planType: plan.access,
        planDuration: plan.duration
      }
    });
  } catch (error) {
    console.error('Error creating test checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'Test payment endpoint',
    availablePlans: Object.keys(SUBSCRIPTION_PLANS),
    usage: 'POST with { "planKey": "CHEAT_SHEETS_6M", "testUserId": "user_123" }'
  });
} 