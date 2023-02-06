<template>
<q-layout view="lHh Lpr lFf">
  <q-header>
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

        <q-btn flat dense round :icon="heroOutline24MagnifyingGlass" aria-label="Search" @click="toggleLeftDrawer" />
      </q-toolbar>

      <q-toolbar v-if="layoutStore.subtitle !== ''" style="border-top: 1px solid lightgrey;">
        <div class="text-center q-mx-auto">
          {{ layoutStore.subtitle }}
        </div>
      </q-toolbar>
    </div>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" show-if-above>
    <div class="relative-position">
      <q-img src="~assets/images/drawer/banner.jpg" class="full-width" fit="contain" />
      <q-img src="~assets/images/logo.png" width="50%" class="absolute-center logo-dropshadow" />
    </div>

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

      <q-item clickable @click="async () => { await app.exitApp() }">
        <q-item-section avatar>
          <q-icon :name="heroOutline24ArrowRightOnRectangle" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Quitter</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { StatusBar, Style } from '@capacitor/status-bar'
import { App } from '@capacitor/app';
import { useLayoutStore } from 'src/stores/layout-store';
import { heroOutline24Bars3, heroOutline24MagnifyingGlass, heroOutline24ChevronLeft, heroOutline24GlobeEuropeAfrica, heroOutline24ArrowRightOnRectangle } from 'quasar-extras-svg-icons/hero-icons-v2'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false)
    const layoutStore = useLayoutStore()

    onMounted(async () => {
      await StatusBar.setStyle({ style: Style.Dark })
      await StatusBar.setBackgroundColor({ color: '#55acee' })
    })

    return {
      app: App,
      leftDrawerOpen,
      layoutStore,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      heroOutline24Bars3,
      heroOutline24MagnifyingGlass,
      heroOutline24ChevronLeft,
      heroOutline24GlobeEuropeAfrica,
      heroOutline24ArrowRightOnRectangle,
    }
  }
});
</script>

<style scoped lang="scss">
.logo-dropshadow {
  filter: drop-shadow(0px 0px 4px #fff);
}

.quote {
  background-color: $primary;
  color: white;
}
</style>
