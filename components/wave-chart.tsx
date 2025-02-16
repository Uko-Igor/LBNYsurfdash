import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface WaveChartProps {
  data: Array<{
    timestamp: string
    wvht: number
    swh: number
  }>
}

export function WaveChart({ data = [] }: WaveChartProps) {
  console.log('Raw wave data:', data)

  const formattedData = data.map(point => ({
    time: new Date(point.timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }),
    'Significant Wave Height': point.wvht,
    'Swell Height': point.swh
  })).reverse()

  console.log('Formatted data:', formattedData)

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData}>
          <defs>
            <linearGradient id="significantWaveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="swellHeightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            angle={-45} 
            textAnchor="end" 
            height={60} 
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis 
            tick={{ fill: '#94a3b8' }}
            label={{ 
              value: 'Height (ft)', 
              angle: -90, 
              position: 'insideLeft',
              fill: '#94a3b8'
            }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b',
              borderColor: '#334155',
              borderRadius: '0.5rem'
            }}
            labelStyle={{ color: '#94a3b8' }}
            itemStyle={{ color: '#94a3b8' }}
          />
          <Legend 
            wrapperStyle={{ color: '#94a3b8' }}
          />
          <Area 
            type="monotone" 
            dataKey="Significant Wave Height" 
            stroke="#0ea5e9" 
            fill="url(#significantWaveGradient)"
            strokeWidth={2}
            dot={false}
          />
          <Area 
            type="monotone" 
            dataKey="Swell Height" 
            stroke="#8b5cf6" 
            fill="url(#swellHeightGradient)"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
} 