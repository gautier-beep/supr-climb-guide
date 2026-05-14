'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Camera, Share2 } from 'lucide-react'
import { useState } from 'react'

const templates = [
  {
    id: 'first-climb',
    title: 'First Climb Ever 🚀',
    emoji: '🚀',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'new-grade',
    title: 'New Grade Unlocked 🎯',
    emoji: '🎯',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'grind',
    title: 'Session Grind 💪',
    emoji: '💪',
    color: 'from-orange-500 to-red-500'
  }
]

export default function SharePage() {
  const params = useParams()
  const router = useRouter()
  const gymSlug = params.gym_slug as string
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleShare = (templateId: string) => {
    // Track share event
    // In production, this would generate an actual image and open Instagram
    alert('Fonctionnalité bientôt disponible ! 📸\n\nL\'app générera une belle story avec le logo de ta salle et tu pourras la partager directement sur Instagram.')
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
          <h1 className="text-xl font-bold">Partager ma session</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Intro */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Camera className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Stories Instagram</h2>
          </div>
          <p className="text-purple-100">
            Choisis un template, personnalise-le, et partage ta session sur Instagram !
          </p>
        </div>

        {/* Templates */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Choisis ton template</h3>
          
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleShare(template.id)}
              className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${template.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                  {template.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{template.title}</h4>
                  <p className="text-sm text-gray-600">
                    Template avec logo de ta salle + hashtags
                  </p>
                </div>
                <Share2 className="w-6 h-6 text-gray-400 group-hover:text-supr-orange transition-colors" />
              </div>
            </button>
          ))}
        </div>

        {/* Preview exemple */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu</h3>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl aspect-[9/16] max-w-[280px] mx-auto p-6 text-white flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-2">🚀</div>
              <h4 className="text-2xl font-bold mb-2">First Climb Ever!</h4>
              <p className="text-purple-100 text-sm">J'ai grimpé mes premiers blocs aujourd'hui</p>
            </div>
            <div className="space-y-2">
              <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 text-sm">
                #{gymSlug} #SUPRClimbing #Bouldering
              </div>
              <div className="text-xs text-purple-100">
                Powered by SUPR
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Le logo de ta salle apparaîtra sur la story finale
          </p>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            <strong>💡 Astuce :</strong> Partage régulièrement tes sessions pour inspirer 
            d'autres grimpeurs et suivre ta progression !
          </p>
        </div>
      </div>
    </div>
  )
}
