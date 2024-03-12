import { defineStore } from 'pinia'
import { CapacitorHttp, type HttpResponse } from '@capacitor/core'
import getPictureURL from '~/utils/getPictureURL'
import { type Fest, type MapDayFest } from '~/types/fest'

export const useFestStore = defineStore('FestStore', () => {
  const repositoriesDateFest = ref<Map<string, MapDayFest>>(new Map([['home', new Map() as MapDayFest], ['search', new Map() as MapDayFest]]))
  const isLoading = ref<boolean>(false)
  
  const slideIndex = ref(0)
  const slideFests = ref([] as Fest[])

  function setSlideIndex(value: number) {
    slideIndex.value = value
  }

  function setSlideFests(value: Fest[]) {
    slideFests.value = value
  }

  // repoName is about the repository where fests are stored: 'home' for  homepage, 'search' for search page
  async function getFest(repoName: string, options: { date: Date } | { keywords: string, year: string }) {
    isLoading.value = true
    let error: boolean = false

    // Retrieve & store
    let repo = new Map() as MapDayFest
    let _fests = Array<Fest>()
    if ('date' in options) {
      const day = options.date.getDate()
      const month = options.date.getMonth()! + 1
      const year = options.date.getFullYear()

      // Check if fests are already downloaded
      repo = repositoriesDateFest.value.get(repoName) || new Map() as MapDayFest
      _fests = repo.get(`${year}-${month}-${day}`) || Array<Fest>()
      if (_fests.length > 0) {
        isLoading.value = false
        return {
          error: false,
          fests: _fests
        }
      }

      const res: HttpResponse = await CapacitorHttp.get({ url: `https://theochrone.fr/kalendarium/date_seule?date_seule_day=${day}&date_seule_month=${month}&date_seule_year=${year}&pal=false&martyrology=false&proper=roman` })

      if (res.status !== 200) {
        isLoading.value = false
        return {
          error: true,
          fests: Array<Fest>()
        }
      }

      // Add new fests of the date
      _fests = await dayFestParser(res)
      repo.set(`${year}-${month}-${day}`, _fests)
      repositoriesDateFest.value.set(repoName, repo)
    } else if ('keywords' in options) {
      // TODO: pick up where I left off
      const search = options.keywords?.replace(' ', '+')

      // Check if fests are already downloaded
      repo = repositoriesDateFest.value.get(repoName) || new Map() as MapDayFest
      _fests = repo.get(`${options.year}`) || Array<Fest>()
      if (_fests.length > 0) {
        isLoading.value = false
        return {
          error: false,
          fests: _fests
        }
      }

      const res: HttpResponse = await CapacitorHttp.get({ url: `https://theochrone.fr/kalendarium/mot_clef?annee=${options.year}&rechserche=${search}&plus=on&pal=false&martyrology=false&proper=roman#resultup` })
    
      if (res.status !== 200) {
        isLoading.value = false
        return {
          error: true,
          fests: Array<Fest>()
        }
      }

      // Add new fests of the date
      _fests = await keywordsFestParser(res)
      repo.set(`${options.year}`, _fests)
      repositoriesDateFest.value.set(repoName, repo)
    }

    isLoading.value = false

    return {
      error,
      fests: _fests
    }
  }

  return {
    isLoading,
    getFest,
    slideIndex,
    setSlideIndex,
    slideFests,
    setSlideFests
  }
})

async function keywordsFestParser(res: HttpResponse): Promise<Fest[]> {
  // TODO:to continue
  const fests = Array<Fest>()
  
  return fests
}


async function dayFestParser(res: HttpResponse): Promise<Fest[]> {
  // Init virtual DOM from theochrone.fr
  const body = new DOMParser().parseFromString(res.data, 'text/html').body
  const festsElement = body.querySelector('#resultup .container .row div div .panel-group')

  // Get list of fests
  const fests = Array<Fest>()
  for (let i = 0; i < Number(festsElement?.childElementCount); i++) {
    const attributesElement = festsElement?.children[i].querySelector('.panel-collapse .panel-body .container .row .col-md-6 table tbody')?.children || new HTMLCollection()

    const _fest: Fest = {
      id: i,
      img: await getPictureURL(festsElement?.children[i].querySelector('.panel-collapse .panel-footer a')?.getAttribute('href') || ''),
      massTextURL: festsElement?.children[i].querySelector('.panel-collapse .panel-footer a')?.getAttribute('href') || '',
      title: (festsElement?.children[i].querySelector('.panel-heading .panel-title a')?.innerHTML || ''),
      proper: attributesElement[0].children[1].innerHTML || '',
      edition: attributesElement[1].children[1].innerHTML || '',
      celebration: attributesElement[2].children[1].innerHTML || '',
      class: attributesElement[3].children[1].innerHTML || '',
      color: attributesElement[4].children[1].innerHTML || '',
      temporal: attributesElement[5].children[1].innerHTML || '',
      sanctoral: attributesElement[6].children[1].innerHTML || '',
      liturgicalTime: attributesElement[7].children[1].innerHTML || '',
      transferedFest: attributesElement[8].children[1].innerHTML || '',
      pal: false
    }

    fests.push(_fest)
  }

  return fests
}