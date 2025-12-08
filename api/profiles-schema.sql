-- User Profiles Table for SGC TECH AI
-- Add this to your Supabase database

-- Drop existing table if needed (comment out in production)
-- DROP TABLE IF EXISTS profiles;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    company VARCHAR(200),
    industry VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_company ON profiles(company);
CREATE INDEX IF NOT EXISTS idx_profiles_created ON profiles(created_at);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous read" ON profiles;
DROP POLICY IF EXISTS "Allow anonymous insert" ON profiles;
DROP POLICY IF EXISTS "Allow anonymous update" ON profiles;
DROP POLICY IF EXISTS "Allow anonymous delete" ON profiles;

-- Create policies for API access
CREATE POLICY "Allow anonymous read" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert" ON profiles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update" ON profiles
    FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous delete" ON profiles
    FOR DELETE USING (true);

-- Add comment
COMMENT ON TABLE profiles IS 'User profiles for SGC TECH AI website';
