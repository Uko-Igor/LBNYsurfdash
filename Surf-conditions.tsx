'use client'

import { useEffect, useState } from 'react';
import { SurfData } from '@/app/api/surf-data/route';
import { WeatherCard } from '@/components/ui/weather-card';
import { Compass } from '@/components/compass';
import { WaveChart } from '@/components/wave-chart';
import { TemperatureGauge } from '@/components/temperature-gauge';
import { TemperatureIndicator } from '@/components/ui/temperature-indicator';

export default function SurfConditions() {
  const [data, setData] = useState<SurfData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/surf-data');
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch surf data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-lg">Loading surf conditions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-lg">No data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2 glow-text">Surf Dashboard</h1>
        <p className="text-gray-400">Updated {data.timestamp || 'N/A'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WeatherCard title="Wave Analysis">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-400">{data.WVHT || 'N/A'}</div>
            <div className="text-gray-400">Swell Period: {data.SwP || 'N/A'}</div>
            <div className="text-gray-400">Direction: {data.SwD || 'N/A'}</div>
          </div>
        </WeatherCard>

        <WeatherCard title="Wind Conditions">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-400">{data.WSPD || 'N/A'}</div>
            <div className="text-gray-400">Direction: {data.WDIR || 'N/A'}</div>
            <div className="text-gray-400">Gusts: {data.GST || 'N/A'}</div>
          </div>
        </WeatherCard>

        <WeatherCard title="Temperature">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400">Air</div>
                <div className="text-xl font-semibold text-white">{data.ATMP || 'N/A'}</div>
              </div>
              <div>
                <div className="text-gray-400">Water</div>
                <div className="text-xl font-semibold text-white">{data.WTMP || 'N/A'}</div>
              </div>
            </div>
          </div>
        </WeatherCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Wave Trend</h2>
          <WaveChart data={data.waveTrend?.map(point => ({
            timestamp: point.timestamp,
            wvht: parseFloat(point.wvht.toString()),
            swh: parseFloat(point.swh.toString())
          })) || []} />
        </div>
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Wind Direction</h2>
          <div className="flex justify-center">
            <Compass 
              direction={data.WDIR} 
              speed={parseFloat(data.WSPD)} 
              gust={parseFloat(data.GST)} 
            />
          </div>
        </div>
      </div>

      {data.analysis && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Surf Analysis</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Summary</h3>
              <p className="text-gray-300">{data.analysis.summary}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Technical Details</h3>
              <p className="text-gray-300">{data.analysis.technicalDetails}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Recommendations</h3>
              <p className="text-gray-300">{data.analysis.recommendations}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WaveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  );
}

function WindIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}

function TempIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}

function WaterTempIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6.8 11a6 6 0 1 0 10.396 0l-5.197-8-5.2 8Z" />
    </svg>
  );
} 