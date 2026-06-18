window.MonomeComponents = {
  top() {
    let currentPage = window.location.pathname.split('/').pop();
    if (!currentPage || currentPage === '/') {
      currentPage = 'index.html';
    }
    
    let prefetchTag = '';
    if (currentPage !== 'index.html') {
      prefetchTag = '\n    <link rel="prefetch" href="public/home-background.mp4?v=2" as="video" type="video/mp4" />';
    }
    
    const isActive = (pageName) => {
      if (currentPage === pageName) {
        return 'text-brand-orange bg-brand-orange/10';
      }
      return 'text-neutral-800 dark:text-neutral-100 hover:text-brand-orange hover:bg-brand-orange/10';
    };

    const isPillHidden = (pageName) => {
      return currentPage === pageName ? '' : 'hidden';
    };

    const isMobileActive = (pageName) => {
      if (currentPage === pageName) {
        return 'bg-brand-orange/10 text-brand-orange';
      }
      return 'text-neutral-700 dark:text-neutral-200 hover:bg-brand-orange/10 hover:text-brand-orange';
    };

    return `
    <!-- ─── Scroll Progress Indicator ─── -->
    <div id="scroll-progress" style="width: 0%;"></div>

    <!-- ─── Floating Decorative Background Shapes ─── -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <div class="floating-shape bg-pastel-blue w-96 h-96 top-1/4 left-[-10%] animate-float"></div>
      <div class="floating-shape bg-pastel-peach w-[500px] h-[500px] top-1/2 right-[-15%] animate-float-slow" style="animation-delay: 1.5s"></div>
      <div class="floating-shape bg-pastel-lavender w-[400px] h-[400px] bottom-[-10%] left-1/4 animate-float" style="animation-delay: 3s"></div>
    </div>

    <!-- ─── Header & Navigation Component ─── -->
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#FAFAF8]/95 dark:bg-[#0d1017]/95 backdrop-blur-xl border-b border-neutral-200/30 dark:border-white/10 shadow-sm py-4">
      <!-- Premium Top Brand Accent line -->
      <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F5A623] via-[#F7B84B] to-[#D4891A] shadow-[0_1px_10px_rgba(245,166,35,0.3)]"></div>
      <!-- Subtle Bottom Accent Line -->
      <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F5A623]/30 to-transparent"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-2.5 cursor-pointer">
          <img src="assets/logo.png" alt="MONOME Logo" class="h-9 w-auto object-contain rounded-md" />
          <div>
            <span class="font-inter font-800 text-base tracking-tight leading-tight text-neutral-800 dark:text-white">MONOME</span>
            <span class="block text-[9px] tracking-[0.2em] font-poppins text-neutral-500 dark:text-neutral-400 uppercase -mt-0.5">Constructions</span>
          </div>
        </a>

        <!-- Desktop nav links -->
        <nav class="hidden lg:flex items-center gap-1">
          <a href="index.html" class="relative px-4 py-2 text-sm font-medium font-poppins rounded-full transition-all duration-300 cursor-pointer ${isActive('index.html')}">
            Home<div class="nav-pill-bg absolute inset-0 bg-brand-orange/10 rounded-full -z-10 ${isPillHidden('index.html')}"></div>
          </a>
          <a href="about.html" class="relative px-4 py-2 text-sm font-medium font-poppins rounded-full transition-all duration-300 cursor-pointer ${isActive('about.html')}">
            About<div class="nav-pill-bg absolute inset-0 bg-brand-orange/10 rounded-full -z-10 ${isPillHidden('about.html')}"></div>
          </a>
          <a href="services.html" class="relative px-4 py-2 text-sm font-medium font-poppins rounded-full transition-all duration-300 cursor-pointer ${isActive('services.html')}">
            Services<div class="nav-pill-bg absolute inset-0 bg-brand-orange/10 rounded-full -z-10 ${isPillHidden('services.html')}"></div>
          </a>
          <a href="projects.html" class="relative px-4 py-2 text-sm font-medium font-poppins rounded-full transition-all duration-300 cursor-pointer ${isActive('projects.html')}">
            Projects<div class="nav-pill-bg absolute inset-0 bg-brand-orange/10 rounded-full -z-10 ${isPillHidden('projects.html')}"></div>
          </a>
          <a href="gallery.html" class="relative px-4 py-2 text-sm font-medium font-poppins rounded-full transition-all duration-300 cursor-pointer ${isActive('gallery.html')}">
            Gallery<div class="nav-pill-bg absolute inset-0 bg-brand-orange/10 rounded-full -z-10 ${isPillHidden('gallery.html')}"></div>
          </a>
          <a href="testimonials.html" class="relative px-4 py-2 text-sm font-medium font-poppins rounded-full transition-all duration-300 cursor-pointer ${isActive('testimonials.html')}">
            Testimonials<div class="nav-pill-bg absolute inset-0 bg-brand-orange/10 rounded-full -z-10 ${isPillHidden('testimonials.html')}"></div>
          </a>
          <a href="contact.html" class="relative px-4 py-2 text-sm font-medium font-poppins rounded-full transition-all duration-300 cursor-pointer ${isActive('contact.html')}">
            Contact<div class="nav-pill-bg absolute inset-0 bg-brand-orange/10 rounded-full -z-10 ${isPillHidden('contact.html')}"></div>
          </a>
        </nav>

        <!-- Right actions -->
        <div class="flex items-center gap-3">
          <!-- Dark mode Button -->
          <button id="dark-mode-toggle" class="w-9 h-9 rounded-full glass flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-brand-orange transition-all hover:scale-110 active:scale-95" aria-label="Toggle dark mode">
            <i id="dark-mode-icon" data-lucide="moon" class="w-4 h-4"></i>
          </button>

          <!-- Book Consultation CTA -->
          <a href="contact.html" class="hidden md:flex btn-primary text-sm py-2 px-5 cursor-pointer text-center">
            Book Consultation
          </a>

          <!-- Mobile hamburger -->
          <button id="open-menu-btn" class="lg:hidden w-9 h-9 rounded-full glass flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-brand-orange transition-colors" aria-label="Open menu">
            <i data-lucide="menu" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- ─── Mobile drawer navigation ─── -->
    <div id="mobile-menu" class="fixed inset-y-0 right-0 w-72 z-[100] glass-card flex flex-col pt-24 px-6 pb-10 shadow-2xl lg:hidden transform translate-x-full transition-transform duration-300 pointer-events-none invisible">
      <button id="close-menu-btn" class="absolute top-5 right-5 w-9 h-9 rounded-full glass flex items-center justify-center text-neutral-700 dark:text-neutral-300" aria-label="Close menu">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
      <nav class="flex flex-col gap-2">
        <a href="index.html" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${isMobileActive('index.html')}">Home</a>
        <a href="about.html" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${isMobileActive('about.html')}">About</a>
        <a href="services.html" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${isMobileActive('services.html')}">Services</a>
        <a href="projects.html" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${isMobileActive('projects.html')}">Projects</a>
        <a href="gallery.html" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${isMobileActive('gallery.html')}">Gallery</a>
        <a href="testimonials.html" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${isMobileActive('testimonials.html')}">Testimonials</a>
        <a href="contact.html" class="mobile-nav-link px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${isMobileActive('contact.html')}">Contact</a>
        <a href="contact.html" class="mobile-nav-link btn-primary text-center mt-4 text-sm cursor-pointer">Book Consultation</a>
      </nav>
    </div>
    ${prefetchTag}

    <!-- ─── MAIN CONTENT SECTIONS ─── -->
`;
  },
  footer() {
    return `
    <!-- ─── FOOTER SECTION ─── -->
    <footer class="relative overflow-hidden mt-10">
      <!-- Wave divider -->
      <div class="relative bg-luxury h-16">
        <svg viewBox="0 0 1440 64" class="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#1a1a2e" />
        </svg>
      </div>

      <div class="bg-[#1a1a2e] text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            
            <!-- Brand Column -->
            <div class="lg:col-span-1 space-y-6">
              <div class="flex items-center gap-2.5">
                <img src="assets/logo.png" alt="MONOME Logo" class="h-9 w-auto object-contain rounded-md" />
                <div>
                  <span class="font-inter font-800 text-base tracking-tight text-white">MONOME</span>
                  <span class="block text-[9px] tracking-[0.2em] text-neutral-400 uppercase -mt-0.5">Constructions</span>
                </div>
              </div>

              <p class="text-sm text-neutral-400 leading-relaxed">
                Premium construction, architecture &amp; interior solutions crafted with passion, precision, and an unwavering commitment to excellence.
              </p>

              <div class="space-y-2.5">
                <a href="tel:+918041203456" class="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-brand-orange transition-colors">
                  <i data-lucide="phone" class="text-brand-orange w-3.5 h-3.5 flex-shrink-0"></i>+91 80 4120 3456
                </a>
                <a href="mailto:hello@monome.in" class="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-brand-orange transition-colors">
                  <i data-lucide="mail" class="text-brand-orange w-3.5 h-3.5 flex-shrink-0"></i>hello@monome.in
                </a>
                <span class="flex items-start gap-2.5 text-sm text-neutral-400">
                  <i data-lucide="map-pin" class="text-brand-orange w-3.5 h-3.5 flex-shrink-0 mt-0.5"></i>42, Prestige Towers, MG Road, Bangalore
                </span>
              </div>

              <!-- Social Links -->
              <div class="flex gap-2">
                <a href="#" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-all"><i data-lucide="linkedin" class="w-4 h-4"></i></a>
                <a href="#" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-all"><i data-lucide="instagram" class="w-4 h-4"></i></a>
                <a href="#" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-all"><i data-lucide="twitter" class="w-4 h-4"></i></a>
                <a href="#" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-all"><i data-lucide="youtube" class="w-4 h-4"></i></a>
                <a href="#" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-orange transition-all"><i data-lucide="facebook" class="w-4 h-4"></i></a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h4 class="font-inter font-700 text-white mb-5 text-sm tracking-wide">Quick Links</h4>
              <ul class="space-y-3">
                <li><a href="about.html" class="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> About Us</a></li>
                <li><a href="services.html" class="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Services</a></li>
                <li><a href="projects.html" class="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Projects</a></li>
                <li><a href="gallery.html" class="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Gallery</a></li>
                <li><a href="testimonials.html" class="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Testimonials</a></li>
                <li><a href="contact.html" class="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Contact</a></li>
              </ul>
            </div>

            <!-- Our Services Links -->
            <div>
              <h4 class="font-inter font-700 text-white mb-5 text-sm tracking-wide">Our Services</h4>
              <ul class="space-y-3">
                <li><a href="services.html" class="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Residential Construction</a></li>
                <li><a href="services.html" class="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Commercial Construction</a></li>
                <li><a href="services.html" class="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Architecture Planning</a></li>
                <li><a href="services.html" class="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Interior Design</a></li>
                <li><a href="services.html" class="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Renovation</a></li>
              </ul>
            </div>

            <!-- Subscribe Column -->
            <div>
              <h4 class="font-inter font-700 text-white mb-5 text-sm tracking-wide">Stay Updated</h4>
              <p class="text-sm text-neutral-400 mb-5 leading-relaxed">
                Subscribe to get construction insights, project updates, and exclusive design tips directly in your inbox.
              </p>

              <div id="newsletter-success" class="hidden glass rounded-xl p-4 text-center border border-brand-orange/30 mb-3">
                <p class="text-brand-orange text-sm font-semibold">Thank you for subscribing! 🎉</p>
              </div>

              <form id="newsletter-form" class="space-y-3">
                <input type="email" placeholder="your@email.com" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-orange/60 transition-all" />
                <button type="submit" class="btn-primary w-full flex items-center justify-center gap-2 text-sm">
                  <i data-lucide="send" class="w-3.5 h-3.5"></i> Subscribe
                </button>
              </form>

              <!-- Recognition Badges -->
              <div class="mt-8 pt-6 border-t border-white/5">
                <p class="text-xs text-neutral-500 mb-3 uppercase tracking-widest">Recognitions</p>
                <div class="flex flex-wrap gap-2">
                  <span class="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400">CREDAI Member</span>
                  <span class="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400">ISO 9001:2015</span>
                  <span class="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400">GRIHA 4-Star</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Bottom bar -->
          <div class="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-xs text-neutral-500">
              &copy; 2026 MONOME Constructions. All rights reserved.
            </p>
            <div class="flex gap-6">
              <a href="#" class="text-xs text-neutral-500 hover:text-brand-orange transition-colors">Privacy Policy</a>
              <a href="#" class="text-xs text-neutral-500 hover:text-brand-orange transition-colors">Terms of Service</a>
              <a href="#" class="text-xs text-neutral-500 hover:text-brand-orange transition-colors">Sitemap</a>
            </div>
            <p class="text-xs text-neutral-600">
              Crafted with &hearts; for Premium Living
            </p>
          </div>
        </div>
      </div>
    </footer>
`;
  },
  extras() {
    return `
    <!-- ─── BACK TO TOP BUTTON ─── -->
    <button id="back-to-top" class="fixed bottom-[216px] right-7 z-50 w-12 h-12 rounded-full btn-primary flex items-center justify-center shadow-lg opacity-0 pointer-events-none translate-y-4 transition-all duration-300 hover:scale-110 active:scale-95" aria-label="Back to top">
      <i data-lucide="chevron-up" class="w-5 h-5 text-white"></i>
    </button>

    <!-- ─── LIGHTBOX MODAL ─── -->
    <div id="lightbox" class="lightbox-overlay hidden">
      <div class="relative max-w-4xl w-full mx-4 rounded-3xl overflow-hidden bg-black/40">
        <img id="lightbox-img" src="" alt="Lightbox image" class="w-full max-h-[75vh] object-cover" />
        <div class="absolute inset-x-0 bottom-0 glass p-6">
          <span class="tag mb-2 inline-block" id="lightbox-tag">Gallery Item</span>
          <h3 class="font-inter font-700 text-xl text-neutral-800 dark:text-white" id="lightbox-title">Item Title</h3>
        </div>
        <button id="lightbox-close" class="absolute top-4 right-4 w-9 h-9 glass rounded-full flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors" aria-label="Close image">
          <i data-lucide="x" class="w-5 h-5 text-neutral-700 dark:text-neutral-200"></i>
        </button>
      </div>
    </div>

    <!-- ─── CHATBOT LAUNCHER & WINDOW CONTAINER ─── -->
    <div id="monome-chatbot-root"></div>
    <script src="chatbot.js" defer></script>
`;
  }
};
