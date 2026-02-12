// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll behavior
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
        
        lastScroll = currentScroll;
    });
    
    // Simple scroll animation (can be replaced with GSAP)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
    
    // Contact form handling with Formspree integration
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner-border');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Hide previous messages
            formMessage.classList.add('d-none');
            formMessage.classList.remove('alert-success', 'alert-danger', 'alert-info');
            
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'danger');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'danger');
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            spinner.classList.remove('d-none');
            
            try {
                // Get form action URL (Formspree endpoint)
                const formAction = contactForm.getAttribute('action');
                
                // Check if Formspree is configured
                if (formAction && formAction.includes('YOUR_FORM_ID')) {
                    // Formspree not configured - show instructions
                    showFormMessage('Form submission is ready! Please configure Formspree: 1) Go to formspree.io, 2) Create a form, 3) Replace YOUR_FORM_ID in the form action attribute with your Formspree form ID.', 'info');
                    submitBtn.disabled = false;
                    btnText.textContent = 'Send Message';
                    spinner.classList.add('d-none');
                    return;
                }
                
                // Submit to Formspree
                const formData = new FormData(contactForm);
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        showFormMessage('There was an error submitting the form. Please try again.', 'danger');
                    } else {
                        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                        contactForm.reset();
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showFormMessage('There was an error sending your message. Please try again later or contact me directly.', 'danger');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                spinner.classList.add('d-none');
            }
        });
    }
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.classList.add(`alert-${type}`);
        formMessage.classList.remove('d-none');
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.classList.add('d-none');
            }, 5000);
        }
    }

    // GSAP hero heading animation + draggable floating shapes
    if (typeof gsap !== "undefined") {
        const heroTimeline = gsap.timeline({
            defaults: { duration: 0.9, ease: "power3.out" }
        });

        heroTimeline
            .from(".hero-heading", {
                opacity: 0,
                y: 50,
                skewY: 4
            })
            .from(".hero-subtitle", {
                opacity: 0,
                y: 30
            }, "-=0.5")
            .from(".hero-cta", {
                opacity: 1,
                y: 20
            }, "-=0.5")
            .from(".hero-illustration", {
                opacity: 0,
                x: 40
            }, "-=0.6")
            .fromTo(".text-accent", {
                filter: "brightness(1)",
            }, {
                filter: "brightness(1.4)",
                duration: 0.6,
                yoyo: true,
                repeat: 1
            }, "-=0.3");

        // Draggable floating illustrations with optional inertia
        if (typeof Draggable !== "undefined") {
            if (typeof InertiaPlugin !== "undefined") {
                gsap.registerPlugin(Draggable, InertiaPlugin);
            } else {
                gsap.registerPlugin(Draggable);
            }

            Draggable.create(".floating-illustration", {
                type: "x,y",
                edgeResistance: 0.85,
                bounds: ".hero-section",
                inertia: typeof InertiaPlugin !== "undefined",
                onPress: function () {
                    // stop CSS float animation so GSAP transforms fully control position
                    this.target.style.animation = "none";
                }
            });
        }
    }
});
