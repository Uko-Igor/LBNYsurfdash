import React from 'react';
import InteractiveCompass from './compass';

interface TemperatureIndicatorProps {
  airTemp: number;
  waterTemp: number;
  windDirection: string | number;
  title?: string;
}

export function TemperatureIndicator({ airTemp, waterTemp, windDirection, title = "Temperature & Wind" }: TemperatureIndicatorProps) {
  // Helper function to get color based on temperature
  const getColor = (temp: number) => {
    if (temp < 50) return 'rgb(59, 130, 246)'; // Blue for cold
    if (temp < 70) return 'rgb(52, 211, 153)'; // Green for mild
    return 'rgb(239, 68, 68)'; // Red for hot
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Temperature Display */}
      <div className="space-y-6">
        {/* Air Temperature */}
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-4">
            {airTemp.toFixed(1)}°F
          </div>
          <span className="text-sm text-slate-400">Air</span>
        </div>

        {/* Water Temperature */}
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-4">
            {waterTemp.toFixed(1)}°F
          </div>
          <span className="text-sm text-slate-400">Water</span>
        </div>
      </div>

      {/* Wind Direction Compass */}
      <div className="flex items-center justify-center">
        <InteractiveCompass direction={windDirection} />
      </div>
    </div>
  );
} 