-- Fixed migration script for existing user_subscriptions table
-- Run this in your Supabase SQL editor

-- Add missing columns
ALTER TABLE user_subscriptions 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

-- Add CHECK constraints (remove existing ones first to avoid conflicts)
DO $$ 
BEGIN
    -- Drop constraints if they exist
    BEGIN
        ALTER TABLE user_subscriptions DROP CONSTRAINT IF EXISTS check_plan_type;
    EXCEPTION
        WHEN undefined_object THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE user_subscriptions DROP CONSTRAINT IF EXISTS check_status;
    EXCEPTION
        WHEN undefined_object THEN NULL;
    END;
    
    -- Add new constraints
    ALTER TABLE user_subscriptions 
    ADD CONSTRAINT check_plan_type 
    CHECK (plan_type IN ('cheat_sheets', 'all_access'));

    ALTER TABLE user_subscriptions 
    ADD CONSTRAINT check_status 
    CHECK (status IN ('active', 'expired', 'cancelled', 'past_due'));
END $$;

-- Add missing indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_subscription_id 
ON user_subscriptions(stripe_subscription_id);

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_expires_at 
ON user_subscriptions(expires_at);

-- Create function for auto-updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_user_subscriptions_updated_at ON user_subscriptions;
CREATE TRIGGER update_user_subscriptions_updated_at 
    BEFORE UPDATE ON user_subscriptions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON user_subscriptions;
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON user_subscriptions;

-- Create policies for proper access control
CREATE POLICY "Users can view their own subscriptions" ON user_subscriptions
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Service role can manage subscriptions" ON user_subscriptions
    FOR ALL USING (auth.role() = 'service_role'); 