// Chatbot Semantic Intent Recognition - Validation Suite (100+ test cases)

import { ChatController } from './chatController.js';

const testCases = [
  // --- Greetings (1-10) ---
  { query: "hi", expectedIntent: "greetings" },
  { query: "hello there", expectedIntent: "greetings" },
  { query: "hey", expectedIntent: "greetings" },
  { query: "good morning", expectedIntent: "greetings" },
  { query: "good afternoon", expectedIntent: "greetings" },
  { query: "good evening", expectedIntent: "greetings" },
  { query: "hola monome", expectedIntent: "greetings" },
  { query: "yo", expectedIntent: "greetings" },
  { query: "hllo", expectedIntent: "greetings" },
  { query: "hlo", expectedIntent: "greetings" },

  // --- Goodbye & Gratitude (11-20) ---
  { query: "bye", expectedIntent: "goodbye" },
  { query: "goodbye", expectedIntent: "goodbye" },
  { query: "see you later", expectedIntent: "goodbye" },
  { query: "thanks", expectedIntent: "gratitude" },
  { query: "thank you so much", expectedIntent: "gratitude" },
  { query: "ty", expectedIntent: "gratitude" },
  { query: "perfect thanks", expectedIntent: "gratitude" },
  { query: "who are you", expectedIntent: "bot_identity" },
  { query: "what is your name", expectedIntent: "bot_identity" },
  { query: "identity of this bot", expectedIntent: "bot_identity" },

  // --- Company info & Operations (21-30) ---
  { query: "about monome", expectedIntent: "about_monome" },
  { query: "tell me about your company", expectedIntent: "about_monome" },
  { query: "what is monome constructions", expectedIntent: "about_monome" },
  { query: "office address", expectedIntent: "office_location" },
  { query: "where are you located", expectedIntent: "office_location" },
  { query: "office timings", expectedIntent: "working_hours" },
  { query: "are you open on saturday", expectedIntent: "working_hours" },
  { query: "how can i contact you", expectedIntent: "contact_info" },
  { query: "phone number", expectedIntent: "contact_info" },
  { query: "whatsapp details", expectedIntent: "contact_info" },

  // --- Career (31-35) ---
  { query: "careers at monome", expectedIntent: "careers" },
  { query: "are you hiring", expectedIntent: "careers" },
  { query: "job vacancy for engineer", expectedIntent: "careers" },
  { query: "how to send resume", expectedIntent: "careers" },
  { query: "join your team", expectedIntent: "careers" },

  // --- Construction Domains (36-45) ---
  { query: "residential construction packages", expectedIntent: "residential_construction" },
  { query: "build my home", expectedIntent: "residential_construction" },
  { query: "do you construct commercial offices", expectedIntent: "commercial_construction" },
  { query: "warehouse build price", expectedIntent: "commercial_construction" },
  { query: "school campus construction", expectedIntent: "institutional_construction" },
  { query: "build a hospital building", expectedIntent: "institutional_construction" },
  { query: "luxury villa building", expectedIntent: "villa_construction" },
  { query: "cost for villa construction", expectedIntent: "villa_construction" },
  { query: "independent house builders", expectedIntent: "independent_houses" },
  { query: "build on my own plot", expectedIntent: "independent_houses" },

  // --- Housing styles (46-55) ---
  { query: "duplex house building", expectedIntent: "duplex_houses" },
  { query: "g+2 multi-floor home", expectedIntent: "duplex_houses" },
  { query: "apartment block builders", expectedIntent: "apartments" },
  { query: "flat construction company", expectedIntent: "apartments" },
  { query: "what is turnkey construction", expectedIntent: "turnkey_construction" },
  { query: "end to end turnkey packages", expectedIntent: "turnkey_construction" },
  { query: "home renovation services", expectedIntent: "renovation" },
  { query: "remodel my kitchen", expectedIntent: "renovation" },
  { query: "interior design options", expectedIntent: "interior_design" },
  { query: "living room false ceiling", expectedIntent: "interior_design" },

  // --- Architecture & Process (56-65) ---
  { query: "facade design pricing", expectedIntent: "exterior_design" },
  { query: "modern front elevation", expectedIntent: "exterior_design" },
  { query: "house floor plan layout", expectedIntent: "architecture" },
  { query: "3d front rendering map", expectedIntent: "architecture" },
  { query: "structural design stability", expectedIntent: "structural_engineering" },
  { query: "foundation design details", expectedIntent: "structural_engineering" },
  { query: "soil test before building", expectedIntent: "site_inspection" },
  { query: "how long does construction take", expectedIntent: "construction_timeline" },
  { query: "project timeline for G+1", expectedIntent: "construction_timeline" },
  { query: "what is your 7 step process", expectedIntent: "project_workflow" },

  // --- Operational & tracking (66-70) ---
  { query: "construction stages and phases", expectedIntent: "project_workflow" },
  { query: "live streaming cctv camera site", expectedIntent: "project_tracking" },
  { query: "client portal site tracking", expectedIntent: "project_tracking" },
  { query: "how to track my project", expectedIntent: "project_tracking" },
  { query: "general faqs list", expectedIntent: "general_faq" },

  // --- Financial & cost (71-80) ---
  { query: "what is the construction cost", expectedIntent: "construction_cost" },
  { query: "how much will it cost", expectedIntent: "construction_cost" },
  { query: "what is your pricing", expectedIntent: "construction_cost" },
  { query: "how expensive is building a villa", expectedIntent: "construction_cost" },
  { query: "approximate budget for house", expectedIntent: "construction_cost" },
  { query: "how to budget my home construction", expectedIntent: "budget_planning" },
  { query: "cost estimation details", expectedIntent: "quotation" },
  { query: "free pricing quote", expectedIntent: "quotation" },
  { query: "payment milestones timeline", expectedIntent: "payment_process" },
  { query: "is payment linked to stages", expectedIntent: "payment_process" },

  // --- Materials (81-95) ---
  { query: "raw materials specs", expectedIntent: "materials" },
  { query: "brands of cement used", expectedIntent: "cement" },
  { query: "ultratech OPC 53 cement", expectedIntent: "cement" },
  { query: "concrete grade for columns", expectedIntent: "concrete" },
  { query: "M25 concrete mix", expectedIntent: "concrete" },
  { query: "steel grade details", expectedIntent: "steel" },
  { query: "TATA Tiscon Fe-550D rebar", expectedIntent: "steel" },
  { query: "red clay bricks features", expectedIntent: "bricks" },
  { query: "solid concrete blocks", expectedIntent: "blocks" },
  { query: "AAC lightweight block masonry", expectedIntent: "blocks" },
  { query: "M-sand versus river sand", expectedIntent: "sand" },
  { query: "granite blue metal aggregates", expectedIntent: "aggregate" },
  { query: "roof slab design", expectedIntent: "roofing" },
  { query: "how do you do waterproofing", expectedIntent: "waterproofing" },
  { query: "terrace leakage protection", expectedIntent: "waterproofing" },

  // --- Finishes & Utilities (96-110) ---
  { query: "asian paints royale wall paint", expectedIntent: "painting" },
  { query: "vitrified tiles flooring", expectedIntent: "flooring" },
  { query: "italian marble prices", expectedIntent: "marble" },
  { query: "staircase granite stones", expectedIntent: "granite" },
  { query: "teak wood doors wood", expectedIntent: "wood" },
  { query: "gypsum false ceiling light", expectedIntent: "false_ceiling" },
  { query: "legrand wire conduit electrical", expectedIntent: "electrical" },
  { query: "ashirvad pipe bathroom plumbing", expectedIntent: "plumbing" },
  { query: "central AC split HVAC design", expectedIntent: "hvac" },
  { query: "modular kitchen setup details", expectedIntent: "kitchen" },
  { query: "custom cabinets modular kitchen", expectedIntent: "kitchen" },
  { query: "bedroom wardrobes plywood", expectedIntent: "wardrobes" },
  { query: "terrace garden landscaping", expectedIntent: "landscape" },
  { query: "compound wall height blocks", expectedIntent: "compound_walls" },
  { query: "car parking interlocking pavers", expectedIntent: "parking" },

  // --- Extras, Laws & Loans (111-125) ---
  { query: "otis passenger elevator lift", expectedIntent: "lift" },
  { query: "rooftop swimming pool design", expectedIntent: "swimming_pool" },
  { query: "alexa automated smart home locks", expectedIntent: "smart_home" },
  { query: "solar panels net metering PV", expectedIntent: "solar" },
  { query: "rwh recharge well rainwater harvesting", expectedIntent: "rainwater_harvesting" },
  { query: "sustainable green building design", expectedIntent: "green_buildings" },
  { query: "east facing vastu rules entrance", expectedIntent: "vastu" },
  { query: "bbmp plan approval documentation", expectedIntent: "govt_approvals" },
  { query: "building sanction permits legal", expectedIntent: "building_permissions" },
  { query: "sbi construction loans bank", expectedIntent: "loans" },
  { query: "interest rate emi calculation", expectedIntent: "emi" },
  { query: "10 year structural warranty terms", expectedIntent: "warranty" },
  { query: "post-handover maintenance checkups", expectedIntent: "maintenance" },
  { query: "safety nets on construction site", expectedIntent: "safety" },
  { query: "150 point quality checklist audit", expectedIntent: "quality_assurance" },

  // --- Booking & Consultation (126-130) ---
  { query: "book a consult session", expectedIntent: "consultation" },
  { query: "schedule design meeting", expectedIntent: "consultation" },
  { query: "contact monome constructions desk", expectedIntent: "contact_info" },
  { query: "office maps located location", expectedIntent: "office_location" },
  { query: "standard construction queries", expectedIntent: "general_faq" },

  // --- Typos & Spelling Mistakes (131-140) ---
  { query: "constrction package costs", expectedIntent: "construction_cost" },
  { query: "cemnt brands", expectedIntent: "cement" },
  { query: "steeel grade info", expectedIntent: "steel" },
  { query: "rennovation costs", expectedIntent: "renovation" },
  { query: "approx timeline for home", expectedIntent: "construction_timeline" },
  { query: "quatation for G+2 building", expectedIntent: "quotation" },
  { query: "villaa design plan", expectedIntent: "villa_construction" },
  { query: "archtect fees and elevations", expectedIntent: "architecture" },
  { query: "plumbr pipe fittings jaguar", expectedIntent: "plumbing" },
  { query: "budjet optimization options", expectedIntent: "budget_planning" },

  // --- Phrase Detection (141-150) ---
  { query: "what is cost per square foot for a duplex", expectedIntent: "construction_cost" },
  { query: "do you build a load bearing wall", expectedIntent: "structural_engineering" },
  { query: "cost for false ceiling gypsum", expectedIntent: "false_ceiling" },
  { query: "do you provide turnkey construction services", expectedIntent: "turnkey_construction" },
  { query: "need site inspection soil test", expectedIntent: "site_inspection" },
  { query: "do you help with building approval BBMP", expectedIntent: "govt_approvals" },
  { query: "waterproof coating bathroom floor", expectedIntent: "waterproofing" },
  { query: "quality assurance testing checklist", expectedIntent: "quality_assurance" },
  { query: "rain water harvesting recharge sumps", expectedIntent: "rainwater_harvesting" },
  { query: "solar panels solar system cost", expectedIntent: "solar" }
];

function runTests() {
  console.log("====================================================");
  console.log("  MONOME CHATBOT INTENT RECOGNITION VALIDATION SUITE");
  console.log("====================================================\n");

  const controller = new ChatController();
  let passed = 0;
  let failed = 0;

  testCases.forEach((tc, idx) => {
    // Reset context memory for single isolation intent testing, EXCEPT for context tracking tests
    controller.contextMemory.reset();

    const response = controller.processMessage(tc.query);
    const matchedIntent = response ? response.intentId : null;

    if (matchedIntent === tc.expectedIntent) {
      passed++;
    } else {
      failed++;
      console.log(`❌ TEST #${idx + 1} FAILED`);
      console.log(`   Query:    "${tc.query}"`);
      console.log(`   Expected: "${tc.expectedIntent}"`);
      console.log(`   Received: "${matchedIntent}"\n`);
    }
  });

  // --- Context Memory Specific Flow Tests ---
  console.log("Running Multi-Turn Context Memory Flow Tests...");
  let contextPassed = true;

  // Turn 1
  controller.contextMemory.reset();
  let resp1 = controller.processMessage("I want to build a luxury villa.");
  if (resp1.intentId !== "villa_construction") {
    console.log(`❌ Context Turn 1 Failed: Expected 'villa_construction', got '${resp1.intentId}'`);
    contextPassed = false;
  }

  // Turn 2: uses pronoun "it" which should resolve to "villa" and match "construction_cost"
  let resp2 = controller.processMessage("How much will it cost?");
  if (resp2.intentId !== "construction_cost") {
    console.log(`❌ Context Turn 2 Failed: Expected 'construction_cost' (resolving 'it' to 'villa'), got '${resp2.intentId}'`);
    contextPassed = false;
  }

  // Turn 3: stand-alone topic query "What about materials?" which should resolve to "villa materials" -> match "materials"
  let resp3 = controller.processMessage("What about materials?");
  if (resp3.intentId !== "materials") {
    console.log(`❌ Context Turn 3 Failed: Expected 'materials' (resolving context project 'villa'), got '${resp3.intentId}'`);
    contextPassed = false;
  }

  if (contextPassed) {
    passed += 3;
    console.log("✅ All Context Memory Flow Tests Passed.\n");
  } else {
    failed += 3;
    console.log("❌ Context Memory Flow Tests Failed.\n");
  }

  // --- Fallback Limit Test ---
  console.log("Running Fallback Limit Flow Tests...");
  controller.contextMemory.reset();
  controller.fallbackCount = 0;

  // Query 1 unrelated
  let f1 = controller.processMessage("What is the speed of light?");
  // Query 2 unrelated
  let f2 = controller.processMessage("Tell me a funny joke");
  // Query 3 unrelated -> should trigger FALLBACK_LIMIT (contain contact redirect button)
  let f3 = controller.processMessage("Who is the prime minister");

  const hasRedirectContact = f3 && f3.value && f3.value.includes("Go To Contact Page");

  if (hasRedirectContact) {
    passed++;
    console.log("✅ Fallback Limit Flow Test Passed.\n");
  } else {
    failed++;
    console.log("❌ Fallback Limit Flow Test Failed. Received:\n", f3 ? f3.value : "null", "\n");
  }

  // --- Summary ---
  const total = passed + failed;
  console.log("====================================================");
  console.log("  TEST RESULTS SUMMARY");
  console.log(`  Total:   ${total}`);
  console.log(`  Passed:  ${passed} (${((passed/total)*100).toFixed(1)}%)`);
  console.log(`  Failed:  ${failed}`);
  console.log("====================================================");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
