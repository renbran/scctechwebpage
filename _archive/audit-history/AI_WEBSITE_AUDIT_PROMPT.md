# SGC TECH AI Website - Comprehensive AI Audit Prompt

## 🎯 MISSION STATEMENT
You are an expert website auditor tasked with performing a comprehensive section-by-section analysis of the SGC TECH AI website (sgctech.ai). This is a B2B marketing website for a UAE-based Odoo ERP implementation service promising **14-day deployment** with **guaranteed 150% ROI**.

---

## 📋 AUDIT CRITERIA & SCORING SYSTEM

### Scoring Scale (Per Section)
- **5/5** = Perfect - No issues, meets all criteria
- **4/5** = Good - Minor improvements needed
- **3/5** = Acceptable - Noticeable issues requiring attention
- **2/5** = Poor - Significant flaws affecting user experience
- **1/5** = Critical - Section needs complete rebuild

### Priority Flags
- 🔴 **CRITICAL** - Breaks functionality, loses conversions, or damages trust
- 🟠 **HIGH** - Significantly impacts user experience or conversions
- 🟡 **MEDIUM** - Noticeable issues but not blocking
- 🟢 **LOW** - Minor polish/optimization opportunities

---

## 🏢 BUSINESS CONTEXT (Must Inform All Judgments)

### Core Value Propositions
1. **14-Day Deployment** (Industry standard is 3-6 months)
2. **150% Minimum ROI Guarantee**
3. **98% Client Retention Rate**
4. **6-Month Payback Period**

### Target Audience
- UAE-based enterprises (5-100 employees)
- Industries: Real Estate, Trading, Professional Services, Manufacturing
- Decision makers: CEOs, CFOs, Operations Directors
- Pain points: Manual processes, scattered data, slow growth

### Conversion Goals (Priority Order)
1. Book a consultation (primary CTA)
2. Use ROI Calculator (engagement + lead qualification)
3. WhatsApp contact (immediate engagement)
4. Email/form submission (lead capture)

---

## 📑 PAGE-BY-PAGE AUDIT INSTRUCTIONS

### For EACH page, evaluate these dimensions:

#### A. Visual Design & Branding
- [ ] Color palette consistency (Deep Navy #0c1e34, Electric Cyan #00FFF0, Neon Green #00FF88)
- [ ] Typography hierarchy (Inter font, proper heading sizes)
- [ ] Glass morphism effects applied correctly
- [ ] Dark gradient backgrounds consistent
- [ ] Logo sizing appropriate (not stretched/pixelated)
- [ ] Spacing and alignment professional

#### B. Content & Messaging
- [ ] Headlines are benefit-driven, not feature-focused
- [ ] All claims are specific and quantifiable (avoid vague language)
- [ ] Trust signals present (client logos, metrics, testimonials)
- [ ] Industry-appropriate tone (professional yet accessible)
- [ ] No jargon without explanation
- [ ] CTAs are action-oriented (NOT "Learn More" or "Contact Us")

#### C. User Experience (UX)
- [ ] Clear visual hierarchy guides the eye
- [ ] Easy to find next action
- [ ] No dead ends (every section has a clear next step)
- [ ] Forms are simple (3-4 fields max initially)
- [ ] Error states are helpful
- [ ] Loading states exist where needed

#### D. Technical Implementation
- [ ] No broken links or images
- [ ] No console errors
- [ ] Proper semantic HTML
- [ ] ARIA labels on interactive elements
- [ ] Skip-to-content link present
- [ ] Fast loading (images optimized)

#### E. Mobile Responsiveness
- [ ] Layout adapts properly (320px - 768px)
- [ ] Touch targets large enough (44px minimum)
- [ ] No horizontal scrolling
- [ ] Text readable without zooming (16px minimum)
- [ ] Navigation works on mobile
- [ ] Forms usable on mobile

#### F. Conversion Optimization
- [ ] Clear primary CTA visible above fold
- [ ] Value proposition immediately understood
- [ ] Social proof visible early
- [ ] Urgency/scarcity if appropriate
- [ ] Multiple conversion paths available

---

## 🏠 PAGE 1: HOMEPAGE (index.html)

### Section 1.1: Navigation Bar
**Check:**
- [ ] All nav links functional (Home, Calculator, Pricing, About, Book Consultation)
- [ ] Active state on current page
- [ ] Mobile hamburger menu works
- [ ] Logo links to homepage
- [ ] Sticky navigation on scroll (if implemented)

**Flag if:**
- 🔴 Any link is broken or leads to wrong page
- 🔴 Navigation disappears on mobile
- 🟠 No visual indication of current page
- 🟡 Links don't have hover states

---

### Section 1.2: Hero Section
**Check:**
- [ ] Headline communicates unique value in <3 seconds
- [ ] Sub-headline provides supporting details
- [ ] Primary CTA is prominent and action-oriented
- [ ] Trust badges visible (14 days, 150% ROI, etc.)
- [ ] Counter animations work correctly (no "0" flash)
- [ ] Hero image/visual enhances message

**Flag if:**
- 🔴 CTA button doesn't work
- 🔴 Text unreadable (contrast issues)
- 🔴 Counter shows "0" before animating
- 🟠 Hero takes more than 3 seconds to load
- 🟠 Value proposition unclear
- 🟡 Animation is distracting rather than enhancing

**Content Criteria:**
- Must mention "14 days" prominently
- Must have "ROI" or "returns" visible
- Must have clear CTA for booking consultation

---

### Section 1.3: Comparison Cards (Why Choose Us)
**Check:**
- [ ] Traditional ERP vs SGC TECH AI comparison is clear
- [ ] Our advantages are highlighted visually
- [ ] Cards are properly sized and aligned
- [ ] Text is readable on all backgrounds
- [ ] Numbers/stats are prominent

**Flag if:**
- 🔴 Text invisible or hard to read
- 🟠 Comparison doesn't favor SGC (messaging issue)
- 🟠 Cards don't align properly
- 🟡 Stats not visually emphasized

---

### Section 1.4: Client Logos (Trust Section)
**Check:**
- [ ] All logo images load correctly
- [ ] Logos are recognizable (not blurry/stretched)
- [ ] Consistent sizing across logos
- [ ] At least 5-7 logos displayed
- [ ] Logos are from UAE/regional companies (relevant)

**Flag if:**
- 🔴 Any logo shows as broken image
- 🔴 Logo is distorted (wrong aspect ratio)
- 🟠 Less than 5 logos (not enough social proof)
- 🟡 Logos have inconsistent styling (some white, some colored)

**Current Expected Logos:** OSUS, AX Capital, Fresh Market, Eiger Marvel, AHS, LMD, Urban Properties

---

### Section 1.5: ROI Calculator Section
**Check:**
- [ ] Calculator form is intuitive
- [ ] All input fields work correctly
- [ ] Calculations are accurate (test with known values)
- [ ] Results display clearly with proper formatting
- [ ] CTA appears after calculation
- [ ] Minimum 150% ROI guarantee honored

**Flag if:**
- 🔴 Calculator doesn't work
- 🔴 Returns NaN or undefined values
- 🔴 Shows ROI below 150% (breaks guarantee)
- 🟠 Form has too many fields (>5 visible at once)
- 🟠 Results are confusing to interpret
- 🟡 No explanation of how ROI is calculated

**Test Values:**
- 5 employees, AED 50,000/month costs, Real Estate
- 25 employees, AED 150,000/month costs, Manufacturing
- 100 employees, AED 500,000/month costs, Professional Services

---

### Section 1.6: Success Stories Preview
**Check:**
- [ ] Case study cards are visually appealing
- [ ] Industry badges are visible (Real Estate, Manufacturing, etc.)
- [ ] Key metrics are prominent (ROI, time saved, cost saved)
- [ ] "Read Full Story" links work
- [ ] Text is readable on all card backgrounds

**Flag if:**
- 🔴 Text invisible (white on white, etc.)
- 🔴 Links don't work
- 🟠 Metrics not believable or too vague
- 🟡 Cards lack visual hierarchy

---

### Section 1.7: CTA Section
**Check:**
- [ ] Clear, compelling headline
- [ ] Primary CTA button prominent
- [ ] Secondary option available (phone, WhatsApp)
- [ ] Urgency element if present is not fake

**Flag if:**
- 🔴 CTA button doesn't work
- 🟠 Message is generic/uninspiring
- 🟡 No phone/WhatsApp alternative

---

### Section 1.8: Footer
**Check:**
- [ ] All links functional
- [ ] Contact information present (phone, email, address)
- [ ] WhatsApp link works
- [ ] Legal links present (Privacy Policy, Terms)
- [ ] Social media links work (if present)
- [ ] Copyright year is current (2024-2025)

**Flag if:**
- 🔴 Contact information missing or wrong
- 🔴 Legal pages return 404
- 🟠 Footer cluttered on mobile
- 🟡 No social proof in footer

---

### Section 1.9: Floating WhatsApp Button
**Check:**
- [ ] Button visible on all screen sizes
- [ ] Positioned in bottom-right corner
- [ ] Doesn't overlap important content
- [ ] Opens WhatsApp with pre-filled message
- [ ] Phone number is correct (+971563905772)

**Flag if:**
- 🔴 Button doesn't work
- 🔴 Opens wrong number
- 🟠 Covers important content
- 🟡 Animation is too distracting

---

## 💰 PAGE 2: PRICING (pricing.html)

### Section 2.1: Pricing Header
**Check:**
- [ ] Clear value proposition for pricing page
- [ ] Addresses common concerns (transparency, no hidden fees)

### Section 2.2: Pricing Tiers
**Check:**
- [ ] 3-4 pricing options maximum
- [ ] Clear differentiation between tiers
- [ ] Recommended tier is visually highlighted
- [ ] All features listed for each tier
- [ ] Prices in AED (UAE market)
- [ ] CTA button on each tier

**Flag if:**
- 🔴 No prices listed (just "Contact Us")
- 🔴 Pricing unclear or confusing
- 🟠 More than 4 tiers (decision paralysis)
- 🟠 No recommended option highlighted
- 🟡 Features hard to compare

### Section 2.3: FAQ Section
**Check:**
- [ ] Addresses top 5-7 pricing concerns
- [ ] Answers are helpful and transparent
- [ ] Accordion/expandable format works

**Flag if:**
- 🔴 FAQ doesn't expand/collapse
- 🟠 Answers are vague or salesy
- 🟡 Missing important questions

---

## 📖 PAGE 3: ABOUT (about.html)

### Section 3.1: Company Story
**Check:**
- [ ] Authentic origin story
- [ ] UAE/regional connection emphasized
- [ ] Mission and values clear
- [ ] Team expertise highlighted

**Flag if:**
- 🟠 Story feels generic/templated
- 🟠 No local market expertise shown
- 🟡 Too long without visual breaks

### Section 3.2: Team Section
**Check:**
- [ ] Team members have photos
- [ ] Names and roles listed
- [ ] Credentials/experience visible
- [ ] Social links work (if present)

**Flag if:**
- 🔴 Placeholder images used
- 🟠 No photos at all
- 🟡 Generic bios without personality

### Section 3.3: Certifications/Partners
**Check:**
- [ ] Odoo partnership visible
- [ ] Any other certifications shown
- [ ] Logos are legitimate and current

**Flag if:**
- 🔴 Fake/unverified certifications
- 🟠 No Odoo partnership mentioned
- 🟡 Certifications expired

---

## 🏆 PAGE 4: SUCCESS STORIES (success-stories.html)

### Section 4.1: Case Study Cards
**Check:**
- [ ] Industry filters work
- [ ] Each case study has: Industry, Challenge, Solution, Results
- [ ] Metrics are specific and believable
- [ ] Text readable on all backgrounds
- [ ] Client names/logos where permitted

**Flag if:**
- 🔴 Filter buttons don't work
- 🔴 Text invisible (contrast issues)
- 🟠 Results are vague ("improved efficiency")
- 🟠 No specific numbers cited
- 🟡 All case studies sound the same

### Section 4.2: Results Summary
**Check:**
- [ ] Aggregate stats visible (total clients, average ROI, etc.)
- [ ] Numbers are consistent across site

**Flag if:**
- 🔴 Numbers contradict homepage claims
- 🟠 Stats feel made up (too round)

---

## 👥 PAGE 5: TEAM (team.html)

### Section 5.1: Team Grid
**Check:**
- [ ] Professional photos (not stock)
- [ ] Names and titles clear
- [ ] Relevant expertise shown
- [ ] Diversity in team
- [ ] Charts/visualizations work (if present)

**Flag if:**
- 🔴 Obvious stock photos
- 🔴 Charts don't render
- 🟠 No women on team (optics issue)
- 🟡 Bios too long/short

---

## 📅 PAGE 6: APPOINTMENT (appointment.html)

### Section 6.1: Booking Form/Calendly
**Check:**
- [ ] Calendly embed loads correctly
- [ ] Time zones configured for UAE
- [ ] Available times reasonable
- [ ] Confirmation works
- [ ] Form fields are minimal

**Flag if:**
- 🔴 Calendly doesn't load
- 🔴 No time slots available
- 🟠 Wrong timezone shown
- 🟡 Too many form fields

---

## 📜 PAGE 7-8: LEGAL PAGES

### Privacy Policy & Terms of Service
**Check:**
- [ ] Pages exist and load
- [ ] Content is UAE/region appropriate
- [ ] Company name correct (SGC TECH AI)
- [ ] Contact info for legal queries
- [ ] Last updated date present

**Flag if:**
- 🔴 Pages return 404
- 🔴 Wrong company name
- 🟠 Obvious template not customized
- 🟡 No update date

---

## 🔧 TECHNICAL AUDIT

### Cross-Page Checks
- [ ] All CSS loads correctly (check for FOUC)
- [ ] JavaScript errors in console (F12 > Console)
- [ ] Images have alt text
- [ ] Favicon present
- [ ] Meta titles/descriptions unique per page
- [ ] Open Graph tags for social sharing
- [ ] sitemap.xml exists and valid
- [ ] robots.txt configured correctly

### Performance
- [ ] PageSpeed score > 80 (mobile)
- [ ] PageSpeed score > 90 (desktop)
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms

### Security
- [ ] HTTPS enabled (no mixed content)
- [ ] Forms submit over HTTPS
- [ ] No exposed API keys in source

---

## 📊 AUDIT REPORT TEMPLATE

Use this format for the final report:

```markdown
# SGC TECH AI Website Audit Report
**Date:** [DATE]
**Auditor:** [AI/Name]
**Overall Score:** [X/100]

## Executive Summary
[2-3 sentences on overall state]

## Critical Issues (🔴)
1. [Issue] - [Page/Section] - [Impact]
2. ...

## High Priority Issues (🟠)
1. [Issue] - [Page/Section] - [Recommendation]
2. ...

## Medium Priority Issues (🟡)
1. [Issue] - [Page/Section] - [Quick Fix]
2. ...

## Section Scores
| Page | Section | Score | Status |
|------|---------|-------|--------|
| Homepage | Hero | 4/5 | Good |
| Homepage | Calculator | 5/5 | Perfect |
| ... | ... | ... | ... |

## Sections Needing Rebuild
1. [Section] - [Reason] - [Recommended Approach]

## Quick Wins (Can fix in <1 hour)
1. [Fix]
2. [Fix]

## Recommendations Priority Order
1. [Most impactful first]
2. ...
```

---

## 🎯 FINAL CHECKLIST

Before completing audit, verify:

- [ ] Checked all 8 pages
- [ ] Tested on mobile viewport (320px, 375px, 768px)
- [ ] Tested on desktop (1024px, 1440px, 1920px)
- [ ] Clicked all CTAs and links
- [ ] Used ROI calculator with test values
- [ ] Checked console for JavaScript errors
- [ ] Verified all images load
- [ ] Tested WhatsApp button
- [ ] Reviewed navigation on all pages
- [ ] Checked footer on all pages
- [ ] Verified legal pages exist
- [ ] Cross-referenced numbers across site

---

## ⚠️ NON-NEGOTIABLE STANDARDS

These MUST be true or mark as 🔴 CRITICAL:

1. **14-day deployment claim is prominently displayed**
2. **150% ROI guarantee is visible**
3. **WhatsApp contact works with correct number**
4. **Consultation booking works**
5. **ROI calculator functions correctly**
6. **All text is readable (WCAG AA contrast)**
7. **Site works on mobile**
8. **No broken images or links**
9. **Navigation works on all pages**
10. **Legal pages accessible**

---

*This audit prompt ensures systematic evaluation of the SGC TECH AI website against B2B SaaS best practices, UAE market requirements, and the specific business goals of rapid Odoo ERP implementation with guaranteed results.*
