import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

let ai: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI | null => {
  if (ai) {
    return ai;
  }
  // Safely check for process and API_KEY to prevent crashing in browser environments.
  // This code now runs only when the service is first used, not on app load.
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai;
  } else {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
    return null;
  }
};

export const generateSmartQuote = async (userInput: string, productCatalog: Product[]): Promise<any> => {
  const geminiClient = getAiClient();
  if (!geminiClient) {
    throw new Error("Gemini service is not available. API_KEY is not configured.");
  }
  
  const productInfo = productCatalog.map(p => `- ${p.name} (ID: ${p.id}, Price: ₦${p.price}, Category: ${p.category})`).join('\n');

  const prompt = `
    A customer is looking for a security and/or solar energy solution. Based on their needs described below, recommend a package of products from the catalog. Explain why each product is a good fit. Present the response as a structured JSON object.

    Customer Needs: "${userInput}"

    Available Product Catalog:
    ${productInfo}

    Provide a JSON response with a "recommendations" array. Each item in the array should be an object with "productId", "quantity", and a "justification" string explaining the recommendation. Also include a "summary" field with an overall explanation of the proposed solution.
  `;

  try {
    const response = await geminiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  productId: { type: Type.STRING },
                  quantity: { type: Type.INTEGER },
                  justification: { type: Type.STRING }
                },
                required: ["productId", "quantity", "justification"]
              }
            },
            summary: { type: Type.STRING }
          },
          required: ["recommendations", "summary"]
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating smart quote with Gemini:", error);
    throw new Error("Failed to generate quote. Please check your API key and connection.");
  }
};
