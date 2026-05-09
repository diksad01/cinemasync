export interface Theme {
  id: string
  name: string
  icon: string
  premium: boolean
  vars: Record<string, string>
}

export const THEMES: Theme[] = [
  {
    id: 'midnight-gold',
    name: 'Midnight Gold',
    icon: '🌙',
    premium: false,
    vars: {
      '--gold': '#f0c060',
      '--gold-hover': '#f0a03c',
      '--gold-border': 'rgba(240,192,96,0.2)',
      '--gold-glow': 'rgba(240,192,96,0.12)',
      '--gold-glow-strong': 'rgba(240,192,96,0.25)',
      '--bg': '#06080f',
      '--surface': '#0e1117',
      '--surface-hover': 'rgba(255,255,255,0.06)',
      '--text': '#e8eaf0',
      '--muted': '#7a8199',
      '--faint': '#555555',
      '--green': '#4ade80',
      '--red': '#ff6060',
      '--cyan': '#67e8f9',
      '--border': 'rgba(255,255,255,0.07)',
      '--border-medium': 'rgba(255,255,255,0.1)',
      '--backdrop': 'rgba(6,8,15,0.95)',
    },
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    icon: '🌊',
    premium: true,
    vars: {
      '--gold': '#60b0f0',
      '--gold-hover': '#3c90e0',
      '--gold-border': 'rgba(96,176,240,0.2)',
      '--gold-glow': 'rgba(96,176,240,0.12)',
      '--gold-glow-strong': 'rgba(96,176,240,0.25)',
      '--bg': '#060b12',
      '--surface': '#0b1220',
      '--surface-hover': 'rgba(96,176,240,0.06)',
      '--text': '#d8e4f0',
      '--muted': '#6889a8',
      '--faint': '#3d5570',
      '--green': '#4ade80',
      '--red': '#ff6060',
      '--cyan': '#67e8f9',
      '--border': 'rgba(96,176,240,0.08)',
      '--border-medium': 'rgba(96,176,240,0.12)',
      '--backdrop': 'rgba(6,11,18,0.95)',
    },
  },
  {
    id: 'rose-velvet',
    name: 'Rose Velvet',
    icon: '🌹',
    premium: true,
    vars: {
      '--gold': '#f0607a',
      '--gold-hover': '#e04060',
      '--gold-border': 'rgba(240,96,122,0.2)',
      '--gold-glow': 'rgba(240,96,122,0.12)',
      '--gold-glow-strong': 'rgba(240,96,122,0.25)',
      '--bg': '#0f0608',
      '--surface': '#1a0c10',
      '--surface-hover': 'rgba(240,96,122,0.06)',
      '--text': '#f0e0e4',
      '--muted': '#99707a',
      '--faint': '#664450',
      '--green': '#4ade80',
      '--red': '#ff6060',
      '--cyan': '#f0a0c0',
      '--border': 'rgba(240,96,122,0.08)',
      '--border-medium': 'rgba(240,96,122,0.12)',
      '--backdrop': 'rgba(15,6,8,0.95)',
    },
  },
  {
    id: 'emerald-noir',
    name: 'Emerald Noir',
    icon: '💎',
    premium: true,
    vars: {
      '--gold': '#50d0a0',
      '--gold-hover': '#40b888',
      '--gold-border': 'rgba(80,208,160,0.2)',
      '--gold-glow': 'rgba(80,208,160,0.12)',
      '--gold-glow-strong': 'rgba(80,208,160,0.25)',
      '--bg': '#060f0b',
      '--surface': '#0c1a14',
      '--surface-hover': 'rgba(80,208,160,0.06)',
      '--text': '#d8f0e8',
      '--muted': '#689988',
      '--faint': '#3d6655',
      '--green': '#4ade80',
      '--red': '#ff6060',
      '--cyan': '#67e8f9',
      '--border': 'rgba(80,208,160,0.08)',
      '--border-medium': 'rgba(80,208,160,0.12)',
      '--backdrop': 'rgba(6,15,11,0.95)',
    },
  },
]

export function getTheme(id: string): Theme {
  return THEMES.find(t => t.id === id) || THEMES[0]
}

export function applyTheme(id: string) {
  const theme = getTheme(id)
  const root = document.documentElement
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
  localStorage.setItem('sw_theme', id)
}
