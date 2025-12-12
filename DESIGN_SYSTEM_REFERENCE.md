# 🎨 SGC TECH AI - DESIGN SYSTEM REFERENCE GUIDE
**Version:** 1.0  
**Last Updated:** December 7, 2024  
**Maintainer:** SGC TECH AI Engineering Team

---

## 📋 PURPOSE OF THIS DOCUMENT

This document serves as the **single source of truth** for all design decisions on the SGC TECH AI website. Use this guide when:
- Adding new pages or sections
- Creating marketing materials
- Updating existing components
- Onboarding new team members
- Ensuring brand consistency

---

## 🎨 COLOR SYSTEM

### Primary Palette: "Deep Ocean"

```css
/* Core Brand Colors */
--deep-navy: #0c1e34;        /* Primary background */
--ocean-blue: #1e3a8a;       /* Header/footer */
--electric-cyan: #00FFF0;    /* Primary CTA, innovation */
--neon-green: #00FF88;       /* Success, money, ROI */
--carbon-black: #0A0A0A;     /* Dark sections */
--ice-white: #e8f4fd;        /* Light text on dark */
--slate-gray: #64748b;       /* Secondary text */
--white: #ffffff;            /* Pure white */
```

### When to Use Each Color

| Color | Use Cases | Examples |
|-------|-----------|----------|
| **Electric Cyan (#00FFF0)** | Primary CTAs, highlights, hover states | "Book Consultation", "Calculate ROI" buttons |
| **Neon Green (#00FF88)** | Success indicators, ROI metrics, money | "150% ROI", checkmarks, success messages |
| **Deep Navy (#0c1e34)** | Page backgrounds, card backgrounds | Body background, hero sections |
| **Ocean Blue (#1e3a8a)** | Headers, footers, secondary sections | Navigation bar, footer |
| **Slate Gray (#64748b)** | Secondary text, disabled states | Helper text, form labels |

### Gradient System

```css
/* Primary Background Gradient (Dark Sections) */
--gradient-primary: linear-gradient(135deg, #0a1628 0%, #1a2942 50%, #0f2439 100%);

/* Accent Gradient (CTAs, Highlights) */
--gradient-accent: linear-gradient(135deg, #00d9ff 0%, #00a8cc 100%);

/* Premium Card Background */
--gradient-card: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);

/* Glow Effect */
--gradient-glow: linear-gradient(135deg, rgba(0,217,255,0.1) 0%, rgba(0,168,204,0.1) 100%);
```

### Color Accessibility Matrix

| Foreground | Background | Contrast Ratio | WCAG Level |
|------------|------------|----------------|------------|
| #ffffff (white) | #0c1e34 (deep-navy) | 14.8:1 | AAA ✅ |
| #00FFF0 (cyan) | #0c1e34 (deep-navy) | 10.2:1 | AAA ✅ |
| #00FF88 (green) | #0c1e34 (deep-navy) | 11.5:1 | AAA ✅ |
| #64748b (gray) | #ffffff (white) | 4.6:1 | AA ✅ |
| #0c1e34 (navy) | #ffffff (white) | 14.8:1 | AAA ✅ |

**Rule:** Always verify contrast ratio ≥ 4.5:1 for text, ≥ 3:1 for large text (24px+)

---

## ✍️ TYPOGRAPHY SYSTEM

### Font Family

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Why Inter?**
- Modern, professional appearance
- Excellent readability at all sizes
- Wide range of weights (400, 600, 700, 800)
- Optimized for screens
- Free, open-source (Google Fonts)

### Type Scale

```css
/* Headings */
--font-size-h1: clamp(2.5rem, 5vw, 4.5rem);    /* 40px - 72px */
--font-size-h2: clamp(2rem, 4vw, 3.5rem);      /* 32px - 56px */
--font-size-h3: clamp(1.5rem, 3vw, 2rem);      /* 24px - 32px */
--font-size-h4: 1.25rem;                       /* 20px */

/* Body Text */
--font-size-body: 1rem;                        /* 16px - NEVER SMALLER */
--font-size-small: 0.875rem;                   /* 14px - Use sparingly */

/* Font Weights */
--font-weight-regular: 400;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Typography Rules

1. **Minimum 16px for body text** - Ensures mobile readability
2. **Line height 1.6 for body** - Comfortable reading
3. **Line height 1.2 for headlines** - Tight, impactful
4. **Max 70 characters per line** - Optimal reading width
5. **Bold weights (700-900) for headlines** - Creates authority

### Heading Hierarchy Examples

```html
<!-- H1: Page Title (Once per page) -->
<h1>Intelligent Infrastructure Deployed in 14 Days</h1>

<!-- H2: Section Titles -->
<h2>Why Traditional ERP Projects Fail</h2>

<!-- H3: Subsection Titles -->
<h3>Endless Timelines</h3>

<!-- H4: Card Titles, Small Headers -->
<h4>What's Included</h4>
```

---

## 📐 SPACING SYSTEM

### Spacing Scale

```css
--spacing-xs: 8px;    /* Tight spacing, form elements */
--spacing-sm: 16px;   /* Standard gap between elements */
--spacing-md: 24px;   /* Card padding, section gaps */
--spacing-lg: 32px;   /* Large card padding */
--spacing-xl: 48px;   /* Section padding (mobile) */
--spacing-2xl: 64px;  /* Section padding (desktop) */
--spacing-3xl: 80px;  /* Large section gaps */
--spacing-4xl: 120px; /* Hero section padding */
```

### Spacing Rules

1. **Mobile vertical spacing:** 48-64px between sections
2. **Desktop vertical spacing:** 80-120px between sections
3. **Card padding:** 24px mobile, 40px desktop
4. **Grid gaps:** 24px mobile, 40px desktop
5. **Button padding:** 12px-16px vertical, 24px-32px horizontal

### Example Usage

```css
/* Section Spacing */
.section {
    padding: var(--spacing-xl) 0;  /* Mobile: 48px */
}

@media (min-width: 1024px) {
    .section {
        padding: var(--spacing-4xl) 0;  /* Desktop: 120px */
    }
}

/* Card Spacing */
.card {
    padding: var(--spacing-md);  /* Mobile: 24px */
}

@media (min-width: 768px) {
    .card {
        padding: var(--spacing-lg);  /* Desktop: 32px */
    }
}
```

---

## 🔘 BUTTON SYSTEM

### Primary Button (Electric Cyan)

```css
.btn-primary {
    background: linear-gradient(135deg, var(--electric-cyan), var(--neon-green));
    color: var(--deep-navy);
    padding: 16px 32px;
    border-radius: 50px;
    font-weight: 800;
    font-size: 1rem;
    text-transform: none;
    border: none;
    box-shadow: 0 4px 20px rgba(0, 255, 240, 0.5);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 255, 240, 0.6);
    background: linear-gradient(135deg, #00FFF0, #00d9ff);
}
```

### Secondary Button (Outline)

```css
.btn-secondary {
    background: transparent;
    color: var(--electric-cyan);
    padding: 14px 30px;  /* 2px less to account for border */
    border: 2px solid var(--electric-cyan);
    border-radius: 50px;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-secondary:hover {
    background: var(--electric-cyan);
    color: var(--deep-navy);
    transform: translateY(-1px);
}
```

### Button Usage Rules

| Button Type | Use Case | Frequency Per Page |
|-------------|----------|-------------------|
| **Primary** | Main conversion action | 1-2 max |
| **Secondary** | Supporting actions | 2-3 max |
| **Tertiary** | Text links | Unlimited |

**Examples:**
- **Primary:** "Book Free Consultation", "Calculate Your ROI"
- **Secondary:** "See 14-Day Process", "View All Stories"
- **Tertiary:** "Learn more", "Read full story"

---

## 🃏 CARD SYSTEM

### Glass Morphism Card

```css
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
    transform: translateY(-10px);
    border-color: var(--electric-cyan);
    box-shadow: 0 0 40px rgba(0, 255, 240, 0.3);
}
```

### Pricing Card (Special Case)

```css
.pricing-card {
    background: var(--gradient-card);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 48px 40px;
    transition: all 0.4s ease;
}

.pricing-card.featured {
    border-color: var(--electric-cyan);
    box-shadow: 0 0 60px rgba(0, 255, 240, 0.4);
    transform: scale(1.05);
}

.pricing-card:hover {
    border-color: var(--electric-cyan);
    transform: translateY(-8px);
}
```

### Case Study Card

```css
.case-study-card {
    background: var(--deep-navy);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 32px;
    transition: all 0.3s ease;
}

.case-study-card:hover {
    border-color: rgba(0, 255, 240, 0.3);
    box-shadow: 0 8px 32px rgba(0, 255, 240, 0.2);
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

### Breakpoint Strategy

```css
/* Mobile First Approach */

/* Base: Mobile (320px - 767px) */
/* Default styles */

/* Tablet: 768px - 1023px */
@media (min-width: 768px) {
    /* Tablet layouts */
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
    /* Desktop layouts */
}

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) {
    /* Wide screen optimizations */
}
```

### Responsive Grid Patterns

```css
/* 2-Column Grid (Mobile → Desktop) */
.grid-2 {
    display: grid;
    grid-template-columns: 1fr;  /* Mobile: 1 column */
    gap: 24px;
}

@media (min-width: 768px) {
    .grid-2 {
        grid-template-columns: 1fr 1fr;  /* Tablet+: 2 columns */
        gap: 40px;
    }
}

/* 3-Column Grid (Pricing Tiers) */
.grid-3 {
    display: grid;
    grid-template-columns: 1fr;  /* Mobile: 1 column */
    gap: 24px;
}

@media (min-width: 768px) {
    .grid-3 {
        grid-template-columns: repeat(2, 1fr);  /* Tablet: 2 columns */
    }
}

@media (min-width: 1024px) {
    .grid-3 {
        grid-template-columns: repeat(3, 1fr);  /* Desktop: 3 columns */
        gap: 40px;
    }
}
```

---

## ⚡ ANIMATION SYSTEM

### Animation Timing

```css
--transition-fast: 200ms ease;      /* Hover effects */
--transition-medium: 300ms ease;    /* UI state changes */
--transition-slow: 400ms ease;      /* Large transformations */

/* Cubic-bezier for premium feel */
--easing-premium: cubic-bezier(0.4, 0, 0.2, 1);
```

### Standard Hover Effects

```css
/* Button Hover */
.btn:hover {
    transform: translateY(-2px);
    transition: all 0.3s var(--easing-premium);
}

/* Card Hover */
.card:hover {
    transform: translateY(-10px);
    transition: all 0.4s var(--easing-premium);
}

/* Link Hover */
a:hover {
    color: var(--electric-cyan);
    text-shadow: 0 0 15px rgba(0, 255, 240, 0.8);
    transition: all 0.25s ease;
}
```

### Number Counter Animation

```javascript
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}
```

### Scroll-Triggered Animations

```javascript
// Intersection Observer for fade-in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});
```

---

## 🖼️ IMAGERY GUIDELINES

### Current State
- Using Font Awesome icons as placeholders
- No real photography yet
- Partner logos using icon placeholders

### When Real Images Are Added

#### Photography Style
- **Authentic workplace candids** (not stock photos)
- **Dubai office setting** (shows local presence)
- **Diverse, professional team** (matches UAE market)
- **Natural lighting** (warm, inviting)
- **Modern tech environment** (glass, plants, monitors)

#### Image Specifications
```
Hero Background:     1920x800px, WebP format, <200KB
Team Photos:         1600x900px, WebP format, <150KB
Case Study Images:   1200x600px, WebP format, <100KB
Partner Logos:       200x200px, SVG preferred
Profile Photos:      400x400px, WebP format, <50KB
```

#### Image Optimization Rules
1. Convert to WebP format (50-80% smaller than JPEG)
2. Provide 2x retina versions for high-DPI screens
3. Lazy load images below the fold
4. Use `srcset` for responsive images
5. Always include descriptive `alt` text

---

## ♿ ACCESSIBILITY STANDARDS

### WCAG 2.1 Level AA Compliance

#### Color Contrast
- **Normal text (16px):** Minimum 4.5:1 contrast ratio
- **Large text (24px+):** Minimum 3:1 contrast ratio
- **UI components:** Minimum 3:1 contrast ratio

#### Keyboard Navigation
```html
<!-- Skip to content link (hidden until focused) -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Focus indicators on all interactive elements -->
<style>
:focus {
    outline: 3px solid var(--electric-cyan);
    outline-offset: 2px;
}
</style>
```

#### ARIA Labels
```html
<!-- Button with icon needs aria-label -->
<button aria-label="Open ROI Calculator" data-calculator-trigger>
    <i class="fas fa-calculator" aria-hidden="true"></i>
</button>

<!-- Form inputs need labels -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required>

<!-- Dynamic content needs aria-live -->
<div aria-live="polite" aria-atomic="true">
    <!-- Calculator results appear here -->
</div>
```

#### Semantic HTML
```html
<!-- Use proper heading hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Use semantic elements -->
<header>Navigation</header>
<main id="main-content">Content</main>
<aside>Sidebar</aside>
<footer>Footer</footer>

<!-- Use proper list markup -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>
```

---

## 📝 CONTENT STYLE GUIDE

### Voice & Tone

**Voice (Consistent):**
- Confident but not arrogant
- Technical but accessible
- Results-driven, specific
- Direct, no jargon

**Tone (Context-Dependent):**
- **Homepage:** Bold, compelling, urgent
- **Pricing:** Transparent, straightforward
- **About:** Professional, credible
- **Success Stories:** Authentic, specific
- **Appointment:** Helpful, reassuring

### Writing Rules

1. **Be specific:** "14 days" not "fast", "150% ROI" not "high return"
2. **Use active voice:** "We deploy" not "Deployment is done"
3. **Avoid jargon:** "Smart automation" not "Intelligent process orchestration"
4. **Short paragraphs:** 2-3 sentences maximum
5. **Scannable:** Use headings, bullets, bold text

### CTA Copy Standards

❌ **Generic CTAs (Avoid):**
- "Click Here"
- "Learn More"
- "Contact Us"
- "Get Started"

✅ **Specific CTAs (Use):**
- "Calculate Your ROI in 60 Seconds"
- "Book Free Consultation"
- "See 14-Day Process"
- "Start Your Transformation"

### Number Formatting

```
✅ Correct:
- 14 days (lowercase, space)
- 150% ROI (no space between number and %)
- AED 25,000 (space, comma)
- 6-12 months (hyphen, no spaces)

❌ Incorrect:
- 14 Days (capitalized)
- 150 % ROI (space before %)
- AED25,000 (no space)
- 6 - 12 months (spaces around hyphen)
```

---

## 🧩 COMPONENT EXAMPLES

### Trust Badge Component

```html
<div class="trust-badge">
    <div class="trust-number" data-count="14">0</div>
    <div class="trust-label">Days Avg Deployment</div>
</div>
```

```css
.trust-badge {
    text-align: center;
    padding: 24px;
}

.trust-number {
    font-size: 3.5rem;
    font-weight: 900;
    color: var(--electric-cyan);
    line-height: 1;
    margin-bottom: 8px;
}

.trust-label {
    font-size: 0.875rem;
    color: var(--slate-gray);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
```

### Timeline Comparison

```html
<div class="timeline-comparison">
    <div class="timeline-bar timeline-sgc">
        <div class="timeline-label">SGC TECH AI</div>
        <div class="timeline-fill" data-width="5%">
            <span>14 Days</span>
        </div>
    </div>
    <div class="timeline-bar timeline-traditional">
        <div class="timeline-label">Traditional Consultants</div>
        <div class="timeline-fill" data-width="100%">
            <span>6-12 Months</span>
        </div>
    </div>
</div>
```

```css
.timeline-bar {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50px;
    height: 60px;
    margin-bottom: 24px;
    position: relative;
}

.timeline-fill {
    background: var(--gradient-accent);
    height: 100%;
    border-radius: 50px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-sgc .timeline-fill {
    box-shadow: 0 0 30px rgba(0, 255, 240, 0.6);
}
```

### ROI Calculator Form

```html
<form id="roiCalculatorForm">
    <div class="form-group">
        <label for="employees">Number of Employees</label>
        <input type="number" id="employees" name="employees" 
               min="1" max="1000" value="25" required>
    </div>
    
    <div class="form-group">
        <label for="currentCosts">Current Software Costs (AED/month)</label>
        <input type="number" id="currentCosts" name="currentCosts" 
               min="0" max="1000000" value="5000" step="100" required>
    </div>
    
    <div class="form-group">
        <label for="industry">Industry</label>
        <select id="industry" name="industry" required>
            <option value="">Select your industry</option>
            <option value="real-estate">Real Estate</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="retail">Retail & E-commerce</option>
            <option value="services">Professional Services</option>
        </select>
    </div>
    
    <button type="submit" class="btn-primary">Calculate My ROI</button>
</form>
```

---

## 🔍 SEO TEMPLATE

### Page Title Format
```
Primary Keyword - SGC TECH AI | Secondary Keyword
```

**Examples:**
- "14-Day ERP Implementation - SGC TECH AI | Guaranteed ROI"
- "Pricing - SGC TECH AI | Transparent Pricing, Guaranteed ROI"
- "Success Stories - SGC TECH AI | Real Results from UAE Businesses"

### Meta Description Format (150-160 characters)
```
[Benefit] in [Timeframe]. [Social Proof]. [CTA].
```

**Examples:**
- "Deploy intelligent infrastructure in 14 days with 150% ROI guarantee. 50+ UAE implementations, 98% retention. Book free consultation."
- "Transparent ERP pricing from AED 15,000. 14-day deployment, money-back guarantee. Starter, Business, and Enterprise tiers available."

### Schema Markup (LocalBusiness)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SGC TECH AI",
  "image": "https://sgctech.ai/img/scholarix-logo.png",
  "description": "AI-native ERP implementation partner with 14-day deployment and guaranteed ROI",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "telephone": "+971563905772",
  "email": "hello@sgctech.ai",
  "priceRange": "AED 15,000 - 150,000",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50"
  }
}
```

---

## 🚀 IMPLEMENTATION CHECKLIST

When adding a new page or component:

### Design Checklist
- [ ] Uses Deep Ocean color palette
- [ ] Typography follows Inter font system
- [ ] Spacing uses defined CSS variables
- [ ] Buttons follow primary/secondary hierarchy
- [ ] Cards use glass morphism or appropriate style
- [ ] Animations are subtle, not distracting

### Technical Checklist
- [ ] HTML is semantic (proper heading hierarchy)
- [ ] CSS is mobile-first responsive
- [ ] JavaScript has fallbacks (progressive enhancement)
- [ ] Forms have proper labels and validation
- [ ] Images have alt text
- [ ] Links have descriptive text (not "click here")

### Accessibility Checklist
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] ARIA labels where needed
- [ ] Skip-to-content link present
- [ ] No flashing animations (seizure risk)

### SEO Checklist
- [ ] Unique page title (60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Open Graph tags (social sharing)
- [ ] Structured data (Schema.org)
- [ ] Internal links to related pages
- [ ] URL is descriptive (not generic)

### Content Checklist
- [ ] Voice & tone match brand guidelines
- [ ] CTAs are specific, not generic
- [ ] Numbers are formatted consistently
- [ ] No jargon without explanation
- [ ] Paragraphs are 2-3 sentences
- [ ] Headings are descriptive

---

## 📚 ADDITIONAL RESOURCES

### Design Tools
- **Figma:** (Future design mockups)
- **ColorContrast Checker:** https://webaim.org/resources/contrastchecker/
- **Google Fonts:** https://fonts.google.com/specimen/Inter

### Code References
- **CSS Architecture:** `/css/styles.css` (base system)
- **Premium Effects:** `/css/premium-design.css`
- **Animations:** `/css/animations.css`
- **JavaScript:** `/js/main.js` (core functionality)

### Documentation
- **COMPREHENSIVE_AUDIT_REPORT.md** - Quality audit (94.2% score)
- **CURRENT_DESIGN_ANALYSIS.md** - This analysis document
- **REDESIGN_2025_DOCUMENTATION.md** - Recent redesign details
- **IMAGE_GENERATION_STRATEGY.md** - Photography guidelines

---

## 🔄 VERSION HISTORY

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Dec 7, 2024 | Initial design system documentation | GitHub Copilot Agent |

---

**Maintained by:** SGC TECH AI Engineering Team  
**Last Updated:** December 7, 2024  
**Questions?** Contact hello@sgctech.ai

