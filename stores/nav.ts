import { defineStore } from 'pinia'

export const useNavStore = defineStore('NavStore', () => {
  const leftDrawer = ref<boolean>(false)

  function setLeftDrawer(value: boolean) {
    leftDrawer.value = value
  }

  return { leftDrawer, setLeftDrawer }
})
