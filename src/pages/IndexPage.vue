<template>
<q-page class="full-width full-height column no-wrap justify-between items-stretch">
  <q-date v-model="date" minimal class="full-width no-shadow" />

  <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :modules="modules"
    :pagination="true" :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 400,
      modifier: 1,
      slideShadows: false,
    }" class="col-grow">
    <swiper-slide>
      <img src="~assets/images/image_not_found.png" />
    </swiper-slide>
    <swiper-slide>
      <img src="https://www.saint-louis-des-francais.org/images/articles/saint-martin-de-tours.jpg" />
    </swiper-slide><swiper-slide>
      <img src="https://www.introibo.fr/IMG/jpg/1111mennas.jpg" />
    </swiper-slide>
  </swiper>

  <pre>{{ data }}</pre>

  <div class="q-pa-md">
    <div class="q-pa-sm full-width row jutify-between items-center no-wrap box-title">
      <div class="row justify-start items-center full-height" style="width: 60px">
        <q-img src="~assets/images/ornements/gold.png" class="full-height" fit="contain" />
      </div>

      <div class="full-height col-grow column justify-center items-center no-wrap">
        <p class="q-ma-none text-h6">Sancty Policarpi</p>
        <p class="q-ma-none">Test 2</p>
      </div>

      <div class="row justify-center items-center full-height" style="width: 60px">
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

import { Http } from '@capacitor-community/http';

export default defineComponent({
  name: 'IndexPage',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    var data = ref()
    const fests: Array<object> = []

    onMounted(async () => {
      const options = {
        url: 'https://theochrone.fr'
      };

      const response = await Http.get(options)
      data.value = response.data

      // Init virtual DOM from theochrone.fr
      const parser = new DOMParser();
      const HTMLDocument = parser.parseFromString(data.value, 'text/html')
      const festsElement = HTMLDocument.body.querySelector('#resultup .container .row div div .panel-group')

      // Get list fest
      for (let i = 0; i < Number(festsElement?.childElementCount); i++) {
        const attributesQueryPath = '.panel-collapse .panel-body .container .row .col-md-6 table tbody'

        fests.push({
          title: festsElement?.children[i].querySelector('.panel-heading .panel-title a')?.innerHTML || '',
          proper: festsElement?.children[i].querySelector(attributesQueryPath)?.children[0].children[1].innerHTML || '',
          edition: festsElement?.children[i].querySelector(attributesQueryPath)?.children[1].children[1].innerHTML || '',
          celebration: festsElement?.children[i].querySelector(attributesQueryPath)?.children[2].children[1].innerHTML || '',
          class: festsElement?.children[i].querySelector(attributesQueryPath)?.children[3].children[1].innerHTML || '',
          color: festsElement?.children[i].querySelector(attributesQueryPath)?.children[4].children[1].innerHTML || '',
          temporal: festsElement?.children[i].querySelector(attributesQueryPath)?.children[5].children[1].innerHTML || '',
          sanctoral: festsElement?.children[i].querySelector(attributesQueryPath)?.children[6].children[1].innerHTML || '',
          liturgicalTime: festsElement?.children[i].querySelector(attributesQueryPath)?.children[7].children[1].innerHTML || '',
          transferedFest: festsElement?.children[i].querySelector(attributesQueryPath)?.children[8].children[1].innerHTML || ''
        })
      }

      data.value = fests
    })


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
      data,
      date: ref(formatDate(new Date())),
      modules: [EffectCoverflow, Pagination],
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
</style>

<style>
.swiper-pagination-bullet-active {
  background-color: #55acee;
}
</style>
