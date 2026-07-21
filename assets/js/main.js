// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animation on scroll for pillars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    const pillars = document.querySelectorAll('.pillar-card');
    pillars.forEach((pillar, index) => {
        // Initial state
        pillar.style.opacity = '0';
        pillar.style.transform = 'translateY(30px)';
        pillar.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
        
        observer.observe(pillar);
    });

    // Header scroll effect
    const header = document.querySelector('.glass-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
