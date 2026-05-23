'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
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
      <div className="min-h-screen bg-black">
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
            className="w-full bg-supr-surface border border-supr-border text-white rounded-xl py-3 px-4 font-semibold hover:border-supr-orange transition-colors"
          >
            Retour aux tutos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-supr-border sticky top-0 z-10 bg-black">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push(`/${gymSlug}`)}
            className="p-2 hover:bg-supr-surface rounded-lg transition-colors text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">Apprendre à grimper</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        <CoverImage src={images.learn} alt="Mur débutant" height="sm" className="mb-4" />

        <section className="bg-gradient-to-br from-supr-orange/30 to-orange-600/10 border border-supr-orange/40 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Mountain className="w-8 h-8 text-supr-orange" />
            <div>
              <h2 className="text-xl font-bold text-white">Mur débutant SUP&apos;R</h2>
              <p className="text-sm text-gray-400">Zone dédiée dans ta salle</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Prises larges, progression par couleur, parcours pensés pour débuter sans frustration.
          </p>
          <button
            onClick={() => router.push(`/${gymSlug}/beginner-wall`)}
            className="w-full flex items-center justify-center gap-2 bg-supr-orange text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition-colors mb-3"
          >
            <QrCode className="w-5 h-5" />
            Découvrir le mur débutant
          </button>
          <p className="text-xs text-gray-500 text-center">
            Scanne le QR sur le mur pour accéder à ce guide
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Ton premier bloc — 4 étapes</h2>
          <p className="text-gray-400 text-sm mb-4">
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
                      ? 'bg-supr-orange/10 border-supr-orange/50'
                      : 'bg-supr-surface border-supr-border hover:border-supr-orange/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        done ? 'bg-supr-orange text-white' : 'bg-black border border-supr-border text-gray-400'
                      }`}
                    >
                      {done ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${done ? 'text-supr-orange' : 'text-white'}`}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
          {completedSteps.length === beginnerWallSteps.length && (
            <p className="text-center text-supr-orange text-sm font-semibold mt-4">
              Bravo — tu es prêt pour ta première session complète ! 🎉
            </p>
          )}
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">Pourquoi le mur SUP&apos;R ?</h2>
          <div className="space-y-3">
            {beginnerWallTips.map((tip) => (
              <div
                key={tip.title}
                className="bg-supr-surface border border-supr-border rounded-xl p-4"
              >
                <h3 className="font-semibold text-white text-sm mb-1">{tip.title}</h3>
                <p className="text-xs text-gray-400">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-2">Les bases</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Vidéos pour compléter ta découverte du mur débutant.
          </p>
          <div className="space-y-3">
            {tutorials.basics.map((tutorial, index) => (
              <button
                key={index}
                onClick={() => setSelectedVideo(tutorial.video)}
                className="w-full bg-supr-surface border border-supr-border rounded-xl hover:border-supr-orange/40 transition-all overflow-hidden text-left group"
              >
                <div className="flex items-center gap-0">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <SafeImage
                      src={tutorial.thumb}
                      alt=""
                      fallbackClassName="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-supr-orange/30 to-zinc-900"
                      iconClassName="w-6 h-6 text-supr-orange/40"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                      <Play className="w-8 h-8 text-white opacity-90" />
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold text-white mb-1">{tutorial.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
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
          <h2 className="text-2xl font-bold text-white mb-2">La suite</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Techniques pour progresser après tes premiers blocs sur le mur débutant.
          </p>
          <div className="space-y-3">
            {tutorials.techniques.map((tutorial, index) => (
              <button
                key={index}
                onClick={() => setSelectedVideo(tutorial.video)}
                className="w-full bg-supr-surface border border-supr-border rounded-xl hover:border-blue-500/40 transition-all overflow-hidden text-left group"
              >
                <div className="flex items-center gap-0">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <SafeImage
                      src={tutorial.thumb}
                      alt=""
                      fallbackClassName="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-supr-orange/30 to-zinc-900"
                      iconClassName="w-6 h-6 text-supr-orange/40"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                      <Play className="w-8 h-8 text-white opacity-90" />
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold text-white mb-1">{tutorial.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{tutorial.duration}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-supr-surface border border-supr-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-7 h-7 text-supr-orange" />
            <h2 className="text-xl font-bold text-white">Télécharge l&apos;app SUPR</h2>
          </div>
          <p className="text-gray-400 text-sm mb-6">
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
              className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-supr-border text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/20 transition-colors"
            >
              <Download className="w-5 h-5" />
              Google Play
            </a>
          </div>
        </section>

        <section className="bg-gradient-to-br from-supr-orange/20 to-orange-600/10 border border-supr-orange/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <UserCircle className="w-7 h-7 text-supr-orange" />
            <h2 className="text-xl font-bold text-white">Créer ton profil grimpeur</h2>
          </div>

          {profileStep === 'intro' && (
            <>
              <p className="text-gray-400 text-sm mb-6">
                Ton niveau et ta progression sur le mur débutant seront enregistrés ici.
              </p>
              <button
                onClick={() => setProfileStep('form')}
                className="w-full bg-supr-orange text-white font-semibold py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors"
              >
                Créer mon profil
              </button>
            </>
          )}

          {profileStep === 'form' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Ton prénom ou pseudo</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Ex: Alex"
                  className="w-full bg-black border border-supr-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-supr-orange outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Ton niveau</label>
                <select
                  value={profileLevel}
                  onChange={(e) => setProfileLevel(e.target.value)}
                  className="w-full bg-black border border-supr-border rounded-xl px-4 py-3 text-white focus:border-supr-orange outline-none"
                >
                  <option value="debutant">Débutant — mur vert</option>
                  <option value="intermediaire">Intermédiaire — bleu et rouge</option>
                  <option value="confirme">Confirmé — noir et au-delà</option>
                </select>
              </div>
              <button
                onClick={saveProfile}
                disabled={!profileName.trim()}
                className="w-full bg-supr-orange text-white font-semibold py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enregistrer mon profil
              </button>
            </div>
          )}

          {profileStep === 'done' && (
            <div className="text-center">
              <p className="text-white font-semibold text-lg mb-2">
                Bienvenue, {profileName} ! 🎉
              </p>
              <p className="text-gray-400 text-sm mb-2">
                {completedSteps.length}/{beginnerWallSteps.length} étapes du mur débutant complétées
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Profil enregistré — sync avec l&apos;app SUPR bientôt disponible.
              </p>
              <button
                onClick={() => router.push(`/${gymSlug}`)}
                className="bg-white text-supr-orange font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
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
