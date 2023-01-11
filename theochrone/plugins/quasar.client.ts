import * as components from 'quasar'
import quasarLang from 'quasar/lang/fr'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const quasarUserOptions = {
        components,
        plugins: {},
        lang: quasarLang
    }

    nuxtApp.vueApp.use(components.Quasar, quasarUserOptions)
})