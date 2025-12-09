#!/bin/bash

# SGC TECH AI - Video Optimization Script
# Compresses logo reveal videos for web performance

cd "$(dirname "$0")"

echo "=========================================="
echo "SGC TECH AI - Video Optimization Script"
echo "=========================================="
echo ""

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ERROR: FFmpeg is not installed!"
    echo ""
    echo "Install FFmpeg:"
    echo "  Windows: https://ffmpeg.org/download.html"
    echo "  Mac: brew install ffmpeg"
    echo "  Linux: sudo apt install ffmpeg"
    echo ""
    exit 1
fi

echo "✅ FFmpeg found: $(ffmpeg -version | head -n1)"
echo ""

# Create optimized directory
mkdir -p videos/optimized

echo "🎬 OPTIMIZING VIDEOS..."
echo ""

# Optimize Version 1 (3.5 MB)
if [ -f "videos/sgc-logo-reveal-v1.mp4" ]; then
    echo "📹 Processing sgc-logo-reveal-v1.mp4..."
    ffmpeg -i videos/sgc-logo-reveal-v1.mp4 \
      -vcodec libx264 \
      -crf 26 \
      -preset slow \
      -vf "scale=1280:720" \
      -movflags +faststart \
      -acodec aac \
      -b:a 96k \
      -y \
      videos/optimized/sgc-logo-reveal-v1-optimized.mp4 \
      2>&1 | grep -E "frame=|size=|time=" | tail -3
    
    echo "✅ Version 1 optimized!"
    echo ""
else
    echo "⚠️  sgc-logo-reveal-v1.mp4 not found, skipping..."
    echo ""
fi

# Optimize Version 2 (4.2 MB) - PRIMARY
if [ -f "videos/sgc-logo-reveal-v2.mp4" ]; then
    echo "📹 Processing sgc-logo-reveal-v2.mp4 (PRIMARY)..."
    ffmpeg -i videos/sgc-logo-reveal-v2.mp4 \
      -vcodec libx264 \
      -crf 26 \
      -preset slow \
      -vf "scale=1280:720" \
      -movflags +faststart \
      -acodec aac \
      -b:a 96k \
      -y \
      videos/optimized/sgc-logo-reveal-v2-optimized.mp4 \
      2>&1 | grep -E "frame=|size=|time=" | tail -3
    
    echo "✅ Version 2 optimized!"
    echo ""
else
    echo "⚠️  sgc-logo-reveal-v2.mp4 not found, skipping..."
    echo ""
fi

echo "=========================================="
echo "📊 OPTIMIZATION RESULTS"
echo "=========================================="
echo ""

# Compare file sizes
echo "📁 Original Files:"
ls -lh videos/sgc-logo-reveal-*.mp4 2>/dev/null | awk '{print "  "$9" - "$5}'
echo ""

echo "📁 Optimized Files:"
ls -lh videos/optimized/*.mp4 2>/dev/null | awk '{print "  "$9" - "$5}'
echo ""

# Calculate savings
ORIGINAL_SIZE=$(du -sb videos/sgc-logo-reveal-*.mp4 2>/dev/null | awk '{sum+=$1} END {print sum}')
OPTIMIZED_SIZE=$(du -sb videos/optimized/*.mp4 2>/dev/null | awk '{sum+=$1} END {print sum}')

if [ -n "$ORIGINAL_SIZE" ] && [ -n "$OPTIMIZED_SIZE" ]; then
    SAVINGS=$((ORIGINAL_SIZE - OPTIMIZED_SIZE))
    PERCENT=$((SAVINGS * 100 / ORIGINAL_SIZE))
    
    echo "💾 Space Saved: $(numfmt --to=iec $SAVINGS) ($PERCENT% reduction)"
    echo ""
fi

echo "=========================================="
echo "🚀 NEXT STEPS"
echo "=========================================="
echo ""
echo "1. Review optimized videos in videos/optimized/"
echo "2. Compare quality side-by-side with originals"
echo "3. If satisfied, update index.html:"
echo "   - Line 281: src=\"videos/optimized/sgc-logo-reveal-v2-optimized.mp4\""
echo "   - Line 1534: src=\"videos/optimized/sgc-logo-reveal-v2-optimized.mp4\""
echo "4. Test on local server and mobile devices"
echo "5. Deploy to production"
echo ""
echo "✅ OPTIMIZATION COMPLETE!"
echo ""
