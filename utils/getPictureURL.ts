import { CapacitorHttp, type HttpResponse } from '@capacitor/core'

export default async (url: string) => {
  const defautlImgURL = '/images/backgrounds/image_not_found.png'

  if (!url) {
    return defautlImgURL
  }

  const res: HttpResponse = await CapacitorHttp.get({ url })

  const body = new DOMParser().parseFromString(res.data, 'text/html').body
  const imgURL = body.querySelector('#principal .chapo img')?.getAttribute('src')

  if (!imgURL) {
    return defautlImgURL
  } else {
    return 'https://introibo.fr/' + body.querySelector('#principal .chapo img')?.getAttribute('src')
  }
}
