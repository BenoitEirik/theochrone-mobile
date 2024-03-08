<script lang="ts" setup>
import type { _backgroundColor } from '#tailwind-config/theme';
import { useFestStore } from '~/stores/fest'
import { type Fest } from '~/types/fest'

const navStore = useNavStore()
navStore.setLeftAction('menu')
navStore.setTitle('Theochrone')
useBackButton().setExit()

const date = ref(new Date())

const festStore = useFestStore()
const fests = ref([] as Fest[])

const swiper = ref()

// Wait swiper to be referenced, then request fests
watch(swiper, async () => await festsRequest(), { once: true })

async function festsRequest() {
  festStore.setHomeSlideIndex(0)
  swiper.value.slideTo(0, 0)
  const { error, fests: _fests } = await festStore.getFest('home', { date: date.value })
  fests.value = _fests
}

// Request fests when a date is selected from the calendar picker
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

const { setFestPageCache } = usePageCacheStore()
const router = useRouter()

function openFestPage() {
  setFestPageCache(fests.value)
  router.push('/fest')
}
</script>

<template>
  <NuxtLayout name="main" class="flex flex-col items-stretch overflow-hidden">
    <VDatePicker v-model="date" is-required expanded borderless class="shrink-0" :attributes="calAttrs" />

    <Swiper id="index-swiper" @swiper="(_swiper: any) => swiper = _swiper"
      @slideChange="(s: any) => festStore.setHomeSlideIndex(s.snapIndex)"
      :modules="[SwiperZoom, SwiperEffectCoverflow, SwiperPagination]" slides-per-view="auto" effect="coverflow"
      :pagination="true" :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    }" :grab-cursor="true" :centered-slides="true" class="w-full grow"
      bulletActiveClass="index-page-swiper-pagination-bullet-active">
      <SwiperSlide v-if="fests.length > 0 && !festStore.isLoading" v-for="fest in fests" :key="fest.id"
        class="p-2 pb-10 flex items-center w-[70%] max-w-[70%] h-full max-h-full">
        <div class="flex items-center justify-center w-full max-w-full h-full max-h-[300px]">
          <img :src="fest.img" alt="Fest picture" class="max-w-full max-h-full rounded" @click="() => openFestPage()" />
        </div>
      </SwiperSlide>
      <!-- Slide on loading -->
      <SwiperSlide v-else class="p-2 pb-10 flex items-center w-[70%] max-w-[70%] h-full max-h-full">
        <div class="flex items-center justify-center w-full max-w-full h-full max-h-[300px]">
          <x-skeleton class="w-full h-full max-w-full max-h-full" />
        </div>
      </SwiperSlide>
    </Swiper>

    <div class="p-4 shrink-0">
      <button type="button" v-wave
        class="p-2 w-full h-[65px] max-h-[65px] flex justify-between items-center rounded-full overflow-hidden border border-gray cursor-pointer shadow-sm"
        @click="() => { (fests.length > 0 && !festStore.isLoading) ? openFestPage() : () => { } }">
        <span class="hidden">Fest informations</span>
        <x-skeleton v-if="fests.length < 1 || festStore.isLoading"
          class="h-full !rounded-full shrink-0 aspect-square " />
        <img v-else :src="getColorFestPicture(fests[festStore.homeSlideIndex].color)" alt="Fest color"
          class="h-full rounded-l-full shrink-0 aspect-square">

        <span class="flex flex-col items-center justify-center h-full grow">
          <span v-if="fests.length < 1 || festStore.isLoading" class="flex flex-col w-full p-2 justify-evenly">
            <x-skeleton class="" />
            <x-skeleton class="mt-1 " />
          </span>
          <span v-else class="px-2 line-clamp-2">
            {{ fests[festStore.homeSlideIndex]?.title }}
          </span>
        </span>

        <span class="flex items-center justify-center h-full rounded-r-full shrink-0 aspect-square">
          <IconCSS name="lucide:chevron-right" size="2rem" :style="{ backgroundColor: 'grey' }" />
        </span>
      </button>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
#index-swiper {
  .swiper-pagination-bullet-active {
    background-color: theme('colors.primary.500');
  }
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

.vc-container {
  --vc-focus-ring: transparent !important;
  --vc-day-content-hover-bg: transparent !important;
}

.vc-title span {
  text-transform: capitalize;
}
</style>
