<script lang="ts" setup>
import { Browser } from '@capacitor/browser';
import type { Fest } from '~/types/fest'

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
</script>

<template>
  <nuxtLayout name="main" class="flex flex-col items-stretch">
    <Swiper id="fest-swiper" @swiper="(_swiper: any) => swiper = _swiper" :modules="[SwiperPagination]"
      :pagination="true" :initial-slide="festStore.slideIndex"
      @slideChange="(s: any) => onSlideChange(s.snapIndex)" class="w-full h-full max-w-full max-h-full">
      <SwiperSlide v-for="fest in fests" :key="fest.id" class="overflow-y-scroll touch-pan-y">
        <section class="flex flex-col items-stretch gap-4 p-4 pt-0 pb-8 grow">
          <header class="sticky top-0 z-10 pt-4">
            <div class="absolute top-0 inset-x-0 bottom-[40%] bg-white -z-10" />
            <div
              class="shadow-sm flex items-center h-[65px] max-h-[65px] gap-1 p-2 border rounded-full border-gray bg-white z-0">
              <img :src="getColorFestPicture(fest.color)" alt="Fest color"
                class="h-full rounded-full shrink-0 aspect-square" />
              <h2 class="font-medium text-center grow line-clamp-2">{{ fest.title }}</h2>
            </div>
          </header>

          <div class="flex flex-col gap-4 p-4 shadow-inner rounded-3xl bg-gray-50">
            <figure class="flex justify-center w-full max-w-full h-60 max-h-60">
              <img :src="fest.img" alt="Fest illustration" class="object-contain max-h-full rounded drop-shadow-sm" />
            </figure>

            <table>
              <tbody class="divide-y divide-white">
                <tr>
                  <th class="pb-2 text-left">Propre</th>
                  <td>{{ fest.proper }}</td>
                </tr>
                <tr>
                  <th class="py-2 text-left">Édition</th>
                  <td>{{ fest.edition }}</td>
                </tr>
                <tr>
                  <th class="py-2 text-left">Célébration</th>
                  <td>{{ fest.celebration }}</td>
                </tr>
                <tr>
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
                  <td>{{ fest.transferedFest }}</td>
                </tr>
              </tbody>
            </table>

            <button v-if="!!fest.massTextURL" type="button"
              class="flex items-stretch w-full border rounded-full shadow-sm border-gray"
              @click="async () => await Browser.open({ url: fest.massTextURL, toolbarColor: '#55acee' })" v-wave>
              <span class="h-full p-4 shrink-0 aspect-square">
                <IconCSS name="lets-icons:book-open-alt-light" />
              </span>
              <span class="flex flex-col items-stretch justify-center p-2 text-left grow">
                <span class="line-clamp-1">Texte de la messe et de l'office</span>
                <span class="text-gray-500 line-clamp-1">Sur introibo.fr</span>
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
