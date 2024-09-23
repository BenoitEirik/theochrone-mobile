import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'jsdom', // Set jsdom for non-nuxt tests by default ex: myTest.spec.ts
    environmentOptions: { // Set jsdom for nuxt tests by defaul ex: myTest.nuxt.spec.ts
      nuxt: {
        domEnvironment: 'jsdom'
      }
    }
  }
})
