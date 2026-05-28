'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ad/SectionHeader'
import { ScrollCueHorizontal } from '@/components/ad/ScrollCue'

const STEPS = [
  { n: '01', label: 'Debutant', desc: "Pas besoin d'experience - on t'accueille sur le mur" },
  { n: '02', label: 'Communaute', desc: 'Conseils, encouragements, grimpe entre ami(es)' },
  { n: '03', label: 'Progression', desc: 'Techniques et confiance, a ton rythme' },
  { n: '04', label: 'Competition', desc: 'Du local aux coupes du monde si tu veux te depasser' },
]

export default function JourneyStrip() {
  return (
    <section id="parcours" className="space-y-5 scroll-mt-4">
      <SectionHeader overline="Parcours" title="Ton parcours" />
      <div className="relative">
        <motion.div
          className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {STEPS.map((step) => (
            <motion.article
              key={step.n}
              className="relative flex-shrink-0 w-[78%] max-w-[280px] snap-start ad-card-elevated p-5 pl-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="ad-accent-bar" aria-hidden />
              <span className="ad-overline text-mineral block mb-3">{step.n}</span>
              <h3 className="ad-display text-xl font-semibold text-ink leading-tight">{step.label}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{step.desc}</p>
            </motion.article>
          ))}
        </motion.div>
        <ScrollCueHorizontal />
      </div>
    </section>
  )
}
