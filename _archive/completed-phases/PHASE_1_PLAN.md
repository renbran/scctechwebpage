# PHASE 1: Calculator Modal + Email Capture
**Timeline:** December 8-9, 2025 (2 days)  
**Priority:** 🔥 HIGHEST (Expected +200% calculator usage)

---

## 🎯 **OBJECTIVES**

1. ✅ Convert mid-page calculator to modal popup
2. ✅ Add email capture gate before showing full results
3. ✅ Make calculator accessible from multiple entry points
4. ✅ Enhance results display with "losing vs winning" visualization
5. ✅ Add sticky calculator access (desktop sidebar + mobile footer)

---

## 📋 **TECHNICAL SPECIFICATIONS**

### **1. MODAL STRUCTURE**

```html
<!-- Modal overlay (full screen, dark backdrop) -->
<div id="calculatorModal" class="modal-overlay">
    <div class="modal-content calculator-modal">
        <button class="modal-close">&times;</button>
        
        <!-- Step 1: Input Form -->
        <div id="calculatorStep1" class="modal-step active">
            <h2>Calculate Your ROI in 60 Seconds</h2>
            <p>See exactly how much you could save with SGC TECH AI</p>
            
            <form id="calculatorForm">
                <!-- Team size slider -->
                <div class="input-group">
                    <label>Number of Employees</label>
                    <input type="range" min="5" max="100" value="25" id="teamSize">
                    <span id="teamSizeValue">25</span> employees
                </div>
                
                <!-- Industry dropdown -->
                <div class="input-group">
                    <label>Industry</label>
                    <select id="industry">
                        <option value="real-estate">Real Estate</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="professional-services">Professional Services</option>
                        <option value="retail">Retail</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <!-- Current costs slider -->
                <div class="input-group">
                    <label>Current Monthly Software/Admin Costs</label>
                    <input type="range" min="5000" max="50000" step="1000" value="15000" id="currentCosts">
                    <span id="currentCostsValue">AED 15,000</span>
                </div>
                
                <!-- Teaser preview (shows immediately as they adjust) -->
                <div class="teaser-preview">
                    <div class="teaser-icon">💰</div>
                    <div class="teaser-text">
                        <strong>Estimated Savings:</strong>
                        <span id="teaserAmount">AED 40,000 - 65,000/year</span>
                    </div>
                </div>
                
                <button type="button" class="btn-primary" onclick="showEmailCapture()">
                    See My Detailed ROI Report →
                </button>
            </form>
        </div>
        
        <!-- Step 2: Email Capture Gate -->
        <div id="calculatorStep2" class="modal-step">
            <div class="email-gate">
                <h3>Get Your Personalized ROI Report</h3>
                <p>We'll send you a detailed PDF breakdown + book your free consultation</p>
                
                <form id="emailCaptureForm">
                    <input type="email" id="userEmail" placeholder="Enter your work email" required>
                    <input type="text" id="userName" placeholder="Your name" required>
                    <input type="tel" id="userPhone" placeholder="Phone (optional)">
                    
                    <button type="submit" class="btn-primary">
                        📊 Show My ROI Report
                    </button>
                </form>
                
                <p class="privacy-note">🔒 We respect your privacy. No spam, ever.</p>
            </div>
        </div>
        
        <!-- Step 3: Full Results Display -->
        <div id="calculatorStep3" class="modal-step">
            <div class="results-display">
                <!-- BEFORE vs AFTER comparison -->
                <div class="comparison-grid">
                    <div class="before-state">
                        <h4>❌ Without SGC TECH AI</h4>
                        <div class="loss-amount" id="monthlyLoss">
                            AED 53,000/month
                        </div>
                        <ul class="loss-breakdown">
                            <li>Manual data entry errors</li>
                            <li>Scattered information</li>
                            <li>Slow reporting</li>
                            <li>Wasted labor hours</li>
                        </ul>
                    </div>
                    
                    <div class="after-state">
                        <h4>✅ With SGC TECH AI</h4>
                        <div class="savings-amount" id="monthlySavings">
                            AED 53,000 saved/month
                        </div>
                        <ul class="savings-breakdown">
                            <li>Automated workflows</li>
                            <li>Unified system</li>
                            <li>Real-time dashboards</li>
                            <li>80% labor reduction</li>
                        </ul>
                    </div>
                </div>
                
                <!-- Net difference (massive number) -->
                <div class="net-difference">
                    <div class="net-label">Your 2-Year Net Benefit:</div>
                    <div class="net-amount" id="netBenefit">
                        AED 1,272,000
                    </div>
                </div>
                
                <!-- Investment breakdown -->
                <div class="investment-box">
                    <div class="investment-row">
                        <span>Implementation Investment:</span>
                        <strong>AED 24,187</strong>
                    </div>
                    <div class="investment-row">
                        <span>Payback Period:</span>
                        <strong id="paybackPeriod">3.4 months</strong>
                    </div>
                    <div class="investment-row highlight">
                        <span>First Year ROI:</span>
                        <strong id="roiPercentage">197%</strong>
                    </div>
                </div>
                
                <!-- Chart visualization -->
                <canvas id="savingsChart"></canvas>
                
                <!-- Giant CTA -->
                <div class="final-cta">
                    <button class="btn-cta-giant" onclick="bookCall()">
                        📞 BOOK CALL - LOCK IN THIS ROI
                    </button>
                    <p>Free 15-minute discovery call • No commitment required</p>
                </div>
            </div>
        </div>
    </div>
</div>
```

---

### **2. STICKY ACCESS POINTS**

**A. Hero CTA (Primary Entry Point)**
```html
<!-- Replace current "Calculate Your ROI" button in hero -->
<button class="btn-primary btn-hero" onclick="openCalculatorModal()">
    💰 Calculate Your ROI in 60 Seconds
</button>
```

**B. Sticky Desktop Sidebar**
```html
<!-- Fixed to right side, appears after hero scroll -->
<div id="stickyCalculator" class="sticky-calculator-sidebar">
    <div class="sticky-calc-icon">💰</div>
    <div class="sticky-calc-text">
        <strong>ROI Calculator</strong>
        <span>See your savings</span>
    </div>
    <button onclick="openCalculatorModal()">Calculate</button>
</div>
```

**C. Sticky Mobile Footer Bar**
```html
<!-- Fixed to bottom on mobile, changes based on scroll position -->
<div id="mobileStickyBar" class="mobile-sticky-bar">
    <!-- When above calculator section -->
    <button class="btn-mobile-sticky" onclick="openCalculatorModal()">
        💰 Calculate Your ROI
    </button>
    
    <!-- When past calculator section (JS switches content) -->
    <button class="btn-mobile-sticky" onclick="bookCall()">
        📞 Book Your Call
    </button>
</div>
```

**D. Navigation Link**
```html
<!-- Add to header navigation -->
<li><a href="#" onclick="openCalculatorModal(); return false;">Calculator</a></li>
```

---

### **3. CSS STYLING**

**File:** `css/calculator-modal.css` (NEW FILE)

```css
/* Modal Overlay */
.modal-overlay {
    display: none; /* Hidden by default */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(12, 30, 52, 0.95); /* Deep navy with transparency */
    backdrop-filter: blur(10px);
    z-index: 10000;
    overflow-y: auto;
    animation: fadeIn 0.3s ease;
}

.modal-overlay.active {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Modal Content */
.modal-content {
    background: linear-gradient(135deg, #0a1628 0%, #1a2942 50%, #0f2439 100%);
    border: 1px solid rgba(0, 255, 240, 0.2);
    border-radius: 20px;
    padding: 40px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: slideUp 0.4s ease;
}

/* Close Button */
.modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: #00FFF0;
    font-size: 32px;
    cursor: pointer;
    transition: transform 0.2s;
}

.modal-close:hover {
    transform: rotate(90deg);
    color: #00FF88;
}

/* Step Management */
.modal-step {
    display: none;
}

.modal-step.active {
    display: block;
    animation: fadeIn 0.3s ease;
}

/* Input Groups */
.input-group {
    margin-bottom: 30px;
}

.input-group label {
    display: block;
    color: #00FFF0;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
}

.input-group input[type="range"] {
    width: 100%;
    height: 8px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    outline: none;
    -webkit-appearance: none;
}

.input-group input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #00FFF0;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(0, 255, 240, 0.6);
}

.input-group select {
    width: 100%;
    padding: 15px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(0, 255, 240, 0.3);
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
}

/* Teaser Preview */
.teaser-preview {
    background: rgba(0, 255, 136, 0.1);
    border: 2px solid #00FF88;
    border-radius: 15px;
    padding: 20px;
    margin: 30px 0;
    display: flex;
    align-items: center;
    gap: 15px;
}

.teaser-icon {
    font-size: 48px;
}

.teaser-text strong {
    display: block;
    color: #00FF88;
    font-size: 14px;
    margin-bottom: 5px;
}

.teaser-text span {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
}

/* Email Capture Gate */
.email-gate {
    text-align: center;
    padding: 40px 20px;
}

.email-gate h3 {
    color: #00FFF0;
    font-size: 28px;
    margin-bottom: 15px;
}

.email-gate form {
    max-width: 400px;
    margin: 30px auto;
}

.email-gate input {
    width: 100%;
    padding: 15px;
    margin-bottom: 15px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(0, 255, 240, 0.3);
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
}

.privacy-note {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    margin-top: 15px;
}

/* Results Display */
.comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 40px;
}

.before-state {
    background: rgba(255, 0, 0, 0.1);
    border: 2px solid rgba(255, 0, 0, 0.3);
    border-radius: 15px;
    padding: 30px;
}

.after-state {
    background: rgba(0, 255, 136, 0.1);
    border: 2px solid #00FF88;
    border-radius: 15px;
    padding: 30px;
}

.loss-amount {
    font-size: 32px;
    color: #ff4444;
    font-weight: 700;
    margin: 20px 0;
}

.savings-amount {
    font-size: 32px;
    color: #00FF88;
    font-weight: 700;
    margin: 20px 0;
    animation: countUp 1s ease;
}

/* Net Difference (Hero Number) */
.net-difference {
    text-align: center;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 240, 0.2));
    border: 3px solid #00FF88;
    border-radius: 20px;
    padding: 40px;
    margin: 40px 0;
}

.net-label {
    color: #00FFF0;
    font-size: 20px;
    margin-bottom: 10px;
}

.net-amount {
    color: #00FF88;
    font-size: 64px;
    font-weight: 800;
    animation: explode 0.8s ease;
}

/* Investment Box */
.investment-box {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 40px;
}

.investment-row {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.investment-row.highlight {
    background: rgba(0, 255, 136, 0.1);
    padding: 20px;
    border-radius: 10px;
    border: none;
    margin-top: 15px;
}

.investment-row.highlight strong {
    color: #00FF88;
    font-size: 28px;
}

/* Giant CTA */
.final-cta {
    text-align: center;
    margin-top: 50px;
}

.btn-cta-giant {
    background: linear-gradient(135deg, #00FF88, #00FFF0);
    color: #0c1e34;
    font-size: 24px;
    font-weight: 800;
    padding: 25px 60px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 0 10px 40px rgba(0, 255, 136, 0.4);
    animation: pulse 2s infinite;
}

.btn-cta-giant:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 60px rgba(0, 255, 136, 0.6);
}

/* Sticky Sidebar (Desktop) */
.sticky-calculator-sidebar {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(135deg, #1a2942, #0f2439);
    border: 2px solid #00FFF0;
    border-radius: 15px;
    padding: 20px;
    width: 200px;
    z-index: 9000;
    opacity: 0;
    transition: opacity 0.3s;
}

.sticky-calculator-sidebar.visible {
    opacity: 1;
}

.sticky-calc-icon {
    font-size: 48px;
    text-align: center;
    margin-bottom: 10px;
}

.sticky-calc-text {
    text-align: center;
    margin-bottom: 15px;
}

.sticky-calc-text strong {
    display: block;
    color: #00FFF0;
    font-size: 16px;
}

.sticky-calc-text span {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
}

/* Mobile Sticky Bar */
.mobile-sticky-bar {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(135deg, #1a2942, #0f2439);
    border-top: 2px solid #00FFF0;
    padding: 15px;
    z-index: 9000;
    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.5);
}

.btn-mobile-sticky {
    width: 100%;
    background: linear-gradient(135deg, #00FF88, #00FFF0);
    color: #0c1e34;
    font-size: 18px;
    font-weight: 700;
    padding: 15px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes explode {
    0% {
        transform: scale(0.5);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes countUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% {
        box-shadow: 0 10px 40px rgba(0, 255, 136, 0.4);
    }
    50% {
        box-shadow: 0 15px 60px rgba(0, 255, 136, 0.8);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .modal-content {
        padding: 30px 20px;
        max-width: 95%;
    }
    
    .comparison-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .net-amount {
        font-size: 48px;
    }
    
    .btn-cta-giant {
        font-size: 18px;
        padding: 20px 40px;
    }
    
    .sticky-calculator-sidebar {
        display: none; /* Hide on mobile */
    }
    
    .mobile-sticky-bar {
        display: block;
    }
}
```

---

### **4. JAVASCRIPT LOGIC**

**File:** `js/calculator-modal.js` (NEW FILE)

```javascript
// Calculator Modal Controller
class CalculatorModal {
    constructor() {
        this.modal = null;
        this.currentStep = 1;
        this.calculatorData = {
            teamSize: 25,
            industry: 'real-estate',
            currentCosts: 15000,
            email: '',
            name: '',
            phone: ''
        };
        this.init();
    }
    
    init() {
        // Create modal if doesn't exist
        if (!document.getElementById('calculatorModal')) {
            this.createModal();
        }
        
        // Setup event listeners
        this.setupListeners();
        
        // Show sticky elements on scroll
        this.setupStickyBehavior();
    }
    
    createModal() {
        // Modal HTML will be injected here
        // (Use the HTML structure from section 1)
    }
    
    setupListeners() {
        // Team size slider
        const teamSize = document.getElementById('teamSize');
        if (teamSize) {
            teamSize.addEventListener('input', (e) => {
                this.calculatorData.teamSize = parseInt(e.target.value);
                document.getElementById('teamSizeValue').textContent = e.target.value;
                this.updateTeaser();
            });
        }
        
        // Current costs slider
        const currentCosts = document.getElementById('currentCosts');
        if (currentCosts) {
            currentCosts.addEventListener('input', (e) => {
                this.calculatorData.currentCosts = parseInt(e.target.value);
                document.getElementById('currentCostsValue').textContent = 
                    'AED ' + parseInt(e.target.value).toLocaleString();
                this.updateTeaser();
            });
        }
        
        // Industry dropdown
        const industry = document.getElementById('industry');
        if (industry) {
            industry.addEventListener('change', (e) => {
                this.calculatorData.industry = e.target.value;
                this.updateTeaser();
            });
        }
        
        // Email capture form
        const emailForm = document.getElementById('emailCaptureForm');
        if (emailForm) {
            emailForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleEmailSubmit();
            });
        }
        
        // Close modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
            if (e.target.classList.contains('modal-close')) {
                this.closeModal();
            }
        });
        
        // Escape key closes modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    setupStickyBehavior() {
        const stickySidebar = document.getElementById('stickyCalculator');
        const mobileBar = document.getElementById('mobileStickyBar');
        
        window.addEventListener('scroll', () => {
            const heroHeight = document.querySelector('.hero')?.offsetHeight || 600;
            const scrolled = window.scrollY;
            
            // Desktop sidebar appears after hero
            if (stickySidebar) {
                if (scrolled > heroHeight) {
                    stickySidebar.classList.add('visible');
                } else {
                    stickySidebar.classList.remove('visible');
                }
            }
            
            // Mobile bar always visible
            if (mobileBar && window.innerWidth <= 768) {
                mobileBar.style.display = 'block';
            }
        });
    }
    
    updateTeaser() {
        // Calculate estimated savings range
        const { teamSize, industry, currentCosts } = this.calculatorData;
        
        // Industry multipliers
        const multipliers = {
            'real-estate': 1.3,
            'manufacturing': 1.2,
            'professional-services': 1.25,
            'retail': 1.15,
            'other': 1.1
        };
        
        const multiplier = multipliers[industry] || 1.1;
        const monthlySavings = currentCosts * 0.35 * multiplier;
        const annualSavings = monthlySavings * 12;
        
        // Show range (±20%)
        const lower = Math.round(annualSavings * 0.8);
        const upper = Math.round(annualSavings * 1.2);
        
        const teaserElement = document.getElementById('teaserAmount');
        if (teaserElement) {
            teaserElement.textContent = 
                `AED ${lower.toLocaleString()} - ${upper.toLocaleString()}/year`;
        }
    }
    
    openModal() {
        const modal = document.getElementById('calculatorModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            this.goToStep(1);
        }
    }
    
    closeModal() {
        const modal = document.getElementById('calculatorModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
            this.currentStep = 1;
        }
    }
    
    goToStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.modal-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show target step
        const targetStep = document.getElementById(`calculatorStep${stepNumber}`);
        if (targetStep) {
            targetStep.classList.add('active');
            this.currentStep = stepNumber;
        }
    }
    
    showEmailCapture() {
        this.goToStep(2);
    }
    
    async handleEmailSubmit() {
        // Collect email data
        this.calculatorData.email = document.getElementById('userEmail').value;
        this.calculatorData.name = document.getElementById('userName').value;
        this.calculatorData.phone = document.getElementById('userPhone').value;
        
        // Send to backend (implement your API endpoint)
        try {
            await this.sendLeadData();
            
            // Calculate and show results
            this.calculateResults();
            this.goToStep(3);
            
        } catch (error) {
            console.error('Email submission failed:', error);
            alert('Something went wrong. Please try again.');
        }
    }
    
    async sendLeadData() {
        // TODO: Implement API call to save lead
        // Example:
        // await fetch('/api/leads', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(this.calculatorData)
        // });
        
        // For now, just log
        console.log('Lead captured:', this.calculatorData);
        
        // Simulate API delay
        return new Promise(resolve => setTimeout(resolve, 500));
    }
    
    calculateResults() {
        const { teamSize, industry, currentCosts } = this.calculatorData;
        
        // Industry multipliers
        const multipliers = {
            'real-estate': 1.3,
            'manufacturing': 1.2,
            'professional-services': 1.25,
            'retail': 1.15,
            'other': 1.1
        };
        
        const multiplier = multipliers[industry] || 1.1;
        
        // Calculations
        const monthlySavings = Math.round(currentCosts * 0.35 * multiplier);
        const annualSavings = monthlySavings * 12;
        const twoYearSavings = annualSavings * 2;
        const implementation = 24187; // Silver tier price
        const paybackMonths = (implementation / monthlySavings).toFixed(1);
        const roiPercentage = Math.round((annualSavings / implementation) * 100);
        
        // Update DOM
        document.getElementById('monthlyLoss').textContent = 
            `AED ${monthlySavings.toLocaleString()}/month`;
        document.getElementById('monthlySavings').textContent = 
            `AED ${monthlySavings.toLocaleString()} saved/month`;
        document.getElementById('netBenefit').textContent = 
            `AED ${twoYearSavings.toLocaleString()}`;
        document.getElementById('paybackPeriod').textContent = 
            `${paybackMonths} months`;
        document.getElementById('roiPercentage').textContent = 
            `${roiPercentage}%`;
        
        // Animate numbers
        this.animateCounters();
    }
    
    animateCounters() {
        // Number counting animation (already built in animations.js)
        // Can reuse existing animateCounter() function
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.calculatorModal = new CalculatorModal();
});

// Global function for onclick handlers
function openCalculatorModal() {
    if (window.calculatorModal) {
        window.calculatorModal.openModal();
    }
}

function showEmailCapture() {
    if (window.calculatorModal) {
        window.calculatorModal.showEmailCapture();
    }
}

function bookCall() {
    window.location.href = '/appointment.html';
}
```

---

## 📦 **FILES TO CREATE/MODIFY**

### **NEW FILES:**
1. ✅ `css/calculator-modal.css` (1200 lines)
2. ✅ `js/calculator-modal.js` (300 lines)

### **MODIFIED FILES:**
1. ✅ `index.html` - Add modal HTML, update hero CTA, add sticky elements
2. ✅ `css/styles.css` - Import new calculator-modal.css
3. ✅ `js/main.js` - Initialize calculator modal

---

## ✅ **IMPLEMENTATION CHECKLIST**

### **Step 1: Create CSS File (30 min)**
- [ ] Create `css/calculator-modal.css`
- [ ] Add modal overlay styles
- [ ] Add step transition animations
- [ ] Add input group styles
- [ ] Add comparison grid styles
- [ ] Add sticky sidebar styles
- [ ] Add mobile sticky bar styles
- [ ] Add responsive breakpoints

### **Step 2: Create JavaScript File (1 hour)**
- [ ] Create `js/calculator-modal.js`
- [ ] Build CalculatorModal class
- [ ] Implement step navigation
- [ ] Add teaser calculation logic
- [ ] Add email capture handler
- [ ] Add full ROI calculation
- [ ] Add sticky behavior on scroll
- [ ] Add keyboard/click close handlers

### **Step 3: Update index.html (1 hour)**
- [ ] Add modal HTML structure before `</body>`
- [ ] Update hero CTA to trigger modal
- [ ] Add sticky sidebar HTML
- [ ] Add mobile sticky bar HTML
- [ ] Add CSS import: `<link href="css/calculator-modal.css">`
- [ ] Add JS import: `<script src="js/calculator-modal.js"></script>`

### **Step 4: Update Existing Files (30 min)**
- [ ] Update `css/styles.css` - add calculator-modal import
- [ ] Update `js/main.js` - ensure no conflicts
- [ ] Test modal open/close functionality
- [ ] Test all 3 steps work correctly
- [ ] Test sticky elements appear/hide on scroll

### **Step 5: Testing (2 hours)**
- [ ] Test modal on desktop (Chrome, Firefox, Safari, Edge)
- [ ] Test modal on mobile (iPhone, Android)
- [ ] Test sticky sidebar (desktop only)
- [ ] Test sticky mobile bar (mobile only)
- [ ] Test email capture form validation
- [ ] Test calculations accuracy
- [ ] Test all CTA entry points work
- [ ] Test keyboard navigation (Escape closes)
- [ ] Test click outside to close

### **Step 6: Deploy & Monitor (30 min)**
- [ ] Commit changes to Git
- [ ] Deploy to Cloudflare Pages
- [ ] Test live site
- [ ] Monitor console for errors
- [ ] Verify analytics tracking (if setup)

---

## 🎯 **SUCCESS METRICS**

**BEFORE Phase 1:**
- Calculator usage: 10-15% of visitors
- Email capture: 0% (no gate exists)
- Calls booked: 15/month

**AFTER Phase 1 (Expected):**
- Calculator usage: 35-45% of visitors (+200%)
- Email capture: 60% of calculator users (NEW: 240-270 emails/month)
- Calls booked: 60-80/month (+300%)

---

## 🚨 **CRITICAL NOTES**

1. **Don't delete existing calculator** - Keep mid-page calculator as fallback, just make modal primary
2. **Email validation** - Require work email (reject Gmail, Yahoo, Hotmail for B2B)
3. **Mobile-first** - Test on mobile FIRST, then desktop
4. **Accessibility** - Ensure modal is keyboard accessible (Tab, Escape)
5. **Analytics** - Add tracking events for each step (open, email submit, results view, CTA click)

---

## 📅 **TIMELINE**

**Day 1 (Dec 8):**
- Morning: Create CSS file (2 hours)
- Afternoon: Create JavaScript file (3 hours)
- Evening: Update index.html (2 hours)

**Day 2 (Dec 9):**
- Morning: Testing & bug fixes (3 hours)
- Afternoon: Deploy & monitor (2 hours)
- Evening: Document any issues for Phase 2

---

**Ready to start Phase 1 implementation?** Confirm and I'll begin creating the files systematically.
