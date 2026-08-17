<script lang="ts" setup>
const navStore = useNavStore()
</script>

<template>
  <header 
    class="flex min-h-[50px] w-full items-center justify-stretch gap-2 bg-primary-500 px-2 pb-2 pt-[calc(0.5rem+env(safe-area-inset-top,0px))]"
  >
    <button type="button" @click="navStore.leftAction.callback" class="shrink-0 cursor-pointer rounded-full p-2" v-wave>
      <IconCSS v-if="navStore.leftAction.name === 'menu'" name="lucide:menu" :style="{ backgroundColor: 'white' }" />
      <IconCSS v-if="navStore.leftAction.name === 'back'" name="lucide:chevron-left"
        :style="{ backgroundColor: 'white' }" />
    </button>

    <h1 class="line-clamp-1 grow text-xl font-medium text-white">{{ navStore.title }}</h1>
  </header>
</template>