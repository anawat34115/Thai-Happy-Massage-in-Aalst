// 1. Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 2. Active nav link highlight on scroll (Scrollspy)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let currentSectionId = 'home';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Highlight slightly before section reaches top of viewport
    if (window.scrollY >= (sectionTop - 120)) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
});

// 3. Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksContainer = document.getElementById('nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });
}

// Close mobile menu when clicking a link
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

// 4. Booking Modal Logic
const bookingModal = document.getElementById('booking-modal');
const bookingForm = document.getElementById('booking-form');
const bookingFormWrapper = document.getElementById('booking-form-wrapper');
const bookingSuccess = document.getElementById('booking-success');
const bookingServiceSelect = document.getElementById('b-service');
const bookingDateInput = document.getElementById('b-date');

// Set minimum booking date to today
if (bookingDateInput) {
  const today = new Date().toISOString().split('T')[0];
  bookingDateInput.min = today;
}

// Open booking modal
document.querySelectorAll('.open-booking-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Get default service if specified on the button/link
    const serviceName = e.target.getAttribute('data-service');
    if (serviceName && bookingServiceSelect) {
      bookingServiceSelect.value = serviceName;
      // Trigger change event to set durations if needed
      bookingServiceSelect.dispatchEvent(new Event('change'));
    }

    if (bookingModal) {
      bookingModal.classList.add('open');
      document.body.style.overflow = 'hidden'; // Disable scroll background
    }
  });
});

// Close booking modal
function closeModal() {
  if (bookingModal) {
    bookingModal.classList.remove('open');
    document.body.style.overflow = 'auto'; // Enable scroll
    // Reset form after transition
    setTimeout(() => {
      bookingForm.reset();
      bookingFormWrapper.style.display = 'block';
      bookingSuccess.classList.remove('active');
    }, 400);
  }
}

const modalCloseBtn = document.getElementById('modal-close-btn');
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside content
if (bookingModal) {
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeModal();
    }
  });
}

// Handle Booking Form Submission
function handleBookingSubmit(event) {
  event.preventDefault();
  
  // Here we would typically submit form data via AJAX/fetch
  const name = document.getElementById('b-name').value;
  const phone = document.getElementById('b-phone').value;
  const email = document.getElementById('b-email').value;
  const service = document.getElementById('b-service').value;
  const duration = document.getElementById('b-duration').value;
  const date = document.getElementById('b-date').value;
  const time = document.getElementById('b-time').value;
  
  console.log('Booking requested:', { name, phone, email, service, duration, date, time });

  // Fade out form and fade in success message
  bookingFormWrapper.style.display = 'none';
  bookingSuccess.classList.add('active');
}

// Handle Contact Form Submission
function handleContactSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('direct-contact-form');
  const success = document.getElementById('contact-success');
  
  // Fade out form, show success
  form.style.display = 'none';
  success.classList.add('active');
}

// 5. Service Filtering
function filterServices(category) {
  const cards = document.querySelectorAll('.service-card');
  const tabs = document.querySelectorAll('.tab-btn');
  
  // Update active tab button
  tabs.forEach(tab => {
    tab.classList.remove('active');
    // Map text contents or click handler contexts
  });
  
  // Find which tab triggered and make active
  const clickedTab = event ? event.currentTarget : null;
  if (clickedTab) {
    clickedTab.classList.add('active');
  }

  // Filter cards with a clean opacity fade transition
  cards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.opacity = '0';
    
    setTimeout(() => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    }, 300);
  });
}

// 6. Testimonial Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function goToSlide(index) {
  showSlide(index);
}

// Auto scroll testimonials every 6 seconds
let testimonialInterval = setInterval(nextSlide, 6000);

// Reset timer on manual navigation
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });
  sliderContainer.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(nextSlide, 6000);
  });
}

// 7. Gallery Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(imageSrc) {
  if (lightbox && lightboxImg) {
    lightboxImg.src = imageSrc;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
}
