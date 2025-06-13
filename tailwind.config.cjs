/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/**/*.{html,js,ts,vue,md}",
    "./docs/.vitepress/**/*.{html,js,ts,vue,md}"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: 'var(--vp-font-family-mono)',
        sans: 'var(--vp-font-family-base)'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
} 