import { MenuColour } from '@/model/MenuColour'
import { ScreenType } from '@/model/ScreenType'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Used for keeping track of information throughout the app.
 */
export const useGlobalVariables = defineStore('globalVariables', () => {
  /**
   * The screen that the user is currently looking at.
   */
  const currentScreen = ref(ScreenType.TITLE)

  /**
   * Indicates if the hamburger menu is open.
   */
  const menuOpen = ref(false)

  /**
   * Used to change the hamburger menu colour depending on the page.
   */
  const menuIconColour = ref(MenuColour.DARK)

  /**
   * The colour for the menu background.
   */
  const menuColour = ref(MenuColour.LIGHT)

  /**
   * Used to indicate when the dimmer should be present.
   * The dimmer should not be present when the menu is closed. Even if it is invisible,
   * it will prevent links from being clicked.
   */
  const dimmerPresent = ref(false)

  return {
    currentScreen,
    menuOpen,
    menuIconColour,
    menuColour,
    dimmerPresent
  }
})
