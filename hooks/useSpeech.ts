import { useState, useEffect, useRef } from 'react';

// Type definitions for the Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}


const getSpeechRecognition = () => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  return SpeechRecognition ? new SpeechRecognition() : null;
};

export const useSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(getSpeechRecognition());

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }

    recognition.lang = 'es-ES';
    recognition.interimResults = true;
    recognition.continuous = true;

    const handleResult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(prev => `${prev}${finalTranscript} `);
      }
    };
    
    const handleEnd = () => {
      // If continuous is true, it might stop on its own. Restart if we want it to be truly continuous.
      if (recognition.continuous && isListening) {
         recognition.start();
      } else {
        setIsListening(false);
      }
    };

    const handleError = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error, event.message);
        setIsListening(false);
    };
    
    recognition.onresult = handleResult;
    recognition.onend = handleEnd;
    recognition.onerror = handleError;

    return () => {
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.stop();
    };
  }, [isListening]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech Synthesis API not supported in this browser.");
      return;
    }
    if (text.trim()) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        console.error("Speech synthesis error");
        setIsSpeaking(false);
      };
      window.speechSynthesis.cancel(); // Cancel any previous speech
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return { 
    isListening, 
    transcript, 
    startListening, 
    stopListening,
    isSpeaking,
    speak,
    stopSpeaking,
    hasSpeechSupport: !!recognitionRef.current && ('speechSynthesis' in window)
  };
};
