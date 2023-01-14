<template>
<q-layout view="lHh Lpr lFf">
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

      <q-toolbar-title class="text-center">
        Theochrone
      </q-toolbar-title>

      <q-btn flat dense round icon="search" aria-label="Search" @click="toggleLeftDrawer" />
    </q-toolbar>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    <q-list>
      <q-item-label header>
        Essential Links
      </q-item-label>

      <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
    </q-list>
  </q-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { StatusBar, Style } from '@capacitor/status-bar'

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

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    onMounted(async () => {
      await StatusBar.setStyle({ style: Style.Dark })
      await StatusBar.setBackgroundColor({ color: '#55acee' })
    })

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
