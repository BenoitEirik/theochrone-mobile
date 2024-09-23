import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest'
import { CapacitorHttp } from '@capacitor/core'
import { sampleTheochrone18sept2024Image1, sampleTheochrone18sept2024Image2_no_image_for_this_fest } from '../dataSamples'

vi.mock('@capacitor/core', () => ({
  CapacitorHttp: {
    get: vi.fn()
  }
}))

describe('getPropers', () => {
  it('should return an array of 13 objects with value and label properties', () => {
    const propers = getPropers()
    expect(Array.isArray(propers)).toBe(true)
    expect(propers.length).toEqual(13)
  })
})

describe('getPictureURL', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should get an image URL from introibo.fr link', async () => {
    (CapacitorHttp.get as Mock).mockResolvedValueOnce({ data: sampleTheochrone18sept2024Image1, status: 200 })
    const pictureURL = await getPictureURL('https://introibo.fr/Mercredi-des-Quatre-Temps-de,452')
    expect(pictureURL).toEqual('https://introibo.fr/IMG/jpg/mercreQTsept1.jpg')
  })

  it('should get the default image URL from a introibo.fr page without image for this fest', async () => {
    (CapacitorHttp.get as Mock).mockResolvedValueOnce({ data: sampleTheochrone18sept2024Image2_no_image_for_this_fest, status: 200 })
    const pictureURL = await getPictureURL('https://introibo.fr/18-09-St-Joseph-de-Cupertino')
    expect(pictureURL).toEqual('/images/backgrounds/image_not_found.png')
  })
})