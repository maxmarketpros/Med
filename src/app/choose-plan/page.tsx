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
  const [selectedDuration, setSelectedDuration] = useState<'6 months' | '12 months'>('12 months');

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
  const allAccessPlans = plans.filter(([_, plan]) => plan.access === 'all_access' && plan.duration === selectedDuration);
  const cheatSheetPlans = plans.filter(([_, plan]) => plan.access === 'cheat_sheets' && plan.duration === selectedDuration);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access professional medical education resources designed for hospital medicine practitioners
          </p>
        </div>

        {/* Duration Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
            {(['6 months', '12 months'] as const).map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedDuration === duration
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {duration}
                {duration === '12 months' && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    SAVE
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {/* All-Access Plans (Featured) */}
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <div className="text-center mb-4">
              <div className="inline-flex items-center bg-white rounded-lg px-4 py-2 border border-purple-300 shadow-sm">
                <span className="text-lg mr-2">🎓</span>
                <h2 className="text-lg font-semibold text-gray-900">
                  All-Access Premium
                </h2>
                <span className="ml-3 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded">
                  RECOMMENDED
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              {allAccessPlans.map(([key, plan]) => (
                <PremiumPlanCard
                  key={key}
                  plan={plan}
                  planKey={key as keyof typeof SUBSCRIPTION_PLANS}
                  onSubscribe={handleSubscribe}
                  loading={loading === key}
                  featured={true}
                />
              ))}
            </div>
          </div>

          {/* Cheat Sheets Plans */}
          <div className="pt-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center bg-blue-50 rounded-lg px-4 py-2 border border-blue-200">
                <span className="text-lg mr-2">📚</span>
                <h2 className="text-lg font-semibold text-gray-900">
                  Cheat Sheets Only
                </h2>
              </div>
            </div>
            
            <div className="space-y-4">
              {cheatSheetPlans.map(([key, plan]) => (
                <StandardPlanCard
                  key={key}
                  plan={plan}
                  planKey={key as keyof typeof SUBSCRIPTION_PLANS}
                  onSubscribe={handleSubscribe}
                  loading={loading === key}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 text-center">Feature Comparison</h3>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-700 font-medium">Features</th>
                      <th className="text-center py-2 text-gray-700 font-medium">Cheat Sheets</th>
                      <th className="text-center py-2 text-purple-600 font-medium">All-Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 text-gray-700">100+ Cheat Sheets</td>
                      <td className="text-center py-2">
                        <span className="text-green-600">✓</span>
                      </td>
                      <td className="text-center py-2">
                        <span className="text-green-600">✓</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 text-gray-700">Patient Simulators</td>
                      <td className="text-center py-2">
                        <span className="text-green-600">✓</span>
                      </td>
                      <td className="text-center py-2">
                        <span className="text-green-600">✓</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 text-gray-700">CME Course (10 AAPA Credits)</td>
                      <td className="text-center py-2">
                        <span className="text-red-500">✗</span>
                      </td>
                      <td className="text-center py-2">
                        <span className="text-green-600">✓</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700">Certificate Generation</td>
                      <td className="text-center py-2">
                        <span className="text-red-500">✗</span>
                      </td>
                      <td className="text-center py-2">
                        <span className="text-green-600">✓</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-700 mb-1 text-sm">
              All plans include immediate access upon purchase.
            </p>
            <p className="text-gray-500 text-sm">
              Need help? <a href="https://med-cheat-sheets.webflow.io/contact-us" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">Contact us</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PremiumPlanCard({ 
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
    <Card className="relative bg-white border-2 border-purple-300 shadow-lg hover:shadow-xl transition-shadow duration-200 ring-2 ring-purple-100">
      {(plan as any).badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md">
            {(plan as any).badge}
          </span>
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {plan.name}
          </h3>
          <div className="mb-6">
            <span className="text-4xl font-bold text-purple-600">${plan.price}</span>
            <span className="text-gray-600 ml-2">for {plan.duration}</span>
          </div>
          
          <ul className="space-y-3 mb-8 text-left">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 font-medium">{feature}</span>
              </li>
            ))}
          </ul>
          
          <Button
            onClick={() => onSubscribe(planKey)}
            disabled={loading}
            className="w-full py-3 text-lg font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {loading ? 'Processing...' : `Start ${plan.duration} Access`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StandardPlanCard({ 
  plan, 
  planKey, 
  onSubscribe, 
  loading 
}: {
  plan: typeof SUBSCRIPTION_PLANS[keyof typeof SUBSCRIPTION_PLANS];
  planKey: keyof typeof SUBSCRIPTION_PLANS;
  onSubscribe: (key: keyof typeof SUBSCRIPTION_PLANS) => void;
  loading: boolean;
}) {
  return (
    <Card className="relative bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {plan.name}
          </h3>
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
            <span className="text-gray-600 ml-2 text-sm">for {plan.duration}</span>
          </div>
          
          <ul className="space-y-2 mb-6 text-left">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <Button
            onClick={() => onSubscribe(planKey)}
            disabled={loading}
            className="w-full py-2 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? 'Processing...' : `Start ${plan.duration} Access`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 