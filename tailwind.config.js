/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'supr-orange': '#14b8a6',
        'supr-mint': '#14b8a6',
        'supr-mint-light': '#f5f5f4',
        'supr-mint-dark': '#000000',
        'supr-cream': '#fffbf7',
        'supr-dark': '#000000',
        'supr-black': '#fffbf7',
        'supr-surface': '#ffffff',
        'supr-border': '#e7e2db',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
