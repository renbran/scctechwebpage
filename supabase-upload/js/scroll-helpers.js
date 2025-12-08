/**
 * Scroll Helpers - Desktop Navigation Aids
 * Provides: Back to top, scroll progress, section navigation, keyboard shortcuts
 * Only active on screens 1024px and larger
 */

(function() {
    'use strict';
    
    // Only initialize on desktop
    if (window.innerWidth < 1024) return;
    
    // Create scroll helper elements
    function createScrollHelpers() {
        // Container
        const container = document.createElement('div');
        container.className = 'scroll-helpers';
        container.setAttribute('aria-hidden', 'true');
        
        // Scroll Progress Bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-label', 'Page scroll progress');
        container.appendChild(progressBar);
        
        // Back to Top Button
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.setAttribute('title', 'Back to top (Press Home)');
        container.appendChild(backToTop);
        
        // Section Navigation Dots
        const sectionNav = document.createElement('nav');
        sectionNav.className = 'section-nav';
        sectionNav.setAttribute('aria-label', 'Page sections');
        container.appendChild(sectionNav);
        
        // Keyboard Hint
        const keyboardHint = document.createElement('div');
        keyboardHint.className = 'keyboard-hint';
        keyboardHint.innerHTML = '<kbd>↑</kbd><kbd>↓</kbd> Navigate sections';
        container.appendChild(keyboardHint);
        
        document.body.appendChild(container);
        
        return { container, progressBar, backToTop, sectionNav, keyboardHint };
    }
    
    // Get all main sections on the page
    function getSections() {
        const selectors = [
            'section[id]',
            '.page-hero',
            '.hero',
            '.our-story',
            '.parent-company',
            '.differentiators',
            '.values',
            '.tech-stack',
            '.certifications',
            '.quick-facts',
            '.cta-section',
            '.booking-section',
            '.expect-section',
            '.contact-section',
            '.stories-section',
            '.filter-section',
            '.pricing-section',
            '.pricing-tiers',
            '.comparison-section',
            '.faq-section',
            '.team-section',
            '.leadership-section'
        ];
        
        const sections = [];
        const seen = new Set();
        
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (!seen.has(el)) {
                    seen.add(el);
                    sections.push(el);
                }
            });
        });
        
        // Sort by position on page
        sections.sort((a, b) => a.offsetTop - b.offsetTop);
        
        return sections;
    }
    
    // Get section name from element
    function getSectionName(section) {
        // Check for heading
        const heading = section.querySelector('h1, h2, h3');
        if (heading) {
            const text = heading.textContent.trim();
            // Truncate if too long
            return text.length > 20 ? text.substring(0, 20) + '...' : text;
        }
        
        // Check for class-based names
        const classMap = {
            'page-hero': 'Top',
            'hero': 'Top',
            'our-story': 'Our Story',
            'parent-company': 'Parent Company',
            'differentiators': 'Why Us',
            'values': 'Values',
            'tech-stack': 'Technology',
            'certifications': 'Certifications',
            'quick-facts': 'Quick Facts',
            'cta-section': 'Get Started',
            'booking-section': 'Book Now',
            'expect-section': 'What to Expect',
            'contact-section': 'Contact',
            'stories-section': 'Stories',
            'filter-section': 'Filter',
            'pricing-section': 'Pricing',
            'pricing-tiers': 'Pricing',
            'comparison-section': 'Compare',
            'faq-section': 'FAQ',
            'team-section': 'Team',
            'leadership-section': 'Leadership',
            'footer': 'Footer'
        };
        
        for (const [className, name] of Object.entries(classMap)) {
            if (section.classList.contains(className)) {
                return name;
            }
        }
        
        return section.id || 'Section';
    }
    
    // Create navigation dots for sections
    function createSectionDots(sectionNav, sections) {
        sectionNav.innerHTML = '';
        
        sections.forEach((section, index) => {
            const dot = document.createElement('button');
            dot.className = 'section-nav-dot';
            dot.setAttribute('data-section', getSectionName(section));
            dot.setAttribute('data-index', index);
            dot.setAttribute('aria-label', `Go to ${getSectionName(section)}`);
            
            dot.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            
            sectionNav.appendChild(dot);
        });
    }
    
    // Update active section dot
    function updateActiveDot(sectionNav, sections) {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        
        let activeIndex = 0;
        sections.forEach((section, index) => {
            if (scrollPos >= section.offsetTop) {
                activeIndex = index;
            }
        });
        
        sectionNav.querySelectorAll('.section-nav-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
        
        return activeIndex;
    }
    
    // Update scroll progress bar
    function updateProgress(progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }
    
    // Show/hide back to top button
    function updateBackToTop(backToTop) {
        const scrollTop = window.scrollY;
        const showThreshold = 400;
        
        if (scrollTop > showThreshold) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // Show/hide section navigation
    function updateSectionNav(sectionNav) {
        const scrollTop = window.scrollY;
        const showThreshold = 200;
        
        if (scrollTop > showThreshold) {
            sectionNav.classList.add('visible');
        } else {
            sectionNav.classList.remove('visible');
        }
    }
    
    // Keyboard navigation
    function setupKeyboardNav(sections, keyboardHint) {
        let currentSection = 0;
        let keyboardUsed = false;
        
        document.addEventListener('keydown', (e) => {
            // Only on desktop
            if (window.innerWidth < 1024) return;
            
            // Ignore if typing in input
            if (e.target.matches('input, textarea, select')) return;
            
            switch(e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    e.preventDefault();
                    currentSection = Math.min(currentSection + 1, sections.length - 1);
                    sections[currentSection].scrollIntoView({ behavior: 'smooth', block: 'start' });
                    markKeyboardUsed();
                    break;
                    
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    currentSection = Math.max(currentSection - 1, 0);
                    sections[currentSection].scrollIntoView({ behavior: 'smooth', block: 'start' });
                    markKeyboardUsed();
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    currentSection = 0;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    markKeyboardUsed();
                    break;
                    
                case 'End':
                    e.preventDefault();
                    currentSection = sections.length - 1;
                    sections[currentSection].scrollIntoView({ behavior: 'smooth', block: 'start' });
                    markKeyboardUsed();
                    break;
            }
        });
        
        function markKeyboardUsed() {
            if (!keyboardUsed) {
                keyboardUsed = true;
                keyboardHint.classList.add('used');
            }
        }
        
        // Show keyboard hint briefly
        setTimeout(() => {
            keyboardHint.classList.add('visible');
        }, 2000);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            if (!keyboardUsed) {
                keyboardHint.classList.remove('visible');
            }
        }, 10000);
    }
    
    // Initialize
    function init() {
        const { container, progressBar, backToTop, sectionNav, keyboardHint } = createScrollHelpers();
        const sections = getSections();
        
        if (sections.length > 1) {
            createSectionDots(sectionNav, sections);
        }
        
        // Back to top click handler
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Scroll event handler (throttled)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateProgress(progressBar);
                    updateBackToTop(backToTop);
                    updateSectionNav(sectionNav);
                    if (sections.length > 1) {
                        updateActiveDot(sectionNav, sections);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Setup keyboard navigation
        if (sections.length > 1) {
            setupKeyboardNav(sections, keyboardHint);
        }
        
        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth < 1024) {
                    container.style.display = 'none';
                } else {
                    container.style.display = 'block';
                }
            }, 250);
        });
        
        // Initial state
        updateProgress(progressBar);
        updateBackToTop(backToTop);
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
