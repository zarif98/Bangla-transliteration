# বাংলা → Bangla Transliterator

A web app that converts **spoken Bangla to written English transliteration**. Speak into your phone's mic in Bangla and get the romanized output instantly — like texting in "Banglish."

## Why this exists

There's no widely available tool that does this specific thing: **Bangla speech → English transliteration**. Existing tools either output Bangla script (Google Dictation) or go the opposite direction (Avro Phonetic: English → Bangla). This fills that gap.

## Features

- 🎤 **Voice input** — Speak in Bangla using your phone's mic (Web Speech API, `bn-BD`)
- ⌨️ **Manual input** — Paste or type Bangla text directly
- 📋 **Copy to clipboard** — One-tap copy of the transliterated output
- 📱 **PWA** — Install on your iPhone home screen, works like a native app

### Transliteration Engines

| Engine | How it works | Speed |
|--------|-------------|-------|
| **Casual (Banglish)** | Dictionary of ~200 common words + rule-based character mapping fallback | Instant, offline |
| **Formal (IAST)** | [Aksharamukha](https://aksharamukha.appspot.com) API — academic romanization standard | ~400ms, online |
| **ITRANS** | Aksharamukha API — ITRANS romanization scheme | ~400ms, online |

## Architecture

```
Mic → Web Speech API (bn-BD) → Bangla text
                                    ↓
                      ┌─────────────┴─────────────┐
                      │                           │
               Dictionary match?            Aksharamukha API
                 ↓ yes    ↓ no               (formal/ITRANS)
              Use dict   Rule engine              │
                      │                           │
                      └─────────────┬─────────────┘
                                    ↓
                          English transliteration
```

## Tech Stack

- **React 19** + **Vite 8** — frontend framework
- **Tailwind CSS v4** — styling
- **Lucide React** — icons
- **Web Speech API** — browser-native Bangla speech recognition
- **Aksharamukha API** — open-source Indic script transliteration

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Use on iPhone

1. Deploy to a host (e.g. Netlify, Vercel)
2. Open the URL in Safari
3. Tap **Share → Add to Home Screen**
4. It runs as a standalone app

## Project Structure

```
src/
├── lib/
│   ├── transliterator.js          # Rule-based engine (consonants, vowels, conjuncts)
│   ├── dictionary.js              # ~200 common Bangla word mappings
│   ├── aksharamukha.js            # Aksharamukha API client
│   └── transliterationService.js  # Unified service routing to the right engine
├── hooks/
│   └── useSpeechRecognition.js    # Web Speech API hook for Bangla
├── App.jsx                        # Main UI
└── App.css                        # Mic pulse animation
```

## Roadmap

- [ ] Google Cloud Speech-to-Text integration for better accuracy
- [ ] Expand word dictionary with more spoken Bangla patterns
- [ ] Offline support with cached Aksharamukha results
- [ ] Native iOS app (React Native)

## License

MIT
