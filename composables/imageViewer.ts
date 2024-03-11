const isShow = ref(false)
const url = ref('')
const title = ref('')

export const useImageViewer = () => {
  function show(_url: string, _title: string) {
    url.value = _url
    title.value = _title
    isShow.value = true
  }

  function hide() {
    isShow.value = false
  }

  return {
    url,
    title,
    isShow,
    show,
    hide
  }
}
