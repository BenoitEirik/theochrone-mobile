import { TextZoom } from '@capacitor/text-zoom'
import { Preferences, type GetResult } from '@capacitor/preferences'

export const useSettings = () => {
  const bootNotification = ref(false)
  const acessibility = ref<boolean>(false)

  onBeforeMount(async () => {
    const _bootNotification: GetResult = await Preferences.get({ key: 'bootNotification' })
    if (_bootNotification !== null) {
      _bootNotification.value === 'true' ? bootNotification.value = true : bootNotification.value = false
    }

    const _acessibility: GetResult = await Preferences.get({ key: 'acessibility' })
    if (_acessibility !== null) {
      _acessibility.value === 'true' ? acessibility.value = true : acessibility.value = false
    }
  })

  watch(acessibility, async (value: boolean) => {
    switch (value) {
      case true:
        TextZoom.set({ value: 1.2 })
        await Preferences.set({ key: 'acessibility', value: 'true' })
        break;
      case false:
        TextZoom.set({ value: 1.0 })
        await Preferences.set({ key: 'acessibility', value: 'false' })
        break;
    }
  })

  return {
    bootNotification,
    acessibility
  }
}
