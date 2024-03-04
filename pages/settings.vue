<script lang="ts" setup>
const checked = ref(false)

const navStore = useNavStore()
navStore.setLeftAction('back', () => useRouter().back())
navStore.setTitle('Paramètres')
</script>

<template>
  <NuxtLayout name="main">
    <LayoutSettings title="Notifications">
      <UiSettingsItem right-action-type="boolean" label="Afficher les fêtes du jour au démarrage de l'appareil"
        v-model="checked" icon-name="lets-icons:on-button-duotone" />
    </LayoutSettings>
  </NuxtLayout>
</template>
