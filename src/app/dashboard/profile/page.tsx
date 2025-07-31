'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-config';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function ProfilePage() {
  const { user } = useUser();
  const { subscription, planType, expiresAt, isActive, refetch } = useSubscription();
  const [loading, setLoading] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const handlePlanChange = async (planKey: keyof typeof SUBSCRIPTION_PLANS) => {
    if (!user) return;
    
    setLoading(planKey);
    
    try {
      const plan = SUBSCRIPTION_PLANS[planKey];
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.priceId,
          userId: user.id,
          userEmail: user.emailAddresses[0]?.emailAddress,
          planType: plan.access,
          planDuration: plan.duration,
          isUpgrade: true
        }),
      });

      if (!response.ok) throw new Error('Failed to create checkout session');

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription?.stripe_subscription_id) return;
    
    if (!confirm('Are you sure you want to cancel your subscription? This action cannot be undone and you will lose access to premium features.')) {
      return;
    }

    setCancelLoading(true);
    
    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscriptionId: subscription.stripe_subscription_id,
          userId: user?.id
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to cancel subscription');
      }

      alert('Your subscription has been cancelled successfully.');
      refetch(); // Refresh subscription data
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setCancelLoading(false);
    }
  };

  const getUserName = () => {
    if (!user) return 'Loading...';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 
           user.emailAddresses[0]?.emailAddress || 'User';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentPlanName = () => {
    if (!subscription) return 'No active subscription';
    
    const planEntry = Object.entries(SUBSCRIPTION_PLANS).find(([_, plan]) => 
      plan.access === subscription.plan_type && 
      plan.duration === subscription.plan_duration
    );
    
    if (planEntry) {
      const [_, plan] = planEntry;
      return `${plan.name} (${plan.duration})`;
    }
    
    return `${subscription.plan_type} (${subscription.plan_duration})`;
  };

  const getUpgradeOptions = () => {
    if (!subscription) return Object.entries(SUBSCRIPTION_PLANS);
    
    // If user has cheat_sheets plan, show all_access options
    if (subscription.plan_type === 'cheat_sheets') {
      return Object.entries(SUBSCRIPTION_PLANS).filter(([_, plan]) => 
        plan.access === 'all_access'
      );
    }
    
    // If user has all_access, show longer duration options
    if (subscription.plan_type === 'all_access' && subscription.plan_duration === '6 months') {
      return Object.entries(SUBSCRIPTION_PLANS).filter(([_, plan]) => 
        plan.access === 'all_access' && plan.duration === '12 months'
      );
    }
    
    return [];
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile & Subscription</h1>
        <p className="text-gray-600 mt-1">Manage your account and subscription settings</p>
      </div>

      {/* User Information */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                {getUserName()}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                {user.emailAddresses[0]?.emailAddress || 'No email'}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
              <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                {formatDate(user.createdAt!)}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Information */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h2>
          
          {isActive && subscription ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Plan</label>
                  <div className="p-3 bg-emerald-50 rounded-lg text-emerald-900 font-medium">
                    {getCurrentPlanName()}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Renewal Date</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                    {formatDate(expiresAt!)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                    ${(subscription.amount_paid / 100).toFixed(2)} {subscription.currency.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Plan Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Features</label>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <ul className="space-y-2">
                    {subscription.plan_type === 'cheat_sheets' ? (
                      <>
                        <li className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          100+ Medical Cheat Sheets
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Patient Simulators
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          100+ Medical Cheat Sheets
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          CME Course (10 AAPA Credits)
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Patient Simulators
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={handleCancelSubscription}
                  disabled={cancelLoading}
                  className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {cancelLoading ? 'Cancelling...' : 'Cancel Subscription'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
              <p className="text-gray-600 mb-4">Subscribe to access premium medical education content</p>
              <Button
                onClick={() => window.location.href = '/choose-plan'}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Choose a Plan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan Upgrade Options */}
      {isActive && getUpgradeOptions().length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upgrade Your Plan</h2>
            <p className="text-gray-600 mb-6">Get more features and extended access with an upgraded plan.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getUpgradeOptions().map(([planKey, plan]) => (
                <div key={planKey} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-600">{plan.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">${plan.price}</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handlePlanChange(planKey as keyof typeof SUBSCRIPTION_PLANS)}
                    disabled={loading === planKey}
                    className="w-full bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50"
                  >
                    {loading === planKey ? 'Processing...' : 'Upgrade Now'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 