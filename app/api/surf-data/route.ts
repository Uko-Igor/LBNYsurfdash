import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { analyzeSurfConditions } from '@/lib/gemini';

export interface WaveTrendPoint {
  timestamp: string;
  wvht: number;
  swh: number;
  swp: number;
  swd: string;
  wwh: number;
  wwp: number;
  wwd: string;
  steepness: string;
  apd: number;
}

export interface SurfData {
  timestamp: string;
  WDIR: string;
  WSPD: string;
  GST: string;
  WVHT: string;
  STEEPNESS: string;
  SwH: string;
  SwP: string;
  SwD: string;
  WWH: string;
  WWP: string;
  WWD: string;
  ATMP: string;
  WTMP: string;
  CHILL: string;
  APD: string;
  waveTrend: WaveTrendPoint[];
  analysis?: {
    summary: string;
    technicalDetails: string;
    recommendations: string;
  };
}

function degreesToCardinal(degrees: number): string {
  const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return cardinals[index];
}

function parseFloatSafe(value: string, defaultValue: number = 0): number {
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
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    };

    // Fetch current conditions using HTML scraping
    const response = await axios.get('https://www.ndbc.noaa.gov/station_page.php?station=44065', { headers });
    const $ = cheerio.load(response.data);

    // Initialize data object with default values
    const surfData: SurfData = {
      timestamp: 'N/A',
      WDIR: 'N/A',
      WSPD: 'N/A',
      GST: 'N/A',
      WVHT: 'N/A',
      STEEPNESS: 'N/A',
      SwH: 'N/A',
      SwP: 'N/A',
      SwD: 'N/A',
      WWH: 'N/A',
      WWP: 'N/A',
      WWD: 'N/A',
      ATMP: 'N/A',
      WTMP: 'N/A',
      CHILL: 'N/A',
      APD: 'N/A',
      waveTrend: []
    };

    // Extract timestamp from the conditions caption
    const timestampText = $('.titleDataHeader').first().text();
    const timestampMatch = timestampText.match(/Conditions at 44065 as of\s*\((.*?)\)\s*(.*?)\s*on\s*(.*?):/);
    if (timestampMatch) {
      const [_full, time, _tz, date] = timestampMatch;
      surfData.timestamp = `${time} on ${date}`;
    }

    // Parse the current conditions table
    $('.currentobs tr').each((index, row) => {
      const cells = $(row).find('td');
      if (cells.length >= 2) {
        const label = $(cells[0]).text().trim();
        let value = $(cells[1]).text().trim();

        // Clean up duplicate units
        value = value.replace(/ ft ft$/, ' ft')
                    .replace(/ sec sec$/, ' sec')
                    .replace(/°F°F$/, '°F')
                    .replace(/ kts kts$/, ' kts');

        if (label.includes('Wind Direction')) {
          // Extract degrees from format "XXX ( YY deg true )"
          const degMatch = value.match(/\(?\s*(\d+)\s*deg/i);
          surfData.WDIR = degMatch ? degMatch[1] : value;
          // Add debug logging
          console.log('Wind Direction Data:', {
            raw: value,
            parsed: degMatch ? degMatch[1] : value
          });
        } else if (label.includes('Wind Speed')) {
          surfData.WSPD = value;
        } else if (label.includes('Wind Gust')) {
          surfData.GST = value;
        } else if (label.includes('Significant Wave Height')) {
          surfData.WVHT = value;
        } else if (label.includes('Swell Height')) {
          surfData.SwH = value;
        } else if (label.includes('Swell Period')) {
          surfData.SwP = value;
        } else if (label.includes('Swell Direction')) {
          surfData.SwD = value;
        } else if (label.includes('Wind Wave Height')) {
          surfData.WWH = value;
        } else if (label.includes('Wind Wave Period')) {
          surfData.WWP = value;
        } else if (label.includes('Wind Wave Direction')) {
          surfData.WWD = value;
        } else if (label.includes('Wave Steepness')) {
          surfData.STEEPNESS = value;
        } else if (label.includes('Average Wave Period')) {
          surfData.APD = value;
        } else if (label.includes('Air Temperature')) {
          surfData.ATMP = value;
        } else if (label.includes('Water Temperature')) {
          surfData.WTMP = value;
        } else if (label.includes('Wind Chill')) {
          surfData.CHILL = value;
        }
      }
    });

    // Extract wave trend data from the historical data table
    const waveTrendData: WaveTrendPoint[] = [];
    $('.dataTable tbody tr').each((i, row) => {
      const cells = $(row).find('td, th');
      if (cells.length >= 8) {
        const timestamp = $(cells[0]).text().trim();
        const wvht = parseFloatSafe($(cells[4]).text().trim());
        const swh = wvht * 0.67; // Calculate swell height as 67% of wave height
        const swp = parseFloatSafe($(cells[5]).text().trim());
        const swd = $(cells[7]).text().trim();
        
        if (!isNaN(wvht)) {
          waveTrendData.push({
            timestamp,
            wvht,
            swh,
            swp,
            swd,
            wwh: 0,
            wwp: 0,
            wwd: '',
            steepness: '',
            apd: parseFloatSafe($(cells[6]).text().trim())
          });
        }
      }
    });

    surfData.waveTrend = waveTrendData;

    return NextResponse.json(surfData);
  } catch (error) {
    console.error('Error fetching surf data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch surf data' },
      { status: 500 }
    );
  }
} 