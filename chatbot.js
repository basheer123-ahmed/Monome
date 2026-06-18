/**
 * MONOME Construction Assistant Chatbot (Pure Frontend)
 * Premium guided assistant matching MONOME's aesthetic.
 * Optimized standalone vanilla JavaScript architecture.
 */

import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3';
import { KNOWLEDGE_BASE_EMBEDDED } from './embeddings_compact.js';

(function () {
  // CSS styling for the chatbot, injected dynamically
  const styles = `
    /* Bounce animation: 2 bounces in first 2 seconds, then 6 seconds pause */
    @keyframes chatbot-bounce-cycle {
      0%, 15%, 30%, 100% { transform: translateY(0); }
      7.5%, 22.5% { transform: translateY(-12px); }
    }
    .animate-chatbot-bounce {
      animation: chatbot-bounce-cycle 8s ease-in-out infinite;
    }

    /* Spring-like entry/exit transition for the chat window */
    .chatbot-window {
      transform-origin: bottom right;
      transition: opacity 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                  transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                  visibility 0.35s;
    }
    .chatbot-window.hidden-scale {
      opacity: 0;
      transform: scale(0.8) translateY(50px);
      pointer-events: none;
      visibility: hidden;
    }

    /* Fade-in animation for chat bubbles */
    @keyframes bubble-slide-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-bubble-in {
      animation: bubble-slide-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    /* Typing dots animation */
    @keyframes typing-pulse {
      0%, 100% { opacity: 0.3; transform: translateY(0); }
      50% { opacity: 1; transform: translateY(-4px); }
    }
    .typing-dot {
      width: 6px;
      height: 6px;
      background-color: currentColor;
      border-radius: 50%;
      display: inline-block;
      animation: typing-pulse 1.2s infinite ease-in-out;
    }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }

    /* Custom scrollbar for chat area */
    .chatbot-messages::-webkit-scrollbar {
      width: 5px;
    }
    .chatbot-messages::-webkit-scrollbar-track {
      background: transparent;
    }
    .chatbot-messages::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 99px;
    }
    .dark .chatbot-messages::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
    }
  `;

  // Inject styles into the document head
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Predefined Interactive Questions (The UX Hook)
  const QUICK_INQUIRIES = [
    "How do I access my live building portal?",
    "What premium materials do you use?",
    "Can I get an instant cost estimate?",
    "Where are your offices located?"
  ];

  const PILL_RESPONSES = {
    "How do I access my live building portal?": {
      text: "To access your live building portal, simply click on the <strong>Client Portal</strong> button in our main navigation, or visit <strong>portal.html</strong>. It features daily construction logs, 360-degree site photos, material testing logs, and billing statements updated in real-time.",
      topic: "portal"
    },
    "What premium materials do you use?": {
      text: "We use Fe-550D TMT reinforcement steel (Tata/JSW), OPC 53 Grade Cement (UltraTech/ACC), elastomeric waterproofing membranes (Fosroc/Dr. Fixit), UPVC soundproof windows (Fenesta), and luxury vitrified tiles or Italian marble.",
      topic: "materials"
    },
    "Can I get an instant cost estimate?": {
      text: "Yes! Construction starts from approx. ₹1,800 to ₹2,500/sq.ft for Standard specs, ₹2,800 to ₹3,500 for Premium, and ₹4,000+ for Luxury. You can also use our interactive cost estimator by typing 'cost calculator'.",
      topic: "costs"
    },
    "Where are your offices located?": {
      text: "Our corporate headquarters is located at <strong>42, Prestige Towers, MG Road, Bangalore</strong>. We execute premium residential and commercial projects across Bangalore and major South Indian cities.",
      topic: "locations"
    }
  };

  const fallbackCardHtml = `
    <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm space-y-3 mt-1">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h4 class="font-inter font-bold text-sm text-neutral-800 dark:text-white">Let's Connect Directly!</h4>
      </div>
      <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
        Our design desk can answer this specific architectural detail.
      </p>
      <div class="pt-1">
        <a href="contact.html" class="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#D4891A] text-white text-[12px] font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center">
          Book Design Consultation &rarr;
        </a>
      </div>
    </div>
  `;

  // State variables
  let isOpen = false;
  let isModelReady = false;
  let pipelineInstance = null;
  let currentContext = null;

  // Helper: check if shorthand/pronoun-like
  function isShorthandOrPronoun(text) {
    const words = text.toLowerCase().trim().split(/\s+/);
    if (words.length <= 3) return true;
    const pronouns = ['it', 'its', 'this', 'that', 'they', 'them', 'these', 'those', 'there', 'here', 'more', 'about', 'how much', 'cost', 'timelines', 'price', 'duration', 'address', 'where', 'why', 'who'];
    return words.some(w => pronouns.includes(w));
  }

  // Helper: dot product for normalized vectors
  function dotProduct(a, b) {
    let sum = 0;
    const len = a.length;
    for (let i = 0; i < len; ++i) {
      sum += a[i] * b[i];
    }
    return sum;
  }

  // Model Initialization
  async function initModel() {
    try {
      env.allowLocalModels = true;
      env.allowRemoteModels = false;
      env.localModelPath = '/models/';
      
      // Load standard model Xenova/all-MiniLM-L6-v2 from local path
      pipelineInstance = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      
      isModelReady = true;
      console.log("MONOME Semantic vector engine initialized successfully.");
      
      // Hide spinner and render Quick Inquiry pill buttons instantly
      renderQuickInquiries();
    } catch (err) {
      console.error("Failed to load local semantic engine:", err);
      // Fail gracefully and allow users to use the Quick Inquiries matrix
      isModelReady = true;
      renderQuickInquiries();
    }
  }

  // Render the launcher button and chatbot window
  function initChatbot() {
    const root = document.getElementById("monome-chatbot-root");
    if (!root) return;

    // Create chatbot markup
    root.innerHTML = `
      <!-- Floating Launcher Button -->
      <button id="monome-chatbot-launcher" class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#F5A623] to-[#D4891A] text-white shadow-luxury hover:shadow-luxury-hover hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer animate-chatbot-bounce animate-delay-1000" aria-label="Open construction assistant">
        <!-- Notification Badge -->
        <span id="monome-chatbot-badge" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md z-10">1</span>
        <!-- White Circle containing the Cute Robot SVG -->
        <div class="w-11 h-11 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center overflow-hidden border border-white/80 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-9.5 h-9.5">
            <!-- Definitions for Gradients & Filters -->
            <defs>
              <linearGradient id="hardhatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFD03B" />
                <stop offset="100%" stop-color="#E0921B" />
              </linearGradient>
              <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#EBF3F8" />
                <stop offset="100%" stop-color="#C2D5E3" />
              </linearGradient>
              <linearGradient id="trowelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#F1F5F9" />
                <stop offset="100%" stop-color="#94A3B8" />
              </linearGradient>
              <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#D97706" />
                <stop offset="100%" stop-color="#78350F" />
              </linearGradient>
            </defs>

            <!-- ROBOT BODY & LEGS -->
            <!-- Wheels -->
            <rect x="36" y="80" width="7" height="9" rx="2" fill="#475569" stroke="#1E293B" stroke-width="1" />
            <rect x="57" y="80" width="7" height="9" rx="2" fill="#475569" stroke="#1E293B" stroke-width="1" />

            <!-- Shirt Collar -->
            <path d="M42 66 L50 72 L58 66 L55 60 L45 60 Z" fill="#475569" stroke="#1E293B" stroke-width="1" />

            <!-- Torso / Belt -->
            <rect x="38" y="66" width="24" height="15" rx="4" fill="#F5A623" stroke="#D4891A" stroke-width="1" />
            <!-- Belt strip -->
            <rect x="38" y="73" width="24" height="3" fill="#78350F" />
            <!-- Belt Buckle -->
            <rect x="47" y="70" width="6" height="8" rx="1.5" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1" />
            <!-- Tool pouches -->
            <rect x="34" y="72" width="5" height="7" rx="1" fill="#B45309" stroke="#78350F" stroke-width="1" />
            <rect x="61" y="72" width="5" height="7" rx="1" fill="#B45309" stroke="#78350F" stroke-width="1" />

            <!-- Left Arm & Hand (Holding Trowel) -->
            <path d="M60 67 C66 67, 70 60, 71 54" fill="none" stroke="#F5A623" stroke-width="4.5" stroke-linecap="round" />
            <circle cx="71" cy="54" r="3.5" fill="#D4891A" stroke="#78350F" stroke-width="1" />

            <!-- Trowel -->
            <path d="M71 54 L75 48" stroke="#64748B" stroke-width="2.5" stroke-linecap="round" />
            <path d="M69 56 L64 64" stroke="url(#woodGrad)" stroke-width="4" stroke-linecap="round" />
            <path d="M75 48 L86 33 C84 29, 80 27, 77 27 L72 42 Z" fill="url(#trowelGrad)" stroke="#475569" stroke-width="1" stroke-linejoin="round" />
            <path d="M75 48 L77 27" stroke="#334155" stroke-width="0.5" opacity="0.4" />

            <!-- Right Arm & Hand -->
            <path d="M40 67 C34 67, 30 72, 28 78" fill="none" stroke="#F5A623" stroke-width="4.5" stroke-linecap="round" />
            <circle cx="28" cy="78" r="3.5" fill="#D4891A" stroke="#78350F" stroke-width="1" />

            <!-- Floating Gears on Left -->
            <g transform="translate(18, 54) scale(0.8)">
              <circle cx="0" cy="0" r="4.5" fill="#94A3B8" stroke="#475569" stroke-width="1" />
              <rect x="-1" y="-6" width="2" height="2" fill="#475569" rx="0.5" />
              <rect x="-1" y="4" width="2" height="2" fill="#475569" rx="0.5" />
              <rect x="-6" y="-1" width="2" height="2" fill="#475569" rx="0.5" />
              <rect x="4" y="-1" width="2" height="2" fill="#475569" rx="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <g transform="translate(22, 64) scale(0.6)">
              <circle cx="0" cy="0" r="4.5" fill="#CBD5E1" stroke="#475569" stroke-width="1" />
              <rect x="-1" y="-6" width="2" height="2" fill="#475569" rx="0.5" />
              <rect x="-1" y="4" width="2" height="2" fill="#475569" rx="0.5" />
              <rect x="-6" y="-1" width="2" height="2" fill="#475569" rx="0.5" />
              <rect x="4" y="-1" width="2" height="2" fill="#475569" rx="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>

            <!-- ROBOT HEAD -->
            <rect x="30" y="34" width="40" height="32" rx="12" fill="#F5A623" stroke="#D4891A" stroke-width="1.5" />
            <!-- Ear caps -->
            <rect x="27" y="44" width="3" height="12" rx="1.5" fill="#94A3B8" stroke="#475569" stroke-width="1" />
            <rect x="70" y="44" width="3" height="12" rx="1.5" fill="#94A3B8" stroke="#475569" stroke-width="1" />
            
            <!-- Screen Face -->
            <rect x="34" y="39" width="32" height="22" rx="8" fill="url(#screenGrad)" stroke="#94A3B8" stroke-width="1" />

            <!-- Eyes -->
            <circle cx="42" cy="48" r="4.5" fill="#1E293B" />
            <circle cx="43.8" cy="46.2" r="1.5" fill="#FFFFFF" />
            <circle cx="58" cy="48" r="4.5" fill="#1E293B" />
            <circle cx="59.8" cy="46.2" r="1.5" fill="#FFFFFF" />

            <!-- Smile -->
            <path d="M47 53.5 Q50 57.5 53 53.5" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" />

            <!-- Cheek blush -->
            <circle cx="37.5" cy="53" r="1.8" fill="#FCA5A5" opacity="0.8" />
            <circle cx="62.5" cy="53" r="1.8" fill="#FCA5A5" opacity="0.8" />

            <!-- HARDHAT -->
            <path d="M30 34 C30 18, 70 18, 70 34 Z" fill="url(#hardhatGrad)" stroke="#D4891A" stroke-width="1.5" />
            <path d="M26 32 C26 32, 50 29, 74 32 C76 33, 76 35, 74 35 C50 37.5, 26 35, 26 32" fill="#E0921B" stroke="#D4891A" stroke-width="1" />
            <path d="M50 19 L50 31" stroke="#D4891A" stroke-width="2" opacity="0.6" />

            <!-- Gear Emblem on Hat -->
            <g transform="translate(50, 25.5)">
              <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" stroke="#334155" stroke-width="0.8" />
              <rect x="-0.8" y="-5.5" width="1.6" height="1.5" fill="#334155" rx="0.3" />
              <rect x="-0.8" y="4" width="1.6" height="1.5" fill="#334155" rx="0.3" />
              <rect x="-5.5" y="-0.8" width="1.5" height="1.6" fill="#334155" rx="0.3" />
              <rect x="4" y="-0.8" width="1.5" height="1.6" fill="#334155" rx="0.3" />
              <!-- Diagonals -->
              <rect x="-0.8" y="-5.5" width="1.6" height="1.5" fill="#334155" rx="0.3" transform="rotate(45)" />
              <rect x="-0.8" y="-5.5" width="1.6" height="1.5" fill="#334155" rx="0.3" transform="rotate(-45)" />
              <rect x="-0.8" y="-5.5" width="1.6" height="1.5" fill="#334155" rx="0.3" transform="rotate(90)" />
              <circle cx="0" cy="0" r="3.2" fill="#FFFFFF" />
              <!-- 'M' letter -->
              <path d="M-2 1.2 L-2 -1.2 L-0.5 0.2 L1 -1.2 L1 1.2" fill="none" stroke="#D4891A" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
            </g>

            <!-- SPEECH BUBBLE -->
            <g transform="translate(68, 12)">
              <path d="M9 2 C14 2, 18 4.5, 18 8 C18 10.5, 15 13, 11.5 13.8 L12 16.5 L9.5 14 C5 14, 2 11.5, 2 8 C2 4.5, 5 2, 9 2 Z" fill="#93C5FD" stroke="#60A5FA" stroke-width="0.8" />
              <circle cx="6.5" cy="8" r="1" fill="#1E3A8A" />
              <circle cx="9" cy="8" r="1" fill="#1E3A8A" />
              <circle cx="11.5" cy="8" r="1" fill="#1E3A8A" />
            </g>
          </svg>
        </div>
      </button>

      <!-- Chat Window Panel -->
      <div id="monome-chatbot-window" class="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] rounded-3xl overflow-hidden glass-card shadow-2xl flex flex-col chatbot-window hidden-scale">
        <!-- Header -->
        <div class="bg-gradient-to-r from-[#F5A623] to-[#D4891A] p-4 flex items-center justify-between text-white shadow-md relative">
          <div class="flex items-center gap-3">
            <!-- Mini Logo -->
            <div class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 class="font-inter font-800 text-sm leading-tight text-white tracking-wide">MONOME</h3>
              <p class="text-[10px] text-white/80 leading-none font-medium font-poppins mt-0.5">Construction Assistant</p>
            </div>
          </div>
          <!-- Close Button -->
          <button id="monome-chatbot-close" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-white cursor-pointer" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Chat Area (Scrollable messages) -->
        <div id="monome-chatbot-messages" class="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FEFDFB]/95 dark:bg-[#0f1117]/95 chatbot-messages">
          <!-- Welcome message bubble -->
          <div class="flex justify-start animate-bubble-in">
            <div class="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[82%] text-[13px] leading-relaxed shadow-sm relative border border-neutral-200/40 dark:border-neutral-700/40">
              <p class="font-semibold text-[#F5A623] mb-1 font-inter font-bold">Welcome to MONOME Constructions! 👋</p>
              <p>Get quick answers about construction, costs, timelines and services.</p>
              <span class="text-[9px] text-neutral-400 dark:text-neutral-500 mt-1 block">Just now</span>
            </div>
          </div>
        </div>

        <!-- Options Container (Quick Inquiries pills) -->
        <div id="monome-chatbot-options-container" class="px-4 py-2 bg-[#FEFDFB]/90 dark:bg-[#0f1117]/90 border-t border-neutral-100 dark:border-neutral-800/60 max-h-[140px] overflow-y-auto">
          <div id="monome-chatbot-options" class="flex flex-wrap gap-2 py-1.5">
            <div class="text-[11px] text-neutral-400 dark:text-neutral-500 animate-pulse py-1">🧠 Loading intelligence engine...</div>
          </div>
        </div>

        <!-- Text Input Area -->
        <form id="monome-chatbot-form" class="p-3 border-t border-neutral-100 dark:border-neutral-800/80 bg-white dark:bg-[#1a1d23] flex gap-2 items-center">
          <input type="text" id="monome-chatbot-input" placeholder="Type your question..." class="flex-1 px-4 py-2 rounded-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[13px] text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/20 transition-all" autocomplete="off" />
          <button type="submit" class="w-9 h-9 rounded-full bg-[#F5A623] text-white flex items-center justify-center hover:bg-[#D4891A] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md" aria-label="Send message">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    `;

    // Elements reference
    const launcher = document.getElementById("monome-chatbot-launcher");
    const badge = document.getElementById("monome-chatbot-badge");
    const windowPanel = document.getElementById("monome-chatbot-window");
    const closeBtn = document.getElementById("monome-chatbot-close");
    const form = document.getElementById("monome-chatbot-form");
    const input = document.getElementById("monome-chatbot-input");

    // Toggle window panel open/close
    launcher.addEventListener("click", () => {
      isOpen = !isOpen;
      if (isOpen) {
        windowPanel.classList.remove("hidden-scale");
        launcher.classList.remove("animate-chatbot-bounce");
        if (badge) badge.classList.add("hidden"); // Remove notification badge once clicked
        renderQuickInquiries();
        setTimeout(() => input.focus(), 150);
      } else {
        windowPanel.classList.add("hidden-scale");
        launcher.classList.add("animate-chatbot-bounce");
      }
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isOpen = false;
      windowPanel.classList.add("hidden-scale");
      launcher.classList.add("animate-chatbot-bounce");
    });

    // Form submission (custom question)
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      input.value = "";
      handleUserTextSubmit(text);
    });

    // Initial render
    renderQuickInquiries();
  }

  // Render quick inquiry pill buttons above the input field
  function renderQuickInquiries() {
    const container = document.getElementById("monome-chatbot-options");
    if (!container) return;

    if (!isModelReady) {
      container.innerHTML = `<div class="text-[11px] text-neutral-400 dark:text-neutral-500 animate-pulse py-1">🧠 Loading intelligence engine...</div>`;
      return;
    }

    container.innerHTML = "";
    QUICK_INQUIRIES.forEach(q => {
      const button = document.createElement("button");
      button.className = "text-[12px] px-3.5 py-1.5 rounded-full border border-[#F5A623]/30 dark:border-[#F5A623]/20 text-[#F5A623] hover:bg-[#F5A623] hover:text-white dark:hover:bg-[#F5A623]/25 transition-all duration-200 cursor-pointer bg-white/90 dark:bg-neutral-800/90 font-medium shadow-sm hover:scale-105 active:scale-95 text-left";
      button.textContent = q;
      button.addEventListener("click", () => {
        handlePillClick(q);
      });
      container.appendChild(button);
    });

    // Auto-scroll options container to top
    const parentContainer = document.getElementById("monome-chatbot-options-container");
    if (parentContainer) parentContainer.scrollTop = 0;
  }

  // Handles click on interactive pill buttons (instant response, zero delay)
  function handlePillClick(questionText) {
    addUserMessage(questionText);
    showTypingIndicator(() => {
      const response = PILL_RESPONSES[questionText];
      if (response) {
        addBotMessage(response.text);
        currentContext = response.topic;
      }
      renderQuickInquiries();
    });
  }

  // Handles custom typed messages & semantic matches
  async function handleUserTextSubmit(text) {
    addUserMessage(text);

    if (text.toLowerCase().trim() === "clear context") {
      currentContext = null;
      showTypingIndicator(() => {
        addBotMessage("Context cleared. Ask me anything about MONOME.");
        renderQuickInquiries();
      });
      return;
    }

    // Check if the typed query is an exact match for one of our pill questions (bypass model, instant match)
    const pillKey = Object.keys(PILL_RESPONSES).find(k => k.toLowerCase() === text.toLowerCase().trim());
    if (pillKey) {
      showTypingIndicator(() => {
        addBotMessage(PILL_RESPONSES[pillKey].text);
        currentContext = PILL_RESPONSES[pillKey].topic;
        renderQuickInquiries();
      });
      return;
    }

    if (!isModelReady || !pipelineInstance) {
      showTypingIndicator(() => {
        addBotMessage("My AI intelligence module is initializing. Please try again in a brief moment.");
        renderQuickInquiries();
      });
      return;
    }

    // Context stitching: Prepend topic keyword if current context is set and query is shorthand/pronoun-based
    let finalQuery = text;
    if (currentContext && isShorthandOrPronoun(text)) {
      finalQuery = `${currentContext} ${text}`;
      console.log(`Stitched query: "${finalQuery}" using context: "${currentContext}"`);
    }

    showTypingIndicator(async () => {
      try {
        // Run vector inference ONLY on the single user query (takes ~50ms, zero main thread block)
        const queryTensor = await pipelineInstance(finalQuery, {
          pooling: 'mean',
          normalize: true
        });
        const queryEmbedding = queryTensor.tolist()[0];

        let highestScore = -1;
        let bestItem = null;
        let bestQuestion = "";

        // Cosine Similarity search over the precomputed reference embeddings in embeddings_compact.js
        KNOWLEDGE_BASE_EMBEDDED.forEach(kbItem => {
          kbItem.embeddings.forEach((emb, embIdx) => {
            const score = dotProduct(queryEmbedding, emb);
            if (score > highestScore) {
              highestScore = score;
              bestItem = kbItem;
              bestQuestion = kbItem.questions[embIdx];
            }
          });
        });

        console.log(`Query: "${finalQuery}" | Best Match: "${bestQuestion}" | Score: ${highestScore.toFixed(4)}`);

        // Gate threshold check (0.70)
        if (highestScore >= 0.70) {
          addBotMessage(bestItem.answer);
          currentContext = bestItem.topic;
        } else {
          // Sharp Pivot Fallback: clear context, bypass model, render premium consultation card
          currentContext = null;
          addBotMessage(fallbackCardHtml);
        }
        renderQuickInquiries();
      } catch (err) {
        console.error("Inference error:", err);
        addBotMessage("Apologies, I encountered an issue processing your query. Please try again.");
        renderQuickInquiries();
      }
    });
  }

  // Append user message bubble to chat logs
  function addUserMessage(messageText) {
    const msgContainer = document.getElementById("monome-chatbot-messages");
    if (!msgContainer) return;

    const timeString = formatTime(new Date());

    const bubble = document.createElement("div");
    bubble.className = "flex justify-end animate-bubble-in";
    bubble.innerHTML = `
      <div class="bg-gradient-to-br from-[#F5A623] to-[#D4891A] text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[78%] text-[13px] leading-relaxed shadow-sm relative">
        <p>${escapeHTML(messageText)}</p>
        <span class="text-[9px] text-white/80 mt-1 block text-right">${timeString}</span>
      </div>
    `;
    msgContainer.appendChild(bubble);
    scrollChatToBottom();
  }

  // Append bot message bubble to chat logs
  function addBotMessage(messageHtml) {
    const msgContainer = document.getElementById("monome-chatbot-messages");
    if (!msgContainer) return;

    const timeString = formatTime(new Date());

    const bubble = document.createElement("div");
    bubble.className = "flex justify-start animate-bubble-in";
    bubble.innerHTML = `
      <div class="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[78%] text-[13px] leading-relaxed shadow-sm relative border border-neutral-200/40 dark:border-neutral-700/40">
        <div>${messageHtml}</div>
        <span class="text-[9px] text-neutral-400 dark:text-neutral-500 mt-1 block">${timeString}</span>
      </div>
    `;
    msgContainer.appendChild(bubble);
    scrollChatToBottom();
  }

  // Show typing indicator bubble and execute callback after a slight delay
  function showTypingIndicator(callback) {
    const msgContainer = document.getElementById("monome-chatbot-messages");
    if (!msgContainer) return;

    const typingBubble = document.createElement("div");
    typingBubble.id = "monome-chatbot-typing";
    typingBubble.className = "flex justify-start animate-bubble-in";
    typingBubble.innerHTML = `
      <div class="bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 rounded-2xl rounded-tl-none px-4 py-3 max-w-[70%] text-[13px] shadow-sm flex items-center gap-1">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    msgContainer.appendChild(typingBubble);
    scrollChatToBottom();

    // Delay callback and remove typing bubble
    setTimeout(() => {
      const el = document.getElementById("monome-chatbot-typing");
      if (el) el.remove();
      callback();
    }, 500 + Math.random() * 300); // 500ms - 800ms delay for realism
  }

  // Scrolls chat to the bottom
  function scrollChatToBottom() {
    const msgContainer = document.getElementById("monome-chatbot-messages");
    if (msgContainer) {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  }

  // Helper: Format date as HH:MM AM/PM
  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 12 instead of 0
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
  }

  // Helper: Escape HTML characters for safety in user input
  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initialize the model in the background
  initModel();

  // Wait for document to load, then initialize chatbot UI
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
