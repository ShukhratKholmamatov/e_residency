// SWOT Slider Functionality

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.swot-card');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const currentSlideSpan = document.querySelector('.current-slide');
    const totalSlidesSpan = document.querySelector('.total-slides');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Set total slides
    totalSlidesSpan.textContent = totalSlides;

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Add active class to current slide
        slides[index].classList.add('active');

        // Update slide indicator
        currentSlideSpan.textContent = index + 1;

        // Scroll to top of section
        const swotSection = document.querySelector('.swot-section');
        if (swotSection) {
            swotSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Touch/Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const swotSlider = document.querySelector('.swot-slider');

    swotSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    swotSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - show next slide
                nextSlide();
            } else {
                // Swiped right - show previous slide
                prevSlide();
            }
        }
    }

    // Initialize - show first slide
    showSlide(currentSlide);
});
