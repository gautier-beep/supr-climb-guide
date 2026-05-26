'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { resolveLanguage, translate } from '@/lib/i18n'
import type { SupportedLanguage } from '@/lib/i18n/types'

/**
 * Langue dérivée de `gym.language` dès qu'elle est disponible (synchrone).
 * Fetch Supabase seulement si la salle n'est pas encore chargée (ex. page 404).
 */
export function useTranslation(gymSlug: string, gymLanguage?: string | null) {
  const [fallbackLanguage, setFallbackLanguage] = useState<SupportedLanguage>('fr')

  const hasGymLanguage = gymLanguage != null && gymLanguage !== ''

  useEffect(() => {
    if (hasGymLanguage) return

    let cancelled = false
    async function load() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('gyms')
        .select('language')
        .eq('slug', gymSlug)
        .single()

      if (cancelled) return
      if (error) {
        console.warn('[useTranslation]', gymSlug, error.message)
      }
      setFallbackLanguage(resolveLanguage(data?.language))
    }
    load()
    return () => {
      cancelled = true
    }
  }, [gymSlug, hasGymLanguage])

  const language = useMemo(
    () => resolveLanguage(hasGymLanguage ? gymLanguage : fallbackLanguage),
    [hasGymLanguage, gymLanguage, fallbackLanguage]
  )

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(language, key, vars),
    [language]
  )

  return { t, language }
}
