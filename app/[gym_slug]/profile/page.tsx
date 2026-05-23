'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGym } from '@/hooks/useGym'
import FlowShell, {
  FlowCard,
  FlowHeader,
  LoadingScreen,
  PrimaryButton,
} from '@/components/flow/FlowShell'
import { createSession } from '@/lib/climb-session'
import type { UserLevel } from '@/lib/climb-types'

const LEVELS: { value: UserLevel; label: string }[] = [
  { value: 'never', label: 'Jamais grimpé' },
  { value: 'few', label: '1-3 fois' },
  { value: 'regular', label: 'Régulièrement' },
]

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const { gym, loading } = useGym(gymSlug)
  const [name, setName] = useState('')
  const [level, setLevel] = useState<UserLevel>('never')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Entre ton prénom ou pseudo')
      return
    }
    setSubmitting(true)
    setError('')
    const { session, usedLocalFallback } = await createSession(gymSlug, name.trim(), level)
    setSubmitting(false)
    if (!session) {
      setError('Impossible de créer la session. Réessaie.')
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
      <FlowHeader gym={gym} gymSlug={gymSlug} title="Ton profil grimpeur" subtitle="Quelques infos pour personnaliser ton parcours" />

      <form onSubmit={handleSubmit}>
        <FlowCard className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Prénom ou pseudo *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex : Alex"
              className="border border-gray-300 rounded-xl p-3 w-full text-gray-900 focus:ring-2 focus:ring-supr-orange outline-none"
              autoComplete="given-name"
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-3">Ton niveau</legend>
            <div className="space-y-2">
              {LEVELS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    level === opt.value ? 'border-supr-orange bg-orange-50' : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="level"
                    value={opt.value}
                    checked={level === opt.value}
                    onChange={() => setLevel(opt.value)}
                    className="text-supr-orange"
                  />
                  <span className="text-gray-900 font-medium">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <p className="text-xs text-gray-500">Photo de profil : bientôt (V1.1)</p>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </FlowCard>

        <div className="mt-6">
          <PrimaryButton type="submit" disabled={submitting} color={gym.primary_color}>
            {submitting ? 'Création…' : 'Continuer →'}
          </PrimaryButton>
        </div>
      </form>
    </FlowShell>
  )
}
