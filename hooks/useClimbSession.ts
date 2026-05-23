'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ClimbSession } from '@/lib/climb-types'
import {
  fetchSession,
  getStoredSessionId,
} from '@/lib/climb-session'

export function useClimbSession(gymSlug: string, options?: { required?: boolean }) {
  const router = useRouter()
  const [session, setSession] = useState<ClimbSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const id = getStoredSessionId()
      if (!id) {
        setLoading(false)
        if (options?.required) {
          router.replace(`/${gymSlug}/profile`)
        }
        return
      }

      const data = await fetchSession(id)
      setSession(data)
      setLoading(false)

      if (options?.required && !data) {
        router.replace(`/${gymSlug}/profile`)
      }
    }
    load()
  }, [gymSlug, options?.required, router])

  const refresh = async () => {
    const id = getStoredSessionId()
    if (!id) return
    const data = await fetchSession(id)
    setSession(data)
  }

  return { session, loading, refresh }
}
