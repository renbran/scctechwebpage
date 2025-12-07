/* ========================================
   ROI CALCULATOR MODAL - 3-STEP FLOW
   Step 1: Business Info + Teaser Preview
   Step 2: Email Capture Gate
   Step 3: Full Results (Losing vs Winning)
   ======================================== */

class ROICalculator {
    constructor() {
        this.currentStep = 1;
        this.calculatedResults = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Get DOM elements
        this.overlay = document.getElementById('calculatorModalOverlay');
        this.modal = document.querySelector('.calculator-modal');
        this.steps = {
            1: document.getElementById('calculatorStep1'),
            2: document.getElementById('calculatorStep2'),
            3: document.getElementById('calculatorStep3')
        };
        this.stepDots = document.querySelectorAll('.step-dot');
        this.leadForm = document.getElementById('leadCaptureForm');

        if (!this.overlay || !this.modal) {
            console.warn('ROI Calculator: Required elements not found');
            return;
        }

        this.bindEvents();
        this.updateTeaserPreview(); // Initialize teaser
    }

    bindEvents() {
        // Close button
        const closeBtn = this.overlay.querySelector('.calculator-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Click outside modal to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.close();
            }
        });

        // Step 1 → Step 2 button
        const goToStep2Btn = document.getElementById('goToStep2');
        if (goToStep2Btn) {
            goToStep2Btn.addEventListener('click', () => this.goToStep(2));
        }

        // Step 2 → Step 1 (back button)
        const backToStep1Btn = document.getElementById('backToStep1');
        if (backToStep1Btn) {
            backToStep1Btn.addEventListener('click', () => this.goToStep(1));
        }

        // Lead capture form submission
        if (this.leadForm) {
            this.leadForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Trigger buttons
        document.querySelectorAll('[data-calculator-trigger]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        // Real-time teaser preview updates
        const employeesInput = document.getElementById('calcEmployees');
        const currentCostInput = document.getElementById('calcCurrentCost');
        const industrySelect = document.getElementById('calcIndustry');
        const moduleCheckboxes = document.querySelectorAll('input[name="modules"]');

        [employeesInput, currentCostInput, industrySelect].forEach(el => {
            if (el) {
                el.addEventListener('input', () => this.updateTeaserPreview());
                el.addEventListener('change', () => this.updateTeaserPreview());
            }
        });

        moduleCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => this.updateTeaserPreview());
        });
    }

    open() {
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.goToStep(1);
        
        setTimeout(() => {
            const firstInput = document.getElementById('calcEmployees');
            if (firstInput) firstInput.focus();
        }, 300);
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    goToStep(stepNumber) {
        // Validate Step 1 before proceeding to Step 2
        if (stepNumber === 2 && this.currentStep === 1) {
            if (!this.validateStep1()) {
                return;
            }
            // Calculate and prepare teaser for Step 2
            this.calculatedResults = this.performCalculation();
            this.updateStep2Teaser();
        }

        // Update step visibility
        Object.keys(this.steps).forEach(key => {
            if (this.steps[key]) {
                this.steps[key].classList.remove('active');
            }
        });
        if (this.steps[stepNumber]) {
            this.steps[stepNumber].classList.add('active');
        }

        // Update step indicators
        this.stepDots.forEach((dot, index) => {
            dot.classList.remove('active', 'completed');
            if (index + 1 < stepNumber) {
                dot.classList.add('completed');
            } else if (index + 1 === stepNumber) {
                dot.classList.add('active');
            }
        });

        this.currentStep = stepNumber;

        // Scroll to top of modal
        this.modal.scrollTop = 0;
    }

    validateStep1() {
        const employees = document.getElementById('calcEmployees');
        const industry = document.getElementById('calcIndustry');
        const timeline = document.getElementById('calcTimeline');

        let isValid = true;

        // Check employees
        if (!employees.value || employees.value < 1) {
            this.showFieldError(employees, 'Please enter the number of employees');
            isValid = false;
        } else {
            this.clearFieldError(employees);
        }

        // Check industry
        if (!industry.value) {
            this.showFieldError(industry, 'Please select your industry');
            isValid = false;
        } else {
            this.clearFieldError(industry);
        }

        // Check timeline
        if (!timeline.value) {
            this.showFieldError(timeline, 'Please select your timeline');
            isValid = false;
        } else {
            this.clearFieldError(timeline);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        let errorDiv = field.parentElement.querySelector('.field-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            field.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentElement.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    updateTeaserPreview() {
        const employees = parseInt(document.getElementById('calcEmployees')?.value) || 25;
        const currentCost = parseFloat(document.getElementById('calcCurrentCost')?.value) || 5000;
        const industry = document.getElementById('calcIndustry')?.value || 'other';
        const modules = document.querySelectorAll('input[name="modules"]:checked').length || 1;

        // Quick estimate calculation
        const baseSavings = (employees * 2000) + (currentCost * 12 * 0.3);
        const industryMultiplier = this.getIndustryMultiplier(industry);
        const moduleBonus = modules * 0.05;

        const lowEstimate = Math.round(baseSavings * industryMultiplier * 0.8);
        const highEstimate = Math.round(baseSavings * industryMultiplier * 1.3 * (1 + moduleBonus));

        // Update teaser display
        const teaserAmount = document.getElementById('teaserAmount');
        if (teaserAmount) {
            teaserAmount.textContent = `AED ${this.formatNumber(lowEstimate)} - ${this.formatNumber(highEstimate)}`;
        }
    }

    updateStep2Teaser() {
        if (!this.calculatedResults) return;

        const teaserROI = document.getElementById('teaserROI');
        const teaserSavings = document.getElementById('teaserSavings');

        if (teaserROI) {
            teaserROI.textContent = `~${this.calculatedResults.roiPercentage}%`;
        }
        if (teaserSavings) {
            teaserSavings.textContent = `~AED ${this.formatNumber(this.calculatedResults.annualSavings)}`;
        }

        // Also populate hidden form fields
        document.getElementById('hiddenROI').value = this.calculatedResults.roiPercentage + '%';
        document.getElementById('hiddenSavings').value = 'AED ' + this.formatNumber(this.calculatedResults.annualSavings);
        document.getElementById('hiddenEmployees').value = document.getElementById('calcEmployees').value;
        document.getElementById('hiddenIndustry').value = document.getElementById('calcIndustry').value;
        
        const selectedModules = Array.from(document.querySelectorAll('input[name="modules"]:checked'))
            .map(cb => cb.value).join(', ');
        document.getElementById('hiddenModules').value = selectedModules || 'None selected';
    }

    getIndustryMultiplier(industry) {
        const multipliers = {
            'real-estate': 1.3,
            'manufacturing': 1.2,
            'professional-services': 1.25,
            'retail': 1.15,
            'healthcare': 1.2,
            'logistics': 1.25,
            'other': 1.1
        };
        return multipliers[industry] || 1.1;
    }

    performCalculation() {
        const employees = parseInt(document.getElementById('calcEmployees').value) || 25;
        const currentCost = parseFloat(document.getElementById('calcCurrentCost').value) || 5000;
        const industry = document.getElementById('calcIndustry').value || 'other';
        const timeline = document.getElementById('calcTimeline').value || '1-3-months';
        const modules = document.querySelectorAll('input[name="modules"]:checked').length || 1;

        // Base calculations
        const annualCurrentCost = currentCost * 12;
        const industryMultiplier = this.getIndustryMultiplier(industry);
        
        const timelineMultipliers = {
            'immediate': 1.2,
            '1-3-months': 1.15,
            '3-6-months': 1.1,
            '6-12-months': 1.05
        };
        const timelineMultiplier = timelineMultipliers[timeline] || 1.1;

        // Calculate losses (what they're losing without optimization)
        const monthlyLosses = Math.round((employees * 350) + (currentCost * 0.4));
        const annualWaste = monthlyLosses * 12;
        const threeYearLoss = annualWaste * 3;

        // Calculate savings with SGC
        const efficiencyGain = 0.35; // 35% efficiency improvement
        const monthlySavings = Math.round(monthlyLosses * efficiencyGain * industryMultiplier);
        const annualSavings = monthlySavings * 12;
        const threeYearSavings = annualSavings * 3;

        // Implementation cost
        const implementationCost = 25000 + (employees * 150);

        // ROI calculation
        const netBenefit = threeYearSavings - implementationCost;
        const roiPercentage = Math.round((annualSavings / implementationCost) * 100 * timelineMultiplier);
        const paybackMonths = Math.round((implementationCost / annualSavings) * 12 * 10) / 10;

        return {
            monthlyLosses,
            annualWaste,
            threeYearLoss,
            monthlySavings,
            annualSavings,
            threeYearSavings,
            roiPercentage: Math.max(roiPercentage, 150), // Guarantee minimum 150%
            paybackMonths: Math.min(paybackMonths, 6), // Cap at 6 months
            implementationCost,
            netBenefit
        };
    }

    displayResults() {
        const r = this.calculatedResults;

        // Losing side
        document.getElementById('monthlyLosses').textContent = `AED ${this.formatNumber(r.monthlyLosses)}`;
        document.getElementById('annualWaste').textContent = `AED ${this.formatNumber(r.annualWaste)}`;
        document.getElementById('threeYearLoss').textContent = `AED ${this.formatNumber(r.threeYearLoss)}`;

        // Winning side
        document.getElementById('monthlySavings').textContent = `AED ${this.formatNumber(r.monthlySavings)}`;
        document.getElementById('resultAnnualSavings').textContent = `AED ${this.formatNumber(r.annualSavings)}`;
        document.getElementById('resultThreeYear').textContent = `AED ${this.formatNumber(r.threeYearSavings)}`;

        // Summary
        document.getElementById('resultROI').textContent = `${r.roiPercentage}%`;
        document.getElementById('resultPayback').textContent = `${r.paybackMonths} Months`;
        document.getElementById('netBenefit').textContent = `AED ${this.formatNumber(r.netBenefit)}`;
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitLeadForm');
        const originalText = submitBtn.innerHTML;

        // Validate form
        const name = document.getElementById('leadName').value.trim();
        const email = document.getElementById('leadEmail').value.trim();
        const phone = document.getElementById('leadPhone').value.trim();
        const company = document.getElementById('leadCompany').value.trim();

        if (!name || !email || !phone || !company) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

        try {
            // Submit to Web3Forms
            const formData = new FormData(this.leadForm);
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Show results (Step 3)
                this.displayResults();
                this.goToStep(3);

                // Track conversion (if analytics available)
                if (window.gtag) {
                    window.gtag('event', 'lead_captured', {
                        'event_category': 'Calculator',
                        'event_label': 'ROI Calculator Lead',
                        'value': this.calculatedResults.roiPercentage
                    });
                }

                // Also track with Facebook Pixel if available
                if (window.fbq) {
                    window.fbq('track', 'Lead', {
                        content_name: 'ROI Calculator',
                        value: this.calculatedResults.annualSavings,
                        currency: 'AED'
                    });
                }
            } else {
                throw new Error(result.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Still show results even if email fails (better UX)
            this.displayResults();
            this.goToStep(3);
            
            // Log error for debugging
            console.log('Lead data (email failed):', {
                name, email, phone, company,
                roi: this.calculatedResults
            });
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    formatNumber(num) {
        return num.toLocaleString('en-US');
    }

    // Public methods
    static open() {
        if (window.roiCalculatorInstance) {
            window.roiCalculatorInstance.open();
        }
    }

    static close() {
        if (window.roiCalculatorInstance) {
            window.roiCalculatorInstance.close();
        }
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.roiCalculatorInstance = new ROICalculator();
    });
} else {
    window.roiCalculatorInstance = new ROICalculator();
}
