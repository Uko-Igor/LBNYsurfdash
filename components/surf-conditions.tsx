'use client'

import { WeatherCard } from "./weather-card"
import { Compass } from "./compass"
import { WaveChart } from "./wave-chart"
import { Waves, Wind, Thermometer, Droplets, Clock, Calendar, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import axios from 'axios'

interface NDCBData {
  timestamp: string;
  WDIR: string;
  WSPD: string;
  GST: string;
  WVHT: string;
  STEEPNESS: string;
  SwH: string;
  SwP: string;
  SwD: string;
  ATMP: string;
  WTMP: string;
  CHILL: string;
  APD: string;
}

// Helper function to extract numeric value from string like "12.3 ft" -> 12.3
const extractNumber = (value: string | undefined) => {
  if (!value) return 0
  const match = value.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : 0
}

// Helper function to extract direction from string like "SE (123°)" -> "SE"
const extractDirection = (value: string | undefined) => {
  if (!value) return 'N'
  const match = value.match(/([NSEW]+)/)
  return match ? match[1] : 'N'
}

// Helper function to extract degrees from string like "SE (123°)" -> 123
const extractDegrees = (value: string | undefined) => {
  if (!value) return 0
  const match = value.match(/\((\d+)°\)/)
  return match ? parseInt(match[1]) : 0
}

export default function SurfConditions() {
  const [data, setData] = useState<NDCBData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/surf-data')
        setData(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch surf conditions')
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 300000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-slate-950 p-6 flex items-center justify-center">
      <div className="animate-pulse text-white text-xl">Loading surf conditions...</div>
    </div>
  )
  
  if (error) return (
    <div className="min-h-screen bg-slate-950 p-6 flex items-center justify-center">
      <div className="text-red-400 text-xl">{error}</div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header with timestamp */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Surf Conditions Dashboard</h1>
        <div className="flex items-center justify-center gap-2 text-slate-300">
          <Clock className="w-5 h-5" />
          <p>Updated {data?.timestamp || 'N/A'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <WeatherCard title="Wave Summary">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Waves className="w-8 h-8 text-blue-400" />
              <span className="text-5xl font-bold text-white">{extractNumber(data?.WVHT).toFixed(1)}</span>
              <span className="text-2xl text-slate-300">ft</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div>
                <div className="text-sm text-slate-400">Wave Period</div>
                <div className="text-lg">{extractNumber(data?.APD).toFixed(1)} sec</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Steepness</div>
                <div className="text-lg">{data?.STEEPNESS || 'N/A'}</div>
              </div>
            </div>
          </div>
        </WeatherCard>

        <WeatherCard title="Swell Wave Height">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Waves className="w-8 h-8 text-blue-400" />
              <span className="text-5xl font-bold text-white">{extractNumber(data?.SwH).toFixed(1)}</span>
              <span className="text-2xl text-slate-300">ft</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div>
                <div className="text-sm text-slate-400">Period</div>
                <div className="text-lg">{extractNumber(data?.SwP).toFixed(1)} sec</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Direction</div>
                <div className="text-lg">{extractDirection(data?.SwD)}</div>
              </div>
            </div>
          </div>
        </WeatherCard>

        <WeatherCard title="Wind Conditions">
          <div className="space-y-4">
            <Compass 
              direction={extractDegrees(data?.WDIR).toString()}
              speed={extractNumber(data?.WSPD)}
              gust={extractNumber(data?.GST)}
            />
          </div>
        </WeatherCard>

        <WeatherCard title="Significant Wave Height">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Waves className="w-8 h-8 text-blue-500" />
              <span className="text-5xl font-bold text-white">{extractNumber(data?.WVHT).toFixed(1)}</span>
              <span className="text-2xl text-slate-300">ft</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div>
                <div className="text-sm text-slate-400">Wave Steepness</div>
                <div className="text-lg text-slate-300">{data?.STEEPNESS || 'N/A'}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Average Period</div>
                <div className="text-lg text-slate-300">{extractNumber(data?.APD).toFixed(1)} sec</div>
              </div>
            </div>
          </div>
        </WeatherCard>

        <WeatherCard title="Temperature">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Thermometer className="w-6 h-6 text-red-400" />
                <span className="text-3xl font-bold text-white">{extractNumber(data?.ATMP).toFixed(1)}°F</span>
              </div>
              <div className="text-sm text-slate-400">Air Temp</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Droplets className="w-6 h-6 text-blue-400" />
                <span className="text-3xl font-bold text-white">{extractNumber(data?.WTMP).toFixed(1)}°F</span>
              </div>
              <div className="text-sm text-slate-400">Water Temp</div>
            </div>
          </div>
        </WeatherCard>
      </div>

      {/* Wave Chart */}
      <div className="mt-8 max-w-7xl mx-auto">
        <WeatherCard title="Wave Trends">
          <WaveChart
            waveHeight={data?.WVHT || '0 ft'}
            swellHeight={data?.SwH || '0 ft'}
          />
        </WeatherCard>
      </div>
    </div>
  )
} 