'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SafeImage from '@/components/SafeImage'
import { images } from '@/lib/visual-assets'
import { ScrollCueVertical } from '@/components/ad/ScrollCue'

interface HomeHeroProps {
  onScrollToJourney?: () => void
}

export default function HomeHero({ onScrollToJourney }: HomeHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} className="relative">
      <div className="relative h-[min(62vh,480px)] overflow-hidden bg-ink">
        <motion.div className="absolute inset-0 scale-[1.03]" style={{ y: imageY }}>
          <SafeImage
            src={images.hero}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
          />
        </motion.div>

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(28,25,23,0.3) 0%, rgba(28,25,23,0.05) 35%, rgba(28,25,23,0.58) 72%, rgba(28,25,23,0.95) 100%)',
          }}
        />

        <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-24 pt-16">
          <p className="ad-overline text-white/70 mb-3">Climb Guide</p>
          <h1 className="ad-hero-title">Grimpe. Progresse.</h1>
          <p className="ad-hero-lead mt-4">
            Du mur debutant aux coupes du monde - avec ta salle et la communaute.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center">
          <ScrollCueVertical label="Decouvre la suite" onActivate={onScrollToJourney} />
        </div>
      </div>

      <div className="relative bg-cream px-5 py-8 -mt-1">
        <p className="ad-display text-xl sm:text-2xl text-ink leading-snug font-medium text-balance">
          Chaque seance compte. Ton guide pour grimper mieux, des la premiere prise.
        </p>
      </div>
    </section>
  )
}
