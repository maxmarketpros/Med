import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase-service';
import { getSupabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    console.log('Testing webhook database connections...');
    
    // Test service role connection
    const supabaseService = getSupabaseService();
    let serviceRoleStatus = 'not_available';
    
    if (supabaseService) {
      try {
        const { data, error } = await supabaseService
          .from('user_subscriptions')
          .select('count(*)', { count: 'exact' })
          .limit(1);
        
        if (error) {
          serviceRoleStatus = `error: ${error.message}`;
        } else {
          serviceRoleStatus = 'working';
        }
      } catch (err) {
        serviceRoleStatus = `exception: ${err instanceof Error ? err.message : 'unknown'}`;
      }
    }
    
    // Test regular connection
    const supabaseRegular = getSupabase();
    let regularStatus = 'not_available';
    
    if (supabaseRegular) {
      try {
        const { data, error } = await supabaseRegular
          .from('user_subscriptions')
          .select('count(*)', { count: 'exact' })
          .limit(1);
        
        if (error) {
          regularStatus = `error: ${error.message}`;
        } else {
          regularStatus = 'working';
        }
      } catch (err) {
        regularStatus = `exception: ${err instanceof Error ? err.message : 'unknown'}`;
      }
    }
    
    return NextResponse.json({
      message: 'Webhook database test results',
      environment: {
        supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        supabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      connections: {
        serviceRole: serviceRoleStatus,
        regular: regularStatus,
      },
      recommendation: supabaseService ? 'Service role available' : 'Add SUPABASE_SERVICE_ROLE_KEY for better webhook security'
    });
    
  } catch (error) {
    console.error('Test webhook error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Simulate a webhook payload for testing
  try {
    const body = await req.json();
    console.log('Test webhook payload received:', body);
    
    return NextResponse.json({
      message: 'Test webhook processed',
      payload: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
}