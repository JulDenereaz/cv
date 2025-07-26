// Modern JavaScript for enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add loading states for external links
    document.querySelectorAll('a[href^="http"], a[href^="/"]').forEach(link => {
        if (!link.href.includes(window.location.hostname) && !link.href.startsWith('/')) {
            link.addEventListener('click', function(e) {
                const card = this.closest('.card, .service-card');
                if (card) {
                    card.style.opacity = '0.7';
                    card.style.transform = 'scale(0.98)';
                }
            });
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.card, .service-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

    // Add dynamic color to cards based on game category
    const categoryColors = {
        'puzzle': '#e74c3c',
        'arcade': '#27ae60',
        'card': '#2c3e50',
        'strategy': '#f39c12',
        'adventure': '#8e44ad',
        'skill': '#34495e',
        'utility': '#16a085',
        'creative': '#e67e22'
    };

    document.querySelectorAll('.card').forEach(card => {
        const category = card.querySelector('.card-category');
        const icon = card.querySelector('.card-icon');
        
        if (category && icon) {
            const categoryText = category.textContent.toLowerCase().trim();
            const color = categoryColors[categoryText];
            
            if (color) {
                icon.style.background = `linear-gradient(135deg, ${color}, ${color}dd)`;
                
                card.addEventListener('mouseenter', () => {
                    card.style.borderColor = color;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.borderColor = 'var(--border-color)';
                });
            }
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Performance optimization: lazy load images if any
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Add focus styles for keyboard navigation
const focusStyles = `
    .keyboard-navigation .card:focus,
    .keyboard-navigation .service-card:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 4px;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = focusStyles;
document.head.appendChild(styleSheet);
