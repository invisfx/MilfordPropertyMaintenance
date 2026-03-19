// ============================
// Mobile Navigation
// ============================
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close nav when clicking a link (but not dropdown parent links on mobile)
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (link.closest('.nav-dropdown') && link.classList.contains('nav-link') && window.innerWidth <= 768) {
      return; // Don't close nav when toggling dropdown on mobile
    }
    burger.classList.remove('active');
    nav.classList.remove('open');
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  });
});

// Mobile dropdown toggle
document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
  const link = dropdown.querySelector('.nav-link');
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle('open');
    }
  });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    burger.classList.remove('active');
    nav.classList.remove('open');
  }
});

// ============================
// Header scroll effect
// ============================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    header.style.boxShadow = '0 4px 20px rgba(26, 39, 68, 0.12)';
  } else {
    header.style.boxShadow = '0 2px 16px rgba(26, 39, 68, 0.08)';
  }
  lastScroll = currentScroll;
});

// ============================
// Active nav link on scroll
// ============================
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = nav.querySelector(`a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        nav.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ============================
// Testimonial Slider
// ============================
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('testimonialDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track) {
  const cards = track.children;
  let currentSlide = 0;
  const totalSlides = cards.length;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  });

  // Auto-advance every 6 seconds
  setInterval(() => {
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  }, 6000);
}

// ============================
// Back to Top Button
// ============================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================
// Scroll Reveal Animation
// ============================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.service-card, .about-feature, .seasonal-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ============================
// Gallery Filter
// ============================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

if (filterBtns.length && galleryItems.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Contact form is handled by Netlify Forms — no JS override needed

// ============================
// Email Obfuscation
// ============================
(function() {
  var u = 'mp_maintenance';
  var d = 'yahoo.com';
  var e = u + '@' + d;
  document.querySelectorAll('[data-email]').forEach(function(el) {
    el.href = 'mailto:' + e;
    if (el.dataset.email === 'text') el.textContent = e;
  });
})();
