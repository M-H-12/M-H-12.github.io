import { expect, it, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import App from '@/App.vue'
import { useGlobalVariables } from '@/stores/globalVariables'
import { ScreenType } from '@/model/ScreenType'
import { useMenuUtil } from '@/stores/menuUtil'

/**This testing file is used to test that the variables and functions within global stores work properly. */

beforeEach(() => {
  setActivePinia(createPinia())
})

it('Scrolling down on the title screen results in the project intro screen', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  const event = new WheelEvent('wheel') as any
  event.wheelDelta = -70

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
  event.wheelDelta = 70

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
  event.wheelDelta = -70

  document.dispatchEvent(event)

  event.wheelDelta = -70

  document.dispatchEvent(event)

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('introduction')).not.toBe(true)

  wrapper.unmount()
})

it('"Tapping" on the title screen (mobile) does not change the screen.', async () => {
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

  expect(wrapper.text().includes('Software')).toBe(true)

  wrapper.unmount()
})

it('Clicking on the hamburger menu opens the side menu', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  const menuUtil = useMenuUtil()

  const { menuPosition } = storeToRefs(menuUtil)

  currentScreen.value = ScreenType.PROJECTS_INTRO

  await flushPromises()

  const menu = wrapper.find('#hamburgerMenu')

  menu.trigger('click')

  //Wait 1 second for the animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 1000))

  expect(menuPosition.value).toBeLessThanOrEqual(0)
})

it('Clicking on the hamburger menu twice only opens the side menu once', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  const menuUtil = useMenuUtil()

  const { menuPosition } = storeToRefs(menuUtil)

  currentScreen.value = ScreenType.PROJECTS_INTRO

  await flushPromises()

  const menu = wrapper.find('#hamburgerMenu')

  menu.trigger('click')

  menu.trigger('click')

  //Wait 1 second for the animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 1000))

  expect(menuPosition.value).toBeLessThanOrEqual(0)
})

it('Clicking on the background dimmer when the menu is open closes it.', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  const menuUtil = useMenuUtil()

  const { menuPosition } = storeToRefs(menuUtil)

  currentScreen.value = ScreenType.PROJECTS_INTRO

  await flushPromises()

  const menu = wrapper.find('#hamburgerMenu')

  menu.trigger('click')

  //Wait 1 second for the animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 1000))

  await flushPromises()

  const dimmer = wrapper.find('#backgroundDimmer')

  dimmer.trigger('click')

  //Wait 1 second for the animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 1000))

  expect(menuPosition.value).toBeGreaterThanOrEqual(-20)
})

it('Clicking on the "Title" button in the side menu navigates to that page', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.PROJECTS_INTRO

  await flushPromises()

  const titleButton = wrapper.find('#mainTitleButton')

  titleButton.trigger('click')

  await flushPromises()

  expect(wrapper.text()).toContain('Software')
})

it('Clicking on the "About" button in the side menu navigates to that page', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.PROJECTS_INTRO

  await flushPromises()

  const titleButton = wrapper.find('#aboutButton')

  titleButton.trigger('click')

  await flushPromises()

  expect(wrapper.text()).toContain('About')
})

it('Clicking on the "Residence" button in the side menu navigates to that page', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.RESIDENCE_INTRO

  await flushPromises()

  const titleButton = wrapper.find('#introButton')

  titleButton.trigger('click')

  await flushPromises()

  expect(wrapper.text()).toContain('Residence')
})

it('Clicking on the "Tech and Summary" button in the side menu navigates to that page', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.RESIDENCE_TECH

  await flushPromises()

  const titleButton = wrapper.find('#techButton')

  titleButton.trigger('click')

  await flushPromises()

  expect(wrapper.text()).toContain('Summary')
})

it('Clicking on the "World Generation" button in the side menu navigates to that page', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.RESIDENCE_GEN

  await flushPromises()

  const titleButton = wrapper.find('#genButton')

  titleButton.trigger('click')

  await flushPromises()

  expect(wrapper.text()).toContain('Generation')
})

it('Clicking on the "User Interaction" button in the side menu navigates to that page', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.RESIDENCE_INTERACTION

  await flushPromises()

  const titleButton = wrapper.find('#interactionButton')

  titleButton.trigger('click')

  await flushPromises()

  expect(wrapper.text()).toContain('Interaction')
})

it('Clicking on the "Other" button in the side menu navigates to that page', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.RESIDENCE_INTERACTION

  await flushPromises()

  const titleButton = wrapper.find('#otherButton')

  titleButton.trigger('click')

  await flushPromises()

  expect(wrapper.text()).toContain('Other')
})
