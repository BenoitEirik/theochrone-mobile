<script lang="ts" setup>
const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'primary',
      fillMode: 'outline',
    },
    dates: new Date(),
  }
])
</script>

<template>
  <NuxtLayout name="main" class="flex flex-col items-stretch overflow-hidden">
    <VCalendar expanded class="shrink-0" :attributes="{
      key: 'today',
      highlight: {
        color: 'primary',
        fillMode: 'outline',
      },
      dates: new Date(),
    }" style="width: 100%;border: none;" />

    <Swiper :modules="[SwiperZoom, SwiperEffectCoverflow, SwiperPagination]" slides-per-view="auto" effect="coverflow"
      :pagination="true" :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    }" :grab-cursor="true" :centered-slides="true" class="grow w-full">
      <SwiperSlide v-for="slide in 3" :key="slide">
        <div
          style="background: url('http://introibo.fr/IMG/jpg/0227gabriel.jpg') no-repeat center;background-size: contain;" />
      </SwiperSlide>
    </Swiper>

    <div class="shrink-0 p-4">
      <button type="button" v-wave
        class="p-2 block w-full h-[75px] max-h-[75px] flex justify-between items-center rounded-full overflow-hidden border border-gray cursor-pointer">
        <span class="hidden">Fest informations</span>
        <img src="/images/ornements/black.png" alt="Fest color" class="shrink-0 h-full aspect-square rounded-l-full">

        <div class="grow h-full flex flex-col justify-center items-center">
          <p class="line-clamp-2">
            fete de fete
          </p>
        </div>

        <div class="shrink-0 flex justify-center items-center h-full aspect-square rounded-r-full">
          <Icon name="lucide:chevron-right" size="2rem" color="grey" />
        </div>
      </button>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
.swiper-slide {
  display: flex;
  align-items: center;
  width: 70%;
  height: 100%;
  @apply p-2 pb-10;

  div {
    width: 100%;
    height: 100%;
    max-height: 300px;
  }
}

.swiper-pagination-bullet-active {
  background-color: theme('colors.primary');
}

// Primary color for VCalendar
.vc-primary {
  --vc-accent-50: rgb(243, 248, 253);
  --vc-accent-100: rgb(231, 241, 252);
  --vc-accent-200: rgb(205, 225, 248);
  --vc-accent-300: rgb(174, 209, 245);
  --vc-accent-400: rgb(114, 182, 240);
  --vc-accent-500: #55acee;
  --vc-accent-600: rgb(81, 163, 226);
  --vc-accent-700: rgb(74, 149, 206);
  --vc-accent-800: rgb(55, 111, 154);
  --vc-accent-900: rgb(47, 94, 130);
}

.vc-title span {
  text-transform: capitalize;
}
</style>