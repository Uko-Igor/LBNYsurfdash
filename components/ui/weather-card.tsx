import { ReactNode } from 'react';

interface WeatherCardProps {
  title: string;
  children: ReactNode;
}

export function WeatherCard({ title, children }: WeatherCardProps) {
  return (
    <div className="data-card">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
} 