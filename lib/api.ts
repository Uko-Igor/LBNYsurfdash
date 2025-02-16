export interface WaveTrendPoint {
  time: string;
  height: number;
}

export interface ForecastTrend {
  height: number;
}

export interface SurfData {
  waveHeight: number;
  swellHeight: number;
  period: number;
  windSpeed: number;
  windGusts: number;
  windDirection: number;
  airTemperature: number;
  waterTemperature: number;
  feelsLike: number;
  waveTrend: WaveTrendPoint[];
  forecastTrend: ForecastTrend;
  swellDirection: string;
}

const defaultSurfData: SurfData = {
  waveHeight: 0,
  swellHeight: 0,
  period: 0,
  windSpeed: 0,
  windGusts: 0,
  windDirection: 0,
  airTemperature: 0,
  waterTemperature: 0,
  feelsLike: 0,
  waveTrend: [],
  forecastTrend: { height: 0 },
  swellDirection: 'N/A'
};

export async function fetchSurfData(): Promise<SurfData> {
  try {
    const response = await fetch('/api/surf-data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Validate the response data
    if (!isValidSurfData(data)) {
      throw new Error('Invalid data format received from API');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching surf data:', error);
    throw error;
  }
}

// Type guard to validate the response
function isValidSurfData(data: any): data is SurfData {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.waveHeight === 'number' &&
    typeof data.swellHeight === 'number' &&
    typeof data.period === 'number' &&
    typeof data.windSpeed === 'number' &&
    Array.isArray(data.waveTrend) &&
    typeof data.forecastTrend === 'object'
  );
} 