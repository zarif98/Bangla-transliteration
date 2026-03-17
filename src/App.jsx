import { useState, useMemo, useEffect, useCallback } from 'react'
import { Mic, MicOff, Trash2, Copy, Check, Keyboard, AlertCircle, Settings2, Loader2 } from 'lucide-react'
import { useSpeechRecognition } from './hooks/useSpeechRecognition'
import { transliterateCasual, transliterateText, TRANSLITERATION_MODES } from './lib/transliterationService'
import './App.css'

function App() {
  const {
    isListening,
    banglaText,
    setBanglaText,
    interimText,
    error,
    isSupported,
    toggleListening,
    clearText,
  } = useSpeechRecognition()

  const [manualInput, setManualInput] = useState('')
  const [showManual, setShowManual] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState('casual')
  const [showSettings, setShowSettings] = useState(false)
  const [transliteratedText, setTransliteratedText] = useState('')
  const [isTransliterating, setIsTransliterating] = useState(false)

  const fullBanglaText = banglaText + (interimText ? ' ' + interimText : '')
  const sourceText = showManual ? manualInput : fullBanglaText

  // Debounced transliteration effect
  useEffect(() => {
    const text = sourceText.trim()
    if (!text) {
      setTransliteratedText('')
      return
    }

    if (mode === 'casual') {
      // Synchronous — no delay needed
      setTransliteratedText(transliterateCasual(text))
      return
    }

    // Async modes (Aksharamukha API) — debounce
    setIsTransliterating(true)
    const timeout = setTimeout(async () => {
      try {
        const result = await transliterateText(text, mode)
        setTransliteratedText(result)
      } catch {
        setTransliteratedText(transliterateCasual(text))
      } finally {
        setIsTransliterating(false)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [sourceText, mode])

  const handleCopy = async () => {
    if (transliteratedText) {
      await navigator.clipboard.writeText(transliteratedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClear = () => {
    clearText()
    setManualInput('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white">
      {/* Header */}
      <header className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          বাংলা → Bangla
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Speak in Bangla, get English transliteration
        </p>
      </header>

      <main className="max-w-lg mx-auto px-4 pb-8 flex flex-col gap-6">
        {/* Input Mode + Settings Row */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setShowManual(!showManual)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-white/5 rounded-full px-4 py-2"
          >
            <Keyboard size={16} />
            {showManual ? 'Switch to Voice' : 'Type manually'}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-2 text-sm transition-colors rounded-full px-4 py-2 ${
              showSettings ? 'text-purple-400 bg-purple-500/10' : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <Settings2 size={16} />
            Engine
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
              Transliteration Engine
            </h3>
            <div className="space-y-2">
              {Object.values(TRANSLITERATION_MODES).map(({ id, label, description }) => (
                <button
                  key={id}
                  onClick={() => setMode(id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                    mode === id
                      ? 'bg-purple-500/20 border border-purple-500/30 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="font-medium text-sm">{label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Microphone / Manual Input */}
        {!showManual ? (
          <div className="flex flex-col items-center gap-6">
            {/* Mic Button */}
            <div className="relative">
              {isListening && (
                <div className="mic-pulse absolute inset-0 rounded-full bg-red-500/30" />
              )}
              <button
                onClick={toggleListening}
                disabled={!isSupported}
                className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 scale-110'
                    : 'bg-purple-600 hover:bg-purple-700'
                } ${!isSupported ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {isListening ? (
                  <MicOff size={36} className="text-white" />
                ) : (
                  <Mic size={36} className="text-white" />
                )}
              </button>
            </div>

            <p className="text-slate-400 text-sm">
              {isListening
                ? 'Listening... Speak in Bangla'
                : isSupported
                  ? 'Tap the mic to start speaking'
                  : 'Speech recognition not supported'}
            </p>

            {/* Error display */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg px-4 py-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
          </div>
        ) : (
          /* Manual Input */
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Type Bangla text here
            </label>
            <textarea
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="আমি বাংলায় কথা বলি..."
              className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-lg"
              dir="auto"
            />
          </div>
        )}

        {/* Bangla Text Display (voice mode) */}
        {!showManual && fullBanglaText && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Detected Bangla
              </span>
            </div>
            <p className="text-lg text-slate-200" dir="auto">
              {banglaText}
              {interimText && (
                <span className="text-slate-500 italic"> {interimText}</span>
              )}
            </p>
          </div>
        )}

        {/* Transliterated Output */}
        {(transliteratedText || isTransliterating) && (
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">
                  {TRANSLITERATION_MODES[mode]?.label || 'Transliteration'}
                </span>
                {isTransliterating && (
                  <Loader2 size={12} className="text-purple-400 animate-spin" />
                )}
              </div>
              <button
                onClick={handleCopy}
                disabled={!transliteratedText}
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-xl font-medium text-white leading-relaxed">
              {isTransliterating ? (
                <span className="text-slate-500 italic">Transliterating...</span>
              ) : (
                transliteratedText
              )}
            </p>
          </div>
        )}

        {/* Clear Button */}
        {(fullBanglaText || manualInput || transliteratedText) && (
          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors mx-auto"
          >
            <Trash2 size={14} />
            Clear all
          </button>
        )}

        {/* Example Section */}
        {!transliteratedText && (
          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Examples</h3>
            <div className="space-y-2">
              {[
                { bangla: 'আমি ভালো আছি', english: 'ami bhalo achhi' },
                { bangla: 'বাংলাদেশ', english: 'bangladesh' },
                { bangla: 'তুমি কেমন আছো', english: 'tumi kemon achho' },
              ].map(({ bangla, english }) => (
                <button
                  key={bangla}
                  onClick={() => {
                    if (showManual) {
                      setManualInput(bangla)
                    } else {
                      setBanglaText(bangla)
                    }
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <span className="text-slate-300">{bangla}</span>
                  <span className="text-purple-400 text-sm">→ {english}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-slate-600 text-xs pb-4">
        <p>Works best in Chrome or Safari on iPhone</p>
      </footer>
    </div>
  )
}

export default App
