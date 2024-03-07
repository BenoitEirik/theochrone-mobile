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

const swiper = ref()

watch(swiper, async () => {
  await festsRequest()
}, { once: true })

async function festsRequest() {
  festStore.setHomeSlideIndex(0)
  swiper.value.slideTo(0)
  const { error, fests: _fests } = await festStore.getFest('home', { date: date.value })
  fests.value = _fests
}

watch(date, async () => {
  await festsRequest()
})

const calAttrs = computed(() => {
  return [{
    key: 'today',
    highlight: {
      color: 'primary',
      fillMode: 'solid',
    },
    dates: new Date()
  }, {
    key: 'selected',
    highlight: {
      color: 'primary',
      fillMode: 'outline',
    },
    dates: date.value
  }]
})
</script>

<template>
  <NuxtLayout name="main" class="flex flex-col items-stretch overflow-hidden">
    <VDatePicker v-model="date" is-required expanded borderless class="shrink-0" :attributes="calAttrs" />

    <Swiper @swiper="(_swiper: any) => swiper = _swiper"
      :modules="[SwiperZoom, SwiperEffectCoverflow, SwiperPagination]" slides-per-view="auto" effect="coverflow"
      :pagination="true" :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    }" :grab-cursor="true" :centered-slides="true" class="w-full grow">
      <SwiperSlide v-for="fest in fests" :key="fest.id">
        <div class="flex items-center justify-center">
          <x-spinner v-if="fests.length < 1 || festStore.isLoading" size="lg" />
          <img v-else :src="fest.img" alt="Fest picture" class="max-h-full rounded">
        </div>
      </SwiperSlide>
    </Swiper>

    <div class="p-4 shrink-0">
      <button type="button" v-wave
        class="p-2 w-full h-[65px] max-h-[65px] flex justify-between items-center rounded-full overflow-hidden border border-gray cursor-pointer">
        <span class="hidden">Fest informations</span>
        <img src="/images/ornements/black.png" alt="Fest color" class="h-full rounded-l-full shrink-0 aspect-square">

        <span class="flex flex-col items-center justify-center h-full grow">
          <x-spinner v-if="fests.length < 1 || festStore.isLoading" size="lg" />
          <span v-else class="px-2 line-clamp-2">
            {{ fests[festStore.homeSlideIndex]?.title }}
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

.vc-container  {
  --vc-focus-ring: transparent !important;
  --vc-day-content-hover-bg: transparent !important;
}

.vc-title span {
  text-transform: capitalize;
}
</style>
