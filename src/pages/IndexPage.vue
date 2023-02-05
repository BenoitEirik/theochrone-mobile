<template>
<q-page class="full-width full-height column no-wrap justify-between items-stretch">
  <q-date v-model="store.date" minimal class="full-width no-shadow"
    @update:modelValue="(value) => { setFestsDay(value) }" />

  <swiper @swiper="onSwiper" :initial-slide="store.index" :zoom="true" :effect="'coverflow'" :grabCursor="true"
    :centeredSlides="true" :slidesPerView="'auto'" :modules="modules"
    :onSlideChange="(index) => store.index = index.snapIndex" :pagination="true" :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    }" class="col-grow full-width">
    <swiper-slide v-for="fest in store.fests" :key="fest.id"
      @click="$router.push({ path: '/fest', query: { title: store.fests[store.index].title } })">
      <div class="full-width full-height row justify-center items-center">
        <img :src="fest.img" v-if="fest.img !== ''" />

        <q-inner-loading :showing="fest.img === ''">
          <q-spinner-hourglass size="3em" color="primary" lab />
        </q-inner-loading>
      </div>
    </swiper-slide>
  </swiper>

  <div class="q-pa-md">
    <div v-ripple class="relative-position q-pa-sm full-width row jutify-between items-center no-wrap box-title"
      @click="$router.push({ path: '/fest', query: { title: store.fests[store.index].title } })">
      <div class="row justify-start items-center full-height col-2">
        <q-img :src="getOrnamentImg[store.fests[store.index].color as keyof typeof getOrnamentImg]" class="full-height"
          fit="contain" />
      </div>

      <div class="q-px-sm full-height col-8 column justify-center items-center no-wrap">
        <p class="q-ma-none title-clamp" v-if="store.fests[store.index].title !== ''">
          {{ store.fests[store.index].title }}
        </p>
        <q-inner-loading :showing="store.fests[store.index].title === ''">
          <q-spinner-dots size="2em" color="primary" />
        </q-inner-loading>
      </div>

      <div class="row justify-center items-center full-height col-2">
        <q-icon :name="heroOutline24ChevronRight" size="1.6em" />
      </div>
    </div>
  </div>
</q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Zoom, EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';
import { Http } from '../../src-capacitor/node_modules/@capacitor-community/http';
import getImgURL from '../assets/js/getImgURL'
import { useFestsStore } from 'src/stores/fests-store';
import { heroOutline24ChevronRight } from 'quasar-extras-svg-icons/hero-icons-v2'

export default defineComponent({
  name: 'IndexPage',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const getOrnamentImg = {
      Noir: '/images/ornements/black.png',
      Blanc: '/images/ornements/white.png',
      Or: '/images/ornements/gold.png',
      Vert: '/images/ornements/green.png',
      Rose: '/images/ornements/pink.png',
      Violet: '/images/ornements/purple.png',
      Rouge: '/images/ornements/red.png'
    }
    const date = ref<string>(formatDate(new Date()))
    const swiperRef = ref<typeof Swiper>();
    const store = useFestsStore()

    onMounted(async () => {
      if (swiperRef.value !== undefined) swiperRef.value.slideTo(store.index)
      if (store.fests.length === 1) setFestsDay(date.value)
    })

    // Methods
    async function setFestsDay(date: string) {
      // Reset position to first fest
      if (swiperRef.value !== undefined) swiperRef.value.slideTo(0);
      store.index = 0;

      const [year, month, day] = date.split('/')
      const response = await Http.get({ url: `https://theochrone.fr/kalendarium/date_seule?date_seule_day=${day}&date_seule_month=${month}&date_seule_year=${year}&pal=false&martyrology=false&proper=roman` })

      // Init virtual DOM from theochrone.fr
      const body = new DOMParser().parseFromString(response.data, 'text/html').body
      const festsElement = body.querySelector('#resultup .container .row div div .panel-group')

      // Get list of fests
      store.fests = []
      for (let i = 0; i < Number(festsElement?.childElementCount); i++) {
        const attributesElement = festsElement?.children[i].querySelector('.panel-collapse .panel-body .container .row .col-md-6 table tbody')?.children || new HTMLCollection()

        const newFest = {
          id: i,
          img: '',
          massTextURL: festsElement?.children[i].querySelector('.panel-collapse .panel-footer a')?.getAttribute('href') || '',
          title: (festsElement?.children[i].querySelector('.panel-heading .panel-title a')?.innerHTML || ''),
          proper: attributesElement[0].children[1].innerHTML || '',
          edition: attributesElement[1].children[1].innerHTML || '',
          celebration: attributesElement[2].children[1].innerHTML || '',
          class: attributesElement[3].children[1].innerHTML || '',
          color: attributesElement[4].children[1].innerHTML || '',
          temporal: attributesElement[5].children[1].innerHTML || '',
          sanctoral: attributesElement[6].children[1].innerHTML || '',
          liturgicalTime: attributesElement[7].children[1].innerHTML || '',
          transferedFest: attributesElement[8].children[1].innerHTML || ''
        }

        store.fests.push(newFest)
      }

      // Get imgURL
      await getImgURL(store.fests)
    }
    function formatDate(date: Date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('/');
    }
    function onSwiper(swiper: typeof Swiper) {
      swiperRef.value = swiper
    }


    return {
      date,
      modules: [Zoom, EffectCoverflow, Pagination],
      store,
      getOrnamentImg,
      setFestsDay,
      swiperRef,
      onSwiper,
      heroOutline24ChevronRight
    }
  }
});
</script>

<style scoped>
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 70%;
  height: 300px;
}

.swiper-slide div img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.box-title {
  height: 75px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px 5px -1px, rgba(0, 0, 0, 0.3) 0px 0px 3px -1px;
  border-radius: 8px;
}

.title-clamp {
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>

<style lang="scss">
.swiper-pagination-bullet-active {
  background-color: $primary;
}
</style>
