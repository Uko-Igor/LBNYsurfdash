import { GoogleGenerativeAI, GenerativeModel, GenerationConfig, ChatSession } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set');
}

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

const model: GenerativeModel = genai.getGenerativeModel({
  model: "gemini-pro",
  generationConfig,
});

export interface SurfAnalysis {
  summary: string;
  technicalDetails: string;
  recommendations: string;
}

export async function analyzeSurfConditions(surfData: string): Promise<SurfAnalysis> {
  const prompt = `As a professional surf forecaster and oceanographer, analyze the following surf conditions data:

${surfData}

Please structure your response in three distinct sections:

1. CURRENT CONDITIONS SUMMARY:
Provide a single, very concise phrase (maximum 25 characters) that captures the overall surf conditions.

2. TECHNICAL ANALYSIS:
- Wave mechanics (height, period, steepness)
- Swell patterns and energy
- Wind influence on wave shape
- Environmental factors affecting conditions
- Oceanographic interpretation of data

3. RECOMMENDATIONS:
- Beginner surfer guidance
- Intermediate surfer opportunities
- Advanced surfer considerations
- Safety precautions if necessary
- Best spots/breaks for current conditions

Format each section clearly and professionally, using technical terminology where appropriate.`;

  try {
    const chat: ChatSession = model.startChat({
      history: [],
      generationConfig: {
        ...generationConfig,
        maxOutputTokens: 1000, // Limiting for this specific use case
      },
    });

    const response = await chat.sendMessage(prompt);
    const content = response.text;

    // Extract sections using a more robust approach
    const summaryMatch = content.match(/CURRENT CONDITIONS SUMMARY:([^]*?)(?=TECHNICAL ANALYSIS:|$)/i);
    const technicalMatch = content.match(/TECHNICAL ANALYSIS:([^]*?)(?=RECOMMENDATIONS:|$)/i);
    const recommendationsMatch = content.match(/RECOMMENDATIONS:([^]*?)$/i);
    
    return {
      summary: summaryMatch?.[1]?.trim() || 'No summary available',
      technicalDetails: technicalMatch?.[1]?.trim() || 'No technical details available',
      recommendations: recommendationsMatch?.[1]?.trim() || 'No recommendations available'
    };
  } catch (error) {
    console.error('Error analyzing surf conditions:', error);
    throw new Error('Failed to analyze surf conditions');
  }
} 