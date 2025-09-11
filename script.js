// Language Toggle Functionality
let isJapanese = false;
const langBtn = document.getElementById('langToggle');

function toggleLanguage() {
    isJapanese = !isJapanese;
    
    // Update all translatable elements
    document.querySelectorAll('[data-en], [data-jp]').forEach(el => {
        if (el.hasAttribute('data-en') && el.hasAttribute('data-jp')) {
            el.textContent = isJapanese ? el.getAttribute('data-jp') : el.getAttribute('data-en');
        }
    });
    
    // Update page title
    document.title = isJapanese 
        ? document.querySelector('title').getAttribute('data-jp') 
        : document.querySelector('title').getAttribute('data-en');
    
    // Update button text
    langBtn.textContent = isJapanese ? "English" : "日本語";
    
    // Update site name
    document.getElementById('siteName').textContent = isJapanese 
        ? document.getElementById('siteName').getAttribute('data-jp') 
        : document.getElementById('siteName').getAttribute('data-en');
    
    // Update HTML lang attribute
    document.documentElement.lang = isJapanese ? 'ja' : 'en';
    
    // Save language preference to localStorage
    localStorage.setItem('language', isJapanese ? 'ja' : 'en');
}

// Initialize language from localStorage if available
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'ja') {
        isJapanese = true;
        toggleLanguage(); // Apply Japanese translations
    }
    
    // Add event listener to language toggle button
    langBtn.addEventListener('click', toggleLanguage);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
});

// Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('welcomeModal');
    const closeBtn = document.querySelector('.close');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Show modal on page load after a short delay
    setTimeout(() => {
        modal.classList.add('active');
    }, 1000);
    
    // Close modal when clicking on X
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking on close button
    modalCloseBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking anywhere outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert(isJapanese ? 
        'お問い合わせありがとうございます。折り返しご連絡させていただきます。' : 
        'Thank you for your message. We will get back to you soon.');
    
    // Reset form
    this.reset();
});

// ================== CAROUSEL FUNCTIONALITY ==================
let currentSlide = 0;
let autoPlayInterval;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const indicatorsContainer = document.getElementById('carouselIndicators');

// Create indicators
function createIndicators() {
    indicatorsContainer.innerHTML = ''; // Clear existing indicators
    
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            goToSlide(i);
        });
        indicatorsContainer.appendChild(indicator);
    }
}

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all indicators
    document.querySelectorAll('.carousel-indicator').forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show the selected slide
    slides[index].classList.add('active');
    
    // Activate the corresponding indicator
    if (indicatorsContainer.children[index]) {
        indicatorsContainer.children[index].classList.add('active');
    }
    
    currentSlide = index;
}

function nextSlide() {
    let nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
}

function prevSlide() {
    let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
}

function goToSlide(index) {
    showSlide(index);
    resetAutoPlay();
}

// Auto-play function
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    // Create indicators
    createIndicators();
    
    // Set up event listeners for buttons
    document.getElementById('nextBtn').addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play when user hovers over carousel
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
    
    // Fix image loading issues
    window.addEventListener('load', function() {
        // Force redraw of carousel images
        setTimeout(() => {
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                if (img) {
                    img.style.opacity = '1';
                }
            });
        }, 100);
    });
});

// ================== TOUCH SUPPORT FOR MOBILE ==================
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const minSwipeDistance = 50; // Minimum distance for a swipe to count
    
    if (touchEndX < touchStartX && touchStartX - touchEndX > minSwipeDistance) {
        // Swipe left - go to next slide
        nextSlide();
        resetAutoPlay();
    }
    
    if (touchEndX > touchStartX && touchEndX - touchStartX > minSwipeDistance) {
        // Swipe right - go to previous slide
        prevSlide();
        resetAutoPlay();
    }
}

// Add touch events to carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    
    if (carousel) {
        carousel.addEventListener('touchstart', handleTouchStart, false);
        carousel.addEventListener('touchend', handleTouchEnd, false);
    }
});

// Fix for window resize
window.addEventListener('resize', function() {
    // Reinitialize carousel on resize to fix layout issues
    const activeIndex = currentSlide;
    showSlide(activeIndex);
});