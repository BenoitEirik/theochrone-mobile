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
        primary: {
          "50": "rgb(243,248,253)",
          "100": "rgb(231,241,252)",
          "200": "rgb(205,225,248)",
          "300": "rgb(174,209,245)",
          "400": "rgb(114,182,240)",
          "500": "#55acee",
          "600": "rgb(81,163,226)",
          "700": "rgb(74,149,206)",
          "800": "rgb(55,111,154)",
          "900": "rgb(47,94,130)",
          "950": "rgb(38,77,106)"
        },
        secondary: colors.slate,
        success: colors.green,
        warning: colors.yellow,
        error: colors.red
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
