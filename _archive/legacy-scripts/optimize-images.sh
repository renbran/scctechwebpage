#!/bin/bash

# =============================================================================
# IMAGE OPTIMIZATION SCRIPT
# SGC TECH AI - Compress and Optimize Images for Web
#
# This script optimizes all images for web use while maintaining quality.
# Requires: imagemagick, jpegoptim, pngquant, webp
#
# Usage: bash optimize-images.sh
# =============================================================================

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  SGC TECH AI Image Optimization${NC}"
echo -e "${BLUE}=======================================${NC}\n"

# =============================================================================
# CHECK DEPENDENCIES
# =============================================================================

check_dependency() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}✗ $1 not found${NC}"
        echo -e "${YELLOW}  Install with: $2${NC}"
        missing_deps=true
    else
        echo -e "${GREEN}✓ $1 found${NC}"
    fi
}

echo -e "${BLUE}Checking dependencies...${NC}\n"

missing_deps=false
check_dependency "convert" "sudo apt install imagemagick (or brew install imagemagick)"
check_dependency "jpegoptim" "sudo apt install jpegoptim (or brew install jpegoptim)"
check_dependency "pngquant" "sudo apt install pngquant (or brew install pngquant)"
check_dependency "cwebp" "sudo apt install webp (or brew install webp)"

if [ "$missing_deps" = true ]; then
    echo -e "\n${RED}Please install missing dependencies first.${NC}\n"
    exit 1
fi

echo -e "\n${GREEN}All dependencies found!${NC}\n"

# =============================================================================
# CONFIGURATION
# =============================================================================

# Quality settings
JPEG_QUALITY=85
PNG_QUALITY="65-80"
WEBP_QUALITY=80

# Size limits (in KB)
MAX_HERO_SIZE=500
MAX_SECTION_SIZE=300
MAX_PATTERN_SIZE=150

# Backup directory
BACKUP_DIR="images-original-backup"

# =============================================================================
# BACKUP ORIGINAL IMAGES
# =============================================================================

if [ ! -d "$BACKUP_DIR" ]; then
    echo -e "${BLUE}Creating backup of original images...${NC}"
    mkdir -p "$BACKUP_DIR"
    cp -r images/* "$BACKUP_DIR/" 2>/dev/null
    echo -e "${GREEN}✓ Backup created in $BACKUP_DIR/${NC}\n"
else
    echo -e "${YELLOW}Backup already exists, skipping...${NC}\n"
fi

cd images

# =============================================================================
# OPTIMIZE PNG FILES
# =============================================================================

echo -e "${BLUE}Optimizing PNG files...${NC}\n"

png_count=0
for img in *.png; do
    if [ -f "$img" ]; then
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        
        echo -e "${YELLOW}Processing:${NC} $img"
        
        # Optimize with pngquant
        pngquant --quality=$PNG_QUALITY --ext .png --force "$img" --skip-if-larger
        
        # Additional optimization with ImageMagick
        convert "$img" -strip -define png:compression-level=9 "$img"
        
        new_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        savings=$((original_size - new_size))
        percent=$((savings * 100 / original_size))
        
        echo -e "${GREEN}✓${NC} Reduced by ${GREEN}${percent}%${NC} (${savings} bytes)\n"
        
        ((png_count++))
    fi
done

echo -e "${GREEN}✓ Optimized $png_count PNG files${NC}\n"

# =============================================================================
# OPTIMIZE JPEG FILES
# =============================================================================

echo -e "${BLUE}Optimizing JPEG files...${NC}\n"

jpeg_count=0
for img in *.jpg *.jpeg; do
    if [ -f "$img" ]; then
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        
        echo -e "${YELLOW}Processing:${NC} $img"
        
        # Optimize with jpegoptim
        jpegoptim --max=$JPEG_QUALITY --strip-all --all-progressive "$img"
        
        new_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        savings=$((original_size - new_size))
        percent=$((savings * 100 / original_size))
        
        echo -e "${GREEN}✓${NC} Reduced by ${GREEN}${percent}%${NC} (${savings} bytes)\n"
        
        ((jpeg_count++))
    fi
done

echo -e "${GREEN}✓ Optimized $jpeg_count JPEG files${NC}\n"

# =============================================================================
# CREATE WEBP VERSIONS
# =============================================================================

echo -e "${BLUE}Creating WebP versions...${NC}\n"

webp_count=0
for img in *.png *.jpg *.jpeg; do
    if [ -f "$img" ]; then
        webp_name="${img%.*}.webp"
        
        echo -e "${YELLOW}Converting:${NC} $img → $webp_name"
        
        cwebp -q $WEBP_QUALITY "$img" -o "$webp_name"
        
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        webp_size=$(stat -f%z "$webp_name" 2>/dev/null || stat -c%s "$webp_name" 2>/dev/null)
        savings=$((original_size - webp_size))
        percent=$((savings * 100 / original_size))
        
        echo -e "${GREEN}✓${NC} WebP is ${GREEN}${percent}% smaller${NC}\n"
        
        ((webp_count++))
    fi
done

echo -e "${GREEN}✓ Created $webp_count WebP versions${NC}\n"

# =============================================================================
# CREATE RESPONSIVE VERSIONS
# =============================================================================

echo -e "${BLUE}Creating responsive image sizes...${NC}\n"

responsive_count=0

# Hero images (need multiple sizes)
for img in hero-*.{png,jpg,webp}; do
    if [ -f "$img" ]; then
        base="${img%.*}"
        ext="${img##*.}"
        
        echo -e "${YELLOW}Creating responsive sizes for:${NC} $img"
        
        # Large (1920px)
        convert "$img" -resize 1920x1080\> -strip "${base}-large.${ext}"
        echo -e "${GREEN}  ✓ Large (1920px)${NC}"
        
        # Medium (1024px)
        convert "$img" -resize 1024x576\> -strip "${base}-medium.${ext}"
        echo -e "${GREEN}  ✓ Medium (1024px)${NC}"
        
        # Small (640px)
        convert "$img" -resize 640x360\> -strip "${base}-small.${ext}"
        echo -e "${GREEN}  ✓ Small (640px)${NC}\n"
        
        ((responsive_count++))
    fi
done

echo -e "${GREEN}✓ Created responsive versions for $responsive_count images${NC}\n"

# =============================================================================
# FINAL REPORT
# =============================================================================

cd ..

total_images=$((png_count + jpeg_count))
total_webp=$webp_count

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Optimization Complete!${NC}"
echo -e "${BLUE}=======================================${NC}"
echo -e "${GREEN}✓ Optimized: $total_images images${NC}"
echo -e "${GREEN}✓ Created: $total_webp WebP versions${NC}"
echo -e "${GREEN}✓ Created: $responsive_count responsive sets${NC}"
echo -e "${GREEN}✓ Backup: $BACKUP_DIR/${NC}\n"

# =============================================================================
# SIZE ANALYSIS
# =============================================================================

echo -e "${BLUE}Analyzing final sizes...${NC}\n"

cd images

large_files=0
for img in *.{png,jpg,webp}; do
    if [ -f "$img" ]; then
        size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        size_kb=$((size / 1024))
        
        if [ $size_kb -gt 500 ]; then
            echo -e "${RED}⚠ Large file:${NC} $img (${size_kb}KB)"
            ((large_files++))
        fi
    fi
done

if [ $large_files -eq 0 ]; then
    echo -e "${GREEN}✓ All files are under 500KB${NC}\n"
else
    echo -e "${YELLOW}⚠ Found $large_files files over 500KB${NC}"
    echo -e "${YELLOW}  Consider further optimization${NC}\n"
fi

# =============================================================================
# NEXT STEPS
# =============================================================================

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Next Steps:${NC}"
echo -e "${BLUE}=======================================${NC}"
echo -e "1. Review optimized images in ${YELLOW}images/${NC}"
echo -e "2. Update HTML to use ${YELLOW}<picture>${NC} elements with WebP"
echo -e "3. Test image quality on actual devices"
echo -e "4. Monitor Google PageSpeed Insights"
echo -e "5. Original images backed up in ${YELLOW}$BACKUP_DIR/${NC}\n"

echo -e "${GREEN}✓ Optimization completed successfully!${NC}\n"
