'use client'

import { WeatherCard } from "./components/weather-card"
import { Compass } from "./components/compass"
import { Waves, Wind, Thermometer, Droplets } from "lucide-react"
import { useEffect, useState } from "react"
import axios from 'axios'
import WeatherDashboard from "./components/weather-dashboard"
import { SurfData } from './lib/api'

interface NDCBData {
  timestamp: string;
  WDIR: string;
  WSPD: string;
  GST: string;
  WVHT: string;
  SwH: string;
  SwP: string;
  SwD: string;
  ATMP: string;
  WTMP: string;
  CHILL: string;
  APD: string;
  waveTrend?: { time: string; height: number; }[];
}

const transformToSurfData = (data: NDCBData | null): SurfData | null => {
  if (!data) return null;
  
  return {
    waveHeight: parseFloat(data.WVHT?.split(' ')[0] || '0'),
    swellHeight: parseFloat(data.SwH?.split(' ')[0] || '0'),
    period: parseFloat(data.SwP?.split(' ')[0] || '0'),
    windSpeed: parseFloat(data.WSPD?.split(' ')[0] || '0'),
    windGusts: parseFloat(data.GST?.split(' ')[0] || '0'),
    windDirection: parseFloat(data.WDIR?.split(' ')[0] || '0'),
    airTemperature: parseFloat(data.ATMP?.split(' ')[0] || '0'),
    waterTemperature: parseFloat(data.WTMP?.split(' ')[0] || '0'),
    feelsLike: parseFloat(data.CHILL?.split(' ')[0] || '0'),
    waveTrend: data.waveTrend || [],
    forecastTrend: { 
      height: parseFloat(data.WVHT?.split(' ')[0] || '0') * 1.2 // Estimate future trend
    },
    swellDirection: data.SwD || 'N/A'
  };
};

export default function SurfConditions() {
  const [data, setData] = useState<NDCBData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.ndbc.noaa.gov/station_page.php?station=44065&uom=E&tz=EST', {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        })
        
        // Process the response using similar logic to the Python scraping function
        const parser = new DOMParser()
        const doc = parser.parseFromString(response.data, 'text/html')
        
        // Extract data from tables similar to Python scraping logic
        const tables = doc.querySelectorAll('table')
        const data: NDCBData = {
          timestamp: '',
          WDIR: 'N/A',
          WSPD: 'N/A',
          GST: 'N/A',
          WVHT: 'N/A',
          SwH: 'N/A',
          SwP: 'N/A',
          SwD: 'N/A',
          ATMP: 'N/A',
          WTMP: 'N/A',
          CHILL: 'N/A',
          APD: 'N/A'
        }

        // Extract timestamp
        const textContent = doc.body.textContent || ''
        const timestampMatch = textContent.match(/Conditions at 44065 as of\s*\((\d{1,2}:\d{2}\s*(?:am|pm)\s*EST)\s*on\s*(\d{2}\/\d{2}\/\d{4})\)/)
        if (timestampMatch) {
          const [_, timeStr, dateStr] = timestampMatch
          const formattedTime = timeStr.toLowerCase().replace(' est', '')
          const [month, day, year] = dateStr.split('/')
          const formattedDate = `${month}/${day}/${year}`
          data.timestamp = `${formattedTime} on ${formattedDate}`
        }

        tables.forEach(table => {
          const rows = table.querySelectorAll('tr')
          rows.forEach(row => {
            const cells = row.querySelectorAll('td, th')
            if (cells.length >= 2) {
              const text = cells[0].textContent?.trim() || ''
              const value = cells[1].textContent?.trim() || ''

              // Map the data similar to Python scraping logic
              if (/Wind Direction|WDIR/i.test(text)) {
                const dirMatch = value.match(/([NSEW]+)\s*\(\s*(\d+)\s*deg/)
                if (dirMatch) {
                  data.WDIR = `${dirMatch[1]} (${dirMatch[2]}°)`
                }
              } else if (text === "Wind Speed (WSPD):" || text === "Wind Speed:") {
                const match = value.match(/([\d.]+)/)
                if (match) data.WSPD = `${match[1]} kts`
              }
              // Add similar mappings for other data points
            }
          })
        })

        setData(data)
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

  if (loading) return <div className="min-h-screen bg-transparent p-6 text-white">Loading...</div>
  if (error) return <div className="min-h-screen bg-transparent p-6 text-white">{error}</div>

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          Lincoln Blvd, Long Beach
        </h1>
        <p className="text-lg md:text-xl text-slate-300">
          as of {data?.timestamp || 'N/A'}
        </p>
      </div>

      <div className="bg-slate-900/5 backdrop-blur-sm rounded-xl p-6 max-w-7xl mx-auto mb-8 border border-slate-400/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <WeatherCard title="Swell Wave Height">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Waves className="w-6 h-6 text-blue-400" />
                <span className="text-4xl font-bold">{data?.SwH?.split(' ')[0] || 'N/A'}</span>
                <span className="text-xl">ft</span>
              </div>
              <div className="text-sm text-slate-300">
                Period: {data?.SwP || 'N/A'}
              </div>
              <div className="text-sm text-slate-400">Direction: {data?.SwD || 'N/A'}</div>
            </div>
          </WeatherCard>

          <WeatherCard title="Wind Conditions">
            <div className="space-y-2">
              <div className="flex justify-center items-center mb-4">
                <div className="w-48 h-48">
                  <Compass 
                    direction={data?.WDIR?.split(' ')[0] || 'N'} 
                    speed={parseFloat(data?.WSPD?.split(' ')[0] || '0')}
                    gust={parseFloat(data?.GST?.split(' ')[0] || '0')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-semibold">{data?.WSPD || 'N/A'}</div>
                  <div className="text-sm text-slate-400">Wind Speed</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold">{data?.GST || 'N/A'}</div>
                  <div className="text-sm text-slate-400">Wind Gusts</div>
                </div>
              </div>
            </div>
          </WeatherCard>

          <WeatherCard title="Temperature">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-6 h-6 text-red-400" />
                  <span className="text-4xl font-bold">{data?.ATMP || 'N/A'}</span>
                </div>
                <div className="text-sm text-slate-400">Air Temperature</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-blue-400" />
                  <span className="text-4xl font-bold">{data?.WTMP || 'N/A'}</span>
                </div>
                <div className="text-sm text-slate-400">Water Temperature</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Wind className="w-6 h-6 text-cyan-400" />
                  <span className="text-4xl font-bold">{data?.CHILL || 'N/A'}</span>
                </div>
                <div className="text-sm text-slate-400">Wind Chill</div>
              </div>
            </div>
          </WeatherCard>
        </div>
      </div>

      <div className="mt-12">
        <WeatherDashboard data={transformToSurfData(data)} />
      </div>
    </div>
  )
} 