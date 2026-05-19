'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Rocket, Target, Users, Mail } from 'lucide-react'

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
            SUPR rend l&apos;escalade accessible à tous en créant des solutions innovantes pour les salles et les grimpeurs débutants.
          </p>
          <p className="text-gray-600">
            Notre ambition : devenir le leader européen des équipements d&apos;escalade pour débutants d&apos;ici 2028.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos valeurs</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <Target className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Qualité</h3>
                <p className="text-gray-600 text-sm">Prises fabriquées avec les meilleurs matériaux. Durabilité garantie 5 ans.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Rocket className="w-6 h-6 text-purple-500" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Innovation</h3>
                <p className="text-gray-600 text-sm">Premières prises connectées avec app d&apos;onboarding intégrée.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Communauté</h3>
                <p className="text-gray-600 text-sm">Soutien aux ouvreurs et création d&apos;une communauté de 100+ ambassadeurs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos Beginner Walls</h2>

          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Parfait pour &lt;1000 membres</li>
            <li>• Parfait pour 1000-3000 membres</li>
            <li>• Parfait pour &gt;3000 membres</li>
          </ul>
        </section>

        <div className="bg-gradient-to-r from-supr-orange to-orange-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Équipez votre salle</h3>
          <p className="text-orange-100 mb-4">Demandez un devis gratuit et recevez une demo personnalisée</p>

          <a
            href="mailto:contact@suprclimbing.com?subject=Demande de devis Beginner Wall"
            className="inline-flex items-center gap-2 bg-white text-supr-orange font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-5 h-5" />
            contact@suprclimbing.com
          </a>
        </div>
      </div>
    </div>
  )
}
