# Bangla to English Transliteration Mapping
# Based on common phonetic patterns

# Basic vowel mappings
VOWEL_MAP = {
    'অ': 'o',
    'আ': 'a',
    'ই': 'i',
    'ঈ': 'i',
    'উ': 'u',
    'ঊ': 'u',
    'ঋ': 'ri',
    'এ': 'e',
    'ঐ': 'oi',
    'ও': 'o',
    'ঔ': 'ou',
    # Vowel signs (kar)
    'া': 'a',
    'ি': 'i',
    'ী': 'i',
    'ু': 'u',
    'ূ': 'u',
    'ৃ': 'ri',
    'ে': 'e',
    'ৈ': 'oi',
    'ো': 'o',
    'ৌ': 'ou',
}

# Consonant mappings
CONSONANT_MAP = {
    'ক': 'k',
    'খ': 'kh',
    'গ': 'g',
    'ঘ': 'gh',
    'ঙ': 'ng',
    'চ': 'ch',
    'ছ': 'chh',
    'জ': 'j',
    'ঝ': 'jh',
    'ঞ': 'n',
    'ট': 't',
    'ঠ': 'th',
    'ড': 'd',
    'ঢ': 'dh',
    'ণ': 'n',
    'ত': 't',
    'থ': 'th',
    'দ': 'd',
    'ধ': 'dh',
    'ন': 'n',
    'প': 'p',
    'ফ': 'f',
    'ব': 'b',
    'ভ': 'v',
    'ম': 'm',
    'য': 'z',
    'র': 'r',
    'ল': 'l',
    'শ': 'sh',
    'ষ': 'sh',
    'স': 's',
    'হ': 'h',
    'ড়': 'r',
    'ঢ়': 'r',
    'য়': 'y',
}

# Special character mappings
SPECIAL_MAP = {
    '্': '',  # Hasanta (virama) - removes inherent vowel
    'ঁ': 'n',  # Anusvara
    'ঃ': 'h',  # Visarga
    'ৎ': 't',  # Khanda ta
    '়': '',   # Nukta
}

# Numbers
NUMBER_MAP = {
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
}

# Common word patterns for better transliteration
WORD_PATTERNS = {
    'ক্ষ': 'ksh',
    'স্ত': 'st',
    'ন্ত': 'nt',
    'ন্দ': 'nd',
    'ম্প': 'mp',
    'ল্ক': 'lk',
    'স্ক': 'sk',
    'গ্র': 'gr',
    'প্র': 'pr',
    'ব্র': 'br',
    'ত্র': 'tr',
    'দ্র': 'dr',
    'ক্র': 'kr',
    'স্র': 'sr',
    'ন্থ': 'nth',
    'ম্ব': 'mb',
    'জ্ঞ': 'gy',
    'দ্ব': 'dw',
    'হ্ন': 'hn',
    'হ্ম': 'hm',
}

# Combined mapping
TRANSLITERATION_MAP = {
    **VOWEL_MAP,
    **CONSONANT_MAP,
    **SPECIAL_MAP,
    **NUMBER_MAP,
    **WORD_PATTERNS,
}
