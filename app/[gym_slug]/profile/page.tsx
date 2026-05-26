'use client'

import { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import { useTranslation } from '@/hooks/useTranslation'
import FlowShell, {
  FlowCard,
  FlowHeader,
  LoadingScreen,
  PrimaryButton,
} from '@/components/flow/FlowShell'
import { createSession } from '@/lib/climb-session'
import type { UserLevel } from '@/lib/climb-types'

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const { gym, loading } = useGym(gymSlug)
  const { t } = useTranslation(gymSlug, gym?.language)
  const [name, setName] = useState('')
  const [level, setLevel] = useState<UserLevel>('never')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const levels = useMemo(
    () =>
      [
        { value: 'never' as UserLevel, label: t('profile.levelNever') },
        { value: 'few' as UserLevel, label: t('profile.levelFew') },
        { value: 'regular' as UserLevel, label: t('profile.levelRegular') },
      ],
    [t]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError(t('profile.errorName'))
      return
    }
    setSubmitting(true)
    setError('')
    const { session, usedLocalFallback } = await createSession(gymSlug, name.trim(), level)
    setSubmitting(false)
    if (!session) {
      setError(t('profile.errorSession'))
      return
    }
    if (usedLocalFallback) {
      console.warn('Session en mode local — exécute scripts/setup-sessions-rls.sql dans Supabase')
    }
    router.push(`/${gymSlug}/tutorial`)
  }

  if (loading || !gym) return <LoadingScreen />

  return (
    <FlowShell gym={gym} gymSlug={gymSlug}>
      <FlowHeader
        gym={gym}
        gymSlug={gymSlug}
        title={t('profile.title')}
        subtitle={t('profile.subtitle')}
      />

      <form onSubmit={handleSubmit}>
        <FlowCard className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
              {t('profile.nameLabel')}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('profile.namePlaceholder')}
              className="border border-stone-300 rounded-xl p-3 w-full text-black focus:ring-2 focus:ring-supr-mint outline-none"
              autoComplete="given-name"
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-black mb-3">
              {t('profile.levelLabel')}
            </legend>
            <div className="space-y-2">
              {levels.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    level === opt.value ? 'border-black bg-stone-50' : 'border-stone-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="level"
                    value={opt.value}
                    checked={level === opt.value}
                    onChange={() => setLevel(opt.value)}
                    className="text-supr-mint"
                  />
                  <span className="text-black font-medium">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <p className="text-xs text-black">{t('profile.photoSoon')}</p>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </FlowCard>

        <div className="mt-6">
          <PrimaryButton type="submit" disabled={submitting} color={gym.primary_color}>
            {submitting ? t('profile.submitting') : t('profile.continue')}
          </PrimaryButton>
        </div>
      </form>
    </FlowShell>
  )
}
