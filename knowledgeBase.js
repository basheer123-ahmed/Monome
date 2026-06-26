// 70 Semantic Intents for MONOME Construction Assistant (Tuned and Refined)

export const intents = [
  {
    id: "greetings",
    keywords: {
      primary: ["greetings", "hello", "hi", "hey", "yo", "morning", "afternoon", "evening", "hola", "hai", "helo", "how_are_you", "good_morning", "good_afternoon", "good_evening"],
      secondary: ["assistant", "someone", "there"],
      support: ["please", "help"]
    },
    synonyms: ["greet", "welcome"],
    common_misspellings: ["hllo", "heyy", "hlo"],
    threshold: 8,
    answer: "Hello! Welcome to MONOME Constructions. We are delighted to assist you. How can we help you build your dream project today?",
    suggested_followups: ["🏢 Construction Process", "📊 Cost Estimate", "📱 Book Consultation"]
  },
  {
    id: "goodbye",
    keywords: {
      primary: ["bye", "goodbye", "see you", "farewell", "exit", "stop", "close", "see_you"],
      secondary: ["later", "night"],
      support: ["thanks", "thank you"]
    },
    synonyms: ["leave", "quit"],
    common_misspellings: ["byy", "gdbye"],
    threshold: 8,
    answer: "Thank you for visiting MONOME Constructions. Have a wonderful day ahead! Feel free to reach out whenever you're ready to start building.",
    suggested_followups: ["🏢 Main Menu", "📞 Contact Info"]
  },
  {
    id: "gratitude",
    keywords: {
      primary: ["thanks", "thank you", "appreciate", "grateful", "glad", "awesome", "perfect", "thank_you"],
      secondary: ["help", "info", "assistance"],
      support: ["much", "lot"]
    },
    synonyms: ["thank", "merci"],
    common_misspellings: ["thx", "ty", "tnx", "thankyou"],
    threshold: 8,
    answer: "You are very welcome! At MONOME, we are committed to delivering the highest quality and transparency. Let me know if you need help with anything else.",
    suggested_followups: ["🏢 Main Menu", "📊 Cost Estimate"]
  },
  {
    id: "acknowledgement",
    keywords: {
      primary: ["ok", "okay", "got it", "gotit", "cool", "nice", "fine", "sure", "noted", "great", "perfect"],
      secondary: ["understand", "thanks", "assistant"],
      support: ["please", "help"]
    },
    synonyms: ["acknowledge", "agree"],
    common_misspellings: ["k", "kk", "okey", "okayy"],
    threshold: 8,
    answer: "Great! Let me know if you have any questions about our projects, structural workflow, materials, or pricing estimation.",
    suggested_followups: ["🏢 Main Menu", "📊 Cost Estimate"]
  },
  {
    id: "bot_identity",
    keywords: {
      primary: ["who", "identity", "bot", "name", "assistant", "what are you", "who_are_you", "what_is_your_name"],
      secondary: ["monome", "virtual"],
      support: ["created", "developer"]
    },
    synonyms: ["avatar", "profile"],
    common_misspellings: ["whoareyou", "watareyou"],
    threshold: 8,
    answer: "I am the MONOME Construction Assistant, a specialized rule-based intelligence designed to guide you through our end-to-end turnkey construction, engineering, materials, and architectural services.",
    suggested_followups: ["🏢 About MONOME", "🏢 Construction Process"]
  },
  {
    id: "about_monome",
    keywords: {
      primary: ["about", "company", "firm", "profile", "history", "what_is_monome"],
      secondary: ["monome", "detail", "information", "background"],
      support: ["specialty", "quality"]
    },
    synonyms: ["monome constructions", "who is monome", "about monome"],
    common_misspellings: ["monom", "monomee"],
    threshold: 8,
    answer: "MONOME Constructions is a premier, tech-enabled turnkey construction company in Bengaluru. We specialize in luxury residential homes, villas, commercial spaces, and premium interiors with an emphasis on transparency, 24/7 live site tracking, and premium materials.",
    suggested_followups: ["🏢 Construction Process", "💎 Premium Materials", "📊 Cost Estimate"]
  },
  {
    id: "working_hours",
    keywords: {
      primary: ["hours", "timings", "open"],
      secondary: ["office", "corporate", "desk", "schedule", "days"],
      support: ["sunday", "saturday", "weekday", "time"]
    },
    synonyms: ["operation hours", "business hours"],
    common_misspellings: ["timngs", "openings"],
    threshold: 8,
    answer: "Our corporate desk and construction offices are open from Monday to Saturday, 9:00 AM to 7:00 PM (IST). We are closed on Sundays.",
    suggested_followups: ["📞 Contact Us", "🏢 Office Location"]
  },
  {
    id: "office_location",
    keywords: {
      primary: ["location", "office", "address", "where", "located", "hq", "office_address"],
      secondary: ["bengaluru", "bangalore", "area"],
      support: ["cross", "layout", "find"]
    },
    synonyms: ["office map", "reach office"],
    common_misspellings: ["locaton", "adrs", "addres"],
    threshold: 8,
    answer: "Our main corporate office is located at: <strong>Vasavi Nilaya, No 34, Gururaja Layout, 3rd Cross, Banashankari, Bengaluru - 560085</strong>.",
    suggested_followups: ["📞 Contact Us", "🏢 Working Hours"]
  },
  {
    id: "contact_info",
    keywords: {
      primary: ["contact", "call", "phone", "email", "whatsapp", "number", "phone_number", "whatsapp_details"],
      secondary: ["reach", "connect", "discuss", "consultation"],
      support: ["direct", "mobile", "mail"]
    },
    synonyms: ["touch", "inquiry"],
    common_misspellings: ["contct", "phne", "whatapp"],
    threshold: 8,
    answer: "You can reach us directly via Phone/WhatsApp at <strong>+91 96209 74224</strong>, or email us at <strong>monomeconstructions@zohomail.in</strong>. You can also visit our Contact page to fill out a project inquiry form.",
    suggested_followups: ["📱 Book Consultation", "🏢 Main Menu"]
  },
  {
    id: "careers",
    keywords: {
      primary: ["career", "job", "hiring", "join", "employment", "recruitment", "resume", "are_you_hiring", "careers_at", "join_your", "work_at"],
      secondary: ["engineer", "architect", "designer", "internship"],
      support: ["apply", "send", "cv"]
    },
    synonyms: ["vacancy", "opening"],
    common_misspellings: ["carer", "jobs", "hireing"],
    threshold: 8,
    answer: "We are always looking for passionate architects, civil engineers, project managers, and interior designers to join our growing team. Please send your resume and portfolio CV to <strong>monomeconstructions@zohomail.in</strong>.",
    suggested_followups: ["🏢 About MONOME", "📞 Contact Us"]
  },
  {
    id: "residential_construction",
    keywords: {
      primary: ["residential", "house", "home", "building", "residence"],
      secondary: ["construct", "build"],
      support: ["plan", "design", "package"]
    },
    synonyms: ["home building", "residential construct"],
    common_misspellings: ["residntial", "hous", "homm"],
    threshold: 8,
    answer: "MONOME specializes in luxury residential construction, delivering customized villas, independent homes, duplexes, and premium apartments. We manage everything from excavation, structure framing (Fe-550 TMT Steel & M25 Concrete), to premium interior and luxury finishings.",
    suggested_followups: ["📊 Cost Estimate", "🏢 Construction Process", "📐 Vastu Design"]
  },
  {
    id: "commercial_construction",
    keywords: {
      primary: ["commercial", "office", "shop", "retail", "showroom", "warehouse", "mall"],
      secondary: ["building", "construct", "space", "complex"],
      support: ["workplace", "industrial", "business"]
    },
    synonyms: ["office building", "shop construction"],
    common_misspellings: ["comercial", "ofice", "warehous"],
    threshold: 8,
    answer: "We offer end-to-end commercial construction services, including modern corporate offices, retail stores, showrooms, warehouses, and industrial structures. Our commercial projects are optimized for space utilization, compliance, and structural longevity.",
    suggested_followups: ["📊 Cost Estimate", "📞 Book Consultation"]
  },
  {
    id: "institutional_construction",
    keywords: {
      primary: ["institutional", "school", "college", "hospital", "clinic", "institution"],
      secondary: ["building", "construct", "education", "medical"],
      support: ["safety", "standard", "code"]
    },
    synonyms: ["school construction", "hospital building"],
    common_misspellings: ["insttutional", "scool", "hospitl"],
    threshold: 8,
    answer: "MONOME undertakes institutional construction projects, including school and college campuses, healthcare facilities, and clinics, adhering strictly to institutional building codes, safety rules, and high-durability specifications.",
    suggested_followups: ["📞 Book Consultation", "🛡️ Safety Standards"]
  },
  {
    id: "villa_construction",
    keywords: {
      primary: ["villa", "bungalow", "mansion", "custom villa"],
      secondary: ["luxury", "premium", "construct", "design"],
      support: ["pool", "lawn", "automation"]
    },
    synonyms: ["luxury villa", "custom home"],
    common_misspellings: ["villaa", "bunglo", "luxry"],
    threshold: 8,
    answer: "Our Villa Construction desk designs and builds custom luxury villas. From infinity pools, home automation, double-height ceilings, to bespoke landscaped gardens, we translate your vision into a structural masterpiece.",
    suggested_followups: ["📊 Cost Estimate", "🏢 Construction Process", "📐 Vastu Design"]
  },
  {
    id: "independent_houses",
    keywords: {
      primary: ["independent", "individual", "own plot", "independent_house"],
      secondary: ["house", "home", "construct", "build"],
      support: ["packages", "stages", "cost"]
    },
    synonyms: ["individual house", "private home"],
    common_misspellings: ["indepndent", "indivdual"],
    threshold: 8,
    answer: "We build bespoke independent houses on self-owned plots. We handle all approvals, structural designs, core construction, plumbing, electrical, and finishing works, giving you a completely hassle-free turnkey experience.",
    suggested_followups: ["📊 Cost Estimate", "🏢 Construction Process"]
  },
  {
    id: "apartments",
    keywords: {
      primary: ["apartment", "apartments", "flat", "flats", "multistory", "residential block"],
      secondary: ["building", "construct", "project", "complex"],
      support: ["contract", "duration", "timeline"]
    },
    synonyms: ["flat construction", "apartment block"],
    common_misspellings: ["aprtment", "flts", "multistorey"],
    threshold: 8,
    answer: "MONOME constructs premium residential apartments and multi-story blocks. We employ high-performance structural systems, advanced formwork, and strict quality checks to ensure long-term durability and safety.",
    suggested_followups: ["📊 Cost Estimate", "📞 Book Consultation"]
  },
  {
    id: "duplex_houses",
    keywords: {
      primary: ["duplex", "double", "multifloor", "two floor", "g+1", "g+2", "ground_plus_one", "ground_plus_two"],
      secondary: ["house", "home", "construct", "build"],
      support: ["staircase", "vastu", "cost"]
    },
    synonyms: ["duplex home", "double floor house"],
    common_misspellings: ["duplexx", "gplus1", "gplus2"],
    threshold: 8,
    answer: "We specialize in duplex and multi-floor residential structures that optimize natural light, ventilation, and family spaces. Our designs include internal staircases, double-height living areas, and Vastu-compliant layouts.",
    suggested_followups: ["📊 Cost Estimate", "📐 Vastu Design"]
  },
  {
    id: "turnkey_construction",
    keywords: {
      primary: ["turnkey", "turnkey_construction", "end-to-end", "complete", "all-in-one"],
      secondary: ["construct", "build", "contract", "service"],
      support: ["approvals", "material", "labor"]
    },
    synonyms: ["turn key", "complete house contract"],
    common_misspellings: ["trnkey", "turnky"],
    threshold: 8,
    answer: "Our signature Turnkey Construction covers everything: architectural blueprints, government approvals, structural design, excavation, core RCC framing, plumbing/electrical routing, premium plastering, flooring, painting, and interior handovers. We provide a single point of contact and absolute pricing transparency.",
    suggested_followups: ["🏢 Construction Process", "📊 Cost Estimate", "💎 Premium Materials"]
  },
  {
    id: "renovation",
    keywords: {
      primary: ["renovation", "renovate", "remodel", "retrofitting", "repair", "restoration"],
      secondary: ["house", "office", "kitchen", "bathroom"],
      support: ["upgrade", "makeover", "cost"]
    },
    synonyms: ["remodeling", "fixing house"],
    common_misspellings: ["rennovation", "renovaton", "remodl"],
    threshold: 8,
    answer: "Whether it is a structural upgrade, spatial redesign, kitchen remodel, or complete home renovation, MONOME provides high-durability retrofitting and remodeling services. We breathe new life into existing structures with minimal disruption.",
    suggested_followups: ["📊 Cost Estimate", "🎨 Interior Design"]
  },
  {
    id: "interior_design",
    keywords: {
      primary: ["interior", "interiors", "aesthetic", "wardrobes", "cupboard", "ceiling", "living_room", "living room"],
      secondary: ["design", "home", "room", "kitchen"],
      support: ["wood", "plywood", "finish", "false_ceiling", "false ceiling"]
    },
    synonyms: ["interior works", "home design"],
    common_misspellings: ["intr-ior", "interor", "aestheticc"],
    threshold: 8,
    answer: "Our Interior Design division crafts customized spatial experiences. We design and install modern modular kitchens, custom wardrobes, false ceilings, luxury lighting, and bespoke furniture with premium finishes.",
    suggested_followups: ["🍳 Modular Kitchen", "🛠️ False Ceiling", "🎨 Exterior Design"]
  },
  {
    id: "exterior_design",
    keywords: {
      primary: ["exterior", "facade", "elevation", "building_elevation", "cladding"],
      secondary: ["design", "house", "lighting", "front"],
      support: ["gate", "outdoor", "compound"]
    },
    synonyms: ["front elevation", "exterior look"],
    common_misspellings: ["exteror", "elevaton", "facad"],
    threshold: 8,
    answer: "We specialize in modern exterior elevations, glass facades, composite cladding, compound walls, and architectural lighting to give your building an iconic street presence and superior weather protection.",
    suggested_followups: ["🎨 Interior Design", "🏞️ Landscaping"]
  },
  {
    id: "architecture",
    keywords: {
      primary: ["architecture", "architect", "floorplan", "structural_design", "blueprint", "3d", "rendering"],
      secondary: ["design", "layout"],
      support: ["plan", "space", "map", "fee"]
    },
    synonyms: ["floor plan", "house design plan"],
    common_misspellings: ["archtect", "architectur", "blueprintt"],
    threshold: 8,
    answer: "Our in-house architecture desk prepares custom floor plans, structural layouts, and high-fidelity 3D exterior/interior renderings, ensuring optimal space planning, natural light, and structural feasibility before ground is broken.",
    suggested_followups: ["📐 Vastu Design", "🏢 Construction Process"]
  },
  {
    id: "structural_engineering",
    keywords: {
      primary: ["structural", "engineering", "foundation", "rcc", "columns", "beams", "structural_design", "load_bearing_wall"],
      secondary: ["design", "stability", "load", "seismic"],
      support: ["calculations", "steel", "concrete"]
    },
    synonyms: ["structural design", "foundation design"],
    common_misspellings: ["structur", "engineerg", "colmns"],
    threshold: 8,
    answer: "MONOME's structural engineering team designs safe, robust foundations and RCC frameworks (columns, beams, slabs). We utilize advanced software to run load calculations, ensuring seismic stability and long-term durability.",
    suggested_followups: ["💎 Premium Materials", "🏢 Construction Process"]
  },
  {
    id: "site_inspection",
    keywords: {
      primary: ["inspection", "site_inspection", "visit", "soil", "survey", "site visit"],
      secondary: ["measure", "level", "boundary", "engineer"],
      support: ["test", "land", "plot"]
    },
    synonyms: ["soil test", "site measure"],
    common_misspellings: ["inspecon", "sitevisit", "survy"],
    threshold: 8,
    answer: "Before starting any project, our senior engineers conduct a comprehensive site inspection. We analyze soil quality, check ground levels, inspect access roads, and measure boundary lines to ensure flawless construction planning.",
    suggested_followups: ["🏢 Construction Process", "📊 Cost Estimate"]
  },
  {
    id: "construction_timeline",
    keywords: {
      primary: ["timeline", "duration", "time", "schedule", "period", "months", "how_long"],
      secondary: ["construct", "build", "handover", "completion", "project"],
      support: ["villa", "delay", "house", "duplex", "apartment", "commercial", "G+1", "G+2", "ground_plus_one", "ground_plus_two"]
    },
    synonyms: ["how long", "project duration"],
    common_misspellings: ["timline", "completin", "duraton"],
    threshold: 8,
    answer: "A typical independent residential house construction takes 8 to 12 months. Smaller projects or renovations take 3 to 6 months, while luxury villas may span 12 to 18 months, depending on scope and finish levels.",
    suggested_followups: ["🏢 Construction Process", "📱 Live Project Tracking"]
  },
  {
    id: "project_workflow",
    keywords: {
      primary: ["workflow", "process", "phases", "stages", "project_workflow", "workflow steps"],
      secondary: ["turnkey", "construction", "excavation", "plinth"],
      support: ["step", "sequence", "how it works", "steps"]
    },
    synonyms: ["steps of construction", "construction phases"],
    common_misspellings: ["workflw", "procs", "stagse"],
    threshold: 8,
    answer: "Our 7-Step Turnkey Process:<br>1. Consultation & Design Alignment<br>2. Comprehensive Site Inspection<br>3. Vastu-Compliant 3D Plans & Architectural Blueprints<br>4. Detailed Pricing & Structural Estimation<br>5. Concrete Rebar & Load-Bearing Framing Construction<br>6. Luxury Finishes & Premium Interior Integration<br>7. Quality Inspection Checklists & Handover.",
    suggested_followups: ["📊 Cost Estimate", "💎 Premium Materials", "📱 Live Project Tracking"]
  },
  {
    id: "project_tracking",
    keywords: {
      primary: ["tracking", "portal", "camera", "live", "cctv", "stream", "project_tracking"],
      secondary: ["updates", "photos", "progress", "app"],
      support: ["client", "cctv stream", "daily"]
    },
    synonyms: ["live camera site", "track my build"],
    common_misspellings: ["trcking", "portl", "cctvv"],
    threshold: 8,
    answer: "We offer absolute transparency with our client portal. You get 24/7 access to live HD CCTV feeds of your construction site, daily progress photologs, phase completion reports, and direct chat channels with your site engineers.",
    suggested_followups: ["🏢 Construction Process", "📞 Book Consultation"]
  },
  {
    id: "construction_cost",
    keywords: {
      primary: ["cost", "price", "pricing", "budget", "cost_per_square_foot", "construction_estimate", "how_much"],
      secondary: ["residential", "house", "home"],
      support: ["sqft", "square feet", "charges", "estimate", "build", "package"]
    },
    synonyms: ["construction price", "price per sqft", "expensive", "how expensive"],
    common_misspellings: ["constrction cost", "pricingg"],
    threshold: 8,
    answer: "Our residential construction packages start from <strong>₹1,800 to ₹2,500+ per sq.ft.</strong> depending on structural specifications and luxury finish choices. This includes architectural designs, approvals assistance, raw materials, labor, and basic interiors.",
    suggested_followups: ["📊 Cost Estimate", "📋 Detailed Quotation", "💎 Premium Materials"]
  },
  {
    id: "budget_planning",
    keywords: {
      primary: ["budget", "budget_planning", "finance", "expense", "overruns"],
      secondary: ["planning", "advisor", "breakdown", "savings"],
      support: ["cost", "materials", "optimize", "how_to", "house", "home", "build", "construction"]
    },
    synonyms: ["cost planning", "budget optimization", "budget planning", "how to budget"],
    common_misspellings: ["budjet planning", "financee"],
    threshold: 8,
    answer: "We assist clients with detailed cost breakdowns to prevent budget overruns. We advise on optimizing materials, structural layouts, and finishes, ensuring a premium build that stays within your financial comfort zone.",
    suggested_followups: ["📊 Cost Estimate", "💳 Payment Process"]
  },
  {
    id: "quotation",
    keywords: {
      primary: ["quotation", "quote", "detailed_quotation", "estimate"],
      secondary: ["cost", "price", "dimensions", "area", "g+1", "g+2", "ground_plus_one", "ground_plus_two", "villa", "independent_house", "apartment"],
      support: ["free", "request", "draft", "build", "house", "villa", "duplex", "apartment", "commercial"]
    },
    synonyms: ["project quotation", "price quote", "quotation", "quote", "quatation"],
    common_misspellings: ["quotaion", "qotetion"],
    threshold: 8,
    answer: "To provide a highly accurate project quotation, we need your plot dimensions, desired floor area, and choice of materials. Contact our engineering desk to schedule a detailed requirement gathering session for a free custom quotation.",
    suggested_followups: ["📞 Book Consultation", "📊 Cost Estimate"]
  },
  {
    id: "payment_process",
    keywords: {
      primary: ["payment", "milestone", "installment", "payment_process"],
      secondary: ["schedule", "stage", "advance", "transparency"],
      support: ["contract", "milestones", "signing"]
    },
    synonyms: ["payment terms", "how to pay"],
    common_misspellings: ["paymnt", "instalment"],
    threshold: 8,
    answer: "Our payments are linked directly to construction milestones (e.g., Signing, Foundation, Plinth, Slabs, Brickwork, Plastering, and Handovers). This guarantees that you only pay for completed work, ensuring security and project momentum.",
    suggested_followups: ["📈 Loans & EMI", "📊 Cost Estimate"]
  },
  {
    id: "materials",
    keywords: {
      primary: ["material", "materials", "brands", "specifications", "quality"],
      secondary: [],
      support: ["structural", "brand names", "finishes", "cement", "steel", "concrete", "bricks"]
    },
    synonyms: ["raw materials", "spec list"],
    common_misspellings: ["matrials", "brandz", "specficaons"],
    threshold: 8,
    answer: "At MONOME, we use premium raw materials: Ultratech/ACC cement, Fe-550D TMT steel rebar (TATA Tiscon/JSW), high-grade bricks, solid blockwork, and fine M-sand. Finish materials include premium marble/granite, Kajaria tiles, Asian Paints, and Jaguar bath fittings.",
    suggested_followups: ["💎 Steel Quality", "💎 Concrete Grade", "💎 Cement Brands"]
  },
  {
    id: "cement",
    keywords: {
      primary: ["cement", "acc", "ultratech", "birla"],
      secondary: ["opc", "ppc", "plastering", "masonry", "brand", "brands"],
      support: ["grade", "concrete", "binding"]
    },
    synonyms: ["cement brands", "cement type"],
    common_misspellings: ["cemnt", "ultratechh"],
    threshold: 8,
    answer: "We utilize top-tier cement brands like ACC, Ultratech, or Birla Super. We specify OPC 53 Grade for high-strength concrete structures and PPC for plastering works to ensure crack-free, highly durable surfaces.",
    suggested_followups: ["💎 Concrete Grade", "💎 Materials List"]
  },
  {
    id: "concrete",
    keywords: {
      primary: ["concrete", "m20", "m25", "slab", "curing", "reinforced_cement_concrete", "grade"],
      secondary: ["mix", "strength", "columns", "beams"],
      support: ["casting", "foundation", "vibrator"]
    },
    synonyms: ["concrete mix", "rcc slab"],
    common_misspellings: ["concret", "m-25", "curg"],
    threshold: 8,
    answer: "We mandate minimum M20/M25 grade concrete mixes for all columns, beams, slabs, and foundations. We implement strict curing practices and use concrete vibrators to prevent voids, ensuring maximum structural load-bearing capacity.",
    suggested_followups: ["💎 Cement Brands", "💎 Steel Quality"]
  },
  {
    id: "steel",
    keywords: {
      primary: ["steel", "tmt", "rebar", "iron", "tata", "tiscon", "jsw"],
      secondary: ["fe550", "fe550d", "rods", "structural", "grade"],
      support: ["earthquake", "strength", "thickness"]
    },
    synonyms: ["tmt steel rebars", "iron rods"],
    common_misspellings: ["steeel", "rebarr", "tiscn"],
    threshold: 8,
    answer: "We use only premium, high-ductility Fe-550D Grade TMT Steel Rebar from leading manufacturers like TATA Tiscon or JSW Neosteel. This guarantees excellent earthquake resistance, structural integrity, and rust protection.",
    suggested_followups: ["💎 Concrete Grade", "💎 Materials List"]
  },
  {
    id: "bricks",
    keywords: {
      primary: ["brick", "bricks", "clay", "clay brick", "red brick"],
      secondary: ["masonry", "wall", "clay bricks"],
      support: ["quality", "insulation", "thermal"]
    },
    synonyms: ["red clay bricks", "brick masonry"],
    common_misspellings: ["brik", "briks", "claye"],
    threshold: 8,
    answer: "We offer both premium red clay bricks and high-density wire-cut bricks. Red clay bricks provide exceptional thermal insulation, keeping houses cooler in summer and warmer in winter.",
    suggested_followups: ["🧱 Blocks & Masonry", "💎 Materials List"]
  },
  {
    id: "blocks",
    keywords: {
      primary: ["block", "blocks", "aac", "solid blocks", "lightweight blocks"],
      secondary: ["concrete blocks", "masonry", "partitioning"],
      support: ["speed", "soundproof", "fireproof"]
    },
    synonyms: ["lightweight block", "concrete block"],
    common_misspellings: ["blok", "bloks", "aacc"],
    threshold: 8,
    answer: "For internal partitioning and high-speed execution, we use premium solid concrete blocks and Autoclaved Aerated Concrete (AAC) blocks. AAC blocks are lightweight, eco-friendly, and offer outstanding sound and fire resistance.",
    suggested_followups: ["🧱 Bricks & Clay", "💎 Materials List"]
  },
  {
    id: "sand",
    keywords: {
      primary: ["sand", "msand", "psand", "m-sand", "p-sand"],
      secondary: ["plastering", "river sand", "washed"],
      support: ["binding", "mortar", "purity"]
    },
    synonyms: ["manufactured sand", "plastering sand"],
    common_misspellings: ["snd", "m sand", "p sand"],
    threshold: 8,
    answer: "We use triple-washed Manufactured Sand (M-Sand) for concrete works and fine Plastering Sand (P-Sand) for smooth internal walls, ensuring high binding strength and clean finish quality without river sand impurities.",
    suggested_followups: ["💎 Concrete Grade", "💎 Materials List"]
  },
  {
    id: "aggregate",
    keywords: {
      primary: ["aggregate", "aggregates", "jelly", "metal", "stone", "gravel"],
      secondary: ["blue metal", "crushed", "size"],
      support: ["20mm", "12mm", "concrete mix"]
    },
    synonyms: ["blue metal", "crushed stone"],
    common_misspellings: ["agregate", "jellie"],
    threshold: 8,
    answer: "We use hard, crushed granite blue metal aggregates (20mm for RCC framing and 12mm for minor structural elements) to guarantee maximum interlocking strength in concrete mixtures.",
    suggested_followups: ["💎 Concrete Grade", "💎 Materials List"]
  },
  {
    id: "roofing",
    keywords: {
      primary: ["roofing", "roof", "roofs", "ceiling", "slab"],
      secondary: ["sloped", "mangalore tiles", "shingle", "shingles"],
      support: ["sheets", "profile", "concrete slab"]
    },
    synonyms: ["slab roofing", "roof tile design"],
    common_misspellings: ["rof", "rofs", "slabb"],
    threshold: 8,
    answer: "Our roofing solutions range from premium RCC slabs with state-of-the-art waterproofing, to custom sloped roofs finished with Mangalore tiles, shingle roofs, or modern profile sheet installations.",
    suggested_followups: ["💧 Waterproofing", "💎 Materials List"]
  },
  {
    id: "waterproofing",
    keywords: {
      primary: ["waterproofing", "waterproof", "leak", "leakage", "waterproof_coating"],
      secondary: ["terrace", "bathroom", "balcony", "sump"],
      support: ["dr fixit", "fosroc", "ponding test"]
    },
    synonyms: ["leakage protection", "seepage coating"],
    common_misspellings: ["watrproofing", "leakge", "seepagee"],
    threshold: 8,
    answer: "We implement multi-layer waterproofing on terraces, bathrooms, balconies, and sumps using Dr. Fixit or Fosroc compounds. We perform 48-hour waterponding tests to guarantee 100% leak-proof handovers.",
    suggested_followups: ["💎 Materials List", "🏢 Construction Process"]
  },
  {
    id: "painting",
    keywords: {
      primary: ["painting", "paint", "paints", "asian paints", "royale"],
      secondary: ["putty", "primer", "emulsion", "exterior", "interior"],
      support: ["apex", "coating", "coats"]
    },
    synonyms: ["wall painting", "paint coat specifications"],
    common_misspellings: ["panting", "paints", "asianpaints"],
    threshold: 8,
    answer: "We provide high-end interior and exterior painting. We apply 2 coats of premium acrylic putty, 1 coat of primer, and 2 coats of luxury emulsions like Asian Paints Royale (interior) and Apex Ultima (exterior) for durable, washable finishes.",
    suggested_followups: ["🎨 Interior Design", "💎 Materials List"]
  },
  {
    id: "flooring",
    keywords: {
      primary: ["flooring", "floor", "floors", "marble", "granite", "wood", "tiles"],
      secondary: ["vitrified", "italian marble", "laminate", "staircase"],
      support: ["grout", "adhesives", "polishing"]
    },
    synonyms: ["flooring options", "granite stairs"],
    common_misspellings: ["floring", "tils", "italianmarb"],
    threshold: 8,
    answer: "We offer extensive flooring options: premium vitrified tiles, Italian marble, local granite, natural wood, and high-durability wooden laminates, installed with clean grout joints and high-grade tile adhesives.",
    suggested_followups: ["🧱 Tiles", "🧱 Marble & Granite"]
  },
  {
    id: "tiles",
    keywords: {
      primary: ["tile", "tiles", "vitrified", "kajaria", "somany", "nitco"],
      secondary: ["ceramic", "anti-skid", "bathroom", "floor tiles"],
      support: ["adhesives", "cladding", "design"]
    },
    synonyms: ["ceramic tiles", "kajaria floor tiles"],
    common_misspellings: ["tils", "kajari"],
    threshold: 8,
    answer: "We use premium vitrified and ceramic tiles from trusted brands like Kajaria, Somany, or Nitco, ranging from large-format living room tiles to anti-skid bathroom floor tiles.",
    suggested_followups: ["🧱 Flooring Options", "🧱 Marble & Granite"]
  },
  {
    id: "granite",
    keywords: {
      primary: ["granite", "granites", "countertop", "staircase", "window sill"],
      secondary: ["polish", "slabs", "kitchen countertop"],
      support: ["black", "grey", "durability"]
    },
    synonyms: ["kitchen granite", "granite steps"],
    common_misspellings: ["granit", "staircas"],
    threshold: 8,
    answer: "We use high-polish, premium local granite for kitchen countertops, staircases, and window sills. Granite is highly recommended for countertops due to its scratch and heat resistance.",
    suggested_followups: ["🧱 Flooring Options", "🍳 Modular Kitchen"]
  },
  {
    id: "marble",
    keywords: {
      primary: ["marble", "marbles", "italian_marble", "italian"],
      secondary: ["flooring", "slabs", "polishing"],
      support: ["premium", "white", "luxury", "cost", "price"]
    },
    synonyms: ["luxury marble", "italian flooring"],
    common_misspellings: ["marbl", "marbel", "italin"],
    threshold: 8,
    answer: "We supply and install premium Indian and Italian marble for living rooms and entryways. Marble offers a jointless, luxurious appearance when polished to a high-mirror finish.",
    suggested_followups: ["🧱 Flooring Options", "🧱 Tiles"]
  },
  {
    id: "wood",
    keywords: {
      primary: ["wood", "wooden", "teak", "sal wood", "hone wood"],
      secondary: ["plywood", "laminate", "veneer", "doors"],
      support: ["frames", "shutter", "marine plywood"]
    },
    synonyms: ["teak door frame", "plywood cabinet"],
    common_misspellings: ["wod", "teakk", "plywod"],
    threshold: 8,
    answer: "We use premium teak wood, sal wood, or hone wood for main door frames and shutters. For wardrobes and cabinets, we use high-grade marine plywood finished with premium laminates or veneers.",
    suggested_followups: ["🚪 Custom Wardrobes", "🎨 Interior Design"]
  },
  {
    id: "false_ceiling",
    keywords: {
      primary: ["ceiling", "false_ceiling", "gypsum", "pop", "Saint-Gobain"],
      secondary: ["led", "cove", "spotlights", "design"],
      support: ["metal framework", "living room", "office"]
    },
    synonyms: ["gypsum ceiling", "pop design"],
    common_misspellings: ["celing", "falseceling", "gypsm"],
    threshold: 8,
    answer: "Our false ceilings are crafted using premium Saint-Gobain Gypsum boards, metal frameworks, or custom wooden paneling. We incorporate elegant LED cove lights and spotlights for a warm, modern luxury ambiance.",
    suggested_followups: ["🎨 Interior Design", "💡 Electrical Work"]
  },
  {
    id: "electrical",
    keywords: {
      primary: ["electrical", "wiring", "switch", "switches", "legrand", "anchor", "schneider"],
      secondary: ["wire", "conduits", "copper", "mcb"],
      support: ["fire-retardant", "safety", "load distribution"]
    },
    synonyms: ["house wiring", "modular switches"],
    common_misspellings: ["electrial", "wirng", "switche"],
    threshold: 8,
    answer: "We use fire-retardant copper wiring from brands like Finolex or Havells, run through heavy-duty PVC conduits. Switchboards are fitted with modern modular switches from Legrand, Anchor, or Schneider.",
    suggested_followups: ["🎨 Interior Design", "🛠️ False Ceiling"]
  },
  {
    id: "plumbing",
    keywords: {
      primary: ["plumbing", "pipes", "pipe", "fittings", "jaguar", "kohler", "ashirvad", "astral"],
      secondary: ["cpvc", "upvc", "sanitary", "leakage"],
      support: ["drainage", "water sumps", "taps"]
    },
    synonyms: ["cpvc pipes", "bath fittings"],
    common_misspellings: ["plumbr", "pipse", "ashirvadd"],
    threshold: 8,
    answer: "We install CPVC/UPVC pipe networks from Astral or Ashirvad to ensure leak-free plumbing. Sanitary ware and bath fittings are sourced from luxury brands like Jaguar, Hindware, or Kohler.",
    suggested_followups: ["💧 Waterproofing", "🚿 Bathroom Renovation"]
  },
  {
    id: "hvac",
    keywords: {
      primary: ["hvac", "ac", "aircon", "air conditioning", "cooling"],
      secondary: ["split ac", "cassette ac", "vrv", "vrf"],
      support: ["copper piping", "drain lines", "ventilation"]
    },
    synonyms: ["central AC", "AC installation"],
    common_misspellings: ["hvacc", "air conditioningg"],
    threshold: 8,
    answer: "We design and install optimized HVAC systems, including split AC routing, cassette units, or complete VRV/VRF central cooling systems, incorporating neat copper piping and condensate drain lines.",
    suggested_followups: ["🎨 Interior Design", "📞 Book Consultation"]
  },
  {
    id: "kitchen",
    keywords: {
      primary: ["kitchen", "modular_kitchen", "cabinets", "pantry"],
      secondary: ["plywood", "bwp", "marine", "soft-close"],
      support: ["hettich", "hafele", "chimney", "granite countertop"]
    },
    synonyms: ["modular kitchen cabinets", "modular kitchen setup"],
    common_misspellings: ["kitchan", "modulr kitchen"],
    threshold: 8,
    answer: "MONOME modular kitchens feature water-resistant boiling waterproof (BWP) marine plywood, soft-close hardware (Hettich/Hafele), pull-out baskets, tall pantries, and chimneys, custom styled to maximize ergonomics and storage.",
    suggested_followups: ["🚪 Custom Wardrobes", "🧱 Marble & Granite"]
  },
  {
    id: "wardrobes",
    keywords: {
      primary: ["wardrobe", "wardrobes", "cupboard", "cupboards", "closet"],
      secondary: ["bwr plywood", "acrylic", "laminate", "sliding doors", "plywood"],
      support: ["walk-in closet", "tv unit", "soft-close hinges"]
    },
    synonyms: ["custom wardrobes", "bedroom cupboard"],
    common_misspellings: ["wardrob", "cupbord", "clost"],
    threshold: 8,
    answer: "We build custom wardrobes, walk-in closets, and TV units using high-durability BWR plywood finished with premium acrylic laminates, glass doors, and modular internal layouts with soft-close hinges.",
    suggested_followups: ["🍳 Modular Kitchen", "🚪 Wood Selection"]
  },
  {
    id: "landscape",
    keywords: {
      primary: ["landscape", "landscaping", "garden", "lawn", "vertical garden"],
      secondary: ["grass", "plants", "terrace garden", "water feature"],
      support: ["pathways", "outdoor", "aesthetic"]
    },
    synonyms: ["garden design", "house landscape"],
    common_misspellings: ["landscap", "gardn", "lawwn"],
    threshold: 8,
    answer: "Our landscaping desk designs bespoke vertical gardens, manicured lawns, water features, stone pathways, and terrace gardens, blending natural elements with modern architecture.",
    suggested_followups: ["🏊 Swimming Pool", "🎨 Exterior Design"]
  },
  {
    id: "compound_walls",
    keywords: {
      primary: ["compound", "boundary", "compound wall", "boundary wall", "wall"],
      secondary: ["solid blocks", "foundation", "plaster", "gate"],
      support: ["compound walls", "fencing", "height"]
    },
    synonyms: ["compound wall design", "boundary fence"],
    common_misspellings: ["compund", "boundry"],
    threshold: 8,
    answer: "We build high-strength compound boundary walls using solid concrete blocks on a robust concrete foundation, finished with plaster, weather-proof paint, and premium gate installations.",
    suggested_followups: ["🎨 Exterior Design", "🚗 Parking Space"]
  },
  {
    id: "parking",
    keywords: {
      primary: ["parking", "garage", "carport", "driveway"],
      secondary: ["paver", "pavers", "cobble", "epoxy"],
      support: ["ev charging", "electric vehicle", "charging point"]
    },
    synonyms: ["car parking space", "garage design"],
    common_misspellings: ["parkg", "drivway", "paverr"],
    threshold: 8,
    answer: "We plan spacious, functional car parks and driveways. We offer high-durability interlocking pavers, granite cobbles, or smooth epoxy-coated concrete floors, complete with electric vehicle (EV) charging provisions.",
    suggested_followups: ["☀️ Solar Systems", "🔒 Smart Home"]
  },
  {
    id: "lift",
    keywords: {
      primary: ["lift", "elevator", "lifts", "elevators"],
      secondary: ["otis", "kone", "schindler", "shaft"],
      support: ["duplex lift", "automatic doors", "safety switch"]
    },
    synonyms: ["home elevator", "shaft structure"],
    common_misspellings: ["liftt", "elevatr"],
    threshold: 8,
    answer: "We design and execute structural elevator shafts for residential duplexes and commercial buildings. We integrate automatic passenger lifts from premium brands like Schindler, Otis, or Kone.",
    suggested_followups: ["🏢 Construction Process", "📞 Book Consultation"]
  },
  {
    id: "swimming_pool",
    keywords: {
      primary: ["pool", "swimming", "swimming pool", "swimming_pool", "jacuzzi"],
      secondary: ["infinity pool", "rooftop pool", "filtration", "mosaic tiles"],
      support: ["waterproofing", "filtration plant", "pump room"]
    },
    synonyms: ["home pool", "private swimming pool"],
    common_misspellings: ["swiming", "pooll", "jacuzi"],
    threshold: 8,
    answer: "We construct premium inground pools, infinity pools, and rooftop pools, incorporating advanced water-ponding concrete structures, chemical treatment plants, filtration systems, and anti-slip mosaic tiles.",
    suggested_followups: ["🏞️ Landscaping", "🎨 Exterior Design"]
  },
  {
    id: "smart_home",
    keywords: {
      primary: ["smart", "automation", "smart_home", "automated"],
      secondary: ["smart lock", "lighting automation", "alexa", "google assistant"],
      support: ["motorized curtains", "cctv cameras", "sensors"]
    },
    synonyms: ["home automation", "smart systems"],
    common_misspellings: ["smrt", "automatn", "alexaa"],
    threshold: 8,
    answer: "We integrate state-of-the-art smart home systems, including automated lighting, motorized curtains, smart door locks, CCTV security integration, and voice control via Alexa/Google Assistant.",
    suggested_followups: ["💡 Electrical Work", "☀️ Solar Systems"]
  },
  {
    id: "solar",
    keywords: {
      primary: ["solar", "panels", "solar panels", "solar_panels", "solar system"],
      secondary: ["photovoltaic", "net metering", "rooftop solar", "solar heating"],
      support: ["electricity", "power grid", "hot water"]
    },
    synonyms: ["solar electricity", "solar heater", "solar panels", "solar system"],
    common_misspellings: ["solr", "solarpanl", "photovoltic"],
    threshold: 8,
    answer: "We install rooftop solar photovoltaic (PV) panel arrays for clean electricity generation and solar water heating systems, significantly reducing monthly utility bills.",
    suggested_followups: ["🌧️ Rainwater Harvesting", "🍃 Green Buildings"]
  },
  {
    id: "rainwater_harvesting",
    keywords: {
      primary: ["rainwater", "rainwater_harvesting", "rwh", "recharge well"],
      secondary: ["filtration", "groundwater recharge", "sump", "silt trap"],
      support: ["sand filter", "sustainability", "roof gutters"]
    },
    synonyms: ["rain harvesting", "groundwater filter"],
    common_misspellings: ["rainwatr", "rwhh", "rechargetrench"],
    threshold: 8,
    answer: "We install rainwater harvesting (RWH) filtration systems, linking rooftop gutters to silt traps, sand filters, and storage sumps or groundwater recharge wells to ensure water sustainability.",
    suggested_followups: ["☀️ Solar Systems", "🍃 Green Buildings"]
  },
  {
    id: "green_buildings",
    keywords: {
      primary: ["green", "green building", "green_buildings", "eco-friendly", "sustainable"],
      secondary: ["energy-saving", "carbon footprint", "fly-ash blocks", "low-voc paint"],
      support: ["double-glazed windows", "cladding", "environment"]
    },
    synonyms: ["eco-friendly building", "sustainable home"],
    common_misspellings: ["grenbuilding", "sustanable"],
    threshold: 8,
    answer: "MONOME design teams construct eco-friendly 'Green Buildings' using solar power, rainwater harvesting, fly-ash blocks, energy-efficient HVAC, double-glazed windows, and low-VOC paints to minimize carbon footprint.",
    suggested_followups: ["☀️ Solar Systems", "🌧️ Rainwater Harvesting"]
  },
  {
    id: "vastu",
    keywords: {
      primary: ["vastu", "vasthu", "shastra", "directions"],
      secondary: ["east facing", "north facing", "quadrants", "entrance"],
      support: ["kitchen positioning", "master bedroom", "energy flow"]
    },
    synonyms: ["vastu layout", "vasthu shastra plans"],
    common_misspellings: ["vastuu", "vashthu", "shastzra"],
    threshold: 8,
    answer: "We offer Vastu-compliant architectural floor plans. We design main entrances, kitchens, bedrooms, and bathrooms in their ideal quadrants (e.g., kitchen in South-East, master bedroom in South-West) to promote positive energy.",
    suggested_followups: ["📐 Architectural Design", "🏢 Construction Process"]
  },
  {
    id: "govt_approvals",
    keywords: {
      primary: ["approval", "approvals", "government", "municipal", "legal", "noc", "building_approval"],
      secondary: ["bbmp", "bda", "sanction plan", "power connection"],
      support: ["water connection", "documents", "paperwork"]
    },
    synonyms: ["government clearance", "legal NOCs"],
    common_misspellings: ["aprovl", "municpl", "bbmpp"],
    threshold: 8,
    answer: "We assist clients with BBMP, BDA, or local municipal building sanction plans, power/water connections, and NOCs, navigating the complex paperwork for a hassle-free legal clearance process.",
    suggested_followups: ["📐 Architectural Design", "📈 Loans & EMI"]
  },
  {
    id: "building_permissions",
    keywords: {
      primary: ["permission", "permissions", "permit", "permits", "sanction", "building_approval"],
      secondary: ["building permit", "sanction plan", "municipal corporation"],
      support: ["legal documents", "drawings submission", "clearance"]
    },
    synonyms: ["construction permission", "plan sanction permit", "building sanction"],
    common_misspellings: ["permision", "sancon", "corporaton"],
    threshold: 8,
    answer: "Getting a building sanction permit is critical before construction starts. We prepare and submit all necessary structural blueprints and legal documents to the local municipal corporation to secure the official building permit.",
    suggested_followups: ["📐 Architectural Design", "⚖️ Government Approvals"]
  },
  {
    id: "loans",
    keywords: {
      primary: ["loan", "loans", "bank", "home loan", "construction_loan"],
      secondary: ["sbi", "hdfc", "icici", "financing"],
      support: ["bank approval", "documents", "interest rates"]
    },
    synonyms: ["home loans", "bank financing"],
    common_misspellings: ["loanz", "hnfc", "finacing"],
    threshold: 8,
    answer: "We assist in securing home construction loans. We provide all necessary structural estimates, drawing blueprints, and land documents required by major banks like SBI, HDFC, and ICICI for fast loan approval.",
    suggested_followups: ["📈 EMI Calculator", "💳 Payment Process"]
  },
  {
    id: "emi",
    keywords: {
      primary: ["emi", "calculator", "installment", "tenure", "interest"],
      secondary: ["equated monthly installment", "repayment", "monthly cost"],
      support: ["principal", "interest rate", "repayment terms"]
    },
    synonyms: ["emi payment", "repayment calculation"],
    common_misspellings: ["emii", "calculatr", "instalmentt"],
    threshold: 8,
    answer: "Monthly loan EMIs depend on the principal amount, interest rate, and tenure. Our financial advisors can help structure your project cost estimate so it aligns perfectly with your pre-approved bank loan EMI capacity.",
    suggested_followups: ["📈 Construction Loans", "📊 Cost Estimate"]
  },
  {
    id: "warranty",
    keywords: {
      primary: ["warranty", "warranties", "guarantee", "guarantees", "structural warranty"],
      secondary: ["structural", "plumbing", "electrical", "leakage"],
      support: ["10-year", "1-year", "maintenance warranty"]
    },
    synonyms: ["guarantee details", "service warranty"],
    common_misspellings: ["waranty", "guaranty", "leakages"],
    threshold: 8,
    answer: "We stand by our builds. MONOME offers a 10-year structural warranty on the RCC frame, a 1-year warranty on plumbing and electrical leakage/defects, and a 1-year general maintenance warranty post handover.",
    suggested_followups: ["🛡️ Quality Assurance", "🔧 Maintenance Services"]
  },
  {
    id: "maintenance",
    keywords: {
      primary: ["maintenance", "repairs", "aftercare", "post-handover"],
      secondary: ["annual checkup", "painting touch-up", "waterproofing inspection"],
      support: ["leakage checks", "structural health", "service support"]
    },
    synonyms: ["maintenance support", "post handover service"],
    common_misspellings: ["maintnance", "repar", "aftercar"],
    threshold: 8,
    answer: "We provide comprehensive post-handover maintenance, including annual plumbing checkups, painting touch-ups, structural health audits, and waterproofing inspections to keep your property in mint condition.",
    suggested_followups: ["🛡️ Quality Assurance", "📜 Warranty Details"]
  },
  {
    id: "safety",
    keywords: {
      primary: ["safety", "safety rules", "protection", "accident", "first-aid"],
      secondary: ["helmets", "safety harnesses", "safety nets", "training"],
      support: ["construction site safety", "hazards", "environment"]
    },
    synonyms: ["site safety", "safety norms", "safety nets", "safety harnesses", "helmets"],
    common_misspellings: ["safty", "netts", "accidentt"],
    threshold: 8,
    answer: "Safety is our priority. We enforce strict safety rules on-site, providing helmets, safety harnesses, and safety nets. We conduct regular safety training and maintain first-aid desks to ensure an accident-free work environment.",
    suggested_followups: ["🛡️ Quality Assurance", "🏢 Construction Process"]
  },
  {
    id: "quality_assurance",
    keywords: {
      primary: ["quality", "standards", "checks", "quality_assurance", "checklist", "audit"],
      secondary: ["150-point checklist", "concrete testing", "rebar alignment", "water ponding", "150"],
      support: ["durability", "material tests", "inspections"]
    },
    synonyms: ["quality checks", "standards inspection"],
    common_misspellings: ["qualty", "checklst", "durablity"],
    threshold: 8,
    answer: "We execute a 150-point quality checklist across all construction phases. We test concrete cubes, check rebar alignment, verify brick mortar ratios, and conduct waterproofing ponding tests to guarantee zero-defect handovers.",
    suggested_followups: ["📜 Warranty Details", "🏢 Construction Process"]
  },
  {
    id: "consultation",
    keywords: {
      primary: ["consultation", "consult", "book consultation", "appointment", "schedule"],
      secondary: ["meeting", "discuss", "expert opinion", "office visit"],
      support: ["slot", "timing", "free consultation"]
    },
    synonyms: ["book a slot", "office consultation"],
    common_misspellings: ["consulton", "apointment", "scedule"],
    threshold: 8,
    answer: "Ready to build? You can book a premium consultation with our senior architects and structural engineers. We will discuss your plot details, layout preferences, and budget to draft a tailored roadmap. Call/WhatsApp us at <strong>+91 96209 74224</strong> to schedule.",
    suggested_followups: ["📞 Contact Info", "📊 Cost Estimate"]
  },
  {
    id: "general_faq",
    keywords: {
      primary: ["faq", "faqs", "question", "questions", "general", "standard", "query", "queries"],
      secondary: ["answers", "common queries", "general faq"],
      support: ["information", "about us", "basics"]
    },
    synonyms: ["frequently asked questions", "common questions"],
    common_misspellings: ["faqz", "qustions"],
    threshold: 8,
    answer: "Have questions? We are here to help. You can query us about our turnkey construction workflow, premium materials, pricing packages, Vastu alignment, government approvals, and live CCTV tracking portal.",
    suggested_followups: ["🏢 About MONOME", "🏢 Construction Process", "📊 Cost Estimate"]
  }
];
