import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useGlobalVariables } from '@/stores/globalVariables'
import { ScreenType } from '@/model/ScreenType'

export const useScrollUtil = defineStore('scrollUtil', () => {
  /**
   * Indicates if the page is already scrolling - prevents the view from getting stuck.
   */
  let actionInProgress = false

  /**
   * The vertical position of the title page (in vh)
   */
  const pagePosition = ref(0)

  /**
   * The input value for the closing animation. This is used to
   * position the div based on a parabolic function. This gives the
   * animation a smoother look, as opposed to letting it slide up
   * linearly.
   */
  const count = ref(0)

  /**
   * The next screen available when the user scrolls down.
   */
  const nextScreen = ref(ScreenType.PROJECTS_INTRO)

  /**
   * The previous screen that the user may scroll back up to.
   */
  const previousScreen = ref(ScreenType.TITLE)

  /**
   * The global variables for the app - kept in a pinia store.
   */
  const globalVariables = useGlobalVariables()

  /**
   * The app's current screen - kept as a ref so the page can react to any changes
   * in the variable.
   */
  const { currentScreen } = storeToRefs(globalVariables)

  /**
   * The interval for the closing animation. The interval runs
   * every 8 ms, and is responsible for changing the main div's
   * vertical position.
   */
  let interval: NodeJS.Timeout

  /**
   * The y-position of the user's initial touch.
   */
  let touchStartYPos = 0

  /**
   * The y-position of the user's final touch.
   */
  let touchEndYPos = 0

  /**
   * The function to set up all scrolling event listeners.
   * @param nextScreenType The next screen the user may scroll to.
   * @param previousScreenType The previous screen the user may scroll back to.
   */
  function setupScroll(nextScreenType: ScreenType, previousScreenType: ScreenType) {
    nextScreen.value = nextScreenType
    previousScreen.value = previousScreenType
    document.addEventListener('wheel', wheelScroll)
    document.addEventListener('touchstart', startTouch)
    document.addEventListener('touchend', endTouch)
  }

  /**
   * The function to take down all the previous event listeners.
   */
  function takedownScroll() {
    document.removeEventListener('touchstart', startTouch)
    document.removeEventListener('touchend', endTouch)
    document.removeEventListener('wheel', wheelScroll)
    pagePosition.value = 0
    count.value = 0
  }

  function wheelScroll(event: any) {
    checkScroll(event.wheelDelta < 0)
  }

  /**
   * The function to determine if a user has started touching the screen (for mobile, used in event listener).
   * @param e The user's touch event.
   */
  function startTouch(e: TouchEvent) {
    touchStartYPos = e.changedTouches[0].screenY
  }

  /**
   * The function to determine id a user has stopped touching the screen (for mobile, used in event listener).
   * @param e The user's touch event.
   */
  function endTouch(e: TouchEvent) {
    touchEndYPos = e.changedTouches[0].screenY
    checkScroll(checkScrollDirection())
  }

  /**
   * The function called by the onwheel event. This function
   * sets the interval if it hasn't been set already.
   * @param scrollingDown Used to indicate if the user is scrolling down.
   */
  function checkScroll(scrollingDown: boolean) {
    if (actionInProgress) {
      return
    }
    if (pagePosition.value == 0 && scrollingDown) {
      actionInProgress = true
      interval = setInterval(slideToNextPage, 8)
    } else if (!scrollingDown) {
      actionInProgress = true
      currentScreen.value = previousScreen.value
      actionInProgress = false
    }
  }

  /**
   * The function used to re-position the main div. It is called
   * by the interval every 8 ms. The div's vertical position is
   * calculated using a parabolic function in order to give it a
   * smoother transition.
   */
  function slideToNextPage() {
    if (pagePosition.value >= -100) {
      count.value += 1
      pagePosition.value = (count.value * count.value) / -50
    } else {
      clearInterval(interval)
      currentScreen.value = nextScreen.value
      actionInProgress = false
    }
  }

  /**
   * Used to determine which direction the user has swiped if they're
   * on mobile.
   */
  function checkScrollDirection() {
    if (touchEndYPos < touchStartYPos) {
      return true
    } else {
      return false
    }
  }

  return { pagePosition, setupScroll, takedownScroll }
})
