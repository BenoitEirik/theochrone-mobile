<script setup lang="ts">
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { ScreenOrientation } from '@capacitor/screen-orientation'

ScreenOrientation.lock({ orientation: 'portrait' })

useSettings()

onMounted(async () => {
  await SplashScreen.hide()
  StatusBar.setStyle({ style: Style.Dark })
  StatusBar.setBackgroundColor({ color: '#55acee' })
})
</script>

<template>
  <div class="w-screen h-screen max-w-full max-h-screen overflow-hidden">
    <NavHeader />
    <NuxtPage :keepalive="{ include: 'index' }" />
    <NavDrawer />
  </div>
</template>
