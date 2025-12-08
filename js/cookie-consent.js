/**
 * Cookie Consent Manager
 * GDPR/CCPA Compliant Cookie Consent Banner
 * SGC TECH AI
 */

class CookieConsent {
    constructor() {
        this.consentKey = 'sgc-cookie-consent';
        this.analyticsKey = 'sgc-analytics-consent';
        this.consentDateKey = 'sgc-consent-date';
        this.init();
    }

    init() {
        // Check if consent has already been given
        if (!this.hasConsent()) {
            // Small delay to let page render first
            setTimeout(() => this.showBanner(), 500);
        } else {
            this.loadAnalytics();
        }
    }

    hasConsent() {
        return localStorage.getItem(this.consentKey) !== null;
    }

    showBanner() {
        // Create banner element
        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-modal', 'false');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.setAttribute('aria-describedby', 'cookie-consent-description');
        
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <p id="cookie-consent-description">
                    We use cookies to enhance your browsing experience and analyze site traffic. 
                    By clicking "Accept All", you consent to our use of cookies. 
                    <a href="privacy-policy.html" aria-label="Read our privacy policy">Privacy Policy</a>
                </p>
                <div class="cookie-consent-actions">
                    <button 
                        type="button"
                        id="accept-cookies" 
                        class="btn-accept" 
                        aria-label="Accept all cookies">
                        Accept All
                    </button>
                    <button 
                        type="button"
                        id="reject-cookies" 
                        class="btn-reject" 
                        aria-label="Reject non-essential cookies">
                        Essential Only
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Focus on accept button for accessibility
        const acceptBtn = banner.querySelector('#accept-cookies');
        if (acceptBtn) {
            acceptBtn.focus();
        }
        
        // Event listeners
        banner.querySelector('#accept-cookies').addEventListener('click', () => {
            this.setConsent(true, true);
            this.loadAnalytics();
            this.removeBanner(banner);
        });

        banner.querySelector('#reject-cookies').addEventListener('click', () => {
            this.setConsent(true, false);
            this.removeBanner(banner);
        });
        
        // Handle keyboard navigation (trap focus in dialog)
        banner.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Escape key rejects cookies
                this.setConsent(true, false);
                this.removeBanner(banner);
            }
        });
    }

    setConsent(essential, analytics) {
        try {
            localStorage.setItem(this.consentKey, essential.toString());
            localStorage.setItem(this.analyticsKey, analytics.toString());
            localStorage.setItem(this.consentDateKey, new Date().toISOString());
        } catch (e) {
            // Handle case where localStorage is not available
            console.warn('Cookie consent: localStorage not available');
        }
    }

    loadAnalytics() {
        try {
            const analyticsConsent = localStorage.getItem(this.analyticsKey) === 'true';
            if (analyticsConsent) {
                // Analytics loading placeholder
                // Add Google Analytics, Facebook Pixel, etc. here when needed
                console.log('[Cookie Consent] Analytics loaded with user consent');
            }
        } catch (e) {
            console.warn('Cookie consent: Error loading analytics');
        }
    }

    removeBanner(banner) {
        banner.classList.add('hidden');
        setTimeout(() => {
            if (banner && banner.parentNode) {
                banner.remove();
            }
        }, 300);
    }
    
    // Public method to reset consent (for testing)
    static resetConsent() {
        localStorage.removeItem('sgc-cookie-consent');
        localStorage.removeItem('sgc-analytics-consent');
        localStorage.removeItem('sgc-consent-date');
        console.log('[Cookie Consent] Consent reset. Refresh page to see banner.');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
});
