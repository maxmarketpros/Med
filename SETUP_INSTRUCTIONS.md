# Med Cheat Sheets Setup Instructions

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

### Clerk Authentication
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Supabase Database
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# Optional: Service role key for admin operations (subscription cancellation)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... 
```

### Stripe Payment Processing
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Database Setup

1. **Run the database migration**: Execute the SQL script in `supabase_setup.sql` in your Supabase SQL editor to create the `user_subscriptions` table with proper indexes and RLS policies.

## Stripe Webhook Configuration

1. **Create a webhook endpoint** in your Stripe dashboard:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events to send:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
     - `customer.subscription.deleted`

2. **Copy the webhook secret** from Stripe dashboard and add it to your `.env.local` as `STRIPE_WEBHOOK_SECRET`

## Testing the Payment Flow

1. **Test environment variables**: Visit `/api/create-checkout-session` (GET request) to verify Stripe configuration
2. **Test Supabase connection**: Check browser console for any Supabase connection errors
3. **Test payment flow**:
   - Sign up/sign in with Clerk
   - Go to `/choose-plan`
   - Select a plan and complete checkout (use Stripe test card: `4242 4242 4242 4242`)
   - Check webhook logs in server console
   - Verify subscription appears in Supabase `user_subscriptions` table
   - Test content access on dashboard

## Common Issues & Solutions

### Content Still Locked After Payment
- Check if webhook events are being received (check server logs)
- Verify `STRIPE_WEBHOOK_SECRET` is correctly set
- Ensure `user_subscriptions` table exists in Supabase
- Check that user IDs match between Clerk and Supabase records

### Webhook Not Working
- Verify webhook URL is publicly accessible
- Check that all required Stripe events are configured
- Ensure `STRIPE_WEBHOOK_SECRET` matches the webhook endpoint secret
- Check server logs for webhook processing errors

### Database Access Issues
- Verify Supabase RLS policies are correctly set
- Check that the `user_subscriptions` table has proper indexes
- Ensure environment variables are correctly set

## Checklist for Go-Live

- [ ] All environment variables configured
- [ ] Database table created with `supabase_setup.sql`
- [ ] Stripe webhook endpoint configured with live URL
- [ ] Webhook secret added to environment variables
- [ ] Test payment flow works end-to-end
- [ ] Content gating works properly
- [ ] User can access content after successful payment 