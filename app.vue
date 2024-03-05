<script setup lang="ts">
import { StatusBar, Style } from '@capacitor/status-bar'

StatusBar.setStyle({ style: Style.Dark })
StatusBar.setBackgroundColor({ color: '#55acee' })
</script>

<template>
  <div class="w-screen h-screen max-w-full max-h-screen overflow-hidden">
    <NavHeader />
    <NuxtPage />
    <NavDrawer />
  </div>
</template>
