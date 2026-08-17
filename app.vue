<script setup lang="ts">
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { ScreenOrientation } from '@capacitor/screen-orientation'
import { SystemBars, SystemBarsStyle } from '@capacitor/core'

const loaded = ref(false)

ScreenOrientation.lock({ orientation: 'portrait' })

onBeforeMount(async () => {
  StatusBar.setStyle({ style: Style.Dark })
  StatusBar.setBackgroundColor({ color: '#55acee' })
  SystemBars.setStyle({ style: SystemBarsStyle.Light })
  await useSettings().load()
  await SplashScreen.hide()
  loaded.value = true
})
</script>

<template>
  <div class="relative h-screen max-h-screen w-screen max-w-full overflow-hidden">
    <NavHeader />
    <NuxtPage v-if="loaded" :keepalive="{ include: 'index' }" class="z-10" />
    <NavDrawer />
    <UiImageViewer class="z-10" />
  </div>
</template>
