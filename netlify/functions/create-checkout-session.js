const Stripe = require('stripe');

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    console.log('Netlify Function called: create-checkout-session');
    
    const { priceId, userId, userEmail, planType, planDuration } = JSON.parse(event.body);
    console.log('Request data:', { priceId, userId, userEmail, planType, planDuration });

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      console.error('STRIPE_SECRET_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Payment processing not available' }),
      };
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: '2024-06-20',
    });

    // Get the origin from the request headers
    const origin = event.headers.origin || event.headers.referer?.split('/').slice(0, 3).join('/') || 'https://medcheatsheets.netlify.app';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/choose-plan`,
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

    console.log('Stripe session created:', session.id);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Error creating checkout session' }),
    };
  }
}; 