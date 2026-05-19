'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Mountain, Calendar, Users } from 'lucide-react'

export default function DiscoverPage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string

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
          <h1 className="text-xl font-bold">Découvrir l'escalade</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Outdoor */}
        <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
            <Mountain className="w-20 h-20 text-white opacity-50" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">L'escalade outdoor</h2>
            <p className="text-gray-600 mb-4">
              L'escalade en extérieur offre une connexion unique avec la nature. Bloc ou grande voie, 
              chaque discipline a ses particularités et ses sensations.
            </p>
            
            <h3 className="font-semibold text-gray-900 mb-2">Sites mythiques</h3>
            <div className="space-y-2 text-gray-600">
              <div>
                <strong>Fontainebleau (France)</strong> - Le paradis du bloc
              </div>
              <div>
                <strong>Yosemite (USA)</strong> - Les plus belles grandes voies
              </div>
              <div>
                <strong>Céüse (France)</strong> - Escalade sportive de haut niveau
              </div>
            </div>
          </div>
        </section>

        {/* Histoire */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Un peu d'histoire</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-supr-orange pl-4">
              <h3 className="font-semibold text-gray-900">Des alpinistes aux salles</h3>
              <p className="text-gray-600 text-sm mt-1">
                L'escalade est née de l'alpinisme au 19ème siècle. Les premières salles 
                d'escalade apparaissent dans les années 1980.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900">L'évolution du matériel</h3>
              <p className="text-gray-600 text-sm mt-1">
                Des prises artisanales aux shapes modernes comme SUPR : la technologie 
                a transformé l'escalade indoor.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900">L'escalade aux JO</h3>
              <p className="text-gray-600 text-sm mt-1">
                Discipline olympique depuis Tokyo 2020, l'escalade gagne en popularité mondiale.
              </p>
            </div>
          </div>
        </section>

        {/* Communauté */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-supr-orange" />
            <h2 className="text-2xl font-bold text-gray-900">La communauté</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Grimpeurs inspirants</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-900">Adam Ondra</p>
                  <p className="text-xs text-gray-600">Premier 9c au monde</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-900">Janja Garnbret</p>
                  <p className="text-xs text-gray-600">Championne olympique</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-900">Alex Honnold</p>
                  <p className="text-xs text-gray-600">Free Solo El Capitan</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-900">Shauna Coxsey</p>
                  <p className="text-xs text-gray-600">Reine du bloc UK</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Compétitions</h3>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-supr-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 font-medium">Coupe du Monde IFSC</p>
                  <p className="text-xs text-gray-600">Circuit international annuel</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-supr-orange to-orange-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Envie d'en savoir plus ?</h3>
          <p className="text-orange-100 mb-4">
            L'escalade, c'est plus qu'un sport - c'est un lifestyle !
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
