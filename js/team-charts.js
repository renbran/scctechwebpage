// Team Analytics Charts - Interactive Data Visualization

// Wait for Chart.js to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Chart.js default configuration
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.color = '#6b7280';
    
    // Color palette matching brand
    const brandColors = {
        deepNavy: '#0c1e34',
        oceanBlue: '#1e3a8a',
        skyBlue: '#4fc3f7',
        electricCyan: '#00FFF0',
        neonGreen: '#00FF88',
        gradient: {
            cyan: 'rgba(79, 195, 247, 0.8)',
            cyanLight: 'rgba(79, 195, 247, 0.2)',
            green: 'rgba(0, 255, 136, 0.8)',
            greenLight: 'rgba(0, 255, 136, 0.2)'
        }
    };
    
    // 1. Projects Delivered Chart (Line Chart)
    const projectsCtx = document.getElementById('projectsChart');
    if (projectsCtx) {
        new Chart(projectsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Projects Completed',
                    data: [2, 3, 4, 5, 6, 7, 9, 11, 13, 16, 18, 22],
                    borderColor: brandColors.electricCyan,
                    backgroundColor: brandColors.gradient.cyanLight,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: brandColors.electricCyan,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: brandColors.deepNavy,
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        callbacks: {
                            label: function(context) {
                                return 'Projects: ' + context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 5,
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: '#e5e7eb',
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 2. Client ROI Distribution (Bar Chart)
    const roiCtx = document.getElementById('roiChart');
    if (roiCtx) {
        new Chart(roiCtx, {
            type: 'bar',
            data: {
                labels: ['150-160%', '161-170%', '171-180%', '181-190%', '191-200%', '200%+'],
                datasets: [{
                    label: 'Number of Clients',
                    data: [8, 12, 15, 9, 4, 2],
                    backgroundColor: [
                        brandColors.gradient.cyan,
                        brandColors.gradient.cyan,
                        brandColors.neonGreen,
                        brandColors.gradient.green,
                        brandColors.gradient.green,
                        brandColors.neonGreen
                    ],
                    borderColor: [
                        brandColors.skyBlue,
                        brandColors.skyBlue,
                        brandColors.neonGreen,
                        brandColors.neonGreen,
                        brandColors.neonGreen,
                        brandColors.neonGreen
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: brandColors.deepNavy,
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        callbacks: {
                            label: function(context) {
                                return 'Clients: ' + context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 5,
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: '#e5e7eb',
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 3. Deployment Timeline (Horizontal Bar Chart)
    const deploymentCtx = document.getElementById('deploymentChart');
    if (deploymentCtx) {
        new Chart(deploymentCtx, {
            type: 'bar',
            data: {
                labels: ['Starter Tier', 'Business Tier', 'Enterprise Tier'],
                datasets: [{
                    label: 'Average Days',
                    data: [13, 14, 15],
                    backgroundColor: [
                        brandColors.gradient.cyan,
                        brandColors.neonGreen,
                        brandColors.gradient.green
                    ],
                    borderColor: [
                        brandColors.skyBlue,
                        brandColors.neonGreen,
                        brandColors.neonGreen
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: brandColors.deepNavy,
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        callbacks: {
                            label: function(context) {
                                return 'Average: ' + context.parsed.x + ' days';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 20,
                        ticks: {
                            stepSize: 5,
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return value + 'd';
                            }
                        },
                        grid: {
                            color: '#e5e7eb',
                            drawBorder: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 13,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 4. Client Satisfaction (Doughnut Chart)
    const satisfactionCtx = document.getElementById('satisfactionChart');
    if (satisfactionCtx) {
        new Chart(satisfactionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Highly Satisfied (9-10)', 'Satisfied (7-8)', 'Neutral (5-6)', 'Unsatisfied (<5)'],
                datasets: [{
                    label: 'Client Ratings',
                    data: [42, 6, 2, 0],
                    backgroundColor: [
                        brandColors.neonGreen,
                        brandColors.gradient.cyan,
                        '#fbbf24',
                        '#ef4444'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 11
                            },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: brandColors.deepNavy,
                        padding: 12,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return label + ': ' + value + ' clients (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Animate numbers on scroll
    const animateNumbers = () => {
        const metricNumbers = document.querySelectorAll('.metric-number, .stat-value');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    const finalValue = entry.target.textContent;
                    
                    // Skip if not a number
                    if (!finalValue.match(/\d/)) return;
                    
                    // Extract number and suffix
                    const match = finalValue.match(/(\d+\.?\d*)(.*)/);
                    if (!match) return;
                    
                    const number = parseFloat(match[1]);
                    const suffix = match[2];
                    const duration = 1500;
                    const steps = 60;
                    const increment = number / steps;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            entry.target.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(current) + suffix;
                        }
                    }, duration / steps);
                }
            });
        }, { threshold: 0.5 });
        
        metricNumbers.forEach(el => observer.observe(el));
    };
    
    animateNumbers();
    
    // Partner logos hover effect enhancement
    const partnerLogos = document.querySelectorAll('.partner-logo');
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });
    
    console.log('✅ Team Analytics Charts initialized successfully');
});
