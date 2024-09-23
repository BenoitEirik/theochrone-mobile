import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest'
import { CapacitorHttp } from '@capacitor/core'
import {
  sampleTheochrone18sept2024,
  sampleTheochrone18sept2024Image1,
  sampleTheochrone18sept2024Image2_no_image_for_this_fest
} from '../dataSamples.js'

vi.mock('@capacitor/core', () => ({
  CapacitorHttp: {
    get: vi.fn()
  }
}))

describe('useFestStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should get fests from home repository at the September 18, 2024', async () => {
    // Arrange
    const festStore = useFestStore()
    const spyGetFest = vi.spyOn(festStore, 'getFest')
    const date = new Date(2024, 8, 18);
    (CapacitorHttp.get as Mock)
      .mockResolvedValueOnce({ data: sampleTheochrone18sept2024, status: 200 }) // Get fests (there are two fests for this day)
      .mockResolvedValueOnce({ data: sampleTheochrone18sept2024Image1, status: 200 }) // Get fest image 1
      .mockResolvedValueOnce({ data: sampleTheochrone18sept2024Image2_no_image_for_this_fest, status: 200 });// Get fest image 2
    // * jsdom interpret "\n" but another runner like happy-dom interpret "\r\n"
    const expectedFests = [
      {
        "id": 0,
        "img": "https://introibo.fr/IMG/jpg/mercreQTsept1.jpg",
        "massTextURL": "http://www.introibo.fr/Mercredi-des-Quatre-Temps-de,452",
        "title": "Mercredi des Quatre-Temps de Septembre",
        "proper": "Romain",
        "edition": "1962",
        "celebration": "Cette fête est célébrée.\n",
        "class": "2",
        "color": "Violet",
        "temporal": "Oui",
        "sanctoral": "Non",
        "liturgicalTime": "Temps per Annum après la Pentecôte",
        "transferedFest": "Non",
        "pal": false
      },
      {
        "id": 1,
        "img": "/images/backgrounds/image_not_found.png",
        "massTextURL": "http://introibo.fr/18-09-St-Joseph-de-Cupertino",
        "title": "Saint Joseph de Cupertino, Confesseur",
        "proper": "Romain",
        "edition": "1962",
        "celebration": "Cette fête est commémorée.\n",
        "class": "3",
        "color": "Blanc",
        "temporal": "Non",
        "sanctoral": "Oui",
        "liturgicalTime": "Temps per Annum après la Pentecôte",
        "transferedFest": "Non",
        "pal": false
      }
    ]
    // Act
    const { error, fests } = await festStore.getFest('home', { date })
    // Assert
    expect(error).toEqual(false)
    expect(fests).toEqual(expectedFests)
    expect(spyGetFest).toHaveBeenCalledWith('home', { date: date })
  })
})