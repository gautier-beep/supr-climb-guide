'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Globe,
  Users,
  Briefcase,
  Award,
  ExternalLink,
  Target,
  Rocket,
} from 'lucide-react'
import { suprPillars, suprServices, suprStats, SUPR_SITE_URL } from '@/lib/supr-content'
import { images } from '@/lib/visual-assets'
import CoverImage from '@/components/CoverImage'
import SuprLogo from '@/components/SuprLogo'
import { CTA_GRADIENT, CTA_GRADIENT_BUTTON, CTA_GRADIENT_SUBTITLE } from '@/lib/theme'

const serviceIcons = {
  groupe: Users,
  consulting: Briefcase,
  'world-climbing': Award,
}

export default function AboutSUPRPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-supr-cream">
      <div className="border-b border-supr-border bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-black">SUP&apos;R Climbing</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="relative">
          <CoverImage src={images.worldCup} alt="Compétition escalade" height="lg" className="rounded-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4">
            <SuprLogo className="max-h-12 mb-3" boxClassName="h-12 mx-auto" />
            <h2 className="text-3xl font-black text-black mb-1">Level Up.</h2>
            <p className="text-black text-sm">More than holds. A mindset.</p>
            <p className="text-[10px] text-supr-mint mt-2 uppercase tracking-wider font-semibold">
              Official World Climbing products supplier
            </p>
          </div>
        </div>

        <div className="px-4 space-y-8">

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-supr-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-supr-mint">{suprStats.holds}</div>
            <div className="text-xs text-black">Holds</div>
          </div>
          <div className="bg-white border border-supr-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-black">{suprStats.macros}</div>
            <div className="text-xs text-black">Macros fibreglass</div>
          </div>
          <div className="bg-white border border-supr-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-black">{suprStats.volumes}</div>
            <div className="text-xs text-black">Volumes bois</div>
          </div>
        </div>

        {suprServices.map((service) => {
          const Icon = serviceIcons[service.id as keyof typeof serviceIcons] || Globe
          return (
            <section
              key={service.id}
              className="bg-white border border-supr-border rounded-2xl p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-supr-orange/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-supr-mint" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">{service.title}</h2>
                  <p className="text-sm text-supr-mint">{service.subtitle}</p>
                </div>
              </div>
              <p className="text-black text-sm mb-4">{service.description}</p>
              <ul className="space-y-2 mb-4">
                {service.highlights.map((item) => (
                  <li key={item} className="text-sm text-black flex gap-2">
                    <span className="text-supr-mint">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-supr-mint hover:underline"
              >
                En savoir plus
                <ExternalLink className="w-4 h-4" />
              </a>
            </section>
          )
        })}

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-black">Supr identity</h2>
          {suprPillars.map((pillar) => (
            <a
              key={pillar.title}
              href={pillar.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border border-supr-border rounded-xl p-4 hover:border-supr-mint/40 transition-all"
            >
              <h3 className="font-semibold text-black mb-1">{pillar.title}</h3>
              <p className="text-sm text-black">{pillar.description}</p>
            </a>
          ))}
        </section>

        <section className="bg-white border border-supr-border rounded-2xl p-6">
          <h2 className="text-xl font-bold text-black mb-4">Nos valeurs</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-black text-sm">Ultimate Texture</h3>
                <p className="text-black text-xs mt-1">
                  Surface durable et confortable — des mois de développement pour la différence.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-black text-sm">Designed for setters</h3>
                <p className="text-black text-xs mt-1">
                  Chaque prise pensée pour le mouvement. Loved by climbers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={`${CTA_GRADIENT} rounded-2xl p-6 text-center`}>
          <h3 className="text-xl font-bold mb-2">Got a project?</h3>
          <p className={`${CTA_GRADIENT_SUBTITLE} mb-4 text-sm`}>
            Gym, compétition, mur privé — dis-nous ce que tu construis.
          </p>
          <a
            href={SUPR_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={CTA_GRADIENT_BUTTON}
          >
            <ExternalLink className="w-5 h-5" />
            Voir le site SUP&apos;R
          </a>
        </div>

        <div className="text-center pb-4">
          <Link href="/" className="text-sm text-black hover:text-supr-mint transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}
