import { defineStore } from 'pinia'

export const useNavStore = defineStore('NavStore', () => {
  const leftDrawer = ref<boolean>(false)
  const title = ref<string>('Theochrone')
  const leftAction = ref({
    name: 'menu',
    callback: () => {
      setLeftDrawer(!leftDrawer)
    }
  })

  function setLeftDrawer(value: boolean) {
    leftDrawer.value = value
  }

  function setTitle(value: string) {
    title.value = value
  }

  function setLeftAction(name: string, fn?: () => void) {
    const actions: { [key: string]: () => void } = {
      'menu': () => {
        const navStore = useNavStore()
        navStore.setLeftDrawer(!navStore.leftDrawer)
      },
      'back': () => { if (fn) fn() }
    }

    if (actions[name]) {
      leftAction.value = {
        name,
        callback: actions[name]
      };
    }
  }

  return { leftDrawer, setLeftDrawer, title, setTitle, leftAction, setLeftAction }
})
