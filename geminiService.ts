
import { GoogleGenAI, Type } from "@google/genai";
import { ExplanationData } from "./types";

export const getExplanation = async (topic: string): Promise<ExplanationData> => {
  const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain the following topic: ${topic}`,
    config: {
      systemInstruction: "You are a world-class educational assistant for students. When a user provides a topic name, you must explain it in three specific sections: 1. Simple Explanation, 2. Real-life Example, and 3. Why This Concept Is Important. Keep explanations short, engaging, and beginner-friendly. Always respond in JSON format.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: {
            type: Type.STRING,
            description: "The name of the topic provided."
          },
          simpleExplanation: {
            type: Type.STRING,
            description: "A clear, concise, and simple explanation of the concept."
          },
          realLifeExample: {
            type: Type.STRING,
            description: "A relatable real-world example of the concept in action."
          },
          importance: {
            type: Type.STRING,
            description: "The reason why understanding this concept is important or useful."
          }
        },
        required: ["topic", "simpleExplanation", "realLifeExample", "importance"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from AI assistant.");
  }

  return JSON.parse(text) as ExplanationData;
};
