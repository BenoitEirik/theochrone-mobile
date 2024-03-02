<script lang="ts" setup>
const navStore = useNavStore()
</script>

<template>
  <div class="p-2 w-full h-[50px] max-h-[50px] flex justify-between items-center bg-primary">
    <button type="button" @click="navStore.setLeftDrawer(!navStore.leftDrawer)" class="p-2 rounded-full cursor-pointer"
      v-wave>
      <Icon name="lucide:menu" color="white" />
      <span class="hidden">Drawer</span>
    </button>

    <h1 class="text-xl text-white">Theochrone</h1>

    <button type="button" @click="" class="p-2 rounded-full cursor-pointer" v-wave>
      <Icon name="lucide:search" color="white" />
      <span class="hidden">Search</span>
    </button>
  </div>
</template>
