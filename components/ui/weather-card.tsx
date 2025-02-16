import { ReactNode } from 'react';

interface WeatherCardProps {
  title: string;
  children: ReactNode;
}

export function WeatherCard({ title, children }: WeatherCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
} 