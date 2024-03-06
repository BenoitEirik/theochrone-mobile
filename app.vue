<script setup lang="ts">
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'

useSettings()

StatusBar.setStyle({ style: Style.Dark })
StatusBar.setBackgroundColor({ color: '#55acee' })

onMounted(async () => {
  await SplashScreen.hide()
})
</script>

<template>
  <div class="w-screen h-screen max-w-full max-h-screen overflow-hidden">
    <NavHeader />
    <NuxtPage />
    <NavDrawer />
  </div>
</template>
