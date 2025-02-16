import React, { useState, useEffect } from 'react';

interface CompassProps {
  direction: string | number;
}

const InteractiveCompass = ({ direction }: CompassProps) => {
  const [currentDirection, setCurrentDirection] = useState(0);
  
  useEffect(() => {
    if (typeof direction === 'string') {
      // Check if it's in the format "XXX ( YY deg true )"
      const degMatch = direction.match(/\(?\s*(\d+)\s*deg/i);
      if (degMatch) {
        const degrees = parseFloat(degMatch[1]);
        setCurrentDirection(((degrees % 360) + 360) % 360);
        return;
      }
      
      // If not, try to parse as a number
      const numericDirection = parseFloat(direction);
      if (!isNaN(numericDirection)) {
        setCurrentDirection(((numericDirection % 360) + 360) % 360);
        return;
      }
      
      // If it's a cardinal direction, convert to degrees
      const directionMap: { [key: string]: number } = {
        'N': 0, 'NNE': 22.5, 'NE': 45, 'ENE': 67.5, 'E': 90,
        'ESE': 112.5, 'SE': 135, 'SSE': 157.5, 'S': 180,
        'SSW': 202.5, 'SW': 225, 'WSW': 247.5, 'W': 270,
        'WNW': 292.5, 'NW': 315, 'NNW': 337.5
      };
      // Extract just the cardinal direction if in combined format
      const cardinalPart = direction.split('(')[0].trim();
      const deg = directionMap[cardinalPart.toUpperCase()] || 0;
      setCurrentDirection(deg);
    } else if (typeof direction === 'number') {
      setCurrentDirection(((direction % 360) + 360) % 360);
    }
  }, [direction]);

  // Function to convert degrees to cardinal direction for display
  const getCardinalDirection = (deg: number): string => {
    // Normalize to 0-360
    const normalizedDeg = ((deg % 360) + 360) % 360;
    
    // Define direction ranges with their corresponding labels
    const directions = [
      { min: 348.75, max: 360, label: 'N' },
      { min: 0, max: 11.25, label: 'N' },
      { min: 11.25, max: 33.75, label: 'NNE' },
      { min: 33.75, max: 56.25, label: 'NE' },
      { min: 56.25, max: 78.75, label: 'ENE' },
      { min: 78.75, max: 101.25, label: 'E' },
      { min: 101.25, max: 123.75, label: 'ESE' },
      { min: 123.75, max: 146.25, label: 'SE' },
      { min: 146.25, max: 168.75, label: 'SSE' },
      { min: 168.75, max: 191.25, label: 'S' },
      { min: 191.25, max: 213.75, label: 'SSW' },
      { min: 213.75, max: 236.25, label: 'SW' },
      { min: 236.25, max: 258.75, label: 'WSW' },
      { min: 258.75, max: 281.25, label: 'W' },
      { min: 281.25, max: 303.75, label: 'WNW' },
      { min: 303.75, max: 326.25, label: 'NW' },
      { min: 326.25, max: 348.75, label: 'NNW' }
    ];

    // Find matching direction
    const direction = directions.find(dir => 
      (normalizedDeg >= dir.min && normalizedDeg < dir.max) ||
      (dir.min > dir.max && (normalizedDeg >= dir.min || normalizedDeg < dir.max))
    );

    return direction ? direction.label : 'N';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36 mb-2">
        {/* Marine-themed base plate with blue glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900/90 to-slate-800/90" 
             style={{
               boxShadow: `
                 0 0 20px rgba(34, 211, 238, 0.15),
                 inset 0 0 15px rgba(34, 211, 238, 0.1),
                 inset 0 0 30px rgba(0, 0, 0, 0.6)
               `
             }}>
        </div>
        
        {/* Compass background with nautical details */}
        <svg 
          viewBox="0 0 400 400" 
          className="absolute inset-0 w-full h-full"
          style={{filter: 'drop-shadow(0 0 3px rgba(34, 211, 238, 0.2))'}}
        >
          <defs>
            {/* Modern gradient */}
            <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            
            {/* Weathered effect */}
            <filter id="weatheredBrass">
              <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
            </filter>
          </defs>

          {/* Outer rim with rivets */}
          <circle cx="200" cy="200" r="196" fill="none" stroke="url(#brassGradient)" strokeWidth="4" />
          <circle cx="200" cy="200" r="192" fill="none" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1" />
          
          {/* Decorative rivets */}
          {[...Array(8)].map((_, i) => {
            const angle = i * (360 / 8);
            const x = 200 + 188 * Math.cos(angle * Math.PI / 180);
            const y = 200 + 188 * Math.sin(angle * Math.PI / 180);
            return (
              <circle 
                key={`rivet-${i}`} 
                cx={x} 
                cy={y} 
                r="3" 
                fill="url(#brassGradient)"
                filter="url(#weatheredBrass)"
              />
            );
          })}
          
          {/* Degree marks with nautical styling */}
          {[...Array(72)].map((_, i) => {
            const angle = i * 5;
            const isCardinal = angle % 90 === 0;
            const isOrdinal = angle % 45 === 0 && !isCardinal;
            const isMedium = angle % 15 === 0 && !isCardinal && !isOrdinal;
            
            const length = isCardinal ? 30 : (isOrdinal ? 25 : (isMedium ? 15 : 8));
            const width = isCardinal ? 2 : (isOrdinal ? 1.5 : 0.8);
            
            const outerRadius = 180;
            const innerRadius = outerRadius - length;
            
            const x1 = 200 + outerRadius * Math.sin(angle * Math.PI / 180);
            const y1 = 200 - outerRadius * Math.cos(angle * Math.PI / 180);
            const x2 = 200 + innerRadius * Math.sin(angle * Math.PI / 180);
            const y2 = 200 - innerRadius * Math.cos(angle * Math.PI / 180);
            
            return (
              <line 
                key={angle}
                x1={x1} 
                y1={y1} 
                x2={x2} 
                y2={y2} 
                stroke={isCardinal ? "#22d3ee" : (isOrdinal ? "#0ea5e9" : "rgba(34, 211, 238, 0.3)")} 
                strokeWidth={width}
                opacity={isCardinal ? 0.9 : (isOrdinal ? 0.8 : 0.4)}
              />
            );
          })}
          
          {/* Nautical-themed inner rings */}
          <circle cx="200" cy="200" r="155" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="0.5" />
          
          {/* Rope-like decorative circle */}
          <circle 
            cx="200" 
            cy="200" 
            r="90" 
            fill="none" 
            stroke="rgba(34, 211, 238, 0.4)" 
            strokeWidth="3"
            strokeDasharray="4,2"
          />
          
          {/* Center medallion with ship's wheel motif */}
          <g transform="translate(200,200)">
            {[...Array(8)].map((_, i) => {
              const angle = i * (360 / 8);
              return (
                <path
                  key={`spoke-${i}`}
                  d={`M 0 0 L ${20 * Math.cos(angle * Math.PI / 180)} ${20 * Math.sin(angle * Math.PI / 180)}`}
                  stroke="#22d3ee"
                  strokeWidth="2"
                  fill="none"
                />
              );
            })}
          </g>
          <circle cx="200" cy="200" r="12" fill="rgba(20, 24, 34, 0.95)" stroke="#22d3ee" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="8" fill="rgba(15, 18, 25, 0.95)" stroke="#22d3ee" strokeWidth="1" />
          <circle cx="200" cy="200" r="4" fill="#22d3ee" />
          
          {/* Cardinal direction labels with nautical styling */}
          <g className="cardinal-points" style={{filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.9))'}}>
            <text x="200" y="35" textAnchor="middle" fill="#22d3ee" fontSize="18" fontWeight="bold" 
                  style={{fontFamily: 'Copperplate, serif'}}>N</text>
            <text x="365" y="200" textAnchor="middle" dominantBaseline="middle" fill="#22d3ee" fontSize="18" 
                  fontWeight="bold" style={{fontFamily: 'Copperplate, serif'}}>E</text>
            <text x="200" y="365" textAnchor="middle" fill="#22d3ee" fontSize="18" fontWeight="bold" 
                  style={{fontFamily: 'Copperplate, serif'}}>S</text>
            <text x="35" y="200" textAnchor="middle" dominantBaseline="middle" fill="#22d3ee" fontSize="18" 
                  fontWeight="bold" style={{fontFamily: 'Copperplate, serif'}}>W</text>
          </g>
          
          {/* Ordinal directions with modern tone */}
          <g className="ordinal-points" fill="#0ea5e9" fontSize="12" fontWeight="bold" opacity="0.7" 
             style={{fontFamily: 'Copperplate, serif'}}>
            <text x="300" y="100" textAnchor="middle" dominantBaseline="middle">NE</text>
            <text x="300" y="300" textAnchor="middle" dominantBaseline="middle">SE</text>
            <text x="100" y="300" textAnchor="middle" dominantBaseline="middle">SW</text>
            <text x="100" y="100" textAnchor="middle" dominantBaseline="middle">NW</text>
          </g>
        </svg>
        
        {/* Compass needle with modern styling */}
        <div 
          className="absolute top-0 left-0 w-full h-full transition-transform duration-1000"
          style={{ 
            transform: `rotate(${currentDirection}deg)`,
            filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.3))'
          }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="northGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a2234" />
                <stop offset="50%" stopColor="#0a1020" />
                <stop offset="100%" stopColor="#1a2234" />
              </linearGradient>
              <linearGradient id="southGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            
            <g>
              {/* North pointer with modern trim */}
              <path 
                d="M200,55 L190,185 L200,195 L210,185 Z" 
                fill="url(#northGradient)" 
                stroke="#22d3ee" 
                strokeWidth="1"
              />
              <path 
                d="M200,55 L203,75 L200,72 L197,75 Z" 
                fill="#22d3ee" 
                stroke="#22d3ee" 
                strokeWidth="0.5"
              />
              
              {/* Glowing pin at arrow tip */}
              <circle 
                cx="200" 
                cy="55" 
                r="6" 
                fill="#fbbf24"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))'
                }}
              />
              <circle 
                cx="200" 
                cy="55" 
                r="4" 
                fill="#fef3c7"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(254, 243, 199, 1)) drop-shadow(0 0 10px rgba(254, 243, 199, 0.8))'
                }}
              />
              <circle 
                cx="200" 
                cy="55" 
                r="2" 
                fill="#ffffff"
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 1))'
                }}
              />
              
              {/* South pointer with modern effect */}
              <path 
                d="M200,345 L190,215 L200,205 L210,215 Z" 
                fill="url(#southGradient)" 
                stroke="#22d3ee" 
                strokeWidth="1"
                opacity="0.8"
                filter="url(#weatheredBrass)"
              />
              <path 
                d="M200,345 L203,325 L200,328 L197,325 Z" 
                fill="#22d3ee" 
                stroke="#22d3ee" 
                strokeWidth="0.5"
                opacity="0.8"
              />
            </g>
          </svg>
        </div>
      </div>
      
      {/* Bearing display with modern styling */}
      <div className="w-full max-w-xs">
        <div className="text-center p-2">
          <p className="text-sm font-mono tracking-wide">
            <span className="text-cyan-400">Bearing:</span> 
            <span className="text-cyan-400/80 ml-2">
              {currentDirection.toFixed(1)}° {getCardinalDirection(currentDirection)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCompass; 