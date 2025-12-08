-- SGC TECH AI - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor: 
-- https://supabase.com/dashboard/project/ubkccylvneiyxqkgkyqi/sql

-- ========================================
-- 1. LEADS TABLE - Contact form submissions
-- ========================================
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    industry TEXT,
    employees TEXT,
    message TEXT,
    source TEXT DEFAULT 'website',
    page_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new',
    notes TEXT
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for website forms)
CREATE POLICY "Allow anonymous inserts" ON leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- ========================================
-- 2. ROI CALCULATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS roi_calculations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT,
    phone TEXT,
    company TEXT,
    industry TEXT,
    employees INTEGER,
    current_cost DECIMAL(12,2),
    projected_savings DECIMAL(12,2),
    roi_percentage DECIMAL(5,2),
    payback_months INTEGER,
    modules_selected TEXT[],
    page_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE roi_calculations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON roi_calculations
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- ========================================
-- 3. APPOINTMENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    preferred_date DATE,
    preferred_time TEXT,
    message TEXT,
    source TEXT DEFAULT 'website',
    page_url TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON appointments
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- ========================================
-- 4. PAGE VISITS TABLE (Analytics)
-- ========================================
CREATE TABLE IF NOT EXISTS page_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_url TEXT,
    page_title TEXT,
    referrer TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON page_visits
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- ========================================
-- 5. CREATE INDEXES FOR PERFORMANCE
-- ========================================
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_roi_calculations_created_at ON roi_calculations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_visits_created_at ON page_visits(created_at DESC);

-- ========================================
-- DONE! Your tables are ready.
-- ========================================
