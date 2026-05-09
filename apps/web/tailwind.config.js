/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sw: {
          bg:      '#06080f',
          surface: '#0e1117',
          gold:    '#f0c060',
          'gold-hover': '#f0a03c',
          text:    '#e8eaf0',
          muted:   '#7a8199',
          faint:   '#555555',
          green:   '#4ade80',
          red:     '#ff6060',
          cyan:    '#67e8f9',
        }
      },
      fontFamily: {
        sans: ["'DM Sans'", 'system-ui', 'sans-serif'],
        mono: ["'DM Mono'", 'monospace'],
      },
      borderColor: {
        'sw-light': 'rgba(255,255,255,0.07)',
        'sw-medium': 'rgba(255,255,255,0.1)',
        'sw-gold': 'rgba(240,192,96,0.2)',
      },
      backgroundColor: {
        'sw-hover': 'rgba(255,255,255,0.06)',
        'sw-gold-glow': 'rgba(240,192,96,0.12)',
        'sw-gold-glow-bg': 'rgba(240,192,96,0.25)',
        'sw-backdrop': 'rgba(6,8,15,0.95)',
      },
    },
  },
  plugins: [],
}
