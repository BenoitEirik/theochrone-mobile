<template>
<q-layout view="lHh Lpr lFf">
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" v-if="$route.path === '/'" />
      <q-btn flat dense round icon="arrow_back" aria-label="Arrow Back" @click="$router.back()" v-else />


      <q-toolbar-title class="text-center" v-if="$route.path !== '/'">
        {{ $route.query.title }}
      </q-toolbar-title>
      <q-toolbar-title class="text-center" v-else>
        Theochrone
      </q-toolbar-title>

      <q-btn flat dense round icon="search" aria-label="Search" @click="toggleLeftDrawer" />
    </q-toolbar>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
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
          <q-icon name="public" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Site internet</q-item-label>
          <q-item-label caption>https://theochrone.fr</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable @click="async () => { await app.exitApp() }">
        <q-item-section avatar>
          <q-icon name="logout" />
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

const linksList = [
  {
    title: 'Site internet',
    caption: 'theochrone.fr',
    icon: 'public',
    link: 'https://theochrone.fr'
  }
];

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false)

    onMounted(async () => {
      await StatusBar.setStyle({ style: Style.Dark })
      await StatusBar.setBackgroundColor({ color: '#55acee' })
    })

    return {
      app: App,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
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
