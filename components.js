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

    <!-- Header & Navigation Component -->
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#FAF8F3]/95 dark:bg-[#0d1017]/95 backdrop-blur-xl border-b border-neutral-200/30 dark:border-white/10 shadow-sm py-4">
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
    <footer class="relative overflow-hidden mt-0">
      <!-- Wave divider -->
      <div class="relative bg-luxury h-16">
        <svg viewBox="0 0 1440 64" class="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#1a1a2e" />
        </svg>
      </div>

      <div class="bg-[#1a1a2e] text-white relative">
        <!-- Confetti Canvas (for interactive newsletter signup) -->
        <canvas id="footer-confetti-canvas" class="absolute inset-0 w-full h-full pointer-events-none z-30"></canvas>

        <div class="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-10 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-14">
            
            <!-- Brand Column -->
            <div class="space-y-6">
              <div class="flex items-center gap-2.5">
                <img src="assets/logo.png" alt="MONOME Logo" class="h-9 w-auto object-contain rounded-md" />
                <div>
                  <span class="font-inter font-800 text-base tracking-tight text-white">MONOME</span>
                  <span class="block text-[9px] tracking-[0.2em] text-neutral-400 uppercase -mt-0.5">Constructions</span>
                </div>
              </div>

              <p class="text-[13px] text-neutral-400 leading-relaxed">
                Premium construction, architecture &amp; interior solutions crafted with passion, precision, and an unwavering commitment to excellence.
              </p>

              <!-- Social Links -->
              <div class="flex gap-3 pt-2">
                <a href="https://www.instagram.com/monome.india/reels/" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all hover:scale-110 active:scale-95" title="Follow on Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 fill-none stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://www.facebook.com/share/1EHWmZ9JsG/" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all hover:scale-110 active:scale-95" title="Follow on Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 fill-none stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h4 class="font-inter font-700 text-white mb-5 text-sm tracking-wide">Quick Links</h4>
              <ul class="space-y-3">
                <li><a href="about.html" class="text-[13px] text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> About Us</a></li>
                <li><a href="services.html" class="text-[13px] text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Services</a></li>
                <li><a href="projects.html" class="text-[13px] text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Projects</a></li>
                <li><a href="gallery.html" class="text-[13px] text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Gallery</a></li>
                <li><a href="contact.html" class="text-[13px] text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Contact</a></li>
              </ul>
            </div>

            <!-- Our Services Links -->
            <div>
              <h4 class="font-inter font-700 text-white mb-5 text-sm tracking-wide">Our Services</h4>
              <ul class="space-y-3">
                <li><a href="services.html" class="text-[13px] text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Residential Construction</a></li>
                <li><a href="services.html" class="text-[13px] text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Commercial Construction</a></li>
                <li><a href="services.html" class="text-[13px] text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Architecture Planning</a></li>
                <li><a href="services.html" class="text-[13px] text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Interior Design</a></li>
                <li><a href="services.html" class="text-[13px] text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-1.5"><i data-lucide="arrow-right" class="text-brand-orange/50 w-3 h-3"></i> Renovation</a></li>
              </ul>
            </div>

            <!-- Corporate Desk Column -->
            <div class="space-y-4">
              <h4 class="font-inter font-700 text-white mb-5 text-sm tracking-wide">Corporate Desk</h4>
              
              <!-- Live Clock & Status -->
              <div class="flex items-center justify-between text-[11px] text-neutral-400 border-b border-white/5 pb-2">
                <div class="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                  <span id="footer-hq-status-dot" class="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  <span id="footer-hq-status-text" class="text-green-400">Open Now</span>
                </div>
                <span id="footer-hq-time" class="font-mono text-neutral-200">00:00:00</span>
              </div>

              <!-- Contact details list -->
              <ul class="space-y-3">
                <li>
                  <a href="tel:+919620974224" class="flex items-center gap-2 text-[13px] text-neutral-400 hover:text-brand-orange transition-colors group">
                    <i data-lucide="phone" class="text-brand-orange w-3.5 h-3.5 flex-shrink-0"></i>
                    <span>+91 96209 74224</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:monomeconstructions@zohomail.in" class="flex items-center gap-2 text-[13px] text-neutral-400 hover:text-brand-orange transition-colors group">
                    <i data-lucide="mail" class="text-brand-orange w-3.5 h-3.5 flex-shrink-0"></i>
                    <span class="break-all text-[11px]">monomeconstructions@zohomail.in</span>
                  </a>
                </li>
                <li class="flex items-start gap-2 text-[13px] text-neutral-400 relative group/address pr-6">
                  <i data-lucide="map-pin" class="text-brand-orange w-3.5 h-3.5 flex-shrink-0 mt-0.5"></i>
                  <span class="leading-relaxed text-[11px]">Vasavi nilaya, No 34, Gururaja layout, 3rd cross, Banashankari, Bengaluru - 560085</span>
                  <button id="footer-copy-address" class="absolute right-0 top-0.5 text-neutral-500 hover:text-white transition-colors cursor-pointer" title="Copy Address">
                    <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                  </button>
                  <span id="footer-copy-tooltip" class="absolute -top-7 right-0 text-[10px] bg-brand-orange text-white px-2 py-0.5 rounded opacity-0 transition-opacity pointer-events-none z-20">Copied!</span>
                </li>
              </ul>
            </div>

            <!-- Subscribe Column -->
            <div>
              <h4 class="font-inter font-700 text-white mb-5 text-sm tracking-wide">Stay Updated</h4>
              <p class="text-[13px] text-neutral-400 mb-5 leading-relaxed">
                Subscribe to get construction insights, project updates, and design tips directly in your inbox.
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
              <div class="mt-6 pt-5 border-t border-white/5">
                <p class="text-[10px] text-neutral-500 mb-2.5 uppercase tracking-widest">Recognitions</p>
                <div class="flex flex-wrap gap-1.5">
                  <span class="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">CREDAI</span>
                  <span class="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">ISO 9001</span>
                  <span class="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">GRIHA</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Bottom bar -->
          <div class="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="text-center sm:text-left">
              <p class="text-xs text-neutral-500">
                &copy; 2026 MONOME Constructions. All rights reserved.
              </p>
              <p class="text-[10px] text-neutral-600 mt-1">
                Designed &amp; Developed by <a href="https://sofzenix.com" target="_blank" rel="noopener noreferrer" class="text-brand-orange/80 hover:text-brand-orange transition-colors font-medium">Sofzenix IT Solutions LLP</a>
              </p>
            </div>
            <div class="flex gap-6">
              <a href="#" class="text-xs text-neutral-500 hover:text-brand-orange transition-colors">Privacy Policy</a>
              <a href="#" class="text-xs text-neutral-500 hover:text-brand-orange transition-colors">Terms of Service</a>
              <a href="#" class="text-xs text-neutral-500 hover:text-brand-orange transition-colors">Sitemap</a>
            </div>

          </div>
        </div>
      </div>
    </footer>

    <!-- Interactive Footer Scripts -->
    <script>
      (function() {
        // 1. Live Clock & Dynamic Office Open/Closed Status
        function updateHQClock() {
          const now = new Date();
          // Convert local user time to India Standard Time (IST is UTC+5.30)
          const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
          const ist = new Date(utc + (3600000 * 5.5));
          
          let hours = ist.getHours();
          let minutes = ist.getMinutes();
          let seconds = ist.getSeconds();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          
          // Office hours: Mon-Sat, 9:00 AM to 7:00 PM (hours 9 to 19)
          const day = ist.getDay(); // 0 = Sunday
          const isWeekday = day >= 1 && day <= 6;
          const isOpen = isWeekday && hours >= 9 && hours < 19;
          
          hours = hours % 12;
          hours = hours ? hours : 12;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;
          
          const timeStr = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
          
          const timeEl = document.getElementById('footer-hq-time');
          const dotEl = document.getElementById('footer-hq-status-dot');
          const textEl = document.getElementById('footer-hq-status-text');
          
          if (timeEl) timeEl.textContent = timeStr;
          if (dotEl && textEl) {
            if (isOpen) {
              dotEl.className = 'w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse';
              textEl.className = 'text-green-400';
              textEl.textContent = 'Open Now';
            } else {
              dotEl.className = 'w-1.5 h-1.5 rounded-full bg-red-500';
              textEl.className = 'text-red-500';
              textEl.textContent = 'Closed Now';
            }
          }
        }
        setInterval(updateHQClock, 1000);
        setTimeout(updateHQClock, 100);

        // 2. Interactive Address Copy Tool
        const copyBtn = document.getElementById('footer-copy-address');
        if (copyBtn) {
          copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigator.clipboard.writeText("Vasavi nilaya, No 34, Gururaja layout, 3rd cross, Banashankari, Bengaluru - 560085");
            const tooltip = document.getElementById('footer-copy-tooltip');
            if (tooltip) {
              tooltip.classList.remove('opacity-0');
              tooltip.classList.add('opacity-100');
              setTimeout(function() {
                tooltip.classList.remove('opacity-100');
                tooltip.classList.add('opacity-0');
              }, 2000);
            }
            const icon = copyBtn.querySelector('i');
            if (icon) {
              icon.setAttribute('data-lucide', 'check');
              if (window.lucide) window.lucide.createIcons();
              setTimeout(function() {
                icon.setAttribute('data-lucide', 'copy');
                if (window.lucide) window.lucide.createIcons();
              }, 2000);
            }
          });
        }

        // 3. Dynamic Confetti Particle Explosion
        window.triggerFooterConfetti = function() {
          const canvas = document.getElementById('footer-confetti-canvas');
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          
          canvas.width = canvas.parentElement.offsetWidth;
          canvas.height = canvas.parentElement.offsetHeight;
          
          const particles = [];
          const colors = ['#F5A623', '#D4891A', '#ffffff', '#B8D4E8', '#B8E4D4'];
          
          for (let i = 0; i < 150; i++) {
            particles.push({
              x: canvas.width / 2 + (Math.random() - 0.5) * 200,
              y: canvas.height - 100 + (Math.random() - 0.5) * 50,
              vx: (Math.random() - 0.5) * 12,
              vy: -Math.random() * 18 - 6,
              size: Math.random() * 5 + 3,
              color: colors[Math.floor(Math.random() * colors.length)],
              alpha: 1,
              decay: Math.random() * 0.015 + 0.008
            });
          }
          
          let active = true;
          function draw() {
            if (!active) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            let alive = false;
            for (let i = 0; i < particles.length; i++) {
              let p = particles[i];
              p.x += p.vx;
              p.y += p.vy;
              p.vy += 0.35; // gravity
              p.alpha -= p.decay;
              
              if (p.alpha > 0) {
                alive = true;
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                ctx.restore();
              }
            }
            
            if (alive) {
              requestAnimationFrame(draw);
            } else {
              active = false;
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
          }
          draw();
        };

        // Bind to form submit
        const newsForm = document.getElementById('newsletter-form');
        if (newsForm) {
          newsForm.addEventListener('submit', function() {
            setTimeout(window.triggerFooterConfetti, 100);
          });
        }
      })();
    </script>
`;
  },
  extras() {
    return `
    <!-- ─── BACK TO TOP BUTTON ─── -->
    <button id="back-to-top" style="padding: 0;" class="fixed bottom-24 right-7 z-50 w-12 h-12 rounded-full btn-primary flex items-center justify-center shadow-lg opacity-0 pointer-events-none translate-y-4 transition-all duration-300 hover:scale-110 active:scale-95" aria-label="Back to top">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>

    <!-- ─── LIGHTBOX MODAL ─── -->
    <div id="lightbox" class="lightbox-overlay hidden">
      <div class="relative max-w-4xl w-full mx-4 rounded-3xl overflow-hidden bg-[#FAF8F3] dark:bg-[#0f1117] flex flex-col shadow-2xl">
        <!-- Close Button -->
        <button id="lightbox-close" class="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors z-20 animate-fade-in" aria-label="Close image">
          <i data-lucide="x" class="w-5 h-5 text-neutral-700 dark:text-neutral-200"></i>
        </button>
        <!-- Image Area -->
        <div class="relative w-full bg-black/95 flex items-center justify-center py-4">
          <img id="lightbox-img" src="" alt="Lightbox image" class="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain block mx-auto" />
        </div>
        <!-- Details Area -->
        <div class="p-6 border-t border-neutral-200/30 dark:border-white/10 bg-[#FAF8F3] dark:bg-[#0f1117]">
          <span class="tag mb-2 inline-block" id="lightbox-tag">Gallery Item</span>
          <h3 class="font-inter font-700 text-xl text-neutral-800 dark:text-white" id="lightbox-title">Item Title</h3>
        </div>
      </div>
    </div>

    <!-- ─── CHATBOT LAUNCHER & WINDOW CONTAINER ─── -->
    <div id="monome-chatbot-root"></div>
    <script type="module" src="chatbot.js?v=8"></script>
`;
  }
};
