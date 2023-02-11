<template>
<q-page class="column">
  <q-virtual-scroll :items="searchStore.fests" separator v-slot="{ item, index }">
    <q-item :key="index" clickable v-ripple @click="openFestPage(index)">

      <q-item-section avatar>
        <q-avatar>
          <q-img :src="getOrnamentImg[item.color as keyof typeof getOrnamentImg]" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ String(item.title).split('-').slice(0, -1).join('-') }}</q-item-label>
        <q-item-label caption lines="2">
          {{
            [
              item.liturgicalTime,
              String(item.celebration).slice(0, -2),
              'Classe ' + item.class,
              item.color,
              'Propre' + item.proper,
              item.edition
            ].join(', ') + '.'
          }}
        </q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption>{{ formatNumDate(String(item.title).split('-').slice(-1).join('')) }}</q-item-label>
      </q-item-section>

    </q-item>
  </q-virtual-scroll>
</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLayoutStore } from 'src/stores/layout-store';
import { useSearchStore } from 'src/stores/search-store';
import { getOrnamentImg } from '../assets/js/getOrnamentImg'
import { useRouter } from 'vue-router';
import { allFestsStores } from 'src/stores/fests-store';

export default defineComponent({
  name: 'SearchPage',
  setup() {
    const store = allFestsStores.useSecondaryFestsStore()
    const layoutStore = useLayoutStore()
    const searchStore = useSearchStore()
    const router = useRouter()

    layoutStore.title = 'Recherche'


    function formatNumDate(strDate: string): string {
      let splittedDate = strDate.split(' ')
      let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      const month = splittedDate[2]
      const nbrMonth = month.charAt(0).toUpperCase() + month.slice(1);

      return [splittedDate[1], String(months.indexOf(nbrMonth) + 1), splittedDate[3]].join('/')
    }

    function openFestPage(index: number) {
      store.index = index
      store.fests = searchStore.fests
      router.push({ path: '/fest', query: { title: searchStore.fests[index].title, festsStoreName: 'useSecondaryFestsStore' } })
    }

    return {
      searchStore,
      getOrnamentImg,
      formatNumDate,
      openFestPage
    }
  }
})
</script>
