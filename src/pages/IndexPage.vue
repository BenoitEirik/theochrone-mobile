<template>
<q-page class="full-width full-height column no-wrap justify-between items-stretch">
  <q-date v-model="date" minimal class="full-width no-shadow" @update:modelValue="(value) => { setFestsDay(value) }" />

  <swiper swiper="onSwiper" :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'"
    :modules="modules" :onSlideChange="(index) => {
      swiperIndex = index.snapIndex
    }" :pagination="true" :coverflowEffect="{
  rotate: 50,
  stretch: 0,
  depth: 200,
  modifier: 1,
  slideShadows: false,
}" class="col-grow full-width">
    <swiper-slide v-for="fest in fests" :key="fest.id">
      <div>
        <img :src="fest.img" />
      </div>
    </swiper-slide>
  </swiper>

  <div class="q-pa-md">
    <div v-ripple class="relative-position q-pa-sm full-width row jutify-between items-center no-wrap box-title"
      @click="$router.push({ path: '/fest', query: { title: fests[swiperIndex].title, data: JSON.stringify(fests[swiperIndex]) } })">
      <div class="row justify-start items-center full-height col-2">
        <q-img :src="getOrnamentImg[fests[swiperIndex].color as keyof typeof getOrnamentImg]" class="full-height"
          fit="contain" />
      </div>

      <div class="q-px-sm full-height col-8 column justify-center items-center no-wrap">
        <p class="q-ma-none title-clamp">{{ fests[swiperIndex].title }}</p>
      </div>

      <div class="row justify-center items-center full-height col-2">
        <q-icon name="arrow_forward_ios" size="1.6em" />
      </div>
    </div>
  </div>
</q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';
import { Http } from '../../src-capacitor/node_modules/@capacitor-community/http';
import getImgURL from '../assets/js/getImgURL'
import { Fest } from '../assets/js/models'

export default defineComponent({
  name: 'IndexPage',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const swiperIndex = ref<number>(0)
    const fests = ref<Fest[]>([{
      id: 0,
      img: '/images/image_not_found.png',
      massTextURL: '',
      title: 'Chargement...',
      proper: 'Chargement...',
      edition: 'Chargement...',
      celebration: 'Chargement...',
      class: 'Chargement...',
      color: '/images/ornements/white.png',
      temporal: 'Chargement...',
      sanctoral: 'Chargement...',
      liturgicalTime: 'Chargement...',
      transferedFest: 'Chargement...'
    }])
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

    onMounted(async () => setFestsDay(date.value))

    // Methods
    async function setFestsDay(date: string) {
      if (swiperRef.value !== undefined) swiperRef.value.slideTo(0);

      swiperIndex.value = 1;
      const [year, month, day] = date.split('/')
      const response = await Http.get({ url: `https://theochrone.fr/kalendarium/date_seule?date_seule_day=${day}&date_seule_month=${month}&date_seule_year=${year}&pal=false&martyrology=false&proper=roman` })

      // Init virtual DOM from theochrone.fr
      const parser = new DOMParser();
      const HTMLDocument = parser.parseFromString(response.data, 'text/html')
      const festsElement = HTMLDocument.body.querySelector('#resultup .container .row div div .panel-group')

      // Get list fest
      fests.value = []
      for (let i = 0; i < Number(festsElement?.childElementCount); i++) {
        const attributesElement = festsElement?.children[i].querySelector('.panel-collapse .panel-body .container .row .col-md-6 table tbody')?.children || new HTMLCollection()

        const newFest = {
          id: i,
          img: '/images/image_not_found.png',
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

        fests.value.push(newFest)
      }

      // Get imgURL
      await getImgURL(fests.value)
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
      modules: [EffectCoverflow, Pagination],
      fests,
      swiperIndex,
      getOrnamentImg,
      setFestsDay,
      swiperRef,
      onSwiper
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

.swiper-slide div {
  position: relative;
  width: 100%;
  height: 100%;
}

.swiper-slide div img {
  position: relative;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
