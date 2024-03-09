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
        <figcaption class="flex items-center justify-center px-4 py-3 font-medium text-white shrink-0 line-clamp-1 bg-primary-500">Ad
          majorem
          dei gloriam</figcaption>
      </figure>
    </template>
    <ul>
      <li>
        <button type="button" class="flex items-stretch w-full justify-stretch" v-wave
          @click="async () => await Browser.open({ url: 'https://theochrone.fr', toolbarColor: '#55acee' })">
          <span class="p-4 shrink-0 aspect-square">
            <IconCSS name="lets-icons:world-2-light" />
          </span>
          <span class="flex flex-col items-stretch justify-center p-2 text-left grow">
            <span class="line-clamp-1">Site internet</span>
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
            <span class="line-clamp-1">Paramètres</span>
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
            <span class="line-clamp-1">Quitter</span>
          </span>
        </button>
      </li>
    </ul>

    <template #footer>
      <div class="p-4 border-t">
        <x-button color="pink" block light>Sountenir</x-button>
      </div>
    </template>
  </x-drawer>
</template>
