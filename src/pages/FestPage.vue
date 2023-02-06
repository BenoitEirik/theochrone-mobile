<template>
<q-page class="column no-wrap items-stretch">
  <swiper :pagination="true" :initial-slide="store.index" :modules="modules"
    :onSlideChange="(index) => { store.index = index.snapIndex; setToolbar(); layoutStore.title = store.fests[store.index].title }"
    class="full-width">
    <swiper-slide v-for="fest in store.fests" :key="fest.id" class="q-mb-lg">
      <div class="q-pa-md">
        <q-img :src="fest.img || '~assets/images/image_not_found.png'" fit="contain" :style="`max-height: 300px;`">
          <template v-slot:loading>
            <q-spinner-hourglass size="50px" color="primary" lab />
          </template>
        </q-img>

        <q-list dense bordered separator style="background: #fafafa;" class="q-mt-md rounded-borders">
          <q-item clickable v-ripple>
            <q-item-section class="text-bold">Propre</q-item-section>
            <q-item-section>{{ fest.proper }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section class="text-bold">Édition</q-item-section>
            <q-item-section>{{ fest.edition }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section class="text-bold">Célébration</q-item-section>
            <q-item-section>{{ fest.celebration }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section class="text-bold">Classe</q-item-section>
            <q-item-section>{{ fest.class }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section class="text-bold">Couleur liturgique</q-item-section>
            <q-item-section>{{ fest.color }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section class="text-bold">Temporal</q-item-section>
            <q-item-section>{{ fest.temporal }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section class="text-bold">Sanctoral</q-item-section>
            <q-item-section>{{ fest.sanctoral }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section class="text-bold">Temps liturgique</q-item-section>
            <q-item-section>{{ fest.liturgicalTime }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section class="text-bold">Fête transférée</q-item-section>
            <q-item-section>{{ fest.transferedFest }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section class="text-bold" @click="$router.push({ path: '/textes', query: { title: fest.title } })">
              <div class="q-pa-md text-weight-bold text-center" :style="'color: ' + getPaletteColor('primary')">
                Textes de la messe et de l'office
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </swiper-slide>
  </swiper>
</q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';
import { useFestsStore } from 'src/stores/fests-store';
import { useLayoutStore } from 'src/stores/layout-store';
import { colors } from 'quasar'

export default defineComponent({
  name: 'FestPage',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = useFestsStore()
    const layoutStore = useLayoutStore()
    const { getPaletteColor } = colors

    onMounted(() => setToolbar())

    function setToolbar() {
      const [title, subtitle] = store.fests[store.index].title.split(',')
      layoutStore.title = title || 'Theochrone'
      layoutStore.subtitle = subtitle || ''
    }

    return {
      store,
      layoutStore,
      modules: [Pagination],
      getPaletteColor,
      setToolbar
    }
  }
});
</script>
