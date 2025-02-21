import { NextResponse } from 'next/server';
import { AzureOpenAI } from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "https://ai-igorukolov5876ai100185303012.openai.azure.com/";
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4o-mini";
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = process.env.OPENAI_API_VERSION;

const client = new AzureOpenAI({
  apiKey: apiKey || "",
  endpoint: endpoint,
  deployment: deployment,
  apiVersion: apiVersion || "2024-02-15-preview",
});

interface WaveData {
  WVHT: string;  // Wave Height
  SwH: string;   // Swell Height
  WWH: string;   // Wind Wave Height
  SwP: string;   // Swell Period
  WWP: string;   // Wind Wave Period
  APD: string;   // Average Period
  SwD: string;   // Swell Direction
  WDIR: string;  // Wind Direction
  ATMP: string;  // Air Temperature
  WTMP: string;  // Water Temperature
  STEEPNESS: string; // Wave Steepness
}

function createSurfReportPrompt(waveData: WaveData): string {
  return `Role: You are a seasoned surf forecaster with a knack for explaining complex data simply.

Task: Generate a concise surf report (approximately 50-80 words) using the provided data. Format your answer in clear paragraphs covering:

- Overall Quality (e.g., "Fair," "Good," "Excellent," "Choppy," "Clean")
- Key Data: Swell: ${waveData.SwH} at ${waveData.SwP} from ${waveData.SwD}. Wind: ${waveData.WDIR}°.
- Impact: Explain how the swell and wind affect the surf, focusing on what this means for the surfer (e.g., wave quality, difficulty).
- Summary: One sentence summarizing the overall surf experience.
- Optional Surf Insight: A brief, integrated surfing fact (without labeling it as a "fun fact").

Additional Data:
- Combined wave height: ${waveData.WVHT}
- Wind waves: ${waveData.WWH} @ ${waveData.WWP}
- Water temp: ${waveData.WTMP}
- Wave steepness: ${waveData.STEEPNESS}

Guidelines: 
- Use ${waveData.SwH} as the true wave height (based on swell height only)
- Prioritize clarity, actionable insights, and a surfer-friendly tone
- Write in present tense
- Focus on what matters most to surfers
- Format as flowing paragraphs without bullet points or asterisks
- Complete all sentences naturally, even if it means going slightly over the word count`;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { waveData } = data;

    // Debug log of raw wave data
    console.log('Raw Wave Data:', `
Wave Height: ${waveData.WVHT}
Swell Height: ${waveData.SwH}
Wind Wave Height: ${waveData.WWH}
Swell Period: ${waveData.SwP}
Wind Wave Period: ${waveData.WWP}
Average Period: ${waveData.APD}
Swell Direction: ${waveData.SwD}
Wind Direction: ${waveData.WDIR}
Air Temperature: ${waveData.ATMP}
Water Temperature: ${waveData.WTMP}
Wave Steepness: ${waveData.STEEPNESS}
    `);

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: "You are a technical surf forecaster. You provide concise, accurate surf reports focused on actionable information for surfers."
      },
      {
        role: "user",
        content: createSurfReportPrompt(waveData)
      }
    ];

    const completion = await client.chat.completions.create({
      messages,
      model: deployment,
      temperature: 0.7,
      max_tokens: 200,  // Increased to allow for natural sentence completion
      frequency_penalty: 0.5,
      presence_penalty: 0.3,
    });

    // Return the generated report
    return NextResponse.json({
      report: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Error generating surf report:', error);
    return NextResponse.json(
      { error: 'Failed to generate surf report' },
      { status: 500 }
    );
  }
} 