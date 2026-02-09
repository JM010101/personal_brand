/**
 * Main JavaScript functionality
 * Scroll animations, lazy loading, and core interactive features
 */

(function() {
    'use strict';

    /**
     * Lazy load images
     */
    function initLazyLoading() {
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px'
            });

            // Observe all images with data-src attribute
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without Intersection Observer
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    /**
     * Scroll animations using Intersection Observer
     */
    function initScrollAnimations() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            return; // Skip animations if user prefers reduced motion
        }

        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        // Optionally stop observing after animation
                        // animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements with animation classes
            const animatedElements = document.querySelectorAll('.value-card, .featured-card, .topic-card, .service-card, .testimonial-card, .case-card, .credential-card, .event-card');
            animatedElements.forEach(el => {
                el.classList.add('animate-on-scroll');
                animationObserver.observe(el);
            });
        }
    }

    /**
     * Smooth scroll to top button
     */
    function initScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--color-primary);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
            z-index: 1000;
            font-size: 1.5rem;
            box-shadow: var(--shadow-lg);
        `;
        
        document.body.appendChild(scrollToTopBtn);

        // Show/hide button based on scroll position
        function toggleScrollToTop() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        }

        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Update button visibility on scroll
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    toggleScrollToTop();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial check
        toggleScrollToTop();
    }

    /**
     * Handle external links
     */
    function initExternalLinks() {
        const links = document.querySelectorAll('a[href^="http"]');
        links.forEach(link => {
            // Skip if it's the same domain
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                // Add visual indicator (optional)
                link.setAttribute('aria-label', `${link.textContent} (opens in new tab)`);
            }
        });
    }

    /**
     * Add loading states to images
     */
    function initImageLoading() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading class if image is not already loaded
            if (!img.complete) {
                img.classList.add('loading');
            }

            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            });

            img.addEventListener('error', () => {
                img.classList.remove('loading');
                img.classList.add('error');
                // Optionally set a placeholder
                img.alt = 'Image failed to load';
            });
        });
    }

    /**
     * Initialize analytics placeholder
     */
    function initAnalytics() {
        // Placeholder for analytics tracking
        // Replace with actual analytics code (Google Analytics, etc.)
        console.log('Analytics initialized');
        
        // Example: Track page views
        // if (typeof gtag !== 'undefined') {
        //     gtag('config', 'GA_MEASUREMENT_ID', {
        //         page_path: window.location.pathname
        //     });
        // }
    }

    /**
     * Handle focus visible polyfill for older browsers
     */
    function initFocusVisible() {
        // Add focus-visible class for browsers that don't support :focus-visible
        if (!CSS.supports('selector(:focus-visible)')) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });
        }
    }

    /**
     * Initialize all features
     */
    function init() {
        initLazyLoading();
        initScrollAnimations();
        initScrollToTop();
        initExternalLinks();
        initImageLoading();
        initAnalytics();
        initFocusVisible();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
