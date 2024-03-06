import { App } from '@capacitor/app'

const apply = ref<() => void>(() => {})

App.addListener('backButton', () => apply.value())

function setExit() {
  apply.value = () => App.exitApp()
}

function setBack() {
  apply.value = () => useRouter().back()
}

export const useBackButton = () => {
  return {
    apply,
    setExit,
    setBack
  }
}
