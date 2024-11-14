import { expect, it, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import App from '@/App.vue'
import { useGlobalVariables } from '@/stores/globalVariables'
import { ScreenType } from '@/model/ScreenType'

/**This testing file is used to test that the variables and functions within global stores work properly. */

beforeEach(() => {
  setActivePinia(createPinia())
})

it('Scrolling down on the title screen results in the project intro screen', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  const event = new WheelEvent('wheel') as any
  event.wheelDelta = -10

  document.dispatchEvent(event)

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('About')).toBe(true)

  wrapper.unmount()
})

it('Scrolling up on the project intro screen results in the title screen', async () => {
  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.PROJECTS_INTRO

  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  const event = new WheelEvent('wheel') as any
  event.wheelDelta = 10

  document.dispatchEvent(event)

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('Madison Hill')).toBe(true)

  wrapper.unmount()
})

it('Swiping up on the title screen (mobile) results in the project intro screen', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  const startEvent = new TouchEvent('touchstart', {
    changedTouches: [{ screenY: 300 } as any]
  }) as any

  document.dispatchEvent(startEvent)

  const endEvent = new TouchEvent('touchend', {
    changedTouches: [{ screenY: 200 } as any]
  }) as any

  document.dispatchEvent(endEvent)

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('About')).toBe(true)

  wrapper.unmount()
})

it('Swiping down on the project intro screen (mobile) results in the title screen', async () => {
  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.PROJECTS_INTRO

  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  const startEvent = new TouchEvent('touchstart', {
    changedTouches: [{ screenY: 200 } as any]
  }) as any

  document.dispatchEvent(startEvent)

  const endEvent = new TouchEvent('touchend', {
    changedTouches: [{ screenY: 300 } as any]
  }) as any

  document.dispatchEvent(endEvent)

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('Madison Hill')).toBe(true)

  wrapper.unmount()
})

it('Scrolling down on the project intro screen results in the Residence intro screen', async () => {
  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.PROJECTS_INTRO

  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  const event = new WheelEvent('wheel') as any
  event.wheelDelta = -10

  document.dispatchEvent(event)

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('Residence')).toBe(true)

  wrapper.unmount()
})

it('Scrolling up on the Residence intro screen results in the project intro screen', async () => {
  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.RESIDENCE_INTRO

  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  const event = new WheelEvent('wheel') as any
  event.wheelDelta = 10

  document.dispatchEvent(event)

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('About')).toBe(true)

  wrapper.unmount()
})

it('Swiping up on the project intro screen (mobile) results in the Residence intro screen', async () => {
  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.PROJECTS_INTRO

  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  const startEvent = new TouchEvent('touchstart', {
    changedTouches: [{ screenY: 300 } as any]
  }) as any

  document.dispatchEvent(startEvent)

  const endEvent = new TouchEvent('touchend', {
    changedTouches: [{ screenY: 200 } as any]
  }) as any

  document.dispatchEvent(endEvent)

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('Residence')).toBe(true)

  wrapper.unmount()
})

it('Swiping down on the Residence intro screen (mobile) results in the project intro screen', async () => {
  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.RESIDENCE_INTRO

  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  const startEvent = new TouchEvent('touchstart', {
    changedTouches: [{ screenY: 200 } as any]
  }) as any

  document.dispatchEvent(startEvent)

  const endEvent = new TouchEvent('touchend', {
    changedTouches: [{ screenY: 300 } as any]
  }) as any

  document.dispatchEvent(endEvent)

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('About')).toBe(true)

  wrapper.unmount()
})

it('Scrolling twice quickly does not change the page twice.', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  const event = new WheelEvent('wheel') as any
  event.wheelDelta = -10

  document.dispatchEvent(event)

  event.wheelDelta = -10

  document.dispatchEvent(event)

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('Residence')).not.toBe(true)

  wrapper.unmount()
})

it('"Tapping" on the title screen (mobile) results in the intro screen', async () => {
  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.TITLE

  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  const startEvent = new TouchEvent('touchstart', {
    changedTouches: [{ screenY: 200 } as any]
  }) as any

  document.dispatchEvent(startEvent)

  const endEvent = new TouchEvent('touchend', {
    changedTouches: [{ screenY: 195 } as any]
  }) as any

  document.dispatchEvent(endEvent)

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('About')).toBe(true)

  wrapper.unmount()
})
