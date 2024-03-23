import { defineStore } from 'pinia'
import type { MartyrologeFest } from '~/types/fest'

export const useMartyrologeStore = defineStore('MartyrologeStore', ()  => {
  const martyrologeFest = ref<MartyrologeFest>()

  function setMartyrologeFest(value: MartyrologeFest) {
    martyrologeFest.value = value
  }

  return {
    martyrologeFest,
    setMartyrologeFest
  }
})
