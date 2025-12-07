#!/bin/bash

# SGC TECH AI - Automated Deployment Script
# This script pushes to GitHub and provides Cloudflare deployment instructions

echo "═══════════════════════════════════════════════════════════════"
echo "🚀 SGC TECH AI - Automated Deployment to GitHub & Cloudflare"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check if repository already has remote
if git remote get-url origin &>/dev/null; then
    echo "✅ GitHub remote already configured"
    REMOTE_URL=$(git remote get-url origin)
    echo "   Remote: $REMOTE_URL"
    echo ""
else
    echo "⚠️  No GitHub remote found!"
    echo ""
    echo "Please create a GitHub repository first at:"
    echo "https://github.com/new"
    echo ""
    echo "Then run this command with your GitHub username:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/sgctechai-website.git"
    echo ""
    exit 1
fi

# Rename branch to main if needed
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "📝 Renaming branch to 'main'..."
    git branch -M main
    echo "✅ Branch renamed to 'main'"
    echo ""
fi

# Push to GitHub
echo "⏳ Pushing to GitHub..."
echo ""

if git push -u origin main; then
    echo ""
    echo "✅ SUCCESS! Code pushed to GitHub!"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "📊 DEPLOYMENT STATISTICS"
    echo "═══════════════════════════════════════════════════════════════"
    
    # Count files and lines
    HTML_FILES=$(find . -name "*.html" -not -path "./.git/*" | wc -l)
    CSS_FILES=$(find . -name "*.css" -not -path "./.git/*" | wc -l)
    JS_FILES=$(find . -name "*.js" -not -path "./.git/*" | wc -l)
    TOTAL_FILES=$(git ls-files | wc -l)
    
    echo "Files pushed:"
    echo "  • HTML: $HTML_FILES pages"
    echo "  • CSS: $CSS_FILES stylesheets"
    echo "  • JavaScript: $JS_FILES files"
    echo "  • Total: $TOTAL_FILES files"
    echo ""
    
    echo "Repository URL:"
    echo "  🔗 $(git remote get-url origin)"
    echo ""
    
    echo "═══════════════════════════════════════════════════════════════"
    echo "🌐 NEXT STEP: DEPLOY TO CLOUDFLARE PAGES"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    echo "Follow these steps:"
    echo ""
    echo "1️⃣  Go to Cloudflare Dashboard:"
    echo "   https://dash.cloudflare.com/"
    echo ""
    echo "2️⃣  Navigate to Pages:"
    echo "   • Click 'Workers & Pages' in left sidebar"
    echo "   • Click 'Create application'"
    echo "   • Click 'Pages' tab"
    echo "   • Click 'Connect to Git'"
    echo ""
    echo "3️⃣  Connect Repository:"
    echo "   • Authorize Cloudflare to access GitHub (if not done)"
    echo "   • Select repository: sgctechai-website"
    echo "   • Click 'Begin setup'"
    echo ""
    echo "4️⃣  Configure Build Settings:"
    echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "   • Project name: sgctechai (or sgc-tech-ai)"
    echo "   • Production branch: main"
    echo "   • Framework preset: None"
    echo "   • Build command: (leave empty)"
    echo "   • Build output directory: /"
    echo "   • Root directory: / (default)"
    echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "5️⃣  Click 'Save and Deploy'"
    echo "   ⏱️  First deployment: 1-3 minutes"
    echo "   📍 Test URL: https://sgctechai.pages.dev"
    echo ""
    echo "6️⃣  Add Custom Domain (after successful deployment):"
    echo "   • Go to project → 'Custom domains' tab"
    echo "   • Click 'Set up a custom domain'"
    echo "   • Add: sgctech.ai"
    echo "   • Add: www.sgctech.ai (recommended)"
    echo "   • Cloudflare auto-configures DNS"
    echo "   • SSL/TLS enabled automatically"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "📖 DETAILED GUIDES AVAILABLE:"
    echo "═══════════════════════════════════════════════════════════════"
    echo "  • DEPLOYMENT_GUIDE.md - Complete step-by-step"
    echo "  • COMPLETION_SUMMARY.md - Project overview"
    echo "  • README.md - Repository documentation"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "🎉 Repository pushed successfully!"
    echo "🌐 Ready to deploy to sgctech.ai via Cloudflare Pages"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    
    # Optionally open Cloudflare in browser
    read -p "Open Cloudflare Pages in browser now? (y/n): " OPEN_CF
    if [[ "$OPEN_CF" =~ ^[Yy]$ ]]; then
        echo ""
        echo "🌐 Opening Cloudflare Pages..."
        if command -v start &> /dev/null; then
            start https://dash.cloudflare.com/
        elif command -v open &> /dev/null; then
            open https://dash.cloudflare.com/
        elif command -v xdg-open &> /dev/null; then
            xdg-open https://dash.cloudflare.com/
        else
            echo "Please open manually: https://dash.cloudflare.com/"
        fi
    fi
    
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo ""
    echo "Common issues:"
    echo "  1. Repository doesn't exist on GitHub yet"
    echo "     → Create it at: https://github.com/new"
    echo ""
    echo "  2. Authentication failed"
    echo "     → Run: git config --global credential.helper store"
    echo "     → Try pushing again, enter credentials when prompted"
    echo ""
    echo "  3. Remote URL is incorrect"
    echo "     → Check: git remote get-url origin"
    echo "     → Fix: git remote set-url origin https://github.com/USERNAME/REPO.git"
    echo ""
    echo "Need help? Check DEPLOYMENT_GUIDE.md"
    exit 1
fi
