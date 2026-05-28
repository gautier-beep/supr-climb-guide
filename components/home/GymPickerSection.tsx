'use client'

import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import type { Gym } from '@/lib/supabase'
import GymCover from '@/components/GymCover'
import GymLogo from '@/components/GymLogo'
import SectionHeader from '@/components/ad/SectionHeader'
import { getGymVisual } from '@/lib/visual-assets'

const DEFAULT_GYM_COLOR = '#3d6b6b'

export default function GymPickerSection({ gyms, loading }: { gyms: Gym[]; loading?: boolean }) {
  const router = useRouter()

  return (
    <section className="space-y-5 pb-4">
      <SectionHeader
        overline="Ta salle"
        title="Choisis ta salle"
        description={gyms.length > 0 ? `${gyms.length} salle(s)` : undefined}
      />
      <div className="px-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[88px] ad-card animate-pulse bg-stone-100" />
            ))}
          </div>
        ) : gyms.length === 0 ? (
          <div className="ad-card p-10 text-center">
            <p className="text-ink-muted">Aucune salle configuree pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {gyms.map((gym) => {
              const visual = getGymVisual(gym.slug)
              return (
                <button
                  key={gym.id}
                  type="button"
                  onClick={() => router.push(`/${gym.slug}`)}
                  className="w-full ad-card overflow-hidden hover:shadow-editorial transition-shadow text-left group"
                  style={{ borderLeftWidth: 3, borderLeftColor: gym.primary_color || DEFAULT_GYM_COLOR }}
                >
                  <div className="flex min-h-[88px]">
                    <div className="relative w-28 flex-shrink-0">
                      <GymCover
                        name={gym.name}
                        color={gym.primary_color || DEFAULT_GYM_COLOR}
                        coverUrl={visual.cover}
                      />
                    </div>
                    <div className="flex items-center gap-3 flex-1 p-4 min-w-0">
                      <GymLogo
                        slug={gym.slug}
                        name={gym.name}
                        logoUrl={gym.logo_url}
                        primaryColor={gym.primary_color}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-ink truncate group-hover:text-mineral transition-colors">
                          {gym.name}
                        </h3>
                        {gym.welcome_message && (
                          <p className="text-xs text-ink-muted truncate mt-0.5">{gym.welcome_message}</p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-ink-muted group-hover:text-mineral flex-shrink-0" />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
