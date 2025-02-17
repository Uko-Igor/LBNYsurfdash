import { ReactNode } from 'react';

interface WeatherCardProps {
  title: string;
  children: ReactNode;
}

export function WeatherCard({ title, children }: WeatherCardProps) {
  return (
    <div className="bg-slate-800/5 backdrop-blur-[2px] rounded-lg p-6 border border-slate-700/20 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
} 