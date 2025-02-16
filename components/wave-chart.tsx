import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface WaveChartProps {
  waveHeight: string
  swellHeight: string
}

export function WaveChart({ waveHeight, swellHeight }: WaveChartProps) {
  // Generate sample data for the last 24 hours
  const data = Array.from({ length: 24 }, (_, i) => {
    const waveBase = parseFloat(waveHeight?.split(' ')[0] || '0')
    const swellBase = parseFloat(swellHeight?.split(' ')[0] || '0')
    const hour = new Date()
    hour.setHours(hour.getHours() - (23 - i))
    
    return {
      time: hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      wave: waveBase + Math.sin(i / 4) * 0.5,
      swell: swellBase + Math.cos(i / 4) * 0.3,
    }
  })

  return (
    <div className="w-full h-[300px] mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="swellGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            unit=" ft"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '6px',
              color: '#f8fafc',
            }}
          />
          <Area
            type="monotone"
            dataKey="swell"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#swellGradient)"
          />
          <Area
            type="monotone"
            dataKey="wave"
            stroke="#0ea5e9"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#waveGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
} 