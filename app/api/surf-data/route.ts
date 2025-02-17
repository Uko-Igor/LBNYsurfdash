import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { analyzeSurfConditions } from '@/lib/azure-openai';

// Disable caching for this route
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    // Fetch current conditions using HTML scraping
    const response = await axios.get('https://www.ndbc.noaa.gov/station_page.php?station=44065', { 
      headers,
      // Add timeout
      timeout: 10000,
      // Add cache busting parameter
      params: {
        t: new Date().getTime()
      }
    });
    
    if (!response.data) {
      throw new Error('No data received from NDBC');
    }

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
    const timestampText = $('.titleDataHeader').first().text().trim();
    console.log('Raw HTML:', $('.titleDataHeader').first().html());
    console.log('Raw timestamp text:', timestampText);
    
    let extractedTimestamp = 'N/A';
    
    // Pattern 1: Try to match the standard format "Conditions at 44065 as of(HH:MM am/pm EST)NNNN GMT on MM/DD/YYYY:"
    const pattern1 = /\((\d{1,2}:\d{2}\s*(?:am|pm)\s*(?:EST|EDT))\).*?(\d{2}\/\d{2}\/\d{4})/i;
    const matches = timestampText.match(pattern1);
    
    if (matches) {
        const [_, time, date] = matches;
        extractedTimestamp = `Updated ${time} on ${date}`;
        console.log('Pattern 1 match:', matches);
    } else {
        // Pattern 2: Fallback for other formats
        const timeMatch = timestampText.match(/\((\d{1,2}:\d{2}\s*(?:am|pm)\s*(?:EST|EDT))\)/i);
        const dateMatch = timestampText.match(/(\d{2}\/\d{2}\/\d{4})/);
        
        if (timeMatch && dateMatch) {
            extractedTimestamp = `Updated ${timeMatch[1]} on ${dateMatch[1]}`;
            console.log('Pattern 2 match - time:', timeMatch[1], 'date:', dateMatch[1]);
        }
    }

    surfData.timestamp = extractedTimestamp;
    console.log('Final timestamp value:', surfData.timestamp);

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

    return NextResponse.json(surfData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error: any) {
    console.error('Error fetching surf data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch surf data', details: error.message },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, private',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
} 