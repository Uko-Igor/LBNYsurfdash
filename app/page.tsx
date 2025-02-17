'use client'

import { dynamic as dynamicImport } from 'next/dynamic'
import SurfConditions from '@/components/surf-conditions'

const Background = dynamicImport(() => import('@/components/Background'), { ssr: false })

// Disable static generation for this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950/90">
      {/* Background Elements */}
      <Background />
      <div className="hex-grid absolute inset-0 opacity-20" />
      <div className="wave-bg opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold glow-text mb-2">Surf Dashboard</h1>
          <p className="text-gray-400">Real-time wave and weather conditions</p>
        </header>
        
        <SurfConditions />
      </div>
    </main>
  )
} 