import { ReactNode } from 'react';

interface WeatherCardProps {
  title: string;
  children: ReactNode;
}

export function WeatherCard({ title, children }: WeatherCardProps) {
  return (
    <div className="bg-slate-900/10 rounded-lg p-4 shadow-lg border border-slate-600/20">
      <div className="mb-2">
        <h2 className="text-sm font-normal text-slate-300">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
} 