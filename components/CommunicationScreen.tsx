import React, { useState, useEffect } from 'react';
import { useSpeech } from '../hooks/useSpeech';
import { COMMON_PHRASES } from '../constants';
import LargeButton from './LargeButton';
import LoadingSpinner from './LoadingSpinner';
import { correctText, rephraseText } from '../services/geminiService';

interface CommunicationScreenProps {
  isHearingModeEnabled: boolean;
}

const CommunicationScreen: React.FC<CommunicationScreenProps> = ({ isHearingModeEnabled }) => {
  if (isHearingModeEnabled) {
    return <HearingModeUI />;
  }
  return <StandardModeUI />;
};

const StandardModeUI: React.FC = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { speak, isSpeaking } = useSpeech();

  const handleAiAction = async (action: (text: string) => Promise<string>) => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await action(text);
      setText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="communication-container">
      <textarea
        className="text-area"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe o selecciona una frase..."
        aria-label="Área de texto principal"
      />
      <div className="actions-grid">
        <LargeButton onClick={() => speak(text)} disabled={isSpeaking || !text.trim()} variant="speak">
          {isSpeaking ? 'Hablando...' : 'Hablar'}
        </LargeButton>
        <LargeButton onClick={() => setText('')} variant="clear">
          Limpiar
        </LargeButton>
        <LargeButton onClick={() => handleAiAction(correctText)} variant="ai" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : 'Corregir (IA)'}
        </LargeButton>
        <LargeButton onClick={() => handleAiAction(rephraseText)} variant="ai" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : 'Reformular (IA)'}
        </LargeButton>
      </div>
      {error && <p className="error-message" role="alert">{error}</p>}
       <div className="ai-explanation">
        <div className="explanation-item">
          <h4>Corregir (IA)</h4>
          <p>Ideal para quienes tienen dificultades con la ortografía o la escritura (dislexia, apraxia). La IA entiende tu intención y corrige el texto.</p>
        </div>
        <div className="explanation-item">
          <h4>Reformular (IA)</h4>
          <p>Útil para encontrar las palabras correctas. Transforma tus ideas en frases más completas o formales para expresar exactamente lo que quieres decir.</p>
        </div>
      </div>
      <div className="phrases-grid">
        {COMMON_PHRASES.map((phrase) => (
          <button key={phrase} className="phrase-button" onClick={() => {
            const newText = text ? `${text.trim()} ${phrase}` : phrase;
            setText(newText);
          }}>
            {phrase}
          </button>
        ))}
      </div>
    </div>
  );
};

const HearingModeUI: React.FC = () => {
  const { transcript, isListening, startListening, stopListening, hasSpeechSupport } = useSpeech();

  useEffect(() => {
    startListening();
    return () => {
      stopListening();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="hearing-mode-container">
      {!hasSpeechSupport && (
        <p className="hearing-mode-warning">
          La API de Reconocimiento de Voz no es compatible con este navegador. Por favor, utiliza Google Chrome o Firefox.
        </p>
      )}
      <p className="hearing-mode-text" aria-live="assertive">
        {transcript || (isListening ? 'Escuchando...' : 'Inicia el modo auditivo en Ajustes.')}
      </p>
      <div className="hearing-mode-status">
        <div className={`status-indicator ${isListening ? 'listening' : ''}`}></div>
        {isListening ? 'Escuchando' : 'Detenido'}
      </div>
    </div>
  );
};

export default CommunicationScreen;
