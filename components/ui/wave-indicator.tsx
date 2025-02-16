import React from 'react';

interface WaveIndicatorProps {
  height: number;
  maxHeight?: number;
  title: string;
  unit?: string;
}

export function WaveIndicator({ height, maxHeight = 10, title, unit = 'ft' }: WaveIndicatorProps) {
  // Calculate intensity for visual effects (0-1)
  const intensity = Math.min(height / maxHeight, 1);
  
  // Determine color based on wave height
  const getColor = () => {
    if (height < maxHeight * 0.3) return 'rgb(56, 189, 248)'; // Light blue for small waves
    if (height < maxHeight * 0.6) return 'rgb(52, 211, 153)'; // Green for medium waves
    return 'rgb(251, 146, 60)'; // Orange for large waves
  };

  return (
    <div className="relative p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-20 blur-xl transition-all duration-500"
        style={{
          background: `radial-gradient(circle at center, ${getColor()} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <h3 className="text-slate-300 text-sm mb-3">{title}</h3>
        
        {/* Main indicator orb */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500"
              style={{
                background: `radial-gradient(circle at center, ${getColor()} 0%, transparent 70%)`,
                boxShadow: `0 0 ${20 + intensity * 30}px ${getColor()}`,
              }}
            >
              <span className="text-2xl font-bold text-white">
                {height.toFixed(1)}
                <span className="text-sm ml-1">{unit}</span>
              </span>
            </div>
            
            {/* Pulsing animation ring */}
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                border: `2px solid ${getColor()}`,
                animationDuration: `${3 - intensity * 1.5}s`,
              }}
            />
          </div>
        </div>

        {/* Intensity bar */}
        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${intensity * 100}%`,
              background: getColor(),
              boxShadow: `0 0 10px ${getColor()}`,
            }}
          />
        </div>
      </div>
    </div>
  );
} 