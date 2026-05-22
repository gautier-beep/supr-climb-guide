import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import './globals.css'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'SUPR Climb Guide',
  description: 'Your climbing companion for beginners',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-black text-white pb-16 md:pb-0">
        {children}
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
      </body>
    </html>
  )
}
