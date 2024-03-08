import { defineStore } from 'pinia'
import type { Fest } from '~/types/fest'

export const usePageCacheStore = defineStore('PageCacheStore', () => {
  const homeCache = ref({
    //
  })

  const festCache = ref({
    fests: [] as Fest[]
  })

  function setIndexPageCache() {
    // 
  }

  function setFestPageCache(fests: Fest[]) {
    festCache.value.fests = fests
  }

  return {
    homeCache,
    setIndexPageCache,
    festCache,
    setFestPageCache
  }
})
