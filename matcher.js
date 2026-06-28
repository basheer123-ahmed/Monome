// Levenshtein metric, spelling correction, and unified semantic token pipeline

import { globalVocabulary, getCanonicalConcept } from './synonyms.js';
import { normalizeAndTokenize, stemWord, STOP_WORDS } from './normalizer.js';

// Spelling correction cache to avoid redundant distance calculations
const correctionCache = new Map();

// Grouped vocabulary by token length for O(1) bucket retrieval
let vocabularyByLength = null;

function initVocabularyBuckets() {
  vocabularyByLength = {};
  for (const word of globalVocabulary) {
    const len = word.length;
    if (!vocabularyByLength[len]) {
      vocabularyByLength[len] = [];
    }
    vocabularyByLength[len].push(word);
  }
}

/**
 * Computes Levenshtein distance between two strings with an early-exit threshold limit.
 * If the distance exceeds maxDist, the computation halts early.
 */
export function computeLevenshteinDistance(s1, s2, maxDist = Infinity) {
  const len1 = s1.length;
  const len2 = s2.length;
  if (Math.abs(len1 - len2) > maxDist) return maxDist + 1;

  let prevRow = Array.from({ length: len2 + 1 }, (_, i) => i);
  let currRow = new Array(len2 + 1);

  for (let i = 1; i <= len1; i++) {
    currRow[0] = i;
    let minRowVal = i;
    for (let j = 1; j <= len2; j++) {
      const cost = s1.charAt(i - 1) === s2.charAt(j - 1) ? 0 : 1;
      currRow[j] = Math.min(
        currRow[j - 1] + 1,
        prevRow[j] + 1,
        prevRow[j - 1] + cost
      );
      if (currRow[j] < minRowVal) {
        minRowVal = currRow[j];
      }
    }
    if (minRowVal > maxDist) {
      return maxDist + 1;
    }
    const temp = prevRow;
    prevRow = currRow;
    currRow = temp;
  }
  return prevRow[len2];
}

/**
 * Performs spell correction using cached and length-bucketed vocabulary lookups.
 */
export function correctSpelling(token) {
  const t = token.toLowerCase();

  // If token is very short (<= 3 chars) or too long (> 20 chars), do not perform fuzzy matching to avoid performance overhead
  if (t.length <= 3 || t.length > 20) return t;

  // If the word exists exactly in our global vocabulary, keep it as is
  if (globalVocabulary.includes(t)) {
    return t;
  }

  // Return cached result if available
  if (correctionCache.has(t)) {
    return correctionCache.get(t);
  }

  if (!vocabularyByLength) {
    initVocabularyBuckets();
  }

  // Find the closest vocabulary word within threshold
  const maxAllowedDist = t.length <= 5 ? 1 : 2;
  let closestWord = t;
  let minDistance = Infinity;

  const len = t.length;
  const minLen = Math.max(1, len - maxAllowedDist);
  const maxLen = len + maxAllowedDist;

  for (let l = minLen; l <= maxLen; l++) {
    const bucket = vocabularyByLength[l];
    if (!bucket) continue;

    for (const vocabWord of bucket) {
      const threshold = Math.min(maxAllowedDist, minDistance - 1);
      const dist = computeLevenshteinDistance(t, vocabWord, threshold);
      if (dist <= threshold && dist < minDistance) {
        minDistance = dist;
        closestWord = vocabWord;
      }
    }
  }

  correctionCache.set(t, closestWord);
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
