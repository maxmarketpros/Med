'use client';

// Force dynamic rendering to avoid build-time Clerk errors
export const dynamic = 'force-dynamic';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-config';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function ChoosePlanPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planKey: keyof typeof SUBSCRIPTION_PLANS) => {
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
          planDuration: plan.duration
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

  const plans = Object.entries(SUBSCRIPTION_PLANS);
  const cheatSheetPlans = plans.filter(([_, plan]) => plan.access === 'cheat_sheets');
  const allAccessPlans = plans.filter(([_, plan]) => plan.access === 'all_access');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access professional medical education resources designed for hospital medicine practitioners
          </p>
        </div>

        {/* Cheat Sheets Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            📚 Cheat Sheets Access
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {cheatSheetPlans.map(([key, plan]) => (
              <PlanCard
                key={key}
                plan={plan}
                planKey={key as keyof typeof SUBSCRIPTION_PLANS}
                onSubscribe={handleSubscribe}
                loading={loading === key}
              />
            ))}
          </div>
        </div>

        {/* All Access Plans */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            🎓 All-Access (Includes CME)
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {allAccessPlans.map(([key, plan]) => (
              <PlanCard
                key={key}
                plan={plan}
                planKey={key as keyof typeof SUBSCRIPTION_PLANS}
                onSubscribe={handleSubscribe}
                loading={loading === key}
                featured={!!(plan as any).badge && (plan as any).badge === 'Best Value'}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Secure payment processing by Stripe • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ 
  plan, 
  planKey, 
  onSubscribe, 
  loading, 
  featured = false 
}: {
  plan: typeof SUBSCRIPTION_PLANS[keyof typeof SUBSCRIPTION_PLANS];
  planKey: keyof typeof SUBSCRIPTION_PLANS;
  onSubscribe: (key: keyof typeof SUBSCRIPTION_PLANS) => void;
  loading: boolean;
  featured?: boolean;
}) {
  return (
    <Card className={`relative ${featured ? 'ring-2 ring-violet-600' : ''}`}>
      {(plan as any).badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
            {(plan as any).badge}
          </span>
        </div>
      )}
      
      <CardContent className="p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {plan.name}
          </h3>
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
            <span className="text-gray-500 ml-2">for {plan.duration}</span>
          </div>
          
          <ul className="space-y-3 mb-8 text-left">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <Button
            onClick={() => onSubscribe(planKey)}
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold ${
              featured 
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700' 
                : 'bg-violet-600 hover:bg-violet-700'
            }`}
          >
            {loading ? 'Processing...' : `Start ${plan.duration} Access`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 