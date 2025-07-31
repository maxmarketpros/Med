import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getSupabase } from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    
    // Check environment variables
    const envCheck = {
      clerk: {
        publicKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        secretKey: !!process.env.CLERK_SECRET_KEY,
      },
      supabase: {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
      stripe: {
        publicKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        secretKey: !!process.env.STRIPE_SECRET_KEY,
        webhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
      }
    };

    // Test Stripe connection
    let stripeStatus = 'not_configured';
    try {
      const stripe = getStripe();
      if (stripe) {
        // Try a simple API call to test the connection
        await stripe.prices.list({ limit: 1 });
        stripeStatus = 'connected';
      }
    } catch (error) {
      stripeStatus = `error: ${error instanceof Error ? error.message : 'unknown'}`;
    }

    // Test Supabase connection
    let supabaseStatus = 'not_configured';
    let subscriptionData = null;
    try {
      const supabase = getSupabase();
      if (supabase && user) {
        // Test database connection by checking user's subscription
        const { data, error } = await supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .order('payment_date', { ascending: false })
          .limit(1);
          
        if (error) {
          supabaseStatus = `error: ${error.message}`;
        } else {
          supabaseStatus = 'connected';
          subscriptionData = data;
        }
      } else if (supabase) {
        supabaseStatus = 'connected_no_user';
      }
    } catch (error) {
      supabaseStatus = `error: ${error instanceof Error ? error.message : 'unknown'}`;
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      user: user ? {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      } : null,
      environment: envCheck,
      services: {
        stripe: stripeStatus,
        supabase: supabaseStatus,
      },
      subscription: subscriptionData,
      url: req.url,
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      }
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      error: 'Debug check failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, userId } = body;

    if (action === 'check_subscription' && userId) {
      const supabase = getSupabase();
      if (!supabase) {
        return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
      }

      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .order('payment_date', { ascending: false });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ subscriptions: data });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Debug POST error:', error);
    return NextResponse.json({
      error: 'Debug action failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 