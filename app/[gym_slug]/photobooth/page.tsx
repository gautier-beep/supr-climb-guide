'use client'

import { Suspense, useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useTranslation } from '@/hooks/useTranslation'
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
  const { t } = useTranslation(gymSlug, gym?.language)
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
      labels: {
        circuitDone: t('photobooth.canvas.circuitDone'),
        stats: t('photobooth.canvas.stats'),
        hashtags: t('photobooth.canvas.hashtags'),
        brand: t('photobooth.canvas.brand'),
      },
    }).then(setImageUrl)
  }, [gym, session, circuit, t])

  const handleShare = async () => {
    const sid = getStoredSessionId()
    if (sid) await markSocialShared(sid)

    if (imageUrl && navigator.share) {
      try {
        const res = await fetch(imageUrl)
        const blob = await res.blob()
        const file = new File([blob], 'supr-story.png', { type: 'image/png' })
        await navigator.share({
          title: t('photobooth.shareTitle'),
          files: [file],
        })
        return
      } catch {
        /* fallback */
      }
    }
    alert(t('photobooth.shareReady'))
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      t('photobooth.whatsapp', { circuit, gym: gym?.name ?? '' })
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
      <h1 className="text-2xl font-bold text-black text-center mb-4">{t('photobooth.title')}</h1>

      <div className="bg-stone-100 rounded-2xl overflow-hidden mb-6 aspect-[9/16] max-h-[50vh] mx-auto flex items-center justify-center border border-supr-border">
        {imageUrl ? (
          <img src={imageUrl} alt="Story" className="w-full h-full object-contain" />
        ) : (
          <div className="animate-spin h-10 w-10 border-2 border-supr-mint border-t-transparent rounded-full" />
        )}
      </div>

      <div className="space-y-3">
        <PrimaryButton color={gym.primary_color} onClick={handleShare}>
          {t('photobooth.shareInstagram')}
        </PrimaryButton>
        <SecondaryButton onClick={handleWhatsApp}>{t('photobooth.shareWhatsapp')}</SecondaryButton>
        <SecondaryButton onClick={handleDownload}>{t('photobooth.download')}</SecondaryButton>
        <PrimaryButton
          color={gym.primary_color}
          onClick={() => router.push(`/${gymSlug}/leaderboard`)}
        >
          {t('photobooth.continue')}
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
