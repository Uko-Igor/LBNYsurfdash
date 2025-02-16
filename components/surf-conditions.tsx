'use client'

import { Compass } from "@/components/compass"
import { useEffect, useState } from "react"
import axios from 'axios'
import { SurfData } from "@/app/api/surf-data/route"
import { WaveChart } from "@/components/wave-chart"
import { TemperatureGauge } from "@/components/temperature-gauge"
import { TemperatureIndicator } from "@/components/ui/temperature-indicator"

export default function SurfConditions() {
  const [data, setData] = useState<SurfData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [surfReport, setSurfReport] = useState<string | null>(null)
  const [reportLoading, setReportLoading] = useState(false)

  const fetchSurfReport = async (waveData: SurfData) => {
    try {
      setReportLoading(true)
      const response = await axios.post('/api/surf-report', { waveData })
      setSurfReport(response.data.report)
    } catch (err) {
      console.error('Error fetching surf report:', err)
      setSurfReport('Unable to generate surf report at this time.')
    } finally {
      setReportLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/surf-data')
        console.log('Raw API Response:', response.data)
        
        // Add detailed logging for wave height values
        console.log('Raw wave height values:', {
          WVHT: response.data.WVHT,
          SwH: response.data.SwH,
          WWH: response.data.WWH,
          type: {
            WVHT: typeof response.data.WVHT,
            SwH: typeof response.data.SwH,
            WWH: typeof response.data.WWH,
          }
        })
        
        // Log wave periods
        console.log('Wave Periods:', {
          swell: response.data.SwP,
          wind: response.data.WWP,
          average: response.data.APD
        })
        
        // Log directions
        console.log('Wave & Wind Directions:', {
          swell: response.data.SwD,
          wind: response.data.WWD,
          windDir: response.data.WDIR
        })
        
        // Log temperature data
        console.log('Temperatures:', {
          air: response.data.ATMP,
          water: response.data.WTMP,
          windChill: response.data.CHILL
        })

        // Add detailed wind direction logging
        console.log('Wind Direction Data:', {
          raw: response.data.WDIR,
          type: typeof response.data.WDIR,
          parsed: parseFloat(response.data.WDIR),
          bearing: response.data.WDIR ? `${response.data.WDIR}° true` : 'N/A'
        });

        setData(response.data)
        // Fetch surf report when we get new data
        fetchSurfReport(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch surf data')
        console.error('Error fetching surf data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 300000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-white">Loading surf conditions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <div className="text-white">No data available</div>
      </div>
    )
  }

  // Add wind direction debug log before rendering
  console.log('Compass Direction:', {
    WDIR: data.WDIR,
    parsed: parseFloat(data.WDIR || '0'),
    final: data.WDIR || 'N'
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Lincoln Blvd, Long Beach</h2>
        <p className="text-gray-400">
          Updated {data.timestamp || 'N/A'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Live Surf Report Card - Expert interpretation */}
        <div className="p-6 rounded-xl bg-slate-800/10 backdrop-blur-[2px] border border-slate-700/20 shadow-lg md:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-slate-300 text-sm">Live Surf Report</h3>
            <span className="text-xs text-slate-400">AI-Generated</span>
          </div>
          <div className="space-y-4">
            {reportLoading ? (
              <div className="text-center py-4">
                <div className="text-white">Generating surf report...</div>
              </div>
            ) : surfReport ? (
              <div className="prose prose-invert max-w-none">
                <div className="text-slate-200 text-base leading-relaxed tracking-wide font-light" style={{ lineHeight: '2' }}>
                  {surfReport}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-white">No surf report available</div>
              </div>
            )}
          </div>
        </div>

        {/* Temperature & Wind Card - Critical for comfort and safety */}
        <div className="p-4 rounded-xl bg-slate-800/10 backdrop-blur-[2px] border border-slate-700/20 shadow-lg md:col-span-3">
          <h3 className="text-slate-300 text-sm mb-2">Temperature & Wind</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold tracking-wide text-white">
                  {(parseFloat(data.ATMP || '0'))?.toFixed(1)}°F
                </div>
                <div className="text-sm text-slate-400 font-light tracking-wider mt-1">Air</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold tracking-wide text-white">
                  {(parseFloat(data.WTMP || '0'))?.toFixed(1)}°F
                </div>
                <div className="text-sm text-slate-400 font-light tracking-wider mt-1">Water</div>
              </div>
            </div>
            <Compass 
              direction={String(parseFloat(data.WDIR || '0'))}
              speed={parseFloat(data.WSPD || '0')}
              gust={parseFloat(data.GST || '0')}
            />
          </div>
        </div>

        {/* Significant Wave Height Card - Most important overall wave info */}
        <div className="p-6 rounded-xl bg-slate-800/10 backdrop-blur-[2px] border border-slate-700/20 shadow-lg md:col-span-2">
          <h3 className="text-slate-300 text-sm mb-4">Significant Wave Height</h3>
          <div className="text-4xl font-bold text-white mb-4">
            {data.WVHT?.replace(/ ft$/, '') || 'N/A'} ft
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-400 mb-2">
            <div>
              <p className="mb-1">Wave Steepness</p>
              <p className="text-white">{data.STEEPNESS || 'N/A'}</p>
            </div>
            <div>
              <p className="mb-1">Average Period</p>
              <p className="text-white">{data.APD?.replace(/ sec$/, '') || 'N/A'} sec</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-tight">
            Significant Wave Height is the average height (meters) of the highest one-third of the waves during a 20 minute sampling period.
          </p>
        </div>

        {/* Swell Wave Card */}
        <div className="p-6 rounded-xl bg-slate-800/10 backdrop-blur-[2px] border border-slate-700/20 shadow-lg">
          <h3 className="text-slate-300 text-sm mb-4">Swell Wave</h3>
          <div className="text-4xl font-bold text-white mb-4">
            {data.SwH?.replace(/ ft$/, '') || 'N/A'} ft
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-400 mb-2">
            <div>
              <p className="mb-1">Period</p>
              <p className="text-white">{data.SwP?.replace(/ sec$/, '') || 'N/A'} sec</p>
            </div>
            <div>
              <p className="mb-1">Direction</p>
              <p className="text-white">{data.SwD || 'N/A'}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-tight">
            Swell height is the vertical distance (meters) between any swell crest and the succeeding swell wave trough.
          </p>
        </div>

        {/* Wind Wave Card */}
        <div className="p-6 rounded-xl bg-slate-800/10 backdrop-blur-[2px] border border-slate-700/20 shadow-lg">
          <h3 className="text-slate-300 text-sm mb-4">Wind Wave</h3>
          <div className="text-4xl font-bold text-white mb-4">
            {data.WWH?.replace(/ ft$/, '') || 'N/A'} ft
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-400 mb-2">
            <div>
              <p className="mb-1">Period</p>
              <p className="text-white">{data.WWP?.replace(/ sec$/, '') || 'N/A'} sec</p>
            </div>
            <div>
              <p className="mb-1">Direction</p>
              <p className="text-white">{data.WWD || 'N/A'}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-tight">
            Wind waves are generated by local winds and typically have shorter periods than swell waves.
          </p>
        </div>

        {/* Wave Trends Card - Full width for better visualization */}
        <div className="p-6 rounded-xl bg-slate-800/10 backdrop-blur-[2px] border border-slate-700/20 shadow-lg md:col-span-3">
          <h3 className="text-slate-300 text-sm mb-4">Wave Trends</h3>
          <WaveChart data={data.waveTrend || []} />
        </div>
      </div>
    </div>
  )
} 