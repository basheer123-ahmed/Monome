// Conversation Context Memory Engine

export class ContextMemory {
  constructor() {
    this.history = []; // Keep track of the last 5 exchanges
    this.context = {
      currentProject: null, // "villa", "apartment", "duplex", "house", "commercial", "renovation", "interior"
      currentTopic: null, // Intent ID
      location: null, // Office or project site location
      budget: null, // Budget constraints mentioned
      constructionStage: null // "planning", "foundation", "finishes", "excavation", etc.
    };
  }

  addExchange(userText, botResponseHtml, matchedIntentId, tokens) {
    // Update context state dynamically before storing
    this.updateContext(userText, matchedIntentId, tokens);

    // Add to history and enforce limit of 5
    this.history.push({
      userText,
      botResponseHtml,
      matchedIntentId,
      contextSnapshot: { ...this.context }
    });

    if (this.history.length > 5) {
      this.history.shift();
    }
  }

  updateContext(text, intentId, tokens) {
    const lowerText = text.toLowerCase();

    // 1. Detect active project type
    if (lowerText.includes("villa") || tokens.includes("villa")) {
      this.context.currentProject = "villa";
    } else if (lowerText.includes("apartment") || tokens.includes("apartment") || tokens.includes("flat")) {
      this.context.currentProject = "apartment";
    } else if (lowerText.includes("duplex") || tokens.includes("duplex")) {
      this.context.currentProject = "duplex";
    } else if (lowerText.includes("renovate") || lowerText.includes("renovation") || tokens.includes("renovation")) {
      this.context.currentProject = "renovation";
    } else if (lowerText.includes("interior") || tokens.includes("interior")) {
      this.context.currentProject = "interior";
    } else if (lowerText.includes("commercial") || lowerText.includes("office") || lowerText.includes("shop") || lowerText.includes("showroom")) {
      this.context.currentProject = "commercial";
    } else if (lowerText.includes("house") || lowerText.includes("home") || tokens.includes("house") || tokens.includes("home")) {
      this.context.currentProject = "house";
    }

    // 2. Detect active topic
    if (intentId) {
      this.context.currentTopic = intentId;
    }

    // 3. Detect location
    if (lowerText.includes("bangalore") || lowerText.includes("bengaluru")) {
      this.context.location = "Bengaluru";
    } else if (lowerText.includes("banashankari")) {
      this.context.location = "Banashankari";
    }

    // 4. Detect budget patterns (e.g. "80 lakhs", "1.5 cr", "50k")
    const budgetRegex = /\b(\d+(?:\.\d+)?)\s*(lakh|lakhs|lacs|cr|crore|crores|k|thousand|thousands)\b/gi;
    const match = budgetRegex.exec(lowerText);
    if (match) {
      this.context.budget = match[0];
    }

    // 5. Detect construction stages
    if (lowerText.includes("plan") || lowerText.includes("design") || lowerText.includes("blueprint")) {
      this.context.constructionStage = "planning";
    } else if (lowerText.includes("foundation") || lowerText.includes("plinth") || lowerText.includes("excavation") || lowerText.includes("footing")) {
      this.context.constructionStage = "foundation";
    } else if (lowerText.includes("structure") || lowerText.includes("slab") || lowerText.includes("brickwork") || lowerText.includes("masonry")) {
      this.context.constructionStage = "structure";
    } else if (lowerText.includes("finish") || lowerText.includes("paint") || lowerText.includes("tile") || lowerText.includes("flooring")) {
      this.context.constructionStage = "finishes";
    }
  }

  resolveContext(tokens) {
    const pronouns = ["it", "they", "them", "that", "this"];
    const topicKeywords = ["cost", "pricing", "timeline", "duration", "process", "workflow", "materials", "material"];

    // Check if tokens contain pronouns or stand-alone topic queries without a project type
    const hasPronoun = tokens.some(t => pronouns.includes(t));
    const isTopicOnly = tokens.some(t => topicKeywords.includes(t)) && tokens.length <= 4;

    if ((hasPronoun || isTopicOnly) && this.context.currentProject) {
      const projectTypes = ["villa", "apartment", "duplex", "house", "home", "renovation", "interior", "commercial"];
      const alreadyHasProject = tokens.some(t => projectTypes.includes(t));
      
      if (!alreadyHasProject) {
        // Inject the active project context into the user's query tokens
        return [...tokens, this.context.currentProject];
      }
    }

    return tokens;
  }

  reset() {
    this.history = [];
    this.context = {
      currentProject: null,
      currentTopic: null,
      location: null,
      budget: null,
      constructionStage: null
    };
  }
}
