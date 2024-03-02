<script lang="ts" setup>
const navStore = useNavStore()
</script>

<template>
  <x-drawer v-model="navStore.leftDrawer" width="300">
    <template #header>
      <figure class="flex flex-col items-stretch aspect-video">
        <img src="/images/backgrounds/banner.jpg" alt="Banner" class="object-cover w-full h-full grow">
        <figcaption class="flex items-center justify-center p-4 text-white shrink-0 line-clamp-1 bg-primary">Ad majorem
          dei gloriam</figcaption>
      </figure>
    </template>
    <ul>
      <li>
        <button type="button" class="flex items-stretch w-full justify-stretch" v-wave>
          <div class="p-4 shrink-0 aspect-video">
            <Icon name="lets-icons:world-2-light" />
          </div>
          <div class="flex flex-col items-stretch justify-center p-2 text-left grow">
            <p class="line-clamp-1">Site internet</p>
            <p class="text-gray-500 line-clamp-1">https://theochrone.fr</p>
          </div>
        </button>
      </li>
      <li>
        <button type="button" class="flex items-stretch w-full justify-stretch" v-wave>
          <div class="p-4 shrink-0 aspect-video">
            <Icon name="lets-icons:setting-line-light" />
          </div>
          <div class="flex flex-col items-stretch justify-center p-2 text-left grow">
            <p class="line-clamp-1">Paramètres</p>
          </div>
        </button>
      </li>
      <li>
        <button type="button" class="flex items-stretch w-full justify-stretch" v-wave>
          <div class="p-4 shrink-0 aspect-video">
            <Icon name="lets-icons:sign-out-squre-light" />
          </div>
          <div class="flex flex-col items-stretch justify-center p-2 text-left grow">
            <p class="line-clamp-1">Quitter</p>
          </div>
        </button>
      </li>
    </ul>

    <template #footer>
      <div class="p-4 border-t">
        <x-button color="pink" block light>Sountenir</x-button>
      </div>
    </template>
  </x-drawer>
</template>
