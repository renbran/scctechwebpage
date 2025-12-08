// SGC TECH AI - Supabase Integration
// Stores leads, form submissions, and ROI calculator results

(function() {
    'use strict';

    // Supabase Configuration
    const SUPABASE_URL = 'https://ubkccylvneiyxqkgkyqi.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVia2NjeWx2bmVpeXhxa2dreXFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMTEzNDgsImV4cCI6MjA4MDc4NzM0OH0.i28wHaiXIQ43q0fyGMLlS58WUcvEYpbSM1Ni-ihy7HQ';

    // Initialize Supabase client
    let supabase = null;

    // Wait for Supabase library to load
    function initSupabase() {
        if (window.supabase) {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase connected');
            return true;
        }
        return false;
    }

    // Retry initialization
    function waitForSupabase(callback, maxRetries = 10) {
        let retries = 0;
        const interval = setInterval(() => {
            if (initSupabase()) {
                clearInterval(interval);
                if (callback) callback();
            } else if (retries >= maxRetries) {
                clearInterval(interval);
                console.warn('⚠️ Supabase library not loaded');
            }
            retries++;
        }, 500);
    }

    // ========== Lead Capture Functions ==========

    // Save a new lead to Supabase
    async function saveLead(leadData) {
        if (!supabase) {
            console.warn('Supabase not initialized');
            return { success: false, error: 'Supabase not initialized' };
        }

        try {
            const { data, error } = await supabase
                .from('leads')
                .insert([{
                    name: leadData.name || null,
                    email: leadData.email || null,
                    phone: leadData.phone || null,
                    company: leadData.company || null,
                    industry: leadData.industry || null,
                    employees: leadData.employees || null,
                    message: leadData.message || null,
                    source: leadData.source || 'website',
                    page_url: window.location.href,
                    created_at: new Date().toISOString()
                }]);

            if (error) {
                console.error('Error saving lead:', error);
                return { success: false, error: error.message };
            }

            console.log('✅ Lead saved successfully');
            return { success: true, data };
        } catch (err) {
            console.error('Exception saving lead:', err);
            return { success: false, error: err.message };
        }
    }

    // Save ROI Calculator results
    async function saveROICalculation(calcData) {
        if (!supabase) {
            console.warn('Supabase not initialized');
            return { success: false, error: 'Supabase not initialized' };
        }

        try {
            const { data, error } = await supabase
                .from('roi_calculations')
                .insert([{
                    email: calcData.email || null,
                    phone: calcData.phone || null,
                    company: calcData.company || null,
                    industry: calcData.industry || null,
                    employees: calcData.employees || null,
                    current_cost: calcData.currentCost || null,
                    projected_savings: calcData.projectedSavings || null,
                    roi_percentage: calcData.roiPercentage || null,
                    payback_months: calcData.paybackMonths || null,
                    modules_selected: calcData.modules || null,
                    page_url: window.location.href,
                    created_at: new Date().toISOString()
                }]);

            if (error) {
                console.error('Error saving ROI calculation:', error);
                return { success: false, error: error.message };
            }

            console.log('✅ ROI calculation saved successfully');
            return { success: true, data };
        } catch (err) {
            console.error('Exception saving ROI:', err);
            return { success: false, error: err.message };
        }
    }

    // Save appointment booking
    async function saveAppointment(appointmentData) {
        if (!supabase) {
            console.warn('Supabase not initialized');
            return { success: false, error: 'Supabase not initialized' };
        }

        try {
            const { data, error } = await supabase
                .from('appointments')
                .insert([{
                    name: appointmentData.name || null,
                    email: appointmentData.email || null,
                    phone: appointmentData.phone || null,
                    company: appointmentData.company || null,
                    preferred_date: appointmentData.date || null,
                    preferred_time: appointmentData.time || null,
                    message: appointmentData.message || null,
                    source: 'website',
                    page_url: window.location.href,
                    created_at: new Date().toISOString()
                }]);

            if (error) {
                console.error('Error saving appointment:', error);
                return { success: false, error: error.message };
            }

            console.log('✅ Appointment saved successfully');
            return { success: true, data };
        } catch (err) {
            console.error('Exception saving appointment:', err);
            return { success: false, error: err.message };
        }
    }

    // Track page visit
    async function trackPageVisit() {
        if (!supabase) return;

        try {
            await supabase
                .from('page_visits')
                .insert([{
                    page_url: window.location.href,
                    page_title: document.title,
                    referrer: document.referrer || null,
                    user_agent: navigator.userAgent,
                    created_at: new Date().toISOString()
                }]);
        } catch (err) {
            // Silently fail for analytics
        }
    }

    // ========== Form Handlers ==========

    // Auto-attach to contact forms
    function attachFormHandlers() {
        // Generic contact form handler
        const contactForms = document.querySelectorAll('form[data-supabase="lead"], .contact-form, #contactForm');
        contactForms.forEach(form => {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(form);
                const leadData = {
                    name: formData.get('name') || formData.get('fullName'),
                    email: formData.get('email'),
                    phone: formData.get('phone') || formData.get('telephone'),
                    company: formData.get('company') || formData.get('companyName'),
                    industry: formData.get('industry'),
                    employees: formData.get('employees'),
                    message: formData.get('message') || formData.get('comments'),
                    source: 'contact_form'
                };

                const result = await saveLead(leadData);
                
                if (result.success) {
                    // Show success message
                    showNotification('Thank you! We\'ll be in touch soon.', 'success');
                    form.reset();
                } else {
                    showNotification('Something went wrong. Please try again.', 'error');
                }
            });
        });
    }

    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `supabase-notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00FF88 0%, #00cc6a 100%)' : 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 99999;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // ========== Expose Global Functions ==========
    window.SGCSupabase = {
        saveLead,
        saveROICalculation,
        saveAppointment,
        trackPageVisit,
        isConnected: () => supabase !== null
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            waitForSupabase(() => {
                attachFormHandlers();
                trackPageVisit();
            });
        });
    } else {
        waitForSupabase(() => {
            attachFormHandlers();
            trackPageVisit();
        });
    }

})();
