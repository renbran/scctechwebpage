# SGC TECH AI - File Structure

## Core HTML Pages (Root)
- index.html - Homepage
- about.html - About Us
- pricing.html - Pricing Plans
- success-stories.html - Case Studies
- team.html - Team Page
- appointment.html - Booking Page
- privacy-policy.html - Privacy Policy
- terms-of-service.html - Terms of Service

## CSS Architecture (css/)
**Load Order:**
1. styles.css - Base styles, CSS variables
2. premium-design.css - Dark gradients, glass morphism
3. global-uniformity.css - Consistent design across pages
4. [page-specific].css - Homepage-premium.css, pricing.css, etc.
5. animations.css - Animation library
6. contrast-improvements.css - Accessibility overrides (last)

**Active CSS Files:**
- styles.css - Foundation (1500+ lines)
- premium-design.css - Premium aesthetic (400+ lines)
- global-uniformity.css - Navy/cyan system (430+ lines)
- homepage-premium.css - Homepage enhancements
- pricing.css - Pricing page
- about.css - About page
- team.css - Team page
- success-stories.css - Case studies
- appointment.css - Booking page
- legal.css - Privacy/Terms pages
- animations.css - Keyframes library
- contrast-improvements.css - Accessibility
- calculator-modal.css - ROI calculator
- logo-styles.css - Logo sizing
- navigation-cta-standardized.css - Nav buttons
- geometric-patterns.css - Background patterns
- scroll-helpers.css - Smooth scrolling
- cookie-consent.css - GDPR banner
- animation-fallbacks.css - Reduced motion
- mobile-first-base.css - Mobile responsive
- beautification-2025.css - 2025 redesign
- redesign-2025.css - Additional 2025 updates
- image-enhanced-sections.css - Image styling

## Images (images/)
- logos/primary/ - Main logo (transparent)
- logos/white-version/ - White logo (dark backgrounds)
- logos/black-version/ - Black logo (light backgrounds)
- hero/ - Hero section images
- features/ - Feature section graphics
- team/ - Team photos
- clients/ - Client logos
- _temp-uploads/ - Uploaded files awaiting organization
- _backup/ - Backup images

## JavaScript (js/)
- main.js - Core functionality, ROI calculator
- team-charts.js - Team page analytics
- animations.js - Animation controls

## Services (services/)
- Individual service pages

## Case Studies (case-studies/)
- Customer success stories

## Blog (blog/)
- Blog posts

## Archives (_archive/)
- old-docs/ - Archived documentation
- completed-phases/ - Completed project phases
- audit-history/ - Historical audits
- legacy-scripts/ - Old scripts

## Deployment
- _headers - Cloudflare headers
- wrangler.toml - Cloudflare config
- CNAME - Domain config
- robots.txt - SEO
- sitemap.xml - SEO
