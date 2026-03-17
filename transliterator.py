import re
from transliteration_map import TRANSLITERATION_MAP, WORD_PATTERNS

class BanglaTransliterator:
    def __init__(self):
        self.transliteration_map = TRANSLITERATION_MAP
        self.word_patterns = WORD_PATTERNS
        
    def preprocess_text(self, text):
        """Preprocess text to handle common spoken patterns and punctuation"""
        # Convert to lowercase for consistency
        text = text.lower()
        
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text.strip())
        
        # Handle common spoken variations
        text = self._handle_spoken_variations(text)
        
        return text
    
    def _handle_spoken_variations(self, text):
        """Handle common spoken Bangla variations"""
        # Example: handle repeated characters for emphasis
        text = re.sub(r'(.)\1{2,}', r'\1\1', text)
        
        # Handle common contractions or informal speech patterns
        variations = {
            'আরে': 'are',
            'ওই': 'oi',
            'এই': 'ei',
        }
        
        for bangla, english in variations.items():
            text = text.replace(bangla, english)
            
        return text
    
    def transliterate_word(self, word):
        """Transliterate a single Bangla word to English"""
        if not word:
            return ""
        
        # First check for multi-character patterns
        result = ""
        i = 0
        n = len(word)
        
        while i < n:
            # Check for multi-character patterns first (longest first)
            pattern_found = False
            
            # Sort patterns by length descending to match longer patterns first
            sorted_patterns = sorted(self.word_patterns.keys(), key=len, reverse=True)
            
            for pattern in sorted_patterns:
                if word.startswith(pattern, i):
                    result += self.word_patterns[pattern]
                    i += len(pattern)
                    pattern_found = True
                    break
            
            if not pattern_found:
                # Check single character mapping
                char = word[i]
                if char in self.transliteration_map:
                    result += self.transliteration_map[char]
                else:
                    # Keep unknown characters as-is
                    result += char
                i += 1
        
        return result
    
    def transliterate_sentence(self, sentence):
        """Transliterate a Bangla sentence to English"""
        if not sentence:
            return ""
        
        # Preprocess the text
        processed_text = self.preprocess_text(sentence)
        
        # Split into words and transliterate each
        words = processed_text.split()
        transliterated_words = []
        
        for word in words:
            # Remove punctuation from word, transliterate, then add punctuation back
            clean_word = re.sub(r'[^\u0980-\u09FF]', '', word)
            punctuation = re.sub(r'[\u0980-\u09FF]', '', word)
            
            if clean_word:
                transliterated = self.transliterate_word(clean_word)
                transliterated_words.append(transliterated + punctuation)
            else:
                transliterated_words.append(punctuation)
        
        # Join words back with spaces
        result = ' '.join(transliterated_words)
        
        # Post-process for better readability
        result = self._post_process(result)
        
        return result
    
    def _post_process(self, text):
        """Post-process transliterated text for better readability"""
        # Handle capitalization for sentence start
        if text:
            text = text[0].upper() + text[1:]
        
        # Remove extra spaces
        text = re.sub(r'\s+', ' ', text.strip())
        
        # Handle common patterns that might not be captured by direct mapping
        replacements = {
            ' oo ': ' o ',
            ' aa ': ' a ',
            ' ii ': ' i ',
            ' uu ': ' u ',
        }
        
        for old, new in replacements.items():
            text = text.replace(old, new)
        
        return text
    
    def transliterate(self, text):
        """Main transliteration method"""
        if not text:
            return ""
        
        # Handle different types of input
        if ' ' in text:
            return self.transliterate_sentence(text)
        else:
            return self.transliterate_word(text)

# Create a global instance for easy use
transliterator = BanglaTransliterator()

def transliterate_bangla_to_english(text):
    """Convenience function for transliteration"""
    return transliterator.transliterate(text)

if __name__ == "__main__":
    # Test cases
    test_cases = [
        "আমি",
        "বাংলা",
        "ভালো",
        "আমি বাংলায় কথা বলি",
        "সুভাষচন্দ্র বসু",
        "আজ আকাশে মেঘ নেই",
        "বাংলাদেশ একটি সুন্দর দেশ",
    ]
    
    print("Bangla to English Transliteration Test:")
    print("=" * 50)
    
    for test in test_cases:
        result = transliterate_bangla_to_english(test)
        print(f"Bangla: {test}")
        print(f"English: {result}")
        print("-" * 30)
