<script lang="ts" setup>
import { Browser } from '@capacitor/browser'

const navStore = useNavStore()
navStore.setLeftAction('back', () => useRouter().back())
useBackButton().setBack()

const festStore = useFestStore()
const fests = ref(festStore.slideFests)
navStore.setTitle(festStore.slideFests[festStore.slideIndex].title)

const swiper = ref()

function onSlideChange(index: number) {
  festStore.setSlideIndex(index)
  navStore.setTitle(festStore.slideFests[index].title)
}

function openMass(url: string) {
  useMassStore().setUrl(url)
  useRouter().push('/mass')
}

const imageViewer = useImageViewer()
</script>

<template>
  <nuxtLayout name="main" class="flex flex-col items-stretch">
    <Swiper id="fest-swiper" @swiper="(_swiper: any) => swiper = _swiper" :modules="[SwiperPagination]"
      :pagination="true" :initial-slide="festStore.slideIndex" @slideChange="(s: any) => onSlideChange(s.snapIndex)"
      class="h-full max-h-full w-full max-w-full">
      <SwiperSlide v-for="fest in fests" :key="fest.id" class="touch-pan-y overflow-y-scroll">
        <section class="flex grow flex-col items-stretch gap-4 p-4 pb-8 pt-0">
          <header class="sticky top-0 z-10 pt-4">
            <div class="absolute inset-x-0 bottom-[40%] top-0 -z-10 bg-white" />
            <div
              class="border-gray z-0 flex h-[65px] max-h-[65px] items-center gap-1 rounded-full border bg-white p-2 shadow-sm">
              <img :src="getColorFestPicture(fest.color)" alt="Fest color"
                class="aspect-square h-full shrink-0 rounded-full" />
              <h2 class="line-clamp-2 grow text-center font-medium">{{ fest.title.split('-')[0] }}</h2>
            </div>
          </header>

          <div class="flex flex-col gap-4 rounded-3xl bg-gray-50 p-4 shadow-inner">
            <figure class="relative flex h-60 max-h-60 w-full max-w-full items-center justify-center"
              @click="imageViewer.show(fest.img, fest.title)">
              <img :src="fest.img" alt="Fest illustration" class="max-h-full max-w-full rounded" />
              <div class="absolute bottom-0 right-0 rounded bg-gray-200/50 shadow-sm">
                <IconCSS name="lets-icons:full-screen-corner-light" :style="{ height: '1rem' }" />
              </div>
            </figure>

            <div v-if="fest.pal" class="flex items-center justify-center">
              <div class="rounded bg-gray-400 px-1 text-center text-xs font-medium text-gray-50 shadow">
                Messe propre à certains lieux
              </div>
            </div>

            <table>
              <tbody class="divide-y divide-white">
                <tr>
                  <th class="pb-2 text-left">Propre</th>
                  <td class="align-top">{{ fest.proper }}</td>
                </tr>
                <tr>
                  <th class="py-2 text-left">Édition</th>
                  <td>{{ fest.edition }}</td>
                </tr>
                <tr>
                  <th class="py-2 text-left">Célébration</th>
                  <td>{{ fest.celebration }}</td>
                </tr>
                <tr v-if="!fest.pal">
                  <th class="py-2 text-left">Classe</th>
                  <td>{{ fest.class }}</td>
                </tr>
                <tr>
                  <th class="py-2 text-left">Couleur liturgique</th>
                  <td>{{ fest.color }}</td>
                </tr>
                <tr>
                  <th class="py-2 text-left">Temporal</th>
                  <td>{{ fest.temporal }}</td>
                </tr>
                <tr>
                  <th class="py-2 text-left">Sanctoral</th>
                  <td>{{ fest.sanctoral }}</td>
                </tr>
                <tr>
                  <th class="py-2 text-left">Temps liturgique</th>
                  <td>{{ fest.liturgicalTime }}</td>
                </tr>
                <tr>
                  <th class="pt-2 text-left">Fête transférée</th>
                  <td class="align-bottom">{{ fest.transferedFest }}</td>
                </tr>
              </tbody>
            </table>

            <button v-if="!!fest.massTextURL" type="button"
              class="border-gray flex w-full items-stretch rounded-full border shadow-sm"
              @click="() => openMass(fest.massTextURL)" v-wave>
              <span class="aspect-square h-full shrink-0 p-4">
                <IconCSS name="lets-icons:book-open-alt-light" />
              </span>
              <span class="flex grow flex-col items-stretch justify-center p-2 text-left">
                <span class="line-clamp-1">Texte de la messe et de l'office</span>
                <span class="line-clamp-1 text-gray-500">Fourni par introibo.fr</span>
              </span>
            </button>
          </div>
        </section>
      </SwiperSlide>
    </Swiper>
  </nuxtLayout>
</template>

<style lang="scss">
#fest-swiper {
  .swiper-pagination-bullet-active {
    background-color: theme('colors.primary.500');
  }

  .swiper-pagination-bullet {
    background-color: theme('colors.primary.500');
    @apply outline outline-2 outline-white;
  }
}
</style>
