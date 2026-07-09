/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:      ['Inter', 'system-ui', 'sans-serif'],
        marcellus: ['Marcellus', 'Georgia', 'serif'],
        mono:      ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ge: {
          bg:      '#0A0705',
          alt:     '#0E0B08',
          surface: '#140F09',
          gold:    '#D9A441',
          amber:   '#C25E00',
          photon:  '#FFD37A',
          cream:   '#F2E9DC',
          muted:   '#a08d76',
          faint:   '#7a6c58',
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
