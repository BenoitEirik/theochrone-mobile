<script lang="ts" setup>
const { isShow, url, title, hide } = useImageViewer()

// Store previous callback to restore it when hiding the viewer
const backButton = useBackButton()
const previousCallback = ref<() => void>()

// Watch for changes in isShow to set/restore the back button callback
watch(isShow, (newValue) => {
  if (newValue) {
    // Save current callback and set new one when showing
    previousCallback.value = backButton.apply.value
    backButton.setCallback(() => hide())
  } else if (previousCallback.value) {
    // Restore previous callback when hiding
    backButton.apply.value = previousCallback.value
  }
}, { immediate: true })
</script>

<template>
  <figure v-if="isShow"
    class="fixed inset-0 flex h-dvh max-h-screen w-screen max-w-full flex-col items-stretch overflow-hidden bg-black/90 text-white backdrop-blur-md">
    <figcaption
      class="flex min-h-[50px] w-full shrink-0 items-center justify-stretch gap-2 overflow-hidden p-2 pt-[calc(0.5rem+env(safe-area-inset-top,0px))]">
      <button type="button" class="shrink-0 cursor-pointer rounded-full p-2" v-wave @click="hide()">
        <IconCSS name="lets-icons:close-round" :style="{ backgroundColor: 'white' }" />
      </button>
      <h2 class="line-clamp-1 grow text-xl font-medium">{{ title }}</h2>
    </figcaption>

    <div class="flex grow items-center justify-center p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]" @click="hide()">
      <img :src="url" alt="Fest picture" class="max-h-full max-w-full" @click.stop />
    </div>
  </figure>
</template>

<style lang="scss" scoped>
figure {
  animation: appear 0.2s ease-out;
}

@keyframes appear {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
