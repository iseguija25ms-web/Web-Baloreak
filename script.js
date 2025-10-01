let currentLang = 'eu'; // Default language is Basque
let isTranslating = false;

const langToggle = document.getElementById('langToggle');
const langToggleMobile = document.getElementById('langToggleMobile');
const langText = document.getElementById('langText');
const langTextMobile = document.getElementById('langTextMobile');

function toggleLanguage() {
    if (isTranslating) return; // Prevent multiple clicks during translation
    
    currentLang = currentLang === 'eu' ? 'es' : 'eu';
    updateLanguageWithAnimation();
}

langToggle.addEventListener('click', toggleLanguage);
langToggleMobile.addEventListener('click', toggleLanguage);

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
        
        // Update language toggle buttons
        langText.textContent = currentLang === 'eu' ? 'ES' : 'EU';
        langTextMobile.textContent = currentLang === 'eu' ? 'ES' : 'EU';
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
    langTextMobile.textContent = currentLang === 'eu' ? 'ES' : 'EU';
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

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Modal Functionality
const openContactModal = document.getElementById('openContactModal');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');

openContactModal.addEventListener('click', () => {
    contactModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    contactModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="translatable" data-eu="Bidaltzen..." data-es="Enviando...">Bidaltzen...</span>';
    
    setTimeout(() => {
        formSuccess.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 5000);
    }, 1500);
});

// Quick Contact Form (Modal)
const quickContactForm = document.getElementById('quickContactForm');
const modalSuccess = document.getElementById('modalSuccess');

quickContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = quickContactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="translatable" data-eu="Bidaltzen..." data-es="Enviando...">Bidaltzen...</span>';
    
    setTimeout(() => {
        modalSuccess.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        quickContactForm.reset();
        
        setTimeout(() => {
            contactModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            modalSuccess.classList.add('hidden');
        }, 2000);
    }, 1500);
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Add keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !contactModal.classList.contains('hidden')) {
        contactModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Add active state to navigation links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-purple-600');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-purple-600');
        }
    });
});

// Easter egg - Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join(',').includes(konamiPattern.join(','))) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add CSS for rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Performance optimization - Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Console message for developers
console.log('%c🎨 BackflipStore', 'font-size: 40px; color: #667eea; font-weight: bold;');
console.log('%cZure estiloko arropa - Vintage moda jasangarritasunarekin', 'font-size: 16px; color: #764ba2;');
console.log('%c💜 Made with love for sustainable fashion', 'font-size: 14px; color: #667eea;');

// Image Lightbox Functionality
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');

// Add click event to all product images
document.querySelectorAll('.product-card img').forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        imageLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Add cursor pointer
    img.style.cursor = 'zoom-in';
});

// Close lightbox
lightboxClose.addEventListener('click', () => {
    imageLightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

imageLightbox.addEventListener('click', (e) => {
    if (e.target === imageLightbox) {
        imageLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close lightbox on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageLightbox.classList.contains('active')) {
        imageLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Add fade-in animation to product cards on scroll
const productCards = document.querySelectorAll('.product-card');
const productObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
        }
    });
}, { threshold: 0.1 });

productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    productObserver.observe(card);
});

// Add smooth hover effect to badges
document.querySelectorAll('.badge-pulse').forEach(badge => {
    badge.classList.add('badge-pulse');
});

// Preload images
const preloadImages = () => {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });
};

window.addEventListener('load', preloadImages);

// Add loading state to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    setTimeout(() => {
        // Trigger any entrance animations
        document.querySelectorAll('.fade-in-load').forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
});

// Shopping Cart System
let cart = [];

// Cart Modal Elements
const cartModal = document.getElementById('cartModal');
const cartBtn = document.getElementById('cartBtn');
const cartBtnMobile = document.getElementById('cartBtnMobile');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartCountMobile = document.getElementById('cartCountMobile');
const cartItems = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartSummary = document.getElementById('cartSummary');
const cartTotal = document.getElementById('cartTotal');
const donation = document.getElementById('donation');
const checkoutBtn = document.getElementById('checkoutBtn');

// Open Cart
function openCart() {
    cartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderCart();
}

cartBtn.addEventListener('click', openCart);
cartBtnMobile.addEventListener('click', openCart);

// Close Cart
closeCart.addEventListener('click', () => {
    cartModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Add to Cart - Use event delegation for dynamic buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn')) {
        const btn = e.target.closest('.add-to-cart-btn');
        e.stopPropagation();
        const productCard = btn.closest('.product-card');
        const productData = productCard.dataset.product;
        
        if (productData) {
            const product = JSON.parse(productData);
            addToCart(product);
            
            // Visual feedback
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check mr-1"></i><span class="translatable" data-eu="Gehitua!" data-es="¡Añadido!">Gehitua!</span>';
            btn.style.background = 'linear-gradient(to right, #10b981, #059669)';
            
            // Play success animation
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-cart-plus mr-1"></i><span class="translatable" data-eu="Erosi" data-es="Comprar">Erosi</span>';
                btn.style.background = '';
            }, 2000);
        }
    }
});

// Add to Cart Function
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCart();
}

// Remove from Cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartCount();
    renderCart();
    saveCart();
}

// Update Quantity
function updateQuantity(productName, change) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCartCount();
            renderCart();
            saveCart();
        }
    }
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
    cartCountMobile.textContent = count;
}

// Render Cart
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCart.classList.remove('hidden');
        cartSummary.classList.add('hidden');
        return;
    }
    
    emptyCart.classList.add('hidden');
    cartSummary.classList.remove('hidden');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item flex items-center space-x-4 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-contain rounded">
            <div class="flex-1">
                <h4 class="font-bold">${item.name}</h4>
                <p class="text-sm text-gray-600">${item.price}€ × ${item.quantity}</p>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateQuantity('${item.name}', -1)" class="w-8 h-8 bg-white border-2 border-gray-300 rounded-full hover:bg-red-50 hover:border-red-400 transition-all">
                    <i class="fas fa-minus text-xs"></i>
                </button>
                <span class="w-8 text-center font-bold text-lg">${item.quantity}</span>
                <button onclick="updateQuantity('${item.name}', 1)" class="w-8 h-8 bg-white border-2 border-gray-300 rounded-full hover:bg-green-50 hover:border-green-400 transition-all">
                    <i class="fas fa-plus text-xs"></i>
                </button>
            </div>
            <div class="text-right">
                <p class="font-bold text-purple-600 text-lg">${(item.price * item.quantity).toFixed(2)}€</p>
                <button onclick="removeFromCart('${item.name}')" class="text-red-500 hover:text-red-700 text-sm mt-1 transition-colors">
                    <i class="fas fa-trash mr-1"></i><span class="translatable" data-eu="Ezabatu" data-es="Eliminar">Ezabatu</span>
                </button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const donationAmount = total * 0.2;
    
    cartTotal.textContent = `${total.toFixed(2)}€`;
    donation.textContent = `${donationAmount.toFixed(2)}€`;
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('backflipstore_cart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('backflipstore_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Checkout
checkoutBtn.addEventListener('click', () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const donationAmount = (total * 0.2).toFixed(2);
    
    alert(`🎉 Eskerrik asko! / ¡Gracias!\n\nGuztira / Total: ${total.toFixed(2)}€\nUNICEFerako / Para UNICEF: ${donationAmount}€\n\n✨ Zure erosketak ingurumena eta gizartea laguntzen du!\n✨ Tu compra ayuda al medio ambiente y a la sociedad!`);
    
    cart = [];
    updateCartCount();
    renderCart();
    saveCart();
    
    cartModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Initialize Cart on Load
loadCart();

// ==================== CUSTOM T-SHIRT DESIGNER ====================

const tshirtPath = document.getElementById('tshirt-path');
const colorButtons = document.querySelectorAll('.color-btn');
const imageUpload = document.getElementById('image-upload');
const uploadedImageInfo = document.getElementById('uploaded-image-info');
const imageName = document.getElementById('image-name');
const removeImageBtn = document.getElementById('remove-image');
const imageControls = document.getElementById('image-controls');
const imageSizeSlider = document.getElementById('image-size');
const resetDesignBtn = document.getElementById('reset-design');
const addCustomToCartBtn = document.getElementById('add-custom-to-cart');
const designBounds = document.getElementById('design-bounds');

let currentColor = '#ffffff';
let uploadedImage = null;
let designImage = null;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let imageX = 0;
let imageY = 0;

// Color Selection
colorButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove ring from all buttons
        colorButtons.forEach(b => b.classList.remove('ring-4', 'ring-purple-500'));
        
        // Add ring to selected button
        this.classList.add('ring-4', 'ring-purple-500');
        
        // Change t-shirt color
        currentColor = this.getAttribute('data-color');
        tshirtPath.setAttribute('fill', currentColor);
    });
});

// Image Upload
imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('⚠️ Irudia handiegia da / La imagen es demasiado grande (max 5MB)');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            uploadedImage = event.target.result;
            createDesignImage(uploadedImage);
            
            // Show uploaded image info
            imageName.textContent = file.name;
            uploadedImageInfo.classList.remove('hidden');
            imageControls.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

// Create draggable design image
function createDesignImage(imageSrc) {
    // Remove existing image if any
    if (designImage) {
        designImage.remove();
    }
    
    // Create new image element
    designImage = document.createElement('img');
    designImage.src = imageSrc;
    designImage.className = 'absolute cursor-move select-none';
    designImage.style.width = '100px';
    designImage.style.height = '100px';
    designImage.style.objectFit = 'contain';
    designImage.style.left = '50%';
    designImage.style.top = '50%';
    designImage.style.transform = 'translate(-50%, -50%)';
    designImage.style.pointerEvents = 'auto';
    designImage.draggable = false;
    
    designBounds.appendChild(designImage);
    
    // Reset position
    imageX = 0;
    imageY = 0;
    
    // Add drag functionality
    setupDragListeners();
}

// Setup drag listeners
function setupDragListeners() {
    designImage.addEventListener('mousedown', startDrag);
    designImage.addEventListener('touchstart', startDrag);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
}

function startDrag(e) {
    isDragging = true;
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    dragStartX = clientX - imageX;
    dragStartY = clientY - imageY;
    
    designImage.style.cursor = 'grabbing';
    e.preventDefault();
}

function drag(e) {
    if (!isDragging) return;
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    imageX = clientX - dragStartX;
    imageY = clientY - dragStartY;
    
    // Apply position
    updateImagePosition();
    
    e.preventDefault();
}

function stopDrag() {
    if (isDragging) {
        isDragging = false;
        designImage.style.cursor = 'move';
    }
}

function updateImagePosition() {
    if (!designImage) return;
    
    const bounds = designBounds.getBoundingClientRect();
    const imageRect = designImage.getBoundingClientRect();
    
    // Calculate how much of the image is outside the bounds
    const leftOut = Math.max(0, bounds.left - imageRect.left);
    const rightOut = Math.max(0, imageRect.right - bounds.right);
    const topOut = Math.max(0, bounds.top - imageRect.top);
    const bottomOut = Math.max(0, imageRect.bottom - bounds.bottom);
    
    // Calculate total area outside
    const totalOut = leftOut + rightOut + topOut + bottomOut;
    const maxOut = imageRect.width * 2; // Maximum distance before fully fading
    
    // Calculate opacity (fade out as image moves outside)
    let opacity = 1 - (totalOut / maxOut);
    opacity = Math.max(0, Math.min(1, opacity));
    
    designImage.style.opacity = opacity;
    designImage.style.left = `calc(50% + ${imageX}px)`;
    designImage.style.top = `calc(50% + ${imageY}px)`;
}

// Image size control
imageSizeSlider.addEventListener('input', function() {
    if (designImage) {
        const size = this.value;
        designImage.style.width = size + 'px';
        designImage.style.height = size + 'px';
        updateImagePosition();
    }
});

// Remove image
removeImageBtn.addEventListener('click', function() {
    if (designImage) {
        designImage.remove();
        designImage = null;
    }
    uploadedImage = null;
    imageUpload.value = '';
    uploadedImageInfo.classList.add('hidden');
    imageControls.classList.add('hidden');
    imageSizeSlider.value = 100;
    imageX = 0;
    imageY = 0;
});

// Reset design
resetDesignBtn.addEventListener('click', function() {
    // Reset position and size
    imageX = 0;
    imageY = 0;
    imageSizeSlider.value = 100;
    
    if (designImage) {
        designImage.style.width = '100px';
        designImage.style.height = '100px';
        designImage.style.opacity = 1;
        updateImagePosition();
    }
});

// Add custom t-shirt to cart
addCustomToCartBtn.addEventListener('click', function() {
    if (!uploadedImage) {
        alert('⚠️ Mesedez, kargatu irudi bat lehenik / Por favor, sube una imagen primero');
        return;
    }
    
    // Create custom product
    const customProduct = {
        name: `Kamiseta Pertsonalizatua / Camiseta Personalizada`,
        price: 30,
        image: uploadedImage,
        color: currentColor,
        custom: true
    };
    
    // Add to cart
    const existingItem = cart.find(item => item.custom && item.image === customProduct.image);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...customProduct, quantity: 1 });
    }
    
    updateCartCount();
    saveCart();
    
    // Show success message
    const successMsg = currentLang === 'eu' 
        ? '✅ Kamiseta saskira gehitu da!' 
        : '✅ ¡Camiseta añadida al carrito!';
    
    alert(successMsg);
});

// Drag and drop for image upload
const uploadArea = document.querySelector('.border-dashed');

uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('border-purple-500', 'bg-purple-50');
});

uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.classList.remove('border-purple-500', 'bg-purple-50');
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('border-purple-500', 'bg-purple-50');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        // Simulate file input change
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        imageUpload.files = dataTransfer.files;
        
        // Trigger change event
        const event = new Event('change', { bubbles: true });
        imageUpload.dispatchEvent(event);
    }
});
