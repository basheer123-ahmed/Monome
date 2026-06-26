/**
 * MONOME Construction Assistant Chatbot (Hyper-Intelligent Pure Frontend Agent)
 * Production-ready, modular ES6 architecture.
 */

import { ChatController } from './chatController.js';

(function () {
  // Inject style block dynamically for scoped luxury UI enhancements
  const styles = `
    @keyframes chatbot-bounce-cycle {
      0%, 15%, 30%, 100% { transform: translateY(0); }
      7.5%, 22.5% { transform: translateY(-12px); }
    }
    .animate-chatbot-bounce {
      animation: chatbot-bounce-cycle 8s ease-in-out infinite;
    }
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
    @keyframes bubble-slide-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-bubble-in {
      animation: bubble-slide-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
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
    .suggestion-scroll {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      gap: 8px;
      padding: 6px 4px;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .suggestion-scroll::-webkit-scrollbar {
      display: none;
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Initialize ChatController
  const controller = new ChatController();

  // Predefined default option pills (Flipkart support desk style)
  const defaultPills = [
    { text: "🏢 Construction Workflow", query: "Tell me about your structural construction workflow steps" },
    { text: "💎 Premium Materials", query: "What materials do you use for house framing?" },
    { text: "📱 Live Streaming Portal", query: "How do I track my build live using cameras?" },
    { text: "📐 Vastu Integration", query: "Do you provide Vastu compliant floor plans?" }
  ];

  let activePills = [...defaultPills];
  let isOpen = false;

  // Render option pills in the UI
  function renderStatePills() {
    const container = document.getElementById("monome-chatbot-options");
    if (!container) return;
    container.innerHTML = "";

    activePills.forEach(pill => {
      const button = document.createElement("button");
      button.className = "text-[12px] whitespace-nowrap px-4 py-2 rounded-full border border-[#D4891A]/30 text-[#D4891A] dark:text-[#F5A623] hover:bg-gradient-to-r hover:from-[#F5A623] hover:to-[#D4891A] hover:text-white dark:hover:text-white transition-all duration-200 cursor-pointer bg-white/90 dark:bg-neutral-800/90 font-medium shadow-sm hover:scale-105 active:scale-95 text-center flex-shrink-0";
      button.innerHTML = pill.text;
      
      button.addEventListener("click", () => {
        if (pill.action) {
          pill.action();
        } else if (pill.query) {
          handleUserTextSubmit(pill.query);
        }
      });
      container.appendChild(button);
    });
    container.scrollLeft = 0;
  }

  // Handle user submit and bot matching flow
  function handleUserTextSubmit(text) {
    if (!text.trim()) return;
    addUserMessage(text);

    // Call modular ChatController to analyze intent and retrieve response
    const result = controller.processMessage(text);

    if (result) {
      if (result.type === "REDIRECT") {
        addBotMessage(`
          <div class="flex items-center gap-2.5">
            <svg class="animate-spin h-4.5 w-4.5 text-[#F5A623]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-xs font-semibold text-neutral-700 dark:text-neutral-200">${result.msg}</span>
          </div>
        `);
        setTimeout(() => {
          window.location.href = result.page;
        }, 1500);
      } else {
        addBotMessage(result.value);
      }

      // Update active pills based on suggested follow-ups
      if (result.suggestions && result.suggestions.length > 0) {
        activePills = result.suggestions.map(s => {
          // If suggestion starts with an emoji, we can strip it or clean it for query
          const cleanQuery = s.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, "").trim();
          return {
            text: s,
            query: cleanQuery
          };
        });
        
        // Append a Back to Main Menu shortcut
        activePills.push({
          text: "⬅️ Main Menu",
          action: () => {
            activePills = [...defaultPills];
            renderStatePills();
          }
        });
      } else {
        activePills = [...defaultPills];
      }
    } else {
      activePills = [...defaultPills];
    }

    renderStatePills();
  }

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

  function addBotMessage(messageHtml) {
    const msgContainer = document.getElementById("monome-chatbot-messages");
    if (!msgContainer) return;

    const timeString = formatTime(new Date());
    const bubble = document.createElement("div");
    bubble.className = "flex justify-start animate-bubble-in w-full";
    
    const isSupportCard = messageHtml.includes("support-card-wrapper") || messageHtml.includes("support-card");

    if (isSupportCard) {
      bubble.innerHTML = `
        <div class="w-full text-neutral-800 dark:text-neutral-100 rounded-2xl max-w-[95%] text-[13px] leading-relaxed relative">
          <div>${messageHtml}</div>
          <span class="text-[9px] text-neutral-400 dark:text-neutral-500 mt-1 block pl-2">${timeString}</span>
        </div>
      `;
    } else {
      bubble.innerHTML = `
        <div class="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[78%] text-[13px] leading-relaxed shadow-sm relative border border-neutral-200/40 dark:border-neutral-700/40">
          <div>${messageHtml}</div>
          <span class="text-[9px] text-neutral-400 dark:text-neutral-500 mt-1 block">${timeString}</span>
        </div>
      `;
    }
    msgContainer.appendChild(bubble);
    scrollChatToBottom();
  }

  function addSystemNotification(msgText) {
    const msgContainer = document.getElementById("monome-chatbot-messages");
    if (!msgContainer) return;

    const bubble = document.createElement("div");
    bubble.className = "flex justify-center animate-bubble-in my-2";
    bubble.innerHTML = `
      <div class="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/40 text-neutral-400 dark:text-neutral-500 rounded-lg px-3 py-1 text-[11px] leading-relaxed shadow-sm font-mono tracking-wide text-center">
        ⚡ ${msgText}
      </div>
    `;
    msgContainer.appendChild(bubble);
    scrollChatToBottom();
  }

  function scrollChatToBottom() {
    const msgContainer = document.getElementById("monome-chatbot-messages");
    if (msgContainer) {
      msgContainer.scrollTo({
        top: msgContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function initChatbot() {
    const root = document.getElementById("monome-chatbot-root");
    if (!root) return;

    // Preserve raw HTML wrapper structures, branding, layouts, styling, icons
    root.innerHTML = `
      <!-- WhatsApp floating launcher -->
      <a id="monome-whatsapp-launcher" href="https://wa.me/919620974224" target="_blank" rel="noopener noreferrer" class="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-luxury hover:shadow-luxury-hover hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer animate-chatbot-bounce" aria-label="Chat on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <!-- Chatbot launcher -->
      <button id="monome-chatbot-launcher" class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#F5A623] to-[#D4891A] text-white shadow-luxury hover:shadow-luxury-hover hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer animate-chatbot-bounce" aria-label="Open virtual assistant">
        <span id="monome-chatbot-badge" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-md z-10">1</span>
        <div class="w-11 h-11 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center overflow-hidden border border-white/80 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-9.5 h-9.5">
            <rect x="36" y="80" width="7" height="9" rx="2" fill="#475569" stroke="#1E293B" stroke-width="1" />
            <rect x="57" y="80" width="7" height="9" rx="2" fill="#475569" stroke="#1E293B" stroke-width="1" />
            <path d="M42 66 L50 72 L58 66 L55 60 L45 60 Z" fill="#475569" stroke="#1E293B" stroke-width="1" />
            <rect x="38" y="66" width="24" height="15" rx="4" fill="#F5A623" stroke="#D4891A" stroke-width="1" />
            <rect x="38" y="73" width="24" height="3" fill="#78350F" />
            <rect x="47" y="70" width="6" height="8" rx="1.5" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1" />
            <rect x="34" y="72" width="5" height="7" rx="1" fill="#B45309" stroke="#78350F" stroke-width="1" />
            <rect x="61" y="72" width="5" height="7" rx="1" fill="#B45309" stroke="#78350F" stroke-width="1" />
            <path d="M60 67 C66 67, 70 60, 71 54" fill="none" stroke="#F5A623" stroke-width="4.5" stroke-linecap="round" />
            <circle cx="71" cy="54" r="3.5" fill="#D4891A" stroke="#78350F" stroke-width="1" />
            <path d="M71 54 L75 48" stroke="#64748B" stroke-width="2.5" stroke-linecap="round" />
            <path d="M69 56 L64 64" stroke="#78350F" stroke-width="4" stroke-linecap="round" />
            <path d="M75 48 L86 33 C84 29, 80 27, 77 27 L72 42 Z" fill="#F1F5F9" stroke="#475569" stroke-width="1" stroke-linejoin="round" />
            <path d="M40 67 C34 67, 30 72, 28 78" fill="none" stroke="#F5A623" stroke-width="4.5" stroke-linecap="round" />
            <circle cx="28" cy="78" r="3.5" fill="#D4891A" stroke="#78350F" stroke-width="1" />
            <g transform="translate(18, 54) scale(0.8)">
              <circle cx="0" cy="0" r="4.5" fill="#94A3B8" stroke="#475569" stroke-width="1" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <g transform="translate(22, 64) scale(0.6)">
              <circle cx="0" cy="0" r="4.5" fill="#CBD5E1" stroke="#475569" stroke-width="1" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <rect x="30" y="34" width="40" height="32" rx="12" fill="#F5A623" stroke="#D4891A" stroke-width="1.5" />
            <rect x="27" y="44" width="3" height="12" rx="1.5" fill="#94A3B8" stroke="#475569" stroke-width="1" />
            <rect x="70" y="44" width="3" height="12" rx="1.5" fill="#94A3B8" stroke="#475569" stroke-width="1" />
            <rect x="34" y="39" width="32" height="22" rx="8" fill="#EBF3F8" stroke="#94A3B8" stroke-width="1" />
            <circle cx="42" cy="48" r="4.5" fill="#1E293B" />
            <circle cx="43.8" cy="46.2" r="1.5" fill="#FFFFFF" />
            <circle cx="58" cy="48" r="4.5" fill="#1E293B" />
            <circle cx="59.8" cy="46.2" r="1.5" fill="#FFFFFF" />
            <path d="M47 53.5 Q50 57.5 53 53.5" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="37.5" cy="53" r="1.8" fill="#FCA5A5" opacity="0.8" />
            <circle cx="62.5" cy="53" r="1.8" fill="#FCA5A5" opacity="0.8" />
            <path d="M30 34 C30 18, 70 18, 70 34 Z" fill="#FFD03B" stroke="#D4891A" stroke-width="1.5" />
            <path d="M26 32 C26 32, 50 29, 74 32 C76 33, 76 35, 74 35 C50 37.5, 26 35, 26 32" fill="#E0921B" stroke="#D4891A" stroke-width="1" />
          </svg>
        </div>
      </button>

      <div id="monome-chatbot-window" class="fixed bottom-[164px] right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] rounded-3xl overflow-hidden glass-card shadow-2xl flex flex-col chatbot-window hidden-scale">
        <div class="bg-gradient-to-r from-[#F5A623] to-[#D4891A] p-4 flex items-center justify-between text-white shadow-md relative">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 class="font-inter font-800 text-sm leading-tight text-white tracking-wide">MONOME</h3>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                <span class="text-[10px] text-white/80 leading-none font-medium font-poppins">Virtual Assistant</span>
              </div>
            </div>
          </div>
          <button id="monome-chatbot-close" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-white cursor-pointer" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div id="monome-chatbot-messages" class="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FEFDFB]/95 dark:bg-[#0f1117]/95 chatbot-messages">
        </div>

        <div id="monome-chatbot-options-container" class="px-4 py-1 bg-[#FEFDFB]/90 dark:bg-[#0f1117]/90 border-t border-neutral-100 dark:border-neutral-800/60 overflow-hidden">
          <div id="monome-chatbot-options" class="suggestion-scroll"></div>
        </div>

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

    const launcher = document.getElementById("monome-chatbot-launcher");
    const whatsappLauncher = document.getElementById("monome-whatsapp-launcher");
    const badge = document.getElementById("monome-chatbot-badge");
    const windowPanel = document.getElementById("monome-chatbot-window");
    const closeBtn = document.getElementById("monome-chatbot-close");
    const form = document.getElementById("monome-chatbot-form");
    const input = document.getElementById("monome-chatbot-input");

    launcher.addEventListener("click", () => {
      isOpen = !isOpen;
      if (isOpen) {
        windowPanel.classList.remove("hidden-scale");
        launcher.classList.remove("animate-chatbot-bounce");
        if (whatsappLauncher) whatsappLauncher.classList.remove("animate-chatbot-bounce");
        if (badge) badge.classList.add("hidden");
        setTimeout(() => input.focus(), 150);
      } else {
        windowPanel.classList.add("hidden-scale");
        launcher.classList.add("animate-chatbot-bounce");
        if (whatsappLauncher) whatsappLauncher.classList.add("animate-chatbot-bounce");
      }
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isOpen = false;
      windowPanel.classList.add("hidden-scale");
      launcher.classList.add("animate-chatbot-bounce");
      if (whatsappLauncher) whatsappLauncher.classList.add("animate-chatbot-bounce");
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = "";
      handleUserTextSubmit(text);
    });

    addSystemNotification("Secured session established with Monome Constructions Desk.");
    addBotMessage("Hello! Welcome to MONOME Constructions. How can I assist you today?");
    renderStatePills();
  }

  const handleDocInit = () => {
    const loaders = [
      document.getElementById("loading-spinner"),
      document.querySelector(".loading-spinner")
    ];
    loaders.forEach(el => {
      if (el) {
        el.style.display = "none";
        el.classList.add("hidden");
      }
    });

    initChatbot();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", handleDocInit);
  } else {
    handleDocInit();
  }
})();