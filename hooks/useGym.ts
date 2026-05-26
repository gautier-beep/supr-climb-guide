'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { resolveLanguage, setCachedLanguage } from '@/lib/i18n'
import type { Gym } from '@/lib/supabase'

export function useGym(gymSlug: string) {
  const [gym, setGym] = useState<Gym | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('gyms')
        .select('*')
        .eq('slug', gymSlug)
        .single()

      if (error) {
        console.warn('[useGym]', gymSlug, error.message)
        setGym(null)
      } else if (data) {
        setGym(data as Gym)
        setCachedLanguage(gymSlug, resolveLanguage(data.language))
        if (data.primary_color) {
          document.documentElement.style.setProperty('--primary-color', data.primary_color)
        }
      }
      setLoading(false)
    }
    load()
  }, [gymSlug])

  return { gym, loading }
}
