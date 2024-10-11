//TODO: Fix wheel event unit test.

/*
import { expect, it, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import App from '@/App.vue'

beforeEach(() => {
  setActivePinia(createPinia())
})

it('Swiping down on the title screen results in the project into screen', async () => {
  const wrapper = mount(App, { attachTo: document.body })

  await flushPromises()

  document.dispatchEvent(new WheelEvent('wheel', { deltaY: 1 }))

  //Wait 3 seconds for the scroll animation to finish.
  await new Promise((resolve) => setTimeout(resolve, 3000))

  await flushPromises()

  expect(wrapper.text().includes('About')).toBe(true)

  wrapper.unmount()
})
*/
