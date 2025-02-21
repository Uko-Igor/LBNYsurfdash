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
  WVHT: string;
  SwH: string;
  WWH: string;
  SwP: string;
  WWP?: string;
  APD: string;
  SwD: string;
  WDIR: string;
  ATMP?: string;
  WTMP: string;
  STEEPNESS?: string;
}

function generateSurfReport(waveData: WaveData): string {
  // Input validation
  const requiredKeys = ["WVHT", "SwH", "WWH", "SwP", "APD", "SwD", "WDIR", "WTMP"];
  const missingKeys = requiredKeys.filter(key => !(key in waveData));
  if (missingKeys.length > 0) {
    return `Error: Missing essential data for the surf report: ${missingKeys.join(', ')}`;
  }

  try {
    const waveHeight = parseFloat(waveData.WVHT);
    const swellHeight = parseFloat(waveData.SwH);
    const windWaveHeight = parseFloat(waveData.WWH);
    const swellPeriod = parseFloat(waveData.SwP);
    const windWavePeriod = waveData.WWP ? parseFloat(waveData.WWP) : 0;
    const averagePeriod = parseFloat(waveData.APD);
    const swellDirection = waveData.SwD;
    const windDirection = waveData.WDIR;
    const airTemperature = waveData.ATMP ? parseFloat(waveData.ATMP) : "N/A";
    const waterTemperature = parseFloat(waveData.WTMP);
    const steepness = waveData.STEEPNESS || "N/A";

    let report = `Surf Report:\n`;
    report += `Wave Height: ${waveHeight.toFixed(1)}ft (Combined: ${swellHeight.toFixed(1)}ft swell + ${windWaveHeight.toFixed(1)}ft wind wave)\n`;
    report += `Swell Period: ${swellPeriod.toFixed(1)}s, Average Period: ${averagePeriod.toFixed(1)}s\n`;

    // Swell and Wind Direction Interpretation
    report += `Swell Direction: ${swellDirection}, Wind Direction: ${windDirection}\n`;
    if (swellDirection.toUpperCase().includes("NW") && windDirection.toUpperCase().includes("NW")) {
      report += `  -> Onshore wind, expect choppy conditions.\n`;
    } else if (
      (swellDirection.toUpperCase().includes("SW") || swellDirection.toUpperCase().includes("W")) && 
      (windDirection.toUpperCase().includes("N") || windDirection.toUpperCase().includes("NE"))
    ) {
      report += `  -> Offshore wind, expect cleaner, groomed waves.\n`;
    } else if (
      (swellDirection.toUpperCase().includes("SE") || swellDirection.toUpperCase().includes("E")) && 
      (windDirection.toUpperCase().includes("W") || windDirection.toUpperCase().includes("NW"))
    ) {
      report += `  -> Offshore wind, expect cleaner, groomed waves.\n`;
    } else {
      report += `  -> Wind and swell directions are different, cross-shore conditions may vary.\n`;
    }

    if (windWavePeriod) {
      report += `Wind Wave Period: ${windWavePeriod.toFixed(1)}s\n`;
    }

    if (steepness !== "N/A") {
      report += `Wave Steepness: ${steepness}`;
      if (steepness === "VERY_STEEP") {
        report += ` (Expect fast, barreling waves, for experienced surfers).`;
      } else if (steepness === "STEEP") {
        report += ` (Expect relatively fast breaking waves).`;
      } else if (steepness === "AVERAGE") {
        report += ` (Average steepness).`;
      } else if (steepness === "SWELL") {
        report += ` (Expect gentle, slower breaking waves, potentially good for beginners).`;
      }
      report += `\n`;
    }

    report += `Water Temperature: ${waterTemperature.toFixed(1)}°F`;
    if (airTemperature !== "N/A") {
      report += `, Air Temperature: ${airTemperature.toFixed(1)}°F`;
    }

    return report;

  } catch (error) {
    return `Error: Invalid data format in input. Check data types. (${error})`;
  }
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