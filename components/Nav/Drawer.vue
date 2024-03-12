<script lang="ts" setup>
import { App } from '@capacitor/app'
import { Browser } from '@capacitor/browser'

const navStore = useNavStore()

const router = useRouter()
</script>

<template>
  <x-drawer v-model="navStore.leftDrawer" width="300">
    <template #header>
      <figure class="flex flex-col items-stretch aspect-video">
        <img src="/images/backgrounds/banner.jpg" alt="Banner" class="object-cover w-full h-full grow" />
        <figcaption
          class="flex items-center justify-center px-4 py-3 font-medium text-white shrink-0 line-clamp-1 bg-primary-500">
          Ad
          majorem
          dei gloriam</figcaption>
      </figure>
    </template>
    <ul class="overflow-hidden">
      <li>
        <button type="button" class="flex items-stretch w-full justify-stretch" v-wave
          @click="async () => { await Browser.open({ url: 'https://theochrone.fr', toolbarColor: '#55acee' }); navStore.setLeftDrawer(false) }">
          <span class="p-4 shrink-0 aspect-square">
            <IconCSS name="lets-icons:world-2-light" />
          </span>
          <span class="flex flex-col items-stretch justify-center p-2 text-left grow">
            <span class="font-medium line-clamp-1 text-secondary-800">Site internet</span>
            <span class="text-gray-500 line-clamp-1">https://theochrone.fr</span>
          </span>
        </button>
      </li>
      <li>
        <button type="button" class="flex items-stretch w-full justify-stretch" v-wave
          @click="router.push('/settings'); navStore.setLeftDrawer(false)">
          <span class="p-4 shrink-0 aspect-square">
            <IconCSS name="lets-icons:setting-line-light" />
          </span>
          <span class="flex flex-col items-stretch justify-center p-2 text-left grow">
            <span class="font-medium line-clamp-1 text-secondary-800">Paramètres</span>
          </span>
        </button>
      </li>
      <li>
        <button type="button" class="flex items-stretch w-full max-w-full justify-stretch" v-wave
          @click="async () => { await Browser.open({ url: 'https://theochrone.fr/kalendarium/contact#contact', toolbarColor: '#55acee' }); navStore.setLeftDrawer(false) }">
          <span class="p-4 shrink-0 aspect-square">
            <IconCSS name="lets-icons:edit-light" />
          </span>
          <span class="flex flex-col items-stretch justify-center p-2 overflow-hidden text-left grow">
            <span class="font-medium line-clamp-1 text-secondary-800">Signaler une erreur</span>
          </span>
        </button>
      </li>
      <li>
        <button type="button" class="flex items-stretch w-full justify-stretch" v-wave
          @click="async () => { App.exitApp() }">
          <span class="p-4 shrink-0 aspect-square">
            <IconCSS name="lets-icons:sign-out-squre-light" />
          </span>
          <span class="flex flex-col items-stretch justify-center p-2 text-left grow">
            <span class="font-medium line-clamp-1 text-secondary-800">Quitter</span>
          </span>
        </button>
      </li>
    </ul>

    <template #footer>
      <div class="p-4 border-t">
        <x-button color="pink" rounded block light
          @click="async () => { navStore.setLeftDrawer(false); await Browser.open({ url: 'https://www.paypal.com/donate/?hosted_button_id=38SVK696BLC8Y', toolbarColor: '#55acee' }) }">
          Faire un don
        </x-button>
      </div>
    </template>
  </x-drawer>
</template>
