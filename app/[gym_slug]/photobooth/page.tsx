'use client'

import { Suspense, useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useClimbSession } from '@/hooks/useClimbSession'
import FlowShell, {
  LoadingScreen,
  PrimaryButton,
  SecondaryButton,
} from '@/components/flow/FlowShell'
import { generateStoryImage } from '@/lib/photobooth-canvas'
import { markSocialShared, getStoredSessionId, getCircuitRouteCount } from '@/lib/climb-session'

function PhotoboothContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const gymSlug = params.gym_slug as string
  const circuit = Number(searchParams.get('circuit') || '1')
  const { gym, loading: gymLoading } = useGym(gymSlug)
  const { session, loading: sessionLoading } = useClimbSession(gymSlug, { required: true })
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!gym || !session) return
    generateStoryImage({
      backgroundColor: gym.secondary_color || '#1a1a2e',
      gymName: gym.name,
      userName: session.user_name,
      circuitNumber: circuit,
      routesCount: session.routes_total || getCircuitRouteCount(circuit),
      durationSeconds: session.total_duration || 0,
      instagramHandle: gym.instagram_handle,
    }).then(setImageUrl)
  }, [gym, session, circuit])

  const handleShare = async () => {
    const sid = getStoredSessionId()
    if (sid) await markSocialShared(sid)

    if (imageUrl && navigator.share) {
      try {
        const res = await fetch(imageUrl)
        const blob = await res.blob()
        const file = new File([blob], 'supr-story.png', { type: 'image/png' })
        await navigator.share({
          title: 'Ma session escalade',
          files: [file],
        })
        return
      } catch {
        /* fallback */
      }
    }
    alert('Image prête — utilise Télécharger puis partage depuis ta galerie.')
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `J'ai terminé le circuit ${circuit} chez ${gym?.name} ! 🧗 #escalade #débutant`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const handleDownload = () => {
    if (!imageUrl) return
    const a = document.createElement('a')
    a.href = imageUrl
    a.download = `supr-${gymSlug}-circuit-${circuit}.png`
    a.click()
  }

  if (gymLoading || sessionLoading || !gym || !session) return <LoadingScreen />

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      <h1 className="text-2xl font-bold text-white text-center mb-4">Photobooth 📸</h1>

      <div className="bg-black/40 rounded-2xl overflow-hidden mb-6 aspect-[9/16] max-h-[50vh] mx-auto flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="Story" className="w-full h-full object-contain" />
        ) : (
          <div className="animate-spin h-10 w-10 border-2 border-white border-t-transparent rounded-full" />
        )}
      </div>

      <div className="space-y-3">
        <PrimaryButton color={gym.primary_color} onClick={handleShare}>
          📱 Partager Instagram Story
        </PrimaryButton>
        <SecondaryButton onClick={handleWhatsApp}>💬 Partager WhatsApp</SecondaryButton>
        <SecondaryButton onClick={handleDownload}>⬇️ Télécharger image</SecondaryButton>
        <PrimaryButton
          color={gym.primary_color}
          onClick={() => router.push(`/${gymSlug}/leaderboard`)}
        >
          Continuer →
        </PrimaryButton>
      </div>
    </FlowShell>
  )
}

export default function PhotoboothPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PhotoboothContent />
    </Suspense>
  )
}
