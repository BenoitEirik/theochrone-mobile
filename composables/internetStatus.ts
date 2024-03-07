import { Network } from '@capacitor/network'

export const useInternetStatus = () => {
  const connected = ref(false)

  Network.addListener('networkStatusChange', async status => {
    if (status.connected) {
      const controller = new AbortController()
      const out = setTimeout(() => controller.abort(), 3000)

      const res = await fetch('http://info.cern.ch', { signal: controller.signal })

      clearTimeout(out)

      console.log('res:', res)
      
      res.status === 200 ? connected.value == true : connected.value == false
    } else {
      connected.value = false
    }
  })

  watch(connected, (prevStatus, nextStatus) => {
    console.log('prevStatus:', prevStatus)
    console.log('nextStatus:', nextStatus)

    if (!prevStatus && nextStatus) {
      // TODO: notification?
    }
  })

  return {
    connected
  }
}
