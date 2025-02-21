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

function generateSurfReport(waveData: WaveData): string {
  // Convert string values to numbers
  const waveHeight = parseFloat(waveData.WVHT);
  const swellHeight = parseFloat(waveData.SwH);
  const windWaveHeight = parseFloat(waveData.WWH);
  const swellPeriod = parseFloat(waveData.SwP);
  const windWavePeriod = parseFloat(waveData.WWP);
  const avgPeriod = parseFloat(waveData.APD);
  const windDir = parseInt(waveData.WDIR);
  const airTemp = parseFloat(waveData.ATMP);
  const waterTemp = parseFloat(waveData.WTMP);

  // Check for missing or invalid data
  if (isNaN(waveHeight) || isNaN(swellHeight) || isNaN(windWaveHeight) || 
      isNaN(swellPeriod) || isNaN(windWavePeriod) || isNaN(avgPeriod) || 
      isNaN(windDir) || isNaN(airTemp) || isNaN(waterTemp)) {
    return "Unable to generate report due to missing or invalid data.";
  }

  // Wave height interpretation
  let waveDesc = "";
  if (waveHeight < 1) waveDesc = "very small";
  else if (waveHeight < 2) waveDesc = "small";
  else if (waveHeight < 3) waveDesc = "mild";
  else if (waveHeight < 4) waveDesc = "moderate";
  else if (waveHeight < 6) waveDesc = "considerable";
  else waveDesc = "large";

  // Swell direction interpretation
  let swellDirDesc = waveData.SwD;
  
  // Wind direction interpretation
  let windEffect = "";
  if (windDir >= 45 && windDir <= 135) windEffect = "cross-shore";
  else if (windDir > 135 && windDir < 225) windEffect = "onshore";
  else windEffect = "offshore";

  // Wave steepness interpretation
  let steepnessDesc = "";
  switch (waveData.STEEPNESS) {
    case "VERY_STEEP":
      steepnessDesc = "choppy and steep";
      break;
    case "STEEP":
      steepnessDesc = "steep";
      break;
    case "AVERAGE":
      steepnessDesc = "moderate steepness";
      break;
    default:
      steepnessDesc = "gentle";
  }

  // Temperature description
  const tempDesc = airTemp < 50 ? "cold" : airTemp < 70 ? "mild" : "warm";

  // Generate concise report
  return `${waveDesc.charAt(0).toUpperCase() + waveDesc.slice(1)} ${steepnessDesc} waves at ${waveHeight.toFixed(1)} ft. Primary swell from ${swellDirDesc} with ${windEffect} ${tempDesc} winds. Water temp: ${waterTemp.toFixed(1)}°F.`;
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

    // Generate the surf report using our new function
    const report = generateSurfReport(waveData);

    // Return the generated report
    return NextResponse.json({
      report: report
    });

  } catch (error) {
    console.error('Error generating surf report:', error);
    return NextResponse.json(
      { error: 'Failed to generate surf report' },
      { status: 500 }
    );
  }
} 