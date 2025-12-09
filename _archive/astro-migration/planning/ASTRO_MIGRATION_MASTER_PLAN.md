# SGC TECH AI - Astro Migration Master Plan
## Enterprise-Grade Premium Website with High Conversion Focus

**Document Version:** 1.0  
**Created:** December 9, 2025  
**Project Type:** Full Rebuild with Modern Stack  
**Target Score:** 95+ (Grade A+)  

---

## 📋 EXECUTIVE SUMMARY

### Project Vision
Transform the existing SGC TECH AI static website into a **world-class, enterprise-grade Astro application** that delivers:
- ⚡ **Sub-1.5 second load times**
- 🎯 **10-15% conversion rate** (industry average: 2-5%)
- ♿ **100% WCAG 2.1 AAA compliance**
- 🔍 **Perfect Lighthouse scores** (100/100/100/100)
- 🏆 **Premium visual experience** rivaling Fortune 500 websites

### Why Astro?

| Feature | Current (Vanilla) | Astro | Benefit |
|---------|-------------------|-------|---------|
| Component Reuse | ❌ Copy/paste | ✅ Single source | 80% less maintenance |
| Build Optimization | ❌ None | ✅ Automatic | 60% smaller bundles |
| Image Handling | ❌ Manual | ✅ Built-in optimization | 70% faster images |
| TypeScript | ❌ None | ✅ Full support | Zero runtime errors |
| SEO | ⚠️ Manual | ✅ Automatic sitemap/meta | Better rankings |
| Developer Experience | ⚠️ Basic | ✅ Hot reload, debugging | 3x faster development |

---

## 🎯 SUCCESS METRICS & KPIs

### Technical Performance Targets

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Lighthouse Performance | ~85 | **100** | PageSpeed Insights |
| Lighthouse Accessibility | ~82 | **100** | PageSpeed Insights |
| Lighthouse SEO | ~91 | **100** | PageSpeed Insights |
| Lighthouse Best Practices | ~90 | **100** | PageSpeed Insights |
| First Contentful Paint | ~1.8s | **< 0.8s** | Web Vitals |
| Largest Contentful Paint | ~2.8s | **< 1.5s** | Web Vitals |
| Cumulative Layout Shift | ~0.08 | **< 0.01** | Web Vitals |
| Time to Interactive | ~3.2s | **< 1.5s** | Web Vitals |
| Total Bundle Size | ~350KB | **< 100KB** | Build output |

### Business Conversion Targets

| Metric | Current Est. | Target | Strategy |
|--------|--------------|--------|----------|
| Form Conversion Rate | 3-5% | **10-15%** | Progressive disclosure, social proof |
| Bounce Rate | ~45% | **< 25%** | Faster load, better content hierarchy |
| Time on Site | ~2 min | **> 4 min** | Interactive elements, video content |
| ROI Calculator Usage | ~30% | **> 70%** | Above-fold placement, gamification |
| WhatsApp Click Rate | ~8% | **> 20%** | Smart triggers, exit intent |
| Appointment Bookings | Baseline | **+150%** | Streamlined UX, urgency elements |

---

## 🏗️ TECHNICAL ARCHITECTURE

### Stack Decision

```
┌─────────────────────────────────────────────────────────────┐
│                    ASTRO 4.x FRAMEWORK                       │
├─────────────────────────────────────────────────────────────┤
│  UI Layer        │  Astro Components + React Islands         │
│  Styling         │  Tailwind CSS 4.0 + Custom Design System  │
│  Animations      │  Framer Motion (islands) + CSS animations │
│  Forms           │  React Hook Form + Zod validation         │
│  State           │  Nanostores (minimal, shared state)       │
│  Content         │  Astro Content Collections (Markdown)     │
│  SEO             │  @astrojs/sitemap + astro-seo             │
│  Analytics       │  Partytown (web worker isolation)         │
│  Images          │  @astrojs/image (WebP, AVIF auto)         │
│  Deployment      │  Cloudflare Pages (Edge)                  │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure

```
sgc-tech-ai-astro/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD pipeline
├── public/
│   ├── fonts/                      # Self-hosted Inter font
│   ├── images/
│   │   ├── clients/                # Client logos (WebP)
│   │   ├── team/                   # Team photos
│   │   └── og/                     # Open Graph images
│   ├── videos/                     # Hero background videos
│   ├── favicon.svg
│   ├── robots.txt
│   └── _headers                    # Cloudflare security headers
├── src/
│   ├── components/
│   │   ├── global/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   ├── MobileMenu.astro
│   │   │   ├── CookieConsent.astro
│   │   │   └── SkipLink.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── GlassCard.astro
│   │   │   ├── Badge.astro
│   │   │   ├── Tooltip.astro
│   │   │   ├── Modal.astro
│   │   │   └── Accordion.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── TrustBar.astro
│   │   │   ├── ProblemSection.astro
│   │   │   ├── SolutionSection.astro
│   │   │   ├── ProcessTimeline.astro
│   │   │   ├── ROICalculator.tsx    # React Island
│   │   │   ├── Testimonials.astro
│   │   │   ├── PricingCards.astro
│   │   │   ├── FAQAccordion.astro
│   │   │   └── CTASection.astro
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx      # React Island
│   │   │   ├── LeadCapture.tsx      # React Island
│   │   │   └── NewsletterForm.astro
│   │   └── conversion/
│   │       ├── FloatingCTA.astro
│   │       ├── ExitIntent.tsx       # React Island
│   │       ├── SocialProof.astro
│   │       └── UrgencyBanner.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   ├── LegalLayout.astro
│   │   └── LandingLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── pricing.astro
│   │   ├── success-stories/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── team.astro
│   │   ├── appointment.astro
│   │   ├── privacy-policy.astro
│   │   ├── terms-of-service.astro
│   │   └── 404.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── case-studies/           # Markdown content
│   │   ├── team-members/
│   │   └── faqs/
│   ├── styles/
│   │   ├── global.css
│   │   └── design-tokens.css
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── seo.ts
│   │   └── analytics.ts
│   ├── stores/
│   │   └── calculator.ts           # Nanostores
│   └── types/
│       └── index.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🎨 PREMIUM DESIGN SYSTEM

### Design Philosophy

> **"Intelligent Elegance"** - A design that communicates technological sophistication while maintaining warmth and approachability. Every pixel serves a purpose: to build trust and drive action.

### Color System (Enhanced)

```css
/* design-tokens.css */
:root {
  /* Primary Palette - Deep Ocean */
  --color-primary-900: #050d17;    /* Deepest navy */
  --color-primary-800: #0a1628;    /* Dark backgrounds */
  --color-primary-700: #0c1e34;    /* Main background */
  --color-primary-600: #1a2942;    /* Cards, elevated */
  --color-primary-500: #1e3a8a;    /* Interactive elements */
  --color-primary-400: #3b5998;    /* Hover states */
  
  /* Accent - Electric Cyan (Trust & Innovation) */
  --color-accent-500: #00FFF0;     /* Primary accent */
  --color-accent-400: #33FFF3;     /* Hover */
  --color-accent-300: #66FFF6;     /* Active */
  --color-accent-glow: rgba(0, 255, 240, 0.4);
  
  /* Success - Neon Green (Money & Growth) */
  --color-success-500: #00FF88;    /* Success, ROI */
  --color-success-400: #33FF9F;    /* Hover */
  --color-success-glow: rgba(0, 255, 136, 0.4);
  
  /* Warning - Amber (Urgency) */
  --color-warning-500: #F59E0B;
  --color-warning-400: #FBBF24;
  
  /* Error - Coral Red */
  --color-error-500: #FF6B6B;
  --color-error-400: #FF8585;
  
  /* Neutrals */
  --color-white: #FFFFFF;
  --color-gray-100: #F8FAFC;
  --color-gray-200: #E2E8F0;
  --color-gray-300: #CBD5E1;
  --color-gray-400: #94A3B8;
  --color-gray-500: #64748B;
  --color-gray-600: #475569;
  
  /* Semantic Colors */
  --color-text-primary: var(--color-white);
  --color-text-secondary: rgba(255, 255, 255, 0.85);
  --color-text-muted: rgba(255, 255, 255, 0.6);
  --color-text-on-light: var(--color-primary-700);
  
  /* Gradients */
  --gradient-hero: linear-gradient(
    135deg,
    var(--color-primary-800) 0%,
    var(--color-primary-700) 50%,
    var(--color-primary-600) 100%
  );
  --gradient-cta: linear-gradient(
    135deg,
    var(--color-accent-500) 0%,
    var(--color-success-500) 100%
  );
  --gradient-glass: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.15);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.25);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.3);
  --shadow-glow-cyan: 0 0 30px var(--color-accent-glow);
  --shadow-glow-green: 0 0 30px var(--color-success-glow);
  
  /* Glass Morphism */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-bg-hover: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-blur: blur(20px);
  
  /* Typography Scale (Fluid) */
  --font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --font-size-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --font-size-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --font-size-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
  --font-size-5xl: clamp(3rem, 2rem + 5vw, 5rem);
  
  /* Spacing Scale */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
  
  /* Transitions */
  --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  
  /* Z-Index Scale */
  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 500;
  --z-fixed: 700;
  --z-modal-backdrop: 900;
  --z-modal: 1000;
  --z-popover: 1100;
  --z-tooltip: 1200;
}
```

### Typography System

```css
/* Self-hosted Inter for performance */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/inter-semibold.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-bold.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/inter-extrabold.woff2') format('woff2');
}
```

### Component Variants

```tsx
// Button Variants
const buttonVariants = {
  primary: "bg-gradient-cta text-primary-800 font-bold shadow-lg hover:shadow-glow-cyan",
  secondary: "bg-glass border border-glass-border text-white hover:bg-glass-hover",
  ghost: "bg-transparent text-accent-500 hover:bg-accent-500/10",
  danger: "bg-error-500 text-white hover:bg-error-400",
  
  // Sizes
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-8 py-4 text-lg rounded-xl",
  xl: "px-10 py-5 text-xl rounded-2xl",
};

// Card Variants
const cardVariants = {
  glass: "bg-glass backdrop-blur-xl border border-glass-border rounded-2xl",
  solid: "bg-primary-600 rounded-2xl shadow-lg",
  elevated: "bg-white text-primary-800 rounded-2xl shadow-xl",
  outline: "bg-transparent border-2 border-accent-500 rounded-2xl",
};
```

---

## 🚀 CONVERSION OPTIMIZATION STRATEGY

### Above-the-Fold Hierarchy (Homepage)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Sticky)                                            │
│  [Logo] [Nav Links] [CTA: Book Consultation - Glowing]      │
├─────────────────────────────────────────────────────────────┤
│  HERO SECTION (100vh)                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Trust Badge: "Trusted by 50+ UAE Enterprises"       │   │
│  │                                                      │   │
│  │ H1: "Intelligent Infrastructure                     │   │
│  │      Deployed in 14 Days."                          │   │
│  │                                                      │   │
│  │ H2: "Guaranteed 150-200% ROI or Your Money Back"    │   │
│  │                                                      │   │
│  │ [Primary CTA: Calculate My ROI →]                   │   │
│  │ [Secondary: Watch 2-Min Demo]                       │   │
│  │                                                      │   │
│  │ ┌──────────┬──────────┬──────────┬──────────┐       │   │
│  │ │ 14 Days  │ 150% ROI │ 98%      │ 24/7     │       │   │
│  │ │ Deploy   │ Minimum  │ Retention│ Support  │       │   │
│  │ └──────────┴──────────┴──────────┴──────────┘       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  TRUST BAR (Client Logos - Auto-scrolling)                 │
│  [Logo1] [Logo2] [Logo3] [Logo4] [Logo5] →                 │
└─────────────────────────────────────────────────────────────┘
```

### Psychological Triggers Implementation

| Trigger | Implementation | Location |
|---------|----------------|----------|
| **Social Proof** | Client logos, testimonial carousel, case study metrics | Hero, sidebar, footer |
| **Urgency** | "Only 3 slots left this month" counter | Pricing, hero |
| **Scarcity** | "Limited capacity for Q1 2026" | Appointment page |
| **Authority** | Odoo Partner badge, team credentials | About, footer |
| **Reciprocity** | Free ROI report, downloadable guides | Calculator, blog |
| **Loss Aversion** | "Companies lose $X per month without automation" | Problem section |
| **Specificity** | Exact numbers (14 days, 150%, AED amounts) | Throughout |

### Interactive Conversion Elements

#### 1. ROI Calculator (React Island)

```tsx
// Gamified multi-step calculator
const ROICalculator = () => {
  // Step 1: Company Info (3 fields)
  // Step 2: Pain Points (checkboxes with animations)
  // Step 3: Module Selection (visual cards)
  // Step 4: Results (animated reveal with confetti)
  
  // Real-time "savings preview" updates as user progresses
  // Exit intent: "Wait! Your report shows AED X savings..."
  // Social proof: "Join 847 companies who calculated ROI this month"
};
```

#### 2. Exit Intent Popup

```tsx
// Triggers when cursor moves to close tab
const ExitIntent = () => {
  // Headline: "Before you go..."
  // Offer: "Get your personalized ROI report in 30 seconds"
  // Form: Just email field
  // Urgency: "This week's 3 consultation slots are almost full"
};
```

#### 3. Floating CTA Bar

```astro
<!-- Appears after 30% scroll -->
<div class="fixed bottom-0 transform translate-y-full animate-slide-up">
  <div class="flex justify-between items-center bg-glass backdrop-blur-xl p-4">
    <span class="text-lg">Ready to transform your business?</span>
    <Button variant="primary" size="lg">
      Get My ROI Report →
    </Button>
  </div>
</div>
```

### Page-Specific Conversion Strategies

#### Homepage
- **Goal:** ROI Calculator completion → Lead capture
- **Primary CTA:** "Calculate My ROI"
- **Secondary CTA:** "Book Free Consultation"
- **Micro-conversions:** Video watch, testimonial engagement

#### Pricing Page
- **Goal:** Consultation booking
- **Strategy:** Value stacking, comparison with competitors
- **Urgency:** "Price lock guarantee expires [date]"
- **Trust:** Money-back guarantee badge

#### Success Stories
- **Goal:** Build confidence → Appointment
- **Strategy:** Industry-specific filtering, detailed metrics
- **CTA:** "Get similar results for your business"

#### Appointment Page
- **Goal:** Calendar booking completion
- **Strategy:** Remove friction, show availability
- **Social proof:** "Sarah just booked 5 minutes ago"

---

## 🔧 IMPLEMENTATION PHASES

### Phase 1: Foundation (Days 1-3)

**Tasks:**
- [ ] Initialize Astro project with TypeScript
- [ ] Set up Tailwind CSS with custom design tokens
- [ ] Configure Cloudflare Pages deployment
- [ ] Create base layout and global components
- [ ] Implement design system (colors, typography, spacing)
- [ ] Set up content collections for case studies, FAQs

**Deliverables:**
- Working Astro dev environment
- BaseLayout.astro with SEO setup
- Header, Footer, Navigation components
- Design tokens CSS file

### Phase 2: Core Pages (Days 4-7)

**Tasks:**
- [ ] Build homepage with all sections
- [ ] Create pricing page with tier cards
- [ ] Build about page with team grid
- [ ] Implement success stories with filtering
- [ ] Create appointment page with Calendly
- [ ] Build legal pages (privacy, terms)

**Deliverables:**
- All 8 pages functional
- Responsive design complete
- Internal linking structure

### Phase 3: Interactivity (Days 8-10)

**Tasks:**
- [ ] Build ROI Calculator (React Island)
- [ ] Implement contact forms with validation
- [ ] Add exit intent popup
- [ ] Create floating CTA components
- [ ] Implement cookie consent
- [ ] Add micro-animations (Framer Motion)

**Deliverables:**
- Interactive calculator working
- All forms submitting correctly
- Conversion elements active

### Phase 4: Optimization (Days 11-13)

**Tasks:**
- [ ] Image optimization (WebP/AVIF conversion)
- [ ] Implement lazy loading
- [ ] Add Schema.org structured data
- [ ] Configure analytics with Partytown
- [ ] Set up security headers
- [ ] Performance audit and fixes

**Deliverables:**
- Lighthouse 100/100/100/100
- All images optimized
- Analytics tracking live

### Phase 5: Testing & Launch (Days 14-15)

**Tasks:**
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Accessibility audit (aXe, WAVE)
- [ ] Form submission testing
- [ ] Load testing
- [ ] Final content review
- [ ] DNS/domain configuration
- [ ] Launch!

**Deliverables:**
- QA checklist complete
- Production deployment
- Monitoring setup

---

## 📝 COMPREHENSIVE DEVELOPMENT PROMPT

Use this prompt when building each component:

```markdown
## Component Development Prompt

You are building a premium, enterprise-grade component for SGC TECH AI's website.

### Context
- **Framework:** Astro 4.x with React islands for interactivity
- **Styling:** Tailwind CSS with custom design tokens (see design-tokens.css)
- **Target:** UAE B2B enterprises seeking ERP/automation solutions
- **Brand Voice:** Professional, confident, results-focused, technically credible

### Design Requirements
1. **Visual Style:**
   - Dark theme with deep navy backgrounds (#0c1e34)
   - Glass morphism for cards (blur + transparency)
   - Electric cyan (#00FFF0) for primary accents
   - Neon green (#00FF88) for success/money indicators
   - Subtle gradient backgrounds
   - Professional, not flashy

2. **Interaction Design:**
   - Smooth transitions (300ms ease-out)
   - Hover states on all interactive elements
   - Focus states for accessibility (cyan outline)
   - Loading states for async operations
   - Micro-animations for engagement

3. **Conversion Focus:**
   - Clear visual hierarchy leading to CTA
   - Trust elements (numbers, logos, badges)
   - Urgency where appropriate
   - Minimal friction in forms
   - Mobile-optimized touch targets (44px min)

### Technical Requirements
1. **Performance:**
   - Zero JavaScript unless absolutely necessary
   - Use Astro components for static content
   - React islands only for interactivity
   - Lazy load below-fold content
   - Optimize all images

2. **Accessibility:**
   - WCAG 2.1 AAA compliance
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigable
   - Screen reader friendly

3. **SEO:**
   - Proper heading hierarchy (single H1)
   - Descriptive alt text
   - Schema.org markup where applicable
   - Fast Core Web Vitals

### Code Style
- TypeScript for type safety
- Tailwind utility classes (avoid custom CSS)
- Component props documented
- Consistent naming conventions
- Clean, readable code

### Output Format
Provide:
1. Component code (.astro or .tsx)
2. Usage example
3. Props interface (if applicable)
4. Accessibility notes
5. Any required design tokens
```

---

## ✅ QUALITY ASSURANCE CHECKLIST

### Pre-Launch Checklist

#### Technical
- [ ] Lighthouse Performance: 100
- [ ] Lighthouse Accessibility: 100
- [ ] Lighthouse SEO: 100
- [ ] Lighthouse Best Practices: 100
- [ ] Core Web Vitals passing
- [ ] No console errors
- [ ] No broken links
- [ ] SSL configured
- [ ] Security headers set

#### Design
- [ ] Responsive on all breakpoints (320px - 1920px)
- [ ] Consistent spacing and alignment
- [ ] All images optimized and loading
- [ ] Animations smooth (60fps)
- [ ] Dark theme consistent
- [ ] Typography readable

#### Conversion
- [ ] All CTAs visible and clickable
- [ ] Forms submitting correctly
- [ ] Calculator producing results
- [ ] Exit intent triggering
- [ ] Analytics tracking events
- [ ] WhatsApp links working

#### Accessibility
- [ ] Keyboard navigation complete
- [ ] Screen reader tested
- [ ] Color contrast passing
- [ ] Focus indicators visible
- [ ] Alt text on all images
- [ ] ARIA labels correct

#### Content
- [ ] All copy proofread
- [ ] Legal pages complete
- [ ] Contact info correct
- [ ] Social links working
- [ ] Meta descriptions set
- [ ] OG images configured

---

## 📊 POST-LAUNCH MONITORING

### Analytics Events to Track

```typescript
// src/lib/analytics.ts
export const trackEvents = {
  // Page engagement
  'page_view': { page: string },
  'scroll_depth': { percentage: number },
  'time_on_page': { seconds: number },
  
  // Conversion funnel
  'calculator_started': {},
  'calculator_step_completed': { step: number },
  'calculator_completed': { estimated_roi: number },
  'lead_form_viewed': { location: string },
  'lead_form_started': { fields_filled: number },
  'lead_form_submitted': { source: string },
  
  // CTA interactions
  'cta_clicked': { cta_text: string, location: string },
  'whatsapp_clicked': { page: string },
  'appointment_booked': { source: string },
  
  // Exit intent
  'exit_intent_shown': {},
  'exit_intent_converted': {},
  'exit_intent_dismissed': {},
};
```

### Weekly Review Metrics

| Metric | Tool | Goal |
|--------|------|------|
| Conversion Rate | GA4 | > 10% |
| Bounce Rate | GA4 | < 25% |
| Avg. Session Duration | GA4 | > 4 min |
| Calculator Completions | Custom | > 70% start-to-finish |
| Form Submissions | Formspree/Custom | Track by source |
| Page Speed | PageSpeed Insights | Maintain 100 |

---

## 🎯 EXPECTED OUTCOMES

### After 30 Days

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Lighthouse Score | 87 | 98+ | +11 points |
| Page Load Time | 2.8s | <1.5s | -46% |
| Mobile Usability | 85% | 100% | +15% |
| Form Conversion | 3-5% | 8-12% | +150% |
| Bounce Rate | 45% | 30% | -33% |

### After 90 Days (with traffic growth)

| Metric | Baseline | Target |
|--------|----------|--------|
| Monthly Leads | X | 3X |
| Consultation Bookings | X | 2.5X |
| ROI Calculator Usage | 30% | 75% |
| Time on Site | 2 min | 5+ min |
| Return Visitors | 15% | 35% |

---

## 🚦 READY TO START

### Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] VS Code with Astro extension
- [ ] Cloudflare account configured
- [ ] Domain DNS ready
- [ ] Content inventory complete
- [ ] Image assets prepared

### First Command

```bash
npm create astro@latest sgc-tech-ai -- --template minimal --typescript strict
cd sgc-tech-ai
npm install @astrojs/react @astrojs/tailwind @astrojs/sitemap
npm install tailwindcss @tailwindcss/typography framer-motion
npm install react react-dom @types/react @types/react-dom
npm install zod react-hook-form @hookform/resolvers
```

---

**Document Status:** Ready for Implementation  
**Next Step:** Initialize Astro project and begin Phase 1  
**Estimated Timeline:** 15 working days to launch  

---

*This plan was created to deliver a world-class, enterprise-grade website that not only looks premium but converts visitors into qualified leads at industry-leading rates.*
