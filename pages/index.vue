<script lang="ts" setup>
import type { _backgroundColor } from '#tailwind-config/theme';
import { Keyboard } from '@capacitor/keyboard'
import { useFestStore } from '~/stores/fest'
import { type Fest } from '~/types/fest'

// Called on initial mount & every time it is re-inserted from the cache
const navStore = useNavStore()
onActivated(() => {
  navStore.setLeftAction('menu')
  navStore.setTitle('Theochrone')
  useBackButton().setExit()

  if (tab.value === 'search-tab' && !!searchContainer && !!searchContainer.value) {
    searchContainer.value.scrollTo({ top: scrollSearchPosition.value })
  }
})

const date = ref(new Date())

const festStore = useFestStore()
const index = ref(0)
const fests = ref([] as Fest[])

const swiper = ref()

// Wait swiper to be referenced, then request fests
watch(swiper, async () => await festsRequest(), { once: true })

async function festsRequest() {
  festStore.setSlideIndex(0)
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

const router = useRouter()

function openFestPage(_fests: Fest[], _index: number) {
  // Save scroll position on search tab
  if (tab.value === 'search-tab' && !!searchContainer && !!searchContainer.value) {
    scrollSearchPosition.value = searchContainer.value.scrollTop
  }

  festStore.setSlideIndex(_index)
  festStore.setSlideFests(_fests)
  router.push('/fest')
}

const tab = ref('calendar-tab')

const searchStore = useSearchStore()
const searchKeywords = ref<string>(searchStore.keywords)
const searchYear = ref<number>(searchStore.year)
const searchProper = ref<string>(useSettings().proper.value)
const searchFests = ref(searchStore.fests)
const searchInMartyrologe = ref(false)
const searchMartyrologeFests = ref(searchStore.martyrologeFests)
const searchFocus = ref(true)
const displaySearchHistory = ref(true)

function onSearchFocus() {
  searchFocus.value = true
  displaySearchHistory.value = true
}

function onSearchFocusOut() {
  searchFocus.value = false
}

async function getSearchFests() {
  Keyboard.hide()
  searchFocus.value = false

  if (!searchKeywords.value) {
    return
  }

  displaySearchHistory.value = false

  if (!searchInMartyrologe.value) {
    const { error, fests: _fests } = await searchStore.getSearchFests(searchKeywords.value, searchYear.value, searchProper.value)
    searchFests.value = _fests
  } else {
    const { error, martyrologeFests: _mf } = await searchStore.getSearchMartyrologeFests(searchKeywords.value, searchYear.value)
    searchMartyrologeFests.value = _mf
    console.log('searchMartyrologeFests:', searchMartyrologeFests.value)
  }

}

const martyrologeStore = useMartyrologeStore()

function openMartyrologeFest(index: number) {
  martyrologeStore.setMartyrologeFest(searchMartyrologeFests.value[index])
  router.push('/martyrologe')
}

const searchContainer = ref<HTMLElement | null>(null)
const scrollSearchPosition = ref(0)
</script>

<template>
  <NuxtLayout name="main" class="overflow-hidden">
    <x-tab-group id="index-page-tabs" v-model="tab" variant="block" align="center"
      class="flex h-full max-h-full flex-col items-stretch overflow-hidden">
      <x-tab value="calendar-tab" label="Calendrier" icon="lets-icons:calendar-light" class="grow">
        <section class="flex h-full max-h-full flex-col items-stretch overflow-hidden">
          <VDatePicker v-model="date" is-required expanded borderless class="shrink-0" :attributes="calAttrs" />

          <div class="grow overflow-y-auto">
            <Swiper id="index-swiper" @swiper="(_swiper: any) => swiper = _swiper"
            @slideChange="(s: any) => index = s.snapIndex"
            :modules="[SwiperZoom, SwiperEffectCoverflow, SwiperPagination]" slides-per-view="auto" effect="coverflow"
            :pagination="true" :coverflowEffect="{
      rotate: 50,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    }" :grab-cursor="true" :centered-slides="true" class="h-full w-full"
            bulletActiveClass="index-page-swiper-pagination-bullet-active">
            <SwiperSlide v-if="fests.length > 0 && !festStore.isLoading" v-for="fest in fests" :key="fest.id"
              class="!flex h-full max-h-full w-[70%] max-w-[70%] items-center p-2 pb-10">
              <div class="flex h-full max-h-[300px] w-full max-w-full items-center justify-center">
                <img :src="fest.img" alt="Fest picture" class="max-h-full max-w-full rounded"
                  @click="() => openFestPage(fests, index)" />
              </div>
            </SwiperSlide>
            <!-- Slide on loading -->
            <SwiperSlide v-else class="flex h-full max-h-full w-[70%] max-w-[70%] items-center p-2 pb-10">
              <div class="flex h-full max-h-[300px] w-full max-w-full items-center justify-center">
                <x-skeleton class="h-full max-h-full w-full max-w-full" />
              </div>
            </SwiperSlide>
            </Swiper>
          </div>

          <div class="shrink-0 p-4">
            <button type="button" v-wave
              class="border-secondary flex h-[65px] max-h-[65px] w-full cursor-pointer items-center justify-between overflow-hidden rounded-full border p-2 shadow-sm"
              @click="() => { (fests.length > 0 && !festStore.isLoading) ? openFestPage(fests, index) : () => { } }">
              <span class="hidden">Fest informations</span>
              <x-skeleton v-if="fests.length < 1 || festStore.isLoading"
                class="aspect-square h-full shrink-0 !rounded-full" />
              <img v-else :src="getColorFestPicture(fests[index].color)" alt="Fest color"
                class="aspect-square h-full shrink-0 rounded-l-full" />

              <span class="flex h-full grow flex-col items-center justify-center">
                <span v-if="fests.length < 1 || festStore.isLoading" class="flex w-full flex-col justify-evenly p-2">
                  <x-skeleton />
                  <x-skeleton class="mt-1" />
                </span>
                <span v-else class="line-clamp-2 px-2 font-medium text-secondary-800">
                  {{ fests[index]?.title }}
                </span>
              </span>

              <span class="flex aspect-square h-full shrink-0 items-center justify-center rounded-r-full">
                <IconCSS name="lucide:chevron-right" size="2rem" :style="{ backgroundColor: '#d1d5db' }" />
              </span>
            </button>
          </div>
        </section>
      </x-tab>


      <x-tab value="search-tab" label="Recherche" icon="lets-icons:search-light" class="grow">
        <section class="flex h-full max-h-full flex-col items-stretch gap-4 overflow-hidden px-4 py-2">
          <header class="flex shrink-0 flex-col gap-2">
            <x-input v-model="searchKeywords" placeholder="Mots-clés..." label="Recherche"
              icon-right="lets-icons:search-light" @keyup.enter="async () => await getSearchFests()"
              @focus="onSearchFocus()" @focusout="onSearchFocusOut()" />
            <div class="flex justify-stretch gap-2">
              <x-select v-model="searchYear" label="Année" :options="searchStore.yearOptions"
                @change="() => !!searchKeywords ? getSearchFests() : null" class="flex-1" />
              <x-select v-model="searchProper" label="Propre" :options="searchStore.properOptions"
                @change="() => !!searchKeywords ? getSearchFests() : null" class="flex-1"
                :disabled="searchInMartyrologe" />
            </div>
            <x-checkbox v-model="searchInMartyrologe" @change="(v: boolean) => { v ? searchProper = 'roman' : null; getSearchFests() }"
              label="Dans le Martyrologe Romain" color="primary" />
          </header>

          <!-- Search results -->
          <div class="flex max-h-full grow flex-col gap-2 overflow-hidden">
            <!-- Fests found -->
            <ul ref="searchContainer"
              v-if="!displaySearchHistory && !searchInMartyrologe && searchFests.length > 0 && !searchStore.isLoading"
              class="max-h-full divide-y divide-white overflow-y-scroll rounded-3xl bg-secondary-50 shadow-inner">
              <li class="flex justify-center p-2 text-xs text-secondary-400">
                <div>{{ searchFests.length }} résultat{{ searchFests.length > 1 ? 's' : '' }}</div>
              </li>
              <li v-for="(fest, index) in searchFests">
                <button type="button" class="flex w-full items-stretch justify-stretch"
                  @click="() => openFestPage([searchFests[index]], 0)" v-wave>
                  <span class="aspect-square shrink-0 p-3">
                    <img :src="getColorFestPicture(fest.color)" alt="Fest color"
                      class="aspect-square h-11 rounded-full" />
                  </span>
                  <span
                    class="flex grow flex-col items-stretch justify-stretch divide-y divide-transparent overflow-x-hidden py-2 text-left">
                    <span class="line-clamp-1 font-medium text-secondary-800">
                      {{ fest.title.split('-').slice(0, -1).join('-') }}
                    </span>
                    <span class="text-xs text-secondary-400">
                      {{ searchStore.formatSearchDate(fest.title.split('-').slice(-1).join('')) }}
                    </span>
                    <span v-if="fest.pal" class="items-centers flex self-start rounded bg-secondary-400 px-1">
                      <div class="text-center text-xs font-medium text-secondary-50 shadow">
                        Messe propre à certains lieux
                      </div>
                    </span>
                    <span class="text-xs text-secondary-500"
                      :class="{ 'line-clamp-2': !fest.pal, '!line-clamp-1': fest.pal }">
                      {{
      [fest.liturgicalTime, fest.celebration.slice(0, -2), `Classe ${fest.class}`, `Propre
                      ${fest.proper}`, fest.edition].join(', ') + '.'
    }}
                    </span>
                  </span>
                  <span class="flex shrink-0 items-center p-2">
                    <IconCSS name="lets-icons:expand-right" :style="{ backgroundColor: '#d1d5db' }" />
                  </span>
                </button>
              </li>
            </ul>
            <!-- Martyrologe fests found -->
            <ul ref="searchContainer"
              v-if="!displaySearchHistory && searchInMartyrologe && searchMartyrologeFests.length > 0 && !searchStore.isLoading"
              class="max-h-full divide-y divide-white overflow-y-scroll rounded-3xl bg-secondary-50 shadow-inner">
              <li class="flex justify-center p-2 text-xs text-secondary-400">
                <div>{{ searchMartyrologeFests.length }} résultat{{ searchMartyrologeFests.length > 1 ? 's' : '' }}
                </div>
              </li>
              <li v-for="(mFest, index) in searchMartyrologeFests">
                <button type="button" class="flex w-full flex-col items-stretch gap-2 px-4 py-2" @click="() => openMartyrologeFest(index)" v-wave>
                  <span class="line-clamp-1 text-left font-medium text-secondary-800">{{ mFest.hrDate }}</span>
                  <span class="text-justify text-sm text-secondary-500">{{ mFest.mark }}</span>
                </button>
              </li>
            </ul>
            <!-- No results -->
            <div
              v-if="!displaySearchHistory && !!searchKeywords && !searchFocus && ((!searchInMartyrologe && searchFests.length < 1) || ((searchInMartyrologe && searchMartyrologeFests.length < 1))) && !searchStore.isLoading"
              class="flex h-full max-h-full flex-col items-center justify-center overflow-y-scroll rounded-3xl bg-secondary-50 p-4 shadow-inner">
              <IconCSS name="lets-icons:arhive-alt-big-duotone-line" />
              <span>Aucun résultat</span>
            </div>
            <!-- Loading skeleton -->
            <ul v-if="searchStore.isLoading"
              class="max-h-full divide-y divide-white overflow-y-scroll rounded-3xl bg-secondary-50 pt-8 shadow-inner">
              <template v-if="!searchInMartyrologe">
                <li v-for="i in 8">
                  <button type="button" class="flex w-full items-stretch justify-stretch" v-wave>
                    <span class="aspect-square shrink-0 p-3">
                      <x-skeleton class="aspect-square h-11 !rounded-full" />
                    </span>
                    <span class="flex grow flex-col items-stretch justify-stretch py-2 pr-2 text-left">
                      <span class="line-clamp-2">
                        <x-skeleton />
                      </span>
                      <span class="text-xs text-secondary-400">
                        <x-skeleton class="mt-1 w-16" />
                      </span>
                      <span class="line-clamp-2 text-xs text-secondary-500">
                        <x-skeleton class="mt-1 h-6" />
                      </span>
                    </span>
                    <span class="flex shrink-0 items-center p-2">
                      <IconCSS name="lets-icons:expand-right" :style="{ backgroundColor: '#d1d5db' }" />
                    </span>
                  </button>
                </li>
              </template>
              <template v-else-if="searchInMartyrologe">
                <li v-for="i in 8">
                  <button type="button" class="flex w-full flex-col items-stretch gap-2 px-4 py-2" v-wave>
                    <span class="text-xs text-secondary-400">
                      <x-skeleton class="w-16 max-w-full" />
                    </span>
                    <span class="flex flex-col gap-2 text-xs text-secondary-400">
                      <x-skeleton v-for="i in 3"/>
                    </span>
                  </button>
                </li>
              </template>
            </ul>
            <!-- Display history entries -->
            <ul v-if="displaySearchHistory && !searchStore.isLoading"
              class="max-h-full divide-y divide-white overflow-y-scroll rounded-3xl bg-secondary-50 shadow-inner">
              <li v-if="searchStore.history.length > 0" v-for="entry in searchStore.history">
                <button type="button" class="flex w-full items-stretch justify-stretch"
                  @click="async () => { searchKeywords = entry; await getSearchFests() }" v-wave>
                  <span class="aspect-square shrink-0 p-4">
                    <IconCSS name="iconamoon:history-thin" />
                  </span>
                  <span class="flex grow flex-col items-stretch justify-center py-2 pr-2 text-left">
                    <span class="line-clamp-1">{{ entry }}</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </section>
      </x-tab>
    </x-tab-group>
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

// Indielayer tab customisation
#index-page-tabs {
  .x-tab-group {
    flex-shrink: 0;
    overflow: hidden;

    --x-tab-group-text: theme('colors.primary.500') !important;
    --x-tab-group-dark-text: theme('colors.primary.500') !important;
  }

  .x-tab-group+div {
    flex-grow: 1;
    height: 100%;
    max-height: 100%;
    overflow: hidden;

    div[role="tabpanel"] {
      height: 100%;
      max-height: 100%;
      overflow: hidden;
    }
  }
}
</style>
