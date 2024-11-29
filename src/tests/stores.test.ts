import { expect, it, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import App from '@/App.vue'
import { useGlobalVariables } from '@/stores/globalVariables'
import { ScreenType } from '@/model/ScreenType'
import { useMenuUtil } from '@/stores/menuUtil'
import { useBallUtil } from '@/stores/ballUtil'
import FinalPage from '@/view/FinalPage.vue'
import { useScrollUtil } from '@/stores/scrollUtil'

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

  wrapper.unmount()
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

  wrapper.unmount()
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

  wrapper.unmount()
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

  wrapper.unmount()
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

  wrapper.unmount()
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

  wrapper.unmount()
})

it('Clicking on the "Tech and Concept" button in the side menu navigates to that page', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.RESIDENCE_TECH

  await flushPromises()

  const titleButton = wrapper.find('#techButton')

  titleButton.trigger('click')

  await flushPromises()

  expect(wrapper.text()).toContain('Concept')

  wrapper.unmount()
})

it('Clicking on the "Level Generation" button in the side menu navigates to that page', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.RESIDENCE_GEN

  await flushPromises()

  const titleButton = wrapper.find('#genButton')

  titleButton.trigger('click')

  await flushPromises()

  expect(wrapper.text()).toContain('Generation')

  wrapper.unmount()
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

  wrapper.unmount()
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

  wrapper.unmount()
})

it('Changing from landscape to portrait on the residence tech page will change the menu icon colour', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  global.innerWidth = 1800
  global.innerHeight = 1000

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.RESIDENCE_TECH

  await flushPromises()

  global.innerWidth = 600
  window.dispatchEvent(new Event('resize'))

  await flushPromises()

  const menuTopLine = wrapper.find('#menuTopLine')

  await flushPromises()

  expect(getComputedStyle(menuTopLine.element).getPropertyValue('background-color')).toBe(
    'rgb(25, 6, 42)'
  )

  wrapper.unmount()
})

it('Final page ball will enter screen correctly on load', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  global.innerWidth = 1800
  global.innerHeight = 1000

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  currentScreen.value = ScreenType.FINAL

  await flushPromises()

  //Wait 1 second for the ball to enter the screen.
  await new Promise((resolve) => setTimeout(resolve, 1000))

  await flushPromises()

  const ball = wrapper.find('#ball')

  await flushPromises()

  expect(
    Number(getComputedStyle(ball.element).getPropertyValue('bottom').slice(0, -2))
  ).toBeLessThan(global.innerHeight)

  wrapper.unmount()
})

it('Throwing the ball quickly (x-direction) will still keep it on screen', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  global.innerWidth = 1800
  global.innerHeight = 1000

  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  const ballUtil = useBallUtil()

  currentScreen.value = ScreenType.FINAL

  await flushPromises()

  ballUtil.simulateMovement(0, 100)

  await flushPromises()

  //Wait 1 second to allow the ball to bounce a few times.
  await new Promise((resolve) => setTimeout(resolve, 1000))

  await flushPromises()

  const ball = wrapper.find('#ball')

  expect(Number(getComputedStyle(ball.element).bottom.slice(0, -2))).toBeLessThan(
    global.innerHeight
  )

  wrapper.unmount()
})

it('The ball will move with the mouse after being clicked on.', async () => {
  const wrapper = mount(FinalPage, { attachTo: document.body })

  global.innerWidth = 1800
  global.innerHeight = 1000

  const ballUtil = useBallUtil()

  await flushPromises()

  ballUtil.setBallPosition(400, 400)

  const event = new MouseEvent('mousemove', {
    clientX: 440,
    clientY: global.innerHeight - 440,
    bubbles: true,
    cancelable: true
  })

  document.dispatchEvent(event)

  await flushPromises()

  document.getElementById('ball')?.click()

  await flushPromises()

  await new Promise((resolve) => setTimeout(resolve, 1000))

  await flushPromises()

  const eventTwo = new MouseEvent('mousemove', {
    clientX: 340,
    clientY: 400,
    bubbles: true,
    cancelable: true
  })

  document.dispatchEvent(eventTwo)

  await flushPromises()

  const ball = wrapper.find('#ball')

  expect(Number(getComputedStyle(ball.element).left.slice(0, -2))).toBe(300)

  wrapper.unmount()
})

it('Dropping the ball slowly will result in it coming to a stop.', async () => {
  const wrapper = mount(FinalPage, { attachTo: document.body })

  global.innerWidth = 1800
  global.innerHeight = 1000

  const ballUtil = useBallUtil()

  await flushPromises()

  ballUtil.setBallPosition(2, 2)

  const event = new MouseEvent('mousemove', {
    clientX: 42,
    clientY: global.innerHeight - 42,
    bubbles: true,
    cancelable: true
  })

  document.dispatchEvent(event)

  await flushPromises()

  document.getElementById('ball')?.click()

  await flushPromises()

  const eventTwo = new MouseEvent('mousemove', {
    clientX: 41,
    clientY: global.innerHeight - 41,
    bubbles: true,
    cancelable: true
  })

  document.dispatchEvent(eventTwo)

  await flushPromises()

  document.getElementById('mainBackingFinal')?.click()

  /**Wait a bit for ball to come to a stop */
  await new Promise((resolve) => setTimeout(resolve, 2000))

  //Normally unit tests should not have 2 conditions, however,
  //due to both accelerations needing to be 0 in order for the
  //ball to be considered "stopped", I have added two expects
  //in this case.
  expect(ballUtil.xAcceleration).toBe(0)
  expect(ballUtil.yAcceleration).toBe(0)

  wrapper.unmount()
})

it('Swiping down on the other screen (mobile) results in the page not changing.', async () => {
  const globalVariables = useGlobalVariables()

  const { currentScreen } = storeToRefs(globalVariables)

  const scrollUtil = useScrollUtil()

  const { mobile } = storeToRefs(scrollUtil)

  mobile.value = true

  currentScreen.value = ScreenType.OTHER

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

  expect(wrapper.text().includes('Other')).toBe(true)

  wrapper.unmount()
})
