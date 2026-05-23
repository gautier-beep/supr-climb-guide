'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase, Gym } from '@/lib/supabase'
import { Download, QrCode } from 'lucide-react'
import SafeImage from '@/components/SafeImage'

export default function QRCodePage() {
  const params = useParams()
  const gymSlug = params.gym_slug as string
  
  const [gym, setGym] = useState<Gym | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGym() {
      try {
        const { data, error } = await supabase
          .from('gyms')
          .select('*')
          .eq('slug', gymSlug)
          .single()

        if (error) throw error
        setGym(data)
      } catch (error) {
        console.error('Error loading gym:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGym()
  }, [gymSlug])

  const downloadQRCode = () => {
    // For V1, we'll use a QR code API service
    const url = `https://supr-climb-guide-supr2.vercel.app/${gymSlug}/beginner-wall`
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(url)}`
    
    // Create download link
    const link = document.createElement('a')
    link.href = qrApiUrl
    link.download = `qr-code-${gymSlug}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading || !gym) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-orange"></div>
      </div>
    )
  }

  const appUrl = `https://supr-climb-guide-supr2.vercel.app/${gymSlug}/beginner-wall`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(appUrl)}`

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-supr-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-supr-orange" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code {gym.name}</h1>
            <p className="text-gray-600">Téléchargez et affichez sur votre Beginner Wall</p>
          </div>

          {/* QR Code Display */}
          <div className="bg-white border-4 border-gray-200 rounded-2xl p-8 mb-6 relative min-h-[200px]">
            <SafeImage
              src={qrCodeUrl}
              alt={`QR Code ${gym.name}`}
              className="w-full max-w-md mx-auto relative object-contain"
              fallbackClassName="flex items-center justify-center min-h-[200px] bg-gray-100 rounded-xl"
              iconClassName="w-16 h-16 text-gray-400"
            />
          </div>

          {/* Download Button */}
          <button
            onClick={downloadQRCode}
            className="w-full bg-supr-orange text-white font-semibold py-4 px-6 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 mb-6"
          >
            <Download className="w-5 h-5" />
            Télécharger QR Code (PNG 1000x1000)
          </button>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">📋 Instructions d'utilisation</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li>1. Cliquez sur "Télécharger" ci-dessus</li>
              <li>2. Imprimez le QR code en format A4 ou A5</li>
              <li>3. Plastifiez-le ou utilisez un support waterproof</li>
              <li>4. Affichez-le sur votre Beginner Wall (hauteur yeux)</li>
              <li>5. Ajoutez le texte : "Scanne pour commencer ton aventure !"</li>
            </ol>
          </div>

          {/* URL Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-2">
              <strong>URL de destination :</strong>
            </p>
            <code className="text-xs text-blue-600 break-all">{appUrl}</code>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-sm text-gray-500">
              Powered by <span className="font-bold text-supr-orange">SUPR Climbing</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
