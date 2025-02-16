import React from 'react';

interface WeatherCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export function WeatherCard({ title, value, icon }: WeatherCardProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        {icon}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-white">{value}</p>
      </div>
    </div>
  )
} 