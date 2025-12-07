/* ═══════════════════════════════════════════════════════════════
   SGC TECH AI - REDESIGN 2025 - ANIMATION CONTROLLER
   Number Counters, Scroll Reveals, Timeline Animations
   ═══════════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    /* ═══════════════════════════════════════════════════════════
       1. NUMBER COUNTER ANIMATION (Trust Badges & Stats)
       ═══════════════════════════════════════════════════════════ */
    
    function animateCounter(element, target, duration = 2000, suffix = '') {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    /* ═══════════════════════════════════════════════════════════
       2. SCROLL REVEAL ANIMATIONS
       ═══════════════════════════════════════════════════════════ */
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counters when element is visible
                if (entry.target.hasAttribute('data-counter')) {
                    const target = parseInt(entry.target.getAttribute('data-counter'));
                    const suffix = entry.target.getAttribute('data-suffix') || '';
                    animateCounter(entry.target, target, 2000, suffix);
                    entry.target.removeAttribute('data-counter'); // Prevent re-animation
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    /* ═══════════════════════════════════════════════════════════
       3. TIMELINE BAR ANIMATION
       ═══════════════════════════════════════════════════════════ */
    
    function animateTimelineBars() {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target.querySelector('.timeline-fill');
                    if (fill) {
                        const targetWidth = fill.style.width;
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = targetWidth;
                        }, 300);
                    }
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.timeline-row').forEach(row => {
            timelineObserver.observe(row);
        });
    }

    /* ═══════════════════════════════════════════════════════════
       4. INITIALIZE ON DOM READY
       ═══════════════════════════════════════════════════════════ */
    
    function init() {
        // Add fade-in-up class to elements
        const animatedElements = document.querySelectorAll('.process-card, .client-card, .service-card');
        animatedElements.forEach(el => {
            el.classList.add('fade-in-up');
            observer.observe(el);
        });

        // Initialize trust badge counters
        const trustNumbers = document.querySelectorAll('.trust-number');
        trustNumbers.forEach(el => {
            const text = el.textContent.trim();
            const numMatch = text.match(/\d+/);
            if (numMatch) {
                const number = parseInt(numMatch[0]);
                const suffix = text.replace(numMatch[0], '').trim();
                el.setAttribute('data-counter', number);
                el.setAttribute('data-suffix', suffix);
                el.textContent = '0' + suffix;
                observer.observe(el);
            }
        });

        // Initialize timeline animations
        animateTimelineBars();

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Add parallax effect to hero background (moderate)
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                hero.style.backgroundPositionY = rate + 'px';
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/* ═══════════════════════════════════════════════════════════════
   5. ENHANCED ROI CALCULATOR WITH ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */

// This extends the existing ROI calculator in main.js
if (typeof window.calculateROI === 'function') {
    const originalCalculateROI = window.calculateROI;
    
    window.calculateROI = function() {
        // Call original function
        const result = originalCalculateROI.apply(this, arguments);
        
        // Add animation to results
        const resultsDiv = document.getElementById('calculatorResults');
        if (resultsDiv && resultsDiv.style.display !== 'none') {
            resultsDiv.style.opacity = '0';
            resultsDiv.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                resultsDiv.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                resultsDiv.style.opacity = '1';
                resultsDiv.style.transform = 'translateY(0)';
                
                // Animate result values
                const resultValues = resultsDiv.querySelectorAll('.result-value');
                resultValues.forEach((el, index) => {
                    const text = el.textContent;
                    const numMatch = text.match(/[\d,]+/);
                    if (numMatch) {
                        const number = parseInt(numMatch[0].replace(/,/g, ''));
                        el.textContent = '0';
                        setTimeout(() => {
                            animateCounterInResult(el, number, text, 1500);
                        }, index * 200);
                    }
                });
            }, 100);
        }
        
        return result;
    };
    
    function animateCounterInResult(element, target, originalText, duration) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = originalText;
                clearInterval(timer);
            } else {
                const formatted = Math.floor(current).toLocaleString();
                element.textContent = originalText.replace(/[\d,]+/, formatted);
            }
        }, 16);
    }
}

/* ═══════════════════════════════════════════════════════════════
   6. LOGO TAGLINE REVEAL ANIMATION
   ═══════════════════════════════════════════════════════════════ */

window.addEventListener('load', () => {
    const tagline = document.querySelector('.logo-tagline');
    if (tagline) {
        tagline.style.opacity = '0';
        tagline.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            tagline.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            tagline.style.opacity = '1';
            tagline.style.transform = 'translateY(0)';
        }, 500);
    }
});
