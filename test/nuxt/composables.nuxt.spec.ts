import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest'
import { Preferences } from '@capacitor/preferences'
import { TextZoom } from '@capacitor/text-zoom'
import { useSettings } from '~/composables/settings'
import { App } from '@capacitor/app'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

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

  it('should have right members', () => {
    expect(Object.keys(useSettings()).sort()).toEqual([
      'load',
      'bootNotification',
      'accessibility',
      'proper'
    ].sort())
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

vi.mock('@capacitor/app', () => ({
  App: {
    addListener: vi.fn(),
    exitApp: vi.fn(),
    setBack: vi.fn()
  }
}))

// Mock the router
const mockRouter = {
  back: vi.fn()
}
mockNuxtImport('useRouter', () => {
  return () => mockRouter
})

describe('backButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should have right members', () => {
    expect(Object.keys(useBackButton()).sort()).toEqual([
      'apply',
      'setExit',
      'setBack',
      'setCallback'
    ].sort())
  })

  it('should exit the app', () => {
    // Arrange
    const { apply, setExit } = useBackButton()
    // Act
    setExit()
    apply.value()
    // Assert
    expect(App.exitApp as Mock).toHaveBeenCalledOnce()
  })

  it('should back to previous page', () => {
    const { apply, setBack } = useBackButton()
    // ! We can't spyOn useRouter() directly because it's a constant value
    const spyOnBack = vi.spyOn(mockRouter, 'back')
    // Act
    setBack()
    apply.value()
    // Assert
    expect(spyOnBack).toHaveBeenCalledOnce()
  })

  it('should allow to set any callback', () => {
    // Arrange
    const { apply, setCallback } = useBackButton()
    const mockCallback = {
      myCallback: () => undefined
    }
    const spyOnCallback = vi.spyOn(mockCallback, 'myCallback')
    // Act
    setCallback(mockCallback.myCallback)
    apply.value()
    // Assert
    expect(spyOnCallback).toHaveBeenCalledOnce()
  })
})