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

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { waveData } = data;

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are a seasoned surf forecaster. IMPORTANT: Focus on pure Swell Height (SwH) for wave measurements, NOT the Significant Wave Height (WVHT). Format your response as follows:

Conditions Rating - Quality Mood
- Swell Mechanics: SwH ft @Period s from Direction traveling Speed nm/hr (Include formation distance if available)
- Wind Impact: Speed mph Direction creating cross/onshore effects on swell type
- Tactical Breakdown:
   • Peak performance window: tide state ±X hrs due to bathymetric factor
   • Board match: shape boards excel in specific maneuver pockets
   • Risk/Reward: critical safety note vs optimal technique opportunity

Pro Insight: Connect to historical swell event or wave physics principle affecting takeoff timing

This is for Lincoln Blvd, Long Beach New York. Remember to use SwH (pure swell height) as your primary wave height metric, not WVHT.`
      },
      {
        role: "user",
        content: `Tell me straight about today's surf conditions. Keep it brief but wise. Here are the measurements:

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
          
          Share your wisdom about these conditions in a few clear sentences. Speak as if giving advice to a younger surfer.`
      }
    ];

    const completion = await client.chat.completions.create({
      model: deployment,
      messages: messages,
      max_tokens: 200,
      temperature: 0.7,
      top_p: 0.9,
      frequency_penalty: 0.5,
      presence_penalty: 0.3,
    });

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