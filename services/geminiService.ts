import { GoogleGenAI } from "@google/genai";

// Fix: Adhere to Gemini API guidelines for initialization. The API key must be
// sourced directly from `process.env.API_KEY` and passed as a named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const callGemini = async (instruction: string, text: string): Promise<string> => {
  // Fix: Remove API key check as its availability is a prerequisite according to guidelines.
  if (!text.trim()) {
    return text;
  }
  try {
    // Fix: Use `systemInstruction` in `config` for better prompt separation as per guidelines.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
      config: {
        systemInstruction: instruction,
      },
    });
    
    // According to guidelines, response.text is the correct way to access the text.
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("No se pudo procesar la solicitud de IA. Revisa la consola para más detalles.");
  }
};

export const rephraseText = (text: string): Promise<string> => {
  const instruction = "Reformula el siguiente texto para que sea más educado, claro y completo. Mantén el significado original.";
  return callGemini(instruction, text);
};

export const correctText = (text: string): Promise<string> => {
  const instruction = "Corrige la gramática y la ortografía del siguiente texto. El autor puede tener dificultades para escribir, así que prioriza interpretar la intención fonética o conceptual. No cambies el significado. Devuelve solo el texto corregido.";
  return callGemini(instruction, text);
};
