'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, Gym } from '@/lib/supabase'
import { ArrowLeft, Rocket, Target, TrendingUp, Play } from 'lucide-react'

export default function BeginnerWallPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  
  const [gym, setGym] = useState<Gym | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGym() {
      try {
        const { data, error } = await supabase
          .from('gyms')
          .select('*')
          .eq('slug', gymSlug)
          .single()

        if (error) throw error
        setGym(data)
        
        // Track beginner wall page view
        await supabase.from('analytics_events').insert({
          gym_id: data.id,
          event_type: 'beginner_wall_view',
          session_id: Math.random().toString(36).substring(7)
        })
      } catch (error) {
        console.error('Error loading gym:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGym()
  }, [gymSlug])

  if (loading || !gym) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-supr-orange"></div>
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
          <h1 className="text-xl font-bold">Beginner Wall</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Hero */}
        <div className="bg-gradient-to-br from-supr-orange via-orange-500 to-red-500 rounded-3xl p-8 text-white text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <Rocket className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold mb-3">Bienvenue sur ton</h2>
            <h3 className="text-4xl font-black mb-4">BEGINNER WALL SUPR</h3>
            <p className="text-orange-100 text-lg max-w-md mx-auto">
              Le mur parfait pour découvrir l'escalade et progresser en toute confiance ! 🧗
            </p>
          </div>
        </div>

        {/* C'est quoi ? */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">C'est quoi un Beginner Wall ?</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Conçu pour débuter</h3>
                <p className="text-gray-600 text-sm">
                  Des prises spécialement sélectionnées pour les débutants. Larges, ergonomiques, 
                  faciles à attraper. Tu vas progresser rapidement !
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Progression garantie</h3>
                <p className="text-gray-600 text-sm">
                  Les blocs sont organisés par difficulté croissante. Tu commences facile, 
                  tu progresses naturellement, sans frustration.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Technologie SUPR</h3>
                <p className="text-gray-600 text-sm">
                  Fabriqué avec les meilleures prises du marché. Texture anti-dérapante, 
                  formes variées, durabilité garantie 5 ans.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vidéo démo */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Play className="w-6 h-6 text-supr-orange" />
            <h2 className="text-2xl font-bold text-gray-900">Ton premier bloc en 60 secondes</h2>
          </div>
          
          <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center text-center p-8">
            <div>
              <div className="w-20 h-20 bg-supr-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10 text-supr-orange" />
              </div>
              <p className="text-gray-600 font-medium mb-2">Vidéo de démonstration</p>
              <p className="text-sm text-gray-500">Bientôt disponible ! 🎬</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mt-4">
            📹 En attendant la vidéo, voici comment faire :
          </p>
          <ol className="text-sm text-gray-600 mt-2 space-y-1 ml-4">
            <li>1. Choisis un bloc de ta couleur (commence par le vert)</li>
            <li>2. Mets tes deux mains sur les prises de départ</li>
            <li>3. Monte en suivant les prises de la même couleur</li>
            <li>4. Le bloc est réussi quand tu tiens la dernière prise avec les 2 mains !</li>
          </ol>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-3xl font-bold text-supr-orange mb-1">15-20</div>
            <div className="text-xs text-gray-600">Blocs débutant</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-1">3-4m</div>
            <div className="text-xs text-gray-600">Hauteur mur</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-3xl font-bold text-green-500 mb-1">100%</div>
            <div className="text-xs text-gray-600">Sécurisé</div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-supr-orange to-orange-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Prêt à te lancer ?</h3>
          <p className="text-orange-100 mb-4">
            Découvre nos 10 tutos vidéo pour maîtriser les bases !
          </p>
          <button
            onClick={() => router.push(`/${gymSlug}/learn`)}
            className="bg-white text-supr-orange font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors w-full"
          >
            Voir les tutos complets →
          </button>
        </div>

        {/* SUPR Footer */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Ce Beginner Wall est équipé par</p>
          <a 
            href="https://suprclimbing.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl font-bold text-supr-orange hover:text-orange-600 transition-colors"
          >
            SUPR CLIMBING
          </a>
          <p className="text-xs text-gray-500 mt-1">Les prises qui te font progresser</p>
        </div>
      </div>
    </div>
  )
}
