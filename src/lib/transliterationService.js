// Unified Transliteration Service
// Combines: Dictionary lookup → Rule engine fallback, or Aksharamukha API

import { transliterate as ruleBasedTransliterate } from './transliterator';
import { transliterateWithDictionary } from './dictionary';
import { transliterateWithAksharamukha, ROMANIZATION_STYLES } from './aksharamukha';

export const TRANSLITERATION_MODES = {
  casual: {
    id: 'casual',
    label: 'Casual (Banglish)',
    description: 'Dictionary + rule engine — natural, everyday romanization',
  },
  formal: {
    id: 'formal',
    label: 'Formal (IAST)',
    description: 'Aksharamukha API — academic romanization standard',
  },
  itrans: {
    id: 'itrans',
    label: 'ITRANS',
    description: 'Aksharamukha API — ITRANS scheme',
  },
};

/**
 * Transliterate using casual mode: dictionary first, rule engine fallback
 */
export function transliterateCasual(text) {
  if (!text) return '';
  return transliterateWithDictionary(text, ruleBasedTransliterate);
}

/**
 * Transliterate using Aksharamukha API (async)
 */
export async function transliterateFormal(text, style = 'IAST') {
  if (!text) return '';
  return transliterateWithAksharamukha(text, style);
}

/**
 * Main transliteration function
 * @param {string} text - Bangla text
 * @param {string} mode - 'casual', 'formal', or 'itrans'
 * @returns {Promise<string>|string} - Transliterated text
 */
export async function transliterateText(text, mode = 'casual') {
  if (!text || !text.trim()) return '';

  switch (mode) {
    case 'casual':
      return transliterateCasual(text);

    case 'formal':
      try {
        return await transliterateWithAksharamukha(text, 'IAST');
      } catch {
        // Fallback to casual if API fails
        return transliterateCasual(text);
      }

    case 'itrans':
      try {
        return await transliterateWithAksharamukha(text, 'ITRANS');
      } catch {
        return transliterateCasual(text);
      }

    default:
      return transliterateCasual(text);
  }
}

export { ROMANIZATION_STYLES };
export default transliterateText;
