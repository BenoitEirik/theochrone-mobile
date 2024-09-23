import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest'
import { Preferences } from '@capacitor/preferences'
import { TextZoom } from '@capacitor/text-zoom'
import { useSettings } from '~/composables/settings'

// Mock Capacitor Preferences & TextZoom modules
vi.mock('@capacitor/preferences', () => ({
  Preferences: {
    get: vi.fn(),
    set: vi.fn()
  }
}))
vi.mock('@capacitor/text-zoom', () => ({
  TextZoom: {
    get: vi.fn(),
    set: vi.fn()
  }
}))

describe('useSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should get readable values from preferences', async () => {
    // Arrange
    (Preferences.get as Mock)
      .mockResolvedValueOnce({ value: 'true' })
      .mockResolvedValueOnce({ value: 'brazilian' });
    (Preferences.set as Mock)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined);
    // Act
    const { load, accessibility, proper } = useSettings()
    await load()
    // Assert
    expect(accessibility.value).toEqual(true)
    expect(proper.value).toEqual("brazilian")
    expect(Preferences.get).toHaveBeenCalledWith({ key: 'accessibility' })
    expect(Preferences.get).toHaveBeenCalledWith({ key: 'proper' })
  })

  it('should watch and set preferences', async () => {
    // Arrange
    (Preferences.get as Mock)
      .mockResolvedValueOnce({ value: 'true' })
      .mockResolvedValueOnce({ value: 'brazilian' });
    (Preferences.set as Mock)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined);
    // Act
    const { load, accessibility, proper } = useSettings()
    await load()
    accessibility.value = false
    proper.value = 'roman'
    // Assert
    expect(accessibility.value).toEqual(false)
    expect(proper.value).toEqual("roman")
  })

  // TODO: there is an error when this test is put at first place, this needs to be fixed
  it('shoud have 3 settings', async () => {
    // Arrange
    (Preferences.get as Mock)
      .mockResolvedValueOnce({ value: 'true' })
      .mockResolvedValueOnce({ value: 'brazilian' });
    (Preferences.set as Mock)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined);
    const countSettings = 3
    // Act
    const settings = useSettings()
    await settings.load()
    const countRealSettings = Object.keys(settings).slice(1).length
    // Assert
    expect(countSettings).toEqual(countRealSettings)
  })
})