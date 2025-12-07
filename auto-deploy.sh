#!/bin/bash
# SGC TECH AI - Auto Deploy Script
# Commits changes to git and deploys to Cloudflare Pages

set -e

# Colors for output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 SGC TECH AI - Auto Deploy${NC}"
echo "================================"

# Navigate to project directory
cd "$(dirname "$0")"

# Get commit message from argument or use default
COMMIT_MSG="${1:-Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')}"

echo -e "\n${CYAN}📦 Staging changes...${NC}"
git add -A

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "No changes to commit. Deploying current version..."
else
    echo -e "${CYAN}📝 Committing: ${COMMIT_MSG}${NC}"
    git commit -m "$COMMIT_MSG"
    
    echo -e "\n${CYAN}⬆️ Pushing to GitHub...${NC}"
    git push origin main
fi

echo -e "\n${CYAN}☁️ Deploying to Cloudflare Pages...${NC}"
wrangler pages deploy . --project-name=sgctech --commit-dirty=true

echo -e "\n${GREEN}✅ Deployment Complete!${NC}"
echo "================================"
echo -e "🔗 Production: ${GREEN}https://sgctech.ai${NC}"
echo -e "🔗 Pages URL:  ${GREEN}https://sgctech.pages.dev${NC}"
echo -e "🔗 Main Alias: ${GREEN}https://main.sgctech.pages.dev${NC}"
