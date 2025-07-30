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

  useEffect(() => {
    if (user) {
      checkSubscriptionStatus(user.id);
    } else {
      setLoading(false);
    }
  }, [user]);

  const checkSubscriptionStatus = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const supabase = getSupabase();
      if (!supabase) {
        setError('Database not available');
        return;
      }

      const { data, error: supabaseError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('payment_date', { ascending: false })
        .limit(1)
        .single();

      if (supabaseError) {
        if (supabaseError.code !== 'PGRST116') { // Not found error
          throw supabaseError;
        }
        // No subscription found
        setSubscription(null);
      } else {
        // Check if subscription is still valid
        const subscription = data as unknown as UserSubscription;
        const expiresAt = new Date(subscription.expires_at);
        const now = new Date();
        
        if (expiresAt > now) {
          setSubscription(subscription);
        } else {
          // Subscription expired, update status
          await supabase
            .from('user_subscriptions')
            .update({ status: 'expired' })
            .eq('id', subscription.id);
          
          setSubscription(null);
        }
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to check subscription');
    } finally {
      setLoading(false);
    }
  };

  const hasAccess = (requiredAccess?: SubscriptionAccess): boolean => {
    if (!subscription) return false;
    
    if (!requiredAccess) return true; // Any active subscription
    
    if (requiredAccess === 'cheat_sheets') {
      return subscription.plan_type === 'cheat_sheets' || subscription.plan_type === 'all_access';
    }
    
    if (requiredAccess === 'all_access') {
      return subscription.plan_type === 'all_access';
    }
    
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
    refetch: () => user && checkSubscriptionStatus(user.id)
  };
} 