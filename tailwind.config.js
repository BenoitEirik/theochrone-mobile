const colors = require('tailwindcss/colors')
const indielayer = require('@indielayer/ui/tailwind.preset')

// To remain: always install TailwindCSS on Nuxt ONLY by following official Tailwind website (not the plugin!)

module.exports = {
  darkMode: 'class',
  // load indielayer ui presets
  presets: [indielayer()],
  // allow PurgeCSS to analyze components
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    'node_modules/@indielayer/ui/{lib,src}/**/*',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#55acee',
        secondary: '#26a69a',
        accent: '#9c27b0',
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
      }
    },
  },
  plugins: [],
}
