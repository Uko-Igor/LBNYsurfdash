import React from 'react';

interface CompassProps {
  direction: string;
  speed?: number;
  gust?: number;
}

export function Compass({ direction, speed, gust }: CompassProps) {
  // Convert direction to degrees for rotation
  let directionDeg = 0;
  
  if (typeof direction === 'string') {
    // Check if it's in the format "XXX ( YY deg true )"
    const degMatch = direction.match(/\(?\s*(\d+)\s*deg/i);
    if (degMatch) {
      directionDeg = parseFloat(degMatch[1]);
    } else {
      // If not in deg format, try to parse as a number
      directionDeg = parseFloat(direction);
    }
  } else if (typeof direction === 'number') {
    directionDeg = direction;
  }

  // No need to add 180 degrees anymore since we want to show where wind is coming FROM
  // The arrow will point in the direction the wind is coming from
  
  // Add debug logging
  console.log('Compass Component:', {
    rawDirection: direction,
    parsedDirection: directionDeg,
    transform: `rotate(${directionDeg}deg)`
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full aspect-square max-w-[220px] mx-auto">
        {/* Compass Background */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          {/* Gradient definitions */}
          <defs>
            <radialGradient id="compassBg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: 'rgba(16, 185, 129, 0.15)' }} />
              <stop offset="100%" style={{ stopColor: 'rgba(16, 185, 129, 0.05)' }} />
            </radialGradient>
            <filter id="algaeGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feColorMatrix
                in="coloredBlur"
                type="matrix"
                values="0 0 0 0 0.062
                        0 0 0 0 0.725
                        0 0 0 0 0.505
                        0 0 0 1 0"
              />
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981' }} />
              <stop offset="100%" style={{ stopColor: '#059669' }} />
            </linearGradient>
          </defs>

          {/* Background circle with gradient */}
          <circle 
            cx="200" 
            cy="200" 
            r="190" 
            fill="url(#compassBg)" 
            stroke="rgba(16, 185, 129, 0.3)" 
            strokeWidth="2"
          />
          
          {/* Compass rose */}
          <g transform="translate(200,200)">
            {/* Main directions - thinner, more elegant lines */}
            <g stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1">
              <line x1="0" y1="-180" x2="0" y2="180"/>
              <line x1="-180" y1="0" x2="180" y2="0"/>
              <line x1="-127.28" y1="-127.28" x2="127.28" y2="127.28"/>
              <line x1="-127.28" y1="127.28" x2="127.28" y2="-127.28"/>
            </g>
            
            {/* Cardinal direction labels - modernized typography */}
            <g fontFamily="Inter, system-ui" fontSize="20" fill="#10b981" textAnchor="middle" fontWeight="300" letterSpacing="0.1em">
              <text x="0" y="-160" dy="0.3em" filter="url(#algaeGlow)">N</text>
              <text x="160" y="0" dx="-0.1em" dy="0.3em" filter="url(#algaeGlow)">E</text>
              <text x="0" y="160" dy="0.3em" filter="url(#algaeGlow)">S</text>
              <text x="-160" y="0" dx="0.1em" dy="0.3em" filter="url(#algaeGlow)">W</text>
            </g>
            
            {/* Intercardinal direction labels - subtle secondary directions */}
            <g fontFamily="Inter, system-ui" fontSize="16" fill="rgba(16, 185, 129, 0.7)" textAnchor="middle" fontWeight="300">
              <text x="113" y="-113" dy="0.3em">NE</text>
              <text x="113" y="113" dy="0.3em">SE</text>
              <text x="-113" y="113" dy="0.3em">SW</text>
              <text x="-113" y="-113" dy="0.3em">NW</text>
            </g>
            
            {/* Degree markers - more subtle */}
            <g stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1">
              {Array.from({length: 72}, (_, i) => {
                const angle = i * 5;
                const rad = angle * Math.PI / 180;
                const length = i % 2 === 0 ? 12 : 8;
                const x1 = Math.sin(rad) * 170;
                const y1 = -Math.cos(rad) * 170;
                const x2 = Math.sin(rad) * (170 - length);
                const y2 = -Math.cos(rad) * (170 - length);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>;
              })}
            </g>
            
            {/* Decorative rings - more subtle */}
            <circle cx="0" cy="0" r="150" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1"/>
            <circle cx="0" cy="0" r="130" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1"/>
            
            {/* Modern North marker */}
            <path 
              d="M0,-145 L6,-132 L0,-126 L-6,-132 Z" 
              fill="#10b981"
              filter="url(#algaeGlow)"
            />
          </g>
        </svg>

        {/* Wind Direction Arrow - modernized design */}
        <div 
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{ transform: `rotate(${directionDeg || 0}deg)` }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
            <g transform="translate(200,200)">
              <path
                d="M0,-140 L10,-105 L4,-105 L4,100 L-4,100 L-4,-105 L-10,-105 Z"
                fill="url(#arrowGradient)"
                className="transition-colors duration-500"
                filter="url(#algaeGlow)"
              />
            </g>
          </svg>
        </div>

        {/* Center Point - more subtle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-800/80 rounded-full border border-emerald-600/50 shadow-lg" />
      </div>

      {/* Wind Speed Labels - refined typography */}
      <div className="grid grid-cols-2 gap-6 w-full text-center text-sm mt-4">
        <div className="text-center">
          <div className="text-slate-200 text-lg font-light tracking-wide">{speed?.toFixed(1) || '0.0'} kts</div>
          <div className="text-sm text-slate-400 font-light tracking-wider mt-1">Wind Speed</div>
        </div>
        <div className="text-center">
          <div className="text-slate-200 text-lg font-light tracking-wide">{gust?.toFixed(1) || '0.0'} kts</div>
          <div className="text-sm text-slate-400 font-light tracking-wider mt-1">Wind Gusts</div>
        </div>
      </div>
    </div>
  );
} 