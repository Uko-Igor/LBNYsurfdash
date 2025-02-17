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

  const formattedData = data.map(point => {
    // Parse the timestamp string safely
    let date;
    try {
      // First try parsing as is
      date = new Date(point.timestamp);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        // If invalid, try parsing different format
        const [datePart, timePart] = point.timestamp.split(' ');
        if (datePart && timePart) {
          date = new Date(`${datePart} ${timePart} GMT`);
        }
      }
    } catch (e) {
      console.error('Error parsing date:', point.timestamp, e);
      date = new Date(); // Fallback to current time if parsing fails
    }

    // Format time more compactly for mobile
    return {
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).replace(':00', '').toLowerCase(), // More compact time format
      'Significant Wave Height': point.wvht,
      'Swell Height': point.swh
    };
  }).reverse()

  console.log('Formatted data:', formattedData)

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={formattedData}
          margin={{ top: 5, right: 5, left: 0, bottom: 30 }}
        >
          <defs>
            <linearGradient id="significantWaveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="swellHeightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            angle={-35}  // Reduced angle for better mobile display
            textAnchor="end" 
            height={45}  // Reduced height
            tick={{ fill: '#94a3b8', fontSize: 10 }}  // Smaller font
            interval={window?.innerWidth < 768 ? 2 : "preserveStartEnd"}  // Show fewer ticks on mobile
            minTickGap={20}  // Reduced gap for mobile
            stroke="#334155"
            strokeWidth={0.5}
          />
          <YAxis 
            tick={{ fill: '#94a3b8', fontSize: 10 }}  // Smaller font
            tickCount={5}  // Limit number of Y-axis ticks
            label={{ 
              value: 'Height (ft)', 
              angle: -90, 
              position: 'insideLeft',
              fill: '#94a3b8',
              fontSize: 10,  // Smaller font
              offset: -5
            }}
            stroke="#334155"
            strokeWidth={0.5}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b',
              borderColor: '#334155',
              borderRadius: '0.5rem',
              fontSize: '12px'  // Smaller font for tooltip
            }}
            labelStyle={{ color: '#94a3b8' }}
            itemStyle={{ color: '#94a3b8' }}
          />
          <Legend 
            wrapperStyle={{ color: '#94a3b8', fontSize: '11px' }}  // Smaller font for legend
            iconSize={8}  // Smaller legend icons
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <Area 
            type="monotone" 
            dataKey="Significant Wave Height" 
            stroke="#0ea5e9" 
            fill="none"
            strokeWidth={1.5}
            dot={false}
          />
          <Area 
            type="monotone" 
            dataKey="Swell Height" 
            stroke="#8b5cf6" 
            fill="none"
            strokeWidth={1.5}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
} 