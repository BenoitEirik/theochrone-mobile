import icons from './icons'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-22',
  ssr: false,
  devtools: { enabled: false },
  experimental: {
    // because: https://github.com/nuxt/nuxt/issues/20889
    renderJsonPayloads: false
  },
  modules: ['@nuxtjs/tailwindcss', ['@indielayer/ui/nuxt', {
    icons
  }], 'nuxt-icon', '@pinia/nuxt', 'nuxt-swiper', 'nuxt-swiper','v-wave/nuxt', '@nuxt/test-utils/module'],
  css: ['~/assets/css/tailwind.css','~/assets/scss/main.scss'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.js',
    editorSupport: true,
    exposeConfig: true
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
  app: {
    head: {
      title: 'Theochrone',
      htmlAttrs: {
        lang: 'fr'
      },
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'theme-color', content: '#ffffff' }
      ]
    }
  }
})
