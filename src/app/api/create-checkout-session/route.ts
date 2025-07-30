import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    console.log('API route called: /api/create-checkout-session');
    const { priceId, userId, userEmail, planType, planDuration } = await req.json();
    console.log('Request data:', { priceId, userId, userEmail, planType, planDuration });

    const stripe = getStripe();
    if (!stripe) {
      console.error('Stripe not initialized. STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Found' : 'Missing');
      return NextResponse.json(
        { error: 'Payment processing not available' },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/choose-plan`,
      customer_email: userEmail,
      metadata: { 
        userId,
        planType,
        planDuration
      },
      subscription_data: {
        metadata: {
          userId,
          planType,
          planDuration
        }
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'Checkout session endpoint is working',
    timestamp: new Date().toISOString(),
    stripeConfigured: !!process.env.STRIPE_SECRET_KEY
  });
} 