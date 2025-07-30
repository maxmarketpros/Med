export const SUBSCRIPTION_PLANS = {
  CHEAT_SHEETS_6M: {
    name: 'Cheat Sheets',
    duration: '6 months',
    price: 199,
    priceId: 'price_1RqiSXDKZkh37o040P6Y00kR',
    features: [
      '100+ Cheat Sheets',
      'Patient Simulators',
      '6 months access'
    ],
    access: 'cheat_sheets'
  },
  CHEAT_SHEETS_12M: {
    name: 'Cheat Sheets',
    duration: '12 months', 
    price: 299,
    priceId: 'price_1RqiSsDKZkh37o04fSGretRY',
    features: [
      '100+ Cheat Sheets',
      'Patient Simulators', 
      '12 months access'
    ],
    access: 'cheat_sheets'
  },
  ALL_ACCESS_6M: {
    name: 'All-Access',
    duration: '6 months',
    price: 299,
    priceId: 'price_1RqiTUDKZkh37o04QhDlzWwv',
    features: [
      '100+ Cheat Sheets',
      'CME Course (10 AAPA Credits)',
      'Patient Simulators',
      '6 months access'
    ],
    access: 'all_access'
  },
  ALL_ACCESS_12M: {
    name: 'All-Access',
    duration: '12 months',
    price: 399,
    priceId: 'price_1RqiToDKZkh37o04xJZaBtCl',
    features: [
      '100+ Cheat Sheets',
      'CME Course (10 AAPA Credits)', 
      'Patient Simulators',
      '12 months access'
    ],
    access: 'all_access',
    badge: 'Best Value'
  }
} as const;

export type SubscriptionAccess = 'cheat_sheets' | 'all_access';

export type SubscriptionPlan = {
  name: string;
  duration: string;
  price: number;
  priceId: string;
  features: string[];
  access: SubscriptionAccess;
  badge?: string;
}; 