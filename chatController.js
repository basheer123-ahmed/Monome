// Chat Orchestrator and Controller (Integrated Pipeline)

import { processQueryToTokens } from './matcher.js';
import { ContextMemory } from './contextMemory.js';
import { intents } from './knowledgeBase.js';
import { rankIntents } from './rankingEngine.js';

export class ChatController {
  constructor() {
    this.contextMemory = new ContextMemory();
    this.fallbackCount = 0;
    this.lastQueryWasEngineering = false;
  }

  isHighlySpecificQuery(query) {
    const lower = query.toLowerCase().trim();
    const specificPatterns = [
      // Beam design calculations
      "beam design", "beam calculation", "beam load", "cantilever beam", "bending moment", "shear force",
      // Column reinforcement details
      "column reinforcement", "column design", "rebar design", "reinforcement detail", "stirrups spacing", "bar bending schedule",
      // Structural load calculations
      "structural load calculation", "dead load calculation", "live load calculation", "wind load calculation", "seismic load calculation", "load calculation", "retaining wall calculation",
      // Custom quotations
      "custom quotation", "custom quote", "individual quote", "detailed quote", "price estimate for custom", "personalized quotation", "personalized quote",
      // Government approval procedures
      "government approval", "approval procedure", "building permit procedure", "plan sanction procedure", "bbmp sanction procedure", "deviation approval procedure", "rera registration procedure",
      // Site-specific engineering advice
      "site-specific engineering", "foundation recommendation", "civil engineer advice",
      // Custom architectural design recommendations
      "custom architectural design", "custom layout recommendation",
      // Soil investigation reports
      "soil investigation report", "soil test report", "geotechnical report", "standard penetration test",
      // Unique project situations
      "unusual site", "steep slope", "waterlogged soil", "clay soil construction", "seismic zone construction", "pile foundation construction", "rocky ground construction"
    ];
    return specificPatterns.some(pattern => lower.includes(pattern));
  }

  isEngineeringQuery(query) {
    const lower = query.toLowerCase();
    const engineeringKeywords = [
      "beam", "column", "load", "reinforcement", "rebar", "structural", "calculation",
      "soil", "foundation", "architectural", "blueprint", "drawing", "permit", "approval",
      "sanction", "quotation", "quote", "engineer", "architect", "vastu", "site"
    ];
    return engineeringKeywords.some(kw => lower.includes(kw));
  }

  generateSupportCardHtml(isRepeatedEngineering = false) {
    let cleanNumber = "919620974224"; // Fallback to existing MONOME number
    if (typeof document !== 'undefined') {
      const whatsappLauncher = document.getElementById("monome-whatsapp-launcher");
      if (whatsappLauncher) {
        const whatsappUrl = whatsappLauncher.getAttribute("href") || "";
        const match = whatsappUrl.match(/wa\.me\/([0-9]+)/);
        if (match && match[1]) {
          cleanNumber = match[1];
        }
      }
    }

    const telUrl = `tel:+${cleanNumber}`;
    const prefilledText = encodeURIComponent("Hello MONOME Team, I have a custom construction enquiry that your chatbot couldn't answer. I would like to speak with your team.");
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${prefilledText}`;

    const messageText = isRepeatedEngineering 
      ? "It looks like you're asking about a specialized engineering topic. Our engineers can provide accurate project-specific guidance. Please connect with our team using one of the options below."
      : "I understand your question. It requires project-specific guidance from one of our construction experts. Our team will be happy to assist you. Please choose any option below to connect with us.";

    return `
      <div class="support-card-wrapper">
        <div class="support-card p-4 rounded-2xl bg-[#FAF8F3]/90 dark:bg-[#1a1d23]/90 border border-[#D4891A]/30 dark:border-[#F5A623]/30 shadow-md space-y-3.5 mt-1 transition-all duration-300">
          <div class="flex items-center justify-center">
            <div class="w-10 h-10 rounded-full bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3-3h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <p class="text-xs text-neutral-700 dark:text-neutral-300 text-center leading-relaxed font-semibold px-1">
            ${messageText}
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <!-- Call Now -->
            <a href="${telUrl}" class="flex sm:flex-col items-center gap-3 sm:gap-1.5 p-3 sm:p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-[#D4891A]/50 dark:hover:border-[#F5A623]/50 hover:scale-[1.02] active:scale-[0.98] transition-all group shadow-sm cursor-pointer no-underline">
              <span class="text-xl sm:mb-0.5 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">📞</span>
              <div class="text-left sm:text-center">
                <span class="font-bold text-[11px] text-neutral-800 dark:text-white group-hover:text-[#D4891A] dark:group-hover:text-[#F5A623] transition-colors block">Call Now</span>
                <span class="text-[8px] text-neutral-500 dark:text-neutral-400 leading-tight block mt-0.5 font-medium">Talk directly with our engineers</span>
              </div>
            </a>
            <!-- WhatsApp -->
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="flex sm:flex-col items-center gap-3 sm:gap-1.5 p-3 sm:p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-[#D4891A]/50 dark:hover:border-[#F5A623]/50 hover:scale-[1.02] active:scale-[0.98] transition-all group shadow-sm cursor-pointer no-underline">
              <span class="text-xl sm:mb-0.5 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">💬</span>
              <div class="text-left sm:text-center">
                <span class="font-bold text-[11px] text-neutral-800 dark:text-white group-hover:text-[#D4891A] dark:group-hover:text-[#F5A623] transition-colors block">WhatsApp</span>
                <span class="text-[8px] text-neutral-500 dark:text-neutral-400 leading-tight block mt-0.5 font-medium">Quick response from our team</span>
              </div>
            </a>
            <!-- Contact Us -->
            <a href="contact.html" class="flex sm:flex-col items-center gap-3 sm:gap-1.5 p-3 sm:p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-[#D4891A]/50 dark:hover:border-[#F5A623]/50 hover:scale-[1.02] active:scale-[0.98] transition-all group shadow-sm cursor-pointer no-underline">
              <span class="text-xl sm:mb-0.5 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">📩</span>
              <div class="text-left sm:text-center">
                <span class="font-bold text-[11px] text-neutral-800 dark:text-white group-hover:text-[#D4891A] dark:group-hover:text-[#F5A623] transition-colors block">Contact Us</span>
                <span class="text-[8px] text-neutral-500 dark:text-neutral-400 leading-tight block mt-0.5 font-medium">Submit your enquiry online</span>
              </div>
            </a>
            <!-- Continue Chatting -->
            <button data-action="dismiss-card" class="flex sm:flex-col items-center gap-3 sm:gap-1.5 p-3 sm:p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-[#D4891A]/50 dark:hover:border-[#F5A623]/50 hover:scale-[1.02] active:scale-[0.98] transition-all group shadow-sm cursor-pointer text-center border-none w-full outline-none">
              <span class="text-xl sm:mb-0.5 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">↩</span>
              <div class="text-left sm:text-center">
                <span class="font-bold text-[11px] text-neutral-800 dark:text-white group-hover:text-[#D4891A] dark:group-hover:text-[#F5A623] transition-colors block">Continue Chatting</span>
                <span class="text-[8px] text-neutral-500 dark:text-neutral-400 leading-tight block mt-0.5 font-medium">Ask another construction question</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  processMessage(text) {
    const rawQuery = text.trim();
    if (!rawQuery) return null;

    // Check for direct navigation or redirect keywords first
    const redirectResult = this.checkDirectRedirects(rawQuery);
    if (redirectResult) {
      this.fallbackCount = 0; // Reset fallback counter on success
      this.lastQueryWasEngineering = false;
      return redirectResult;
    }

    const isSpecific = this.isHighlySpecificQuery(rawQuery);
    const isEngineering = isSpecific || this.isEngineeringQuery(rawQuery);

    if (isSpecific) {
      this.fallbackCount++;
      const isRepeatedEngineering = isEngineering && this.lastQueryWasEngineering;
      this.lastQueryWasEngineering = isEngineering;

      return {
        type: "TEXT",
        intentId: "specific_engineering_fallback",
        value: this.generateSupportCardHtml(isRepeatedEngineering),
        suggestions: ["📞 Contact Info", "🏢 Main Menu"]
      };
    }

    // Level 1-7: Process raw query through normalization, tokenization, spelling correction, stemming, and synonym mapping
    const semanticTokens = processQueryToTokens(rawQuery);

    // Level 10: Resolve pronouns and missing subjects from active context memory
    const resolvedTokens = this.contextMemory.resolveContext(semanticTokens);

    // Level 9: Score and rank all intents above threshold
    const rankedMatches = rankIntents(intents, resolvedTokens, rawQuery, this.contextMemory.context, semanticTokens);

    if (rankedMatches.length > 0) {
      // We found a matching intent! Reset fallback counter.
      this.fallbackCount = 0;
      this.lastQueryWasEngineering = false;

      const bestMatch = rankedMatches[0].intent;

      // Update short-term memory with user query, bot response, matched intent ID and tokens
      this.contextMemory.addExchange(rawQuery, bestMatch.answer, bestMatch.id, resolvedTokens);

      return {
        type: "TEXT",
        intentId: bestMatch.id,
        value: bestMatch.answer,
        suggestions: bestMatch.suggested_followups || []
      };
    } else {
      // Level 13: Fallback handling
      this.fallbackCount++;
      const isRepeatedEngineering = isEngineering && this.lastQueryWasEngineering;
      
      this.lastQueryWasEngineering = isEngineering;

      return {
        type: "TEXT",
        intentId: "fallback",
        value: this.generateSupportCardHtml(isRepeatedEngineering),
        suggestions: ["📞 Contact Info", "🏢 Main Menu"]
      };
    }
  }

  checkDirectRedirects(text) {
    const lower = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "").trim();

    // Direct routing definitions
    const routeHome = ["go home", "back home", "home page", "main page"];
    const routeProjects = ["view projects", "see projects", "our work", "our projects", "portfolio", "projects ledger"];
    const routeGallery = ["see gallery", "view photos", "images", "photos", "gallery", "finishes gallery"];
    const routeAbout = ["about company", "about you", "about", "who is monome", "company profile"];
    const routeContact = ["book consultation", "meet office", "contact", "call us", "phone number", "contact details"];

    if (routeHome.some(phrase => lower.includes(phrase)) || lower === "home") {
      return { type: "REDIRECT", page: "index.html", msg: "Navigating you to Monome Main Landing page...", intentId: "home" };
    }
    if (routeProjects.some(phrase => lower.includes(phrase)) || lower === "projects") {
      return { type: "REDIRECT", page: "projects.html", msg: "Opening our structural projects ledger...", intentId: "projects" };
    }
    if (routeGallery.some(phrase => lower.includes(phrase)) || lower === "gallery") {
      return { type: "REDIRECT", page: "gallery.html", msg: "Loading high-resolution finish galleries...", intentId: "gallery" };
    }
    if (routeAbout.some(phrase => {
      if (phrase === "about") {
        return lower === "about" || lower === "about us";
      }
      return lower.includes(phrase);
    }) && lower.length <= 20) {
      return { type: "REDIRECT", page: "about.html", msg: "Redirecting to our company profile board...", intentId: "about_monome" };
    }
    if (routeContact.some(phrase => lower.includes(phrase))) {
      return { type: "REDIRECT", page: "contact.html", msg: "Transferring you to our design consultant desk...", intentId: "contact_info" };
    }

    return null;
  }
}
