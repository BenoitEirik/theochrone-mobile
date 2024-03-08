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
        <section class="flex flex-col items-stretch pb-8">
          <header class="px-4 pt-4 pb-2 text-lg text-center shrink-0 ">
            <h2 class="text-lg font-bold">{{ fest.title }}</h2>
          </header>

          <div class="h-full px-4 pt-2 pb-2 grow">
            <div class="flex flex-col h-full gap-4 p-4 bg-gray-100 shadow-inner rounded-xl">
              <div class="flex justify-center w-full max-w-full h-60 max-h-60">
                <img :src="fest.img" alt="Fest illustration" class="object-contain max-h-full rounded ">
              </div>

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
            </div>
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
    @apply outline-4 outline-white;
  }
}
</style>
