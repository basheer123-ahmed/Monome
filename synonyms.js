// Synonym Dictionaries for Construction Concepts
import { intents } from './knowledgeBase.js';

export const synonymGroups = {
  cost: ["cost", "price", "pricing", "charges", "expense", "investment", "money", "amount", "tariff", "fee", "rate", "valuation", "billing", "bill", "expenditure"],
  quotation: ["quotation", "quote", "detailed quotation", "estimate", "estimating", "estimated"],
  build: ["build", "building", "builder", "built", "construct", "construction", "constructing", "constructed", "erect", "erection", "erecting", "make", "making", "create", "creating", "creation", "develop", "development", "developing", "developer"],
  house: ["house", "home", "residence", "residential", "property", "dwelling"],
  villa: ["villa", "bungalow", "mansion", "custom villa"],
  duplex: ["duplex", "double floor", "two floor", "g+1", "g+2", "multi-floor"],
  apartment: ["apartment", "apartments", "flat", "flats", "multistory"],
  commercial: ["commercial", "office", "shop", "retail", "showroom", "warehouse", "mall", "complex", "industrial", "office space", "commercial space"],
  renovation: ["renovation", "renovate", "remodel", "retrofitting", "restoration"],
  architecture: ["architecture", "architect", "floor plan", "floorplan", "blueprint", "3d rendering", "house plan", "layout"],
  timeline: ["timeline", "duration", "time", "timeframe", "period", "days", "months", "schedule", "span", "timings"],
  workflow: ["workflow", "process", "step", "phase", "stage", "method", "procedure", "execution", "planning", "sequence", "roadmap"],
  project: ["project", "work", "task", "job", "assignment", "site", "site visit", "supervision", "tracking", "portal", "camera", "live", "cctv", "stream"],
  material: ["material", "materials", "brand", "brands", "specifications", "spec", "specs", "raw material", "raw materials"],
  cement: ["cement", "acc", "ultratech", "birla", "opc", "ppc", "bag", "bags"],
  concrete: ["concrete", "m20", "m25", "mix", "slabs", "slab", "foundation", "foundations", "rcc", "casting", "curing"],
  steel: ["steel", "tmt", "rebar", "rebars", "iron", "rod", "rods", "jsw", "tata", "tiscon", "fe550", "fe550d"],
  bricks: ["brick", "bricks", "clay", "clay brick", "red brick", "masonry", "wall", "walls"],
  blocks: ["block", "blocks", "aac", "solid blocks", "lightweight blocks", "concrete blocks"],
  sand: ["sand", "msand", "psand", "m-sand", "p-sand", "river sand", "plastering sand"],
  aggregate: ["aggregate", "aggregates", "jelly", "metal", "stone", "stones", "gravel", "blue metal"],
  roofing: ["roofing", "roof", "roofs", "ceiling", "sloped roof", "shingle", "shingles", "tiles roof"],
  waterproofing: ["waterproofing", "waterproof", "leak", "leakage", "damp", "dampness", "seepage", "dr fixit", "fosroc", "coating"],
  painting: ["paint", "painting", "paints", "asian paints", "royale", "apex", "emulsion", "distemper", "putty", "coat", "coats"],
  flooring: ["flooring", "floor", "floors", "laminate", "italian marble", "polishing"],
  false_ceiling: ["false ceiling", "pop", "gypsum", "Saint-Gobain", "ceiling design", "cove", "cove light"],
  electrical: ["electrical", "wiring", "switch", "switches", "wire", "wires", "conduit", "conduits", "legrand", "anchor", "schneider", "electricity", "cable", "cables"],
  plumbing: ["plumbing", "pipes", "pipe", "fittings", "sanitary", "jaguar", "kohler", "ashirvad", "astral", "tap", "taps", "fixtures"],
  hvac: ["hvac", "ac", "air conditioning", "cooling", "ventilation", "split ac", "cassette ac", "aircon"],
  kitchen: ["kitchen", "modular kitchen", "cabinets", "countertop", "chimney", "pantry", "bwp", "marine plywood"],
  wardrobes: ["wardrobe", "wardrobes", "cupboard", "cupboards", "closet", "walk-in closet", "bwr"],
  landscape: ["landscape", "landscaping", "garden", "lawn", "grass", "plant", "plants", "vertical garden", "terrace garden"],
  compound_walls: ["compound wall", "boundary wall", "fence", "compound", "walls", "gate", "gates"],
  parking: ["parking", "garage", "carport", "driveway", "paver", "pavers", "ev charging", "electric vehicle"],
  lift: ["lift", "elevator", "lifts", "elevators", "otis", "kone", "schindler", "shaft"],
  swimming_pool: ["pool", "swimming pool", "swimming", "jacuzzi", "filtration", "mosaic"],
  smart_home: ["smart home", "automation", "smart lock", "alexa", "google home", "automated", "cctv", "security"],
  solar: ["solar", "panels", "solar panels", "solar system", "photovoltaic", "heating"],
  rainwater_harvesting: ["rainwater", "rainwater harvesting", "rwh", "filtration", "recharge well", "groundwater"],
  green_buildings: ["green building", "green buildings", "eco-friendly", "sustainable", "energy-saving", "carbon footprint"],
  vastu: ["vastu", "vasthu", "shastra", "alignment", "direction", "orientation", "east facing", "north facing"],
  approvals: ["approval", "approvals", "permission", "permissions", "permit", "permits", "sanction", "bbmp", "bda", "municipal", "legal", "noc", "documents", "paperwork"],
  loans: ["loan", "loans", "bank loan", "home loan", "finance", "financing", "sbi", "hdfc", "icici"],
  emi: ["emi", "emi calculator", "interest rate", "installment", "installments", "tenure"],
  warranty: ["warranty", "warranties", "guarantee", "guarantees", "structural warranty", "aftercare"],
  maintenance: ["maintenance", "repairs", "aftercare", "post-handover", "leakage checks"],
  safety: ["safety", "safety rules", "helmet", "harness", "protection", "hazard", "harnesses", "accidents", "safety nets", "safety harnesses"],
  quality_assurance: ["quality assurance", "quality checks", "quality control", "qa", "qc", "audit", "checklists"],
  consultation: ["consultation", "consult", "book consultation", "meeting", "appointment", "schedule"],
  contact: ["contact", "call", "phone", "email", "whatsapp", "number", "reach", "social"],
  hours: ["working hours", "office hours", "timings", "schedule", "open", "timing"],
  location: ["location", "office", "address", "Banashankari", "Bengaluru", "Bangalore", "where", "located"],
  careers: ["careers", "career", "job", "hiring", "join", "resume", "employment", "recruitment"],
  general_faq: ["general faq", "faqs", "question", "questions", "standard", "general"]
};

// Compile flat vocabulary list of all synonyms, custom spelling words, and standard terms
const vocabularySet = new Set();
for (const key in synonymGroups) {
  vocabularySet.add(key);
  synonymGroups[key].forEach(word => {
    vocabularySet.add(word);
    if (word.includes(" ")) {
      word.split(" ").forEach(w => vocabularySet.add(w));
    }
  });
}

// Add common construction terms explicitly, including conversational terms to protect from spelling corrections
const basicTerms = [
  "greetings", "hello", "hi", "hey", "about", "monome", "constructions", "residential", "commercial", "institutional", 
  "independent", "houses", "apartments", "renovation", "interior", "exterior", "architecture", "site", "timeline",
  "project", "cost", "pricing", "budget", "quotation", "payment", "cement", "concrete", "steel", "bricks", 
  "blocks", "sand", "aggregate", "roofing", "waterproofing", "painting", "flooring", "electrical", "plumbing", 
  "hvac", "kitchen", "wardrobes", "landscape", "compound", "parking", "lift", "pool", "smart", "solar", 
  "rainwater", "green", "vastu", "government", "loans", "emi", "warranty", "safety", "quality", "consultation", 
  "contact", "hours", "location", "careers", "faq", "g+1", "g+2", "bhk", "prime", "query", "queries", "optimization", "estimation",
  
  // Protected conversational words & stop words to prevent wrong spelling corrections
  "good", "morning", "afternoon", "evening", "who", "are", "you", "address", "phone", "number", "email", 
  "hiring", "jobs", "work", "timings", "hours", "how", "what", "where", "why", "when", "which", "there", 
  "here", "it", "they", "them", "us", "he", "she", "we", "i", "take", "long", "does",
  "thanks", "thank you", "appreciate", "grateful", "glad", "awesome", "perfect", "identity", "bot", "name", 
  "assistant", "welcome", "bye", "goodbye", "open", "schedule", "call", "whatsapp",
  "careers", "job", "join", "team", "resume", "employment", "recruitment", "process", "workflow", "duration", 
  "time", "payment", "milestone", "safety", "quality", "meeting", "design", "plan", "layout",
  "step", "steps", "process", "phases", "stages", "timeline", "cost", "quote", "pricing", "budget", "estimation",
  "stop", "close", "exit", "bye", "goodbye", "farewell",
  
  // Missing stop words
  "the", "can", "could", "would", "should", "please", "kindly", "tell", "me", "of", "for", "in", "on", "at", 
  "to", "a", "an", "do", "did", "has", "have", "had", "and", "or", "but", "with", "from", "by", "as", 
  "be", "been", "being", "so", "then", "much", "many", "your", "our",
  
  // Additional protected test words
  "living", "room", "send", "free", "modern", "detail", "details", "fees", "fee", "option", "options", 
  "remodel", "help", "track", "testing", "test", "checklist", "checklists", "inspection"
];
basicTerms.forEach(t => vocabularySet.add(t.toLowerCase()));

// Add all intent keywords and synonyms to vocabularySet to protect them
intents.forEach(intent => {
  const allKeywords = [
    ...(intent.keywords.primary || []),
    ...(intent.keywords.secondary || []),
    ...(intent.keywords.support || []),
    ...(intent.synonyms || [])
  ];
  allKeywords.forEach(kw => {
    vocabularySet.add(kw.toLowerCase());
    if (kw.includes(" ") || kw.includes("-")) {
      kw.replace(/-/g, " ").split(" ").forEach(w => vocabularySet.add(w.toLowerCase()));
    }
  });
});

export const globalVocabulary = Array.from(vocabularySet);

// Build synonym lookup map for O(1) performance
const synonymMap = {};
for (const canonicalKey in synonymGroups) {
  synonymGroups[canonicalKey].forEach(synonym => {
    synonymMap[synonym.toLowerCase()] = canonicalKey;
  });
  synonymMap[canonicalKey] = canonicalKey;
}

export function getCanonicalConcept(word) {
  const normalizedWord = word.toLowerCase().replace(/_/g, " ");
  return synonymMap[normalizedWord] || word;
}
