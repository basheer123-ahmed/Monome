// Text Normalization, Tokenization, and Stemming (Independent Module)
import { intents } from './knowledgeBase.js';
import { synonymGroups } from './synonyms.js';

export const ABBREVIATIONS = {
  "sqft": "square feet",
  "sq ft": "square feet",
  "approx": "approximate",
  "g+1": "ground plus one",
  "g+2": "ground plus two",
  "bhk": "bedroom hall kitchen",
  "emi": "equated monthly installment"
};

export const PHRASES = {
  // Conversational Phrases
  "who are you": "who_are_you",
  "what is your name": "what_is_your_name",
  "how are you": "how_are_you",
  "thank you": "thank_you",
  "see you": "see_you",
  "good morning": "good_morning",
  "good afternoon": "good_afternoon",
  "good evening": "good_evening",
  "how long": "how_long",
  "how much": "how_much",
  "office address": "office_address",
  "phone number": "phone_number",
  "whatsapp details": "whatsapp_details",
  "are you hiring": "are_you_hiring",
  "careers at": "careers_at",
  "join your": "join_your",
  "work at": "work_at",
  "what is monome": "what_is_monome",
  
  // Construction Concepts
  "ground plus one": "ground_plus_one",
  "ground plus two": "ground_plus_two",
  "detailed quotation": "detailed_quotation",
  "italian marble": "italian_marble",
  "cost per square foot": "cost_per_square_foot",
  "reinforced cement concrete": "reinforced_cement_concrete",
  "load bearing wall": "load_bearing_wall",
  "false ceiling": "false_ceiling",
  "turnkey construction": "turnkey_construction",
  "ready to move": "ready_to_move",
  "modular kitchen": "modular_kitchen",
  "site inspection": "site_inspection",
  "structural design": "structural_design",
  "construction loan": "construction_loan",
  "building approval": "building_approval",
  "occupancy certificate": "occupancy_certificate",
  "waterproof coating": "waterproof_coating",
  "construction estimate": "construction_estimate",
  "quality assurance": "quality_assurance",
  "rain water harvesting": "rainwater_harvesting",
  "rainwater harvesting": "rainwater_harvesting",
  "smart home": "smart_home",
  "solar panels": "solar_panels",
  "floor area ratio": "floor_area_ratio",
  "building elevation": "building_elevation",
  "project handover": "project_handover"
};

// Dynamically register all multi-word keywords, synonyms, and misspellings as phrases
intents.forEach(intent => {
  const allKeywords = [
    ...(intent.keywords.primary || []),
    ...(intent.keywords.secondary || []),
    ...(intent.keywords.support || []),
    ...(intent.synonyms || []),
    ...(intent.common_misspellings || [])
  ];
  allKeywords.forEach(kw => {
    if (kw.includes(" ") || kw.includes("-")) {
      const normalizedPhrase = kw.toLowerCase().replace(/-/g, " ").trim();
      const underscored = normalizedPhrase.replace(/\s+/g, "_");
      if (!PHRASES[normalizedPhrase]) {
        PHRASES[normalizedPhrase] = underscored;
      }
    }
  });
});

for (const group in synonymGroups) {
  synonymGroups[group].forEach(syn => {
    if (syn.includes(" ") || syn.includes("-")) {
      const normalizedPhrase = syn.toLowerCase().replace(/-/g, " ").trim();
      const underscored = normalizedPhrase.replace(/\s+/g, "_");
      if (!PHRASES[normalizedPhrase]) {
        PHRASES[normalizedPhrase] = underscored;
      }
    }
  });
}

// Full Stop Words list to filter out common English structural noise
export const STOP_WORDS = new Set([
  "the", "is", "are", "can", "could", "would", "should", "please", 
  "kindly", "tell", "me", "of", "for", "in", "on", "at", "to", "a", "an", 
  "do", "does", "did", "has", "have", "had", "and", "or", "but", "with", 
  "from", "by", "as", "be", "been", "being", "so", "then", "who", "you", 
  "about", "where", "how", "what", "long", "much", "many", "when", "why", 
  "which", "there", "here", "it", "they", "them", "us", "he", "she", "we", "i", "your", "our"
]);

export function stemWord(word) {
  let w = word.toLowerCase();
  
  // Custom conversational/common protections
  if (w === "opening" || w === "openings") return "opening";
  
  // Custom construction domain stemmer rules (takes priority)
  if (w.endsWith("construction") || w.endsWith("constructing") || w.endsWith("constructed")) return "construct";
  if (w.endsWith("buildings") || w.endsWith("building") || w.endsWith("builder") || w.endsWith("builders") || w.endsWith("built")) return "build";
  if (w.endsWith("estimates") || w.endsWith("estimating") || w.endsWith("estimated") || w.endsWith("estimator") || w.endsWith("estimation") || w.endsWith("estimations")) return "estimate";
  if (w.endsWith("designs") || w.endsWith("designing") || w.endsWith("designer") || w.endsWith("designers") || w.endsWith("designed")) return "design";
  if (w.endsWith("renovates") || w.endsWith("renovating") || w.endsWith("renovated") || w.endsWith("renovation") || w.endsWith("renovations")) return "renovate";
  if (w.endsWith("materials") || w.endsWith("material")) return "material";
  if (w.endsWith("approvals") || w.endsWith("approving") || w.endsWith("approved") || w.endsWith("approval")) return "approval";
  if (w.endsWith("permissions") || w.endsWith("permitting") || w.endsWith("permitted") || w.endsWith("permission")) return "permission";
  if (w.endsWith("inspections") || w.endsWith("inspecting") || w.endsWith("inspected") || w.endsWith("inspector")) return "inspect";
  if (w.endsWith("consultations") || w.endsWith("consulting") || w.endsWith("consulted") || w.endsWith("consultant")) return "consult";
  if (w.endsWith("timelines") || w.endsWith("timeline")) return "timeline";
  if (w.endsWith("workflows") || w.endsWith("workflow")) return "workflow";
  if (w.endsWith("trackings") || w.endsWith("tracking") || w.endsWith("tracked") || w.endsWith("tracker")) return "track";
  if (w.endsWith("costs") || w.endsWith("costing") || w.endsWith("costed")) return "cost";
  if (w.endsWith("prices") || w.endsWith("pricing") || w.endsWith("priced")) return "price";
  if (w.endsWith("budgets") || w.endsWith("budgeting") || w.endsWith("budgeted")) return "budget";
  if (w.endsWith("optimizations") || w.endsWith("optimization") || w.endsWith("optimizing") || w.endsWith("optimized") || w.endsWith("optimizes")) return "optimize";
  if (w.endsWith("quotations") || w.endsWith("quoting") || w.endsWith("quoted") || w.endsWith("quote")) return "quote";
  if (w.endsWith("payments") || w.endsWith("paying") || w.endsWith("paid") || w.endsWith("payment")) return "payment";
  if (w.endsWith("structured") || w.endsWith("structuring") || w.endsWith("structures") || w.endsWith("structural") || w.endsWith("structure")) return "structure";
  if (w.endsWith("engineerings") || w.endsWith("engineering") || w.endsWith("engineered") || w.endsWith("engineers") || w.endsWith("engineer")) return "engineer";
  if (w.endsWith("paints") || w.endsWith("painting") || w.endsWith("painted")) return "paint";
  if (w.endsWith("plumbing") || w.endsWith("plumber") || w.endsWith("plumbers") || w.endsWith("plumbed")) return "plumb";
  
  // Plural/singular rules
  if (w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (w.endsWith("ses") || w.endsWith("xes") || w.endsWith("zes")) return w.slice(0, -2);
  
  // Don't stem standard words ending in 's' like 'plus'
  if (w.endsWith("s") && !w.endsWith("ss") && !w.endsWith("us") && !w.endsWith("is") && !w.endsWith("as") && w !== "plus") {
    return w.slice(0, -1);
  }
  
  // Advanced double consonant normalization for verbal endings
  if (w.endsWith("ing")) {
    let base = w.slice(0, -3);
    if (base.length > 2 && base.charAt(base.length - 1) === base.charAt(base.length - 2)) {
      base = base.slice(0, -1);
    }
    return base;
  }
  if (w.endsWith("ed") && !w.endsWith("eed")) {
    let base = w.slice(0, -2);
    if (base.length > 2 && base.charAt(base.length - 1) === base.charAt(base.length - 2)) {
      base = base.slice(0, -1);
    }
    return base;
  }
  
  return w;
}

export function normalizeAndTokenize(text) {
  if (!text) return [];

  // 1. Lowercase conversion
  let cleaned = text.toLowerCase();

  // 2. Punctuation removal (replace with space to keep words separated, excluding underscore)
  cleaned = cleaned.replace(/[.,\/#!$%\^&\*;:{}=\-`~()?"']/g, " ");

  // 3. Abbreviation expansion
  for (const abbr in ABBREVIATIONS) {
    const regex = new RegExp(`\\b${abbr.replace("+", "\\+")}\\b`, "g");
    cleaned = cleaned.replace(regex, ABBREVIATIONS[abbr]);
  }

  // 4. Phrase detection (replaces spaces with underscores)
  for (const phrase in PHRASES) {
    const regex = new RegExp(`\\b${phrase}\\b`, "g");
    cleaned = cleaned.replace(regex, PHRASES[phrase]);
  }

  // 5. Duplicate whitespace removal & trim
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  // 6. Tokenization
  return cleaned.split(" ").filter(Boolean);
}
