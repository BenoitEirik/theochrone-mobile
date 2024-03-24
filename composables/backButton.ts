import { App } from '@capacitor/app'

const apply = ref<() => void>(() => {})

App.addListener('backButton', () => apply.value())

function setExit() {
  apply.value = () => App.exitApp()
}

function setBack() {
  apply.value = () => useRouter().back()
}

function setCallback(cb: () => void) {
  apply.value = cb
}

export const useBackButton = () => {
  return {
    apply,
    setExit,
    setBack,
    setCallback
  }
}
