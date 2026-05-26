import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-supr-cream flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-black text-black mb-2">404</h1>
        <h2 className="text-xl font-bold text-black mb-2">Page introuvable</h2>
        <p className="text-black mb-6 text-sm">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block bg-supr-mint text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
