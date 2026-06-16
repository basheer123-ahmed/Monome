/**
 * MONOME Construction Assistant Chatbot (Pure Frontend)
 * Premium guided assistant matching MONOME's aesthetic.
 */

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

  // Chatbot configurations and responses data
  const data = {
    residential: {
      title: "🏠 Residential Construction",
      options: ["Villas", "Independent Houses", "Apartments", "Renovations"],
      responses: {
        "Villas": {
          text: "We design and build bespoke luxury villas with high-end architecture, premium materials, and custom finishes. Our packages include landscape design, smart home integration, and structural warranty.",
          replies: ["💰 Villa Construction Cost", "📅 Residential Timelines", "🧱 Materials & Quality", "🏠 Main Menu"]
        },
        "Independent Houses": {
          text: "We build premium independent houses tailored to your plot size and family needs. We manage architectural design, approvals, excavation, structural works, utility mapping, and handover.",
          replies: ["💰 Construction Costs", "📅 Residential Timelines", "🧱 Materials & Quality", "🏠 Main Menu"]
        },
        "Apartments": {
          text: "For developers and landowners, we construct high-quality multi-dwelling residential buildings and apartments. We focus on spatial efficiency, safety compliance, modern amenities, and timely delivery.",
          replies: ["🏢 Commercial Construction", "💰 Construction Costs", "🧱 Materials & Quality", "🏠 Main Menu"]
        },
        "Renovations": {
          text: "Breathe new life into your existing spaces with our comprehensive remodeling services. We specialize in structural remodeling, kitchen & bath updates, luxury finishes, and electrical/plumbing upgrades.",
          replies: ["🧱 Finishing Materials", "💰 Construction Costs", "📞 Contact MONOME", "🏠 Main Menu"]
        }
      }
    },
    commercial: {
      title: "🏢 Commercial Construction",
      options: ["Office Buildings", "Business Parks", "Retail Spaces", "Warehouses"],
      responses: {
        "Office Buildings": {
          text: "We build modern, energy-efficient corporate offices and office towers. Features include open-plan workspaces, premium HVAC, backup power integration, and high-speed network cabling.",
          replies: ["📅 Commercial Timelines", "💰 Commercial Building Cost", "🧱 Quality Assurance", "🏠 Main Menu"]
        },
        "Business Parks": {
          text: "Our team designs and constructs large-scale integrated IT parks, business hubs, and industrial campuses with premium infrastructure, ample parking, green building ratings, and top-tier security.",
          replies: ["📅 Commercial Timelines", "🧱 Quality Assurance", "📞 Contact MONOME", "🏠 Main Menu"]
        },
        "Retail Spaces": {
          text: "We construct eye-catching retail storefronts, showrooms, boutique stores, and malls optimized for foot traffic, premium product displays, customer flow, and durable finishes.",
          replies: ["💰 Commercial Building Cost", "🧱 Finishing Materials", "📞 Contact MONOME", "🏠 Main Menu"]
        },
        "Warehouses": {
          text: "We build robust, pre-engineered steel warehouses, storage units, and fulfillment centers with high-load floors, efficient loading bays, fire safety integration, and structural durability.",
          replies: ["📅 Commercial Timelines", "💰 Construction Costs", "🧱 Quality Assurance", "🏠 Main Menu"]
        }
      }
    },
    institutional: {
      title: "🏫 Institutional Projects",
      options: ["Schools", "Colleges", "Research Labs", "Libraries"],
      responses: {
        "Schools": {
          text: "We construct modern school buildings with safety features, interactive classrooms, sports areas, and child-safe facilities, complying with educational boards.",
          replies: ["💰 Construction Costs", "🧱 Quality Assurance", "📞 Contact MONOME", "🏠 Main Menu"]
        },
        "Colleges": {
          text: "We construct college campuses, lecture halls, administrative wings, and auditoriums designed for high student capacity and state-of-the-art acoustics.",
          replies: ["💰 Construction Costs", "🧱 Quality Assurance", "📞 Contact MONOME", "🏠 Main Menu"]
        },
        "Research Labs": {
          text: "We design and build cleanrooms, research labs, and diagnostic facilities with specialized HVAC, chemical-resistant flooring, and strict safety specs.",
          replies: ["💰 Construction Costs", "🧱 Quality Assurance", "📞 Contact MONOME", "🏠 Main Menu"]
        },
        "Libraries": {
          text: "We build modern libraries with optimal natural lighting, silent study zones, ventilation, climate-controlled archive rooms, and heavy structural load capacities.",
          replies: ["💰 Construction Costs", "🧱 Quality Assurance", "📞 Contact MONOME", "🏠 Main Menu"]
        }
      }
    },
    costs: {
      title: "💰 Construction Costs",
      options: ["Cost Factors", "Villa Construction Cost", "Commercial Building Cost", "Budget Planning"],
      responses: {
        "Cost Factors": {
          text: "Construction costs depend on: 1) Built-up area, 2) Soil condition & foundation type, 3) Material specifications (Standard vs Premium vs Luxury), 4) Interior fit-outs, and 5) Location access.",
          replies: ["💰 Villa Construction Cost", "💰 Commercial Building Cost", "📅 Project Timelines", "🏠 Main Menu"]
        },
        "Villa Construction Cost": {
          text: "Villa construction starts from approximately ₹1,800 to ₹2,500 per sq.ft for Standard specs, ₹2,800 to ₹3,500 for Premium, and ₹4,000+ for high-end Luxury finishes. Landscaping and interior design are estimated separately.",
          replies: ["💰 Cost Factors", "📅 Residential Timelines", "🧱 Quality Assurance", "🏠 Main Menu"]
        },
        "Commercial Building Cost": {
          text: "Commercial construction typically ranges between ₹2,000 to ₹3,200 per sq.ft depending on structural load, number of floors, glass facade specs, utility integrations, and basement parking scope.",
          replies: ["💰 Cost Factors", "📅 Commercial Timelines", "🧱 Quality Assurance", "🏠 Main Menu"]
        },
        "Budget Planning": {
          text: "To plan a construction budget: 1) Define requirements & built-up area, 2) Set aside 10-15% contingency for upgrades or unexpected foundation conditions, 3) Split budget: 60% structure/finishing, 25% interiors, 15% utilities/fees.",
          replies: ["💰 Cost Factors", "💰 Villa Construction Cost", "📞 Contact MONOME", "🏠 Main Menu"]
        }
      }
    },
    timelines: {
      title: "📅 Project Timelines",
      options: ["Residential Timelines", "Commercial Timelines", "Construction Stages", "Project Tracking"],
      responses: {
        "Residential Timelines": {
          text: "Standard independent houses take about 8 to 11 months. Premium luxury villas of 3,000–5,000 sq.ft take 12 to 15 months. Renovations vary from 1 to 4 months depending on structural scope.",
          replies: ["📅 Construction Stages", "📅 Project Tracking", "🏠 Residential Construction", "🏠 Main Menu"]
        },
        "Commercial Timelines": {
          text: "Commercial office complexes of medium scale take 15 to 24 months, including excavation, concrete frame curing, facade installation, MEP services, and compliance certifications.",
          replies: ["📅 Construction Stages", "📅 Project Tracking", "🏢 Commercial Construction", "🏠 Main Menu"]
        },
        "Construction Stages": {
          text: "Our process has 5 stages: 1) Concept & Approvals (1-2 mo), 2) Foundation & Plinth (2 mo), 3) RCC Structure & Brickwork (3-5 mo), 4) MEP & Plastering (2-3 mo), 5) Finishes & Handover (2-3 mo).",
          replies: ["📅 Project Tracking", "🧱 Quality Assurance", "💰 Construction Costs", "🏠 Main Menu"]
        },
        "Project Tracking": {
          text: "We provide clients with access to our online Project Portal. You get weekly photo updates, milestone progress reports, material verification sheets, and budget utilization statements.",
          replies: ["📅 Construction Stages", "🧱 Quality Assurance", "📞 Contact MONOME", "🏠 Main Menu"]
        }
      }
    },
    materials: {
      title: "🧱 Materials & Quality",
      options: ["Cement", "Steel", "Waterproofing", "Finishing Materials", "Quality Assurance"],
      responses: {
        "Cement": {
          text: "We use top-grade OPC 53 grade cement for structural works (beams, slabs, columns) and PPC for plastering. Brands used: UltraTech, ACC, and Birla Super to ensure high durability and strength.",
          replies: ["🧱 Steel", "🧱 Waterproofing", "🧱 Quality Assurance", "🏠 Main Menu"]
        },
        "Steel": {
          text: "We exclusively use Fe-550D TMT reinforcement steel bars (Fe-500D minimum) to ensure earthquake resistance and structural ductility. Brands used: Tata Tiscon, JSW NeoSteel, and Sail.",
          replies: ["🧱 Cement", "🧱 Waterproofing", "🧱 Quality Assurance", "🏠 Main Menu"]
        },
        "Waterproofing": {
          text: "Waterproofing is critical! We apply multiple coats of elastomeric and polyurethane waterproofing membranes on balconies, sumps, bathrooms, and terrace floors. Brands used: Dr. Fixit and Fosroc.",
          replies: ["🧱 Cement", "🧱 Steel", "🧱 Quality Assurance", "🏠 Main Menu"]
        },
        "Finishing Materials": {
          text: "We offer premium vitrified tiles (Kajaria, Somany), premium Italian marble, solid teak wood doors, UPVC soundproof windows (Fenesta), Jaguar/Kohler CP fittings, and Asian Paints Royale series.",
          replies: ["🧱 Quality Assurance", "💰 Construction Costs", "📞 Contact MONOME", "🏠 Main Menu"]
        },
        "Quality Assurance": {
          text: "Quality is our hallmark! We conduct 35+ structural checks, concrete compressive tests, plaster verticality alignment, and plumbing pressure tests before handover.",
          replies: ["🧱 Cement", "🧱 Steel", "🧱 Waterproofing", "🏠 Main Menu"]
        }
      }
    },
    plots: {
      title: "🗺️ Plots & Land",
      options: ["Plot Size Requirements", "Soil Testing Importance", "Vastu for Plots", "Land Development"],
      responses: {
        "Plot Size Requirements": {
          text: "We construct on plots starting from 1,200 sq.ft (30x40) up to larger sites like 2,400 sq.ft (40x60), 4,000 sq.ft, and custom estate lands. Setbacks and built-up guidelines are determined by local municipal rules.",
          replies: ["🗺️ Vastu for Plots", "🗺️ Soil Testing Importance", "💰 Construction Costs", "🏠 Main Menu"]
        },
        "Soil Testing Importance": {
          text: "Before laying the foundation, we perform geotechnical soil tests (borewell testing) to determine the bearing capacity. This helps choose the right foundation (pile, raft, or isolated footings) and prevents structural cracks.",
          replies: ["🧱 Quality Assurance", "🗺️ Land Development", "🏠 Main Menu"]
        },
        "Vastu for Plots": {
          text: "We specialize in Vastu-compliant layouts. Key Vastu checks: East & North-facing entry is auspicious, kitchen in Southeast (Agni), Master Bedroom in Southwest (Nairutya), and water sumps in Northeast.",
          replies: ["🗺️ Plot Size Requirements", "📞 Contact MONOME", "🏠 Main Menu"]
        },
        "Land Development": {
          text: "We handle land clearing, soil compaction, stone-pitching, compound walls, excavation, and leveling to prepare your plot for construction. This is included in our comprehensive turn-key package.",
          replies: ["🗺️ Soil Testing Importance", "📅 Project Timelines", "🏠 Main Menu"]
        }
      }
    },
    buildings: {
      title: "🏢 Building Structures",
      options: ["RCC Frame Structures", "Pre-engineered Steel Buildings", "Apartment Complex Specs", "Green Buildings (GRIHA)"],
      responses: {
        "RCC Frame Structures": {
          text: "Most of our residential structures are RCC (Reinforced Concrete) frames consisting of columns, beams, and slabs. This provides maximum structural life, rigidity, and easy modification of walls.",
          replies: ["🧱 Steel", "📅 Project Timelines", "🏠 Main Menu"]
        },
        "Pre-engineered Steel Buildings": {
          text: "For warehouses, factory sheds, and commercial structures, we build Pre-Engineered Buildings (PEB) using high-tensile structural steel frames. This reduces construction time by 40% and allows large column-free spans.",
          replies: ["🏢 Commercial Construction", "📅 Project Timelines", "🏠 Main Menu"]
        },
        "Apartment Complex Specs": {
          text: "Our apartment structures use top-quality concrete blocks, modern seismic-zone resistance, dual plumbing systems (flush & raw), rainwater harvesting pits, and fire-fighting systems.",
          replies: ["🧱 Quality Assurance", "💰 Construction Costs", "🏠 Main Menu"]
        },
        "Green Buildings (GRIHA)": {
          text: "We are ISO certified and build GRIHA-rated green buildings. Features include solar wiring, rainwater harvesting, double-glazed window panels (insulation), and fly-ash bricks for thermal cooling.",
          replies: ["🧱 Quality Assurance", "📅 Project Timelines", "🏠 Main Menu"]
        }
      }
    },
    faqs: {
      title: "❓ FAQs",
      options: [
        "What is your main office address?",
        "Are you registered with CREDAI?",
        "Do you handle government approvals?",
        "Is there a warranty on construction?",
        "Can we customize the floor plans?",
        "What locations do you construct in?",
        "Do you provide modular kitchens?",
        "Can I visit your active sites?",
        "What concrete grade do you use?",
        "How do you handle water conservation?"
      ],
      responses: {
        "What is your main office address?": {
          text: "Our corporate office is located at 42, Prestige Towers, MG Road, Bangalore.",
          replies: ["📞 Contact MONOME", "🏠 Main Menu"]
        },
        "Are you registered with CREDAI?": {
          text: "Yes, MONOME Constructions is a registered CREDAI member and all projects comply with local corporation norms and RERA guidelines.",
          replies: ["🧱 Quality Assurance", "🏠 Main Menu"]
        },
        "Do you handle government approvals?": {
          text: "Yes, we handle the complete process of acquiring building permissions, BESCOM electricity links, BWSSB water connections, and occupancy certificates.",
          replies: ["📅 Project Timelines", "🏠 Main Menu"]
        },
        "Is there a warranty on construction?": {
          text: "We offer a 10-year structural warranty on all RCC elements, a 3-year waterproofing warranty, and a 1-year general maintenance warranty.",
          replies: ["🧱 Quality Assurance", "🏠 Main Menu"]
        },
        "Can we customize the floor plans?": {
          text: "Absolutely. We work with our clients through multiple design iterations until the floor plans and 3D architectural elevations are exactly to their satisfaction.",
          replies: ["🏠 Residential Construction", "📞 Contact MONOME", "🏠 Main Menu"]
        },
        "What locations do you construct in?": {
          text: "We are headquartered in Bangalore and undertake projects across Karnataka, Tamil Nadu, Andhra Pradesh, and major cities across South India.",
          replies: ["📞 Contact MONOME", "🏠 Main Menu"]
        },
        "Do you provide modular kitchens?": {
          text: "Yes, our interior design division provides complete turn-key premium modular kitchens, built-in wardrobes, custom vanities, and smart storage systems.",
          replies: ["🏠 Residential Construction", "🏠 Main Menu"]
        },
        "Can I visit your active sites?": {
          text: "Absolutely! We encourage potential clients to visit our ongoing projects in Bangalore to inspect the quality of our brickwork, plastering, and materials firsthand.",
          replies: ["🧱 Quality Assurance", "🏠 Main Menu"]
        },
        "What concrete grade do you use?": {
          text: "We use M20 or M25 design mix concrete for columns and foundations (reinforced with Fe-550D steel) to guarantee superior structural safety and durability.",
          replies: ["🧱 Quality Assurance", "🏠 Main Menu"]
        },
        "How do you handle water conservation?": {
          text: "All our projects include rainwater harvesting systems, sewage treatment plants (for multi-dwelling projects), and water-efficient fixtures (Jaguar/Kohler) as standard.",
          replies: ["🧱 Quality Assurance", "🏠 Main Menu"]
        }
      }
    }
  };

  // State variables
  let unmatchedCount = 0;
  let isOpen = false;

  // Dynamic Cost Estimator State
  let estimatorState = {
    step: 0,
    area: 0,
    floors: 0,
    quality: ""
  };

  // Home Style Recommender State
  let styleState = {
    step: 0,
    scores: { contemporary: 0, traditional: 0, modern: 0, luxury: 0 }
  };

  function resetStyleRecommender() {
    styleState = { step: 0, scores: { contemporary: 0, traditional: 0, modern: 0, luxury: 0 } };
  }

  function resetEstimator() {
    estimatorState = {
      step: 0,
      area: 0,
      floors: 0,
      quality: ""
    };
  }

  // ─── HOME STYLE RECOMMENDER FLOW ─────────────────────────────────────────
  function startStyleRecommender() {
    resetStyleRecommender();
    styleState.step = 1;
    showTypingIndicator(() => {
      addBotMessage("Welcome to the **🏡 Home Style Recommender**! I\'ll ask you 4 quick questions to suggest the perfect architecture style for your dream home. Let\'s go!");
      showTypingIndicator(() => {
        addBotMessage("**Question 1 of 4:** What is your approximate construction budget?");
        renderQuickReplies([
          { text: "Under ₹50 Lakhs",        scores: { contemporary: 2, traditional: 3, modern: 1, luxury: 0 } },
          { text: "₹50L – ₹1 Crore",        scores: { contemporary: 3, traditional: 2, modern: 3, luxury: 0 } },
          { text: "₹1 Cr – ₹2 Crore",       scores: { contemporary: 2, traditional: 2, modern: 3, luxury: 1 } },
          { text: "Above ₹2 Crore",          scores: { contemporary: 1, traditional: 1, modern: 2, luxury: 4 } },
          { text: "🏠 Main Menu",             cancel: true }
        ], (opt) => handleStyleStep(opt));
      });
    });
  }

  function handleStyleStep(opt) {
    if (opt.cancel) {
      resetStyleRecommender();
      addUserMessage("🏠 Main Menu");
      showTypingIndicator(() => {
        addBotMessage("No problem! Select a topic below:");
        renderMainMenu();
      });
      return;
    }

    // Accumulate scores
    if (opt.scores) {
      for (const key in opt.scores) {
        styleState.scores[key] = (styleState.scores[key] || 0) + opt.scores[key];
      }
    }

    addUserMessage(opt.text);

    if (styleState.step === 1) {
      styleState.step = 2;
      showTypingIndicator(() => {
        addBotMessage("**Question 2 of 4:** How many family members will live in the house?");
        renderQuickReplies([
          { text: "1–2 People (Couple/Solo)",     scores: { contemporary: 3, traditional: 0, modern: 4, luxury: 2 } },
          { text: "3–4 People (Nuclear Family)",  scores: { contemporary: 3, traditional: 2, modern: 2, luxury: 2 } },
          { text: "5–7 People (Extended Family)", scores: { contemporary: 1, traditional: 4, modern: 1, luxury: 1 } },
          { text: "8+ People (Joint Family)",     scores: { contemporary: 0, traditional: 4, modern: 0, luxury: 2 } },
          { text: "🏠 Main Menu",                  cancel: true }
        ], (opt2) => handleStyleStep(opt2));
      });
    } else if (styleState.step === 2) {
      styleState.step = 3;
      showTypingIndicator(() => {
        addBotMessage("**Question 3 of 4:** Which phrase best describes your personal aesthetic taste?");
        renderQuickReplies([
          { text: "Clean, open & bright spaces",       scores: { contemporary: 4, traditional: 0, modern: 3, luxury: 1 } },
          { text: "Heritage warmth & rich woodwork",   scores: { contemporary: 0, traditional: 5, modern: 0, luxury: 1 } },
          { text: "Sleek, minimal & clutter-free",      scores: { contemporary: 2, traditional: 0, modern: 5, luxury: 2 } },
          { text: "Opulent, grand & statement-making", scores: { contemporary: 1, traditional: 1, modern: 0, luxury: 5 } },
          { text: "🏠 Main Menu",                        cancel: true }
        ], (opt3) => handleStyleStep(opt3));
      });
    } else if (styleState.step === 3) {
      styleState.step = 4;
      showTypingIndicator(() => {
        addBotMessage("**Question 4 of 4:** How many floors are you planning to build?");
        renderQuickReplies([
          { text: "Ground Floor Only (G)",   scores: { contemporary: 2, traditional: 3, modern: 3, luxury: 0 } },
          { text: "G + 1 Floor",             scores: { contemporary: 3, traditional: 2, modern: 3, luxury: 1 } },
          { text: "G + 2 Floors",            scores: { contemporary: 2, traditional: 1, modern: 2, luxury: 2 } },
          { text: "G + 3 or More",           scores: { contemporary: 1, traditional: 0, modern: 1, luxury: 4 } },
          { text: "🏠 Main Menu",             cancel: true }
        ], (opt4) => handleStyleStep(opt4));
      });
    } else if (styleState.step === 4) {
      // Compute top style
      const scores = styleState.scores;
      const styleMap = {
        contemporary: {
          name: "🏠 Contemporary Architecture",
          desc: "Your home will shine with clean lines, large windows, open floor plans, and a seamless indoor-outdoor connection. Light-filled, functional, and modern — built for today's lifestyle.",
          features: ["Open Floor Plans", "Large Glazed Windows", "Neutral Palettes", "Smart Home Ready", "Flat/Low-Pitch Roofs"],
          link: "design-inspiration"
        },
        traditional: {
          name: "🏛️ Traditional & Heritage",
          desc: "A timeless home inspired by South Indian architecture — teak wood carvings, sloped terracotta roofs, granite pillars, and Vastu-centric courtyard layouts (Nalukettu style).",
          features: ["Nalukettu Courtyard", "Teak Wood Doors", "Athangudi Tiles", "Terracotta Roofs", "Vastu Compliant"],
          link: "design-inspiration"
        },
        modern: {
          name: "◻️ Modern Minimalist",
          desc: "Every detail serves a purpose. Hidden storage, flush surfaces, monochromatic palettes, and precision craftsmanship define this elegant, calm, and uncluttered living experience.",
          features: ["Hidden Joinery Storage", "Large Format Tiles", "Cove LED Lighting", "Monochromatic Palette", "Flush Door Panels"],
          link: "design-inspiration"
        },
        luxury: {
          name: "👑 Luxury Villa",
          desc: "For those who demand the extraordinary. Italian marble, infinity pools, KNX smart home automation, home theatres, and statement facades — an architectural masterpiece tailored for you.",
          features: ["Italian Marble Flooring", "Infinity Pool", "Private Home Theatre", "KNX Smart Automation", "Bespoke Stone Facade"],
          link: "design-inspiration"
        }
      };

      let topStyle = "contemporary";
      let topScore = -1;
      for (const k in scores) {
        if (scores[k] > topScore) { topScore = scores[k]; topStyle = k; }
      }

      const result = styleMap[topStyle];
      const savedStyle = topStyle;
      resetStyleRecommender();

      showTypingIndicator(() => {
        const featuresHtml = result.features.map(f => `<span class="inline-block px-2 py-0.5 bg-[#F5A623]/10 border border-[#F5A623]/20 text-[#D4891A] rounded-full text-[10px] font-semibold">${f}</span>`).join(' ');
        const resultHtml = `
          <div class="space-y-3">
            <p class="font-bold text-brand-orange text-sm border-b border-neutral-200 dark:border-neutral-700 pb-2">🏡 Your Recommended Style</p>
            <p class="font-inter font-bold text-base text-neutral-800 dark:text-neutral-100">${result.name}</p>
            <p class="text-[12px] text-neutral-600 dark:text-neutral-300 leading-relaxed">${result.desc}</p>
            <div class="flex flex-wrap gap-1 pt-1">${featuresHtml}</div>
            <p class="text-[10px] text-neutral-400 mt-1">Based on your preferences — scroll to our <strong>Design Inspiration</strong> section to see this style in detail.</p>
          </div>
        `;
        addBotMessage(resultHtml);
        renderQuickReplies([
          { text: "💬 Discuss This Style", key: "whatsapp_style" },
          { text: "📊 Try Cost Estimator", key: "estimator" },
          { text: "🏠 Main Menu",           key: "main" }
        ], (opt5) => {
          if (opt5.key === "whatsapp_style") {
            addUserMessage("💬 Discuss This Style");
            showTypingIndicator(() => {
              addBotMessage("Great choice! Let's connect on WhatsApp to discuss your " + result.name + " home design:");
              const waText = encodeURIComponent(`Hi MONOME, I used your Home Style Recommender and got "${result.name}" recommended for me. I'd love to discuss this further!`);
              addBotMessage(`<a href="https://wa.me/919620974224?text=${waText}" target="_blank" rel="noopener noreferrer" class="inline-block mt-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-[11px] font-bold shadow-md hover:scale-105 active:scale-95 transition-all text-center">Open WhatsApp Chat</a>`);
              renderQuickReplies([{ text: "🏠 Main Menu", key: "main" }], () => handleQuickReplySelect("🏠 Main Menu"));
            });
          } else if (opt5.key === "estimator") {
            addUserMessage("📊 Start Cost Estimator");
            startEstimatorFlow();
          } else {
            handleQuickReplySelect("🏠 Main Menu");
          }
        });
      });
    }
  }

  function startEstimatorFlow() {
    estimatorState.step = 1;
    showTypingIndicator(() => {
      addBotMessage("Welcome to the **MONOME Chat Cost Estimator**! Let's build your budget step-by-step. \n\nFirst, **what is your approximate planned built-up area (sq.ft)?**");
      renderQuickReplies([
        { text: "1,000 sq.ft", value: 1000 },
        { text: "1,500 sq.ft", value: 1500 },
        { text: "2,000 sq.ft", value: 2000 },
        { text: "3,000 sq.ft", value: 3000 },
        { text: "5,000 sq.ft", value: 5000 },
        { text: "🏠 Main Menu", value: "main" }
      ], (opt) => handleEstimatorStep(opt.text, opt.value));
    });
  }

  function handleEstimatorStep(optionText, value) {
    if (optionText === "🏠 Main Menu" || value === "main") {
      resetEstimator();
      addUserMessage("🏠 Main Menu");
      showTypingIndicator(() => {
        addBotMessage("Estimator cancelled. Select a topic below to continue:");
        renderMainMenu();
      });
      return;
    }

    if (estimatorState.step === 1) {
      estimatorState.area = value;
      estimatorState.step = 2;
      addUserMessage(optionText);
      showTypingIndicator(() => {
        addBotMessage("Got it. **How many floor levels are you planning to construct?**");
        renderQuickReplies([
          { text: "Ground Floor Only", value: 1 },
          { text: "G + 1 Floor", value: 2 },
          { text: "G + 2 Floors", value: 3 },
          { text: "G + 3 Floors", value: 4 },
          { text: "🏠 Main Menu", value: "main" }
        ], (opt) => handleEstimatorStep(opt.text, opt.value));
      });
    } else if (estimatorState.step === 2) {
      estimatorState.floors = value;
      estimatorState.step = 3;
      addUserMessage(optionText);
      showTypingIndicator(() => {
        addBotMessage("Select the **material quality specification standard**:");
        renderQuickReplies([
          { text: "Standard Specs (₹1,800/sq.ft)", value: { key: "Standard", rate: 1800 } },
          { text: "Premium Specs (₹2,800/sq.ft)", value: { key: "Premium", rate: 2800 } },
          { text: "Luxury Specs (₹4,500/sq.ft)", value: { key: "Luxury", rate: 4500 } },
          { text: "🏠 Main Menu", value: "main" }
        ], (opt) => handleEstimatorStep(opt.text, opt.value));
      });
    } else if (estimatorState.step === 3) {
      estimatorState.quality = value.key;
      const rate = value.rate;
      const area = estimatorState.area;
      const floors = estimatorState.floors;
      
      const baseCost = area * rate * floors;
      const designFee = baseCost * 0.08;
      const electricPlumbing = baseCost * 0.10;
      const total = baseCost + designFee + electricPlumbing;
      
      const formatINR = (num) => {
        if (num >= 10000000) {
          return `₹ ${(num / 10000000).toFixed(2)} Cr`;
        } else if (num >= 100000) {
          return `₹ ${(num / 100000).toFixed(2)} Lakhs`;
        }
        return `₹ ${num}`;
      };

      addUserMessage(optionText);
      showTypingIndicator(() => {
        const resultHtml = `
          <div class="space-y-3 font-poppins text-left">
            <p class="font-bold text-brand-orange text-sm border-b border-neutral-200 dark:border-neutral-700 pb-2">📊 Budget Estimate Summary</p>
            <div class="text-[12px] space-y-1 text-neutral-600 dark:text-neutral-300">
              <p>📍 <strong>Built-Up Area:</strong> ${area.toLocaleString()} sq.ft</p>
              <p>🏢 <strong>No. of Floors:</strong> ${floors} Levels</p>
              <p>💎 <strong>Quality Standard:</strong> ${estimatorState.quality}</p>
              <p>🧱 <strong>Civil &amp; Finishes (Base):</strong> ${formatINR(baseCost)}</p>
              <p>📐 <strong>Design &amp; Arch Fee (8%):</strong> ${formatINR(designFee)}</p>
              <p>⚡ <strong>Electrical &amp; MEP (10%):</strong> ${formatINR(electricPlumbing)}</p>
            </div>
            <div class="border-t border-dashed border-neutral-200 dark:border-neutral-700 pt-2 flex justify-between items-center">
              <span class="font-bold text-neutral-800 dark:text-neutral-100 text-xs">Total Estimate:</span>
              <span class="font-extrabold text-brand-orange text-sm">${formatINR(total)}</span>
            </div>
            <p class="text-[10px] text-neutral-400 mt-1 leading-normal">*Estimated based on average construction variables. Excludes land and municipal approval costs.</p>
          </div>
        `;
        addBotMessage(resultHtml);
        
        // Save current variables before resetting so they're in scope for whatsapp link
        const savedArea = area;
        const savedFloors = floors;
        const savedQuality = estimatorState.quality;
        resetEstimator();

        renderQuickReplies([
          { text: "💬 Chat on WhatsApp", key: "whatsapp" },
          { text: "🧱 Materials & Quality", key: "materials" },
          { text: "🏠 Main Menu", key: "main" }
        ], (opt) => {
          if (opt.key === "whatsapp") {
            addUserMessage("💬 Chat on WhatsApp");
            showTypingIndicator(() => {
              addBotMessage("Sure! Click below to send your calculation to our coordinator on WhatsApp:");
              const textMsg = encodeURIComponent(`Hi MONOME, I ran a budget estimate on your chatbot. Built-up area: ${savedArea} sqft, Floors: ${savedFloors}, Quality: ${savedQuality}. Let's discuss!`);
              const waLink = `
                <a href="https://wa.me/919620974224?text=${textMsg}" target="_blank" rel="noopener noreferrer" class="inline-block mt-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-[11px] font-bold shadow-md hover:scale-105 active:scale-95 transition-all text-center">Open WhatsApp Chat</a>
              `;
              addBotMessage(waLink);
              renderQuickReplies([{ text: "🏠 Main Menu", key: "main" }], (mOpt) => handleQuickReplySelect("🏠 Main Menu"));
            });
          } else if (opt.key === "materials") {
            handleQuickReplySelect("🧱 Materials & Quality");
          } else {
            handleQuickReplySelect("🏠 Main Menu");
          }
        });
      });
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

      <!-- WhatsApp Floating Launcher Button -->
      <a href="https://wa.me/919620974224" target="_blank" rel="noopener noreferrer" id="monome-whatsapp-launcher" class="fixed bottom-[92px] right-7 z-50 w-12 h-12 rounded-full bg-[#0d1017]/90 border border-[#25D366]/80 text-[#25D366] shadow-[0_4px_14px_rgba(37,211,102,0.15)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.35)] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer animate-whatsapp-float" title="Chat on WhatsApp" aria-label="Chat on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
          <!-- Outer bubble outline -->
          <path d="M12.05 21.84h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Phone receiver filled -->
          <path d="M15.8 12.8c-.2-.1-.9-.4-1-.5-.1-.1-.2-.1-.3.1-.1.2-.4.5-.5.6-.1.1-.2.1-.4 0-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.5-1.8-.2-.3 0-.4.1-.5.1-.1.3-.3.4-.4.1-.1.1-.2.2-.4 0-.2 0-.3-.1-.4-.1-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3s-.9.9-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.7 2.6 4.2 3.7.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3z" fill="currentColor" />
        </svg>
      </a>

      <!-- Phone Floating Launcher Button -->
      <a href="tel:+919620974224" id="monome-phone-launcher" class="fixed bottom-[152px] right-7 z-50 w-12 h-12 rounded-full bg-[#0d1017]/90 border border-[#F5A623]/80 text-[#F5A623] shadow-[0_4px_14px_rgba(245,166,35,0.15)] hover:shadow-[0_6px_20px_rgba(245,166,35,0.35)] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer animate-phone-float" title="Call MONOME" aria-label="Call MONOME">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

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
              <p class="font-semibold text-[#F5A623] mb-1 font-inter">Welcome to MONOME Constructions! 👋</p>
              <p>Get quick answers about construction, costs, timelines and services.</p>
              <span class="text-[9px] text-neutral-400 dark:text-neutral-500 mt-1 block">Just now</span>
            </div>
          </div>
        </div>

        <!-- Options Container (Quick Replies & Navigation) -->
        <div id="monome-chatbot-options-container" class="px-4 py-2 bg-[#FEFDFB]/90 dark:bg-[#0f1117]/90 border-t border-neutral-100 dark:border-neutral-800/60 max-h-[140px] overflow-y-auto">
          <!-- Render main menu initially -->
          <div id="monome-chatbot-options" class="flex flex-wrap gap-2 py-1.5"></div>
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

    // Load initial main menu options
    renderMainMenu();
  }

  // Render main menu choices
  function renderMainMenu() {
    const options = [
      { text: "🏠 Residential Construction", category: "residential" },
      { text: "🏢 Commercial Construction", category: "commercial" },
      { text: "🏫 Institutional Projects", category: "institutional" },
      { text: "🗺️ Plots & Land", category: "plots" },
      { text: "🏢 Building Structures", category: "buildings" },
      { text: "🏡 Home Style Recommender", category: "style_recommender" },
      { text: "📊 Chat Cost Estimator", category: "chat_estimator" },
      { text: "💰 Construction Costs", category: "costs" },
      { text: "📅 Project Timelines", category: "timelines" },
      { text: "🧱 Materials & Quality", category: "materials" },
      { text: "❓ FAQs", category: "faqs" },
      { text: "📞 Contact MONOME", category: "contact" }
    ];

    renderQuickReplies(options, (opt) => {
      if (opt.category === "contact") {
        handlePredefinedOptionSelect("📞 Contact MONOME", {
          text: "You can reach us at <strong>hello@monome.in</strong> or call us at <strong>+91 80 4120 3456</strong>. Alternatively, you can book a free face-to-face consultation on our contact page.",
          replies: ["🏠 Main Menu"]
        });
      } else if (opt.category === "chat_estimator") {
        addUserMessage(opt.text);
        startEstimatorFlow();
      } else if (opt.category === "style_recommender") {
        addUserMessage(opt.text);
        startStyleRecommender();
      } else if (opt.category === "faqs") {
        // Show FAQs list
        addUserMessage(opt.text);
        showTypingIndicator(() => {
          addBotMessage("Here are some frequently asked questions about MONOME:");
          renderCategoryMenu("faqs");
        });
      } else {
        // Show subcategory options
        addUserMessage(opt.text);
        showTypingIndicator(() => {
          addBotMessage(`Please select an option under **${data[opt.category].title}**:`);
          renderCategoryMenu(opt.category);
        });
      }
    });
  }

  // Render specific category sub-menus
  function renderCategoryMenu(categoryKey) {
    const catData = data[categoryKey];
    if (!catData) return;

    const options = catData.options.map(opt => ({ text: opt, key: opt, category: categoryKey }));
    // Append a back button to main menu
    options.push({ text: "🏠 Main Menu", key: "Main Menu" });

    renderQuickReplies(options, (opt) => {
      if (opt.key === "Main Menu") {
        addUserMessage("🏠 Main Menu");
        showTypingIndicator(() => {
          addBotMessage("How else can I assist you? Select from the main topics below:");
          renderMainMenu();
        });
      } else {
        const responseObj = catData.responses[opt.key];
        handlePredefinedOptionSelect(opt.text, responseObj);
      }
    });
  }

  // Predefined option selection helper
  function handlePredefinedOptionSelect(userText, responseObj) {
    addUserMessage(userText);
    showTypingIndicator(() => {
      addBotMessage(responseObj.text);
      if (responseObj.replies && responseObj.replies.length > 0) {
        const replies = responseObj.replies.map(reply => ({ text: reply, key: reply }));
        renderQuickReplies(replies, (selectedReply) => {
          handleQuickReplySelect(selectedReply.key);
        });
      }
    });
  }

  // Handles standard replies (e.g. Go Back, Main Menu, or related subtopics)
  function handleQuickReplySelect(replyText) {
    // Intercept if estimator is active
    if (estimatorState.step > 0) {
      showTypingIndicator(() => {
        addBotMessage("Please complete the estimator selections or click **🏠 Main Menu** to cancel.");
      });
      return;
    }

    // Intercept if style recommender is active
    if (styleState.step > 0) {
      showTypingIndicator(() => {
        addBotMessage("Please complete the style recommendation questions or click **🏠 Main Menu** to cancel.");
      });
      return;
    }

    // Normalise key matching
    if (replyText === "🏠 Main Menu") {
      addUserMessage("🏠 Main Menu");
      showTypingIndicator(() => {
        addBotMessage("Welcome back! Select a topic to explore:");
        renderMainMenu();
      });
      return;
    }

    // Try finding matching responses in nested data
    let found = false;
    for (const catKey in data) {
      if (data[catKey].responses && data[catKey].responses[replyText]) {
        handlePredefinedOptionSelect(replyText, data[catKey].responses[replyText]);
        found = true;
        break;
      } else if (data[catKey].title === replyText) {
        addUserMessage(replyText);
        showTypingIndicator(() => {
          addBotMessage(`Please select an option under **${data[catKey].title}**:`);
          renderCategoryMenu(catKey);
        });
        found = true;
        break;
      }
    }

    if (!found) {
      // Direct call fallback
      if (replyText.includes("Contact")) {
        handlePredefinedOptionSelect("📞 Contact MONOME", {
          text: "You can reach us at <strong>hello@monome.in</strong> or call us at <strong>+91 80 4120 3456</strong>. Alternatively, you can book a free face-to-face consultation on our contact page.",
          replies: ["🏠 Main Menu"]
        });
      } else {
        // Fallback to main menu
        addUserMessage(replyText);
        showTypingIndicator(() => {
          addBotMessage("Select a topic from the options below:");
          renderMainMenu();
        });
      }
    }
  }

  // Handles custom typed messages
  function handleUserTextSubmit(text) {
    // Intercept if estimator is active
    if (estimatorState.step > 0) {
      addUserMessage(text);
      showTypingIndicator(() => {
        addBotMessage("Please complete the cost estimator selections or click **🏠 Main Menu** to exit.");
      });
      return;
    }

    // Intercept if style recommender is active
    if (styleState.step > 0) {
      addUserMessage(text);
      showTypingIndicator(() => {
        addBotMessage("Please complete the style recommendation questions using the options, or click **🏠 Main Menu** to exit.");
      });
      return;
    }

    addUserMessage(text);
    const cleanedText = text.toLowerCase().trim();

    // Check for extremely long custom messages (> 150 chars)
    if (cleanedText.length > 150) {
      triggerSmartRedirectRule();
      return;
    }

    // Check for direct cost calculator matches
    if (cleanedText.includes("calculator") || cleanedText.includes("estimator") || (cleanedText.includes("estimate") && cleanedText.includes("cost"))) {
      showTypingIndicator(() => {
        addBotMessage("Would you like to start our interactive **Chat Cost Estimator** to calculate a budget?");
        renderQuickReplies([
          { text: "📊 Yes, Start Estimator", key: "start" },
          { text: "🏠 Main Menu", key: "main" }
        ], (opt) => {
          if (opt.key === "start") {
            addUserMessage("📊 Start Estimator");
            startEstimatorFlow();
          } else {
            handleQuickReplySelect("🏠 Main Menu");
          }
        });
      });
      return;
    }

    // Check for style recommender keyword matches
    if (cleanedText.includes("style") || cleanedText.includes("design") || cleanedText.includes("recommend") || cleanedText.includes("architecture") || cleanedText.includes("which style") || cleanedText.includes("contemporary") || cleanedText.includes("traditional") || cleanedText.includes("minimalist") || cleanedText.includes("luxury villa")) {
      showTypingIndicator(() => {
        addBotMessage("Would you like me to recommend a home style based on your preferences?");
        renderQuickReplies([
          { text: "🏡 Yes, Recommend a Style", key: "start" },
          { text: "🏠 Main Menu", key: "main" }
        ], (opt) => {
          if (opt.key === "start") {
            addUserMessage("🏡 Start Style Recommender");
            startStyleRecommender();
          } else {
            handleQuickReplySelect("🏠 Main Menu");
          }
        });
      });
      return;
    }

    // Keyword matching logic
    let matchedCategory = null;

    const keywords = {
      residential: ["residential", "house", "villa", "apartment", "flat", "renovat", "home", "bedroom", "kitchen"],
      commercial: ["commercial", "office", "retail", "shop", "warehouse", "showroom", "business park"],
      institutional: ["institutional", "school", "college", "lab", "library", "research", "classroom"],
      plots: ["plot", "land", "soil", "vastu", "site", "survey", "excavat", "boundary", "ground"],
      buildings: ["building", "structure", "rcc", "peb", "steel frame", "concrete block", "green build", "griha"],
      costs: ["cost", "price", "budget", "rate", "fee", "estimate", "calculation", "inr", "charge"],
      timelines: ["time", "timeline", "duration", "month", "stage", "schedule", "track", "delay", "process"],
      materials: ["material", "cement", "steel", "waterproof", "finish", "quality", "brand", "tmt"],
      faqs: ["faq", "common", "question", "help", "warranty", "address", "location", "office", "credai", "approval"]
    };

    // Check matching keywords
    for (const key in keywords) {
      if (keywords[key].some(keyword => cleanedText.includes(keyword))) {
        matchedCategory = key;
        break;
      }
    }

    if (matchedCategory) {
      unmatchedCount = 0; // Reset unmatched count on success
      showTypingIndicator(() => {
        addBotMessage(`I found details related to your query! Check out our options under **${data[matchedCategory].title}**:`);
        renderCategoryMenu(matchedCategory);
      });
    } else {
      unmatchedCount++;
      if (unmatchedCount >= 3) {
        triggerSmartRedirectRule();
      } else {
        showTypingIndicator(() => {
          const bubbleHtml = `
            <p>Sorry, I can currently assist only with predefined construction-related topics.</p>
            <a href="contact.html" class="inline-block mt-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#F5A623] to-[#D4891A] text-white text-[11px] font-semibold shadow-md hover:scale-105 active:scale-95 transition-all text-center">Contact MONOME Team</a>
          `;
          addBotMessage(bubbleHtml);
          // Quick reply option to help user navigate back
          renderQuickReplies([{ text: "🏠 Main Menu", key: "Main Menu" }], (opt) => {
            addUserMessage("🏠 Main Menu");
            showTypingIndicator(() => {
              addBotMessage("Select a topic to get quick details:");
              renderMainMenu();
            });
          });
        });
      }
    }
  }

  // Triggers smart redirect logic on 3 failed attempts or extremely long inputs
  function triggerSmartRedirectRule() {
    unmatchedCount = 0; // Reset count
    showTypingIndicator(() => {
      const bubbleHtml = `
        <p class="font-semibold text-brand-orange">Need custom discussion? 🤝</p>
        <p class="mt-1">For detailed project discussions, our team can assist you better.</p>
        <a href="contact.html" class="inline-block mt-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F5A623] to-[#D4891A] text-white text-[11px] font-semibold shadow-md hover:scale-105 active:scale-95 transition-all text-center">Go To Contact Page</a>
      `;
      addBotMessage(bubbleHtml);
      renderQuickReplies([{ text: "🏠 Main Menu", key: "Main Menu" }], (opt) => {
        addUserMessage("🏠 Main Menu");
        showTypingIndicator(() => {
          addBotMessage("Select a topic to get quick details:");
          renderMainMenu();
        });
      });
    });
  }

  // Renders bottom quick replies
  function renderQuickReplies(optionsArray, callback) {
    const container = document.getElementById("monome-chatbot-options");
    if (!container) return;

    container.innerHTML = "";
    optionsArray.forEach(opt => {
      const button = document.createElement("button");
      button.className = "text-[12px] px-3.5 py-1.5 rounded-full border border-[#F5A623]/30 dark:border-[#F5A623]/20 text-[#F5A623] hover:bg-[#F5A623] hover:text-white dark:hover:bg-[#F5A623]/25 transition-all duration-200 cursor-pointer bg-white/90 dark:bg-neutral-800/90 font-medium shadow-sm hover:scale-105 active:scale-95";
      button.innerHTML = opt.text;
      button.addEventListener("click", () => {
        callback(opt);
      });
      container.appendChild(button);
    });

    // Auto-scroll options container to left/top
    const parentContainer = document.getElementById("monome-chatbot-options-container");
    if (parentContainer) parentContainer.scrollTop = 0;
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
    }, 700 + Math.random() * 300); // 700ms - 1000ms delay for realism
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

  // Wait for document to load, then initialize
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
