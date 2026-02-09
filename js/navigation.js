/**
 * Navigation functionality
 * Handles mobile menu toggle, smooth scrolling, and active state management
 */

(function() {
    'use strict';

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        if (!mobileMenuToggle || !navMenu) return;

        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        if (!mobileMenuToggle || !navMenu) return;
        
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Handle smooth scrolling for anchor links
     */
    function handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        
        // Only handle internal anchor links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without triggering scroll
                history.pushState(null, null, href);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        } else if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
            // Close mobile menu when navigating to another page
            closeMobileMenu();
        }
    }

    /**
     * Set active navigation item based on current page
     */
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            const linkPage = linkPath.split('/').pop();
            
            // Remove active state
            link.removeAttribute('aria-current');
            
            // Set active state for current page
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    /**
     * Handle keyboard navigation
     */
    function handleKeyboardNav(e) {
        // Close menu on Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
            mobileMenuToggle.focus();
        }
    }

    /**
     * Handle clicks outside menu to close it
     */
    function handleOutsideClick(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            const isClickInsideNav = navMenu.contains(e.target);
            const isClickOnToggle = mobileMenuToggle && mobileMenuToggle.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnToggle) {
                closeMobileMenu();
            }
        }
    }

    /**
     * Initialize navigation
     */
    function init() {
        // Mobile menu toggle
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Smooth scrolling for anchor links
        navLinks.forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });

        // Set active navigation item
        setActiveNavItem();

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNav);

        // Close menu on outside click
        document.addEventListener('click', handleOutsideClick);

        // Close menu on window resize (if resizing to desktop)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }, 250);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
