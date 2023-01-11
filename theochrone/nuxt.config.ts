import { quasar } from '@quasar/vite-plugin'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    '@quasar/extras/material-icons/material-icons.css',
    '@/assets/styles/quasar.sass'
  ],
  build: {
    transpile: ['quasar']
  },
  vite: {
    plugins: [
      quasar({
        sassVariables: 'assets/styles/quasar.variables.sass'
      })
    ]
  }
})
