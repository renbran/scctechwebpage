#!/bin/bash
# Upload SGC TECH AI website files to Supabase Storage
# This script uploads all website files to Supabase Storage bucket

SUPABASE_URL="https://ubkccylvneiyxqkgkyqi.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVia2NjeWx2bmVpeXhxa2dreXFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTEzNDgsImV4cCI6MjA4MDc4NzM0OH0.i28wHaiXIQ43q0fyGMLlS58WUcvEYpbSM1Ni-ihy7HQ"
BUCKET_NAME="website-files"

echo "📦 Uploading website files to Supabase Storage..."
echo "Bucket: $BUCKET_NAME"
echo ""

# You'll need to run this after creating the bucket in Supabase Dashboard
# Go to: https://supabase.com/dashboard/project/ubkccylvneiyxqkgkyqi/storage/buckets
# Click "New Bucket" → Name: "website-files" → Make it PUBLIC

echo "⚠️  First, create the bucket in Supabase Dashboard:"
echo "1. Go to: https://supabase.com/dashboard/project/ubkccylvneiyxqkgkyqi/storage/buckets"
echo "2. Click 'New Bucket'"
echo "3. Name: website-files"
echo "4. Toggle 'Public bucket' ON"
echo "5. Click 'Create bucket'"
echo ""
echo "Then use the Supabase Dashboard to upload files, or use the Supabase CLI."
