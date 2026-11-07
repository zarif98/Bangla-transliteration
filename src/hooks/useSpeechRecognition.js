import { useState, useEffect, useRef, useCallback } from 'react';

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [banglaText, setBanglaText] = useState('');
  const [interimText, setInterimText] = useState('');
  const [isSupported] = useState(() =>
    typeof window !== 'undefined' &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
  );
  const [error, setError] = useState(() =>
    isSupported ? null : 'Speech recognition is not supported in this browser.'
  );
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'bn-BD'; // Bangla (Bangladesh)
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        if (final) {
          setBanglaText((prev) => (prev ? prev + ' ' + final : final));
          setInterimText('');
        } else {
          setInterimText(interim);
        }
      };

      recognition.onerror = (event) => {
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone access.');
        } else if (event.error === 'no-speech') {
          // Ignore no-speech errors during continuous listening
        } else {
          setError(`Speech recognition error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        // Restart if still supposed to be listening
        if (recognitionRef.current?._shouldListen) {
          try {
            recognition.start();
          } catch {
            // Already started
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current._shouldListen = false;
        try {
          recognitionRef.current.stop();
        } catch {
          // Already stopped
        }
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setError(null);
      recognitionRef.current._shouldListen = true;
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setError('Failed to start speech recognition.');
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current._shouldListen = false;
      try {
        recognitionRef.current.stop();
      } catch {
        // Already stopped
      }
      setIsListening(false);
      setInterimText('');
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const clearText = useCallback(() => {
    setBanglaText('');
    setInterimText('');
  }, []);

  return {
    isListening,
    banglaText,
    setBanglaText,
    interimText,
    error,
    isSupported,
    startListening,
    stopListening,
    toggleListening,
    clearText,
  };
}

export default useSpeechRecognition;
