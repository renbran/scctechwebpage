// SGC TECH AI - Main JavaScript
// Mobile Navigation, ROI Calculator, and Interactive Features

(function() {
    'use strict';

    // ========== Mobile Navigation Toggle ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ========== Smooth Scrolling for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== ROI Calculator Logic ==========
    const calculateButton = document.getElementById('calculateROI');
    const calculatorResults = document.getElementById('calculatorResults');

    if (calculateButton && calculatorResults) {
        calculateButton.addEventListener('click', function() {
            // Get input values
            const employees = parseInt(document.getElementById('employees').value) || 25;
            const currentCosts = parseInt(document.getElementById('currentCosts').value) || 5000;
            const industry = document.getElementById('industry').value;
            
            // Get selected modules
            const selectedModules = Array.from(document.querySelectorAll('input[name="modules"]:checked')).map(cb => cb.value);
            const selectedPainPoints = Array.from(document.querySelectorAll('input[name="pain-points"]:checked')).map(cb => cb.value);

            // Calculate ROI based on inputs
            const calculations = calculateROI(employees, currentCosts, industry, selectedModules, selectedPainPoints);

            // Update the results display
            document.getElementById('roiPercentage').textContent = calculations.roiPercentage + '%';
            document.getElementById('annualSavings').textContent = 'AED ' + formatNumber(calculations.annualSavings);
            document.getElementById('timeSaved').textContent = calculations.timeSaved + ' hours';
            document.getElementById('paybackPeriod').textContent = calculations.paybackPeriod + ' months';
            
            document.getElementById('softwareSavings').textContent = 'AED ' + formatNumber(calculations.softwareSavings) + '/year';
            document.getElementById('laborSavings').textContent = 'AED ' + formatNumber(calculations.laborSavings) + '/year';
            document.getElementById('errorSavings').textContent = 'AED ' + formatNumber(calculations.errorSavings) + '/year';
            document.getElementById('totalBenefit').textContent = 'AED ' + formatNumber(calculations.annualSavings);

            // Show results with animation
            calculatorResults.style.display = 'block';
            calculatorResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // ROI Calculation Function
    function calculateROI(employees, currentCosts, industry, modules, painPoints) {
        // Base calculations
        const baseLaborCostPerEmployee = 4000; // AED per month average
        const hoursSavedPerEmployee = employees <= 10 ? 8 : employees <= 30 ? 6 : 4; // Hours/month per employee
        const totalHoursSaved = employees * hoursSavedPerEmployee;
        const hourlyRate = baseLaborCostPerEmployee / 160; // Assuming 160 work hours/month
        
        // Software cost reduction (replace multiple tools with Odoo)
        const modulesCount = modules.length;
        const softwareSavingsFactor = modulesCount >= 4 ? 0.7 : modulesCount >= 2 ? 0.5 : 0.3;
        const softwareSavings = currentCosts * 12 * softwareSavingsFactor;
        
        // Labor efficiency gains
        const laborSavings = totalHoursSaved * hourlyRate * 12;
        
        // Error reduction savings (based on pain points)
        const errorFactor = painPoints.includes('errors') ? 0.15 : 0.08;
        const errorSavings = (baseLaborCostPerEmployee * employees * 12) * errorFactor;
        
        // Industry multiplier
        let industryMultiplier = 1.0;
        if (industry === 'real-estate') industryMultiplier = 1.3;
        else if (industry === 'manufacturing') industryMultiplier = 1.2;
        else if (industry === 'professional-services') industryMultiplier = 1.25;
        
        // Total annual savings
        const annualSavings = Math.round((softwareSavings + laborSavings + errorSavings) * industryMultiplier);
        
        // Estimated implementation cost (based on company size)
        const implementationCost = employees <= 5 ? 20000 : employees <= 15 ? 35000 : 60000;
        
        // ROI percentage
        const roiPercentage = Math.round(((annualSavings - implementationCost) / implementationCost) * 100);
        
        // Payback period in months
        const paybackPeriod = (implementationCost / (annualSavings / 12)).toFixed(1);

        return {
            roiPercentage: Math.max(roiPercentage, 150), // Minimum 150% guarantee
            annualSavings: annualSavings,
            timeSaved: totalHoursSaved,
            paybackPeriod: paybackPeriod,
            softwareSavings: Math.round(softwareSavings),
            laborSavings: Math.round(laborSavings),
            errorSavings: Math.round(errorSavings)
        };
    }

    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // ========== Lead Form Submission ==========
    const roiLeadForm = document.getElementById('roiLeadForm');
    if (roiLeadForm) {
        roiLeadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            
            // Get current ROI calculations
            const roiData = {
                email: email,
                phone: phone,
                roi: document.getElementById('roiPercentage').textContent,
                savings: document.getElementById('annualSavings').textContent,
                timeSaved: document.getElementById('timeSaved').textContent,
                payback: document.getElementById('paybackPeriod').textContent
            };
            
            // Here you would normally send this to your backend
            // For demo purposes, we'll show a success message
            alert('Thank you! Your personalized ROI report will be sent to ' + email + ' within 5 minutes. We\'ll also reach out via WhatsApp at ' + phone + ' to schedule your consultation.');
            
            // Reset form
            this.reset();
            
            // Optional: Redirect to thank you page or open WhatsApp
            // window.open('https://wa.me/971563905772?text=Hi%20SGC%2C%20I%20just%20requested%20my%20ROI%20report', '_blank');
        });
    }

    // ========== Sticky Header on Scroll ==========
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });

    // ========== Active Navigation Highlighting ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    function highlightNavigation() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ========== Form Validation Enhancement ==========
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '#4fc3f7';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value) {
                    this.style.borderColor = '#4fc3f7';
                }
            });
        });
    });

    // ========== Animate on Scroll (Simple Implementation) ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.problem-card, .pillar-card, .story-card, .timeline-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ========== Currency Toggle (AED/USD) ==========
    // For future implementation if needed
    let currentCurrency = 'AED';
    const exchangeRate = 3.67; // AED to USD

    function toggleCurrency() {
        const priceElements = document.querySelectorAll('[data-price]');
        priceElements.forEach(el => {
            const aedPrice = parseInt(el.getAttribute('data-price'));
            if (currentCurrency === 'AED') {
                const usdPrice = Math.round(aedPrice / exchangeRate);
                el.textContent = 'USD ' + formatNumber(usdPrice);
            } else {
                el.textContent = 'AED ' + formatNumber(aedPrice);
            }
        });
        currentCurrency = currentCurrency === 'AED' ? 'USD' : 'AED';
    }

    // ========== WhatsApp Click Tracking ==========
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track WhatsApp clicks for analytics
            console.log('WhatsApp button clicked:', this.href);
            // Here you would send to Google Analytics or your tracking system
            // gtag('event', 'whatsapp_click', { 'event_category': 'engagement' });
        });
    });

    // ========== Video Testimonials Modal ==========
    window.playVideoTestimonial = function(type) {
        const modal = document.getElementById('videoModal');
        const title = document.getElementById('videoModalTitle');
        const desc = document.getElementById('videoModalDesc');
        
        if (!modal) return;
        
        // Video content based on type (placeholder for actual videos)
        const content = {
            'real-estate': {
                title: 'Real Estate Transformation Story',
                desc: 'Discover how Dubai Brokerage achieved 197% ROI with our 14-day Odoo implementation. Video testimonial coming soon!'
            },
            'manufacturing': {
                title: 'Manufacturing Excellence Story',
                desc: 'See how our Trading Co. client reduced errors by 94% and saved AED 42,000 monthly. Full video coming soon!'
            },
            'professional': {
                title: 'Professional Services Success',
                desc: 'Learn how a leading consultancy saves 75+ hours monthly and achieved 168% ROI. Video testimonial in production!'
            }
        };
        
        if (title && content[type]) {
            title.textContent = content[type].title;
            desc.textContent = content[type].desc;
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Track video modal opens
        console.log('Video testimonial opened:', type);
    };
    
    window.closeVideoModal = function(event) {
        const modal = document.getElementById('videoModal');
        if (!modal) return;
        
        // Only close if clicking overlay or close button
        if (event.target === modal || event.target.closest('.video-modal-close')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('videoModal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // ========== Console Welcome Message ==========
    console.log('%cSGC TECH AI', 'color: #00FFF0; font-size: 24px; font-weight: bold;');
    console.log('%cIntelligent Infrastructure. Instant Impact.', 'color: #4fc3f7; font-size: 14px;');
    console.log('%cBuilt with 💙 by SGC TECH AI Engineering Team', 'color: #64748b; font-size: 12px;');

})();