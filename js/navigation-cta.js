/**
 * SGC TECH AI - Navigation & CTA Controller
 * PROMPT 8 Implementation
 * Version: 2025-12-12
 * 
 * Features:
 * - Sticky navigation with scroll detection
 * - Mobile menu toggle with overlay
 * - Active page highlighting
 * - Floating CTA with scroll trigger
 * - Multi-channel contact tracking
 */

(function() {
    'use strict';
    
    // ========== Configuration ==========
    const CONFIG = {
        scrollThreshold: 100,
        floatingCtaScrollPercent: 50,
        mobileBreakpoint: 992
    };
    
    // ========== DOM Elements ==========
    const elements = {
        header: null,
        navToggle: null,
        navMenu: null,
        navOverlay: null,
        navLinks: null,
        floatingCta: null
    };
    
    // ========== Initialize ==========
    function init() {
        // Cache DOM elements
        cacheElements();
        
        // Setup event listeners
        setupNavigationToggle();
        setupScrollEffects();
        setupActivePageHighlight();
        setupFloatingCTA();
        setupContactTracking();
        setupAccessibility();
        
        console.log('✓ Navigation & CTA system initialized');
    }
    
    // ========== Cache DOM Elements ==========
    function cacheElements() {
        elements.header = document.querySelector('.header');
        elements.navToggle = document.getElementById('navToggle');
        elements.navMenu = document.getElementById('navMenu');
        elements.navLinks = document.querySelectorAll('.nav-menu a');
        elements.floatingCta = document.querySelector('.floating-cta');
        
        // Create overlay if it doesn't exist
        if (!document.querySelector('.nav-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            overlay.id = 'navOverlay';
            document.body.appendChild(overlay);
        }
        elements.navOverlay = document.getElementById('navOverlay');
    }
    
    // ========== Navigation Toggle (Mobile) ==========
    function setupNavigationToggle() {
        if (!elements.navToggle || !elements.navMenu) return;
        
        // Toggle button click
        elements.navToggle.addEventListener('click', toggleMobileMenu);
        
        // Overlay click (close menu)
        if (elements.navOverlay) {
            elements.navOverlay.addEventListener('click', closeMobileMenu);
        }
        
        // Close menu when clicking on nav links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < CONFIG.mobileBreakpoint) {
                    closeMobileMenu();
                }
            });
        });
        
        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth >= CONFIG.mobileBreakpoint) {
                    closeMobileMenu();
                }
            }, 250);
        });
    }
    
    function toggleMobileMenu() {
        const isActive = elements.navMenu.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        elements.navMenu.classList.add('active');
        elements.navToggle.classList.add('active');
        if (elements.navOverlay) {
            elements.navOverlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
        
        // GA4 tracking
        trackEvent('navigation_menu_opened', {
            event_category: 'Navigation',
            event_label: 'Mobile Menu Opened'
        });
    }
    
    function closeMobileMenu() {
        elements.navMenu.classList.remove('active');
        elements.navToggle.classList.remove('active');
        if (elements.navOverlay) {
            elements.navOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    // ========== Scroll Effects ==========
    function setupScrollEffects() {
        if (!elements.header) return;
        
        let lastScroll = 0;
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            lastScroll = window.pageYOffset;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll(lastScroll);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    function handleScroll(scrollPos) {
        // Add scrolled class to header
        if (scrollPos > CONFIG.scrollThreshold) {
            elements.header.classList.add('scrolled');
        } else {
            elements.header.classList.remove('scrolled');
        }
        
        // Show/hide floating CTA
        handleFloatingCTA(scrollPos);
    }
    
    // ========== Active Page Highlighting ==========
    function setupActivePageHighlight() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        elements.navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Remove existing active classes
            link.classList.remove('active');
            
            // Add active class to current page
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'index.html' && linkHref === '/')) {
                link.classList.add('active');
            }
            
            // Special case for services, blog, case-studies
            if (currentPage.includes('services/') && linkHref.includes('services')) {
                link.classList.add('active');
            }
            if (currentPage.includes('blog/') && linkHref.includes('blog')) {
                link.classList.add('active');
            }
            if (currentPage.includes('case-studies/') && linkHref.includes('success-stories')) {
                link.classList.add('active');
            }
        });
    }
    
    // ========== Floating CTA ==========
    function setupFloatingCTA() {
        if (!elements.floatingCta) return;
        
        // Initially hide
        elements.floatingCta.style.bottom = '-100px';
        
        // Track click
        elements.floatingCta.addEventListener('click', (e) => {
            trackEvent('floating_cta_clicked', {
                event_category: 'CTA',
                event_label: 'Floating CTA',
                cta_text: elements.floatingCta.textContent.trim()
            });
        });
    }
    
    function handleFloatingCTA(scrollPos) {
        if (!elements.floatingCta) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercent = (scrollPos / (documentHeight - windowHeight)) * 100;
        
        if (scrollPercent >= CONFIG.floatingCtaScrollPercent) {
            elements.floatingCta.classList.add('visible');
        } else {
            elements.floatingCta.classList.remove('visible');
        }
    }
    
    // ========== Contact Tracking ==========
    function setupContactTracking() {
        // Track all contact card clicks
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const cardType = card.classList.contains('phone') ? 'Phone' :
                                card.classList.contains('email') ? 'Email' :
                                card.classList.contains('whatsapp') ? 'WhatsApp' :
                                card.classList.contains('schedule') ? 'Schedule' : 'Unknown';
                
                trackEvent('contact_method_clicked', {
                    event_category: 'Contact',
                    event_label: `Multi-Channel - ${cardType}`,
                    contact_method: cardType.toLowerCase()
                });
            });
        });
        
        // Track all CTA button clicks
        const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .btn-nav-cta');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ctaText = button.textContent.trim();
                const ctaType = button.classList.contains('cta-primary') ? 'Primary' :
                               button.classList.contains('cta-secondary') ? 'Secondary' : 'Navigation';
                
                trackEvent('cta_clicked', {
                    event_category: 'CTA',
                    event_label: `${ctaType} - ${ctaText}`,
                    cta_type: ctaType.toLowerCase(),
                    cta_text: ctaText
                });
            });
        });
    }
    
    // ========== Accessibility ==========
    function setupAccessibility() {
        // Make nav toggle keyboard accessible
        if (elements.navToggle) {
            elements.navToggle.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMobileMenu();
                }
            });
        }
        
        // Trap focus in mobile menu when open
        if (elements.navMenu) {
            elements.navMenu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && elements.navMenu.classList.contains('active')) {
                    trapFocus(e);
                }
            });
        }
    }
    
    function trapFocus(e) {
        const focusableElements = elements.navMenu.querySelectorAll(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    // ========== Analytics Helper ==========
    function trackEvent(eventName, params = {}) {
        // Check if GTM dataLayer exists
        if (typeof window.dataLayer !== 'undefined') {
            window.dataLayer.push({
                event: eventName,
                ...params,
                timestamp: new Date().toISOString()
            });
        }
        
        // Fallback console log for debugging
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('🎯 GA4 Event:', eventName, params);
        }
    }
    
    // ========== Public API ==========
    window.SGCNavigation = {
        openMenu: openMobileMenu,
        closeMenu: closeMobileMenu,
        toggleMenu: toggleMobileMenu
    };
    
    // ========== Auto-Initialize ==========
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
