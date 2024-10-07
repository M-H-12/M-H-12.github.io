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

  return {
    currentScreen
  }
})
