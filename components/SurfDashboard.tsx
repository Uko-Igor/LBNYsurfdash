import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { SurfData } from '../lib/api';

interface CardProps {
  children: React.ReactNode;
  title: string;
}

const Card: React.FC<CardProps> = ({ children, title }) => (
  <div className="bg-slate-800/50 rounded-lg p-5 shadow-lg">
    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-slate-700">{title}</h2>
    {children}
  </div>
);

interface TopSummaryProps {
  data: SurfData;
}

const TopSummary: React.FC<TopSummaryProps> = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="flex flex-col items-center gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg">
      <div className="text-center">
        <span className="text-6xl font-bold">{data.waveHeight?.toFixed(1) || '0.0'} ft</span>
        <p className="text-xl mt-2">{getSurfReportSummary(data)}</p>
      </div>
    </div>
  );
};

interface WaveCardProps {
  data: SurfData;
}

const WaveCard: React.FC<WaveCardProps> = ({ data }) => {
  if (!data) return null;
  
  return (
    <Card title="Wave">
      <div className="text-center space-y-4">
        <p className="text-5xl font-bold">{data.period?.toFixed(1) || '0.0'} sec</p>
        <p className="text-2xl">{data.swellDirection || 'N/A'}</p>
      </div>
    </Card>
  );
};

const WindCard: React.FC<WaveCardProps> = ({ data }) => {
  if (!data) return null;

  return (
    <Card title="Wind">
      <div className="text-center space-y-4">
        <p className="text-5xl font-bold">{data.windSpeed?.toFixed(1) || '0.0'} kts</p>
        <p className="text-2xl">Gusts {data.windGusts?.toFixed(1) || '0.0'} kts</p>
      </div>
    </Card>
  );
};

const TemperatureCard: React.FC<WaveCardProps> = ({ data }) => {
  if (!data) return null;

  return (
    <Card title="Temperature">
      <div className="text-center space-y-4">
        <p className="text-5xl font-bold">{data.airTemperature?.toFixed(1) || '0.0'}°F</p>
        <p className="text-2xl">Water {data.waterTemperature?.toFixed(1) || '0.0'}°F</p>
      </div>
    </Card>
  );
};

const WaveTrendChart: React.FC<WaveCardProps> = ({ data }) => {
  if (!data || !data.waveTrend || data.waveTrend.length === 0) return null;

  const chartData = [
    {
      id: 'Significant Wave Height',
      data: data.waveTrend.map(item => ({ 
        x: new Date(item.timestamp), 
        y: item.wvht 
      })),
    },
    {
      id: 'Swell Height',
      data: data.waveTrend.map(item => ({ 
        x: new Date(item.timestamp), 
        y: item.swh 
      })),
    }
  ];

  return (
    <Card title="Wave Trend">
      <div style={{ height: '300px' }}>
        <ResponsiveLine
          data={chartData}
          margin={{ top: 20, right: 120, bottom: 60, left: 60 }}
          xScale={{ type: 'time', format: 'native', precision: 'hour' }}
          xFormat="time:%I:%M %p"
          yScale={{ 
            type: 'linear', 
            min: 0, 
            max: 8, // Set max to 8 feet which is more reasonable for typical wave heights
            stacked: false 
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: '%I:%M %p',
            tickValues: 'every 3 hours',
            legend: 'Time',
            legendOffset: 45,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Height (ft)',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          enablePoints={false}
          enableGridX={true}
          enableGridY={true}
          colors={{ scheme: 'category10' }}
          lineWidth={2}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          enableSlices="x"
          theme={{
            axis: {
              ticks: { text: { fill: '#ddd' } },
              legend: { text: { fill: '#ddd', fontSize: 14 } },
            },
            grid: {
              line: {
                stroke: '#2d374850',
                strokeWidth: 1
              }
            },
          }}
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 100,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              itemTextColor: '#fff',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </Card>
  );
};

const SurfReport: React.FC<WaveCardProps> = ({ data }) => {
  if (!data) return null;

  return (
    <Card title="Live Surf Report">
      <div className="space-y-2 text-slate-300">
        <p>Current conditions at NDBC Station 44065 show waves of {data.waveHeight?.toFixed(1) || '0.0'} ft with swell height of {data.swellHeight?.toFixed(1) || '0.0'} ft and a period of {data.period?.toFixed(1) || '0.0'} sec.</p>
        <p>Winds are {data.windSpeed?.toFixed(1) || '0.0'} kts from the {data.swellDirection || 'N/A'}, with gusts up to {data.windGusts?.toFixed(1) || '0.0'} kts.</p>
        <p>The water temperature is {data.waterTemperature?.toFixed(1) || '0.0'}°F with air temperature at {data.airTemperature?.toFixed(1) || '0.0'}°F.</p>
      </div>
    </Card>
  );
};

function getSurfReportSummary(data: SurfData): string {
  if (!data) return "Loading surf conditions...";
  
  if (data.waveHeight > 5) {
    return "Large waves, challenging conditions. Experienced surfers only.";
  } else if (data.waveHeight > 2 && data.period > 8) {
    return "Moderate, clean waves. Good conditions for surfing.";
  } else if (data.waveHeight > 2 && data.period < 8) {
    return "Moderate, choppy waves. Conditions may be messy.";
  } else {
    return "Small swell, not ideal for surfing.";
  }
}

export interface SurfDashboardProps {
  data: SurfData;
}

const SurfDashboard: React.FC<SurfDashboardProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading surf conditions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-6 space-y-4">
      <TopSummary data={data} />
      <div className="grid grid-cols-1 gap-4 mb-6">
        <WaveCard data={data} />
        <WindCard data={data} />
        <TemperatureCard data={data} />
      </div>
      <div className="space-y-6">
        <WaveTrendChart data={data} />
      </div>
    </div>
  );
};

export default SurfDashboard; 