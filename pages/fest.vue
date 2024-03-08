<script lang="ts" setup>
import type { Fest } from '~/types/fest'

const navStore = useNavStore()
navStore.setLeftAction('back', () => useRouter().back())
navStore.setTitle('Fête')
useBackButton().setBack()

const festStore = useFestStore()
const fests = ref([] as Fest[])

const swiper = ref()

// Wait swiper to be mounted, then request fests
watch(swiper, async () => {
  await festsRequest()
}, { once: true })

async function festsRequest() {
  const { error, fests: _fests } = await festStore.getFest('home', { date: new Date() })
  fests.value = _fests
}
</script>

<template>
  <nuxtLayout name="main" class="flex flex-col items-stretch">
    <Swiper id="fest-swiper" @swiper="(_swiper: any) => swiper = _swiper" :modules="[SwiperPagination]"
      :pagination="true" :initial-slide="festStore.homeSlideIndex"
      @slideChange="(s: any) => festStore.setHomeSlideIndex(s.snapIndex)" class="w-full h-full max-w-full max-h-full">
      <SwiperSlide v-for="fest in fests" :key="fest.id" class="overflow-y-scroll touch-pan-y">
        <section class="flex flex-col items-stretch gap-4 p-4 pt-0 pb-8 grow">
          <header class="sticky top-0 pt-4">
            <div class="absolute top-0 inset-x-0 bottom-[40%] bg-white -z-10" />
            <div
              class="shadow-sm flex items-center h-[65px] max-h-[65px] gap-1 p-2 border rounded-full border-gray bg-white z-0">
              <img :src="getColorFestPicture(fest.color)" alt="Fest color"
                class="h-full rounded-full shrink-0 aspect-square" />
              <h2 class="text-center grow line-clamp-2">{{ fest.title }}</h2>
            </div>
          </header>

          <div class="flex flex-col gap-4 p-4 bg-gray-100 shadow-inner rounded-[32.5px]">
            <figure class="flex justify-center w-full max-w-full h-60 max-h-60">
              <img :src="fest.img" alt="Fest illustration" class="object-contain max-h-full rounded" />
            </figure>

            <table>
              <tbody>
                <tr class="border-b border-b-white">
                  <th class="pb-2 text-left">Propre</th>
                  <td>{{ fest.proper }}</td>
                </tr>
                <tr class="border-b border-b-white">
                  <th class="py-2 text-left">Édition</th>
                  <td>{{ fest.edition }}</td>
                </tr>
                <tr class="border-b border-b-white">
                  <th class="py-2 text-left">Célébration</th>
                  <td>{{ fest.celebration }}</td>
                </tr>
                <tr class="border-b border-b-white">
                  <th class="py-2 text-left">Classe</th>
                  <td>{{ fest.class }}</td>
                </tr>
                <tr class="border-b border-b-white">
                  <th class="py-2 text-left">Couleur liturgique</th>
                  <td>{{ fest.color }}</td>
                </tr>
                <tr class="border-b border-b-white">
                  <th class="py-2 text-left">Temporal</th>
                  <td>{{ fest.temporal }}</td>
                </tr>
                <tr class="border-b border-b-white">
                  <th class="py-2 text-left">Sanctoral</th>
                  <td>{{ fest.sanctoral }}</td>
                </tr>
                <tr class="border-b border-b-white">
                  <th class="py-2 text-left">Temps liturgique</th>
                  <td>{{ fest.liturgicalTime }}</td>
                </tr>
                <tr>
                  <th class="pt-2 text-left">Fête transférée</th>
                  <td>{{ fest.transferedFest }}</td>
                </tr>
              </tbody>
            </table>

            <button type="button" class="flex items-stretch w-full border rounded-full border-gray" @click="" v-wave>
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
