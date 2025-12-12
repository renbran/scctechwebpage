# 🚀 Cloudflare Pages Deployment Guide
## SGC TECH AI Website - Complete Step-by-Step Instructions

**Date**: December 12, 2025  
**Repository**: https://github.com/renbran/scctechwebpage  
**Target Domain**: sgctech.ai

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- ✅ Cloudflare account (sign up at https://dash.cloudflare.com/)
- ✅ Domain registered and transferred to Cloudflare DNS
- ✅ GitHub repository accessible (https://github.com/renbran/scctechwebpage)
- ✅ All changes merged to main branch (Week 1 complete!)

---

## 🎯 Deployment Options

### Option A: Automatic Deployment (Recommended) ⭐
**Best for**: Ongoing development with automatic updates  
**Setup time**: 5 minutes  
**Updates**: Automatic on every push to main

### Option B: Manual Deployment via Wrangler CLI
**Best for**: One-time deployments or testing  
**Setup time**: 10 minutes  
**Updates**: Manual via command

---

## 🚀 OPTION A: Automatic Cloudflare Pages Deployment

This connects your GitHub repo to Cloudflare for automatic deployments.

### Step 1: Access Cloudflare Dashboard

1. Go to: https://dash.cloudflare.com/
2. Log in with your credentials
3. Click on your account name (top left)

### Step 2: Navigate to Pages

1. In the left sidebar, click **"Workers & Pages"**
2. Click **"Create application"** button (blue button)
3. Select **"Pages"** tab
4. Click **"Connect to Git"**

### Step 3: Connect GitHub Repository

1. Click **"Connect GitHub"** button
2. **Authorize Cloudflare** to access your GitHub account
3. In the popup, you may need to:
   - Select which repositories Cloudflare can access
   - Choose **"Only select repositories"**
   - Select: **renbran/scctechwebpage**
   - Click **"Install & Authorize"**

### Step 4: Configure Build Settings

After connecting GitHub:

**Project Settings:**
```
Project name: sgctech
Production branch: main
```

**Build Settings:**
```
Framework preset: None
Build command: (leave empty)
Build output directory: /
Root directory: /
```

**Why these settings?**
- This is a static HTML site, no build process needed
- All files are already in the root directory
- No compilation or bundling required

### Step 5: Environment Variables

Skip this section - no environment variables needed for static HTML.

### Step 6: Deploy!

1. Click **"Save and Deploy"** button
2. Wait 1-2 minutes for first deployment
3. You'll see build logs in real-time
4. When complete, you'll get a URL like: `sgctech.pages.dev`

### Step 7: Configure Custom Domain

After successful deployment:

1. On the project page, click **"Custom domains"** tab
2. Click **"Set up a custom domain"**
3. Enter: `sgctech.ai`
4. Click **"Continue"**
5. Cloudflare will automatically configure DNS
6. Wait 5-10 minutes for SSL certificate provisioning
7. Your site will be live at: https://sgctech.ai

**SSL/TLS Settings:**
- Cloudflare automatically provisions SSL certificate (Let's Encrypt)
- HTTPS is enforced by default
- Certificate auto-renews

---

## 🛠️ OPTION B: Manual Deployment via Wrangler CLI

If you prefer command-line deployment or want more control.

### Step 1: Install Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Verify installation
wrangler --version
```

### Step 2: Login to Cloudflare

```bash
# This opens browser for authentication
wrangler login

# Follow the prompts to authorize
```

### Step 3: Create Pages Project

```bash
# Navigate to your project
cd /home/user/webapp

# Create Cloudflare Pages project
wrangler pages project create sgctech

# Follow prompts:
# - Production branch: main
# - Preview branch pattern: * (or leave blank)
```

### Step 4: Deploy to Cloudflare

```bash
# Deploy current directory
wrangler pages deploy . --project-name=sgctech

# This will:
# - Upload all files
# - Create deployment
# - Provide preview URL
```

### Step 5: Set Production Branch

```bash
# Set main as production branch
wrangler pages deployment list --project-name=sgctech

# Promote a deployment to production
wrangler pages deployment promote <DEPLOYMENT_ID> --project-name=sgctech
```

---

## 📊 Post-Deployment Verification

### Immediate Checks (5 minutes after deployment)

1. **Visit your site**: https://sgctech.ai
   - [ ] Site loads correctly
   - [ ] No 404 errors
   - [ ] Images display properly
   - [ ] Navigation works

2. **Test key features**:
   - [ ] Statistics section animates on scroll
   - [ ] WhatsApp buttons open correctly
   - [ ] ROI calculator works
   - [ ] Forms submit properly
   - [ ] Mobile responsive design works

3. **Check developer console** (F12):
   - [ ] No JavaScript errors
   - [ ] GA4 loads (if Measurement ID added)
   - [ ] Analytics module loads
   - [ ] All CSS loads correctly

### SEO Verification (1 hour after deployment)

1. **Meta Tags Check**:
```bash
curl -s https://sgctech.ai | grep -E '<title>|<meta name="description"'
```

Expected output:
```html
<title>14-Day ERP Implementation | 150% ROI Guaranteed | SGC TECH AI</title>
<meta name="description" content="Deploy Odoo ERP in 14 days, not months...">
```

2. **Open Graph Tags**:
```bash
curl -s https://sgctech.ai | grep 'property="og:'
```

3. **Structured Data**:
```bash
curl -s https://sgctech.ai | grep '@type'
```

### Performance Check

1. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Enter: https://sgctech.ai
   - Target: 90+ score for both mobile and desktop

2. **GTmetrix**: https://gtmetrix.com/
   - Analyze: https://sgctech.ai
   - Check load time (<3 seconds)

---

## 🔄 Automatic Deployment Workflow

Once set up with Option A, here's what happens automatically:

```mermaid
graph LR
A[Make changes locally] --> B[Commit to branch]
B --> C[Push to GitHub]
C --> D[Create Pull Request]
D --> E[Merge to main]
E --> F[Cloudflare auto-deploys]
F --> G[Live in 1-2 minutes]
```

**Timeline:**
1. Push code to GitHub: Instant
2. GitHub webhook triggers Cloudflare: 5-10 seconds
3. Cloudflare builds and deploys: 1-2 minutes
4. Site is live: Total ~2-3 minutes

---

## 🎯 Setting Up Custom Domain (Detailed)

### If Domain is Already in Cloudflare

1. Go to: **Workers & Pages** → Your project
2. Click: **Custom domains** tab
3. Click: **Set up a custom domain**
4. Enter: `sgctech.ai`
5. Cloudflare automatically configures DNS
6. Click: **Activate domain**

**DNS Records Created Automatically:**
```
Type: CNAME
Name: sgctech.ai
Content: sgctech.pages.dev
Proxy: Enabled (orange cloud)
```

### If Domain is NOT in Cloudflare

1. **Transfer nameservers** to Cloudflare:
   - Go to: https://dash.cloudflare.com/
   - Add site: `sgctech.ai`
   - Follow instructions to change nameservers at registrar
   - Wait 24-48 hours for propagation

2. **Then follow steps above** to add custom domain

---

## 🔧 Troubleshooting Common Issues

### Issue 1: "Build Failed"

**Symptoms**: Deployment fails with build error

**Solution**:
- For static HTML, ensure build settings are:
  - Build command: (empty)
  - Output directory: `/`
- Check for syntax errors in HTML/JS files

### Issue 2: "404 Not Found" on Deployment

**Symptoms**: Site shows 404 page

**Solution**:
```bash
# Ensure index.html is in root
ls /home/user/webapp/index.html

# Check wrangler.toml configuration
cat /home/user/webapp/wrangler.toml
```

Should have:
```toml
pages_build_output_dir = "./"
```

### Issue 3: CSS/JS Not Loading

**Symptoms**: Site loads but unstyled, JS broken

**Solution**:
- Check file paths are relative (not absolute)
- Verify all files are in repository
- Check browser console for 404 errors

**Fix relative paths:**
```html
<!-- Good -->
<link rel="stylesheet" href="css/styles.css">
<script src="js/main.js"></script>

<!-- Bad -->
<link rel="stylesheet" href="/home/user/webapp/css/styles.css">
```

### Issue 4: Domain Not Connecting

**Symptoms**: Custom domain shows "Cannot reach this page"

**Solution**:
1. Check DNS propagation: https://dnschecker.org/
2. Verify DNS records in Cloudflare:
   - Should have CNAME pointing to `*.pages.dev`
3. Wait 5-10 minutes for SSL certificate
4. Clear browser cache

### Issue 5: Changes Not Deploying

**Symptoms**: Updates not showing on live site

**Solution**:
```bash
# Verify changes are on GitHub main branch
git log --oneline -5

# Check Cloudflare deployment status
# Visit: Workers & Pages → sgctech → Deployments

# Force browser refresh
# Press: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

# Clear Cloudflare cache (if needed)
# Dashboard → Caching → Purge Everything
```

---

## 📈 Monitoring & Analytics

### Cloudflare Analytics

Access at: **Workers & Pages** → Your project → **Analytics**

**Metrics Available:**
- Requests per day
- Bandwidth usage
- Unique visitors
- Top countries
- Top pages

### Google Analytics 4 Setup

After deployment, add your GA4 Measurement ID:

1. Create GA4 property (see GOOGLE_ANALYTICS_SETUP.md)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Replace placeholder in files:
   - `index.html` (2 places)
   - `team.html` (2 places)
   - `js/analytics.js` (1 place)
4. Commit and push:

```bash
# After replacing G-XXXXXXXXXX with real ID
git add .
git commit -m "feat(analytics): add GA4 Measurement ID"
git push origin main

# Wait 2 minutes for auto-deployment
```

---

## 🔐 Security Best Practices

### HTTPS Configuration

✅ **Automatic**: Cloudflare handles SSL automatically
- Certificate auto-provisioned (Let's Encrypt)
- HTTPS enforced by default
- Auto-renewal every 90 days

### Security Headers

Add in Cloudflare Pages settings:

1. Go to: **Workers & Pages** → Your project → **Settings**
2. Scroll to: **Environment variables**
3. Add custom headers via `_headers` file:

Create `_headers` file in root:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

Commit and push:
```bash
git add _headers
git commit -m "feat(security): add security headers"
git push origin main
```

---

## 📊 Deployment Checklist

Use this checklist for every deployment:

### Pre-Deployment
- [ ] All changes committed to Git
- [ ] Pull request reviewed and merged to main
- [ ] No uncommitted changes (`git status` clean)
- [ ] Local testing completed
- [ ] No console errors in browser

### During Deployment
- [ ] Cloudflare build succeeds (check logs)
- [ ] No build warnings or errors
- [ ] Deployment completes in 1-2 minutes

### Post-Deployment
- [ ] Site loads at production URL
- [ ] All pages accessible (test navigation)
- [ ] Statistics section animates
- [ ] WhatsApp/Email/Phone links work
- [ ] ROI calculator functions
- [ ] Mobile responsive design verified
- [ ] No JavaScript errors (F12 console)
- [ ] GA4 tracking loads (if configured)

### SEO Verification
- [ ] Title tags display correctly
- [ ] Meta descriptions show in view-source
- [ ] Open Graph tags present
- [ ] Structured data validates
- [ ] Sitemap accessible (/sitemap.xml)
- [ ] Robots.txt accessible (/robots.txt)

---

## 🎯 Next Steps After Deployment

### Immediate (Day 1)
1. Add GA4 Measurement ID to site
2. Verify analytics tracking in Realtime
3. Test all forms and CTAs
4. Share site with team for QA

### Week 1
1. Submit sitemap to Google Search Console
2. Monitor analytics for baseline metrics
3. Check for any 404 errors in logs
4. Gather user feedback

### Month 1
1. Review Google Analytics reports
2. Check keyword rankings improvement
3. Analyze conversion rates
4. Optimize based on data

---

## 📞 Support Resources

### Cloudflare Documentation
- **Pages Docs**: https://developers.cloudflare.com/pages/
- **Deployment Guide**: https://developers.cloudflare.com/pages/get-started/
- **Custom Domains**: https://developers.cloudflare.com/pages/platform/custom-domains/

### Community Support
- **Cloudflare Community**: https://community.cloudflare.com/
- **Discord**: https://discord.cloudflare.com/
- **Status Page**: https://www.cloudflarestatus.com/

### SGC TECH AI Resources
- **GitHub Repo**: https://github.com/renbran/scctechwebpage
- **Documentation**: See README.md and deployment guides
- **Analytics Guide**: GOOGLE_ANALYTICS_SETUP.md

---

## 🎉 Deployment Complete Checklist

Once everything is live, confirm:

✅ **Technical**
- [ ] Site loads at https://sgctech.ai
- [ ] HTTPS certificate active (green padlock)
- [ ] All pages accessible
- [ ] No 404 errors
- [ ] JavaScript/CSS loading correctly

✅ **Content**
- [ ] Statistics section displays (135+, 175%, etc.)
- [ ] H1 tags show updated content
- [ ] Meta tags optimized
- [ ] Images display properly

✅ **Functionality**
- [ ] WhatsApp buttons work
- [ ] Phone/Email links work
- [ ] ROI calculator functions
- [ ] Forms submit properly
- [ ] Navigation works on mobile

✅ **Analytics**
- [ ] GA4 Measurement ID added (or placeholder ready)
- [ ] Analytics module loads without errors
- [ ] Events tracking setup (pending ID)

✅ **SEO**
- [ ] Sitemap submitted to Google Search Console
- [ ] Meta tags indexable
- [ ] Structured data valid
- [ ] Mobile-friendly test passes

---

**🎊 CONGRATULATIONS! Your site is now live on Cloudflare Pages! 🎊**

**Production URL**: https://sgctech.ai  
**Deployment**: Automatic on every push to main  
**Status**: Week 1 Foundation deployed ✅

---

**Need help?** Check troubleshooting section above or refer to Cloudflare documentation.

**Last Updated**: December 12, 2025  
**Version**: 1.0 - Complete deployment guide
