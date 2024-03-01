<template>
<x-drawer v-model="navStore.leftDrawer" width="300">
  <template #header>
    <figure class="flex flex-col items-stretch aspect-video">
      <img src="/images/backgrounds/banner.jpg" alt="Banner" class="grow w-full h-full object-cover">
      <figcaption class="shrink-0 p-4 flex justify-center items-center line-clamp-1 bg-primary text-white">Ad majorem
        dei gloriam</figcaption>
    </figure>
  </template>
  <ul>
    <li>
      <button class="w-full flex justify-stretch items-stretch" v-wave>
        <div class="p-4 shrink-0 aspect-video">
          <Icon name="lucide:globe" />
        </div>
        <div class="p-2 grow flex flex-col justify-center items-stretch text-left">
          <p class="line-clamp-1">Site internet</p>
          <p class="line-clamp-1 text-gray-500">https://theochrone.fr</p>
        </div>
      </button>
    </li>
    <li>
      <button class="w-full flex justify-stretch items-stretch" v-wave>
        <div class="p-4 shrink-0 aspect-video">
          <Icon name="lucide:settings" />
        </div>
        <div class="p-2 grow flex flex-col justify-center items-stretch text-left">
          <p class="line-clamp-1">Paramètres</p>
        </div>
      </button>
    </li>
    <li>
      <button class="w-full flex justify-stretch items-stretch" v-wave>
        <div class="p-4 shrink-0 aspect-video">
          <Icon name="lucide:door-closed" />
        </div>
        <div class="p-2 grow flex flex-col justify-center items-stretch text-left">
          <p class="line-clamp-1">Quitter</p>
        </div>
      </button>
    </li>
  </ul>
  <template #footer>
    <div class="border-t p-4">
      <x-button color="pink" block light>Sountenir</x-button>
    </div>
  </template>
</x-drawer>
</template>

<script lang="ts" setup>
const navStore = useNavStore()
</script>
