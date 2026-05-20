"use client";

import { useRouter } from 'next/navigation'
import { ArrowLeft, Rocket, Target, Users, TrendingUp, Mail } from 'lucide-react'

export default function AboutSUPRPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">À propos de SUPR</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        <div className="bg-gradient-to-br from-supr-orange via-orange-500 to-red-500 rounded-3xl p-8 text-white text-center">
          <h2 className="text-4xl font-black mb-4">SUPR CLIMBING</h2>
          <p className="text-xl text-orange-100 mb-2">Les prises qui te font progresser</p>
          <p className="text-orange-200 text-sm">Fabriqué en Europe • Qualité premium • Innovation</p>
        </div>

        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre mission</h2>
          <p className="text-gray-600 mb-4">
            SUPR rend l'escalade accessible à tous en créant des solutions innovantes 
            pour les salles et les grimpeurs débutants.
          </p>
          <p className="text-gray-600">
            Notre ambition : devenir le leader européen des équipements d'escalade 
            pour débutants d'ici 2028.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos valeurs</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Qualité</h3>
                <p className="text-gray-600 text-sm">
                  Prises fabriquées avec les meilleurs matériaux. Durabilité garantie 5 ans.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  Premières prises connectées avec app d'onboarding intégrée.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Communauté</h3>
                <p className="text-gray-600 text-sm">
                  Soutien aux ouvreurs et création d'une communauté de 100+ ambassadeurs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Powered by</p>
          <a 
            href="https://suprclimbing.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl font-bold text-supr-orange hover:text-orange-600 transition-colors"
          >
            SUPR CLIMBING
          </a>
        </div>
      </div>
    </div>
  )
}
