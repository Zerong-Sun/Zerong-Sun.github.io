/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#f3efe3',
        board: '#ddd1b8',
        ink: {
          DEFAULT: '#202a20',
          muted: '#687062',
        },
        forest: '#172315',
        line: '#a8ab94',
        sky: '#438fd8',
        teal: '#72b5bc',
        brick: '#b96458',
        mustard: '#d2b85e',
        moss: '#687748',
        lilac: '#a98aaa',
        coral: '#d99a88',
      },
      fontFamily: {
        display: ['Fraunces', 'LXGW WenKai', 'Noto Serif SC', 'serif'],
        body: ['Noto Serif SC', 'Source Han Serif SC', 'serif'],
        ui: ['Inter', 'Noto Sans SC', 'sans-serif'],
      },
      maxWidth: {
        content: '720px',
        article: '860px',
        page: '1240px',
        wide: '1080px',
      },
      borderRadius: {
        small: '6px',
        medium: '14px',
      },
      boxShadow: {
        card: '6px 8px 0 rgba(32, 42, 32, 0.18)',
        soft: '0 4px 16px rgba(32, 42, 32, 0.08)',
        cutout: '6px 7px 0 rgba(32, 42, 32, 0.2)',
      },
      keyframes: {
        'assemble-in': {
          from: { opacity: '0', transform: 'translateY(16px) rotate(-0.8deg)' },
          to: { opacity: '1', transform: 'translateY(0) rotate(0)' },
        },
        'slide-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'arrow-nudge': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
        'stick-on': {
          from: { opacity: '0', transform: 'translateY(-6px) rotate(-1.2deg)' },
          to: { opacity: '1', transform: 'translateY(0) rotate(0)' },
        },
        'drawer-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'assemble-in': 'assemble-in 0.55s ease-out both',
        'slide-in-up': 'slide-in-up 0.45s ease-out both',
        'arrow-nudge': 'arrow-nudge 0.6s ease-in-out',
        'stick-on': 'stick-on 0.4s ease-out both',
        'drawer-in': 'drawer-in 0.3s ease-out both',
        'fade-in': 'fade-in 0.25s ease-out both',
      },
    },
  },
  plugins: [],
};
