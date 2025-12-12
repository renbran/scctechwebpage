# External Astro Directory Reference

## 📍 Location

**Path:** `D:\sgc-tech-astro\`

**Status:** Separate experimental directory (NOT part of production website)

---

## 📂 Contents

The `sgc-tech-astro` directory contains:

- **Astro Framework Setup** - Actual Astro 4.x installation
- **Node Modules** - NPM dependencies (~274KB package-lock.json)
- **Source Files** - Experimental Astro components (`src/` directory)
- **Build Output** - Compiled files (`dist/` directory)
- **Logo Files** - Working copies of logo variations:
  - `Premium_SGC_TECH_logo_in_white_centered_on_a_tr-*.png` (211KB)
  - `SGC_TECH_logo_in_a_black_and_white_variation_feat-*.png` (228KB)
  - `sgc-tech-ai-logo-primary.png.png` (871KB - original)
- **Favicon Package** - `favicon.zip` (886KB)
- **Configuration** - `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`

---

## 🎯 Purpose

This directory was created for **experimental Astro framework implementation**, separate from the production static website.

**Why Separate?**
- Production site uses vanilla HTML/CSS/JS (stable, proven)
- Astro migration is a future experiment
- Keeps production clean and deployable
- Allows parallel development without risk

---

## 🔗 Relationship to Main Website

### **Production Website:**
- **Location:** `D:\SGC_TECH_AI_Website_Mockup\`
- **Technology:** Vanilla HTML/CSS/JavaScript
- **Status:** Production-ready, deployed
- **Deployment:** Cloudflare Pages (GitHub auto-deploy)

### **Astro Experiment:**
- **Location:** `D:\sgc-tech-astro\`
- **Technology:** Astro 4.x + React + Tailwind
- **Status:** Experimental, not deployed
- **Purpose:** Future migration testing

---

## ⚠️ Important Notes

### **Logo Files in Both Locations:**

The logo files exist in BOTH directories but serve different purposes:

**Production (`D:\SGC_TECH_AI_Website_Mockup\images\logos\`):**
- ✅ Organized with proper names
- ✅ Optimized for web use
- ✅ Used in production HTML pages

**Astro Experiment (`D:\sgc-tech-astro\`):**
- 🔬 Working copies for testing
- 🔬 Original files with long generated names
- 🔬 Not used in production

**Action:** The production website should ONLY reference files in its own `images/logos/` directory, NOT the external astro directory.

---

## 📦 What to Do with Astro Directory

### **Option 1: Keep Separate (Recommended)**
Keep `sgc-tech-astro` as a separate experimental environment:

```bash
# Current structure (GOOD):
D:\
├── SGC_TECH_AI_Website_Mockup\     # Production (vanilla)
└── sgc-tech-astro\                 # Experiment (Astro)
```

**Benefits:**
- Clean separation of concerns
- No risk to production
- Easy to compare approaches

---

### **Option 2: Archive Astro Experiment**

If you don't plan to use Astro soon, you can archive it:

```bash
# Move astro directory inside main project archive
cd /d/SGC_TECH_AI_Website_Mockup
mkdir -p _archive/astro-migration/experimental-implementation
mv /d/sgc-tech-astro/* _archive/astro-migration/experimental-implementation/

# Or compress and archive
cd /d
tar -czf sgc-tech-astro-backup.tar.gz sgc-tech-astro/
mv sgc-tech-astro-backup.tar.gz SGC_TECH_AI_Website_Mockup/_archive/astro-migration/
```

---

### **Option 3: Delete (Not Recommended)**

Only delete if you're certain Astro migration won't happen:

```bash
# DANGER: Permanent deletion
rm -rf /d/sgc-tech-astro/
```

**⚠️ WARNING:** Don't delete unless you've:
1. Extracted all needed logo files
2. Confirmed favicon package is saved elsewhere
3. Documented any useful Astro code patterns

---

## 🎨 Favicon Package

**Found:** `D:\sgc-tech-astro\favicon.zip` (886KB)

**Action Required:**
1. Extract this favicon package
2. Copy favicon files to: `D:\SGC_TECH_AI_Website_Mockup\images\logos\favicon\`
3. Update HTML pages with favicon meta tags

**Commands:**
```bash
cd /d/sgc-tech-astro
unzip favicon.zip -d /d/SGC_TECH_AI_Website_Mockup/images/logos/favicon/
```

---

## 📋 Recommended Actions

**Immediate (Next 10 minutes):**
1. ✅ Extract favicon.zip to production logos folder
2. ✅ Copy logo files if needed (already done)
3. ✅ Keep sgc-tech-astro separate for now

**Short-term (This week):**
1. Decide if Astro migration is still planned
2. If yes: Keep separate directory
3. If no: Archive or compress the directory

**Long-term (This month):**
1. Review Astro migration plan in archive
2. Make strategic decision: Proceed or abandon?
3. If abandoned: Delete astro directory after archiving

---

## 🔍 Quick Commands

**Check Astro Directory Size:**
```bash
du -sh /d/sgc-tech-astro
```

**List Logo Files in Both Locations:**
```bash
# Production
ls -lh /d/SGC_TECH_AI_Website_Mockup/images/logos/*/*.png

# Astro experiment
ls -lh /d/sgc-tech-astro/*.png
```

**Archive Astro Directory:**
```bash
cd /d
tar -czf sgc-tech-astro-$(date +%Y%m%d).tar.gz sgc-tech-astro/
mv sgc-tech-astro-*.tar.gz SGC_TECH_AI_Website_Mockup/_archive/astro-migration/
```

---

## 🎯 Current Recommendation

**KEEP** the `sgc-tech-astro` directory separate for now because:
1. ✅ Contains valuable favicon package
2. ✅ Has original logo files (backup)
3. ✅ Astro migration may be future requirement
4. ✅ Not causing any issues being separate
5. ✅ Disk space is not a concern (~2-3 MB)

**Extract favicon package first**, then decide later whether to:
- Keep as experimental environment
- Archive for long-term storage
- Delete if never needed

---

**Last Updated:** December 9, 2025  
**Status:** Separate experimental directory - no immediate action required
