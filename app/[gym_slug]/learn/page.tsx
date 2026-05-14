'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Play, Clock } from 'lucide-react'
import { useState } from 'react'

const tutorials = {
  basics: [
    { title: 'Tes premiers pas en salle', duration: '3:00', video: 'https://player.vimeo.com/video/placeholder1' },
    { title: 'Position des pieds', duration: '2:30', video: 'https://player.vimeo.com/video/placeholder2' },
    { title: 'Économiser son énergie', duration: '3:15', video: 'https://player.vimeo.com/video/placeholder3' },
    { title: 'Comprendre les couleurs et grades', duration: '2:00', video: 'https://player.vimeo.com/video/placeholder4' },
    { title: 'Tomber en sécurité', duration: '2:45', video: 'https://player.vimeo.com/video/placeholder5' },
  ],
  techniques: [
    { title: 'Placement des mains', duration: '3:00', video: 'https://player.vimeo.com/video/placeholder6' },
    { title: 'Lecture de voie', duration: '3:30', video: 'https://player.vimeo.com/video/placeholder7' },
    { title: 'Adhérence et smearing', duration: '2:20', video: 'https://player.vimeo.com/video/placeholder8' },
    { title: 'Équilibre et centre de gravité', duration: '3:00', video: 'https://player.vimeo.com/video/placeholder9' },
    { title: 'Grimper en douceur', duration: '2:50', video: 'https://player.vimeo.com/video/placeholder10' },
  ]
}

export default function LearnPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

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
          ></iframe>
        </div>
        <div className="p-4">
          <button
            onClick={() => setSelectedVideo(null)}
            className="w-full bg-white text-gray-900 rounded-xl py-3 px-4 font-semibold hover:bg-gray-100 transition-colors"
          >
            Retour aux tutos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push(`/${gymSlug}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Apprendre à grimper</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Les bases */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Les bases</h2>
          <p className="text-gray-600 mb-6">
            Commence ici si c'est ta première fois en salle d'escalade.
          </p>
          <div className="space-y-3">
            {tutorials.basics.map((tutorial, index) => (
              <button
                key={index}
                onClick={() => setSelectedVideo(tutorial.video)}
                className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-supr-orange/10 flex items-center justify-center group-hover:bg-supr-orange/20 transition-colors">
                    <Play className="w-6 h-6 text-supr-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{tutorial.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{tutorial.duration}</span>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-supr-orange transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Techniques */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Techniques</h2>
          <p className="text-gray-600 mb-6">
            Améliore ta technique et progresse plus vite.
          </p>
          <div className="space-y-3">
            {tutorials.techniques.map((tutorial, index) => (
              <button
                key={index}
                onClick={() => setSelectedVideo(tutorial.video)}
                className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Play className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{tutorial.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{tutorial.duration}</span>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-supr-orange to-orange-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Prêt à grimper ?</h3>
          <p className="text-orange-100 mb-4">
            Avec ces bases, tu es paré pour ta première session !
          </p>
          <button
            onClick={() => router.push(`/${gymSlug}`)}
            className="bg-white text-supr-orange font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  )
}
