document.addEventListener('DOMContentLoaded', () => {
  const homeBackgroundVideo = document.getElementById('home-background-video');
  if (homeBackgroundVideo) {
    homeBackgroundVideo.playbackRate = 0.6;
  }

  // ─── 1. Loading Screen ───
  const loadingScreen = document.getElementById('loading-screen');
  
  const hideLoader = () => {
    if (loadingScreen && loadingScreen.style.opacity !== '0') {
      loadingScreen.style.transition = 'opacity 0.15s ease, visibility 0.15s ease';
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.visibility = 'hidden';
      }, 150);
    }
  };
  
  // Show the loader briefly for a premium feel, then hide it quickly after 150ms
  setTimeout(hideLoader, 150);

  // ─── 2. Dark Mode Toggle ───
  const darkToggleBtn = document.getElementById('dark-mode-toggle');
  const toggleIcon = document.getElementById('dark-mode-icon');
  
  const applyTheme = (isDark) => {
    const icon = document.getElementById('dark-mode-icon');
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (icon) icon.setAttribute('data-lucide', 'sun');
    } else {
      document.documentElement.classList.remove('dark');
      if (icon) icon.setAttribute('data-lucide', 'moon');
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  // Load initial theme from localStorage or system setting
  let isDark = localStorage.getItem('darkMode') === 'true' || 
              (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  applyTheme(isDark);

  if (darkToggleBtn) {
    darkToggleBtn.addEventListener('click', () => {
      document.body.classList.add('transition-colors', 'duration-500');
      isDark = !isDark;
      localStorage.setItem('darkMode', isDark);
      applyTheme(isDark);
    });
  }

  // ─── 3. Scroll Progress & Sticky Navbar & Back To Top ───
  const scrollProgressBar = document.getElementById('scroll-progress');
  const header = document.querySelector('header');
  const backToTopBtn = document.getElementById('back-to-top');

  let scrollTicking = false;

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Progress
        const pct = scrollHeight === 0 ? 0 : (scrollTop / scrollHeight) * 100;
        if (scrollProgressBar) {
          scrollProgressBar.style.width = `${pct}%`;
        }

        // Sticky navbar
        if (header) {
          if (scrollTop > 40) {
            header.classList.add('navbar-glass', 'py-2', 'shadow-soft');
            header.classList.remove('bg-[#FAF8F3]/95', 'dark:bg-[#0d1017]/95', 'border-neutral-200/30', 'dark:border-white/10', 'py-4');
          } else {
            header.classList.remove('navbar-glass', 'py-2', 'shadow-soft');
            header.classList.add('bg-[#FAF8F3]/95', 'dark:bg-[#0d1017]/95', 'border-neutral-200/30', 'dark:border-white/10', 'py-4');
          }
        }

        // Back to top visibility
        if (backToTopBtn) {
          if (scrollTop > 500) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
            backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
          } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
            backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
          }
        }
        
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── 4. Navigation Smooth Scrolling & Active State ───
  const navLinks = document.querySelectorAll('header nav a, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenu = document.getElementById('mobile-menu');
  const openMenuBtn = document.getElementById('open-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const sectionRoutes = {
    home: 'index.html',
    about: 'about.html',
    services: 'services.html',
    projects: 'projects.html',
    gallery: 'gallery.html',
    contact: 'contact.html',
    'cost-estimator': 'estimator.html'
  };

  const getNavTargetId = (href) => {
    if (!href) return '';
    if (href.startsWith('#')) return href.slice(1);
    const url = new URL(href, window.location.href);
    if (url.hash) return url.hash.slice(1);
    const page = url.pathname.split('/').pop() || 'index.html';
    return page === 'index.html' ? 'home' : page.replace(/\.html$/, '');
  };

  const setActiveNav = (id) => {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const pill = link.querySelector('.nav-pill-bg');

      if (getNavTargetId(href) === id) {
        link.classList.add('text-brand-orange', 'bg-brand-orange/10');
        link.classList.remove('text-neutral-800', 'dark:text-neutral-100');
        if (pill) pill.classList.remove('hidden');
      } else {
        link.classList.remove('text-brand-orange', 'bg-brand-orange/10');
        link.classList.add('text-neutral-800', 'dark:text-neutral-100');
        if (pill) pill.classList.add('hidden');
      }
    });
  };

  // Toggle mobile drawer
  if (openMenuBtn && mobileMenu) {
    openMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full', 'pointer-events-none', 'invisible');
      mobileMenu.classList.add('pointer-events-auto', 'visible');
    });
  }
  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full', 'pointer-events-none', 'invisible');
      mobileMenu.classList.remove('pointer-events-auto', 'visible');
    });
  }

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (mobileMenu) {
        mobileMenu.classList.add('translate-x-full', 'pointer-events-none', 'invisible');
        mobileMenu.classList.remove('pointer-events-auto', 'visible');
      }

      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      const targetId = href.slice(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionRoutes[targetId]) {
        window.location.href = sectionRoutes[targetId];
      }
    });
  });

  // Highlight active menu on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Map page section prefixes to keep active state consistent
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage === 'index.html' || currentPage === '') {
          setActiveNav('home');
        } else {
          const pageName = currentPage.replace(/\.html$/, '');
          setActiveNav(pageName);
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  setActiveNav(currentPage === 'index.html' ? 'home' : currentPage.replace(/\.html$/, ''));


  // ─── 5. Hero Carousel ───
  const heroScenes = document.querySelectorAll('.hero-scene');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentHeroIdx = 0;
  let heroInterval;

  const showHeroScene = (idx) => {
    heroScenes.forEach((scene, i) => {
      if (i === idx) {
        scene.style.opacity = '1';
        scene.style.transform = 'scale(1)';
        scene.style.zIndex = '1';
      } else {
        scene.style.opacity = '0';
        scene.style.transform = 'scale(1.08)';
        scene.style.zIndex = '0';
      }
    });

    heroDots.forEach((dot, i) => {
      if (i === idx) {
        dot.classList.add('w-6', 'bg-brand-orange');
        dot.classList.remove('w-2', 'bg-white/50');
      } else {
        dot.classList.remove('w-6', 'bg-brand-orange');
        dot.classList.add('w-2', 'bg-white/50');
      }
    });
    currentHeroIdx = idx;
  };

  const startHeroInterval = () => {
    heroInterval = setInterval(() => {
      let nextIdx = (currentHeroIdx + 1) % heroScenes.length;
      showHeroScene(nextIdx);
    }, 5000);
  };

  if (heroScenes.length > 0) {
    showHeroScene(0);
    startHeroInterval();

    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(heroInterval);
        showHeroScene(i);
        startHeroInterval();
      });
    });
  }


  // ─── 6. Before/After Image Slider ───
  const sliderContainer = document.querySelector('.compare-slider');
  const beforeImgWrapper = document.getElementById('before-img-wrapper');
  const beforeImg = document.getElementById('before-img');
  const dragHandle = document.querySelector('.compare-handle');
  let isDraggingSlider = false;

  const updateSliderPosition = (clientX) => {
    if (!sliderContainer) return;
    const rect = sliderContainer.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    
    if (beforeImgWrapper) beforeImgWrapper.style.width = `${pct}%`;
    if (dragHandle) dragHandle.style.left = `${pct}%`;
  };

  if (sliderContainer) {
    // Resize Observer to match beforeImg width to container
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (beforeImg) {
          beforeImg.style.width = `${entry.contentRect.width}px`;
        }
      }
    });
    resizeObserver.observe(sliderContainer);

    // Mouse and Touch events
    const onStart = (e) => {
      isDraggingSlider = true;
      sliderContainer.style.cursor = 'grabbing';
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSliderPosition(clientX);
    };

    const onMove = (e) => {
      if (!isDraggingSlider) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSliderPosition(clientX);
    };

    const onEnd = () => {
      isDraggingSlider = false;
      if (sliderContainer) sliderContainer.style.cursor = 'ew-resize';
    };

    sliderContainer.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    sliderContainer.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
  }


  // ─── 7. Cost Estimator ───
  const plotSizeInput = document.getElementById('estimator-plot-size');
  const plotSizeVal = document.getElementById('estimator-plot-size-val');
  const floorInput = document.getElementById('estimator-floors');
  const floorVal = document.getElementById('estimator-floors-val');
  const estimateBtn = document.getElementById('estimator-calc-btn');
  const outputCard = document.getElementById('estimator-output');

  // Elements for dynamic breakdown values
  const builtAreaEl = document.getElementById('est-built-area');
  const baseCostEl = document.getElementById('est-base-cost');
  const designFeeEl = document.getElementById('est-design-fee');
  const electricEl = document.getElementById('est-electric');
  const totalCostEl = document.getElementById('est-total');

  const RATES = {
    budgetory: 1900,
    standard: 2100,
    premium: 2300,
    luxury: 2500
  };

  const formatINR = (num) => {
    if (num >= 10000000) {
      return `₹ ${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `₹ ${(num / 100000).toFixed(2)} L`;
    }
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  if (plotSizeInput && plotSizeVal) {
    plotSizeInput.addEventListener('input', (e) => {
      plotSizeVal.textContent = e.target.value;
    });
  }
  if (floorInput && floorVal) {
    floorInput.addEventListener('input', (e) => {
      floorVal.textContent = e.target.value;
    });
  }

  // Material Quality Radio Click Style updates
  const qualityOptions = document.querySelectorAll('[name="material-quality"]');
  qualityOptions.forEach(opt => {
    opt.addEventListener('change', () => {
      qualityOptions.forEach(o => {
        const wrapper = o.closest('label');
        if (wrapper) {
          if (o.checked) {
            wrapper.classList.add('border-brand-orange', 'bg-brand-orange/5');
            wrapper.classList.remove('border-neutral-200', 'dark:border-neutral-700');
          } else {
            wrapper.classList.remove('border-brand-orange', 'bg-brand-orange/5');
            wrapper.classList.add('border-neutral-200', 'dark:border-neutral-700');
          }
        }
      });
    });
  });

  if (estimateBtn) {
    estimateBtn.addEventListener('click', () => {
      if (!plotSizeInput || !floorInput) return;
      const plotSize = parseFloat(plotSizeInput.value);
      const floors = parseInt(floorInput.value);
      
      let selectedMaterial = 'premium';
      const checkedMaterial = document.querySelector('[name="material-quality"]:checked');
      if (checkedMaterial) {
        selectedMaterial = checkedMaterial.value;
      }

      // Calculations
      const builtArea = plotSize * 0.65 * floors;
      const rate = RATES[selectedMaterial] || 2300;
      const baseCost = builtArea * rate;
      const designFee = baseCost * 0.08;
      const electricPlumbing = baseCost * 0.10;
      const total = baseCost + designFee + electricPlumbing;

      // Update UI
      if (builtAreaEl) builtAreaEl.textContent = `${builtArea.toFixed(0)} sq.ft`;
      if (baseCostEl) baseCostEl.textContent = formatINR(baseCost);
      if (designFeeEl) designFeeEl.textContent = formatINR(designFee);
      if (electricEl) electricEl.textContent = formatINR(electricPlumbing);
      if (totalCostEl) totalCostEl.textContent = formatINR(total);

      if (outputCard) {
        outputCard.classList.remove('hidden');
        outputCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }


  // ─── 8. Projects Filter & Lightbox ───
  const projectFilters = document.querySelectorAll('.project-filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  const updateFilterButtonStates = (activeFilter, allFilters) => {
    allFilters.forEach(f => {
      f.classList.remove('bg-brand-orange', 'text-white', 'shadow-luxury');
      f.classList.add('glass', 'text-neutral-600', 'dark:text-neutral-300', 'hover:text-brand-orange');
    });
    activeFilter.classList.add('bg-brand-orange', 'text-white', 'shadow-luxury');
    activeFilter.classList.remove('glass', 'text-neutral-600', 'dark:text-neutral-300', 'hover:text-brand-orange');
  };

  const openLightbox = (imgEl, titleText, categoryText) => {
    if (!lightbox || !lightboxImg || !imgEl) return;
    
    // Set cursor to wait as immediate feedback
    document.body.style.cursor = 'wait';
    imgEl.style.cursor = 'wait';
    
    const tempImg = new Image();
    tempImg.onload = () => {
      document.body.style.cursor = '';
      imgEl.style.cursor = '';
      lightboxImg.src = tempImg.src;
      if (lightboxTitle) lightboxTitle.textContent = titleText;
      const lightboxTag = document.getElementById('lightbox-tag');
      if (lightboxTag) lightboxTag.textContent = categoryText || 'Gallery Item';
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    };
    tempImg.onerror = () => {
      document.body.style.cursor = '';
      imgEl.style.cursor = '';
      lightboxImg.src = imgEl.src;
      if (lightboxTitle) lightboxTitle.textContent = titleText;
      const lightboxTag = document.getElementById('lightbox-tag');
      if (lightboxTag) lightboxTag.textContent = categoryText || 'Gallery Item';
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    };
    tempImg.src = imgEl.src;
  };

  projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      updateFilterButtonStates(filter, projectFilters);

      const category = filter.getAttribute('data-category');
      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'All' || itemCategory === category) {
          item.style.display = 'block';
          item.classList.add('animate-scale-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Open
  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4');
      const category = item.getAttribute('data-category');
      if (img) {
        openLightbox(img, title ? title.textContent : 'Project', category || 'Project');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightbox) {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }


  // ─── 9. Gallery Filter & Lightbox ───
  const galleryFilters = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      updateFilterButtonStates(filter, galleryFilters);

      const category = filter.getAttribute('data-category');
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'All' || itemCategory === category) {
          item.style.display = 'block';
          item.classList.add('animate-scale-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4');
      const category = item.getAttribute('data-category');
      if (img) {
        openLightbox(img, title ? title.textContent : 'Gallery Item', category || 'Gallery Item');
      }
    });
  });


  // ─── 10. Testimonials Carousel ───
  const testimonialItems = document.querySelectorAll('.testimonial-slide');
  const testDots = document.querySelectorAll('.testimonial-dot');
  const testPrevBtn = document.getElementById('testimonial-prev');
  const testNextBtn = document.getElementById('testimonial-next');
  let currentTestIdx = 0;
  let testInterval;
  let autoPlayTestimonials = true;

  const showTestimonial = (idx) => {
    testimonialItems.forEach((item, i) => {
      if (i === idx) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });

    testDots.forEach((dot, i) => {
      if (i === idx) {
        dot.classList.add('bg-brand-orange', 'w-6');
        dot.classList.remove('bg-brand-orange/20', 'w-2');
      } else {
        dot.classList.remove('bg-brand-orange', 'w-6');
        dot.classList.add('bg-brand-orange/20', 'w-2');
      }
    });
    currentTestIdx = idx;
  };

  const startTestInterval = () => {
    if (!autoPlayTestimonials) return;
    testInterval = setInterval(() => {
      let nextIdx = (currentTestIdx + 1) % testimonialItems.length;
      showTestimonial(nextIdx);
    }, 4500);
  };

  if (testimonialItems.length > 0) {
    showTestimonial(0);
    startTestInterval();

    const stopAutoPlay = () => {
      autoPlayTestimonials = false;
      clearInterval(testInterval);
    };

    testDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        stopAutoPlay();
        showTestimonial(i);
      });
    });

    if (testPrevBtn) {
      testPrevBtn.addEventListener('click', () => {
        stopAutoPlay();
        let prevIdx = (currentTestIdx - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(prevIdx);
      });
    }

    if (testNextBtn) {
      testNextBtn.addEventListener('click', () => {
        stopAutoPlay();
        let nextIdx = (currentTestIdx + 1) % testimonialItems.length;
        showTestimonial(nextIdx);
      });
    }
  }


  // ─── 11. Contact Form Submit Mock ───
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtnText = document.getElementById('submit-btn-text');
  const submitSpinner = document.getElementById('submit-spinner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (submitBtnText) submitBtnText.textContent = 'Sending Message...';
      if (submitSpinner) submitSpinner.classList.remove('hidden');

      // Simulating network delay
      setTimeout(() => {
        contactForm.reset();
        if (submitSpinner) submitSpinner.classList.add('hidden');
        if (submitBtnText) submitBtnText.textContent = 'Submit Inquiry';
        
        if (formSuccess) {
          formSuccess.classList.remove('hidden');
          setTimeout(() => {
            formSuccess.classList.add('hidden');
          }, 5000);
        }
      }, 1500);
    });
  }


  // ─── 12. Newsletter Form Submit ───
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (newsletterSuccess) {
        newsletterSuccess.classList.remove('hidden');
        newsletterForm.reset();
        setTimeout(() => {
          newsletterSuccess.classList.add('hidden');
        }, 4000);
      }
    });
  }

  // ─── 13. Hover-Based Page Prefetching for Instant Navigation ───
  const prefetchLink = (url) => {
    if (!url || url.includes('#') || url.startsWith('javascript:')) return;
    const linkId = `prefetch-${url.replace(/[^a-zA-Z0-9]/g, '-')}`;
    if (document.getElementById(linkId)) return;

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  };

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith('.html')) {
      link.addEventListener('mouseenter', () => prefetchLink(href), { passive: true });
      link.addEventListener('touchstart', () => prefetchLink(href), { passive: true });
    }
  });

  // ─── 14. Scroll Reveal Observer ───
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.05,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });

  // ─── 15. Smooth Image Loading with Fallbacks ───
  const smoothImages = document.querySelectorAll('img:not(#lightbox-img)');
  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop';

  smoothImages.forEach(img => {
    if (img.dataset.smoothLoaded) return;
    img.dataset.smoothLoaded = 'true';

    // Apply absolute styling to ensure smooth opacity transition
    img.classList.add('transition-opacity', 'duration-700', 'opacity-0');

    const handleLoad = () => {
      img.classList.remove('opacity-0');
    };

    const triggerFallback = () => {
      if (!img.dataset.fallbackTriggered) {
        img.dataset.fallbackTriggered = 'true';
        img.src = FALLBACK_IMAGE;
      } else {
        img.classList.remove('opacity-0');
      }
    };

    if (img.complete) {
      if (img.naturalWidth > 0) {
        handleLoad();
      } else {
        triggerFallback();
      }
    } else {
      img.addEventListener('load', () => {
        if (img.naturalWidth > 0) {
          handleLoad();
        } else {
          triggerFallback();
        }
      });
      img.addEventListener('error', () => {
        triggerFallback();
      });
    }
  });
});

