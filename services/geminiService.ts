import { GoogleGenAI } from "@google/genai";

// This service is prepared for the "Consulting Support" feature mentioned in the login text.
// Currently unused in the visual-only login demo, but ready for integration.

const apiKey = process.env.API_KEY || ''; // Ideally loaded safely

let ai: GoogleGenAI | null = null;

if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
}

export const getConsultingAdvice = async (topic: string): Promise<string> => {
    if (!ai) return "AI service not configured.";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Give me a short, motivating business tip about ${topic}.`,
        });
        return response.text || "Keep growing!";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Growth is a journey.";
    }
};