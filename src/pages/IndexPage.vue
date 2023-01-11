<template>
<q-page>
  <q-date v-model="date" minimal class="full-width no-shadow" />
  <swiper effect="coverflow" :grabCursor="true" :centeredSlides="true" slidesPerView="auto" :modules="modules"
    :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 400,
      modifier: 1,
      slideShadows: false,
    }">
    <swiper-slide>
      <img src="~assets/images/image_not_found.png" />
    </swiper-slide>
    <swiper-slide>
      <img src="https://www.saint-louis-des-francais.org/images/articles/saint-martin-de-tours.jpg" />
    </swiper-slide><swiper-slide>
      <img src="https://www.introibo.fr/IMG/jpg/1111mennas.jpg" />
    </swiper-slide>
  </swiper>
</q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';

export default defineComponent({
  name: 'IndexPage',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
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
    }
  }
});
</script>

<style>
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
</style>
