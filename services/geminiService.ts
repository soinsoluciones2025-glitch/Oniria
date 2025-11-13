import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const callGemini = async (instruction: string, text: string): Promise<string> => {
  if (!text.trim()) {
    return text;
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
      config: {
        systemInstruction: instruction,
      },
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Propagate a more user-friendly error message.
    if (error instanceof Error && error.message.includes('API key')) {
        throw new Error("La clave de API no es válida o no se ha configurado. Asegúrate de que la clave esté configurada correctamente.");
    }
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
