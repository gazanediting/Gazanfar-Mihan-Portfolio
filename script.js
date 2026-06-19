document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Contact form submission via hidden iframe
    const form = document.querySelector('.contact-form');
    const hiddenIframe = document.getElementById('hidden_iframe');

    if(form && hiddenIframe) {
        window.submitted = false; // Make it global so iframe onload can access if needed, though we use event listener here.
        
        form.addEventListener('submit', () => {
            window.submitted = true;
            const btn = form.querySelector('button');
            // Defer disabling the button so it doesn't prevent the form submission
            setTimeout(() => {
                btn.textContent = 'Sending...';
                btn.disabled = true;
            }, 10);
        });

        hiddenIframe.addEventListener('load', () => {
            if (window.submitted) {
                const btn = form.querySelector('button');
                btn.textContent = 'Send Message';
                btn.disabled = false;
                form.reset();

                const successModal = document.getElementById('success-modal');
                if(successModal) {
                    successModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                window.submitted = false;
            }
        });
    }

    // Success Modal Close Logic
    const successModal = document.getElementById('success-modal');
    const successCloseBtns = document.querySelectorAll('.success-close, .success-close-btn');
    if(successModal) {
        successCloseBtns.forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                successModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        window.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Modal Logic
    const viewWorksBtn = document.getElementById('view-works-btn');
    const worksModal = document.getElementById('works-modal');
    const worksCloseBtn = document.querySelector('.works-close');

    if (viewWorksBtn && worksModal && worksCloseBtn) {
        const stopVideos = () => {
            const iframes = worksModal.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                const src = iframe.src;
                iframe.src = src; 
                if (iframe.srcdoc) {
                    const srcdoc = iframe.srcdoc;
                    iframe.srcdoc = srcdoc; // Resets the custom thumbnail view
                }
            });
        };

        viewWorksBtn.addEventListener('click', (e) => {
            e.preventDefault();
            worksModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        worksCloseBtn.addEventListener('click', () => {
            worksModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            stopVideos();
        });

        window.addEventListener('click', (e) => {
            if (e.target === worksModal) {
                worksModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                stopVideos();
            }
        });
    }
});
