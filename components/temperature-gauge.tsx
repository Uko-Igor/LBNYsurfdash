import { ResponsiveBar } from '@nivo/bar'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TemperatureGaugeProps {
  temperature: number
  min?: number
  max?: number
  label: string
}

export function TemperatureGauge({ temperature, min = 32, max = 100, label }: TemperatureGaugeProps) {
  const [prevTemp, setPrevTemp] = useState(temperature)
  const [hasChanged, setHasChanged] = useState(false)
  
  useEffect(() => {
    if (temperature !== prevTemp) {
      setHasChanged(true)
      setPrevTemp(temperature)
      const timer = setTimeout(() => setHasChanged(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [temperature, prevTemp])

  // Normalize temperature to 0-1 range
  const normalizedTemp = Math.max(0, Math.min(1, (temperature - min) / (max - min)))
  
  const data = [{
    id: 'temperature',
    value: normalizedTemp,
  }]

  const bgColor = hasChanged 
    ? normalizedTemp > 0.5 
      ? 'rgba(239, 68, 68, 0.1)' // Red tint
      : 'rgba(59, 130, 246, 0.1)' // Blue tint
    : 'transparent'

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-400">{label}</span>
        <motion.div
          initial={false}
          animate={{
            scale: hasChanged ? 1.05 : 1,
            backgroundColor: bgColor
          }}
          className="rounded-lg px-2"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={temperature}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-2xl font-bold text-white"
            >
              {temperature.toFixed(1)}°F
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>
      
      <div className="h-8 w-full rounded-lg overflow-hidden bg-slate-700/30">
        <ResponsiveBar
          data={data}
          keys={['value']}
          indexBy="id"
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          padding={0}
          layout="horizontal"
          valueScale={{ type: 'linear', min: 0, max: 1 }}
          colors={['url(#gradient)']}
          enableGridY={false}
          enableGridX={false}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          enableLabel={false}
          isInteractive={false}
          defs={[
            {
              id: 'gradient',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: '#3b82f6' },   // Cold (blue)
                { offset: 50, color: '#22c55e' },  // Moderate (green)
                { offset: 100, color: '#ef4444' }, // Hot (red)
              ],
            },
          ]}
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>❄️ {min}°F</span>
          <span>🌡️ {max}°F</span>
        </div>
      </div>
    </div>
  )
}

function getTemperatureColor(normalizedTemp: number): string {
  if (normalizedTemp < 0.33) return '#3b82f6' // Cold (blue)
  if (normalizedTemp < 0.66) return '#22c55e' // Moderate (green)
  return '#ef4444' // Hot (red)
} 