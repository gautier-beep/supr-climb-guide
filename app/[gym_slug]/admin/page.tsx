'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase, Gym } from '@/lib/supabase'
import { BarChart3, Users, ShoppingBag, Share2, Eye, Lock } from 'lucide-react'

export default function AdminPage() {
  const params = useParams()
  const gymSlug = params.gym_slug as string
  
  const [gym, setGym] = useState<Gym | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    totalViews: 0,
    beginnerWallViews: 0,
    learnViews: 0,
    shopClicks: 0,
    instagramShares: 0,
  })

  // Simple password check - in production, use proper auth
  const ADMIN_PASSWORD = 'supr2026'

  useEffect(() => {
    loadGym()
  }, [gymSlug])

  useEffect(() => {
    if (isAuthenticated && gym) {
      loadStats()
    }
  }, [isAuthenticated, gym])

  async function loadGym() {
    try {
      const { data, error } = await supabase
        .from('gyms')
        .select('*')
        .eq('slug', gymSlug)
        .single()

      if (error) throw error
      setGym(data)
    } catch (error) {
      console.error('Error loading gym:', error)
    }
  }

  async function loadStats() {
    if (!gym) return

    try {
      // Get all analytics for this gym
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('gym_id', gym.id)

      if (error) throw error

      const events = data || []
      
      setStats({
        totalViews: events.filter(e => e.event_type === 'page_view').length,
        beginnerWallViews: events.filter(e => e.event_type === 'beginner_wall_view').length,
        learnViews: events.filter(e => e.event_type === 'video_play').length,
        shopClicks: events.filter(e => e.event_type === 'shop_click').length,
        instagramShares: events.filter(e => e.event_type === 'instagram_share').length,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Mot de passe incorrect')
      setPassword('')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="w-16 h-16 bg-supr-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-supr-orange" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Dashboard Admin</h1>
          <p className="text-center text-gray-600 mb-6">{gym?.name}</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-supr-orange focus:border-transparent"
                placeholder="Entrez le mot de passe"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-supr-orange text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition-colors"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Mot de passe fourni par SUPR lors de l'installation
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Analytics</h1>
              <p className="text-gray-600">{gym?.name}</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Visites totales</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-supr-orange/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-supr-orange" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Vues Beginner Wall</p>
                <p className="text-2xl font-bold text-gray-900">{stats.beginnerWallViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Vidéos visionnées</p>
                <p className="text-2xl font-bold text-gray-900">{stats.learnViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Clics boutique</p>
                <p className="text-2xl font-bold text-gray-900">{stats.shopClicks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center">
                <Share2 className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Partages Instagram</p>
                <p className="text-2xl font-bold text-gray-900">{stats.instagramShares}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Taux engagement</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalViews > 0 
                    ? Math.round(((stats.learnViews + stats.shopClicks) / stats.totalViews) * 100) 
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">📊 À propos de ces statistiques</h3>
          <p className="text-sm text-blue-800 mb-4">
            Ces données sont mises à jour en temps réel et vous permettent de mesurer l'engagement 
            des grimpeurs avec votre Beginner Wall SUPR.
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Visites totales</strong> : Nombre de scans QR code</li>
            <li>• <strong>Vues Beginner Wall</strong> : Accès à la page dédiée</li>
            <li>• <strong>Vidéos visionnées</strong> : Engagement avec les tutos</li>
            <li>• <strong>Clics boutique</strong> : Intérêt pour les produits SUPR</li>
            <li>• <strong>Partages Instagram</strong> : Visibilité organique</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Dashboard fourni par <span className="font-bold text-supr-orange">SUPR Climbing</span></p>
        </div>
      </div>
    </div>
  )
}
