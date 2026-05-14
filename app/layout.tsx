import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SUPR Climb Guide',
  description: 'Your climbing companion for beginners',
  manifest: '/manifest.json',
  themeColor: '#FF6B35',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
