let currentLang = 'eu'; // Default language is Basque
let isTranslating = false;

const langToggle = document.getElementById('langToggle');
const langText = document.getElementById('langText');

langToggle.addEventListener('click', () => {
    if (isTranslating) return; // Prevent multiple clicks during translation
    
    currentLang = currentLang === 'eu' ? 'es' : 'eu';
    updateLanguageWithAnimation();
});

function updateLanguageWithAnimation() {
    isTranslating = true;
    const translatableElements = document.querySelectorAll('.translatable');
    
    // Add translating class to trigger fade out
    translatableElements.forEach(element => {
        element.classList.add('translating');
    });
    
    // Wait for fade out animation to complete
    setTimeout(() => {
        // Update the text content
        translatableElements.forEach(element => {
            const text = element.getAttribute(`data-${currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update language toggle button
        langText.textContent = currentLang === 'eu' ? 'ES' : 'EU';
        document.documentElement.lang = currentLang;
        
        // Remove translating class to trigger fade in
        setTimeout(() => {
            translatableElements.forEach(element => {
                element.classList.remove('translating');
            });
            isTranslating = false;
        }, 50);
    }, 300);
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-eu][data-es]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLang}`);
        if (text) {
            element.textContent = text;
        }
    });

    langText.textContent = currentLang === 'eu' ? 'ES' : 'EU';
    document.documentElement.lang = currentLang;
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-fadeInUp, .animate-scaleIn, .animate-slideInLeft, .animate-slideInRight');
    animatedElements.forEach(el => observer.observe(el));
    
    // Initialize counter animations
    initCounters();
});

// Counter Animation for Statistics
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const speed = 200; // Lower is faster
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-count');
                const increment = target / speed;
                let count = 0;
                
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.ceil(count).toLocaleString();
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCount();
                statsObserver.unobserve(counter); // Only animate once
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => statsObserver.observe(counter));
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animate-float');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.gallery-item, .process-step');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});
