"use client"
import { useRouter } from 'next/navigation'
import { ArrowLeft, Rocket, Target, Users, TrendingUp, Mail } from 'lucide-react'

export default function AboutSUPRPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
        {/* Hero */}
        <div className="bg-gradient-to-br from-supr-orange via-orange-500 to-red-500 rounded-3xl p-8 text-white text-center">
          <h2 className="text-4xl font-black mb-4">SUPR CLIMBING</h2>
          <p className="text-xl text-orange-100 mb-2">Les prises qui te font progresser</p>
          <p className="text-orange-200 text-sm">Fabriqué en Europe • Qualité premium • Innovation</p>
        </div>

        {/* Mission */}
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

        {/* Values */}
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

        {/* Beginner Walls */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos Beginner Walls</h2>
          <p className="text-gray-600 mb-6">
            Murs d'initiation modulaires conçus pour maximiser la rétention des débutants.
          </p>

          <div className="space-y-4">
            {/* Small */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">Small (S)</h3>
                <span className="text-2xl font-bold text-supr-orange">€15K</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 3m x 3m (9m²)</li>
                <li>• 15-20 blocs débutant</li>
                <li>• App incluse</li>
                <li>• Parfait pour <1000 membres</li>
              </ul>
            </div>

            {/* Medium */}
            <div className="border-2 border-supr-orange rounded-xl p-4 bg-orange-50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">Medium (M)</h3>
                  <span className="text-xs bg-supr-orange text-white px-2 py-1 rounded">POPULAIRE</span>
                </div>
                <span className="text-2xl font-bold text-supr-orange">€20K</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 4m x 3.5m (14m²)</li>
                <li>• 25-30 blocs débutant</li>
                <li>• App + Dashboard analytics</li>
                <li>• Parfait pour 1000-3000 membres</li>
              </ul>
            </div>

            {/* Large */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">Large (L)</h3>
                <span className="text-2xl font-bold text-supr-orange">€25K</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 5m x 4m (20m²)</li>
                <li>• 35-40 blocs débutant</li>
                <li>• App + Dashboard + Support dédié</li>
                <li>• Parfait pour >3000 membres</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Inclus avec chaque Beginner Wall</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="block">App mobile personnalisée</strong>
                <span className="text-blue-100 text-sm">Logo, couleurs et contenu de votre salle</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="block">10 tutos vidéo</strong>
                <span className="text-blue-100 text-sm">Pour accompagner les débutants</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="block">QR code + kit signalétique</strong>
                <span className="text-blue-100 text-sm">Posters, stickers, flyers</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="block">Dashboard analytics</strong>
                <span className="text-blue-100 text-sm">Suivez l'engagement en temps réel</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <strong className="block">Support technique 24/7</strong>
                <span className="text-blue-100 text-sm">Email, Slack, téléphone</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-3xl font-bold text-supr-orange mb-1">50+</div>
            <div className="text-xs text-gray-600">Salles équipées</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-1">40%</div>
            <div className="text-xs text-gray-600">Rétention +</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center">
            <div className="text-3xl font-bold text-green-500 mb-1">5ans</div>
            <div className="text-xs text-gray-600">Garantie</div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-supr-orange to-orange-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Équipez votre salle</h3>
          <p className="text-orange-100 mb-4">
            Demandez un devis gratuit et recevez une demo personnalisée
          </p>
          <a
            href="mailto:contact@suprclimbing.com?subject=Demande de devis Beginner Wall"
            className="inline-flex items-center gap-2 bg-white text-supr-orange font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-5 h-5" />
            contact@suprclimbing.com
          </a>
        </div>

        {/* Social */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Suivez-nous</p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://instagram.com/supr.climbing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Instagram
            </a>
            <a
              href="https://suprclimbing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Site web
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
