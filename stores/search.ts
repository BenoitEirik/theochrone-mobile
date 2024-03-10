import { CapacitorHttp, type HttpResponse } from '@capacitor/core'
import { defineStore } from 'pinia'
import type { Fest } from '~/types/fest'
import { Preferences, type GetResult } from '@capacitor/preferences'

export const useSearchStore = defineStore('SearchStore', () => {
  const keywords = ref('')
  const year = ref(new Date().getFullYear())
  const yearOptions = Array.from({ length: 141 }, (_, index) => {
    const year = 1960 + index;
    return { value: year, label: `${year}` }
  })
  const fests = ref([] as Fest[])
  const isLoading = ref(false)
  const history = ref([] as string[])


  // Get history from local storage
  onBeforeMount(async () => {
    const _history = await Preferences.get({ key: 'searchHistory' })
    if (_history !== null) {
      history.value = JSON.parse(_history.value || '[]') as string[]
    }
  })

  async function getSearchFests(_keywords: string, _year: number) {
    isLoading.value = true
    keywords.value = _keywords.replace(' ', '+')
    year.value = _year

    // Save history
    _historyFIFO(_keywords)

    const res = await CapacitorHttp.get({ url: `https://theochrone.fr/kalendarium/mot_clef?annee=${year.value}&recherche=${keywords.value}&plus=on&pal=false&martyrology=false&proper=roman#resultup` })

    if (res.status !== 200) {
      fests.value = []
      isLoading.value = false
      return {
        error: true,
        fests: fests.value
      }
    }

    fests.value = await _festParser(res)

    isLoading.value = false

    return {
      error: false,
      fests: fests.value
    }
  }

  async function _festParser(res: HttpResponse): Promise<Fest[]> {
    // Init virtual DOM from theochrone.fr
    const body = new DOMParser().parseFromString(res.data, 'text/html').body
    const festsElement = body.querySelector('#resultup .container .row div div .panel-group')

    // Get list of fests
    const _fests = Array<Fest>()
    for (let i = 0; i < Number(festsElement?.childElementCount); i++) {
      const attributesElement = festsElement?.children[i].querySelector('.panel-collapse .panel-body .container .row .col-md-6 table tbody')?.children || new HTMLCollection();

      const _fest = {
        id: i,
        img: await getPictureURL(festsElement?.children[i].querySelector('.panel-collapse .panel-footer a')?.getAttribute('href') || ''),
        massTextURL: festsElement?.children[i].querySelector('.panel-collapse .panel-footer a')?.getAttribute('href') || '',
        title: festsElement?.children[i].querySelector('.panel-heading .panel-title a')?.innerHTML || '',
        proper: attributesElement[0].children[1].innerHTML || '',
        edition: attributesElement[1].children[1].innerHTML || '',
        celebration: attributesElement[2].children[1].innerHTML || '',
        class: attributesElement[3].children[1].innerHTML || '',
        color: attributesElement[4].children[1].innerHTML || 'Blanc',
        temporal: attributesElement[5].children[1].innerHTML || '',
        sanctoral: attributesElement[6].children[1].innerHTML || '',
        liturgicalTime: attributesElement[7].children[1].innerHTML || '',
        transferedFest: attributesElement[8].children[1].innerHTML || '',
      }

      _fests.push(_fest)
    }

    return _fests
  }

  function formatSearchDate(strDate: string): string {
    let dateParticules = strDate.split(' ')
    const month = dateParticules[2].charAt(0).toUpperCase() + dateParticules[2].slice(1)

    return [dateParticules[1], month].join(' ')
  }

  function _historyFIFO(_keywords: string) {
    const maxLength = 30

    const index = history.value.indexOf(_keywords)
    if (index > -1) {
      history.value.splice(index, 1)
      history.value.unshift(_keywords)
      Preferences.set({ key: 'searchHistory', value: JSON.stringify(history.value) })
      return
    }

    if (history.value.length >= maxLength) {
      history.value.pop()
      history.value.unshift(_keywords)
      Preferences.set({ key: 'searchHistory', value: JSON.stringify(history.value) })
      return
    } else {
      history.value.unshift(_keywords)
      Preferences.set({ key: 'searchHistory', value: JSON.stringify(history.value) })
      return
    }
  }

  return {
    keywords,
    year,
    yearOptions,
    fests,
    getSearchFests,
    isLoading,
    formatSearchDate,
    history
  }
})
