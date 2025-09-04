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
    class="absolute left-1/2 top-1/2 flex h-screen max-h-screen w-screen max-w-full -translate-x-1/2 -translate-y-1/2 flex-col items-stretch overflow-hidden bg-black/90 text-white backdrop-blur-md">
    <figcaption
      class="flex h-[50px] max-h-[50px] shrink-0 items-center justify-stretch gap-2 overflow-hidden bg-primary-500 p-2">
      <button type="button" class="shrink-0 cursor-pointer rounded-full p-2" v-wave @click="hide()">
        <IconCSS name="lets-icons:close-round" :style="{ backgroundColor: 'white' }" />
      </button>
      <h2 class="line-clamp-1 grow text-xl font-medium">{{ title }}</h2>
    </figcaption>

    <div class="flex grow items-center justify-center p-4" @click="hide()">
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
