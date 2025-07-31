'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { SubscriptionAccess } from '@/lib/subscription-config';

interface UserSubscription {
  id: string;
  user_id: string;
  stripe_session_id?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  plan_type: SubscriptionAccess;
  plan_duration: string;
  status: 'active' | 'expired' | 'cancelled' | 'past_due';
  expires_at: string;
  amount_paid: number;
  currency: string;
  payment_date: string;
}

export function useSubscription() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkSubscriptionStatus = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Checking subscription for user:', userId);

      const supabase = getSupabase();
      if (!supabase) {
        console.error('Supabase not available');
        setError('Database not available');
        setSubscription(null);
        return;
      }

      const { data, error: supabaseError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('payment_date', { ascending: false })
        .limit(1)
        .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no results

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        setError(`Database error: ${supabaseError.message}`);
        setSubscription(null);
        return;
      }

      if (!data) {
        // No subscription found - user has no access to premium features
        console.log('No active subscription found for user');
        setSubscription(null);
        return;
      }

      // Check if subscription is still valid
      const subscription = data as UserSubscription;
      const expiresAt = new Date(subscription.expires_at);
      const now = new Date();
      
      console.log('Found subscription:', subscription);
      console.log('Expires at:', expiresAt, 'Current time:', now);
      
      if (expiresAt > now) {
        console.log('Subscription is active');
        setSubscription(subscription);
      } else {
        console.log('Subscription expired, updating status');
        // Subscription expired, update status
        await supabase
          .from('user_subscriptions')
          .update({ status: 'expired' })
          .eq('id', subscription.id);
        
        setSubscription(null);
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to check subscription');
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      checkSubscriptionStatus(user.id);
    } else {
      setLoading(false);
      setSubscription(null);
    }
  }, [user?.id]); // Fixed: Added user?.id to dependency array

  const hasAccess = (requiredAccess?: SubscriptionAccess): boolean => {
    if (!subscription) {
      console.log('No subscription, denying access');
      return false;
    }
    
    if (!requiredAccess) {
      console.log('No specific access required, allowing access');
      return true; // Any active subscription
    }
    
    if (requiredAccess === 'cheat_sheets') {
      const hasAccess = subscription.plan_type === 'cheat_sheets' || subscription.plan_type === 'all_access';
      console.log(`Checking cheat_sheets access: ${hasAccess} (plan: ${subscription.plan_type})`);
      return hasAccess;
    }
    
    if (requiredAccess === 'all_access') {
      const hasAccess = subscription.plan_type === 'all_access';
      console.log(`Checking all_access: ${hasAccess} (plan: ${subscription.plan_type})`);
      return hasAccess;
    }
    
    console.log('Unknown access type requested:', requiredAccess);
    return false;
  };

  const isActive = !!subscription;
  const isExpired = !subscription;
  const planType = subscription?.plan_type;
  const expiresAt = subscription?.expires_at;

  return {
    subscription,
    loading,
    error,
    isActive,
    isExpired,
    planType,
    expiresAt,
    hasAccess,
    refetch: () => user?.id && checkSubscriptionStatus(user.id)
  };
} 