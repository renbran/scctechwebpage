// Success Stories Page - Filter Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get filter buttons and case studies
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseStudies = document.querySelectorAll('.case-study');
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter case studies
            caseStudies.forEach(study => {
                if (filterValue === 'all') {
                    study.classList.remove('hidden');
                    study.style.display = 'block';
                } else {
                    const studyIndustry = study.getAttribute('data-industry');
                    if (studyIndustry === filterValue) {
                        study.classList.remove('hidden');
                        study.style.display = 'block';
                    } else {
                        study.classList.add('hidden');
                        study.style.display = 'none';
                    }
                }
            });
            
            // Scroll to first visible case study (smooth)
            setTimeout(() => {
                const firstVisible = document.querySelector('.case-study:not(.hidden)');
                if (firstVisible) {
                    const yOffset = -100; // Offset for sticky header
                    const y = firstVisible.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        });
    });
    
    // Animate case studies on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    caseStudies.forEach(study => {
        observer.observe(study);
    });
});
