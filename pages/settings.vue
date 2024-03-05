<script lang="ts" setup>
 const { bootNotification, acessibility } = useSettings()

const navStore = useNavStore()
navStore.setLeftAction('back', () => useRouter().back())
navStore.setTitle('Paramètres')
</script>

<template>
  <NuxtLayout name="main">
    <LayoutSettings title="Général">
      <UiSettingsItem type="toggle" label="Aide aux malvoyants" v-model:toggle="acessibility"
        icon-name="lets-icons:glasses-light" />
    </LayoutSettings>

    <LayoutSettings title="Notifications">
      <UiSettingsItem type="toggle" label="Afficher les fêtes du jour au démarrage de l'appareil"
        v-model:toggle="bootNotification" icon-name="lets-icons:on-button-duotone" />
    </LayoutSettings>

    <LayoutSettings title="Légal">
      <UiSettingsItem type="link" label="Règles de confidentialité"
        link="https://github.com/benoiteirik/theochrone-mobile/blob/main/privacy.md" icon-name="lets-icons:external" />
    </LayoutSettings>
  </NuxtLayout>
</template>
