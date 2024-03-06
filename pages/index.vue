<script lang="ts" setup>
import { useFestStore } from '~/stores/fest'
import { type Fest } from '~/types/fest'

useBackButton().setExit()

const navStore = useNavStore()
navStore.setLeftAction('menu')
navStore.setTitle('Theochrone')

const date = ref(new Date())

const festStore = useFestStore()
const fests = ref([] as Fest[])

onMounted(async () => {
  const { error, fests: _fests } = await festStore.getFest('home', { date: date.value })
  fests.value = _fests
  festStore.setHomeSlideIndex(0)
  // slideTo
})

watch(date, async () => {
  const { error, fests: _fests } = await festStore.getFest('home', { date: date.value })
  fests.value = _fests
  festStore.setHomeSlideIndex(0)
  // slideTo
})
</script>

<template>
  <NuxtLayout name="main" class="flex flex-col items-stretch overflow-hidden">
    <pre>{{ festStore.isLoading }}</pre>
    <pre>{{ date.getFullYear() }}-{{ date.getMonth() + 1 }}-{{ date.getDay() }}</pre>
    <pre>{{ festStore.homeSlideIndex }}</pre>

    <VDatePicker v-model="date" expanded borderless class="shrink-0" />

    <Swiper :modules="[SwiperZoom, SwiperEffectCoverflow, SwiperPagination]" slides-per-view="auto" effect="coverflow"
      :pagination="true" :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    }" :grab-cursor="true" :centered-slides="true" class="w-full grow">
      <SwiperSlide v-for="fest in fests" :key="fest.id">
        <div :style="{ background: `url(${fest.img}) no-repeat center`, backgroundSize: 'contain' }" />
      </SwiperSlide>
    </Swiper>

    <div class="p-4 shrink-0">
      <button type="button" v-wave
        class="p-2 w-full h-[65px] max-h-[65px] flex justify-between items-center rounded-full overflow-hidden border border-gray cursor-pointer">
        <span class="hidden">Fest informations</span>
        <img src="/images/ornements/black.png" alt="Fest color" class="h-full rounded-l-full shrink-0 aspect-square">

        <span class="flex flex-col items-center justify-center h-full grow">
          <span class="line-clamp-2">
            fete de fete fete de fete fete de fete fete de fete
          </span>
        </span>

        <span class="flex items-center justify-center h-full rounded-r-full shrink-0 aspect-square">
          <Icon name="lucide:chevron-right" size="2rem" color="grey" />
        </span>
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
  background-color: theme('colors.primary.500');
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
