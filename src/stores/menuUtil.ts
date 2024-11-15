import { defineStore, storeToRefs } from 'pinia'
import { useGlobalVariables } from '@/stores/globalVariables'
import { ref } from 'vue'

export const useMenuUtil = defineStore('menuUtil', () => {
  const count = ref(20)

  const menuPosition = ref(-20)

  let interval: NodeJS.Timeout

  /**
   * The global variables for the app - kept in a pinia store.
   */
  const globalVariables = useGlobalVariables()

  /**
   * The boolean value used to indicate if the hamburger menu is open or not.
   */
  const { menuOpen } = storeToRefs(globalVariables)

  /**
   * Function used to reset the side menu to it's default state - closed.
   */
  function resetMenu() {
    count.value = 20
    menuPosition.value = -20
    menuOpen.value = false
  }

  /**
   * Function to toggle the side menu open/closed.
   */
  function toggleMenu() {
    menuOpen.value = !menuOpen.value
    if (menuOpen.value) {
      interval = setInterval(slideMenuOpen, 8)
    } else {
      interval = setInterval(slideMenuClosed, 8)
    }
  }

  /**
   * Function used to slide the side menu open. Uses a parabolic function
   * to make the slide smooth.
   */
  function slideMenuOpen() {
    if (menuPosition.value < 0) {
      count.value -= 1
      menuPosition.value = Math.pow(count.value, 2) / -20
    } else {
      clearInterval(interval)
    }
  }

  /**
   * Function used to slide the side menu closed. Uses a parabolic function
   * to make the slide smooth.
   */
  function slideMenuClosed() {
    if (menuPosition.value > -20) {
      count.value += 1
      menuPosition.value = Math.pow(count.value - 20, 2) / 20 - 20
    } else {
      clearInterval(interval)
    }
  }

  return { menuPosition, toggleMenu, resetMenu }
})
