import React from 'react';

interface WeatherCardProps {
  title: string;
  children: React.ReactNode;
}

export const WeatherCard = ({ title, children }: WeatherCardProps) => {
  return (
    <div className="bg-slate-900/5 backdrop-blur-sm rounded-xl border border-slate-400/10 hover:border-slate-400/20 transition-all duration-300 group">
      <div className="p-6">
        <h3 className="text-xl font-medium text-slate-200 mb-6">{title}</h3>
        <div className="transform transition-transform duration-300 group-hover:scale-[1.02]">
          {children}
        </div>
      </div>
    </div>
  );
}; 