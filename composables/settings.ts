import { TextZoom } from '@capacitor/text-zoom'
import { Preferences, type GetResult } from '@capacitor/preferences'

const bootNotification = ref(false)
const accessibility = ref(false)
const proper = ref('roman')
const loaded = ref(false)

export const useSettings = () => {
  // Initial load from persistant storage
  async function load () {
    if (loaded.value) return

    // TODO: bootNotifications
    // const _bootNotification: GetResult = await Preferences.get({ key: 'bootNotification' })
    // if (_bootNotification !== null) {
    //   _bootNotification.value === 'true' ? bootNotification.value = true : bootNotification.value = false
    // }

    const _accessibility: GetResult = await Preferences.get({ key: 'accessibility' })
    if (_accessibility.value !== null) {
      _accessibility.value === 'true' ? accessibility.value = true : accessibility.value = false
    }

    const _proper: GetResult = await Preferences.get({ key: 'proper' })
    if (_proper.value !== null) {
      proper.value = _proper.value
    }

    loaded.value = true
  }

  watch(accessibility, (value: boolean) => {
    if (value) {
      TextZoom.set({ value: 1.2 })
      Preferences.set({ key: 'accessibility', value: 'true' })
    } else {
      TextZoom.set({ value: 1.0 })
      Preferences.set({ key: 'accessibility', value: 'false' })
    }
  })

  watch(proper, (value: string) => {
    Preferences.set({ key: 'proper', value })
  })

  return {
    load,
    bootNotification,
    accessibility,
    proper
  }
}
