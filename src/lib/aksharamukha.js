// Aksharamukha API Client
// Docs: https://aksharamukha.appspot.com/documentation

const API_BASE = 'https://aksharamukha.appspot.com/api/public';

// Available romanization targets for Bengali
export const ROMANIZATION_STYLES = {
  iast: { label: 'IAST (Academic)', target: 'IAST' },
  iso: { label: 'ISO 15919', target: 'ISO' },
  itrans: { label: 'ITRANS', target: 'ITRANS' },
  harvardKyoto: { label: 'Harvard-Kyoto', target: 'HarvardKyoto' },
  velthuis: { label: 'Velthuis', target: 'Velthuis' },
};

/**
 * Transliterate Bangla text using Aksharamukha API
 * @param {string} text - Bangla text to transliterate
 * @param {string} target - Target romanization scheme (default: IAST)
 * @returns {Promise<string>} - Transliterated text
 */
export async function transliterateWithAksharamukha(text, target = 'IAST') {
  if (!text || !text.trim()) return '';

  try {
    const params = new URLSearchParams({
      source: 'Bengali',
      target: target,
      text: text,
    });

    const response = await fetch(`${API_BASE}?${params}`, {
      method: 'GET',
      headers: { 'Accept': 'text/plain' },
    });

    if (!response.ok) {
      throw new Error(`Aksharamukha API error: ${response.status}`);
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Aksharamukha API error:', error);
    throw error;
  }
}

export default transliterateWithAksharamukha;
