<template>
<q-page class="column no-wrap items-stretch">
  <swiper :pagination="true" :initial-slide="store.index" :modules="modules"
    :onSlideChange="(index) => { store.index = index.snapIndex; setToolbar(); layoutStore.title = store.fests[store.index].title }"
    class="full-width">
    <swiper-slide v-for="fest in store.fests" :key="fest.id" class="q-mb-lg">
      <div class="q-pa-md">
        <div class="full-width row justify-center" style="height: 300px;">
          <img ref="imgRef" :src="fest.img" v-if="fest.img !== ''" class="img"
            @click="fullscreenMode = !fullscreenMode; layoutStore.hide = !layoutStore.hide"
            :class="{ 'fullscreen-img': fullscreenMode }" />

          <q-inner-loading :showing="fest.img === ''">
            <q-spinner-hourglass size="3em" color="primary" lab />
          </q-inner-loading>
        </div>

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
            <q-item-section class="text-bold"
              @click="$router.push({ path: '/textes', query: { title: fest.title, festsStoreName: $route.query.festsStoreName as keyof typeof allFestsStores } })">
              <div class="q-pa-md text-weight-bold text-center" :style="'color: ' + getPaletteColor('primary')">
                Textes de la messe et de l'office<br>(introibo.fr)
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
import { defineComponent, onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';
import { allFestsStores } from 'src/stores/fests-store';
import { useLayoutStore } from 'src/stores/layout-store';
import { colors } from 'quasar'
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'FestPage',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const route = useRoute()
    const store = allFestsStores[route.query.festsStoreName as keyof typeof allFestsStores]()
    const layoutStore = useLayoutStore()
    const { getPaletteColor } = colors
    const fullscreenMode = ref<boolean>(false)

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
      setToolbar,
      allFestsStores,
      fullscreenMode
    }
  }
});
</script>

<style>
.img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 4px;
  transition: all 0.4s ease-in-out;
}

.fullscreen-img {
  transition: all 0.4s ease-in-out;
  z-index: 10000 !important;
  background-color: rgba(0, 0, 0, 0.75) !important;
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  border-radius: 0 !important;
}
</style>
