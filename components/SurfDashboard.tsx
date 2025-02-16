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
  
  const waveIcon = data.waveHeight > 5 ? '🌊🌊🌊' : data.waveHeight > 2 ? '🌊🌊' : '🌊';
  
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg">
      <span className="text-4xl">{waveIcon}</span>
      <span className="text-2xl font-bold">{data.waveHeight?.toFixed(1) || '0.0'} ft @ {data.period?.toFixed(1) || '0.0'} sec</span>
      <span className="text-2xl" style={{ transform: `rotate(${data.windDirection || 0}deg)` }}>⬆️</span>
      <span className="text-xl">{data.windSpeed?.toFixed(1) || '0.0'} kts (Gusts to {data.windGusts?.toFixed(1) || '0.0'} kts)</span>
      <span className="text-2xl">🌡️ {data.airTemperature?.toFixed(1) || '0.0'}°F (Feels Like {data.feelsLike?.toFixed(1) || '0.0'}°F)</span>
      <p className="w-full mt-2 text-slate-300">{getSurfReportSummary(data)}</p>
    </div>
  );
};

interface WaveCardProps {
  data: SurfData;
}

const WaveCard: React.FC<WaveCardProps> = ({ data }) => {
  if (!data) return null;
  
  return (
    <Card title="Wave Conditions">
      <div className="space-y-2">
        <p className="text-2xl font-bold">{data.waveHeight?.toFixed(1) || '0.0'} ft @ {data.period?.toFixed(1) || '0.0'} sec</p>
        <p>Swell Height: <span className="font-semibold">{data.swellHeight?.toFixed(1) || '0.0'} ft</span></p>
        <p>Swell Direction: <span className="font-semibold">{data.swellDirection || 'N/A'}</span></p>
      </div>
    </Card>
  );
};

const WindCard: React.FC<WaveCardProps> = ({ data }) => {
  if (!data) return null;

  // Format data for RadialBar chart
  const maxValue = Math.max(data.windSpeed || 0, data.windGusts || 0);
  const radialData = [
    {
      id: 'wind',
      data: [
        {
          x: 'Wind',
          y: data.windSpeed || 0,
        }
      ]
    },
    {
      id: 'gusts',
      data: [
        {
          x: 'Gusts',
          y: data.windGusts || 0,
        }
      ]
    }
  ];

  return (
    <Card title={`Wind from ${data.swellDirection || 'N/A'}`}>
      <div className="h-48">
        <ResponsiveRadialBar
          data={radialData}
          valueFormat=">-.1f"
          padding={0.4}
          cornerRadius={2}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
          circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
          startAngle={-90 + (data.windDirection || 0)}
          endAngle={270 + (data.windDirection || 0)}
          colors={['#4e99e6', '#8acbff']}
          tracksColor="#2a2a40"
          enableRadialGrid={false}
          enableCircularGrid={false}
          radialAxisMax={maxValue * 1.2}
          enableLabels={false}
          isInteractive={true}
          animate={true}
        />
      </div>
      <div className="text-center space-y-1 mt-2">
        <p>Wind Speed: <span className="font-bold">{data.windSpeed?.toFixed(1) || '0.0'} kts</span></p>
        <p>Wind Gusts: <span className="text-slate-300">{data.windGusts?.toFixed(1) || '0.0'} kts</span></p>
      </div>
    </Card>
  );
};

const TemperatureCard: React.FC<WaveCardProps> = ({ data }) => {
  if (!data) return null;

  return (
    <Card title="Temperature">
      <div className="space-y-2">
        <p>Air Temperature: <span className="font-bold">{data.airTemperature?.toFixed(1) || '0.0'}°F</span></p>
        <p>Water Temperature: <span className="font-bold">{data.waterTemperature?.toFixed(1) || '0.0'}°F</span></p>
        <p>Feels Like: <span className="text-slate-300">{data.feelsLike?.toFixed(1) || '0.0'}°F</span></p>
      </div>
    </Card>
  );
};

const WaveTrendChart: React.FC<WaveCardProps> = ({ data }) => {
  if (!data || !data.waveTrend || data.waveTrend.length === 0) return null;

  const chartData = [
    {
      id: 'waveHeight',
      data: data.waveTrend.map(item => ({ 
        x: new Date(item.time), 
        y: item.height 
      })),
    },
    {
      id: 'forecast',
      data: [
        { 
          x: new Date(data.waveTrend[data.waveTrend.length - 1].time), 
          y: data.waveTrend[data.waveTrend.length - 1].height 
        },
        {
          x: new Date(new Date(data.waveTrend[data.waveTrend.length - 1].time).getTime() + (6 * 60 * 60 * 1000)),
          y: (data.forecastTrend?.height || 0) + data.waveTrend[data.waveTrend.length - 1].height
        }
      ],
    },
  ];

  return (
    <Card title="Wave Trend">
      <div className="h-72">
        <ResponsiveLine
          data={chartData}
          margin={{ top: 20, right: 40, bottom: 60, left: 60 }}
          xScale={{ type: 'time', format: 'native', precision: 'hour' }}
          xFormat="time:%I %p"
          yScale={{ type: 'linear', min: 0, max: 'auto' }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: '%I %p',
            tickValues: 'every 6 hours',
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
          colors={{ scheme: 'category10' }}
          pointSize={10}
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
          }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
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
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <TopSummary data={data} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <WaveCard data={data} />
        <WindCard data={data} />
        <TemperatureCard data={data} />
      </div>
      <div className="space-y-6">
        <WaveTrendChart data={data} />
        <SurfReport data={data} />
      </div>
    </div>
  );
};

export default SurfDashboard; 