'use client'

import { useCallback, useEffect, useState } from 'react'
import { supabase, Gym } from '@/lib/supabase'
import HomeHero from '@/components/home/HomeHero'
import JourneyStrip from '@/components/home/JourneyStrip'
import LearnTeaser from '@/components/home/LearnTeaser'
import GymPickerSection from '@/components/home/GymPickerSection'
import PoweredBySupr from '@/components/home/PoweredBySupr'

export default function HomePage() {
  const [gyms, setGyms] = useState<Gym[]>([])
  const [loadingGyms, setLoadingGyms] = useState(true)

  const scrollToJourney = useCallback(() => {
    document.getElementById('parcours')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    async function loadGyms() {
      try {
        const { data, error } = await supabase.from('gyms').select('*').order('name')
        if (error) throw error
        setGyms(data || [])
      } catch (error) {
        console.error('Error loading gyms:', error)
      } finally {
        setLoadingGyms(false)
      }
    }
    loadGyms()
  }, [])

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="max-w-2xl mx-auto space-y-12 pb-2">
        <HomeHero onScrollToJourney={scrollToJourney} />
        <JourneyStrip />
        <LearnTeaser />
        <GymPickerSection gyms={gyms} loading={loadingGyms} />
        <PoweredBySupr />
      </div>
    </div>
  )
}
