// Levenshtein metric, spelling correction, and unified semantic token pipeline

import { globalVocabulary, getCanonicalConcept } from './synonyms.js';
import { normalizeAndTokenize, stemWord, STOP_WORDS } from './normalizer.js';

export function computeLevenshteinDistance(s1, s2) {
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

export function correctSpelling(token) {
  const t = token.toLowerCase();

  // If token is very short (<= 3 chars) or too long (> 20 chars), do not perform fuzzy matching to avoid performance overhead
  if (t.length <= 3 || t.length > 20) return t;

  // If the word exists exactly in our global vocabulary, keep it as is
  if (globalVocabulary.includes(t)) {
    return t;
  }

  // Find the closest vocabulary word within threshold
  const maxAllowedDist = t.length <= 5 ? 1 : 2;
  let closestWord = t;
  let minDistance = Infinity;

  for (const vocabWord of globalVocabulary) {
    if (Math.abs(t.length - vocabWord.length) > maxAllowedDist) continue;
    
    const dist = computeLevenshteinDistance(t, vocabWord);
    if (dist <= maxAllowedDist && dist < minDistance) {
      minDistance = dist;
      closestWord = vocabWord;
    }
  }

  return closestWord;
}

export function processQueryToTokens(query) {
  if (!query) return [];

  // Step 1 & 2: Abbreviation expansion, phrase detection, and raw tokenization
  const rawTokens = normalizeAndTokenize(query);

  // Step 3: Spelling correction (on raw tokens before stemming)
  const correctedTokens = rawTokens.map(token => {
    if (token.includes("_")) return token; // Keep phrases intact
    return correctSpelling(token);
  });

  // Step 4: Stop word removal
  const filteredTokens = correctedTokens.filter(token => !STOP_WORDS.has(token));

  // Step 5: Stemming
  const stemmedTokens = filteredTokens.map(token => {
    if (token.includes("_")) return token;
    return stemWord(token);
  });

  // Step 6: Synonym mapping (canonicalization)
  const canonicalTokens = stemmedTokens.map(token => {
    return getCanonicalConcept(token);
  });

  return canonicalTokens;
}
