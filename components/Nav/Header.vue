<script lang="ts" setup>
const navStore = useNavStore()
</script>

<template>
  <header class="p-2 w-full h-[50px] max-h-[50px] flex justify-between items-center bg-primary-500">
    <button type="button" @click="navStore.leftAction.callback" class="p-2 rounded-full cursor-pointer"
      v-wave>
      <Icon v-if="navStore.leftAction.name === 'menu'" name="lucide:menu" color="white" />
      <Icon v-if="navStore.leftAction.name === 'back'" name="lets-icons:expand-left" color="white" />
      <span class="hidden">Drawer</span>
    </button>

    <h1 class="text-xl text-white">{{ navStore.title }}</h1>

    <button type="button" @click="" class="p-2 rounded-full cursor-pointer" v-wave>
      <Icon name="lucide:search" color="white" />
      <span class="hidden">Search</span>
    </button>
  </header>
</template>
