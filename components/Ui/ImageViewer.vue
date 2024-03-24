<script lang="ts" setup>
const { isShow, url, title, hide } = useImageViewer()
</script>

<template>
  <figure v-if="isShow"
    class="absolute flex flex-col items-stretch w-screen h-screen max-w-full max-h-screen overflow-hidden text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 backdrop-blur-md bg-black/90">
    <figcaption
      class="p-2 gap-2 shrink-0 flex justify-stretch h-[50px] max-h-[50px] items-center overflow-hidden bg-primary-500">
      <button type="button" class="p-2 rounded-full cursor-pointer shrink-0" v-wave @click="hide()">
        <IconCSS name="lets-icons:close-round" :style="{ backgroundColor: 'white' }" />
      </button>
      <h2 class="text-xl font-medium grow line-clamp-1">{{ title }}</h2>
    </figcaption>

    <div class="flex items-center justify-center p-4 grow" @click="hide()">
      <img :src="url" alt="Fest picture" class="max-w-full max-h-full" @click.stop />
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
