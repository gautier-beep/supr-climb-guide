import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import './globals.css'
import BottomNav from '@/components/BottomNav'
import PageNavArrows from '@/components/PageNavArrows'
import SiteLinksFooter from '@/components/SiteLinksFooter'

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
      <body className="bg-black text-white min-h-screen flex flex-col">
        <main className="flex-1 w-full">
          <Suspense fallback={null}>
            <PageNavArrows />
          </Suspense>
          {children}
        </main>
        <Suspense fallback={null}>
          <SiteLinksFooter />
        </Suspense>
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
      </body>
    </html>
  )
}
