import { Brain } from 'lucide-react';
import { WeatherCard } from './ui/weather-card';

interface WaveAnalysisCardProps {
  analysis?: {
    summary: string;
    technicalDetails: string;
    recommendations: string;
  };
  isLoading?: boolean;
}

export function WaveAnalysisCard({ analysis, isLoading }: WaveAnalysisCardProps) {
  if (isLoading) {
    return (
      <WeatherCard title="Wave Analysis">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-700 rounded"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          </div>
        </div>
      </WeatherCard>
    );
  }

  if (!analysis) {
    return (
      <WeatherCard title="Wave Analysis">
        <div className="text-slate-400 text-center py-4">
          Analysis not available
        </div>
      </WeatherCard>
    );
  }

  return (
    <WeatherCard title="Wave Analysis">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-blue-400" />
          <span className="text-3xl font-bold text-white">{analysis.summary}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Technical Details</div>
            <div className="text-sm text-slate-300">{analysis.technicalDetails}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Recommendations</div>
            <div className="text-sm text-slate-300">{analysis.recommendations}</div>
          </div>
        </div>
      </div>
    </WeatherCard>
  );
} 