/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { dev }) => {
    // Évite les erreurs ENOENT du cache webpack en dev
    if (dev) {
      config.cache = false
    }
    return config
  },
}

module.exports = nextConfig
