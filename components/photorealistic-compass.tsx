import React, { useState, useEffect } from 'react';

interface CompassProps {
  direction: string;
  speed: number;
  gust: number;
}

export default function PhotorealisticCompass({ direction, speed, gust }: CompassProps) {
  // Convert direction string to degrees
  const directionToDegrees: { [key: string]: number } = {
    N: 0,
    NNE: 22.5,
    NE: 45,
    ENE: 67.5,
    E: 90,
    ESE: 112.5,
    SE: 135,
    SSE: 157.5,
    S: 180,
    SSW: 202.5,
    SW: 225,
    WSW: 247.5,
    W: 270,
    WNW: 292.5,
    NW: 315,
    NNW: 337.5,
  };

  // Handle undefined or null values with default fallbacks
  const safeDirection = direction || 'N';
  const safeSpeed = speed !== undefined && speed !== null ? speed : 0;
  const safeGust = gust !== undefined && gust !== null ? gust : 0;
  
  const degrees = directionToDegrees[safeDirection] || 0;
  
  // Animation for gentle needle movement
  const [currentDegree, setCurrentDegree] = useState(degrees);
  
  useEffect(() => {
    const targetDegree = degrees;
    const diff = targetDegree - currentDegree;
    
    // Handle crossing the 0/360 boundary
    const shortestPath = ((diff + 180) % 360) - 180;
    
    const timer = setTimeout(() => {
      setCurrentDegree(prev => {
        if (Math.abs(shortestPath) < 0.5) return targetDegree;
        return prev + shortestPath * 0.1;
      });
    }, 16);
    
    return () => clearTimeout(timer);
  }, [currentDegree, degrees]);

  // Convert wind speed to rotation speed for the wind speed indicator
  const rotationSpeed = Math.min(safeSpeed * 2, 20);
  
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Main compass body - dark base with purple/blue accents */}
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-gray-800 to-gray-900 shadow-lg overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('/api/placeholder/400/400')] bg-cover"></div>
        </div>
        
        {/* Purple outer ring */}
        <div className="absolute inset-0 rounded-full border-8 border-purple-500/30 shadow-inner"></div>
        
        {/* Glass effect over the face with blue tint */}
        <div className="absolute inset-2 rounded-full bg-gradient-radial from-blue-400/5 to-purple-500/5 backdrop-blur-sm border border-white/10 shadow-inner"></div>
      </div>
      
      {/* Compass face with dark background */}
      <div className="absolute inset-4 rounded-full bg-gray-800/90 overflow-hidden">
        {/* Subtle pattern texture */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('/api/placeholder/400/400')] bg-cover"></div>
        </div>
        
        {/* Fine grid lines with purple/blue accents */}
        <div className="absolute inset-0">
          {[...Array(36)].map((_, i) => (
            <div 
              key={i} 
              className="absolute inset-0 w-px h-full mx-auto bg-purple-400/20"
              style={{ transform: `rotate(${i * 10}deg)` }}
            />
          ))}
        </div>
      </div>
      
      {/* Compass rose with detailed design and emerald accents */}
      <div className="absolute inset-8 rounded-full">
        {/* Directional lines with emerald coloring */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 w-px h-full mx-auto bg-emerald-400/60"
            style={{ transform: `rotate(${i * 45}deg)` }}
          >
            <div className="absolute -top-2 w-1 h-4 bg-emerald-400/60 left-1/2 -ml-0.5"></div>
          </div>
        ))}
        
        {/* Cardinal direction markers with blue/purple styling */}
        <div className="absolute inset-0 text-blue-300 font-sans">
          <div className="absolute inset-x-0 top-2 text-center">
            <span className="text-sm font-semibold">N</span>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center justify-end">
            <span className="text-sm font-semibold">E</span>
          </div>
          <div className="absolute inset-x-0 bottom-2 text-center">
            <span className="text-sm font-semibold">S</span>
          </div>
          <div className="absolute inset-y-0 left-2 flex items-center">
            <span className="text-sm font-semibold">W</span>
          </div>
        </div>
        
        {/* Ordinal direction markers with purple accent */}
        <div className="absolute inset-0 text-purple-300/80 font-sans text-xs">
          <div style={{ position: 'absolute', top: '15%', right: '15%' }}>
            <span>NE</span>
          </div>
          <div style={{ position: 'absolute', bottom: '15%', right: '15%' }}>
            <span>SE</span>
          </div>
          <div style={{ position: 'absolute', bottom: '15%', left: '15%' }}>
            <span>SW</span>
          </div>
          <div style={{ position: 'absolute', top: '15%', left: '15%' }}>
            <span>NW</span>
          </div>
        </div>
      </div>
      
      {/* Central hub with cyan/orange transition for warmth */}
      <div className="absolute inset-[45%] rounded-full bg-gradient-radial from-cyan-500 to-amber-500 border-2 border-cyan-700 shadow-inner"></div>
      
      {/* Main needle with blue/purple styling */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `rotate(${currentDegree}deg)` }}
      >
        {/* North (blue) side of needle */}
        <div className="absolute top-1/2 left-1/2 w-1 h-24 -ml-0.5 -mt-24 origin-bottom bg-gradient-to-t from-blue-700 to-blue-400">
          <div className="absolute bottom-0 left-1/2 w-3 h-3 -ml-1.5 -mb-1.5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border border-blue-800/50 shadow-lg"></div>
          <div className="absolute top-0 left-1/2 w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border border-blue-800/50 shadow-lg"></div>
        </div>
        
        {/* South (purple) side of needle */}
        <div className="absolute top-1/2 left-1/2 w-1 h-24 -ml-0.5 mt-0 origin-top bg-gradient-to-b from-purple-400 to-purple-600">
          <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border border-purple-800/50 shadow-lg"></div>
          <div className="absolute bottom-0 left-1/2 w-5 h-5 -ml-2.5 -mb-2.5 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border border-purple-800/50 shadow-lg"></div>
        </div>
      </div>
      
      {/* Subtle shadow under the glass with blue tint */}
      <div className="absolute inset-4 rounded-full shadow-inner opacity-30 bg-blue-900/10"></div>
      
      {/* Digital display panel with dark background */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800/90 px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-700/50 flex items-center gap-4">
        <div className="text-blue-400 font-mono text-xs">
          {safeSpeed.toFixed(1)} kts
        </div>
        
        {/* Wind speed indicator */}
        <div className="w-4 h-4 relative">
          <div 
            className="absolute inset-0 border-2 border-purple-400 rounded-full border-t-transparent animate-spin"
            style={{ animationDuration: `${30 / rotationSpeed}s` }}
          ></div>
        </div>
        
        <div className="text-purple-400 font-mono text-xs">
          {safeGust.toFixed(1)}
        </div>
      </div>
      
      {/* Glass reflection effects */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rotate-12 transform scale-125"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-white/10 to-transparent rotate-12 transform scale-125"></div>
        
        {/* Additional subtle blue highlight */}
        <div className="absolute top-0 right-0 w-1/3 h-1/4 bg-gradient-to-bl from-blue-400/10 to-transparent rotate-45 transform scale-150 blur-sm"></div>
        
        {/* Additional subtle purple lowlight */}
        <div className="absolute bottom-0 left-0 w-1/3 h-1/4 bg-gradient-to-tr from-purple-800/15 to-transparent rotate-45 transform scale-150 blur-sm"></div>
      </div>
    </div>
  );
} 