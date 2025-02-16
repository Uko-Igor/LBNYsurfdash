import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface WaveTrendPoint {
  time: string;
  height: number;
  swellHeight: number;
  swellPeriod: number;
}

interface SurfData {
  timestamp: string;
  WDIR: string;
  WSPD: string;
  GST: string;
  WVHT: string;
  STEEPNESS: string;
  SwH: string;
  SwP: string;
  SwD: string;
  ATMP: string;
  WTMP: string;
  CHILL: string;
  APD: string;
  waveTrend: WaveTrendPoint[];
}

function degreesToCardinal(degrees: number): string {
  const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return cardinals[index];
}

function parseFloatSafe(value: string | undefined, defaultValue: number = 0): number {
  if (!value || value === 'MM') return defaultValue;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

// Convert meters to feet
function metersToFeet(meters: number): number {
  return meters * 3.28084;
}

// Convert m/s to knots
function msToKnots(ms: number): number {
  return ms * 1.94384;
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

export async function GET() {
  try {
    // Fetch current conditions
    const currentResponse = await axios.get('https://www.ndbc.noaa.gov/station_page.php?station=44065&uom=E&tz=EST', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Fetch historical data
    const historicalResponse = await axios.get('https://www.ndbc.noaa.gov/data/5day2/44065_5day.txt', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(currentResponse.data);
    const data: SurfData = {
      timestamp: '',
      WDIR: 'N/A',
      WSPD: 'N/A',
      GST: 'N/A',
      WVHT: 'N/A',
      STEEPNESS: 'N/A',
      SwH: 'N/A',
      SwP: 'N/A',
      SwD: 'N/A',
      ATMP: 'N/A',
      WTMP: 'N/A',
      CHILL: 'N/A',
      APD: 'N/A',
      waveTrend: []
    };

    // Process historical data
    const lines = historicalResponse.data.split('\n');
    const waveTrend: WaveTrendPoint[] = [];
    
    // Skip header lines (first 2 lines)
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const parts = line.split(/\s+/);
        if (parts.length >= 8) {
          const [year, month, day, hour, minute] = parts.slice(0, 5).map(Number);
          const waveHeight = parseFloat(parts[8]); // WVHT
          const swellHeight = parseFloat(parts[9]); // SwH
          const swellPeriod = parseFloat(parts[10]); // SwP
          
          if (!isNaN(waveHeight) && !isNaN(swellHeight)) {
            const date = new Date(year, month - 1, day, hour, minute);
            waveTrend.push({
              time: date.toISOString(),
              height: waveHeight,
              swellHeight: swellHeight,
              swellPeriod: swellPeriod || 0
            });
          }
        }
      }
    }

    data.waveTrend = waveTrend.reverse(); // Most recent first

    // Extract timestamp
    const timestampText = $('body').text();
    const timestampMatch = timestampText.match(/Conditions at 44065 as of\s*\((\d{1,2}:\d{2}\s*(?:am|pm)\s*EST)\)\s*\d{4}\s*GMT\s*on\s*(\d{2}\/\d{2}\/\d{4})/)
    if (timestampMatch) {
      const timeStr = timestampMatch[1].toLowerCase().replace(' est', '');
      const dateStr = timestampMatch[2];
      data.timestamp = `${timeStr} on ${dateStr}`;
    }

    // Extract data from tables
    $('table').each((_: number, table: any) => {
      $(table).find('tr').each((_: number, row: any) => {
        const cells = $(row).find('td, th');
        if (cells.length >= 2) {
          const text = $(cells[0]).text().trim();
          const value = $(cells[1]).text().trim();

          // Map the data
          if (/Wind Direction|WDIR/i.test(text)) {
            const dirMatch = value.match(/([NSEW]+)\s*\(\s*(\d+)\s*deg/)
            if (dirMatch) {
              data.WDIR = `${dirMatch[1]} (${dirMatch[2]}°)`
            }
          } else if (text === "Wind Speed (WSPD):" || text === "Wind Speed:") {
            const match = value.match(/([\d.]+)/)
            if (match) data.WSPD = `${match[1]} kts`
          } else if (text === "Wind Gust (GST):" || text === "Wind Gust:") {
            const match = value.match(/([\d.]+)/)
            if (match) data.GST = `${match[1]} kts`
          } else if (text === "Wave Height (WVHT):" || text === "Significant Wave Height:") {
            const match = value.match(/([\d.]+)/)
            if (match) data.WVHT = `${parseFloat(match[1]).toFixed(1)} ft`
          } else if (text === "Wave Steepness:" || text === "STEEPNESS:") {
            data.STEEPNESS = value.trim()
          } else if (text === "Swell Height (SwH):" || text === "Swell Height:") {
            const match = value.match(/([\d.]+)/)
            if (match) data.SwH = `${parseFloat(match[1]).toFixed(1)} ft`
          } else if (text === "Swell Period (SwP):" || text === "Swell Period:") {
            const match = value.match(/([\d.]+)/)
            if (match) data.SwP = `${parseFloat(match[1]).toFixed(1)} sec`
          } else if (text === "Swell Direction (SwD):" || text === "Swell Direction:") {
            data.SwD = value
          } else if (text === "Air Temperature (ATMP):" || text === "Air Temperature:") {
            const match = value.match(/([\d.]+)/)
            if (match) data.ATMP = `${match[1]}°F`
          } else if (text === "Water Temperature (WTMP):" || text === "Water Temperature:") {
            const match = value.match(/([\d.]+)/)
            if (match) data.WTMP = `${match[1]}°F`
          } else if (text === "Wind Chill (CHILL):" || text === "Wind Chill:") {
            const match = value.match(/([\d.]+)/)
            if (match) data.CHILL = `${match[1]}°F`
          } else if (text === "Average Period (APD):" || text === "Average Period:") {
            const match = value.match(/([\d.]+)/)
            if (match) data.APD = `${match[1]} sec`
          }
        }
      });
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching surf data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch surf data' },
      { status: 500 }
    );
  }
} 