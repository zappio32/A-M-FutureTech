import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#071a2f',
        blue: '#0f5ef7',
        electric: '#5cc8ff',
        purple: '#8b5cf6',
        cyan: '#67e8f9',
        ink: '#0c1220',
      },
      boxShadow: {
        glow: '0 0 40px rgba(61, 148, 255, 0.35)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};

export default config;
