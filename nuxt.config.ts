// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@indielayer/ui/nuxt', 'nuxt-icon', '@pinia/nuxt', 'nuxt-swiper', 'nuxt-swiper','v-wave/nuxt'],
  css: ['~/assets/css/tailwind.css','~/assets/scss/main.scss'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.js'
  },
  build: {
    transpile: ['@indielayer/ui'],
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  vWave: {
  }
})
