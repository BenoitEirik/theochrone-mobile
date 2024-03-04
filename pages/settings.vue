<script lang="ts" setup>
const checked = ref(false)

const navStore = useNavStore()
navStore.setLeftAction('back', () => useRouter().back())
navStore.setTitle('Paramètres')
</script>

<template>
  <NuxtLayout name="main">
    <LayoutSettings title="Notifications">
      <UiSettingsItem type="toggle" label="Afficher les fêtes du jour au démarrage de l'appareil"
        v-model:toggle="checked" icon-name="lets-icons:on-button-duotone" />
    </LayoutSettings>
    
    <LayoutSettings title="Légal">
      <UiSettingsItem type="link" label="Règles de confidentialité"
        link="https://github.com/benoiteirik/theochrone-mobile/blob/main/privacy.md" icon-name="lets-icons:external" />
    </LayoutSettings>
  </NuxtLayout>
</template>
