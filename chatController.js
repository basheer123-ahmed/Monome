// Chat Orchestrator and Controller (Integrated Pipeline)

import { processQueryToTokens } from './matcher.js';
import { ContextMemory } from './contextMemory.js';
import { intents } from './knowledgeBase.js';
import { rankIntents } from './rankingEngine.js';

export class ChatController {
  constructor() {
    this.contextMemory = new ContextMemory();
    this.fallbackCount = 0;
  }

  processMessage(text) {
    const rawQuery = text.trim();
    if (!rawQuery) return null;

    // Check for direct navigation or redirect keywords first
    const redirectResult = this.checkDirectRedirects(rawQuery);
    if (redirectResult) {
      this.fallbackCount = 0; // Reset fallback counter on success
      return redirectResult;
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

      if (this.fallbackCount >= 3) {
        this.fallbackCount = 0; // Reset counter after triggering
        const fallbackCardHtml = `
          <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 shadow-sm space-y-3 mt-1">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                </svg>
              </div>
              <h4 class="font-inter font-bold text-sm text-neutral-800 dark:text-white">Engineering Office</h4>
            </div>
            <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              We'd love to assist with your project in detail. Please connect with our engineering team for personalized guidance.
            </p>
            <div class="pt-1">
              <button class="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#D4891A] text-white text-[12px] font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center border-none cursor-pointer" onclick="window.location.href='contact.html'">
                Go To Contact Page &rarr;
              </button>
            </div>
          </div>
        `;
        return {
          type: "TEXT",
          intentId: "fallback_limit",
          value: fallbackCardHtml,
          suggestions: ["📞 Contact Us", "🏢 Main Menu"]
        };
      }

      // Single fallback prompt (respond politely)
      return {
        type: "TEXT",
        intentId: "fallback",
        value: "I'm not sure I understand that construction query. Could you please rephrase, or ask about our home construction packages, materials, timelines, or Vastu layouts?",
        suggestions: ["🏢 Construction Process", "📊 Cost Estimate", "📐 Vastu Design", "📞 Contact Info"]
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
