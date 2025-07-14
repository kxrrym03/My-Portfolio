document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initContactForm();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Handle scroll effects on navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Handle navigation links
    const navLinks = document.querySelectorAll('a[href^="#"], .nav-link, .nav-mobile-link, .footer-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href);
                
                // Close mobile menu if open
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });
}

// Smooth scrolling functionality
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const navbarHeight = 64; // 4rem in pixels
        const elementPosition = element.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => observer.observe(bar));
    
    // Animate cards on scroll
    const cards = document.querySelectorAll('.highlight-card, .skill-category-card, .project-card, .education-card, .certification-card, .activity-card, .academic-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initially hide cards and animate them
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showToast('Missing Information', 'Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Invalid Email', 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<svg class="icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            showToast('Message Sent!', 'Thank you for your message. I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Toast notification system
function showToast(title, description, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    const toastIcon = toast.querySelector('.toast-icon');
    
    // Update content
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // Update icon based on type
    if (type === 'error') {
        toastIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
        toastIcon.style.backgroundColor = '#ef4444';
    } else {
        toastIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>';
        toastIcon.style.backgroundColor = 'var(--success)';
    }
    
    // Show toast
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 5000);
}

// Animation utilities
function initAnimations() {
    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add typing effect to hero title (optional enhancement)
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Utility functions for external use
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;

// Handle external link clicks
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="http"], a[href^="mailto:"], a[href^="tel:"]');
    if (link && link.getAttribute('target') !== '_blank' && !link.getAttribute('href').startsWith('mailto:') && !link.getAttribute('href').startsWith('tel:')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// Add smooth scrolling for browsers that don't support CSS scroll-behavior
if (!CSS.supports('scroll-behavior', 'smooth')) {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = 64;
                const targetPosition = target.offsetTop - navbarHeight;
                
                // Polyfill for smooth scrolling
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Handle resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            const mobileToggle = document.getElementById('mobile-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }, 250);
});

// Add focus management for accessibility
document.addEventListener('keydown', function(e) {
    // Handle escape key to close mobile menu
    if (e.key === 'Escape') {
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileToggle.focus();
        }
    }
    
    // Handle tab navigation in mobile menu
    if (e.key === 'Tab' && document.getElementById('mobile-menu').classList.contains('active')) {
        const focusableElements = document.getElementById('mobile-menu').querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

console.log('Portfolio loaded successfully! 🚀');