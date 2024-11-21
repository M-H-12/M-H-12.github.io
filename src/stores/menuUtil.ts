import { defineStore, storeToRefs } from 'pinia'
import { useGlobalVariables } from '@/stores/globalVariables'
import { ref } from 'vue'

export const useMenuUtil = defineStore('menuUtil', () => {
  /**
   * An incremental count used to animate the menu opening/closing.
   * I.e. The menu's x position is based on a parabolic function
   * to facilitate smooth opening/closing. A linear x is input to get the
   * output position (y). The "count" variable is the x.
   */
  const count = ref(20)

  /**
   * The current position of the side menu.
   */
  const menuPosition = ref(-20)

  /**
   * The opacity of the dimmer. Has a max value of 0.4 so
   * users can still see the page content when the menu is open.
   */
  const dimmerOpacity = ref(0)

  /**
   * Boolean value used to prevent users from "spamming" the menu,
   * which would break it. The animation cannot be started unless
   * it is not already in progress.
   */
  let animationInProgress = false

  /**
   * The interval for the menu sliding open/closed.
   */
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
    dimmerOpacity.value = 0
  }

  /**
   * Function to toggle the side menu open/closed.
   */
  function toggleMenu() {
    menuOpen.value = !menuOpen.value
    if (animationInProgress) {
      return
    } else {
      animationInProgress = true
    }
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
      animationInProgress = false
    }
    dimmerOpacity.value = (20 - count.value) / 50
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
      animationInProgress = false
    }
    dimmerOpacity.value = (20 - count.value) / 50
  }

  return { menuPosition, dimmerOpacity, toggleMenu, resetMenu }
})
