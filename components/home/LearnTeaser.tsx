'use client'

import { ArrowRight, Heart, Users } from 'lucide-react'
import SectionHeader from '@/components/ad/SectionHeader'
import SafeImage from '@/components/SafeImage'
import { images } from '@/lib/visual-assets'

const VALUES = [
  { label: 'Bienveillance', Icon: Users },
  { label: 'Partage', Icon: Heart },
  { label: 'Plaisir', Icon: ArrowRight },
]

export default function LearnTeaser() {
  return (
    <section className="space-y-5">
      <SectionHeader overline="Apprendre" title="Apprendre a grimper" />
      <div className="px-4">
        <div className="ad-card-elevated overflow-hidden">
          <div className="relative h-44 sm:h-48">
            <SafeImage
              src={images.community}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/35 to-ink/70" />
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
              {VALUES.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink"
                >
                  <Icon className="h-3 w-3 text-mineral" />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="p-5 bg-gradient-to-b from-white to-stone-50/80">
            <p className="text-[15px] text-ink leading-relaxed">
              Mur debutant, tutos pas a pas et une communaute qui t&apos;encourage - dans ta salle.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mineral">
              Choisis d&apos;abord ta salle
              <ArrowRight className="w-4 h-4" />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
