import axios from 'axios';

if (!process.env.AZURE_OPENAI_API_KEY) {
  throw new Error('AZURE_OPENAI_API_KEY is not set');
}

if (!process.env.AZURE_OPENAI_ENDPOINT) {
  throw new Error('AZURE_OPENAI_ENDPOINT is not set');
}

if (!process.env.AZURE_OPENAI_DEPLOYMENT_NAME) {
  throw new Error('AZURE_OPENAI_DEPLOYMENT_NAME is not set');
}

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

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
    const response = await axios.post(
      `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=2024-02-15-preview`,
      {
        messages: [
          {
            role: 'system',
            content: 'You are an expert surf forecaster and oceanographer with deep knowledge of wave mechanics, swell patterns, and surf conditions. Provide detailed, technical, yet clear analysis.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        }
      }
    );

    const content = response.data.choices[0]?.message?.content || '';
    
    // Split the content into sections based on headers
    const sections = content.split(/\d\.\s+(?:CURRENT CONDITIONS SUMMARY|TECHNICAL ANALYSIS|RECOMMENDATIONS):/i);
    const [_, summary, technicalDetails, recommendations] = sections;
    
    return {
      summary: summary?.trim() || 'No summary available',
      technicalDetails: technicalDetails?.trim() || 'No technical details available',
      recommendations: recommendations?.trim() || 'No recommendations available'
    };
  } catch (error) {
    console.error('Error analyzing surf conditions:', error);
    throw new Error('Failed to analyze surf conditions');
  }
} 