#!/bin/bash

# SGC TECH AI - Image Organization Script
# Maps existing images to descriptive names and organized directory structure

cd "$(dirname "$0")"

echo "=========================================="
echo "SGC TECH AI - Image Organization Script"
echo "=========================================="
echo ""

# Create organized directory structure
echo "📁 Creating directory structure..."
mkdir -p images/hero
mkdir -p images/features
mkdir -p images/case-studies
mkdir -p images/backgrounds
mkdir -p images/icons
mkdir -p images/technology
mkdir -p images/pricing
mkdir -p images/security

# Create backup
echo "💾 Creating backup..."
mkdir -p images-backup
cp images/*.png images-backup/ 2>/dev/null || true

echo ""
echo "🔄 Organizing and renaming images..."
echo ""

# Declare associative array for renaming and organizing
declare -A IMAGE_MAP=(
    # HERO IMAGES
    ["Two-panel_illustration_of_business_transformation-1765248498780.png"]="hero/hero-office-transformation.png"
    ["In_a_visually_immersive_1920x1080px_scene_depict_-1765248926684.png"]="hero/hero-financial-dashboard.png"
    
    # COMMUNICATION & CONTACT
    ["Isometric_illustration_of_five_connected_platform_-1765248535561.png"]="features/communication-omnichannel-hub.png"
    ["Modern_flat_illustration_featuring_a_central_devic-1765248905741.png"]="features/communication-isometric-platforms.png"
    
    # CREDENTIALS & TRUST
    ["Centerpiece_a_large_shield_icon_with_a_prominent_-1765248622153.png"]="features/credentials-certification-shield.png"
    ["Photorealistic_scene_of_a_professional_business_me-1765248505996.png"]="case-studies/team-dubai-office.png"
    ["A_photorealistic_scene_capturing_a_diverse_profess-1765248402833.png"]="case-studies/team-celebration-success.png"
    
    # PRICING & ROI
    ["3D_illustration_showcasing_transparency_and_clarit-1765248642572.png"]="pricing/pricing-transparency-calculator.png"
    ["3D_illustration_of_financial_growth_concept_featu-1765248483531.png"]="pricing/pricing-roi-growth-coins.png"
    ["3D_rendered_illustration_featuring_an_upward_trend-1765248935036.png"]="pricing/pricing-financial-comparison.png"
    
    # CASE STUDIES & TESTIMONIALS
    ["Cinematic_video_thumbnail_featuring_a_poised_busin-1765248918277.png"]="case-studies/testimonial-business-professional.png"
    ["Luxury_real_estate_illustration_forefront_detail-1765248954160.png"]="case-studies/case-study-real-estate-dashboard.png"
    ["Foreground_A_sleek_modern_tablet_POS_system_rest-1765248959868.png"]="case-studies/case-study-restaurant-pos.png"
    
    # TECHNOLOGY & AI
    ["3D_abstract_visualization_of_an_artificial_intelli-1765248416846.png"]="technology/tech-ai-neural-network.png"
    ["3D_isometric_illustration_of_business_automation_c-1765248568675.png"]="technology/tech-automation-hub.png"
    ["3D_render_of_a_cloud_security_concept_Center_a_c-1765248613894.png"]="security/tech-cloud-security.png"
    ["Abstract_technical_illustration_of_data_migration_-1765248527594.png"]="technology/tech-data-migration.png"
    
    # PROCESS & IMPLEMENTATION
    ["Horizontal_timeline_infographic_illustration_depic-1765248317661.png"]="features/process-implementation-timeline.png"
    
    # PATTERNS & BACKGROUNDS
    ["Abstract_geometric_composition_featuring_large_ove-1765248910022.png"]="backgrounds/pattern-circuit-board-seamless.png"
    ["Abstract_professional_composition_with_overlapping-1765248928579.png"]="backgrounds/pattern-hexagon-tech-dark.png"
    ["Seamless_tileable_pattern_elegant_tech-inspired_a-1765248941589.png"]="backgrounds/pattern-geometric-abstract-light.png"
    
    # ICONS
    ["A_set_of_20_minimalist_line_icons_for_business_fea-1765248947594.png"]="icons/icons-business-feature-set.png"
    
    # OFFICE ENVIRONMENT
    ["A_modern_professional_office_space_in_Dubai_featu-1765248365918.png"]="case-studies/office-dubai-workspace.png"
)

# Counter for tracking
RENAMED=0
FAILED=0

# Rename and move images
for OLD_NAME in "${!IMAGE_MAP[@]}"; do
    NEW_NAME="${IMAGE_MAP[$OLD_NAME]}"
    
    if [ -f "images/$OLD_NAME" ]; then
        mv "images/$OLD_NAME" "images/$NEW_NAME"
        echo "✅ $OLD_NAME → $NEW_NAME"
        ((RENAMED++))
    else
        echo "❌ NOT FOUND: $OLD_NAME"
        ((FAILED++))
    fi
done

echo ""
echo "=========================================="
echo "📊 ORGANIZATION SUMMARY"
echo "=========================================="
echo "✅ Successfully organized: $RENAMED images"
echo "❌ Not found: $FAILED images"
echo ""
echo "📁 Directory Structure:"
ls -lh images/hero/ 2>/dev/null && echo "  - hero/ ($(ls images/hero/ | wc -l) files)"
ls -lh images/features/ 2>/dev/null && echo "  - features/ ($(ls images/features/ | wc -l) files)"
ls -lh images/case-studies/ 2>/dev/null && echo "  - case-studies/ ($(ls images/case-studies/ | wc -l) files)"
ls -lh images/pricing/ 2>/dev/null && echo "  - pricing/ ($(ls images/pricing/ | wc -l) files)"
ls -lh images/technology/ 2>/dev/null && echo "  - technology/ ($(ls images/technology/ | wc -l) files)"
ls -lh images/backgrounds/ 2>/dev/null && echo "  - backgrounds/ ($(ls images/backgrounds/ | wc -l) files)"
ls -lh images/icons/ 2>/dev/null && echo "  - icons/ ($(ls images/icons/ | wc -l) files)"
ls -lh images/security/ 2>/dev/null && echo "  - security/ ($(ls images/security/ | wc -l) files)"
echo ""
echo "💾 Original files backed up to: images-backup/"
echo ""
echo "✅ ORGANIZATION COMPLETE!"
echo ""
echo "Next steps:"
echo "1. Run 'bash optimize-images.sh' to compress images"
echo "2. Update HTML files with new image paths"
echo "3. Test on local server"
echo ""
