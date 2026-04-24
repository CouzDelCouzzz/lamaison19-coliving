function setupNavbar() {
  const hamburger = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  const dropdown = document.querySelector('[data-dropdown]');
  const dropdownTrigger = document.querySelector('[data-dropdown-trigger]');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });
  }

  if (dropdown && dropdownTrigger) {
    dropdownTrigger.addEventListener('click', () => {
      const expanded = dropdownTrigger.getAttribute('aria-expanded') === 'true';
      dropdownTrigger.setAttribute('aria-expanded', String(!expanded));
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('open');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

function setupActiveLinks() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-item a, .dropdown-menu a');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) {
      return;
    }

    const cleanHref = href.split('#')[0];
    if (cleanHref && cleanHref === currentPage) {
      link.classList.add('active');
    }
  });
}

function setupCarousel(carousel) {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('[data-carousel-prev]');
  const nextBtn = carousel.querySelector('[data-carousel-next]');
  const indicators = carousel.querySelectorAll('.carousel-indicators button');

  if (!slides.length) {
    return;
  }

  let currentIndex = 0;

  function render(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === index);
    });

    indicators.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
      dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      render(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      render(currentIndex);
    });
  }

  indicators.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      render(currentIndex);
    });
  });

  render(currentIndex);
}

function setupAllCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(setupCarousel);
}

function setupLightbox() {
  const lightbox = document.querySelector('[data-lightbox]');
  if (!lightbox) return;

  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const lightboxClose = document.querySelector('[data-lightbox-close]');
  const lightboxPrev = document.querySelector('[data-lightbox-prev]');
  const lightboxNext = document.querySelector('[data-lightbox-next]');
  const lightboxCounter = document.querySelector('[data-lightbox-counter]');
  const pieceLinks = document.querySelectorAll('.anchor-nav a[href^="#"]');

  let galleryImages = [];
  let pieceStartIndex = new Map();
  let currentIndex = 0;
  let touchStartX = 0;

  function buildGalleryFromNavigation() {
    galleryImages = [];
    pieceStartIndex = new Map();

    pieceLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetSection = document.querySelector(href);
      if (!targetSection) return;

      const sectionImages = targetSection.querySelectorAll('img');
      if (!sectionImages.length) {
        link.classList.add('is-empty');
        return;
      }

      const startIndex = galleryImages.length;
      pieceStartIndex.set(href, startIndex);
      link.classList.remove('is-empty');

      sectionImages.forEach((img, imageIndex) => {
        galleryImages.push({
          src: img.src,
          alt: img.alt || link.textContent.trim(),
          pieceLabel: link.textContent.trim(),
          imageIndex,
          imageCount: sectionImages.length,
        });
      });
    });
  }

  function openLightbox(index) {
    if (!galleryImages.length) return;
    currentIndex = index;
    showImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showImage() {
    if (!galleryImages.length) return;
    const img = galleryImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCounter.textContent = `${img.pieceLabel} - ${img.imageIndex + 1}/${img.imageCount}`;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage();
  }

  buildGalleryFromNavigation();

  pieceLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const href = link.getAttribute('href');
      const startIndex = pieceStartIndex.get(href);

      if (typeof startIndex !== 'number') {
        return;
      }

      openLightbox(startIndex);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
  }

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Touch swipe support for mobile
  lightboxImage.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  lightboxImage.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextImage();
    } else if (diff < -50) {
      prevImage();
    }
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setupActiveLinks();
  setupAllCarousels();
  setupLightbox();
});
