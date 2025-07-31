import { createClient } from '@supabase/supabase-js';

let supabaseService: ReturnType<typeof createClient> | null = null;

export function getSupabaseService() {
  if (!supabaseService) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn('Supabase service role environment variables not found');
      return null;
    }
    
    // Service role key bypasses RLS policies
    supabaseService = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  
  return supabaseService;
} 