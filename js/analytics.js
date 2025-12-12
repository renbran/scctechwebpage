// SGC TECH AI - Google Analytics 4 Tracking Module
// PROMPT 3 Implementation: Comprehensive event tracking and conversion monitoring

(function() {
    'use strict';

    // ========== CONFIGURATION ==========
    const GA4_CONFIG = {
        measurementId: 'G-XXXXXXXXXX', // Replace with actual GA4 Measurement ID
        debug: false, // Set to true for development testing
        enabled: typeof gtag !== 'undefined' // Only track if gtag is loaded
    };

    // ========== UTILITY FUNCTIONS ==========
    
    /**
     * Send event to Google Analytics 4
     * @param {string} eventName - Name of the event
     * @param {object} eventParams - Event parameters
     */
    function trackEvent(eventName, eventParams = {}) {
        if (!GA4_CONFIG.enabled) {
            if (GA4_CONFIG.debug) {
                console.log('[GA4 Debug] Event would be sent:', eventName, eventParams);
            }
            return;
        }

        try {
            gtag('event', eventName, eventParams);
            
            if (GA4_CONFIG.debug) {
                console.log('[GA4] Event sent:', eventName, eventParams);
            }
        } catch (error) {
            console.error('[GA4] Error tracking event:', error);
        }
    }

    /**
     * Track page view (already handled by gtag.js but included for completeness)
     * @param {string} pageTitle - Page title
     * @param {string} pagePath - Page path
     */
    function trackPageView(pageTitle, pagePath) {
        trackEvent('page_view', {
            page_title: pageTitle,
            page_path: pagePath,
            page_location: window.location.href
        });
    }

    // ========== WHATSAPP CLICK TRACKING ==========
    
    function initWhatsAppTracking() {
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
        
        whatsappLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const phoneNumber = this.href.match(/\d+/)?.[0] || 'unknown';
                const buttonLocation = this.closest('section')?.className || 'unknown';
                const buttonText = this.textContent.trim() || this.getAttribute('aria-label') || 'WhatsApp';
                
                trackEvent('whatsapp_click', {
                    button_location: buttonLocation,
                    button_text: buttonText,
                    phone_number: phoneNumber,
                    event_category: 'engagement',
                    event_label: 'WhatsApp Contact'
                });
            });
        });
        
        console.log(`[GA4] WhatsApp tracking initialized (${whatsappLinks.length} buttons)`);
    }

    // ========== ROI CALCULATOR TRACKING ==========
    
    function initROICalculatorTracking() {
        const calculateButton = document.getElementById('calculateROI');
        const roiForm = document.querySelector('.roi-calculator-form');
        
        if (calculateButton) {
            calculateButton.addEventListener('click', function() {
                // Get form values
                const employees = document.getElementById('employees')?.value || 0;
                const currentCosts = document.getElementById('currentCosts')?.value || 0;
                const industry = document.getElementById('industry')?.value || 'unknown';
                
                trackEvent('roi_calculator_used', {
                    employees: parseInt(employees),
                    monthly_costs: parseInt(currentCosts),
                    industry: industry,
                    event_category: 'conversion',
                    event_label: 'ROI Calculator Calculation'
                });
            });
        }
        
        // Track ROI calculator modal open
        const roiButtons = document.querySelectorAll('[data-open-calculator], .open-calculator');
        roiButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                trackEvent('roi_calculator_opened', {
                    trigger_location: this.closest('section')?.className || 'unknown',
                    event_category: 'engagement',
                    event_label: 'ROI Calculator Opened'
                });
            });
        });
        
        console.log('[GA4] ROI Calculator tracking initialized');
    }

    // ========== FORM SUBMISSION TRACKING ==========
    
    function initFormTracking() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const formId = this.id || 'unknown';
                const formAction = this.action || 'unknown';
                const formLocation = this.closest('section')?.className || 'unknown';
                
                trackEvent('form_submission', {
                    form_id: formId,
                    form_action: formAction,
                    form_location: formLocation,
                    event_category: 'conversion',
                    event_label: `Form Submitted: ${formId}`
                });
            });
        });
        
        console.log(`[GA4] Form tracking initialized (${forms.length} forms)`);
    }

    // ========== PHONE CLICK TRACKING ==========
    
    function initPhoneTracking() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        
        phoneLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const phoneNumber = this.href.replace('tel:', '');
                const buttonLocation = this.closest('section')?.className || 'unknown';
                
                trackEvent('phone_click', {
                    phone_number: phoneNumber,
                    button_location: buttonLocation,
                    event_category: 'engagement',
                    event_label: 'Phone Number Clicked'
                });
            });
        });
        
        console.log(`[GA4] Phone tracking initialized (${phoneLinks.length} buttons)`);
    }

    // ========== EMAIL CLICK TRACKING ==========
    
    function initEmailTracking() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const email = this.href.replace('mailto:', '').split('?')[0];
                const buttonLocation = this.closest('section')?.className || 'unknown';
                
                trackEvent('email_click', {
                    email_address: email,
                    button_location: buttonLocation,
                    event_category: 'engagement',
                    event_label: 'Email Clicked'
                });
            });
        });
        
        console.log(`[GA4] Email tracking initialized (${emailLinks.length} links)`);
    }

    // ========== CTA BUTTON TRACKING ==========
    
    function initCTATracking() {
        const ctaButtons = document.querySelectorAll('.btn-primary, .cta-button, .btn-cta');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const buttonText = this.textContent.trim();
                const buttonHref = this.href || 'no-link';
                const buttonLocation = this.closest('section')?.className || 'unknown';
                
                trackEvent('cta_click', {
                    button_text: buttonText,
                    button_href: buttonHref,
                    button_location: buttonLocation,
                    event_category: 'engagement',
                    event_label: `CTA: ${buttonText}`
                });
            });
        });
        
        console.log(`[GA4] CTA tracking initialized (${ctaButtons.length} buttons)`);
    }

    // ========== NAVIGATION TRACKING ==========
    
    function initNavigationTracking() {
        const navLinks = document.querySelectorAll('.nav-menu a, nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const linkText = this.textContent.trim();
                const linkHref = this.href;
                
                trackEvent('navigation_click', {
                    link_text: linkText,
                    link_url: linkHref,
                    event_category: 'engagement',
                    event_label: `Navigation: ${linkText}`
                });
            });
        });
        
        console.log(`[GA4] Navigation tracking initialized (${navLinks.length} links)`);
    }

    // ========== SCROLL DEPTH TRACKING ==========
    
    function initScrollTracking() {
        const scrollMilestones = [25, 50, 75, 90, 100];
        const trackedMilestones = new Set();
        
        function checkScrollDepth() {
            const scrollPercent = Math.round(
                (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
            );
            
            scrollMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
                    trackedMilestones.add(milestone);
                    
                    trackEvent('scroll_depth', {
                        percent_scrolled: milestone,
                        page_path: window.location.pathname,
                        event_category: 'engagement',
                        event_label: `Scrolled ${milestone}%`
                    });
                }
            });
        }
        
        // Throttle scroll events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(checkScrollDepth, 200);
        });
        
        console.log('[GA4] Scroll depth tracking initialized');
    }

    // ========== VIDEO PLAY TRACKING ==========
    
    function initVideoTracking() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            const videoName = video.getAttribute('data-video-name') || 
                             video.id || 
                             'unnamed-video';
            
            video.addEventListener('play', function() {
                trackEvent('video_play', {
                    video_name: videoName,
                    video_url: this.src || 'inline-video',
                    event_category: 'engagement',
                    event_label: `Video Play: ${videoName}`
                });
            });
            
            video.addEventListener('ended', function() {
                trackEvent('video_complete', {
                    video_name: videoName,
                    video_url: this.src || 'inline-video',
                    event_category: 'engagement',
                    event_label: `Video Complete: ${videoName}`
                });
            });
        });
        
        if (videos.length > 0) {
            console.log(`[GA4] Video tracking initialized (${videos.length} videos)`);
        }
    }

    // ========== FILE DOWNLOAD TRACKING ==========
    
    function initDownloadTracking() {
        const downloadLinks = document.querySelectorAll('a[download], a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".xls"], a[href$=".xlsx"]');
        
        downloadLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const fileName = this.download || this.href.split('/').pop();
                const fileType = fileName.split('.').pop() || 'unknown';
                
                trackEvent('file_download', {
                    file_name: fileName,
                    file_type: fileType,
                    file_url: this.href,
                    event_category: 'engagement',
                    event_label: `Download: ${fileName}`
                });
            });
        });
        
        if (downloadLinks.length > 0) {
            console.log(`[GA4] Download tracking initialized (${downloadLinks.length} links)`);
        }
    }

    // ========== OUTBOUND LINK TRACKING ==========
    
    function initOutboundLinkTracking() {
        const outboundLinks = document.querySelectorAll('a[href^="http"]');
        const currentDomain = window.location.hostname;
        
        outboundLinks.forEach(link => {
            const linkDomain = new URL(link.href).hostname;
            
            if (linkDomain !== currentDomain) {
                link.addEventListener('click', function(e) {
                    trackEvent('outbound_click', {
                        link_url: this.href,
                        link_domain: linkDomain,
                        link_text: this.textContent.trim(),
                        event_category: 'engagement',
                        event_label: `Outbound: ${linkDomain}`
                    });
                });
            }
        });
        
        console.log('[GA4] Outbound link tracking initialized');
    }

    // ========== CONVERSION EVENTS ==========
    
    /**
     * Track conversion when user submits contact form
     */
    function trackContactFormConversion(formData) {
        trackEvent('generate_lead', {
            currency: 'AED',
            value: 15000, // Estimated minimum package value
            form_type: 'contact',
            event_category: 'conversion',
            event_label: 'Contact Form Lead'
        });
    }

    /**
     * Track conversion when user books appointment
     */
    function trackAppointmentBooking() {
        trackEvent('schedule_appointment', {
            currency: 'AED',
            value: 0, // Free consultation
            event_category: 'conversion',
            event_label: 'Appointment Booked'
        });
    }

    /**
     * Track conversion when user uses ROI calculator and shows interest
     */
    function trackROICalculatorLead() {
        trackEvent('roi_calculator_lead', {
            currency: 'AED',
            value: 15000, // Estimated value
            event_category: 'conversion',
            event_label: 'ROI Calculator Lead'
        });
    }

    // ========== INITIALIZATION ==========
    
    function initAnalytics() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
        
        function init() {
            console.log('[GA4] Analytics module initializing...');
            
            // Initialize all tracking modules
            initWhatsAppTracking();
            initROICalculatorTracking();
            initFormTracking();
            initPhoneTracking();
            initEmailTracking();
            initCTATracking();
            initNavigationTracking();
            initScrollTracking();
            initVideoTracking();
            initDownloadTracking();
            initOutboundLinkTracking();
            
            console.log('[GA4] ✅ All tracking modules initialized successfully!');
        }
    }

    // Auto-initialize
    initAnalytics();

    // Expose public API for manual tracking
    window.SGCAnalytics = {
        trackEvent,
        trackPageView,
        trackContactFormConversion,
        trackAppointmentBooking,
        trackROICalculatorLead
    };

    console.log('%cSGC TECH AI Analytics', 'color: #00FFF0; font-weight: bold; font-size: 14px;');
    console.log('✅ Google Analytics 4 tracking module loaded');

})();
