/* ═══════════════════════════════════════════════════════════════
   COOKIE CONSENT MANAGER
   GDPR Compliant Cookie Management
   ═══════════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    // Configuration
    const COOKIE_NAME = 'sgc_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;

    // Cookie Categories
    const COOKIE_CATEGORIES = {
        necessary: {
            name: 'Necessary',
            description: 'Essential cookies required for the website to function. These cannot be disabled.',
            required: true,
            default: true
        },
        analytics: {
            name: 'Analytics',
            description: 'Help us understand how visitors interact with our website by collecting anonymous usage data.',
            required: false,
            default: false
        },
        marketing: {
            name: 'Marketing',
            description: 'Used to track visitors across websites to display relevant advertisements.',
            required: false,
            default: false
        },
        functional: {
            name: 'Functional',
            description: 'Enable enhanced functionality and personalization, such as chat widgets and embedded videos.',
            required: false,
            default: false
        }
    };

    // State
    let preferences = null;

    /**
     * Initialize Cookie Consent
     */
    function init() {
        preferences = getStoredPreferences();
        
        if (!preferences) {
            // No consent given yet, show banner
            setTimeout(showBanner, 1000); // Delay for better UX
        } else {
            // Apply stored preferences
            applyPreferences(preferences);
        }

        // Bind events
        bindEvents();
    }

    /**
     * Create and inject banner HTML
     */
    function createBannerHTML() {
        const banner = document.createElement('div');
        banner.id = 'cookieConsentBanner';
        banner.className = 'cookie-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-labelledby', 'cookieConsentTitle');
        banner.setAttribute('aria-describedby', 'cookieConsentDesc');

        banner.innerHTML = `
            <div class="cookie-consent-container">
                <div class="cookie-consent-content">
                    <h4 id="cookieConsentTitle">
                        <i class="fas fa-cookie-bite" aria-hidden="true"></i>
                        Cookie Preferences
                    </h4>
                    <p id="cookieConsentDesc">
                        We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. 
                        By clicking "Accept All", you consent to our use of cookies. 
                        <a href="/privacy-policy.html#cookies">Learn more</a>
                    </p>
                </div>
                <div class="cookie-consent-buttons">
                    <button class="cookie-btn cookie-btn-accept" id="cookieAcceptAll">
                        Accept All
                    </button>
                    <button class="cookie-btn cookie-btn-settings" id="cookieSettings">
                        <i class="fas fa-cog" aria-hidden="true"></i>
                        Customize
                    </button>
                    <button class="cookie-btn cookie-btn-decline" id="cookieDecline">
                        Decline Optional
                    </button>
                </div>
            </div>
        `;

        return banner;
    }

    /**
     * Create and inject settings modal HTML
     */
    function createSettingsModalHTML() {
        const modal = document.createElement('div');
        modal.id = 'cookieSettingsModal';
        modal.className = 'cookie-settings-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'cookieSettingsTitle');
        modal.setAttribute('aria-modal', 'true');

        let categoriesHTML = '';
        for (const [key, category] of Object.entries(COOKIE_CATEGORIES)) {
            const isChecked = category.default ? 'checked' : '';
            const isDisabled = category.required ? 'disabled' : '';
            
            categoriesHTML += `
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h4>${category.name}</h4>
                        <label class="cookie-toggle">
                            <input type="checkbox" 
                                   id="cookie_${key}" 
                                   name="cookie_${key}" 
                                   ${isChecked} 
                                   ${isDisabled}
                                   data-category="${key}">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <p>${category.description}</p>
                </div>
            `;
        }

        modal.innerHTML = `
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h3 id="cookieSettingsTitle">Cookie Settings</h3>
                    <button class="cookie-settings-close" id="cookieSettingsClose" aria-label="Close settings">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="cookie-categories">
                    ${categoriesHTML}
                </div>
                <button class="cookie-settings-save" id="cookieSettingsSave">
                    Save Preferences
                </button>
            </div>
        `;

        return modal;
    }

    /**
     * Show the consent banner
     */
    function showBanner() {
        let banner = document.getElementById('cookieConsentBanner');
        let modal = document.getElementById('cookieSettingsModal');

        if (!banner) {
            banner = createBannerHTML();
            document.body.appendChild(banner);
        }

        if (!modal) {
            modal = createSettingsModalHTML();
            document.body.appendChild(modal);
        }

        // Trigger animation
        requestAnimationFrame(() => {
            banner.classList.add('active');
        });
    }

    /**
     * Hide the consent banner
     */
    function hideBanner() {
        const banner = document.getElementById('cookieConsentBanner');
        if (banner) {
            banner.classList.remove('active');
            setTimeout(() => {
                banner.classList.add('hidden');
            }, 400);
        }
    }

    /**
     * Show settings modal
     */
    function showSettingsModal() {
        const modal = document.getElementById('cookieSettingsModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            const closeBtn = document.getElementById('cookieSettingsClose');
            if (closeBtn) closeBtn.focus();
        }
    }

    /**
     * Hide settings modal
     */
    function hideSettingsModal() {
        const modal = document.getElementById('cookieSettingsModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    /**
     * Bind event listeners
     */
    function bindEvents() {
        document.addEventListener('click', function(e) {
            // Accept All
            if (e.target.id === 'cookieAcceptAll' || e.target.closest('#cookieAcceptAll')) {
                acceptAll();
            }
            
            // Decline Optional
            if (e.target.id === 'cookieDecline' || e.target.closest('#cookieDecline')) {
                declineOptional();
            }
            
            // Open Settings
            if (e.target.id === 'cookieSettings' || e.target.closest('#cookieSettings')) {
                showSettingsModal();
            }
            
            // Close Settings
            if (e.target.id === 'cookieSettingsClose' || e.target.closest('#cookieSettingsClose')) {
                hideSettingsModal();
            }
            
            // Save Settings
            if (e.target.id === 'cookieSettingsSave' || e.target.closest('#cookieSettingsSave')) {
                saveSettings();
            }

            // Close modal on backdrop click
            if (e.target.id === 'cookieSettingsModal') {
                hideSettingsModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modal = document.getElementById('cookieSettingsModal');
                if (modal && modal.classList.contains('active')) {
                    hideSettingsModal();
                }
            }
        });
    }

    /**
     * Accept all cookies
     */
    function acceptAll() {
        const prefs = {};
        for (const key of Object.keys(COOKIE_CATEGORIES)) {
            prefs[key] = true;
        }
        savePreferences(prefs);
        hideBanner();
        hideSettingsModal();
        
        // Track consent (if analytics is available)
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted'
            });
        }
    }

    /**
     * Decline optional cookies (only accept necessary)
     */
    function declineOptional() {
        const prefs = {};
        for (const [key, category] of Object.entries(COOKIE_CATEGORIES)) {
            prefs[key] = category.required;
        }
        savePreferences(prefs);
        hideBanner();
        
        // Track consent denial
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied'
            });
        }
    }

    /**
     * Save settings from modal
     */
    function saveSettings() {
        const prefs = {};
        for (const key of Object.keys(COOKIE_CATEGORIES)) {
            const checkbox = document.getElementById(`cookie_${key}`);
            prefs[key] = checkbox ? checkbox.checked : COOKIE_CATEGORIES[key].default;
        }
        savePreferences(prefs);
        hideBanner();
        hideSettingsModal();
        
        // Update consent mode
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': prefs.analytics ? 'granted' : 'denied',
                'ad_storage': prefs.marketing ? 'granted' : 'denied'
            });
        }
    }

    /**
     * Save preferences to cookie
     */
    function savePreferences(prefs) {
        preferences = prefs;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
        
        const cookieValue = {
            preferences: prefs,
            timestamp: Date.now(),
            version: '1.0'
        };

        document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(cookieValue))}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
        
        applyPreferences(prefs);
    }

    /**
     * Get stored preferences from cookie
     */
    function getStoredPreferences() {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === COOKIE_NAME) {
                try {
                    const data = JSON.parse(decodeURIComponent(value));
                    return data.preferences;
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    }

    /**
     * Apply preferences (enable/disable scripts)
     */
    function applyPreferences(prefs) {
        // Analytics
        if (prefs.analytics) {
            enableAnalytics();
        }

        // Marketing
        if (prefs.marketing) {
            enableMarketing();
        }

        // Functional
        if (prefs.functional) {
            enableFunctional();
        }

        // Dispatch event for other scripts
        window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: prefs }));
    }

    /**
     * Enable analytics scripts
     */
    function enableAnalytics() {
        // Google Analytics - Uncomment and configure if needed
        // Example:
        // const script = document.createElement('script');
        // script.async = true;
        // script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID';
        // document.head.appendChild(script);
        console.log('Analytics cookies enabled');
    }

    /**
     * Enable marketing scripts
     */
    function enableMarketing() {
        // Facebook Pixel, LinkedIn Insight, etc.
        console.log('Marketing cookies enabled');
    }

    /**
     * Enable functional scripts
     */
    function enableFunctional() {
        // Third-party widgets, embedded content, etc.
        console.log('Functional cookies enabled');
    }

    /**
     * Public API
     */
    window.CookieConsent = {
        show: showBanner,
        hide: hideBanner,
        showSettings: showSettingsModal,
        getPreferences: () => preferences,
        updatePreferences: savePreferences,
        resetConsent: function() {
            document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            preferences = null;
            showBanner();
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
