/* ========================================
   ROI CALCULATOR MODAL - INTERACTIVE LOGIC
   Matches existing main.js calculation patterns
   Enhanced with modal controls and animations
   ======================================== */

class ROICalculator {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.form = null;
        this.resultsSection = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
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
        this.form = document.getElementById('calculatorForm');
        this.resultsSection = document.getElementById('calculatorResults');

        if (!this.overlay || !this.modal || !this.form) {
            console.warn('ROI Calculator: Required elements not found');
            return;
        }

        // Bind event listeners
        this.bindEvents();
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

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculate();
        });

        // Trigger buttons (any element with data-calculator-trigger)
        document.querySelectorAll('[data-calculator-trigger]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        // Real-time validation
        this.form.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    open() {
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input for accessibility
        setTimeout(() => {
            const firstInput = this.form.querySelector('input, select');
            if (firstInput) firstInput.focus();
        }, 300);

        // Hide results on open
        if (this.resultsSection) {
            this.resultsSection.classList.remove('show');
        }
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field check
        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Specific validations
        if (field.name === 'employees' && value) {
            const num = parseInt(value);
            if (isNaN(num) || num < 1) {
                isValid = false;
                errorMessage = 'Please enter a valid number of employees';
            } else if (num > 10000) {
                isValid = false;
                errorMessage = 'Please contact us directly for enterprises over 10,000 employees';
            }
        }

        if (field.name === 'currentCost' && value) {
            const num = parseFloat(value);
            if (isNaN(num) || num < 0) {
                isValid = false;
                errorMessage = 'Please enter a valid cost amount';
            }
        }

        if (field.name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        if (field.name === 'phone' && value) {
            const phoneRegex = /^\+?[\d\s\-()]+$/;
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 8) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Show/hide error
        if (isValid) {
            field.classList.remove('error');
            this.hideError(field);
        } else {
            field.classList.add('error');
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    showError(field, message) {
        let errorDiv = field.parentElement.querySelector('.calculator-error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'calculator-error-message';
            field.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }

    hideError(field) {
        const errorDiv = field.parentElement.querySelector('.calculator-error-message');
        if (errorDiv) {
            errorDiv.classList.remove('show');
        }
    }

    clearError(field) {
        field.classList.remove('error');
        this.hideError(field);
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    calculate() {
        // Validate form first
        if (!this.validateForm()) {
            // Scroll to first error
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        // Get form data
        const formData = new FormData(this.form);
        const data = {
            employees: parseInt(formData.get('employees')),
            currentCost: parseFloat(formData.get('currentCost')) || 0,
            industry: formData.get('industry'),
            timeline: formData.get('timeline'),
            modules: formData.getAll('modules')
        };

        // Calculate ROI (using logic from main.js)
        const results = this.performCalculation(data);

        // Display results
        this.displayResults(results);

        // Scroll to results
        setTimeout(() => {
            this.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    performCalculation(data) {
        // Base calculation
        const baseROI = 150; // Minimum guaranteed 150% ROI
        const employeeCostPerYear = data.currentCost || (data.employees * 50000); // Assume $50k per employee if not provided
        
        // Industry multipliers (from main.js)
        const industryMultipliers = {
            'real-estate': 1.3,
            'manufacturing': 1.2,
            'professional-services': 1.25,
            'retail': 1.15,
            'healthcare': 1.2,
            'logistics': 1.25,
            'other': 1.1
        };

        // Module impact (each module adds value)
        const moduleValue = data.modules.length * 0.05; // 5% per module

        // Timeline urgency factor
        const timelineMultipliers = {
            'immediate': 1.2,
            '1-3-months': 1.15,
            '3-6-months': 1.1,
            '6-12-months': 1.05
        };

        // Calculate multipliers
        const industryMultiplier = industryMultipliers[data.industry] || 1.1;
        const timelineMultiplier = timelineMultipliers[data.timeline] || 1.1;

        // Calculate ROI
        let roiPercentage = baseROI * industryMultiplier * timelineMultiplier * (1 + moduleValue);
        roiPercentage = Math.max(roiPercentage, 150); // Ensure minimum 150%

        // Calculate savings
        const implementationCost = 25000 + (data.employees * 100); // Base cost + per employee
        const annualSavings = employeeCostPerYear * 0.30; // 30% efficiency gain
        const threeeYearSavings = annualSavings * 3;
        const netROI = threeeYearSavings - implementationCost;
        const paybackMonths = Math.ceil((implementationCost / annualSavings) * 12);

        return {
            roiPercentage: Math.round(roiPercentage),
            annualSavings: Math.round(annualSavings),
            threeYearSavings: Math.round(threeeYearSavings),
            paybackMonths: Math.min(paybackMonths, 6), // Cap at 6 months (company guarantee)
            implementationCost: Math.round(implementationCost),
            netROI: Math.round(netROI)
        };
    }

    displayResults(results) {
        // Format currency
        const formatCurrency = (num) => {
            return '$' + num.toLocaleString('en-US');
        };

        // Update result cards
        document.getElementById('resultROI').textContent = results.roiPercentage + '%';
        document.getElementById('resultAnnualSavings').textContent = formatCurrency(results.annualSavings);
        document.getElementById('resultThreeYear').textContent = formatCurrency(results.threeYearSavings);
        document.getElementById('resultPayback').textContent = results.paybackMonths + ' Months';

        // Show results section with animation
        this.resultsSection.classList.add('show');

        // Track event (if analytics is available)
        if (window.gtag) {
            window.gtag('event', 'roi_calculation', {
                'event_category': 'Calculator',
                'event_label': 'ROI Calculated',
                'value': results.roiPercentage
            });
        }
    }

    // Public method to programmatically open calculator
    static open() {
        const instance = window.roiCalculatorInstance;
        if (instance) {
            instance.open();
        }
    }

    // Public method to close calculator
    static close() {
        const instance = window.roiCalculatorInstance;
        if (instance) {
            instance.close();
        }
    }
}

// Initialize calculator when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.roiCalculatorInstance = new ROICalculator();
    });
} else {
    window.roiCalculatorInstance = new ROICalculator();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ROICalculator;
}
