#!/bin/bash

# SGC TECH AI - Logo Setup Script
# This script organizes all logo files and prepares them for website use

echo "======================================"
echo "SGC TECH AI Logo Setup"
echo "======================================"
echo ""

cd "$(dirname "$0")"

# Step 1: Verify logo files exist
echo "Step 1: Verifying logo files..."
echo ""

if [ -f "images/logos/primary/sgc-tech-ai-logo-primary.png" ]; then
    echo "✅ Primary logo found"
    PRIMARY_SIZE=$(du -h "images/logos/primary/sgc-tech-ai-logo-primary.png" | cut -f1)
    echo "   Size: $PRIMARY_SIZE"
else
    echo "❌ Primary logo NOT found"
    echo "   Please save the attached image to: images/logos/primary/sgc-tech-ai-logo-primary.png"
fi

if [ -f "images/logos/white-version/sgc-tech-ai-logo-white.png" ]; then
    echo "✅ White logo found"
    WHITE_SIZE=$(du -h "images/logos/white-version/sgc-tech-ai-logo-white.png" | cut -f1)
    echo "   Size: $WHITE_SIZE"
else
    echo "❌ White logo NOT found"
fi

if [ -f "images/logos/black-version/sgc-tech-ai-logo-black.png" ]; then
    echo "✅ Black logo found"
    BLACK_SIZE=$(du -h "images/logos/black-version/sgc-tech-ai-logo-black.png" | cut -f1)
    echo "   Size: $BLACK_SIZE"
else
    echo "❌ Black logo NOT found"
fi

echo ""
echo "======================================"
echo "Step 2: Favicon Generation Instructions"
echo "======================================"
echo ""
echo "To create favicons, follow these steps:"
echo ""
echo "Option A: Use Online Generator (Recommended)"
echo "1. Go to: https://realfavicongenerator.net"
echo "2. Upload: images/logos/primary/sgc-tech-ai-logo-primary.png"
echo "3. Customize settings:"
echo "   - iOS: Add padding, background #0C1E34"
echo "   - Android: Transparent background"
echo "   - Windows: Background #0C1E34"
echo "4. Generate favicon package"
echo "5. Download and extract to images/logos/favicon/"
echo ""
echo "Option B: Manual Creation (if you have ImageMagick)"
echo "Run these commands:"
echo ""
echo "  convert images/logos/primary/sgc-tech-ai-logo-primary.png -resize 16x16 images/logos/favicon/favicon-16x16.png"
echo "  convert images/logos/primary/sgc-tech-ai-logo-primary.png -resize 32x32 images/logos/favicon/favicon-32x32.png"
echo "  convert images/logos/primary/sgc-tech-ai-logo-primary.png -resize 180x180 images/logos/favicon/apple-touch-icon.png"
echo "  convert images/logos/primary/sgc-tech-ai-logo-primary.png -resize 192x192 images/logos/favicon/android-chrome-192x192.png"
echo "  convert images/logos/primary/sgc-tech-ai-logo-primary.png -resize 512x512 images/logos/favicon/android-chrome-512x512.png"
echo ""

echo "======================================"
echo "Step 3: Logo Usage Summary"
echo "======================================"
echo ""
echo "✅ Header: images/logos/primary/sgc-tech-ai-logo-primary.png"
echo "✅ Footer: images/logos/white-version/sgc-tech-ai-logo-white.png"
echo "⏳ Favicon: images/logos/favicon/* (needs generation)"
echo ""

echo "======================================"
echo "Step 4: Files Updated in Website"
echo "======================================"
echo ""
echo "✅ index.html - Header logo updated"
echo "✅ index.html - Footer logo updated (white version)"
echo "✅ index.html - Meta tags updated (OG, Twitter)"
echo "✅ index.html - Schema.org logo updated"
echo ""
echo "⏳ Still need to update:"
echo "   - about.html"
echo "   - pricing.html"
echo "   - success-stories.html"
echo "   - team.html"
echo "   - appointment.html"
echo "   - privacy-policy.html"
echo "   - terms-of-service.html"
echo ""

echo "======================================"
echo "Step 5: Test Your Logo Implementation"
echo "======================================"
echo ""
echo "1. Start local server:"
echo "   python -m http.server 8000"
echo ""
echo "2. Open browser:"
echo "   http://localhost:8000"
echo ""
echo "3. Check:"
echo "   ✓ Header logo displays correctly"
echo "   ✓ Footer logo shows white version"
echo "   ✓ Logo scales properly on mobile"
echo "   ✓ Browser tab shows favicon (after favicon generation)"
echo ""

echo "======================================"
echo "Next Steps"
echo "======================================"
echo ""
echo "1. Save attached logo image to:"
echo "   images/logos/primary/sgc-tech-ai-logo-primary.png"
echo ""
echo "2. Generate favicons using realfavicongenerator.net"
echo ""
echo "3. Update remaining HTML files with new logo paths"
echo ""
echo "4. Test on localhost:8000"
echo ""
echo "5. Commit and deploy to production"
echo ""

# Check if we need to copy the attached image
if [ ! -f "images/logos/primary/sgc-tech-ai-logo-primary.png" ]; then
    echo "⚠️  WARNING: Primary logo file is missing or placeholder"
    echo "    Please manually save the attached image to:"
    echo "    D:\\SGC_TECH_AI_Website_Mockup\\images\\logos\\primary\\sgc-tech-ai-logo-primary.png"
fi

echo ""
echo "Setup complete! Run 'python -m http.server 8000' to test."
echo ""
