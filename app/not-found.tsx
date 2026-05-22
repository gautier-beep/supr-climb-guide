import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-black text-supr-orange mb-2">404</h1>
        <h2 className="text-xl font-bold text-white mb-2">Page introuvable</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block bg-supr-orange text-white font-semibold py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors"
        >
          Retour à l&apos;accueil SUPR
        </Link>
      </div>
    </div>
  )
}
