import Stripe from 'stripe';

let stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (typeof window !== 'undefined') {
    // Client-side, don't initialize Stripe server client
    return null;
  }
  
  if (!stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!secretKey) {
      console.warn('Stripe secret key not found');
      return null;
    }
    
    stripe = new Stripe(secretKey, {
      apiVersion: '2025-07-30.basil',
    });
  }
  
  return stripe;
}

// Named export only, no default export that would execute immediately
export { getStripe as default }; 