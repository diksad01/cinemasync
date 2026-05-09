export const theme = {
  colors: {
    bg:           '#06080f',
    surface:      '#0e1117',
    surfaceHover: 'rgba(255,255,255,0.06)',

    gold:         '#f0c060',
    goldHover:    '#f0a03c',
    goldBorder:   'rgba(240,192,96,0.2)',
    goldGlow:     'rgba(240,192,96,0.12)',
    goldGlowBg:   'rgba(240,192,96,0.25)',

    text:         '#e8eaf0',
    muted:        '#7a8199',
    faint:        '#555555',

    green:        '#4ade80',
    red:          '#ff6060',
    cyan:         '#67e8f9',

    borderLight:  'rgba(255,255,255,0.07)',
    borderMedium: 'rgba(255,255,255,0.1)',

    backdrop:     'rgba(6,8,15,0.95)',
  },
  gradients: {
    buttonPrimary: 'linear-gradient(135deg, #f0c060, #f0a03c)',
    goldGlowBg:    'rgba(240,192,96,0.25)',
  },
  fonts: {
    sans: "'DM Sans', system-ui, sans-serif",
    mono: "'DM Mono', monospace",
  },
  cssVars: `
    --gold: #f0c060;
    --bg: #06080f;
    --surface: #0e1117;
    --text: #e8eaf0;
    --muted: #7a8199;
    --cyan: #67e8f9;
    --green: #4ade80;
    --red: #ff6060;
    --border: rgba(255,255,255,0.07);
    --border-gold: rgba(240,192,96,0.2);
    --gold-glow: rgba(240,192,96,0.12);
  `
} as const
