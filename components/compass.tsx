import React from 'react';

interface CompassProps {
  direction: string;
  speed: number;
  gust: number;
}

export const Compass: React.FC<CompassProps> = ({ direction, speed, gust }) => {
  // Convert direction to degrees for rotation
  const directionDeg = parseFloat(direction);

  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto">
      {/* Compass Background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {/* Background circle */}
        <circle cx="200" cy="200" r="190" fill="#0369a1" fillOpacity="0.05" stroke="#0369a1" strokeOpacity="0.2" strokeWidth="2"/>
        
        {/* Compass rose */}
        <g transform="translate(200,200)">
          {/* Main directions */}
          <g stroke="#0369a1" strokeOpacity="0.3" strokeWidth="2">
            <line x1="0" y1="-180" x2="0" y2="180"/>
            <line x1="-180" y1="0" x2="180" y2="0"/>
            <line x1="-127.28" y1="-127.28" x2="127.28" y2="127.28"/>
            <line x1="-127.28" y1="127.28" x2="127.28" y2="-127.28"/>
          </g>
          
          {/* Cardinal direction labels */}
          <g fontFamily="Inter, system-ui" fontSize="24" fill="#f1f5f9" textAnchor="middle" fontWeight="500">
            <text x="0" y="-160" dy="0.3em">N</text>
            <text x="160" y="0" dx="-0.1em" dy="0.3em">E</text>
            <text x="0" y="160" dy="0.3em">S</text>
            <text x="-160" y="0" dx="0.1em" dy="0.3em">W</text>
          </g>
          
          {/* Intercardinal direction labels */}
          <g fontFamily="Inter, system-ui" fontSize="20" fill="#94a3b8" textAnchor="middle">
            <text x="113" y="-113" dy="0.3em">NE</text>
            <text x="113" y="113" dy="0.3em">SE</text>
            <text x="-113" y="113" dy="0.3em">SW</text>
            <text x="-113" y="-113" dy="0.3em">NW</text>
          </g>
          
          {/* Degree markers */}
          <g stroke="#0369a1" strokeOpacity="0.2" strokeWidth="1">
            {Array.from({length: 72}, (_, i) => {
              const angle = i * 5;
              const rad = angle * Math.PI / 180;
              const length = i % 2 === 0 ? 15 : 10;
              const x1 = Math.sin(rad) * 170;
              const y1 = -Math.cos(rad) * 170;
              const x2 = Math.sin(rad) * (170 - length);
              const y2 = -Math.cos(rad) * (170 - length);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>;
            })}
          </g>
          
          {/* Decorative elements */}
          <circle cx="0" cy="0" r="150" fill="none" stroke="#0369a1" strokeOpacity="0.2" strokeWidth="1"/>
          <circle cx="0" cy="0" r="130" fill="none" stroke="#0369a1" strokeOpacity="0.2" strokeWidth="1"/>
          
          {/* Fleur-de-lis at North */}
          <path d="M0,-140 L5,-130 L0,-135 L-5,-130 Z" fill="#f1f5f9"/>
        </g>
      </svg>

      {/* Wind Direction Arrow */}
      <div 
        className="absolute inset-0 transition-transform duration-500"
        style={{ transform: `rotate(${directionDeg}deg)` }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
          <g transform="translate(200,200)">
            {/* Arrow */}
            <path
              d="M0,-140 L12,-100 L4,-100 L4,100 L-4,100 L-4,-100 L-12,-100 Z"
              fill="#0ea5e9"
              className="drop-shadow-lg"
            />
          </g>
        </svg>
      </div>

      {/* Center Point */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-700 shadow-lg" />

      {/* Wind Speed Labels */}
      <div className="grid grid-cols-2 gap-4 absolute bottom-[-40px] left-0 right-0 text-center text-sm">
        <div className="text-center">
          <div className="text-slate-300">{speed.toFixed(1)} kts</div>
          <div className="text-sm text-slate-400">Wind Speed</div>
        </div>
        <div className="text-center">
          <div className="text-slate-300">{gust.toFixed(1)} kts</div>
          <div className="text-sm text-slate-400">Wind Gusts</div>
        </div>
      </div>
    </div>
  );
}; 