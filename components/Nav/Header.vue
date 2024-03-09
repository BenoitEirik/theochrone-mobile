<script lang="ts" setup>
const navStore = useNavStore()
</script>

<template>
  <header class="p-2 w-full h-[50px] max-h-[50px] flex justify-stretch items-center bg-primary-500 gap-2">
    <button type="button" @click="navStore.leftAction.callback" class="p-2 rounded-full cursor-pointer shrink-0" v-wave>
      <IconCSS v-if="navStore.leftAction.name === 'menu'" name="lucide:menu" :style="{ backgroundColor: 'white' }" />
      <IconCSS v-if="navStore.leftAction.name === 'back'" name="lets-icons:expand-left"
        :style="{ backgroundColor: 'white' }" />
    </button>

    <h1 class="text-xl font-medium text-white grow line-clamp-1">{{ navStore.title }}</h1>
  </header>
</template>
