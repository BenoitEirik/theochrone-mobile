<template>
<q-page class="q-pa-md full-width column no-wrap items-stretch">
  <div>
    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div ref="bodyRef" v-html="bodyFest" />
    </transition>
  </div>

  <q-inner-loading :showing="loading">
    <q-spinner-hourglass size="3em" color="primary" lab />
  </q-inner-loading>
</q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick, watch } from 'vue';
import { registerPlugin } from '@capacitor/core';
import { allFestsStores } from 'src/stores/fests-store';
import { openURL } from 'quasar'
import { useRoute } from 'vue-router';

const Bridge = registerPlugin('Bridge');

export default defineComponent({
  name: 'TextesPage',
  setup() {
    const route = useRoute()
    const bodyFest = ref<string>('')
    const loading = ref(true)
    const store = allFestsStores[route.query.festsStoreName as keyof typeof allFestsStores]()
    const bodyRef = ref(null)

    onMounted(async () => {
      const response = await Bridge.getFestTextes({ url: store.fests[store.index].massTextURL });
      bodyFest.value = response.data
      loading.value = false
    })

    watch(loading, () => {
      nextTick(() => {
        if (bodyRef.value !== null) {
          const htmlElement = bodyRef.value as HTMLDivElement
          const links = htmlElement.querySelectorAll('a');
          links.forEach((link) => {
            if (link.hasAttribute('href'))
              link.addEventListener('click', (event) => {
                event.preventDefault();
                openLink(link.href);
              });
          });
        }
      });
    });

    function openLink(url: string) {
      const newURL = new URL(url)
      newURL.protocol = 'https'
      newURL.hostname = 'introibo.fr'
      newURL.port = ''
      openURL(newURL.href)
    }

    return {
      bodyRef,
      bodyFest,
      loading,
      openLink
    }
  }
})
</script>

<style>
* {
  hyphens: auto;
}

p:first-child {
  display: none;
}

h3,
h3 * {
  padding: 0;
  margin: 10px;
  font-size: 20px;
  color: black;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
}

a {
  text-decoration: none;
}

table {
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 20px;
}
</style>
