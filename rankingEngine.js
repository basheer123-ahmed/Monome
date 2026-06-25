// Intent Ranking and Scoring Engine (Precomputed and Optimized)

import { processQueryToTokens } from './matcher.js';
import { intents } from './knowledgeBase.js';

// Precomputed canonicalized keyword lists for all intents to ensure maximum performance
export const precomputedIntents = {};

function canonicalizeList(list) {
  if (!list) return [];
  const results = new Set();
  list.forEach(kw => {
    const tokens = processQueryToTokens(kw);
    tokens.forEach(t => results.add(t));
  });
  return Array.from(results);
}

export function precomputeIntentKeywords(intentsList) {
  intentsList.forEach(intent => {
    precomputedIntents[intent.id] = {
      primary: canonicalizeList([...(intent.keywords.primary || []), ...(intent.synonyms || [])]),
      secondary: canonicalizeList(intent.keywords.secondary),
      support: canonicalizeList(intent.keywords.support)
    };
  });
}

// Auto-run precomputation on load
precomputeIntentKeywords(intents);

export function scoreIntent(intent, userTokens, rawQuery, context, rawTokens = []) {
  let score = 0;
  let matchCount = 0;

  // Retrieve precomputed canonical keywords
  const canonicalKeywords = precomputedIntents[intent.id] || { primary: [], secondary: [], support: [] };

  const primaryCanonical = canonicalKeywords.primary;
  const secondaryCanonical = canonicalKeywords.secondary;
  const supportCanonical = canonicalKeywords.support;

  // Calculate Weighted Keyword Matches
  const matchedPrimary = new Set();
  const matchedSecondary = new Set();
  const matchedSupport = new Set();

  userTokens.forEach(token => {
    if (primaryCanonical.includes(token)) {
      matchedPrimary.add(token);
    } else if (secondaryCanonical.includes(token)) {
      matchedSecondary.add(token);
    } else if (supportCanonical.includes(token)) {
      matchedSupport.add(token);
    }
  });

  matchCount += matchedPrimary.size + matchedSecondary.size + matchedSupport.size;

  // Known misspellings direct match check
  let isMisspelledMatch = false;
  if (intent.common_misspellings) {
    intent.common_misspellings.forEach(mis => {
      const regex = new RegExp(`\\b${mis.toLowerCase()}\\b`, "i");
      if (regex.test(rawQuery)) {
        isMisspelledMatch = true;
      }
    });
  }

  // CRITICAL RULE: If there are zero keyword matches AND no misspelling match, the intent score is 0.
  if (matchCount === 0 && !isMisspelledMatch) {
    return {
      intentId: intent.id,
      score: 0,
      matchCount: 0
    };
  }

  score += matchedPrimary.size * 10;
  score += matchedSecondary.size * 5;
  score += matchedSupport.size * 2;

  // Level 9 — Phrase Boost (+15 for Primary phrase, +10 for Secondary phrase, +5 for Support phrase)
  let phraseBoost = 0;
  userTokens.forEach(token => {
    if (token.includes("_")) { // Indicates a detected phrase
      if (primaryCanonical.includes(token)) {
        phraseBoost += 15;
      } else if (secondaryCanonical.includes(token)) {
        phraseBoost += 10;
      } else if (supportCanonical.includes(token)) {
        phraseBoost += 5;
      }
    }
  });
  score += phraseBoost;

  // Level 9 — Synonym Boost
  let synonymBoost = 0;
  if (intent.synonyms) {
    intent.synonyms.forEach(syn => {
      if (rawQuery.toLowerCase().includes(syn.toLowerCase())) {
        synonymBoost += 5;
      }
    });
  }
  score += synonymBoost;

  // Level 9 — Context Boost
  let contextBoost = 0;
  if (context.currentProject) {
    const projLower = context.currentProject.toLowerCase();
    const intentIdLower = intent.id.toLowerCase();
    
    // Check if the current project context matches the intent's ID
    if (intentIdLower.includes(projLower)) {
      contextBoost += 3;
    }
  }
  // Boost if the active topic matches the current intent
  if (context.currentTopic && context.currentTopic === intent.id) {
    contextBoost += 2;
  }
  score += contextBoost;

  // Dynamic Category Boosts (ensures specific categories aren't overwritten by generic intents)
  // Apply category boost of +15 if any primary keyword of this intent was explicitly present in the user's raw query tokens
  let categoryBoost = 0;
  const hasExplicitPrimaryMatch = rawTokens.some(token => primaryCanonical.includes(token));
  if (hasExplicitPrimaryMatch) {
    categoryBoost += 15;
  }
  score += categoryBoost;

  // Level 9 — Repeated Keyword Boost
  if (matchCount > 1) {
    score += matchCount * 2;
  }

  // Direct misspelling match boost
  if (isMisspelledMatch) {
    score += 8;
  }

  return {
    intentId: intent.id,
    score: score,
    matchCount: matchCount
  };
}

export function rankIntents(intentsList, userTokens, rawQuery, context, rawTokens = []) {
  const ranked = intentsList
    .map(intent => {
      const scoring = scoreIntent(intent, userTokens, rawQuery, context, rawTokens);
      return {
        intent,
        score: scoring.score,
        matchCount: scoring.matchCount
      };
    })
    .filter(item => item.score >= (item.intent.threshold || 8))
    .sort((a, b) => b.score - a.score || b.matchCount - a.matchCount);

  return ranked;
}
