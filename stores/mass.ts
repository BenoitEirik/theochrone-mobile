import { defineStore } from 'pinia'
import type { Mass } from '~/types/mass'

export const useMassStore = defineStore('MassStore', () => {
  const url = ref('')
  const mass = ref<Mass>()
  const isLoading = ref(false)

  function setUrl(value: string) {
    url.value = value
  }

  async function getMass(_url: string) {
    isLoading.value = true
    url.value = _url

    try {
      // No CORS specifications on introibo.fr
      const res = await fetch(_url, { headers: { 'Content-Type': 'text/html; charset=iso-8859-1' } })

      if (res.status !== 200) {
        throw res.status
      }

      mass.value = await _massParser(res, _url)
    } catch (error) {
      isLoading.value = false
      mass.value = undefined

      return {
        error: true,
        mass: mass.value
      }
    }

    isLoading.value = false

    return {
      error: false,
      mass: mass.value
    }
  }

  async function _massParser(res: Response, _url: string): Promise<Mass> {
    const decoder = new TextDecoder('iso-8859-1')
    const data = decoder.decode((await res.arrayBuffer()))

    // Init virtual DOM from theochrone.fr
    const body = new DOMParser().parseFromString(data, 'text/html').body
    const container = body.querySelector('div#principal div.texte')

    // Apply some transformations
    const pictureElement = container?.querySelector('p > span > img')
    const h3Element = container?.querySelector('h3')
    const tableElement = container?.querySelector('h3+table')
    const tableTdElements = container?.querySelectorAll('h3+table a')
    let tableOfContents = ''
    tableTdElements?.forEach((el, i) => {
      tableOfContents += `<div>${i + 1}. ${el.outerHTML}</div>`
    })
    pictureElement?.remove()
    h3Element?.remove()
    tableElement?.remove()

    // Set right url for all imgs
    container?.querySelectorAll('img').forEach(el => {
      if (el.src.includes('IMG/')) {
        el.src = `https://introibo.fr/IMG/${el.src.split('IMG/')[1]}`
      }
    })
    // TODO: add possibility to see images in the ImageViewer

    const _mass: Mass = {
      id: 0,
      url: _url,
      title: body.querySelector('h1.titre-texte')?.innerHTML || '',
      tableOfContents,
      body: container?.innerHTML || ''
    }

    return _mass
  }

  return {
    isLoading,
    url,
    setUrl,
    mass,
    getMass
  }
})
