<script setup lang="ts">
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { ScreenOrientation } from '@capacitor/screen-orientation'

const loaded = ref(false)

ScreenOrientation.lock({ orientation: 'portrait' })

onBeforeMount(async () => {
  StatusBar.setStyle({ style: Style.Dark })
  StatusBar.setBackgroundColor({ color: '#55acee' })
  await useSettings().load()
  await SplashScreen.hide()
  loaded.value = true
})
</script>

<template>
  <div class="relative w-screen h-screen max-w-full max-h-screen overflow-hidden">
    <NavHeader />
    <NuxtPage v-if="loaded" :keepalive="{ include: 'index' }" class="z-10" />
    <NavDrawer />
    <UiImageViewer class="z-10" />
  </div>
</template>
