<template>
<q-layout view="lHh Lpr lFf">
  <q-header :class="{ hidden: layoutStore.hide }">
    <div>
      <q-toolbar>
        <q-btn flat dense round :icon="heroOutline24Bars3" aria-label="Menu" @click="toggleLeftDrawer"
          v-if="$route.path === '/'" />
        <q-btn flat dense round :icon="heroOutline24ChevronLeft" aria-label="Arrow Back" @click="$router.back()"
          v-else />


        <q-toolbar-title class="text-center" v-if="$route.path !== '/'">
          {{ layoutStore.title.split(',')[0] }}
        </q-toolbar-title>
        <q-toolbar-title class="text-center" v-else>
          Theochrone
        </q-toolbar-title>

        <q-btn flat dense round :icon="heroOutline24MagnifyingGlass" aria-label="Search"
          @click="$router.push({ path: '/search' })" :class="$route.path === '/search' ? 'invisible' : ''" />
      </q-toolbar>

      <div class="text-center" style="height: 35px; font-size: medium;" v-show="layoutStore.subtitle !== ''">
        {{ layoutStore.subtitle }}
      </div>

      <q-toolbar v-if="$route.path == '/search'">
        <q-input dense rounded outlined class="q-pa-md fit" v-model="searchStore.searchField" :dark="true" color="white"
          placeholder="Mots-clés..." :loading="loadingState">
          <template v-slot:append>
            <q-btn flat dense round :icon="heroOutline24MagnifyingGlass" aria-label="Search" @click="triggerSearch()"
              color="white" v-if="!loadingState" />
          </template>
        </q-input>
      </q-toolbar>
    </div>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" show-if-above class="column">
    <q-img src="~assets/images/drawer/banner.jpg" class="full-width" fit="contain" />

    <div class="q-pa-md text-center quote">
      Ad majorem Dei gloriam
    </div>

    <q-list>
      <q-item clickable target="_blank" href="https://theochrone.fr">
        <q-item-section avatar>
          <q-icon :name="heroOutline24GlobeEuropeAfrica" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Site internet</q-item-label>
          <q-item-label caption>https://theochrone.fr</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon :name="heroOutline24Bell" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Notification</q-item-label>
          <q-item-label caption lines="2">Au démarrage et début de journée</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label>
            <q-toggle v-model="notificationToggle"
              @update:model-value="(value, evt) => setNotificationToggle(value as boolean)" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable @click="async () => { await app.exitApp() }">
        <q-item-section avatar>
          <q-icon :name="heroOutline24ArrowRightOnRectangle" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Quitter</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-space />

    <q-separator />

    <q-btn class="q-pa-md full-width text-center" target="_blank"
      href="https://github.com/benoiteirik/theochrone-mobile/blob/main/privacy.md" no-caps unelevated>
      Règles de confidentialité
    </q-btn>

    <q-separator />

    <q-btn class="q-pa-md full-width text-center" target="_blank" href="https://github.com/benoiteirik" no-caps
      unelevated>
      @benoiteirik
    </q-btn>
  </q-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount } from 'vue';
import { StatusBar, Style } from '../../src-capacitor/node_modules/@capacitor/status-bar'
import { App } from '../../src-capacitor/node_modules/@capacitor/app';
import { Storage } from '../../src-capacitor/node_modules/@capacitor/storage';
import { useLayoutStore } from 'src/stores/layout-store';
import { useSearchStore } from 'src/stores/search-store';
import { heroOutline24Bars3, heroOutline24MagnifyingGlass, heroOutline24ChevronLeft, heroOutline24GlobeEuropeAfrica, heroOutline24ArrowRightOnRectangle, heroOutline24Bell } from 'quasar-extras-svg-icons/hero-icons-v2'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false)
    const layoutStore = useLayoutStore()
    const searchStore = useSearchStore()
    const loadingState = ref<boolean>(false)
    const notificationToggle = ref<boolean>(false)

    onBeforeMount(async () => {
      const toggle = await Storage.get({ key: 'notificationToggle' });
      if (toggle.value === 'true') {
        notificationToggle.value = true
      } else if (toggle.value === 'false') {
        notificationToggle.value = false
      } else notificationToggle.value = false
    })

    onMounted(async () => {
      await StatusBar.setStyle({ style: Style.Dark })
      await StatusBar.setBackgroundColor({ color: '#55acee' })
    })

    async function triggerSearch() {
      loadingState.value = true
      await searchStore.retrieve()
      loadingState.value = false
    }

    async function setNotificationToggle(newValue: boolean) {
      await Storage.set({
        key: 'notificationToggle',
        value: String(newValue),
      });
    }

    return {
      app: App,
      leftDrawerOpen,
      layoutStore,
      searchStore,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      heroOutline24Bars3,
      heroOutline24MagnifyingGlass,
      heroOutline24ChevronLeft,
      heroOutline24GlobeEuropeAfrica,
      heroOutline24ArrowRightOnRectangle,
      loadingState,
      triggerSearch,
      notificationToggle,
      heroOutline24Bell,
      setNotificationToggle
    }
  }
});
</script>

<style scoped lang="scss">
.quote {
  background-color: $primary;
  color: white;
}
</style>
