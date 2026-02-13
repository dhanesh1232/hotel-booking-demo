document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const iconOpen = document.getElementById('iconOpen');
    const iconClose = document.getElementById('iconClose');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                mobileMenu.classList.remove('active');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                }, 400); // Wait for animation
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                // Use a tiny timeout to trigger animation
                setTimeout(() => {
                    mobileMenu.classList.add('active');
                }, 10);
                iconOpen.classList.add('hidden');
                iconClose.classList.remove('hidden');
            }
        });

        // Close menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                }, 400);
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
            });
        });
    }

    // Sticky Navbar & Scroll Progress
    const header = document.querySelector('header');
    const updateHeader = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled', 'shadow-lg');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('scrolled', 'shadow-lg');
            header.classList.add('py-4');
        }
    };

    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Initial check

    // Room Filtering System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                
                // Update UI state
                filterButtons.forEach(b => {
                    b.classList.remove('bg-navy-900', 'text-white', 'shadow-md', 'active');
                    b.classList.add('hover:bg-slate-50');
                });
                btn.classList.add('bg-navy-900', 'text-white', 'shadow-md', 'active');
                btn.classList.remove('hover:bg-slate-50');

                // Filter cards with staggered animation
                let delay = 0;
                roomCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.transition = 'all 0.5s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, delay);
                        delay += 100;
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Hero Parallax Effect (Subtle)
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            heroImage.style.transform = `translateY(${scroll * 0.4}px)`;
        });
    }

    // Form Handling (Real Feel)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const isBooking = form.id === 'bookingForm' || form.id === 'contactForm';
            if (isBooking) {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                
                btn.disabled = true;
                btn.innerHTML = '<span class="flex items-center gap-2">Processing... <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>';
                
                setTimeout(() => {
                    btn.innerHTML = 'Enquiry Sent Successfully! ✨';
                    btn.classList.remove('btn-primary', 'btn-accent');
                    btn.classList.add('bg-green-600', 'text-white');
                    form.reset();
                    
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = originalText;
                        btn.classList.add('btn-primary'); // or btn-accent based on original
                        btn.classList.remove('bg-green-600');
                    }, 4000);
                }, 1500);
            }
        });
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.85) {
                el.classList.add('animate-fade-in-up');
                el.style.opacity = '1';
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
});
