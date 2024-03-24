<script lang="ts" setup>
import { Browser } from '@capacitor/browser';
/** Each click to "#link" from table of contents in the html from introibo.fr page, push "/mass#link" in the router.
  * It is necassary to calculate the number of time (delta) there is a click on a link from the table of contents,
  * to going back until the previous page when clicking on Android back button, or the app back button.
  */
const delta = ref(1)
onBeforeRouteUpdate((to, from, next) => {
  to.fullPath.includes('#') ? delta.value++ : null
})

const navStore = useNavStore()
navStore.setLeftAction('back', () => useRouter().go(-delta.value))
useBackButton().setCallback(() => useRouter().go(-delta.value))


const store = useMassStore()

onBeforeMount(async () => {
  await store.getMass(store.url)
  navStore.setTitle(store.mass?.title || '')
})

const bodyMassRef = ref<HTMLElement | null>(null)
watch(bodyMassRef, () => {
  if (!!bodyMassRef.value) {
    // Set action on cliking on anchors from introibo.fr, to open in the integrated browser
    bodyMassRef.value.querySelectorAll('a').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        Browser.open({ url: `http://introibo.fr/${el.href.split('/')[3]}`, toolbarColor: '#55acee' })
      })
    })

    // Add possibility to watch images in the image viewer by clicking on images
    bodyMassRef.value.querySelectorAll('img').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        useImageViewer().show(el.src, store.mass?.title || '')
      })
      el.style.width = 'auto'
      el.style.maxWidth = '100%'
      el.style.maxHeight = '15rem'
      el.style.marginInline = 'auto'
    })
  }
}, { once: true })
</script>

<template>
  <NuxtLayout name="main" id="page" class="flex flex-col items-stretch gap-4 p-4 overflow-y-auto scroll-smooth ">
    <template v-if="store.isLoading">
      <h3 class="text-lg font-medium text-center text-secondary-800">Sommaire</h3>
      <section class="flex flex-col gap-4 p-4 shadow-inner rounded-3xl bg-secondary-50">
        <x-skeleton />
        <x-skeleton />
        <x-skeleton />
        <x-skeleton />
      </section>
      <section class="flex flex-col gap-4">
        <h3 class="text-lg font-medium text-center text-secondary-800">Textes de la messe</h3>
        <table>
          <tbody>
            <tr v-for="i in 10">
              <td><x-skeleton class="my-2 mr-2" /></td>
              <td><x-skeleton class="my-2 ml-2" /></td>
            </tr>
          </tbody>
        </table>
      </section>
    </template>
    
    <template v-else>
      <h3 class="text-lg font-medium text-center text-secondary-800">Sommaire</h3>
      <section class="flex flex-col gap-4 p-4 shadow-inner rounded-3xl bg-secondary-50">
        <div v-html="store.mass?.tableOfContents"
          class="flex flex-col items-stretch gap-2 [&>div]:flex [&_a]:line-clamp-1 text-secondary-800" />
        <button type="button" class="flex items-stretch w-full pl-2 border rounded-full border-gray"
          @click="() => Browser.open({ url: store.url, toolbarColor: '#55acee' })" v-wave>
          <span class="h-full p-2 shrink-0 aspect-square">
            <IconCSS name="lets-icons:external" :style="{ width: '20px' }" />
          </span>
          <span class="flex flex-col items-stretch justify-center p-2 text-xs text-left grow text-secondary-800">
            <span class="line-clamp-1">Ouvrir la page originale</span>
          </span>
        </button>
      </section>
      <section ref="bodyMassRef" v-html="store.mass?.body"
        class="hyphens-auto prose prose-headings:no-underline prose-headings:text-center prose-a:no-underline prose-tr:border-b-0 [&_table]:w-full [&_table]:table-fixed [&_td]:w-1/2 [&_img]:rounded" />
    </template>
  </NuxtLayout>
</template>
