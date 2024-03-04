<script lang="ts" setup>
const checked = ref(false)

const navStore = useNavStore()
navStore.setLeftAction('back', () => useRouter().back())
navStore.setTitle('Paramètres')
</script>

<template>
  <NuxtLayout name="main">
    <section class="p-4">
      <h2 class="mb-2 text-lg">Notifications</h2>
      <div class="overflow-hidden bg-gray-100 rounded-xl">
        <button type="button" class="flex items-stretch w-full justify-stretch" v-wave @click="checked = !checked">
          <span class="p-4 shrink-0 aspect-video">
            <Icon name="lets-icons:on-button-duotone" />
          </span>
          <span class="flex flex-col items-stretch justify-center p-2 text-left grow">
            <p class="line-clamp-2">Afficher les fêtes du jour au démarrage de l'appareil</p>
          </span>
          <span class="flex items-center justify-center p-4 shrink-0 aspect-video" @click.prevent>
            <x-toggle v-model="checked" color="primary" hide-footer />
          </span>
        </button>
      </div>
    </section>
  </NuxtLayout>
</template>
