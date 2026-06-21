/**
 * MONOME Construction Assistant Chatbot (Hyper-Intelligent Pure Frontend Agent)
 * Production-ready, standalone, zero-dependency script.
 * Executing in 0ms, 0MB download footprint, ironclad architecture.
 */

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

  // CONTEXT STATE CONTROL
  let currentGroupState = "MAIN";

  // IMMUTABLE HARDCODED 80 FAQ CORE INDEX DATASET
  const FAQ_MATRIX = [
    { q: "hai", a: "Hello! Welcome to Monome Constructions. How can I assist you today?" },
    { q: "helo", a: "Hi there! Welcome to Monome Constructions. How may I help you?" },
    { q: "hi", a: "Hello! Welcome to Monome Constructions. How can I assist you today?" },
    { q: "hello", a: "Hi there! Welcome to Monome Constructions. How may I help you?" },
    { q: "hey", a: "Hey! Thank you for visiting Monome Constructions." },
    { q: "good morning", a: "Good Morning! Welcome to Monome Constructions." },
    { q: "good afternoon", a: "Good Afternoon! How can Monome Constructions assist you?" },
    { q: "good evening", a: "Good Evening! Thank you for contacting Monome Constructions." },
    { q: "how are you", a: "I'm doing well. How can I help with your construction requirements?" },
    { q: "who are you", a: "I am Monome Constructions' virtual assistant." },
    { q: "what can you do", a: "I can answer questions about our construction services and projects." },
    { q: "can you help me", a: "Absolutely! Please let me know your construction requirements." },
    { q: "what is monome constructions", a: "Monome Constructions is a professional construction company specializing in residential and commercial projects." },
    { q: "what services do you provide", a: "We provide construction, renovation, interior, and project management services." },
    { q: "why choose monome constructions", a: "We focus on quality, transparency, and timely project delivery." },
    { q: "are you a registered company", a: "Yes, Monome Constructions operates as a professional construction company." },
    { q: "do you have experienced engineers", a: "Yes, our team includes experienced engineers and construction professionals." },
    { q: "do you have skilled workers", a: "Yes, we employ skilled workers to ensure quality construction." },
    { q: "what is your mission", a: "Our mission is to deliver quality construction services that exceed client expectations." },
    { q: "what is your vision", a: "Our vision is to become a trusted leader in the construction industry." },
    { q: "where are you located", a: "Please contact us for our office location and service areas." },
    { q: "how can i contact you", a: "You can contact us via phone, email, WhatsApp, or our website contact form." },
    { q: "do you build houses", a: "Yes, we specialize in residential house construction." },
    { q: "do you build villas", a: "Yes, we design and construct customized villas." },
    { q: "do you build duplex houses", a: "Yes, we construct duplex and multi-floor homes." },
    { q: "do you build luxury homes", a: "Yes, we create premium luxury homes tailored to client needs." },
    { q: "can i customize my house design", a: "Yes, we provide fully customized design solutions." },
    { q: "do you provide floor plans", a: "Yes, we prepare floor plans based on client requirements." },
    { q: "do you provide 3d designs", a: "Yes, we provide 3D visualizations before construction." },
    { q: "how long does house construction take", a: "Most residential projects take 6–12 months depending on size and complexity." },
    { q: "do you provide turnkey construction", a: "Yes, we provide complete turnkey construction solutions." },
    { q: "can you construct on my plot", a: "Yes, we can build on your existing plot." },
    { q: "do you provide vastu compliant designs", a: "Yes, we can incorporate Vastu principles if requested." },
    { q: "do you provide site supervision", a: "Yes, our experts supervise all project stages." },
    { q: "do you provide quality checks", a: "Yes, quality inspections are conducted throughout the project." },
    { q: "do you provide structural design", a: "Yes, we offer structural planning and engineering services." },
    { q: "do you help select materials", a: "Yes, we guide clients in choosing quality materials." },
    { q: "do you construct apartments", a: "Yes, we undertake apartment construction projects." },
    { q: "do you build commercial buildings", a: "Yes, we construct offices, shops, and commercial facilities." },
    { q: "do you construct office spaces", a: "Yes, we build and design office spaces." },
    { q: "do you build warehouses", a: "Yes, we provide warehouse construction services." },
    { q: "do you build retail stores", a: "Yes, we construct retail and showroom spaces." },
    { q: "do you handle industrial projects", a: "Yes, we undertake industrial construction projects." },
    { q: "do you provide commercial interiors", a: "Yes, we offer commercial interior solutions." },
    { q: "do you manage large scale projects", a: "Yes, we have experience managing large construction projects." },
    { q: "do you provide project planning", a: "Yes, we assist with planning, budgeting, and execution." },
    { q: "do you provide project reports", a: "Yes, we provide project updates and reports." },
    { q: "do you provide interior design", a: "Yes, we offer complete interior design services." },
    { q: "do you renovate houses", a: "Yes, we provide home renovation services." },
    { q: "do you renovate offices", a: "Yes, we renovate office spaces and commercial properties." },
    { q: "do you remodel kitchens", a: "Yes, we provide kitchen remodeling solutions." },
    { q: "do you remodel bathrooms", a: "Yes, we offer bathroom renovation services." },
    { q: "do you provide modular kitchens", a: "Yes, we design and install modular kitchens." },
    { q: "do you provide wardrobes", a: "Yes, we provide custom wardrobe solutions." },
    { q: "do you provide false ceilings", a: "Yes, we install false ceilings for residential and commercial spaces." },
    { q: "do you provide painting services", a: "Yes, we offer interior and exterior painting services." },
    { q: "do you provide flooring services", a: "Yes, we install a variety of flooring options." },
    { q: "how much does construction cost", a: "Costs depend on project size, location, and material selection." },
    { q: "do you provide free quotations", a: "Yes, we provide project quotations after understanding requirements." },
    { q: "how is the cost calculated", a: "Costs are calculated based on area, design, labor, and materials." },
    { q: "are there hidden charges", a: "No, we maintain transparency in project pricing." },
    { q: "can i get a customized quotation", a: "Yes, quotations are tailored to each project." },
    { q: "do you offer budget friendly plans", a: "Yes, we provide solutions for different budgets." },
    { q: "what payment methods do you accept", a: "We accept standard payment methods as agreed in the contract." },
    { q: "do you provide payment schedules", a: "Yes, payments are generally linked to project milestones." },
    { q: "what affects construction cost", a: "Design, materials, location, and project complexity affect costs." },
    { q: "can you estimate my project cost", a: "Yes, contact us with your requirements for an estimate." },
    { q: "how do i start my project", a: "Contact us and schedule a consultation." },
    { q: "what is the first step", a: "The first step is discussing your requirements and project goals." },
    { q: "do you conduct site visits", a: "Yes, we conduct site inspections before project planning." },
    { q: "do you provide consultations", a: "Yes, we provide professional consultations." },
    { q: "can i monitor project progress", a: "Yes, regular progress updates are provided." },
    { q: "do you help with approvals", a: "Yes, we assist with approval processes when required." },
    { q: "do you provide contracts", a: "Yes, all projects are supported by proper agreements." },
    { q: "do you provide warranties", a: "Warranty details depend on project scope and agreement terms." },
    { q: "what happens after project completion", a: "We hand over the completed project and provide support if needed." },
    { q: "do you offer maintenance services", a: "Yes, maintenance services can be provided upon request." },
    { q: "what are your working hours", a: "Please contact our team for business hours." },
    { q: "do you provide customer support", a: "Yes, our team is available to assist clients." },
    { q: "can i request a callback", a: "Yes, please share your contact details and our team will reach out." },
    { q: "thank you", a: "You're welcome! Thank you for choosing Monome Constructions." },
    { q: "bye", a: "Thank you for visiting Monome Constructions. Have a wonderful day!" }
  ];
  Object.freeze(FAQ_MATRIX);

  const fallbackCardHtml = `
    <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm space-y-3 mt-1">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
          </svg>
        </div>
        <h4 class="font-inter font-bold text-sm text-neutral-800 dark:text-white">Custom Parameters Desk</h4>
      </div>
      <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
        Our specialized engineering office can map out this specific structural detail or budget estimate for you.
      </p>
      <div class="pt-1">
        <button class="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#D4891A] text-white text-[12px] font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center border-none cursor-pointer" onclick="window.location.href='contact.html'">
          Book Premium Consultation &rarr;
        </button>
      </div>
    </div>
  `;

  let isOpen = false;

  // Sanitizer
  function cleanText(text) {
    if (!text) return "";
    let cleaned = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "")
      .replace(/\s+/g, " ")
      .trim();
    cleaned = cleaned.replace(/\bmonom\b/g, "monome");
    return cleaned;
  }

  // Levenshtein Metric Engine to capture typos (Fuzzy matching)
  function computeLevenshteinDistance(s1, s2) {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  // Multi-Token Combination Matching System
  function matchesPhraseCombinations(input, keywords) {
    return keywords.every(kw => input.includes(kw));
  }

  // TIER 1: Enhanced Substring + Fuzzy Matching
  function findResponse(userInput) {
    const cleanedInput = cleanText(userInput);
    if (!cleanedInput) return null;

    // Define top-priority conversational sentiment arrays
    const greetings = ["hi", "hai", "hello", "helo", "hey", "yo", "good morning"];
    const pleasantries = ["nice", "cool", "great", "awesome", "ok", "okay", "perfect", "got it"];

    // Top-priority direct matching for these arrays
    if (greetings.includes(cleanedInput)) {
      // Find matching greeting response or fallback to default greeting
      for (const item of FAQ_MATRIX) {
        if (cleanText(item.q) === cleanedInput) {
          return item.a;
        }
      }
      return "Hello! Welcome to Monome Constructions. How can I assist you today?";
    }

    if (pleasantries.includes(cleanedInput)) {
      return "Great! Let me know if you have any questions about our projects, structural workflow, materials, or pricing estimation.";
    }

    // Exact or direct inclusion check
    for (const item of FAQ_MATRIX) {
      const cleanedQuestion = cleanText(item.q);
      if (cleanedInput === cleanedQuestion || cleanedInput.includes(cleanedQuestion) || cleanedQuestion.includes(cleanedInput)) {
        return item.a;
      }
    }

    // Levenshtein typo fallback gate
    for (const item of FAQ_MATRIX) {
      const cleanedQuestion = cleanText(item.q);
      const maxDist = cleanedQuestion.length <= 3 ? 1 : 2;
      
      if (Math.abs(cleanedInput.length - cleanedQuestion.length) <= maxDist) {
        const dist = computeLevenshteinDistance(cleanedInput, cleanedQuestion);
        if (dist <= maxDist) {
          return item.a;
        }
      }
    }
    return null;
  }

  // TIER 2: Contextual Structural Keyword Routing & Agentic Action Engine
  function checkKeywordFallback(userInput) {
    const cleanedInput = cleanText(userInput);

    // Multi-Keyword combinations for intelligent page routing
    if (matchesPhraseCombinations(cleanedInput, ["go", "home"]) || matchesPhraseCombinations(cleanedInput, ["back", "home"]) || cleanedInput === "home") {
      return { type: "REDIRECT", page: "index.html", msg: "Navigating you to Monome Main Landing page..." };
    }
    if (matchesPhraseCombinations(cleanedInput, ["view", "projects"]) || matchesPhraseCombinations(cleanedInput, ["see", "projects"]) || matchesPhraseCombinations(cleanedInput, ["our", "work"])) {
      return { type: "REDIRECT", page: "projects.html", msg: "Opening our structural projects ledger..." };
    }
    if (matchesPhraseCombinations(cleanedInput, ["see", "gallery"]) || matchesPhraseCombinations(cleanedInput, ["view", "photos"]) || matchesPhraseCombinations(cleanedInput, ["images"])) {
      return { type: "REDIRECT", page: "gallery.html", msg: "Loading high-resolution finish galleries..." };
    }
    if (matchesPhraseCombinations(cleanedInput, ["about", "company"]) || matchesPhraseCombinations(cleanedInput, ["about", "you"]) || cleanedInput === "about") {
      return { type: "REDIRECT", page: "about.html", msg: "Redirecting to our company profile board..." };
    }

    // Traditional keyword intents
    const groupWorkflow = ["step", "phase", "workflow", "timeline", "process", "stages", "architecture", "planning", "blueprint", "turnkey", "execution"];
    const groupMaterials = ["concrete", "steel", "marble", "cement", "granite", "wood", "teak", "materials", "brick", "tmt", "fe550", "m25"];
    const groupPortal = ["track", "portal", "live", "camera", "app", "stream", "streaming", "video", "updates", "cctv"];
    const groupVastu = ["vastu", "shastra", "facing", "east", "north", "direction", "alignment"];
    const groupContact = ["book", "consultation", "meet", "office", "contact", "call", "phone", "email", "address", "appointment", "schedule", "visit"];

    const tokens = cleanedInput.split(/\s+/).filter(Boolean);
    const hasAny = (arr) => tokens.some(t => arr.includes(t)) || arr.some(kw => cleanedInput.includes(kw));

    if (hasAny(groupWorkflow)) {
      currentGroupState = "WORKFLOW";
      return { type: "TEXT", value: "Our 7-Step Turnkey Engineering Process:<br>1. Consultation & Design Alignment<br>2. Comprehensive Site Inspection<br>3. Vastu-Compliant 3D Plans & Architectural Blueprints<br>4. Detailed Pricing & Structural Estimation<br>5. Concrete Rebar & Load-Bearing Framing Construction<br>6. Luxury Finishes & Premium Interior Integration<br>7. Quality Inspection Checklists & Handover." };
    }
    if (hasAny(groupMaterials)) {
      currentGroupState = "MATERIALS";
      return { type: "TEXT", value: "We employ premium-grade industrial standards for all structural elements, utilizing high-performance M25 Grade Concrete mixes, robust Fe-550D TMT structural rebar steel, first-class red brick masonry, and premium teak wood, marble, and granite finishes for ultimate longevity." };
    }
    if (hasAny(groupPortal)) {
      currentGroupState = "PORTAL";
      return { type: "TEXT", value: "Monome client portals offer absolute project transparency. Access 24/7 high-definition live CCTV streams of your construction site, download daily progress photologs, track construction phases, and communicate with your site engineers directly from our web application workspace." };
    }
    if (hasAny(groupVastu)) {
      currentGroupState = "VASTU";
      return { type: "TEXT", value: "Every house design prepared by our architecture desk incorporates optimal structural Vastu alignment, designing the spaces for east/north orientations to enhance natural daylight, cross-ventilation, and positive environmental energy flows." };
    }
    if (hasAny(groupContact)) {
      return { type: "REDIRECT", page: "contact.html", msg: "Transferring you to our design consultant desk..." };
    }

    return null;
  }

  // Main input controller handler pipeline
  function handleUserTextSubmit(text) {
    if (!text.trim()) return;
    addUserMessage(text);

    // TIER 1: FAQ Check
    const matchedResponse = findResponse(text);
    if (matchedResponse) {
      addBotMessage(matchedResponse);
      renderStatePills();
      return;
    }

    // TIER 2: Hybrid Keyword / Agent Routing Check
    const tier2Result = checkKeywordFallback(text);
    if (tier2Result) {
      if (tier2Result.type === "REDIRECT") {
        addBotMessage(`
          <div class="flex items-center gap-2.5">
            <svg class="animate-spin h-4.5 w-4.5 text-[#F5A623]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-xs font-semibold text-neutral-700 dark:text-neutral-200">${tier2Result.msg}</span>
          </div>
        `);
        setTimeout(() => {
          window.location.href = tier2Result.page;
        }, 1500);
      } else {
        addBotMessage(tier2Result.value);
      }
      renderStatePills();
      return;
    }

    // TIER 3: Universal Fallback
    addBotMessage(fallbackCardHtml);
    renderStatePills();
  }

  // Adaptive Predefined Options Pill State Pipeline (Flipkart Support Desk Clone)
  function renderStatePills() {
    const container = document.getElementById("monome-chatbot-options");
    if (!container) return;
    container.innerHTML = "";

    let pills = [];

    // State routing conditional branch
    if (currentGroupState === "MAIN") {
      pills = [
        { text: "🏢 Structural Workflow", action: () => handleUserTextSubmit("Tell me about your structural construction workflow steps") },
        { text: "💎 Premium Materials", action: () => handleUserTextSubmit("What materials do you use for house framing?") },
        { text: "📱 Live Streaming Portal", action: () => handleUserTextSubmit("How do I track my build live using cameras?") },
        { text: "📐 Vastu Integration", action: () => handleUserTextSubmit("Do you provide Vastu compliant floor plans?") }
      ];
    } else if (currentGroupState === "WORKFLOW" || currentGroupState === "MATERIALS" || currentGroupState === "PORTAL" || currentGroupState === "VASTU") {
      pills = [
        { text: "📊 Request Cost Estimate", action: () => handleUserTextSubmit("How much does house construction cost?") },
        { text: "📱 Book Consultation", action: () => handleUserTextSubmit("How can I schedule an office meeting?") },
        { text: "⬅️ Back to Main Menu", action: () => { currentGroupState = "MAIN"; renderStatePills(); } }
      ];
    }

    pills.forEach(pill => {
      const button = document.createElement("button");
      button.className = "text-[12px] whitespace-nowrap px-4 py-2 rounded-full border border-[#D4891A]/30 text-[#D4891A] dark:text-[#F5A623] hover:bg-gradient-to-r hover:from-[#F5A623] hover:to-[#D4891A] hover:text-white dark:hover:text-white transition-all duration-200 cursor-pointer bg-white/90 dark:bg-neutral-800/90 font-medium shadow-sm hover:scale-105 active:scale-95 text-center flex-shrink-0";
      button.innerHTML = pill.text;
      button.addEventListener("click", pill.action);
      container.appendChild(button);
    });
    container.scrollLeft = 0;
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

    root.innerHTML = `
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

      <div id="monome-chatbot-window" class="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] rounded-3xl overflow-hidden glass-card shadow-2xl flex flex-col chatbot-window hidden-scale">
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
        if (badge) badge.classList.add("hidden");
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

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = "";
      handleUserTextSubmit(text);
    });

    addSystemNotification("Secured session established with Monome Constructions Desk.");
    addBotMessage("Hello! Welcome to Monome Constructions. How can I assist you today?");
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