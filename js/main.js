/**
 * Main JavaScript for Manuel Hecht Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Highlight active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animation for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.project-card, .section-title, .hero h1, .hero h2, .hero p, .cta-button').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Add some dynamic color effects on hover for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const randomAccent = getRandomAccentColor();
            this.style.boxShadow = `0 20px 40px var(--shadow-color), 0 0 15px ${randomAccent}`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px var(--shadow-color)';
        });
    });
});

// Helper function to get a random accent color
function getRandomAccentColor() {
    const accentColors = [
        'var(--accent-primary)',
        'var(--accent-secondary)',
        'var(--accent-tertiary)'
    ];
    
    return accentColors[Math.floor(Math.random() * accentColors.length)];
}

// Add some additional CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero h1.animate {
        transition-delay: 0.1s;
    }
    
    .hero h2.animate {
        transition-delay: 0.3s;
    }
    
    .hero p.animate {
        transition-delay: 0.5s;
    }
    
    .cta-button.animate {
        transition-delay: 0.7s;
    }
`;
document.head.appendChild(style);