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
        // SCC 컬러 추가
        'scc-primary': '#2C5F7C',
        'scc-accent': '#D4AF37',
        'scc-success': '#10B981',
        'scc-background': '#F8F9FA',
        'scc-text': '#2C3E50',
        'scc-wechat': '#07C160',
        'scc-whatsapp': '#25D366',
        'scc-gold': '#D4AF37',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}