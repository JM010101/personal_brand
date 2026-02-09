/**
 * Contact form handling
 * Client-side validation, error handling, and submission logic
 */

(function() {
    'use strict';

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const formFields = {
        name: {
            element: document.getElementById('name'),
            error: document.getElementById('name-error'),
            validator: validateName
        },
        email: {
            element: document.getElementById('email'),
            error: document.getElementById('email-error'),
            validator: validateEmail
        },
        phone: {
            element: document.getElementById('phone'),
            error: document.getElementById('phone-error'),
            validator: validatePhone,
            required: false
        },
        subject: {
            element: document.getElementById('subject'),
            error: document.getElementById('subject-error'),
            validator: validateSubject
        },
        message: {
            element: document.getElementById('message'),
            error: document.getElementById('message-error'),
            validator: validateMessage
        }
    };

    const successMessage = document.getElementById('form-success');

    /**
     * Validate name field
     */
    function validateName(value) {
        if (!value || value.trim().length === 0) {
            return 'Name is required';
        }
        if (value.trim().length < 2) {
            return 'Name must be at least 2 characters';
        }
        if (value.trim().length > 100) {
            return 'Name must be less than 100 characters';
        }
        return '';
    }

    /**
     * Validate email field
     */
    function validateEmail(value) {
        if (!value || value.trim().length === 0) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    /**
     * Validate phone field (optional)
     */
    function validatePhone(value) {
        if (!value || value.trim().length === 0) {
            return ''; // Phone is optional
        }
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            return 'Please enter a valid phone number';
        }
        return '';
    }

    /**
     * Validate subject field
     */
    function validateSubject(value) {
        if (!value || value.trim().length === 0) {
            return 'Please select a subject';
        }
        return '';
    }

    /**
     * Validate message field
     */
    function validateMessage(value) {
        if (!value || value.trim().length === 0) {
            return 'Message is required';
        }
        if (value.trim().length < 10) {
            return 'Message must be at least 10 characters';
        }
        if (value.trim().length > 2000) {
            return 'Message must be less than 2000 characters';
        }
        return '';
    }

    /**
     * Display error message
     */
    function showError(fieldName, message) {
        const field = formFields[fieldName];
        if (field && field.error) {
            field.error.textContent = message;
            field.error.style.display = 'block';
            if (field.element) {
                field.element.setAttribute('aria-invalid', 'true');
                field.element.classList.add('error');
            }
        }
    }

    /**
     * Clear error message
     */
    function clearError(fieldName) {
        const field = formFields[fieldName];
        if (field && field.error) {
            field.error.textContent = '';
            field.error.style.display = 'none';
            if (field.element) {
                field.element.setAttribute('aria-invalid', 'false');
                field.element.classList.remove('error');
            }
        }
    }

    /**
     * Validate single field
     */
    function validateField(fieldName) {
        const field = formFields[fieldName];
        if (!field || !field.element) return true;

        const value = field.element.value;
        const isRequired = field.required !== false;
        
        // Skip validation if field is optional and empty
        if (!isRequired && (!value || value.trim().length === 0)) {
            clearError(fieldName);
            return true;
        }

        const error = field.validator(value);
        if (error) {
            showError(fieldName, error);
            return false;
        } else {
            clearError(fieldName);
            return true;
        }
    }

    /**
     * Validate all fields
     */
    function validateForm() {
        let isValid = true;
        
        Object.keys(formFields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Show success message
     */
    function showSuccess() {
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.setAttribute('role', 'alert');
            successMessage.focus();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    /**
     * Hide success message
     */
    function hideSuccess() {
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }

    /**
     * Reset form
     */
    function resetForm() {
        contactForm.reset();
        Object.keys(formFields).forEach(fieldName => {
            clearError(fieldName);
        });
        hideSuccess();
    }

    /**
     * Handle form submission
     */
    async function handleSubmit(e) {
        e.preventDefault();
        
        // Hide previous success message
        hideSuccess();

        // Validate form
        if (!validateForm()) {
            // Focus first error field
            const firstError = Object.keys(formFields).find(fieldName => {
                const field = formFields[fieldName];
                return field && field.element && field.element.getAttribute('aria-invalid') === 'true';
            });
            
            if (firstError && formFields[firstError].element) {
                formFields[firstError].element.focus();
            }
            
            return;
        }

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Disable submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // TODO: Replace with actual API endpoint
            // For now, simulate form submission
            await simulateFormSubmission(data);
            
            // Show success message
            showSuccess();
            
            // Reset form after delay
            setTimeout(() => {
                resetForm();
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }, 3000);
            
        } catch (error) {
            // Show error message
            showError('message', 'Failed to send message. Please try again or contact us directly.');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }

    /**
     * Simulate form submission (replace with actual API call)
     */
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                console.log('Form data:', data);
                // In production, replace this with actual API call:
                // fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
                //     .then(response => response.json())
                //     .then(data => resolve(data))
                //     .catch(error => reject(error));
                
                // For demo purposes, always resolve
                resolve({ success: true });
            }, 1000);
        });
    }

    /**
     * Initialize form handlers
     */
    function init() {
        // Real-time validation on blur
        Object.keys(formFields).forEach(fieldName => {
            const field = formFields[fieldName];
            if (field && field.element) {
                field.element.addEventListener('blur', () => {
                    validateField(fieldName);
                });

                // Clear error on input
                field.element.addEventListener('input', () => {
                    if (field.element.getAttribute('aria-invalid') === 'true') {
                        validateField(fieldName);
                    }
                });
            }
        });

        // Form submission
        contactForm.addEventListener('submit', handleSubmit);

        // Prevent form submission on Enter key in textarea (allow Shift+Enter for new line)
        const messageField = formFields.message.element;
        if (messageField) {
            messageField.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    // Allow default behavior (form submission will be handled by submit handler)
                }
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
