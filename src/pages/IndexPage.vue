<template>
<q-page class="full-width full-height column no-wrap justify-between items-stretch">
  <q-date v-model="date" minimal class="full-width no-shadow" />

  <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :modules="modules"
    :onSlideChange="(index) => {
      swiperIndex = index.snapIndex
    }" :pagination="true" :coverflowEffect="{
  rotate: 50,
  stretch: 0,
  depth: 400,
  modifier: 1,
  slideShadows: false,
}" class="col-grow">
    <swiper-slide v-for="fest in fests" :key="fest.id">
      <img :src="fest.img" />
    </swiper-slide>
  </swiper>

  <div class="q-pa-md">
    <div class="q-pa-sm full-width row jutify-between items-center no-wrap box-title">
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

export default defineComponent({
  name: 'IndexPage',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const swiperIndex = ref(0)
    const fests = ref([{
      id: 0,
      img: '/images/image_not_found.png',
      title: '',
      proper: '',
      edition: '',
      celebration: '',
      class: '',
      color: '',
      temporal: '',
      sanctoral: '',
      liturgicalTime: '',
      transferedFest: ''
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



    onMounted(async () => {
      const options = {
        url: 'https://theochrone.fr'
      };

      const response = await Http.get(options)

      // Init virtual DOM from theochrone.fr
      const parser = new DOMParser();
      const HTMLDocument = parser.parseFromString(response.data, 'text/html')
      const festsElement = HTMLDocument.body.querySelector('#resultup .container .row div div .panel-group')

      // Get list fest
      fests.value.pop()
      for (let i = 0; i < Number(festsElement?.childElementCount); i++) {
        const attributesElement = festsElement?.children[i].querySelector('.panel-collapse .panel-body .container .row .col-md-6 table tbody')?.children || new HTMLCollection()

        function getSrcImg() {
          const src = festsElement?.children[i].querySelector('.panel-collapse .panel-body .container .row .col-md-4 img')?.getAttribute('src')
          if (src == '/static/kalendarium/images/image_not_found.png') {
            return '/images/image_not_found.png'
          } else {
            return ''
          }
        }

        fests.value.push({
          id: i,
          img: getSrcImg(),
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
        })
      }
    })

    // Methods
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


    return {
      date: ref(formatDate(new Date())),
      modules: [EffectCoverflow, Pagination],
      fests,
      swiperIndex,
      getOrnamentImg
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

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
