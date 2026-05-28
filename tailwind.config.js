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
        ink: '#1c1917',
        'ink-muted': '#57534e',
        cream: '#faf8f5',
        border: '#e8e4de',
        mineral: '#3d6b6b',
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
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        editorial: '0 8px 30px rgba(28, 25, 23, 0.06)',
        lift: '0 2px 8px rgba(28, 25, 23, 0.04)',
      },
    },
  },
  plugins: [],
}
