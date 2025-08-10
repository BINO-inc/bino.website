// ===== PERFORMANCE OPTIMIZATION SCRIPT FOR BINO.INC =====

(function() {
    'use strict';

    // Performance monitoring
    const performanceObserver = {
        init() {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.entryType === 'largest-contentful-paint') {
                            console.log('LCP:', entry.startTime);
                        }
                        if (entry.entryType === 'first-input') {
                            console.log('FID:', entry.processingStart - entry.startTime);
                        }
                        if (entry.entryType === 'layout-shift') {
                            console.log('CLS:', entry.value);
                        }
                    }
                });
                
                observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
            }
        }
    };

    // Lazy loading for images
    const lazyLoading = {
        init() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    });
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            } else {
                // Fallback for older browsers
                document.querySelectorAll('img[data-src]').forEach(img => {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                });
            }
        }
    };

    // Smooth scrolling for anchor links
    const smoothScrolling = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    // Intersection Observer for animations
    const animationObserver = {
        init() {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible', 'in-view');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                // Observe elements with animation classes
                document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .observe').forEach(el => {
                    observer.observe(el);
                });
            } else {
                // Fallback for older browsers
                document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .observe').forEach(el => {
                    el.classList.add('visible', 'in-view');
                });
            }
        }
    };

    // Preload critical resources
    const resourcePreloader = {
        init() {
            const criticalResources = [
                'hero-bg.jpg',
                'cybersecurity-bg.jpg',
                'teamwork-bg.jpg'
            ];

            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = resource;
                document.head.appendChild(link);
            });
        }
    };

    // Form validation and enhancement
    const formEnhancement = {
        init() {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', this.handleSubmit.bind(this));
                
                // Real-time validation
                const inputs = form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('blur', this.validateField.bind(this));
                    input.addEventListener('input', this.clearErrors.bind(this));
                });
            });
        },

        handleSubmit(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    this.showError(field, 'This field is required');
                    isValid = false;
                }
            });

            if (isValid) {
                this.submitForm(form, formData);
            }
        },

        validateField(e) {
            const field = e.target;
            const value = field.value.trim();

            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    this.showError(field, 'Please enter a valid email address');
                    return;
                }
            }

            if (field.hasAttribute('required') && !value) {
                this.showError(field, 'This field is required');
                return;
            }

            this.clearErrors(e);
        },

        showError(field, message) {
            this.clearErrors({target: field});
            field.classList.add('error');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = '#ff6b6b';
            errorDiv.style.fontSize = '0.8rem';
            errorDiv.style.marginTop = '5px';
            
            field.parentNode.appendChild(errorDiv);
        },

        clearErrors(e) {
            const field = e.target;
            field.classList.remove('error');
            const errorMessage = field.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        },

        async submitForm(form, formData) {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');

            try {
                // Simulate form submission (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                this.showSuccessMessage(form);
                form.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                this.showErrorMessage(form, 'Failed to send message. Please try again.');
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }
        },

        showSuccessMessage(form) {
            const message = document.createElement('div');
            message.className = 'success-message';
            message.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            message.style.cssText = `
                background: rgba(81, 207, 102, 0.2);
                color: #51cf66;
                padding: 15px;
                border-radius: 10px;
                margin-top: 20px;
                border: 1px solid rgba(81, 207, 102, 0.3);
            `;
            
            form.appendChild(message);
            setTimeout(() => message.remove(), 5000);
        },

        showErrorMessage(form, text) {
            const message = document.createElement('div');
            message.className = 'error-message';
            message.textContent = text;
            message.style.cssText = `
                background: rgba(255, 107, 107, 0.2);
                color: #ff6b6b;
                padding: 15px;
                border-radius: 10px;
                margin-top: 20px;
                border: 1px solid rgba(255, 107, 107, 0.3);
            `;
            
            form.appendChild(message);
            setTimeout(() => message.remove(), 5000);
        }
    };

    // Mobile menu enhancement
    const mobileMenu = {
        init() {
            const menuToggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('nav');
            
            if (menuToggle && nav) {
                menuToggle.addEventListener('click', () => {
                    nav.classList.toggle('active');
                    menuToggle.classList.toggle('active');
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                        nav.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                });
            }
        }
    };

    // Scroll-based animations
    const scrollAnimations = {
        init() {
            let ticking = false;
            
            const updateScrollAnimations = () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                // Parallax effect for hero backgrounds
                const heroElements = document.querySelectorAll('.hero, .page-header');
                heroElements.forEach(hero => {
                    hero.style.transform = `translateY(${rate}px)`;
                });
                
                ticking = false;
            };

            const requestScrollUpdate = () => {
                if (!ticking) {
                    requestAnimationFrame(updateScrollAnimations);
                    ticking = true;
                }
            };

            window.addEventListener('scroll', requestScrollUpdate, { passive: true });
        }
    };

    // Keyboard navigation enhancement
    const keyboardNavigation = {
        init() {
            document.addEventListener('keydown', (e) => {
                // Skip to main content with Tab
                if (e.key === 'Tab' && !e.shiftKey) {
                    const skipLink = document.querySelector('.skip-link');
                    if (skipLink && document.activeElement === document.body) {
                        skipLink.focus();
                    }
                }

                // Close modals with Escape
                if (e.key === 'Escape') {
                    const activeModal = document.querySelector('.modal.active');
                    if (activeModal) {
                        activeModal.classList.remove('active');
                    }
                }
            });
        }
    };

    // Performance optimization utilities
    const performanceUtils = {
        // Debounce function
        debounce(func, wait, immediate) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    timeout = null;
                    if (!immediate) func(...args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func(...args);
            };
        },

        // Throttle function
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Check if element is in viewport
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    };

    // Initialize all modules when DOM is ready
    const init = () => {
        performanceObserver.init();
        lazyLoading.init();
        smoothScrolling.init();
        animationObserver.init();
        resourcePreloader.init();
        formEnhancement.init();
        mobileMenu.init();
        scrollAnimations.init();
        keyboardNavigation.init();

        // Add loaded class to body for CSS hooks
        document.body.classList.add('loaded');
        
        console.log('BINO.inc performance optimizations loaded successfully!');
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose utilities globally if needed
    window.BINO = {
        utils: performanceUtils
    };

})();

