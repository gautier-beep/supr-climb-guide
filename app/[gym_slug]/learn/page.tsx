'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  Play,
  Clock,
  Smartphone,
  UserCircle,
  Download,
  QrCode,
  Mountain,
  CheckCircle2,
} from 'lucide-react'
import { useState } from 'react'
import { beginnerWallSteps, beginnerWallTips } from '@/lib/supr-content'
import { images, tutorialThumbnails } from '@/lib/visual-assets'
import CoverImage from '@/components/CoverImage'
import SafeImage from '@/components/SafeImage'

const tutorials = {
  basics: [
    { title: 'Tes premiers pas en salle', duration: '3:00', video: 'https://player.vimeo.com/video/placeholder1', thumb: tutorialThumbnails.basics[0] },
    { title: 'Position des pieds', duration: '2:30', video: 'https://player.vimeo.com/video/placeholder2', thumb: tutorialThumbnails.basics[1] },
    { title: 'Économiser son énergie', duration: '3:15', video: 'https://player.vimeo.com/video/placeholder3', thumb: tutorialThumbnails.basics[2] },
    { title: 'Comprendre les couleurs et grades', duration: '2:00', video: 'https://player.vimeo.com/video/placeholder4', thumb: tutorialThumbnails.basics[3] },
    { title: 'Tomber en sécurité', duration: '2:45', video: 'https://player.vimeo.com/video/placeholder5', thumb: tutorialThumbnails.basics[4] },
  ],
  techniques: [
    { title: 'Placement des mains', duration: '3:00', video: 'https://player.vimeo.com/video/placeholder6', thumb: tutorialThumbnails.techniques[0] },
    { title: 'Lecture de voie', duration: '3:30', video: 'https://player.vimeo.com/video/placeholder7', thumb: tutorialThumbnails.techniques[1] },
    { title: 'Adhérence et smearing', duration: '2:20', video: 'https://player.vimeo.com/video/placeholder8', thumb: tutorialThumbnails.techniques[2] },
    { title: 'Équilibre et centre de gravité', duration: '3:00', video: 'https://player.vimeo.com/video/placeholder9', thumb: tutorialThumbnails.techniques[3] },
    { title: 'Grimper en douceur', duration: '2:50', video: 'https://player.vimeo.com/video/placeholder10', thumb: tutorialThumbnails.techniques[4] },
  ],
}

export default function LearnPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [profileStep, setProfileStep] = useState<'intro' | 'form' | 'done'>('intro')
  const [profileName, setProfileName] = useState('')
  const [profileLevel, setProfileLevel] = useState('debutant')
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (step: number) => {
    setCompletedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    )
  }

  const saveProfile = () => {
    if (!profileName.trim()) return
    const profile = {
      name: profileName.trim(),
      level: profileLevel,
      gym: gymSlug,
      completedSteps,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(`supr-profile-${gymSlug}`, JSON.stringify(profile))
    setProfileStep('done')
  }

  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-supr-cream">
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={selectedVideo}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-4">
          <button
            onClick={() => setSelectedVideo(null)}
            className="w-full bg-white border border-supr-border text-black rounded-xl py-3 px-4 font-semibold hover:border-supr-mint transition-colors"
          >
            Retour aux tutos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-supr-cream">
      <div className="border-b border-supr-border bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-black">Apprendre à grimper</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        <CoverImage src={images.learn} alt="Mur débutant" height="sm" className="mb-4" />

        <section className="bg-white border border-supr-mint/40 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Mountain className="w-8 h-8 text-supr-mint" />
            <div>
              <h2 className="text-xl font-bold text-black">Mur débutant SUP&apos;R</h2>
              <p className="text-sm text-black">Zone dédiée dans ta salle</p>
            </div>
          </div>
          <p className="text-black text-sm mb-4">
            Prises larges, progression par couleur, parcours pensés pour débuter sans frustration.
          </p>
          <button
            onClick={() => router.push(`/${gymSlug}/beginner-wall`)}
            className="w-full flex items-center justify-center gap-2 bg-supr-mint text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-colors mb-3"
          >
            <QrCode className="w-5 h-5" />
            Découvrir le mur débutant
          </button>
          <p className="text-xs text-black text-center">
            Scanne le QR sur le mur pour accéder à ce guide
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-2">Ton premier bloc — 4 étapes</h2>
          <p className="text-black text-sm mb-4">
            Coche chaque étape au fur et à mesure. Inspiré du parcours Beginner Wall SUP&apos;R.
          </p>
          <div className="space-y-3">
            {beginnerWallSteps.map((item) => {
              const done = completedSteps.includes(item.step)
              return (
                <button
                  key={item.step}
                  onClick={() => toggleStep(item.step)}
                  className={`w-full text-left rounded-xl p-4 border transition-all ${
                    done
                      ? 'bg-supr-orange/10 border-supr-mint/50'
                      : 'bg-white border-supr-border hover:border-supr-mint/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        done ? 'bg-supr-mint text-white' : 'bg-stone-100 border border-supr-border text-black'
                      }`}
                    >
                      {done ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${done ? 'text-supr-mint' : 'text-black'}`}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-black mt-1">{item.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
          {completedSteps.length === beginnerWallSteps.length && (
            <p className="text-center text-supr-mint text-sm font-semibold mt-4">
              Bravo — tu es prêt pour ta première session complète ! 🎉
            </p>
          )}
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Pourquoi le mur SUP&apos;R ?</h2>
          <div className="space-y-3">
            {beginnerWallTips.map((tip) => (
              <div
                key={tip.title}
                className="bg-white border border-supr-border rounded-xl p-4"
              >
                <h3 className="font-semibold text-black text-sm mb-1">{tip.title}</h3>
                <p className="text-xs text-black">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-2">Les bases</h2>
          <p className="text-black mb-6 text-sm">
            Vidéos pour compléter ta découverte du mur débutant.
          </p>
          <div className="space-y-3">
            {tutorials.basics.map((tutorial, index) => (
              <button
                key={index}
                onClick={() => setSelectedVideo(tutorial.video)}
                className="w-full bg-white border border-supr-border rounded-xl hover:border-supr-mint/40 transition-all overflow-hidden text-left group"
              >
                <div className="flex items-center gap-0">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <SafeImage
                      src={tutorial.thumb}
                      alt=""
                      fallbackClassName="absolute inset-0 flex items-center justify-center bg-stone-100"
                      iconClassName="w-6 h-6 text-supr-mint/40"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                      <Play className="w-8 h-8 text-white opacity-90" />
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold text-black mb-1">{tutorial.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-black">
                      <Clock className="w-4 h-4" />
                      <span>{tutorial.duration}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black mb-2">La suite</h2>
          <p className="text-black mb-6 text-sm">
            Techniques pour progresser après tes premiers blocs sur le mur débutant.
          </p>
          <div className="space-y-3">
            {tutorials.techniques.map((tutorial, index) => (
              <button
                key={index}
                onClick={() => setSelectedVideo(tutorial.video)}
                className="w-full bg-white border border-supr-border rounded-xl hover:border-blue-500/40 transition-all overflow-hidden text-left group"
              >
                <div className="flex items-center gap-0">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <SafeImage
                      src={tutorial.thumb}
                      alt=""
                      fallbackClassName="absolute inset-0 flex items-center justify-center bg-stone-100"
                      iconClassName="w-6 h-6 text-supr-mint/40"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                      <Play className="w-8 h-8 text-white opacity-90" />
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold text-black mb-1">{tutorial.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-black">
                      <Clock className="w-4 h-4" />
                      <span>{tutorial.duration}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white border border-supr-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-7 h-7 text-supr-mint" />
            <h2 className="text-xl font-bold text-black">Télécharge l&apos;app SUPR</h2>
          </div>
          <p className="text-black text-sm mb-6">
            Synchronise ton profil grimpeur et suis ta progression sur le mur débutant.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Download className="w-5 h-5" />
              App Store
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-supr-border text-black font-semibold py-3 px-4 rounded-xl hover:bg-stone-50 transition-colors"
            >
              <Download className="w-5 h-5" />
              Google Play
            </a>
          </div>
        </section>

        <section className="bg-white border border-supr-mint/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <UserCircle className="w-7 h-7 text-supr-mint" />
            <h2 className="text-xl font-bold text-black">Créer ton profil grimpeur</h2>
          </div>

          {profileStep === 'intro' && (
            <>
              <p className="text-black text-sm mb-6">
                Ton niveau et ta progression sur le mur débutant seront enregistrés ici.
              </p>
              <button
                onClick={() => setProfileStep('form')}
                className="w-full bg-supr-mint text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-colors"
              >
                Créer mon profil
              </button>
            </>
          )}

          {profileStep === 'form' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-black mb-1">Ton prénom ou pseudo</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Ex: Alex"
                  className="w-full bg-white border border-supr-border rounded-xl px-4 py-3 text-black placeholder-stone-400 focus:border-supr-mint outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-black mb-1">Ton niveau</label>
                <select
                  value={profileLevel}
                  onChange={(e) => setProfileLevel(e.target.value)}
                  className="w-full bg-white border border-supr-border rounded-xl px-4 py-3 text-black focus:border-supr-mint outline-none"
                >
                  <option value="debutant">Débutant — mur vert</option>
                  <option value="intermediaire">Intermédiaire — bleu et rouge</option>
                  <option value="confirme">Confirmé — noir et au-delà</option>
                </select>
              </div>
              <button
                onClick={saveProfile}
                disabled={!profileName.trim()}
                className="w-full bg-supr-mint text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enregistrer mon profil
              </button>
            </div>
          )}

          {profileStep === 'done' && (
            <div className="text-center">
              <p className="text-black font-semibold text-lg mb-2">
                Bienvenue, {profileName} ! 🎉
              </p>
              <p className="text-black text-sm mb-2">
                {completedSteps.length}/{beginnerWallSteps.length} étapes du mur débutant complétées
              </p>
              <p className="text-black text-sm mb-6">
                Profil enregistré — sync avec l&apos;app SUPR bientôt disponible.
              </p>
              <button
                onClick={() => router.push(`/${gymSlug}`)}
                className="bg-white text-supr-mint font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Retour à la salle
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
