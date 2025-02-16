import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Surf Conditions',
  description: 'Real-time surf conditions dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 