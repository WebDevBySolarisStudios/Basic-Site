document.addEventListener('DOMContentLoaded', () => {
  // Select all sections that need fade-in animations
  const sections = document.querySelectorAll('.section, .image-section, .pc-tiers-section, .platelights-section, .cases-section, .gaming-accessories-section, .about-section');

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the section is visible
    }
  );

  // Observe each section
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Ensure platelight and cases sections are visible and moved up more
  const platelightSection = document.querySelector('.platelights-section');
  const casesSection = document.querySelector('.cases-section');
  if (platelightSection && casesSection) {
    platelightSection.style.display = 'block';
    platelightSection.style.marginTop = '-120px';

    casesSection.style.display = 'block';
    casesSection.style.marginTop = '-120px';
  }

  // Adjustable slideshow image sizes
  document.querySelectorAll('.cases-section .slide-image').forEach((img) => {
    img.style.width = '30%';
    img.style.height = 'auto';
  });

  document.querySelectorAll('.platelights-section .slide-image').forEach((img) => {
    img.style.width = '10%';
    img.style.height = 'auto';
  });

  // Slideshow functionality
  const slideshows = document.querySelectorAll('.slideshow');

  slideshows.forEach((slideshow) => {
    const slides = slideshow.querySelectorAll('.slide');
    let currentIndex = 0;

    const updateSlides = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
      });
      slideshow.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    updateSlides(); // Ensure the first slide is set correctly

    const moveSlide = (direction) => {
      if (direction === 'next') {
        currentIndex = (currentIndex + 1) % slides.length;
      } else {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      }
      updateSlides();
    };

    slideshow.parentElement.querySelector('.left-arrow').addEventListener('click', () => moveSlide('prev'));
    slideshow.parentElement.querySelector('.right-arrow').addEventListener('click', () => moveSlide('next')); //Arrows move the slide on click
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('.nav-links a').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      // Only prevent default behavior for anchor links (those that start with #)
      if (this.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 60,
            behavior: 'smooth'
          });
        }
      }
      // For other links (like order.html), allow default behavior
    });
  });

  // Ensure the "Shop PC" button redirects without interference
  const shopPcButton = document.querySelector('.hero-buttons .btn-primary');
  if (shopPcButton) {
    shopPcButton.addEventListener('click', (event) => {
      // Allow default behavior (redirect to order.html)
      return true;
    });
  }
});