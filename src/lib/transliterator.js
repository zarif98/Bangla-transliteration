// Bangla to English Transliteration Engine

// Multi-character conjunct patterns (checked first, longest match wins)
const CONJUNCT_PATTERNS = {
  'ক্ষ': 'kkho',
  'জ্ঞ': 'gyo',
  'ঞ্চ': 'ncho',
  'ঞ্ছ': 'nchho',
  'ঞ্জ': 'njo',
  'ঞ্ঝ': 'njho',
  'ঙ্ক': 'nko',
  'ঙ্গ': 'nggo',
  'ঙ্খ': 'nkho',
  'ক্ক': 'kko',
  'ক্ট': 'kto',
  'ক্ত': 'kto',
  'ক্ন': 'kno',
  'ক্ম': 'kmo',
  'ক্র': 'kro',
  'ক্ল': 'klo',
  'ক্স': 'kso',
  'গ্ধ': 'gdho',
  'গ্ন': 'gno',
  'গ্ম': 'gmo',
  'গ্র': 'gro',
  'গ্ল': 'glo',
  'ঘ্ন': 'ghno',
  'ঘ্র': 'ghro',
  'চ্চ': 'ccho',
  'চ্ছ': 'cchho',
  'চ্ন': 'chno',
  'জ্জ': 'jjo',
  'জ্ঝ': 'jjho',
  'জ্ব': 'jbo',
  'জ্র': 'jro',
  'ট্ট': 'tto',
  'ড্ড': 'ddo',
  'ণ্ট': 'nto',
  'ণ্ঠ': 'ntho',
  'ণ্ড': 'ndo',
  'ণ্ঢ': 'ndho',
  'ণ্ণ': 'nno',
  'ত্ত': 'tto',
  'ত্থ': 'ttho',
  'ত্ন': 'tno',
  'ত্ম': 'tmo',
  'ত্র': 'tro',
  'দ্দ': 'ddo',
  'দ্ধ': 'ddho',
  'দ্ব': 'dbo',
  'দ্ভ': 'dbho',
  'দ্ম': 'dmo',
  'দ্র': 'dro',
  'ধ্ন': 'dhno',
  'ধ্র': 'dhro',
  'ন্ট': 'nto',
  'ন্ঠ': 'ntho',
  'ন্ড': 'ndo',
  'ন্ত': 'nto',
  'ন্থ': 'ntho',
  'ন্দ': 'ndo',
  'ন্ধ': 'ndho',
  'ন্ন': 'nno',
  'ন্ম': 'nmo',
  'ন্র': 'nro',
  'ন্স': 'nso',
  'প্ট': 'pto',
  'প্ত': 'pto',
  'প্ন': 'pno',
  'প্প': 'ppo',
  'প্র': 'pro',
  'প্ল': 'plo',
  'প্স': 'pso',
  'ফ্ল': 'flo',
  'ফ্র': 'fro',
  'ব্জ': 'bjo',
  'ব্দ': 'bdo',
  'ব্ধ': 'bdho',
  'ব্ব': 'bbo',
  'ব্র': 'bro',
  'ব্ল': 'blo',
  'ভ্র': 'bhro',
  'ম্ন': 'mno',
  'ম্প': 'mpo',
  'ম্ফ': 'mfo',
  'ম্ব': 'mbo',
  'ম্ভ': 'mbho',
  'ম্ম': 'mmo',
  'ম্র': 'mro',
  'ম্ল': 'mlo',
  'ল্ক': 'lko',
  'ল্গ': 'lgo',
  'ল্ট': 'lto',
  'ল্ড': 'ldo',
  'ল্প': 'lpo',
  'ল্ব': 'lbo',
  'ল্ম': 'lmo',
  'ল্ল': 'llo',
  'শ্চ': 'shcho',
  'শ্ন': 'shno',
  'শ্ম': 'shmo',
  'শ্র': 'shro',
  'শ্ল': 'shlo',
  'ষ্ক': 'shko',
  'ষ্ট': 'shto',
  'ষ্ঠ': 'shtho',
  'ষ্ণ': 'shno',
  'ষ্প': 'shpo',
  'ষ্ম': 'shmo',
  'স্ক': 'sko',
  'স্খ': 'skho',
  'স্ট': 'sto',
  'স্ত': 'sto',
  'স্থ': 'stho',
  'স্ন': 'sno',
  'স্প': 'spo',
  'স্ফ': 'sfoo',
  'স্ব': 'sbo',
  'স্ম': 'smo',
  'স্র': 'sro',
  'স্ল': 'slo',
  'হ্ণ': 'hno',
  'হ্ন': 'hno',
  'হ্ম': 'hmo',
  'হ্র': 'hro',
  'হ্ল': 'hlo',
};

// Vowel mappings (independent forms)
const VOWELS = {
  'অ': 'o',
  'আ': 'a',
  'ই': 'i',
  'ঈ': 'ee',
  'উ': 'u',
  'ঊ': 'oo',
  'ঋ': 'ri',
  'এ': 'e',
  'ঐ': 'oi',
  'ও': 'o',
  'ঔ': 'ou',
};

// Vowel signs (dependent forms / kar)
const VOWEL_SIGNS = {
  'া': 'a',
  'ি': 'i',
  'ী': 'ee',
  'ু': 'u',
  'ূ': 'oo',
  'ৃ': 'ri',
  'ে': 'e',
  'ৈ': 'oi',
  'ো': 'o',
  'ৌ': 'ou',
};

// Consonants
const CONSONANTS = {
  'ক': 'ko',
  'খ': 'kho',
  'গ': 'go',
  'ঘ': 'gho',
  'ঙ': 'ngo',
  'চ': 'cho',
  'ছ': 'chho',
  'জ': 'jo',
  'ঝ': 'jho',
  'ঞ': 'no',
  'ট': 'to',
  'ঠ': 'tho',
  'ড': 'do',
  'ঢ': 'dho',
  'ণ': 'no',
  'ত': 'to',
  'থ': 'tho',
  'দ': 'do',
  'ধ': 'dho',
  'ন': 'no',
  'প': 'po',
  'ফ': 'fo',
  'ব': 'bo',
  'ভ': 'bho',
  'ম': 'mo',
  'য': 'jo',
  'র': 'ro',
  'ল': 'lo',
  'শ': 'sho',
  'ষ': 'sho',
  'স': 'so',
  'হ': 'ho',
  'ড়': 'ro',
  'ঢ়': 'rho',
  'য়': 'yo',
};

// Special characters
const SPECIALS = {
  'ং': 'ng',
  'ঃ': 'h',
  'ঁ': 'n',
  'ৎ': 't',
};

// Bangla numbers
const NUMBERS = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

const HASANTA = '্';

// Check if a character is a vowel sign
function isVowelSign(ch) {
  return ch in VOWEL_SIGNS;
}

// Check if a character is a consonant
function isConsonant(ch) {
  return ch in CONSONANTS;
}

// Check if a character is a vowel
function isVowel(ch) {
  return ch in VOWELS;
}

// Get consonant base (without inherent vowel)
function getConsonantBase(ch) {
  if (ch in CONSONANTS) {
    const full = CONSONANTS[ch];
    // Remove trailing 'o' (inherent vowel)
    return full.endsWith('o') ? full.slice(0, -1) : full;
  }
  return ch;
}

/**
 * Transliterate a Bangla string to English
 */
export function transliterate(text) {
  if (!text) return '';

  let result = '';
  const len = text.length;
  let i = 0;

  while (i < len) {
    const ch = text[i];

    // Check for Bangla numbers
    if (ch in NUMBERS) {
      result += NUMBERS[ch];
      i++;
      continue;
    }

    // Check for special characters
    if (ch in SPECIALS) {
      result += SPECIALS[ch];
      i++;
      continue;
    }

    // Check for independent vowels
    if (isVowel(ch)) {
      result += VOWELS[ch];
      i++;
      continue;
    }

    // Check for consonants
    if (isConsonant(ch)) {
      result += processConsonant(text, i, len);
      i = advanceConsonant(text, i, len);
      continue;
    }

    // Check for stray vowel signs (shouldn't normally happen)
    if (isVowelSign(ch)) {
      result += VOWEL_SIGNS[ch];
      i++;
      continue;
    }

    // Pass through everything else (spaces, punctuation, Latin chars, etc.)
    result += ch;
    i++;
  }

  return result;
}

/**
 * Process a consonant and any following hasanta+consonant chains and vowel signs
 */
function processConsonant(text, start, len) {
  let result = '';
  let i = start;

  // Collect consonant cluster: C (্C)*
  const consonants = [];
  consonants.push(text[i]);
  i++;

  while (i + 1 < len && text[i] === HASANTA && isConsonant(text[i + 1])) {
    consonants.push(text[i + 1]);
    i += 2;
  }

  // Check for conjunct patterns first
  if (consonants.length >= 2) {
    // Build the conjunct string with hasanta between consonants
    let conjunctKey = consonants[0];
    for (let j = 1; j < consonants.length; j++) {
      conjunctKey += HASANTA + consonants[j];
    }

    if (conjunctKey in CONJUNCT_PATTERNS) {
      let mapped = CONJUNCT_PATTERNS[conjunctKey];

      // Check what follows: vowel sign, hasanta (final), or nothing
      if (i < len && isVowelSign(text[i])) {
        // Remove trailing inherent vowel 'o' and add the vowel sign
        if (mapped.endsWith('o')) {
          mapped = mapped.slice(0, -1);
        }
        mapped += VOWEL_SIGNS[text[i]];
      } else if (i < len && text[i] === HASANTA) {
        // Hasanta at the end means suppress inherent vowel
        if (mapped.endsWith('o')) {
          mapped = mapped.slice(0, -1);
        }
      }
      // Otherwise keep as is (with inherent vowel)

      return mapped;
    }
  }

  // No conjunct match — process consonants individually
  for (let j = 0; j < consonants.length; j++) {
    const c = consonants[j];
    const base = getConsonantBase(c);

    if (j < consonants.length - 1) {
      // Not the last consonant in a cluster — no inherent vowel
      result += base;
    } else {
      // Last consonant — check what follows
      if (i < len && isVowelSign(text[i])) {
        result += base + VOWEL_SIGNS[text[i]];
      } else if (i < len && text[i] === HASANTA) {
        // Final hasanta — no inherent vowel
        result += base;
      } else {
        // Inherent vowel 'o'
        result += base + 'o';
      }
    }
  }

  return result;
}

/**
 * Advance the index past the consonant cluster and any following vowel sign or hasanta
 */
function advanceConsonant(text, start, len) {
  let i = start + 1;

  // Skip hasanta+consonant pairs
  while (i + 1 < len && text[i] === HASANTA && isConsonant(text[i + 1])) {
    i += 2;
  }

  // Skip a trailing vowel sign
  if (i < len && isVowelSign(text[i])) {
    i++;
  } else if (i < len && text[i] === HASANTA) {
    // Skip trailing hasanta
    i++;
  }

  return i;
}

export default transliterate;
