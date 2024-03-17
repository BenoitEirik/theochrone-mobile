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

  const { error, fests: _fests } = await searchStore.getSearchFests(searchKeywords.value, searchYear.value, searchProper.value)
  searchFests.value = _fests
}

const searchContainer = ref<HTMLElement | null>(null)
const scrollSearchPosition = ref(0)
</script>

<template>
  <NuxtLayout name="main" class="overflow-hidden">
    <x-tab-group id="index-page-tabs" v-model="tab" variant="block" align="center"
      class="flex flex-col items-stretch h-full max-h-full overflow-hidden">
      <x-tab value="calendar-tab" label="Calendrier" icon="lets-icons:calendar-light" class="grow">
        <section class="flex flex-col items-stretch h-full max-h-full overflow-hidden">
          <VDatePicker v-model="date" is-required expanded borderless class="shrink-0" :attributes="calAttrs" />

          <Swiper id="index-swiper" @swiper="(_swiper: any) => swiper = _swiper"
            @slideChange="(s: any) => index = s.snapIndex"
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
              class="p-2 pb-10 !flex items-center w-[70%] max-w-[70%] h-full max-h-full">
              <div class="flex items-center justify-center w-full max-w-full h-full max-h-[300px]">
                <img :src="fest.img" alt="Fest picture" class="max-w-full max-h-full rounded"
                  @click="() => openFestPage(fests, index)" />
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
              @click="() => { (fests.length > 0 && !festStore.isLoading) ? openFestPage(fests, index) : () => { } }">
              <span class="hidden">Fest informations</span>
              <x-skeleton v-if="fests.length < 1 || festStore.isLoading"
                class="h-full !rounded-full shrink-0 aspect-square " />
              <img v-else :src="getColorFestPicture(fests[index].color)" alt="Fest color"
                class="h-full rounded-l-full shrink-0 aspect-square" />

              <span class="flex flex-col items-center justify-center h-full grow">
                <span v-if="fests.length < 1 || festStore.isLoading" class="flex flex-col w-full p-2 justify-evenly">
                  <x-skeleton />
                  <x-skeleton class="mt-1" />
                </span>
                <span v-else class="px-2 font-medium line-clamp-2 text-secondary-800">
                  {{ fests[index]?.title }}
                </span>
              </span>

              <span class="flex items-center justify-center h-full rounded-r-full shrink-0 aspect-square">
                <IconCSS name="lucide:chevron-right" size="2rem" :style="{ backgroundColor: '#d1d5db' }" />
              </span>
            </button>
          </div>
        </section>
      </x-tab>


      <x-tab value="search-tab" label="Recherche" icon="lets-icons:search-light" class="grow">
        <section class="flex flex-col items-stretch h-full max-h-full gap-4 px-4 py-2 overflow-hidden">
          <header class="flex flex-col gap-2 shrink-0">
            <x-input v-model="searchKeywords" placeholder="Mots-clés..." label="Recherche"
              icon-right="lets-icons:search-light" @keyup.enter="async () => await getSearchFests()"
              @focus="onSearchFocus()" @focusout="onSearchFocusOut()" />
            <div class="flex gap-2 justify-stretch">
              <x-select v-model="searchYear" label="Année" :options="searchStore.yearOptions"
                @change="async () => !!searchKeywords ? await getSearchFests() : () => { }" class="flex-1" />
              <x-select v-model="searchProper" label="Propre" :options="searchStore.properOptions"
                @change="async () => !!searchKeywords ? await getSearchFests() : () => { }" class="flex-1" />
            </div>
          </header>

          <!-- Search results -->
          <div class="flex flex-col max-h-full gap-2 overflow-hidden grow">
            <ul ref="searchContainer" v-if="!displaySearchHistory && searchFests.length > 0 && !searchStore.isLoading"
              class="max-h-full overflow-y-scroll divide-y divide-white shadow-inner rounded-3xl bg-gray-50">
              <li class="flex justify-center p-2 text-xs text-secondary-400">
                <div>{{ searchFests.length }} résultat{{ searchFests.length > 1 ? 's' : '' }}</div>
              </li>
              <li v-for="(fest, index) in searchFests">
                <button type="button" class="flex items-stretch w-full justify-stretch"
                  @click="() => openFestPage([searchFests[index]], 0)" v-wave>
                  <span class="p-3 shrink-0 aspect-square">
                    <img :src="getColorFestPicture(fest.color)" alt="Fest color"
                      class="rounded-full h-11 aspect-square" />
                  </span>
                  <span
                    class="flex flex-col items-stretch py-2 overflow-x-hidden text-left divide-y divide-transparent justify-stretch grow">
                    <span class="font-medium text-secondary-800 line-clamp-1">
                      {{ fest.title.split('-').slice(0, -1).join('-') }}
                    </span>
                    <span class="text-xs text-gray-400">
                      {{ searchStore.formatSearchDate(fest.title.split('-').slice(-1).join('')) }}
                    </span>
                    <span v-if="fest.pal" class="flex self-start px-1 bg-gray-400 rounded items-centers">
                      <div class="text-xs font-medium text-center shadow text-gray-50">
                        Messe propre à certains lieux
                      </div>
                    </span>
                    <span class="text-xs text-gray-500"
                      :class="{ 'line-clamp-2': !fest.pal, '!line-clamp-1': fest.pal }">
                      {{
      [fest.liturgicalTime, fest.celebration.slice(0, -2), `Classe ${fest.class}`, `Propre
                      ${fest.proper}`, fest.edition].join(', ') + '.'
    }}
                    </span>
                  </span>
                  <span class="flex items-center p-2 shrink-0">
                    <IconCSS name="lets-icons:expand-right" :style="{ backgroundColor: '#d1d5db' }" />
                  </span>
                </button>
              </li>
            </ul>
            <!-- No results -->
            <div
              v-if="!displaySearchHistory && !!searchKeywords && !searchFocus && searchFests.length < 1 && !searchStore.isLoading"
              class="flex flex-col items-center justify-center h-full max-h-full p-4 overflow-y-scroll shadow-inner rounded-3xl bg-gray-50">
              <IconCSS name="lets-icons:arhive-alt-big-duotone-line" />
              <span>Aucun résultat</span>
            </div>
            <!-- Loading skeleton -->
            <ul v-if="searchStore.isLoading"
              class="max-h-full overflow-y-scroll divide-y divide-white shadow-inner rounded-3xl bg-gray-50">
              <li v-for="i in 8">
                <button type="button" class="flex items-stretch w-full justify-stretch" v-wave>
                  <span class="p-3 shrink-0 aspect-square">
                    <x-skeleton class="!rounded-full h-11 aspect-square" />
                  </span>
                  <span class="flex flex-col items-stretch py-2 pr-2 text-left justify-stretch grow">
                    <span class="line-clamp-2">
                      <x-skeleton />
                    </span>
                    <span class="text-xs text-gray-400">
                      <x-skeleton class="w-16 mt-1" />
                    </span>
                    <span class="text-xs text-gray-500 line-clamp-2">
                      <x-skeleton class="h-6 mt-1" />
                    </span>
                  </span>
                  <span class="flex items-center p-2 shrink-0">
                    <IconCSS name="lets-icons:expand-right" :style="{ backgroundColor: '#d1d5db' }" />
                  </span>
                </button>
              </li>
            </ul>
            <!-- Display history entries -->
            <ul v-if="displaySearchHistory && !searchStore.isLoading"
              class="max-h-full overflow-y-scroll divide-y divide-white shadow-inner rounded-3xl bg-gray-50">
              <li v-if="searchStore.history.length > 0" v-for="entry in searchStore.history">
                <button type="button" class="flex items-stretch w-full justify-stretch"
                  @click="async () => { searchKeywords = entry; await getSearchFests() }" v-wave>
                  <span class="p-4 shrink-0 aspect-square">
                    <IconCSS name="iconamoon:history-thin" />
                  </span>
                  <span class="flex flex-col items-stretch justify-center py-2 pr-2 text-left grow">
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
