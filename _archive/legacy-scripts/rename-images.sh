#!/bin/bash

# =============================================================================
# IMAGE RENAMING SCRIPT
# SGC TECH AI - Standardize Image Filenames
# 
# This script renames all generated images to follow a consistent,
# maintainable naming convention.
#
# Usage: bash rename-images.sh
# =============================================================================

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  SGC TECH AI Image Renaming Script${NC}"
echo -e "${BLUE}=======================================${NC}\n"

# Check if images directory exists
if [ ! -d "images" ]; then
    echo -e "${YELLOW}Creating images directory...${NC}"
    mkdir -p images
fi

# Navigate to images directory
cd images

# =============================================================================
# RENAME MAPPINGS
# Format: OLD_NAME -> NEW_NAME
# =============================================================================

declare -A rename_map=(
    # Hero & Main Sections
    ["Two-panel_illustration_of_business_transformation-1765248498780.png"]="hero-office-transformation.png"
    ["In_a_visually_immersive_1920x1080px_scene_depict_-1765248926684.png"]="hero-financial-dashboard.png"
    
    # Communication
    ["Isometric_illustration_of_five_connected_platform_-1765248535561.png"]="communication-omnichannel-hub.png"
    ["Modern_flat_illustration_featuring_a_central_devic-1765248905741.png"]="communication-isometric-platforms.png"
    
    # Credentials & Trust
    ["Centerpiece_a_large_shield_icon_with_a_prominent_-1765248622153.png"]="credentials-certification-shield.png"
    ["A_modern_professional_office_space_in_Dubai_featu-1765248365918.png"]="team-dubai-office.png"
    ["A_photorealistic_scene_capturing_a_diverse_profess-1765248402833.png"]="team-celebration-success.png"
    ["Cinematic_video_thumbnail_featuring_a_poised_busin-1765248918277.png"]="testimonial-business-professional.png"
    
    # Pricing
    ["3D_illustration_showcasing_transparency_and_clarit-1765248642572.png"]="pricing-transparency-calculator.png"
    ["3D_rendered_illustration_featuring_an_upward_trend-1765248935036.png"]="pricing-roi-growth-coins.png"
    ["3D_illustration_of_financial_growth_concept_featu-1765248483531.png"]="pricing-financial-comparison.png"
    
    # Case Studies
    ["Luxury_real_estate_illustration_forefront_detail-1765248954160.png"]="case-study-real-estate-dashboard.png"
    ["Foreground_A_sleek_modern_tablet_POS_system_rest-1765248959868.png"]="case-study-restaurant-pos.png"
    
    # Technology
    ["3D_abstract_visualization_of_an_artificial_intelli-1765248416846.png"]="tech-ai-neural-network.png"
    ["3D_isometric_illustration_of_business_automation_c-1765248568675.png"]="tech-automation-hub.png"
    ["3D_render_of_a_cloud_security_concept_Center_a_c-1765248613894.png"]="tech-cloud-security.png"
    ["Abstract_technical_illustration_of_data_migration_-1765248527594.png"]="tech-data-migration.png"
    
    # Process
    ["Horizontal_timeline_infographic_illustration_depic-1765248317661.png"]="process-implementation-timeline.png"
    
    # Patterns (Backgrounds)
    ["Seamless_tileable_pattern_elegant_tech-inspired_a-1765248941589.png"]="pattern-circuit-board-seamless.png"
    ["Abstract_professional_composition_with_overlapping-1765248928579.png"]="pattern-hexagon-tech-dark.png"
    ["Abstract_geometric_composition_featuring_large_ove-1765248910022.png"]="pattern-geometric-abstract-light.png"
    
    # Icons
    ["A_set_of_20_minimalist_line_icons_for_business_fea-1765248947594.png"]="icons-business-feature-set.png"
    
    # Business Meeting
    ["Photorealistic_scene_of_a_professional_business_me-1765248505996.png"]="business-meeting-presentation.png"
)

# =============================================================================
# PERFORM RENAMING
# =============================================================================

echo -e "${BLUE}Starting image renaming process...${NC}\n"

renamed_count=0
skipped_count=0
missing_count=0

for old_name in "${!rename_map[@]}"; do
    new_name="${rename_map[$old_name]}"
    
    if [ -f "$old_name" ]; then
        mv "$old_name" "$new_name"
        echo -e "${GREEN}✓${NC} Renamed: ${YELLOW}$old_name${NC} → ${GREEN}$new_name${NC}"
        ((renamed_count++))
    elif [ -f "$new_name" ]; then
        echo -e "${BLUE}→${NC} Already exists: ${GREEN}$new_name${NC}"
        ((skipped_count++))
    else
        echo -e "${YELLOW}⚠${NC} Not found: ${YELLOW}$old_name${NC}"
        ((missing_count++))
    fi
done

# =============================================================================
# CREATE SUBDIRECTORIES FOR ORGANIZATION (OPTIONAL)
# =============================================================================

echo -e "\n${BLUE}Creating organized subdirectories...${NC}\n"

mkdir -p {hero,communication,credentials,pricing,case-studies,technology,process,patterns,icons,team}

# Move files to subdirectories (comment out if you prefer flat structure)
# echo "Moving files to subdirectories..."
# mv hero-*.png hero/ 2>/dev/null
# mv communication-*.png communication/ 2>/dev/null
# mv credentials-*.png credentials/ 2>/dev/null
# mv pricing-*.png pricing/ 2>/dev/null
# mv case-study-*.png case-studies/ 2>/dev/null
# mv tech-*.png technology/ 2>/dev/null
# mv process-*.png process/ 2>/dev/null
# mv pattern-*.png patterns/ 2>/dev/null
# mv icons-*.png icons/ 2>/dev/null
# mv team-*.png team/ 2>/dev/null

# =============================================================================
# SUMMARY REPORT
# =============================================================================

echo -e "\n${BLUE}=======================================${NC}"
echo -e "${BLUE}  Renaming Complete!${NC}"
echo -e "${BLUE}=======================================${NC}"
echo -e "${GREEN}✓ Successfully renamed: $renamed_count files${NC}"
echo -e "${BLUE}→ Already existed: $skipped_count files${NC}"
echo -e "${YELLOW}⚠ Missing files: $missing_count files${NC}"
echo -e "\n${GREEN}All images are now using standardized naming convention.${NC}\n"

# =============================================================================
# CREATE IMAGE INDEX (OPTIONAL)
# =============================================================================

echo -e "${BLUE}Creating image index file...${NC}"

cat > IMAGE_INDEX.md << 'EOF'
# SGC TECH AI - Image Asset Index

## Hero & Main Sections
- `hero-office-transformation.png` - Before/after business transformation
- `hero-financial-dashboard.png` - Financial analytics dashboard

## Communication
- `communication-omnichannel-hub.png` - Multi-channel communication system
- `communication-isometric-platforms.png` - Platform connectivity illustration

## Credentials & Trust
- `credentials-certification-shield.png` - Certification badges and shield
- `team-dubai-office.png` - Dubai office environment
- `team-celebration-success.png` - Team celebrating success
- `testimonial-business-professional.png` - Video testimonial thumbnail

## Pricing
- `pricing-transparency-calculator.png` - Transparent pricing visualization
- `pricing-roi-growth-coins.png` - ROI growth with coins
- `pricing-financial-comparison.png` - Financial comparison chart

## Case Studies
- `case-study-real-estate-dashboard.png` - Real estate property dashboard
- `case-study-restaurant-pos.png` - Restaurant POS system

## Technology
- `tech-ai-neural-network.png` - AI/ML neural network visualization
- `tech-automation-hub.png` - Business automation control center
- `tech-cloud-security.png` - Cloud security infrastructure
- `tech-data-migration.png` - Data migration process

## Process
- `process-implementation-timeline.png` - 14-day implementation timeline

## Patterns (Backgrounds)
- `pattern-circuit-board-seamless.png` - Seamless circuit board pattern (light)
- `pattern-hexagon-tech-dark.png` - Hexagon tech pattern (dark)
- `pattern-geometric-abstract-light.png` - Abstract geometric pattern

## Icons
- `icons-business-feature-set.png` - Collection of 20 business icons

## Other
- `business-meeting-presentation.png` - Professional business meeting
EOF

echo -e "${GREEN}✓ Created IMAGE_INDEX.md${NC}\n"

# =============================================================================
# NEXT STEPS
# =============================================================================

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}  Next Steps:${NC}"
echo -e "${BLUE}=======================================${NC}"
echo -e "1. Review renamed files in the ${YELLOW}images/${NC} directory"
echo -e "2. Optimize images using: ${YELLOW}bash optimize-images.sh${NC}"
echo -e "3. Update HTML files to use new filenames"
echo -e "4. Add ${YELLOW}image-enhanced-sections.css${NC} to your HTML"
echo -e "5. Test image loading across all pages\n"

echo -e "${GREEN}✓ Script completed successfully!${NC}\n"
