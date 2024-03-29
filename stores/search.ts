import { CapacitorHttp, type HttpResponse } from '@capacitor/core'
import { defineStore } from 'pinia'
import type { Fest, MartyrologeFest } from '~/types/fest'
import { Preferences } from '@capacitor/preferences'

export const useSearchStore = defineStore('SearchStore', () => {
  const keywords = ref('')
  const year = ref(new Date().getFullYear())
  const yearOptions = Array.from({ length: 141 }, (_, index) => {
    const year = 1960 + index;
    return { value: year, label: `${year}` }
  })
  const fests = ref([] as Fest[])
  const martyrologeFests = ref([] as MartyrologeFest[])
  const isLoading = ref(false)
  const history = ref([] as string[])
  const proper = ref<string>('') // TODO: change by the one used by default in settings
  const properOptions = getPropers()


  // Get history from local storage
  onBeforeMount(async () => {
    const _history = await Preferences.get({ key: 'searchHistory' })
    if (_history !== null) {
      history.value = JSON.parse(_history.value || '[]') as string[]
    }
  })

  async function getSearchFests(_keywords: string, _year: number, _proper: string) {
    isLoading.value = true
    keywords.value = _keywords.replace(' ', '+')
    year.value = _year
    proper.value = _proper

    // Save history
    _historyFIFO(_keywords)

    const res = await CapacitorHttp.get({ url: `https://theochrone.fr/kalendarium/mot_clef?annee=${year.value}&recherche=${keywords.value}&plus=on&pal=true&martyrology=false&proper=${proper}#resultup` })

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

      const isPal = (festsElement?.children[i].querySelector('.panel-heading .panel-title a')?.innerHTML || '').includes('Pro Aliquibus Locis')

      const _fest: Fest = {
        id: i,
        img: await getPictureURL(festsElement?.children[i].querySelector('.panel-collapse .panel-footer a')?.getAttribute('href') || ''),
        massTextURL: festsElement?.children[i].querySelector('.panel-collapse .panel-footer a')?.getAttribute('href') || '',
        title: festsElement?.children[i].querySelector('.panel-heading .panel-title a')?.innerHTML || '',
        proper: attributesElement[0].children[1].innerHTML || '',
        edition: attributesElement[1].children[1].innerHTML || '',
        celebration: attributesElement[2].children[1].innerHTML || '',
        class: isPal ? undefined : (attributesElement[3].children[1].innerHTML || ''),
        color: attributesElement[isPal ? 3 : 4].children[1].innerHTML || 'Blanc',
        temporal: attributesElement[isPal ? 4 : 5].children[1].innerHTML || '',
        sanctoral: attributesElement[isPal ? 5 : 6].children[1].innerHTML || '',
        liturgicalTime: attributesElement[isPal ? 6 : 7].children[1].innerHTML || '',
        transferedFest: attributesElement[isPal ? 7 : 8].children[1].innerHTML || '',
        pal: isPal
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

  async function getSearchMartyrologeFests(_keywords: string, _year: number) {
    isLoading.value = true
    keywords.value = _keywords.replace(' ', '+')
    year.value = _year
    proper.value = 'roman'

    // Save history
    _historyFIFO(_keywords)

    const res = await CapacitorHttp.get({ url: `https://theochrone.fr/kalendarium/mot_clef?annee=${year.value}&recherche=${keywords.value}&plus=on&pal=true&martyrology=true&proper=${proper}#resultup` })

    if (res.status !== 200) {
      martyrologeFests.value = []
      isLoading.value = false
      return {
        error: true,
        martyrologeFests: martyrologeFests.value
      }
    }

    martyrologeFests.value = await _martyrologeFestParser(res)

    isLoading.value = false

    return {
      error: false,
      martyrologeFests: martyrologeFests.value
    }
  }

  async function _martyrologeFestParser(res: HttpResponse): Promise<MartyrologeFest[]> {
    // Init virtual DOM from theochrone.fr
    const body = new DOMParser().parseFromString(res.data, 'text/html').body
    const container = body.querySelector('#resultup .container .row div')

    // Get list of martyrologeFests
    const _martyrologeFests = Array<MartyrologeFest>()
    for (let i = 1; i < (container?.childElementCount || 0); i++) {
      const _martyrologeFest: MartyrologeFest = {
        id: i - 1,
        hrDate: (container?.children[i].querySelector('.panel .panel-heading .panel-title .collapsed')?.innerHTML || ''),
        blockquote: (container?.children[i].querySelector('#martyrology'+(i-1)+' blockquote')?.innerHTML || ''),
        mark: (container?.children[i].querySelector('#martyrology'+(i-1)+' blockquote mark')?.innerHTML || '')
      }

      _martyrologeFests.push(_martyrologeFest)
    }

    return _martyrologeFests
  }

  return {
    keywords,
    year,
    yearOptions,
    proper,
    properOptions,
    fests,
    getSearchFests,
    isLoading,
    formatSearchDate,
    history,
    martyrologeFests,
    getSearchMartyrologeFests
  }
})
