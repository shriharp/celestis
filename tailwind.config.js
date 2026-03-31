/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          bg: 'var(--color-bg)',
          canvas: 'var(--color-canvas)',
          border: 'var(--color-border)',
          borderHover: 'var(--color-border-hover)',
          textMuted: 'var(--color-text-muted)',
          textPrimary: 'var(--color-text-primary)',
          green: 'var(--color-green)',
          blue: 'var(--color-blue)',
          input: 'var(--color-input)',
          header: 'var(--color-header)',
        },
        zhuque: '#ef4444',
        qinglong: '#3b82f6',
        baihu: '#e2e8f0',
        xuanwu: '#475569',
        primary: 'var(--color-green)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [],
}
