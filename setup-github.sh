#!/bin/bash

# SGC TECH AI - GitHub Setup Script
# This script helps you push the website to GitHub

echo "🚀 SGC TECH AI - GitHub Repository Setup"
echo "========================================"
echo ""

# Prompt for GitHub username
read -p "Enter your GitHub username: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ GitHub username cannot be empty!"
    exit 1
fi

echo ""
echo "📝 Repository Details:"
echo "   Name: sgctechai-website"
echo "   Owner: $GITHUB_USER"
echo "   URL: https://github.com/$GITHUB_USER/sgctechai-website"
echo ""

# Confirm
read -p "Is this correct? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Setup cancelled"
    exit 1
fi

echo ""
echo "⏳ Setting up GitHub remote..."

# Remove existing remote if any
git remote remove origin 2>/dev/null

# Add new remote
git remote add origin "https://github.com/$GITHUB_USER/sgctechai-website.git"

if [ $? -eq 0 ]; then
    echo "✅ Remote added successfully"
else
    echo "❌ Failed to add remote"
    exit 1
fi

echo ""
echo "⏳ Renaming branch to main..."
git branch -M main

echo ""
echo "⏳ Pushing to GitHub..."
echo "   (You may be prompted for GitHub credentials)"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Website pushed to GitHub!"
    echo ""
    echo "🔗 View your repository:"
    echo "   https://github.com/$GITHUB_USER/sgctechai-website"
    echo ""
    echo "📋 Next Steps:"
    echo "   1. Go to https://dash.cloudflare.com/"
    echo "   2. Navigate to Workers & Pages"
    echo "   3. Click 'Create application' → 'Pages' → 'Connect to Git'"
    echo "   4. Select your repository: sgctechai-website"
    echo "   5. Deploy settings:"
    echo "      - Framework: None (Static HTML)"
    echo "      - Build command: (leave empty)"
    echo "      - Output directory: /"
    echo "   6. Add custom domain: sgctech.ai"
    echo ""
    echo "📖 Full deployment guide: DEPLOYMENT_GUIDE.md"
    echo ""
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo ""
    echo "Common issues:"
    echo "  1. Repository doesn't exist yet"
    echo "     → Create it at: https://github.com/new"
    echo "  2. Authentication failed"
    echo "     → Set up Git credentials or use SSH"
    echo "  3. Permission denied"
    echo "     → Check repository access rights"
    echo ""
    echo "Try again after fixing the issue:"
    echo "  ./setup-github.sh"
    exit 1
fi
