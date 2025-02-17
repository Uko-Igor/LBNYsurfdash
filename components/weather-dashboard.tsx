'use client'

import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { SurfData } from '../lib/api';
import { Compass } from './compass';

interface WaveDataPoint {
  timestamp: string;
  swellHeight: number;
  significantHeight: number;
  maxHeight: number;
}

interface WeatherDashboardProps {
  data: SurfData | null;
}

const WeatherDashboard = ({ data }: WeatherDashboardProps) => {
  const [waveData, setWaveData] = useState<WaveDataPoint[]>([]);

  // Update data when new measurements come in
  useEffect(() => {
    if (data && data.waveTrend) {
      const formattedData = data.waveTrend.map(point => ({
        timestamp: typeof point.timestamp === 'string' ? point.timestamp : point.timestamp.toISOString(),
        swellHeight: Number(point.swh.toFixed(2)) || 0,
        significantHeight: Number(point.wvht.toFixed(2)) || 0,
        maxHeight: Number((Math.max(point.wvht, point.swh) * 1.2).toFixed(2)) || 0
      }));
      setWaveData(formattedData);
    }
  }, [data]);

  const currentSwellHeight = data?.swellHeight || 0;
  const currentSignificantHeight = data?.waveHeight || 0;

  // Format data for Recharts with proper date handling
  const formatDataForChart = (data: WaveDataPoint[]) => {
    return data.map(point => ({
      timestamp: new Date(point.timestamp).getTime(),
      swellHeight: point.swellHeight,
      significantHeight: point.significantHeight,
      maxHeight: point.maxHeight
    })).sort((a, b) => a.timestamp - b.timestamp);
  };

  const waveIntensity = Math.min(Math.max(currentSignificantHeight, currentSwellHeight) / 3, 1);
  
  const getGlowColor = () => {
    const maxHeight = Math.max(currentSwellHeight, currentSignificantHeight);
    if (maxHeight < 1) return 'rgba(56, 189, 248, 0.6)';
    if (maxHeight < 2) return 'rgba(52, 211, 153, 0.6)';
    return 'rgba(251, 146, 60, 0.6)';
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      return (
        <div className="data-card p-3">
          <p className="text-sm font-medium text-neon-blue">
            {date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })} {date.toLocaleTimeString('en-US', { 
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </p>
          {payload[0] && (
            <p className="text-sm">
              <span className="text-neon-blue">Swell: </span>
              <span className="text-white font-medium">{payload[0].value.toFixed(2)} ft</span>
            </p>
          )}
          {payload[1] && (
            <p className="text-sm">
              <span className="text-neon-purple">Significant: </span>
              <span className="text-white font-medium">{payload[1].value.toFixed(2)} ft</span>
            </p>
          )}
          {payload[2] && (
            <p className="text-sm">
              <span className="text-neon-blue/70">Max: </span>
              <span className="text-white font-medium">{payload[2].value.toFixed(2)} ft</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="data-card" style={{animation: 'float 6s ease-in-out infinite 1s'}}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold glow-text">
            Wave Height Monitor
          </h2>
          <p className="text-gray-400 mt-2">Real-time wave monitoring dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="data-card bg-dark-blue/[0.07]">
            <div className="p-6 text-center relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-20 z-0 wave-bg"
                style={{
                  background: `radial-gradient(circle, var(--neon-blue) 0%, transparent 70%)`,
                }}
              />
              <h3 className="text-xl font-medium glow-text mb-2">Swell Wave Height</h3>
              <div className="text-5xl font-bold mb-2 glow-text">
                {currentSwellHeight.toFixed(2)}
                <span className="text-2xl ml-1 text-neon-blue">ft</span>
              </div>
              
              <div className="flex justify-center items-center mt-4">
                <div className="h-3 w-64 bg-dark-blue/[0.07] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${waveIntensity * 100}%`,
                      background: 'linear-gradient(90deg, var(--neon-blue) 0%, var(--neon-purple) 100%)',
                    }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-400 mt-1 w-64 mx-auto">
                <span>Calm</span>
                <span>Moderate</span>
                <span>Rough</span>
              </div>
            </div>
          </div>

          <div className="data-card bg-dark-blue/[0.07]">
            <div className="p-6 text-center relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-20 z-0 wave-bg"
                style={{
                  background: `radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)`,
                }}
              />
              <h3 className="text-xl font-medium glow-text mb-2">Significant Wave Height</h3>
              <div className="text-5xl font-bold mb-2 glow-text">
                {currentSignificantHeight.toFixed(2)}
                <span className="text-2xl ml-1 text-neon-purple">ft</span>
              </div>
              
              <div className="flex justify-center items-center mt-4">
                <div className="h-3 w-64 bg-dark-blue/[0.07] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${waveIntensity * 100}%`,
                      background: 'linear-gradient(90deg, var(--neon-purple) 0%, var(--neon-blue) 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="data-card bg-dark-blue/[0.07]">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-xl font-semibold glow-text">5-Day Wave Height Trend</h3>
            <p className="text-sm text-gray-400">Historical wave measurements from the past 5 days</p>
          </div>
          <div className="p-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={formatDataForChart(waveData)}
                  margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
                >
                  <defs>
                    <linearGradient id="colorSwell" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--neon-blue)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--neon-blue)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSignificant" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--neon-purple)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--neon-purple)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="timestamp" 
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    scale="time"
                    tickFormatter={(unixTime) => {
                      const date = new Date(unixTime);
                      return `${date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })} ${date.toLocaleTimeString('en-US', { 
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}`;
                    }}
                    stroke="#94a3b8"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    label={{ value: 'Wave Height (ft)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="swellHeight"
                    stroke="var(--neon-blue)"
                    fillOpacity={1}
                    fill="url(#colorSwell)"
                  />
                  <Area
                    type="monotone"
                    dataKey="significantHeight"
                    stroke="var(--neon-purple)"
                    fillOpacity={1}
                    fill="url(#colorSignificant)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-800/[0.07] rounded-lg shadow p-4 border border-slate-700">
            <h3 className="text-slate-400 text-sm mb-1">Average Height</h3>
            <p className="text-2xl font-semibold text-emerald-400">
              {waveData.length > 0 
                ? (_.sumBy(waveData, 'swellHeight') / waveData.length).toFixed(2) 
                : '0.00'} ft
            </p>
          </div>
          
          <div className="bg-slate-800/[0.07] rounded-lg shadow p-4 border border-slate-700">
            <h3 className="text-slate-400 text-sm mb-1">Maximum Height</h3>
            <p className="text-2xl font-semibold text-amber-400">
              {waveData.length > 0 
                ? _.maxBy(waveData, 'maxHeight')?.maxHeight.toFixed(2) 
                : '0.00'} ft
            </p>
          </div>
          
          <div className="bg-slate-800/[0.07] rounded-lg shadow p-4 border border-slate-700">
            <h3 className="text-slate-400 text-sm mb-1">Current Trend</h3>
            <p className="text-2xl font-semibold text-purple-400">
              {waveData.length > 0 
                ? (waveData[waveData.length - 1].significantHeight).toFixed(2) 
                : '0.00'} ft
            </p>
          </div>
        </div>

        <div className="data-card bg-dark-blue/[0.07]">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-xl font-semibold glow-text">Wind Conditions</h3>
          </div>
          <div className="p-4 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 mb-4">
              <Compass 
                direction={String(data?.windDirection || 0)} 
                speed={data?.windSpeed || 0} 
                gust={data?.windGusts || 0}
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Wind Speed</p>
              <p className="text-2xl font-bold glow-text">{data?.windSpeed || '0'} kts</p>
              <p className="text-sm text-gray-400 mt-2">Gusts</p>
              <p className="text-2xl font-bold glow-text">{data?.windGusts || '0'} kts</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-slate-500 text-sm">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard; 