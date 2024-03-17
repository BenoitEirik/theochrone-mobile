<script lang="ts" setup>
import { Browser } from '@capacitor/browser'

const { accessibility, proper } = useSettings()

useBackButton().setBack()

const navStore = useNavStore()
navStore.setLeftAction('back', () => useRouter().back())
navStore.setTitle('Paramètres')
</script>

<template>
  <NuxtLayout name="main" class="flex flex-col items-stretch justify-between overflow-auto">
    <div>
      <LayoutSettings title="Général">
        <UiSettingsItem type="toggle" label="Aide aux malvoyants" v-model:toggle="accessibility"
          icon-name="lets-icons:glasses-light" />
        <UiSettingsItem type="select" label="Choix du propre" v-model:select="proper" :select-options="getPropers()"
          icon-name="lets-icons:pin-alt-light" />
      </LayoutSettings>

      <!-- TODO -->
      <!-- <LayoutSettings title="Notifications">
        <UiSettingsItem type="toggle" label="Afficher les fêtes du jour au démarrage de l'appareil"
          v-model:toggle="bootNotification" icon-name="lets-icons:on-button-duotone" />
      </LayoutSettings> -->

      <LayoutSettings title="Informations">
        <UiSettingsItem type="link" label="Règles de confidentialité"
          link="https://github.com/benoiteirik/theochrone-mobile/blob/main/privacy.md"
          icon-name="material-symbols-light:privacy-tip-outline-rounded" />
        <UiSettingsItem type="link" label="Licence CC BY-ND 4.0 Deed"
          link="https://creativecommons.org/licenses/by-nd/4.0/" icon-name="ph:copyright-light" />
        <UiSettingsItem type="link" label="Code source" link="https://github.com/BenoitEirik/theochrone-mobile"
          icon-name="mdi:open-source-initiative" />
      </LayoutSettings>

      <div class="p-4">
        <x-button color="pink" rounded block light
          @click="async () => await Browser.open({ url: 'https://www.paypal.com/donate/?hosted_button_id=38SVK696BLC8Y', toolbarColor: '#55acee' })">Faire
          un don</x-button>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center gap-2 p-4 text-xs text-center text-secondary-500">
      <address>Application développé par <strong class="underline"
          @click="async () => await Browser.open({ url: 'https://olafsergent.fr', toolbarColor: '#55acee' })">Olaf-Marie
          Sergent</strong></address>
      <address>Le Théochrone est un projet créé par <strong class="underline"
          @click="async () => await Browser.open({ url: 'https://philippeaucazou.wordpress.com/', toolbarColor: '#55acee' })">Philippe
          Aucazou</strong></address>
    </div>
  </NuxtLayout>
</template>
