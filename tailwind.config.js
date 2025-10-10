/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // SCC Light Mode Colors
        'scc-primary': '#2C5F7C',
        'scc-accent': '#D4AF37',
        'scc-success': '#10B981',
        'scc-background': '#F8F9FA',
        'scc-text': '#2C3E50',
        'scc-wechat': '#07C160',
        'scc-whatsapp': '#25D366',
        'scc-gold': '#D4AF37',

        // SCC Dark Mode Colors
        'scc-dark-bg': '#0A0E1A',
        'scc-dark-bg-secondary': '#121826',
        'scc-dark-card': '#1A2332',
        'scc-dark-text': '#E5E7EB',
        'scc-dark-text-secondary': '#9CA3AF',
        'scc-dark-border': '#2D3748',
        'scc-dark-primary': '#3B82F6',
        'scc-dark-accent': '#F59E0B',
      },
      fontFamily: {
        sans: ['var(--font-raleway)', 'Raleway', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        chinese: ['var(--font-noto-sans-sc)', 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', 'sans-serif'],
      },
      // Fluid Typography - responsive font sizes using clamp()
      fontSize: {
        // Display headings (hero sections)
        'display-xl': ['clamp(3rem, 5vw + 1rem, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['clamp(2.5rem, 4vw + 1rem, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['clamp(2rem, 3.5vw + 0.5rem, 4rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],

        // Headings
        'h1': ['clamp(2.25rem, 3vw + 0.5rem, 3.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['clamp(1.875rem, 2.5vw + 0.5rem, 3rem)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['clamp(1.5rem, 2vw + 0.5rem, 2.25rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['clamp(1.25rem, 1.5vw + 0.5rem, 1.875rem)', { lineHeight: '1.35', fontWeight: '600' }],
        'h5': ['clamp(1.125rem, 1.25vw + 0.25rem, 1.5rem)', { lineHeight: '1.4', fontWeight: '600' }],
        'h6': ['clamp(1rem, 1vw + 0.25rem, 1.25rem)', { lineHeight: '1.4', fontWeight: '600' }],

        // Body text
        'body-xl': ['clamp(1.125rem, 1vw + 0.5rem, 1.5rem)', { lineHeight: '1.6' }],
        'body-lg': ['clamp(1rem, 0.5vw + 0.75rem, 1.25rem)', { lineHeight: '1.6' }],
        'body': ['clamp(0.875rem, 0.25vw + 0.75rem, 1.125rem)', { lineHeight: '1.6' }],
        'body-sm': ['clamp(0.8125rem, 0.125vw + 0.75rem, 1rem)', { lineHeight: '1.5' }],
        'body-xs': ['clamp(0.75rem, 0.125vw + 0.625rem, 0.875rem)', { lineHeight: '1.5' }],

        // UI elements
        'button-lg': ['clamp(1rem, 0.5vw + 0.75rem, 1.25rem)', { lineHeight: '1', fontWeight: '600' }],
        'button': ['clamp(0.875rem, 0.25vw + 0.75rem, 1.125rem)', { lineHeight: '1', fontWeight: '600' }],
        'button-sm': ['clamp(0.8125rem, 0.125vw + 0.75rem, 1rem)', { lineHeight: '1', fontWeight: '500' }],
        'caption': ['clamp(0.75rem, 0.125vw + 0.625rem, 0.875rem)', { lineHeight: '1.4' }],
      },
      // Fluid Spacing - responsive spacing using clamp()
      spacing: {
        // Section spacing (vertical rhythm)
        'section-xl': 'clamp(5rem, 10vw + 2rem, 10rem)',      // 80px - 160px
        'section-lg': 'clamp(4rem, 8vw + 1.5rem, 8rem)',      // 64px - 128px
        'section-md': 'clamp(3rem, 6vw + 1rem, 6rem)',        // 48px - 96px
        'section-sm': 'clamp(2rem, 4vw + 0.5rem, 4rem)',      // 32px - 64px
        'section-xs': 'clamp(1.5rem, 3vw + 0.5rem, 3rem)',    // 24px - 48px

        // Container spacing
        'container-xl': 'clamp(2rem, 5vw, 4rem)',             // 32px - 64px
        'container-lg': 'clamp(1.5rem, 4vw, 3rem)',           // 24px - 48px
        'container-md': 'clamp(1rem, 3vw, 2rem)',             // 16px - 32px
        'container-sm': 'clamp(0.75rem, 2vw, 1.5rem)',        // 12px - 24px

        // Element spacing
        'element-xl': 'clamp(2rem, 4vw, 3rem)',               // 32px - 48px
        'element-lg': 'clamp(1.5rem, 3vw, 2.5rem)',           // 24px - 40px
        'element-md': 'clamp(1rem, 2vw, 2rem)',               // 16px - 32px
        'element-sm': 'clamp(0.75rem, 1.5vw, 1.5rem)',        // 12px - 24px
        'element-xs': 'clamp(0.5rem, 1vw, 1rem)',             // 8px - 16px

        // Card/Component gaps
        'gap-xl': 'clamp(2rem, 4vw, 3rem)',                   // 32px - 48px
        'gap-lg': 'clamp(1.5rem, 3vw, 2rem)',                 // 24px - 32px
        'gap-md': 'clamp(1rem, 2vw, 1.5rem)',                 // 16px - 24px
        'gap-sm': 'clamp(0.5rem, 1vw, 1rem)',                 // 8px - 16px
      },
      // Fluid Border Radius
      borderRadius: {
        'card': 'clamp(0.75rem, 1vw, 1.25rem)',               // 12px - 20px
        'button': 'clamp(0.5rem, 0.75vw, 1rem)',              // 8px - 16px
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}