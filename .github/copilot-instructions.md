# SGC TECH AI Website - Copilot Instructions

## Project Overview
**What:** Static marketing website for SGC TECH AI - a UAE-based Odoo ERP implementation service
**Tech Stack:** Vanilla HTML/CSS/JavaScript (no build process or frameworks)
**Target:** B2B enterprise clients seeking 14-day ERP deployment with guaranteed ROI
**Status:** Production-ready (94.2% audit score), deployed on Cloudflare Pages

## Architecture & File Structure

### CSS Layering System (Load Order Matters!)
All HTML pages import CSS in this EXACT order:
1. `css/styles.css` - Base styles, CSS variables, global resets (1500+ lines)
2. `css/premium-design.css` - Dark gradient system, glass morphism effects (400+ lines)
3. Page-specific CSS - e.g., `css/homepage-premium.css`, `css/pricing.css`
4. `css/contrast-improvements.css` - Accessibility overrides (loaded last)

**Why:** Later stylesheets override earlier ones. Never change the import order or specificity breaks.

### Color System - "Deep Ocean Palette"
Defined in `:root` of `css/styles.css`:
- `--deep-navy: #0c1e34` - Primary background
- `--ocean-blue: #1e3a8a` - Header/footer
- `--electric-cyan: #00FFF0` - Primary CTA accent
- `--neon-green: #00FF88` - Success/money indicators
- `--gradient-primary: linear-gradient(135deg, #0a1628 0%, #1a2942 50%, #0f2439 100%)` - Premium backgrounds

**Rule:** Never use hex colors directly in HTML/CSS. Always use CSS variables for brand consistency.

### Component Pages Pattern
Each page follows this structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- SEO meta tags with specific title/description -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <!-- CSS cascade: styles.css → premium-design.css → page-specific.css → contrast-improvements.css -->
</head>
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header class="header"><!-- Shared navigation --></header>
    <section id="main-content"><!-- Page content --></section>
    <footer class="footer"><!-- Shared footer --></footer>
    <script src="js/main.js"></script>
    <!-- Page-specific JS if needed -->
</body>
</html>
```

## Key Workflows

### Adding a New Page
1. Copy existing page structure (e.g., `about.html`)
2. Update `<title>` and meta description for SEO
3. Import CSS in standard order (see Architecture section)
4. Replace `<section id="main-content">` content
5. Create page-specific CSS file in `css/` if needed
6. Add navigation link to ALL pages (`.nav-menu` in header)
7. Update `sitemap.xml` with new URL

### Modifying Styles
**DO:**
- Edit existing CSS variables in `:root` for global changes
- Add new classes to page-specific CSS files
- Test on mobile (320px), tablet (768px), and desktop (1024px+)

**DON'T:**
- Add inline styles (breaks maintainability)
- Use `!important` (indicates specificity issues)
- Change CSS load order
- Override premium-design.css gradients (intentional brand aesthetic)

### ROI Calculator Logic
Located in `js/main.js` (lines 50-150):
- Calculates based on: employees, current costs, industry, selected modules
- Minimum guaranteed ROI: 150% (line 139: `Math.max(roiPercentage, 150)`)
- Industry multipliers: Real Estate (1.3x), Manufacturing (1.2x), Professional Services (1.25x)
- Results display animated in `#calculatorResults` section

**To modify calculations:** Edit `calculateROI()` function, test with edge cases (5 employees vs 100+)

## Integration Points

### External Dependencies
- **Font Awesome 6.4.0** - All icons (use `<i class="fas fa-icon-name"></i>`)
- **Google Fonts Inter** - Primary font family
- **Chart.js** - Team page analytics (`js/team-charts.js`)
- **Calendly** - Appointment booking (embedded iframe in `appointment.html`)

### WhatsApp Integration
Mobile sticky bar (`index.html` line 17):
```html
<a href="https://wa.me/971563905772?text=Hi%20SGC%2C%20I%27m%20interested..." class="btn-whatsapp-sticky">
```
Update phone number in ALL pages if changed (appears 3+ times per page).

### Deployment
- **Hosting:** Cloudflare Pages (static hosting, no build step)
- **Deploy:** `./deploy.sh` script pushes to GitHub, then auto-deploys via Cloudflare
- **Domain:** sgctech.ai (configured in Cloudflare DNS)
- **No build process** - HTML/CSS/JS served directly

## Project-Specific Conventions

### Mobile-First Responsive Design
All components start with mobile styles, then scale up:
```css
.component { /* Mobile: 320px-767px */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

### Accessibility Requirements
- `<a href="#main-content" class="skip-link">` on every page (keyboard navigation)
- ARIA labels on all interactive elements
- Color contrast meets WCAG AA (tested with `contrast-improvements.css`)
- Font size minimum: 16px (never go smaller)

### B2B SaaS Voice & Tone
- Headlines: Bold, quantifiable claims ("14 Days", "150% ROI")
- Body: Professional but conversational, avoid jargon
- CTAs: Action-oriented ("Calculate Your ROI", "Book Consultation")
- Never use: "Contact Us", "Learn More", "Click Here" (too generic)

### Success Metrics in Code
Hard-coded guarantees (DO NOT change without business approval):
- 14-day deployment timeline
- 150% minimum ROI guarantee
- 98% client retention rate
- 6-month payback period

## Common Patterns

### Filter System (Success Stories)
`js/success-stories.js` implements industry filtering:
```javascript
// data-filter attribute on buttons matches data-industry on case studies
<button data-filter="real-estate">Real Estate</button>
<div class="case-study" data-industry="real-estate">...</div>
```

### Glass Morphism Effects
Premium design pattern from `css/premium-design.css`:
```css
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
```
Used on: pricing cards, team page, hero sections.

### Trust Badges Pattern
Repeating component across pages:
```html
<div class="trust-badges">
    <div class="trust-badge">
        <div class="trust-number">14</div>
        <div class="trust-label">Days Avg Deployment</div>
    </div>
</div>
```
Always displays: 14 days, 150% ROI, 98% retention.

## Documentation & Context

### Key Files to Reference
- `COMPREHENSIVE_AUDIT_REPORT.md` - Quality standards (94.2% production-ready)
- `PREMIUM_DESIGN_ACTION_PLAN.md` - Design system roadmap
- `IMAGE_GENERATION_STRATEGY.md` - Image specs for future assets
- `DEPLOYMENT_GUIDE.md` - GitHub + Cloudflare setup instructions
- `README.md` - Complete feature list and brand strategy

### Testing Before Commit
1. Open in browser, test all pages
2. Mobile responsive check (Chrome DevTools device emulation)
3. ROI calculator with different inputs (5, 25, 100 employees)
4. Navigation links work across all pages
5. WhatsApp links open correctly
6. Verify no console errors

### Client-Specific Context
- **Parent Company:** Scholarix Global (study abroad consultancy)
- **Target Market:** UAE enterprises, 5-100 employees
- **Core Offering:** Odoo ERP implementation (not custom software)
- **USP:** 14-day speed + ROI guarantee (industry standard is 3-6 months)

## Anti-Patterns to Avoid
❌ Framework imports (React, Vue, etc.) - This is vanilla JavaScript
❌ Build tools (Webpack, Vite) - Static site, no build step
❌ Node.js dependencies - Client-side only, no backend
❌ Changing phone numbers without confirmation - Business critical
❌ Removing "Skip to content" links - Accessibility requirement
❌ Generic CTAs like "Learn More" - Violates B2B voice guidelines
