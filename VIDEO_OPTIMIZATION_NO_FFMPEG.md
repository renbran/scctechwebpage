# Video Optimization Without FFmpeg - Quick Guide

## 🎯 Goal
Compress `sgc-logo-reveal-v2.mp4` from **4.2 MB → ~2 MB** for better website performance

---

## ✅ OPTION 1: Online Video Compressor Tools (Easiest)

### **1. Clideo.com** (Recommended) ⭐
**URL:** https://clideo.com/compress-video

**Steps:**
1. Visit https://clideo.com/compress-video
2. Click "Choose file" → Select `D:\SGC_TECH_AI_Website_Mockup\videos\sgc-logo-reveal-v2.mp4`
3. Wait for upload (4.2 MB = ~30 seconds)
4. Compression happens automatically
5. Click "Download" → Save as `sgc-logo-reveal-v2-optimized.mp4`

**Expected Result:**
- 4.2 MB → 2.0-2.5 MB (50-60% reduction)
- Quality: High (minimal visible difference)
- Time: 2-3 minutes total

---

### **2. CloudConvert.com** (Advanced Options)
**URL:** https://cloudconvert.com/mp4-converter

**Steps:**
1. Visit https://cloudconvert.com/mp4-converter
2. Upload `sgc-logo-reveal-v2.mp4`
3. Click settings icon (⚙️) → Choose:
   - Video Codec: **H.264**
   - Resolution: **1280x720** (downscale from 1920x1080)
   - Quality: **High**
   - CRF: **26** (lower = better quality, higher = smaller file)
4. Click "Convert"
5. Download optimized file

**Pro:** More control over quality/size trade-off  
**Con:** Requires free account for multiple conversions

---

### **3. FreeConvert.com** (No Sign-Up)
**URL:** https://www.freeconvert.com/video-compressor

**Steps:**
1. Visit https://www.freeconvert.com/video-compressor
2. Upload `sgc-logo-reveal-v2.mp4`
3. Set target size: **2 MB**
4. Click "Compress Now"
5. Download result

**Pro:** Simple, no account needed  
**Con:** Less control over quality settings

---

## ✅ OPTION 2: VLC Media Player (Free Desktop App)

**Download:** https://www.videolan.org/vlc/ (if not installed)

**Steps:**
1. Open VLC Media Player
2. **Media → Convert/Save** (or Ctrl+R)
3. Click "Add" → Select `sgc-logo-reveal-v2.mp4`
4. Click "Convert/Save" button at bottom
5. In Profile dropdown, select: **Video - H.264 + MP3 (MP4)**
6. Click wrench icon (⚙️) to edit profile:
   - **Video Codec Tab:**
     - Bitrate: **1500 kb/s** (lower = smaller file)
     - Frame Rate: Keep original
     - Scale: **1280x720**
   - **Audio Codec Tab:**
     - Bitrate: **96 kb/s**
     - Sample Rate: **44100 Hz**
7. Save profile, choose destination filename: `sgc-logo-reveal-v2-optimized.mp4`
8. Click "Start"

**Expected Time:** 1-2 minutes  
**Expected Size:** 2.0-2.5 MB

---

## ✅ OPTION 3: HandBrake (Best Quality Control)

**Download:** https://handbrake.fr/

**Steps:**
1. Install and open HandBrake
2. Click "Open Source" → Select `sgc-logo-reveal-v2.mp4`
3. Preset: Choose **"Web → Gmail Medium 5 Minutes 720p30"**
4. **Video Tab:**
   - Video Codec: **H.264**
   - Framerate: Same as source
   - Constant Quality: **RF 26** (18=highest, 28=smaller)
5. **Dimensions Tab:**
   - Resolution: **1280x720**
6. Click "Start Encode"
7. Save as `sgc-logo-reveal-v2-optimized.mp4`

**Pro:** Professional tool, best quality/size balance  
**Con:** 100+ MB download, learning curve

---

## 📋 AFTER OPTIMIZATION: Update Website Files

### **Step 1: Save Optimized Video**
Save the compressed file to:
```
D:\SGC_TECH_AI_Website_Mockup\videos\sgc-logo-reveal-v2-optimized.mp4
```

### **Step 2: Update index.html (2 locations)**

**Location 1: Hero Section (Line ~281)**
```html
<!-- OLD -->
<source src="videos/sgc-logo-reveal-v2.mp4" type="video/mp4">

<!-- NEW -->
<source src="videos/sgc-logo-reveal-v2-optimized.mp4" type="video/mp4">
```

**Location 2: Modal (Line ~1534)**
```html
<!-- OLD -->
<source src="videos/sgc-logo-reveal-v2.mp4" type="video/mp4">

<!-- NEW -->
<source src="videos/sgc-logo-reveal-v2-optimized.mp4" type="video/mp4">
```

### **Step 3: Test Locally**
```bash
cd D:/SGC_TECH_AI_Website_Mockup
python -m http.server 8000
```
Visit `http://localhost:8000` and verify:
- ✅ Video plays smoothly in hero
- ✅ No quality degradation
- ✅ Page loads faster

---

## 🎯 TARGET SPECIFICATIONS

### Optimized Video Should Have:
- **File Size:** 1.8 - 2.5 MB (from 4.2 MB)
- **Resolution:** 1280x720 (from 1920x1080 if higher)
- **Codec:** H.264 (MP4)
- **Bitrate:** ~1500 kbps video, 96 kbps audio
- **Frame Rate:** Same as original (24/30/60 fps)
- **Duration:** Same as original (no trimming)

### Why These Settings:
- **1280x720:** Perfect for web, rarely need full HD on hero
- **H.264:** Universal browser support
- **Low audio bitrate:** Video is muted anyway (autoplay requirement)
- **50% reduction:** Sweet spot for size vs. quality

---

## 🚀 QUICK COMPARISON

| Method | Time | Quality Control | Cost | Best For |
|--------|------|-----------------|------|----------|
| **Clideo** ⭐ | 2 min | Low | Free | Quick, no install |
| **CloudConvert** | 3 min | High | Free* | Custom settings |
| **FreeConvert** | 2 min | Medium | Free | Simple, fast |
| **VLC** | 2 min | Medium | Free | Already have VLC |
| **HandBrake** | 5 min | Highest | Free | Best quality |

*CloudConvert free tier: 25 conversions/day

---

## ⚡ FASTEST METHOD (2 Minutes)

1. Go to: **https://clideo.com/compress-video**
2. Upload `sgc-logo-reveal-v2.mp4`
3. Wait for auto-compression
4. Download result → Rename to `sgc-logo-reveal-v2-optimized.mp4`
5. Move to `/videos/` folder
6. Update 2 lines in `index.html` (change paths)
7. Test locally → Deploy

**Done!** 🎉

---

## 📊 BEFORE/AFTER COMPARISON

### Original:
- **File:** sgc-logo-reveal-v2.mp4
- **Size:** 4.2 MB
- **Load Time (3G):** ~8-10 seconds
- **LCP Impact:** Delays page load

### Optimized:
- **File:** sgc-logo-reveal-v2-optimized.mp4
- **Size:** ~2.0 MB
- **Load Time (3G):** ~4-5 seconds
- **LCP Impact:** Minimal delay

**Result:** 50% faster load, same visual quality ✅

---

## 🔧 TROUBLESHOOTING

### Issue: Optimized video is blurry
**Solution:** Use lower compression (RF 24 instead of 26 in HandBrake)

### Issue: File still too large (>2.5 MB)
**Solution:** 
- Further reduce resolution to 960x540
- Use Clideo's "Strong compression" option
- Lower bitrate to 1200 kbps

### Issue: Video stutters/lag on mobile
**Solution:** 
- Ensure "fast start" flag (automatic with online tools)
- Check video codec is H.264 (not H.265/HEVC)

---

## ✅ NEXT STEPS

1. **Choose a tool** from above (recommend Clideo for speed)
2. **Compress video** → Get ~2 MB file
3. **Save** to `videos/sgc-logo-reveal-v2-optimized.mp4`
4. **Update** 2 paths in `index.html`
5. **Test** locally with `python -m http.server 8000`
6. **Deploy** to production

**Time Investment:** 5-10 minutes  
**Performance Gain:** 50% faster video load  
**ROI:** Improved user experience, lower bounce rate

---

**Need Help?** Open `index.html` and search for "sgc-logo-reveal-v2.mp4" to find the exact lines to update.
