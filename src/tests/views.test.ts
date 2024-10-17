import { expect, it, beforeEach, vi, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import App from '@/App.vue'
import { useGlobalVariables } from '@/stores/globalVariables'
import { ScreenType } from '@/model/ScreenType'
import AboutPage from '@/view/AboutPage.vue'
import { nextTick } from 'vue'

/**This testing file is used to ensure that all components/views render properly. */

beforeEach(() => {
  setActivePinia(createPinia())
})

afterEach(async () => {
  vi.useRealTimers()
  await nextTick()
  await flushPromises()
})

it('Renders main title on load', async () => {
  const wrapper = mount(App)

  await flushPromises()

  expect(wrapper.text().includes('Madison Hill')).toBe(true)

  wrapper.unmount()
})

it('Renders projects intro when currentScreen global variable is set to "PROJECTS_INTRO"', async () => {
  const wrapper = mount(App)

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.PROJECTS_INTRO

  await flushPromises()

  expect(wrapper.text().includes('About')).toBe(true)

  wrapper.unmount()
})

it('Renders residence intro when currentScreen global variable is set to "RESIDENCE_INTRO"', async () => {
  const wrapper = mount(App)

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.RESIDENCE_INTRO

  await flushPromises()

  expect(wrapper.text().includes('Residence')).toBe(true)

  wrapper.unmount()
})

it('Projects Intro screen says "Good Morning!" when loaded in the morning', async () => {
  vi.setSystemTime(new Date('2024-10-17T14:34:39Z'))

  const wrapper = mount(AboutPage)

  expect(wrapper.text().includes('Good Morning!')).toBe(true)
})

it('Projects Intro screen says "Good Afternoon!" when loaded in the afternoon', async () => {
  vi.setSystemTime(new Date('2024-10-17T20:34:39Z'))

  const wrapper = mount(AboutPage)

  expect(wrapper.text().includes('Good Afternoon!')).toBe(true)
})

it('Projects Intro screen says "Good Evening!" when loaded in the evening', async () => {
  vi.setSystemTime(new Date('2024-10-17T02:34:39Z'))

  const wrapper = mount(AboutPage)

  expect(wrapper.text().includes('Good Evening!')).toBe(true)
})
