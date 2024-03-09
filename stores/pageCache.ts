import { defineStore } from 'pinia'
import index from '~/pages/index.vue'
import type { Fest } from '~/types/fest'

export const usePageCacheStore = defineStore('PageCacheStore', () => {
  const homeCache = ref({
    //
  })

  const festCache = ref({
    fests: [] as Fest[],
    index: 0
  })

  function setIndexPageCache() {
    // 
  }

  function setFestPageCache(options: { fests?: Fest[], index?: number }) {
    if (options.fests !== undefined) {
      festCache.value.fests = options.fests
    }
    if (options.index !== undefined) {
      festCache.value.index = options.index
    }
  }

  return {
    homeCache,
    setIndexPageCache,
    festCache,
    setFestPageCache
  }
})
