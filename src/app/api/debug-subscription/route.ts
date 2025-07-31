import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getSupabase } from '@/lib/supabase';
import { getSupabaseService } from '@/lib/supabase-service';

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    console.log('Debug: Checking subscription for user:', user.id);

    // Check regular Supabase connection
    const supabase = getSupabase();
    const supabaseService = getSupabaseService();
    
    const debugInfo = {
      userId: user.id,
      userEmail: user.emailAddresses[0]?.emailAddress,
      supabaseAvailable: !!supabase,
      supabaseServiceAvailable: !!supabaseService,
      envVars: {
        supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        supabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      }
    };

    if (!supabase) {
      return NextResponse.json({ 
        error: 'Supabase not available',
        debugInfo
      }, { status: 500 });
    }

    // Get subscription data
    const { data, error, count } = await supabase
      .from('user_subscriptions')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('payment_date', { ascending: false });

    console.log('Debug: Query result:', { data, error, count });

    return NextResponse.json({
      debugInfo,
      subscription: {
        data,
        error: error?.message,
        count,
        query: {
          table: 'user_subscriptions',
          filter: `user_id = ${user.id}`,
        }
      }
    });

  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}