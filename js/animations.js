/**
 * SGC TECH AI - Advanced Animation Controller
 * Created: December 2025
 * Purpose: Control all 7 main animations + micro-interactions
 * Dependencies: GSAP, ScrollTrigger, Swiper.js
 */

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Animate number counter from 0 to target value
 * @param {HTMLElement} element - Element containing the number
 * @param {number} target - Target number to count to
 * @param {number} duration - Animation duration in milliseconds
 * @param {string} prefix - Optional prefix (e.g., "AED ")
 * @param {string} suffix - Optional suffix (e.g., "%")
 */
function animateCounter(element, target, duration = 1500, prefix = '', suffix = '') {
    if (!element) return;
    
    let current = 0;
    const increment = target / (duration / 16); // 60fps
    const isNegative = target < 0;
    const absoluteTarget = Math.abs(target);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= absoluteTarget) {
            current = absoluteTarget;
            clearInterval(timer);
        }
        
        const displayValue = isNegative ? -Math.floor(current) : Math.floor(current);
        element.textContent = prefix + displayValue.toLocaleString('en-AE') + suffix;
    }, 16);
}

/**
 * Intersection Observer for triggering animations on scroll
 */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations based on element class
            if (entry.target.classList.contains('animate-counter')) {
                const target = parseInt(entry.target.dataset.target);
                const prefix = entry.target.dataset.prefix || '';
                const suffix = entry.target.dataset.suffix || '';
                animateCounter(entry.target, target, 1500, prefix, suffix);
            }
            
            // Only trigger once for most animations
            if (!entry.target.classList.contains('repeat-animation')) {
                animationObserver.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// ============================================================================
// ANIMATION #1: HERO BATTLE (Split-Screen Race)
// ============================================================================

function initHeroBattle() {
    const container = document.querySelector('.hero-battle-container');
    if (!container) return;
    
    // Animate progress bars
    const progressBars = container.querySelectorAll('.battle-progress-fill');
    progressBars.forEach(bar => {
        const width = bar.dataset.progress || '100';
        bar.style.setProperty('--progress-width', width + '%');
    });
    
    // Animate money counters
    setTimeout(() => {
        const positiveCounter = container.querySelector('.battle-money-counter.positive');
        const negativeCounter = container.querySelector('.battle-money-counter.negative');
        
        if (positiveCounter) {
            animateCounter(positiveCounter, 28000, 2000, 'AED ', '');
        }
        
        if (negativeCounter) {
            animateCounter(negativeCounter, -53000, 2000, 'AED ', '');
        }
    }, 800);
    
    // Ticker animation (duplicate content for seamless loop)
    const ticker = container.querySelector('.battle-proof-ticker-content');
    if (ticker) {
        ticker.innerHTML += ticker.innerHTML; // Duplicate for seamless scroll
    }
}

// ============================================================================
// ANIMATION #2: PROOF SLIDESHOW (Swiper Carousel)
// ============================================================================

function initProofSlideshow() {
    const container = document.querySelector('.proof-slideshow-container');
    if (!container || typeof Swiper === 'undefined') return;
    
    const swiper = new Swiper('.proof-slideshow-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        on: {
            slideChange: function() {
                // Trigger number counters when slide becomes active
                const activeSlide = this.slides[this.activeIndex];
                const counters = activeSlide.querySelectorAll('.animate-counter');
                
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    const prefix = counter.dataset.prefix || '';
                    const suffix = counter.dataset.suffix || '';
                    animateCounter(counter, target, 1500, prefix, suffix);
                });
            }
        }
    });
}

// ============================================================================
// ANIMATION #3: MONEY CALCULATOR (Interactive ROI)
// ============================================================================

function initMoneyCalculator() {
    const container = document.querySelector('.money-calculator-container');
    if (!container) return;
    
    // Get slider elements
    const teamSizeSlider = container.querySelector('#teamSize');
    const manualHoursSlider = container.querySelector('#manualHours');
    const errorRateSlider = container.querySelector('#errorRate');
    
    // Get display elements
    const teamSizeValue = container.querySelector('#teamSizeValue');
    const manualHoursValue = container.querySelector('#manualHoursValue');
    const errorRateValue = container.querySelector('#errorRateValue');
    
    // Get result elements
    const monthlyLoss = container.querySelector('.calculator-total-loss .amount');
    const annualLoss = container.querySelector('.calculator-total-loss .annual');
    const monthlyGain = container.querySelector('.calculator-total-gain .amount');
    const annualGain = container.querySelector('.calculator-total-gain .annual');
    
    // Detailed breakdown elements
    const laborWaste = container.querySelector('[data-calc="labor-waste"]');
    const errorCosts = container.querySelector('[data-calc="error-costs"]');
    const delayedDecisions = container.querySelector('[data-calc="delayed-decisions"]');
    const missedOpportunities = container.querySelector('[data-calc="missed-opportunities"]');
    
    // Comparison reveal section
    const comparisonSection = container.querySelector('.calculator-comparison');
    const netDifference = container.querySelector('.calculator-net-difference .amount');
    const roiPercentage = container.querySelector('.roi-stats .roi-value');
    
    /**
     * Calculate ROI based on slider values
     */
    function calculateROI() {
        const teamSize = parseInt(teamSizeSlider?.value || 25);
        const manualHours = parseInt(manualHoursSlider?.value || 40);
        const errorRate = parseInt(errorRateSlider?.value || 15);
        
        // Update slider value displays
        if (teamSizeValue) teamSizeValue.textContent = teamSize;
        if (manualHoursValue) manualHoursValue.textContent = manualHours;
        if (errorRateValue) errorRateValue.textContent = errorRate + '%';
        
        // Calculate monthly losses (UAE market rates)
        const avgHourlyRate = 150; // AED per hour (UAE average)
        const labor = teamSize * manualHours * 4 * avgHourlyRate * 0.6; // 60% waste
        const errors = teamSize * 1000 * (errorRate / 10); // Error cost per person
        const delays = teamSize * 500 * (manualHours / 20); // Opportunity cost
        const missed = labor * 0.3; // 30% of labor waste
        
        const totalMonthly = Math.floor(labor + errors + delays + missed);
        const totalAnnual = totalMonthly * 12;
        
        // Update breakdown displays
        if (laborWaste) laborWaste.textContent = 'AED ' + Math.floor(labor).toLocaleString('en-AE');
        if (errorCosts) errorCosts.textContent = 'AED ' + Math.floor(errors).toLocaleString('en-AE');
        if (delayedDecisions) delayedDecisions.textContent = 'AED ' + Math.floor(delays).toLocaleString('en-AE');
        if (missedOpportunities) missedOpportunities.textContent = 'AED ' + Math.floor(missed).toLocaleString('en-AE');
        
        // Update totals with animation
        if (monthlyLoss) {
            animateCounter(monthlyLoss, totalMonthly, 800, 'AED ', '');
        }
        if (annualLoss) {
            animateCounter(annualLoss, totalAnnual, 1000, 'AED ', '');
        }
        
        // Gains mirror losses (assuming 100% elimination)
        if (monthlyGain) {
            animateCounter(monthlyGain, totalMonthly, 800, 'AED ', '');
        }
        if (annualGain) {
            animateCounter(annualGain, totalAnnual, 1000, 'AED ', '');
        }
        
        // Calculate net difference (2 years of losses vs investment)
        const twoYearLoss = totalAnnual * 2;
        const twoYearGain = totalAnnual * 2 * 1.05; // 5% growth
        const netDiff = twoYearLoss + twoYearGain;
        
        // Implementation cost (Silver tier)
        const implementationCost = 24187;
        const roi = Math.floor((netDiff / implementationCost) * 100);
        
        // Update comparison section
        if (netDifference) {
            setTimeout(() => {
                animateCounter(netDifference, netDiff, 1500, 'AED ', '');
            }, 300);
        }
        
        if (roiPercentage) {
            setTimeout(() => {
                roiPercentage.textContent = roi.toLocaleString('en-AE') + '%';
            }, 500);
        }
        
        // Reveal comparison after 2 seconds
        if (comparisonSection && !comparisonSection.classList.contains('revealed')) {
            setTimeout(() => {
                comparisonSection.classList.add('revealed');
            }, 2000);
        }
    }
    
    // Add event listeners to sliders
    if (teamSizeSlider) teamSizeSlider.addEventListener('input', calculateROI);
    if (manualHoursSlider) manualHoursSlider.addEventListener('input', calculateROI);
    if (errorRateSlider) errorRateSlider.addEventListener('input', calculateROI);
    
    // Initial calculation
    calculateROI();
}

// ============================================================================
// ANIMATION #4: 14-DAY TIMELINE (Scroll-Triggered)
// ============================================================================

function initTimelineAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded. Timeline animation disabled.');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    const timeline = document.querySelector('.timeline-14-days');
    if (!timeline) return;
    
    const checkpoints = timeline.querySelectorAll('.timeline-checkpoint');
    
    checkpoints.forEach((checkpoint, index) => {
        const hexagon = checkpoint.querySelector('.checkpoint-hexagon');
        const content = checkpoint.querySelector('.checkpoint-content');
        const progressBar = checkpoint.querySelector('.checkpoint-progress-fill');
        
        // Create timeline for this checkpoint
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: checkpoint,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1,
            }
        });
        
        // Animate hexagon fill
        if (hexagon) {
            tl.from(hexagon, {
                scale: 0,
                rotation: 30,
                opacity: 0,
                duration: 0.5
            });
        }
        
        // Animate content
        if (content) {
            tl.from(content, {
                y: 30,
                opacity: 0,
                duration: 0.5
            }, '-=0.2');
        }
        
        // Animate progress bar
        if (progressBar) {
            tl.from(progressBar, {
                width: '0%',
                duration: 0.8
            }, '-=0.3');
        }
        
        // Special animation for Day 14 (finale)
        if (checkpoint.classList.contains('day-14')) {
            tl.to(hexagon, {
                scale: 1.2,
                duration: 0.3,
                ease: 'back.out(1.7)'
            }).to(hexagon, {
                scale: 1,
                duration: 0.2
            });
        }
    });
}

// ============================================================================
// ANIMATION #5: COMPARISON TABLE (Row-by-Row Reveal)
// ============================================================================

function initComparisonTable() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded. Comparison table animation disabled.');
        return;
    }
    
    const table = document.querySelector('.comparison-table');
    if (!table) return;
    
    const rows = table.querySelectorAll('.comparison-row');
    const sgcColumn = table.querySelector('.column-sgc');
    
    rows.forEach((row, index) => {
        gsap.from(row, {
            scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.1
        });
    });
    
    // Final reveal: fade competitors, expand SGC
    if (sgcColumn) {
        gsap.to('.comparison-column:not(.column-sgc)', {
            scrollTrigger: {
                trigger: table,
                start: 'bottom 60%',
                toggleActions: 'play none none none'
            },
            opacity: 0.1,
            scale: 0.95,
            duration: 0.8
        });
        
        gsap.to(sgcColumn, {
            scrollTrigger: {
                trigger: table,
                start: 'bottom 60%',
                toggleActions: 'play none none none'
            },
            scale: 1.05,
            duration: 0.8,
            ease: 'back.out(1.3)'
        });
    }
}

// ============================================================================
// ANIMATION #6: TRIPLE SHIELD (Particle Assembly)
// ============================================================================

function initTripleShield() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded. Shield animation disabled.');
        return;
    }
    
    const container = document.querySelector('.triple-shield-container');
    if (!container) return;
    
    const shields = container.querySelectorAll('.shield');
    const superShield = container.querySelector('.super-shield');
    const badges = container.querySelectorAll('.bonus-badge');
    
    // Create master timeline
    const masterTl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    // Animate individual shields appearing
    shields.forEach((shield, index) => {
        masterTl.from(shield, {
            scale: 0,
            rotation: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)'
        }, index * 0.3);
    });
    
    // Merge shields into super-shield
    if (superShield) {
        masterTl.to(shields, {
            x: '0',
            y: '0',
            scale: 0,
            opacity: 0,
            duration: 0.5
        }, '+=0.5');
        
        masterTl.from(superShield, {
            scale: 0,
            rotation: 360,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.out'
        }, '-=0.2');
    }
    
    // Fly in bonus badges
    badges.forEach((badge, index) => {
        const directions = [
            { x: -100, y: -100 }, // top-left
            { x: 100, y: -100 },  // top-right
            { x: -100, y: 100 },  // bottom-left
            { x: 100, y: 100 }    // bottom-right
        ];
        
        masterTl.from(badge, {
            x: directions[index]?.x || 0,
            y: directions[index]?.y || 0,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.3');
    });
}

// ============================================================================
// ANIMATION #7: THREE DOORS (Urgency Banner + Sticky Footer)
// ============================================================================

function initThreeDoors() {
    const container = document.querySelector('.three-doors-container');
    if (!container) return;
    
    const urgencyBanner = document.querySelector('.three-doors-urgency');
    const stickyFooter = document.querySelector('.three-doors-sticky-footer');
    
    // Show urgency banner after 5 seconds
    if (urgencyBanner) {
        setTimeout(() => {
            urgencyBanner.classList.add('show');
            
            // Hide after 3 seconds
            setTimeout(() => {
                urgencyBanner.classList.remove('show');
            }, 3000);
        }, 5000);
    }
    
    // Show sticky footer when user scrolls to three doors section
    if (stickyFooter) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyFooter.style.display = 'block';
                } else {
                    stickyFooter.style.display = 'none';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(container);
    }
}

// ============================================================================
// MICRO-ANIMATIONS
// ============================================================================

/**
 * Animate star ratings
 */
function initStarRatings() {
    const starRatings = document.querySelectorAll('.star-rating');
    
    starRatings.forEach(rating => {
        animationObserver.observe(rating);
    });
}

/**
 * Logo assembly animation (runs on page load)
 */
function initLogoAnimation() {
    const logo = document.querySelector('.logo-animated');
    if (!logo || typeof gsap === 'undefined') return;
    
    // Create particle effect
    const particles = [];
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'logo-particle';
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: var(--electric-cyan);
            border-radius: 50%;
            opacity: 0;
        `;
        logo.appendChild(particle);
        particles.push(particle);
    }
    
    // Animate particles
    const tl = gsap.timeline();
    
    particles.forEach((particle, index) => {
        const angle = (Math.PI * 2 * index) / particles.length;
        const distance = 200;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        tl.from(particle, {
            x: x,
            y: y,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.in'
        }, index * 0.02);
    });
    
    tl.to(particles, {
        opacity: 0,
        duration: 0.3
    });
    
    // Reveal logo text
    tl.from('.logo-text', {
        opacity: 0,
        scale: 0.8,
        duration: 0.5
    }, '-=0.3');
}

/**
 * Add scroll reveal to all elements with .fade-in-up class
 */
function initScrollReveals() {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => animationObserver.observe(el));
}

/**
 * Number counter animation for elements with data-target attribute
 */
function initNumberCounters() {
    const counters = document.querySelectorAll('.animate-counter');
    counters.forEach(counter => animationObserver.observe(counter));
}

// ============================================================================
// ANIMATION #8: HERO VISUAL ANIMATIONS (Trust Badge Counters + Sections)
// ============================================================================

/**
 * Initialize hero trust badge number counters
 * Animates the numbers: 14, 150%, 98%
 * IMPORTANT: Does NOT reset values - uses Intersection Observer to animate only when visible
 */
function initHeroCounters() {
    const trustBadges = document.querySelectorAll('.trust-badge .trust-number');
    
    if (trustBadges.length === 0) return;
    
    // Use Intersection Observer to trigger animation when visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const badge = entry.target;
                
                // Skip if already animated
                if (badge.dataset.animated === 'true') return;
                badge.dataset.animated = 'true';
                
                const originalText = badge.textContent.trim();
                let target, suffix = '', prefix = '';
                
                // Parse the number and suffix
                if (originalText.includes('%')) {
                    target = parseInt(originalText.replace('%', ''));
                    suffix = '%';
                } else if (originalText.includes('AED')) {
                    target = parseInt(originalText.replace(/[^\d]/g, ''));
                    prefix = 'AED ';
                } else {
                    target = parseInt(originalText);
                }
                
                // Store original for fallback
                badge.dataset.originalText = originalText;
                
                // Animate the counter
                animateHeroCounter(badge, target, 1500, prefix, suffix);
                
                counterObserver.unobserve(badge);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each trust number
    trustBadges.forEach(badge => counterObserver.observe(badge));
}

/**
 * Animate a single hero counter
 */
function animateHeroCounter(element, target, duration, prefix, suffix) {
    if (!element) return;
    
    element.classList.add('counting');
    let current = 0;
    const increment = target / (duration / 16);
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(target * easeOut);
        
        element.textContent = prefix + current.toLocaleString('en-AE') + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + target.toLocaleString('en-AE') + suffix;
            element.classList.remove('counting');
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Initialize section scroll animations
 * Uses Intersection Observer for performance
 */
function initSectionAnimations() {
    const sections = document.querySelectorAll('.problem-section, .solution-section, .process-section, .modules-section, .cta-section');
    
    if (sections.length === 0) return;
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => sectionObserver.observe(section));
}

/**
 * Create floating particles in hero section
 */
function initHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero || window.innerWidth < 768) return; // Skip on mobile
    
    // Check if particles already exist
    if (hero.querySelector('.hero-particle')) return;
    
    // Create 6 floating particles
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        hero.appendChild(particle);
    }
}

/**
 * Create hexagon background grid (optional - for high-performance devices)
 */
function initHexagonBackground() {
    const hero = document.querySelector('.hero');
    if (!hero || window.innerWidth < 1024) return; // Skip on smaller screens
    
    // Check if already exists
    if (hero.querySelector('.hero-hexagon-bg')) return;
    
    const hexBg = document.createElement('div');
    hexBg.className = 'hero-hexagon-bg';
    hexBg.innerHTML = `
        <div class="hexagon-grid">
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <pattern id="hexPattern" width="10" height="17.32" patternUnits="userSpaceOnUse">
                        <polygon class="hexagon-cell" points="5,0 10,2.89 10,8.66 5,11.55 0,8.66 0,2.89" />
                        <polygon class="hexagon-cell" points="5,5.77 10,8.66 10,14.43 5,17.32 0,14.43 0,8.66" transform="translate(5, 8.66)" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hexPattern)" />
            </svg>
        </div>
    `;
    
    // Insert at the beginning of hero
    hero.insertBefore(hexBg, hero.firstChild);
}

// ============================================================================
// PHASE 4: EXIT INTENT POPUP
// ============================================================================

/**
 * Initialize exit intent detection
 * Shows popup when user moves mouse toward browser close/back
 */
function initExitIntent() {
    const popup = document.getElementById('exitIntentPopup');
    if (!popup) return;
    
    let hasShownPopup = false;
    let mouseY = 0;
    
    // Check if already dismissed this session
    if (sessionStorage.getItem('exitIntentDismissed')) {
        return;
    }
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseY = e.clientY;
    });
    
    // Detect exit intent (mouse leaving viewport from top)
    document.addEventListener('mouseout', (e) => {
        if (hasShownPopup) return;
        
        // Check if mouse left from the top of the page
        if (e.clientY < 10 && mouseY < 100) {
            showExitPopup();
        }
    });
    
    // Also trigger on back button attempt (mobile-friendly)
    window.addEventListener('popstate', () => {
        if (!hasShownPopup) {
            showExitPopup();
            // Push state back to prevent actual navigation
            history.pushState(null, '', location.href);
        }
    });
    
    // Push initial state for popstate detection
    history.pushState(null, '', location.href);
    
    function showExitPopup() {
        if (hasShownPopup) return;
        hasShownPopup = true;
        
        popup.classList.add('active');
        popup.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Animate the counter numbers in popup
        const counters = popup.querySelectorAll('[data-count]');
        counters.forEach((counter, index) => {
            const target = parseInt(counter.dataset.count);
            setTimeout(() => {
                animateExitCounter(counter, target, 1000);
            }, 300 + (index * 150));
        });
    }
    
    // Close popup handlers
    const closeBtn = popup.querySelector('.exit-intent-close');
    const dismissBtn = popup.querySelector('.exit-intent-dismiss');
    const ctaBtn = popup.querySelector('.exit-intent-cta');
    
    function closeExitPopup() {
        popup.classList.remove('active');
        popup.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        sessionStorage.setItem('exitIntentDismissed', 'true');
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeExitPopup);
    if (dismissBtn) dismissBtn.addEventListener('click', closeExitPopup);
    
    // CTA closes popup and opens calculator
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            closeExitPopup();
            // The data-calculator-trigger will be handled by calculator-modal.js
        });
    }
    
    // Close on overlay click
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closeExitPopup();
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closeExitPopup();
        }
    });
}

/**
 * Animate exit popup counter
 */
function animateExitCounter(element, target, duration) {
    let current = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        current = Math.floor(target * easeOut);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================================================
// PHASE 4: SCROLL-TRIGGERED COUNTERS
// ============================================================================

/**
 * Initialize scroll-triggered counters for stats throughout the page
 */
function initScrollCounters() {
    const counters = document.querySelectorAll('.scroll-counter');
    
    if (counters.length === 0) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                // Mark as visible for CSS animations
                counter.classList.add('visible');
                
                // Get counter configuration
                const target = parseInt(counter.dataset.count) || 0;
                const prefix = counter.dataset.prefix || '';
                const suffix = counter.dataset.suffix || '';
                
                // Animate the counter
                animateScrollCounter(counter, target, 1500, prefix, suffix);
                
                // Only animate once
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -20px 0px'
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

/**
 * Animate a scroll-triggered counter
 */
function animateScrollCounter(element, target, duration, prefix, suffix) {
    element.classList.add('counting');
    
    let current = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(target * easeOut);
        
        element.textContent = prefix + current.toLocaleString('en-AE') + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = prefix + target.toLocaleString('en-AE') + suffix;
            element.classList.remove('counting');
            element.classList.add('counted');
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize all animations when DOM is ready
 */
function initAllAnimations() {
    console.log('🎬 SGC TECH AI Animations - Initializing...');
    
    // Core animations
    initHeroBattle();
    initProofSlideshow();
    initMoneyCalculator();
    initTimelineAnimation();
    initComparisonTable();
    initTripleShield();
    initThreeDoors();
    
    // Micro-animations
    initStarRatings();
    initLogoAnimation();
    initScrollReveals();
    initNumberCounters();
    
    // Phase 2: Hero Visual Animations
    initHeroCounters();
    initSectionAnimations();
    initHeroParticles();
    initHexagonBackground();
    
    // Phase 4: Exit Intent & Scroll Counters
    initExitIntent();
    initScrollCounters();
    
    console.log('✨ All animations initialized successfully!');
}

// Wait for DOM and dependencies to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
    initAllAnimations();
}

// Re-initialize certain animations after dynamic content loads
window.addEventListener('load', () => {
    // Re-check for any elements added after initial load
    initScrollReveals();
    initNumberCounters();
    initScrollCounters();
});

// ============================================================================
// EXPORT FOR EXTERNAL USE
// ============================================================================

window.SGCAnimations = {
    animateCounter,
    initHeroBattle,
    initProofSlideshow,
    initMoneyCalculator,
    initTimelineAnimation,
    initComparisonTable,
    initTripleShield,
    initThreeDoors,
    // Phase 2: Hero Animations
    initHeroCounters,
    initSectionAnimations,
    initHeroParticles,
    initHexagonBackground,
    animateHeroCounter,
    // Phase 4: Exit Intent & Scroll Counters
    initExitIntent,
    initScrollCounters,
    animateScrollCounter
};
