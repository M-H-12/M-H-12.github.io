import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useGlobalVariables } from '@/stores/globalVariables'
import { ScreenType } from '@/model/ScreenType'
import { MenuColour } from '@/model/MenuColour'
import { useMenuUtil } from './menuUtil'
import { useBallUtil } from './ballUtil'

export const useScrollUtil = defineStore('scrollUtil', () => {
  /**
   * Dictionary used to define the menu colour for each
   * screen in landscape mode.
   */
  const colourDictionaryLandscape = {
    PROJECTS_INTRO: MenuColour.DARK,
    RESIDENCE_INTRO: MenuColour.LIGHT,
    RESIDENCE_TECH: MenuColour.LIGHT,
    RESIDENCE_GEN: MenuColour.LIGHT,
    RESIDENCE_INTERACTION: MenuColour.LIGHT,
    OTHER: MenuColour.DARK,
    FINAL: MenuColour.LIGHT
  } as any

  /**
   * Dictionary used to define the menu colour for each
   * screen in portrait mode.
   */
  const colourDictionaryPortrait = {
    PROJECTS_INTRO: MenuColour.DARK,
    RESIDENCE_INTRO: MenuColour.LIGHT,
    RESIDENCE_TECH: MenuColour.DARK,
    RESIDENCE_GEN: MenuColour.LIGHT,
    RESIDENCE_INTERACTION: MenuColour.LIGHT,
    OTHER: MenuColour.DARK,
    FINAL: MenuColour.LIGHT
  } as any

  /**
   * Indicates if the page is already scrolling - prevents the view from getting stuck.
   */
  let actionInProgress = false

  /**
   * The vertical position of the title page (in vh)
   */
  const pagePosition = ref(0)

  /**Indicates whether or not elements should have a drop-shadow.
   *  'shadow' means they should, 'no-shadow' means they shouldn't.
   * Used to improve scrolling performance on low-end devices. */
  const currentShadowStyle = ref('shadow')

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
   * Boolean value used to determine if the user can scroll.
   * Only applies in the case where a user is on mobile, and
   * they have just released the ball on the final page. There
   * is a slight delay before setting this value to true to
   * prevent unwanted scrolling.
   */
  const canScroll = ref(true)

  /**
   * The global variables for the app - kept in a pinia store.
   */
  const globalVariables = useGlobalVariables()

  /**
   * The app's current screen - kept as a ref so the page can react to any changes
   * in the variable.
   * The menu icon colour, and the menu (background) colour. Set on scroll - I.E. as
   * soon as the page loads.
   */
  const { currentScreen, menuIconColour, menuColour } = storeToRefs(globalVariables)

  /**
   * Utilities relating to the opening/closing of the side menu.
   */
  const menuUtil = useMenuUtil()

  /**
   * BallUtil used to control the ball's movement.
   */
  const ballUtil = useBallUtil()

  /**
   * Global ref used to determine if the user is holding the ball.
   */
  const { userHeld } = storeToRefs(ballUtil)

  /**
   * Boolean value indicating if a user is on mobile.
   */
  const mobile = ref(false)

  /**
   * The interval for the closing animation. The interval runs
   * every 8 ms, and is responsible for changing the main div's
   * vertical position.
   */
  let interval: NodeJS.Timeout

  /**
   * The speed for the interval - changes depending on the users's
   * browser and hardware type.
   */
  const scrollSpeed = getScrollSpeed()

  /**
   * The y-position of the user's initial touch.
   */
  let touchStartYPos = 0

  /**
   * The y-position of the user's final touch.
   */
  let touchEndYPos = 0

  /**
   * This function is used to obtain the correct scroll interval time.
   * - Firefox adds an additional delay, so its interval time needs to be very short (8ms).
   * - The animation appears choppy on mobile devices if the interval is set too high, so
   *   it must also be shorter (12ms).
   * - Every other browser has an interval time of 15ms.
   * @returns The interval in ms.
   */
  function getScrollSpeed() {
    if (navigator.userAgent.toUpperCase().includes('MOBILE')) {
      return 12
    }

    return navigator.userAgent.toUpperCase().includes('FIREFOX') ? 8 : 15
  }

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

  /**
   * Function triggered on wheel scroll. Used to
   * transition to the next screen.
   * @param event The wheel scroll event.
   */
  async function wheelScroll(event: any) {
    mobile.value = false

    // This conditional filters out most lingering track pad scroll events,
    // and prevents unintentional double scrolls.
    if (Math.abs(event.wheelDelta) < 60) {
      return
    }

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
   * The function to determine if a user has stopped touching the screen
   * (for mobile, used in event listener).
   * @param e The user's touch event.
   */
  function endTouch(e: TouchEvent) {
    if (!canScroll.value) {
      return
    }

    touchEndYPos = e.changedTouches[0].screenY
    mobile.value = true

    //Note: This conditional is used to prevent the screen from scrolling when the user
    //tries to click on the menu on mobile. A "tap" where the user moves less that 50px
    //will open the menu, but won't scroll.
    if (Math.abs(touchEndYPos - touchStartYPos) < 50) {
      return
    }

    checkScroll(checkScrollingDown())
  }

  /**
   * The function called when the user scrolls/swipes. This function
   * sets the interval if it hasn't been set already.
   * @param scrollingDown Used to indicate if the user is scrolling down.
   */
  function checkScroll(scrollingDown: boolean) {
    if (actionInProgress) {
      return
    }
    if (pagePosition.value == 0 && scrollingDown) {
      currentShadowStyle.value = 'no-shadow'
      actionInProgress = true
      interval = setInterval(slideToNextPage, scrollSpeed)
    } else if (!scrollingDown) {
      currentShadowStyle.value = 'no-shadow'
      actionInProgress = true
      currentScreen.value = previousScreen.value
      refreshMenu(currentScreen.value)
      menuUtil.resetMenu()
      actionInProgress = false
      currentShadowStyle.value = 'shadow'
    }
  }

  /**
   * This function is used to change the colours of the side menu & icon
   * when the view changes.
   */
  function refreshMenu(newScreen: ScreenType) {
    if (window.innerHeight > window.innerWidth) {
      menuIconColour.value = colourDictionaryPortrait[newScreen]
    } else {
      menuIconColour.value = colourDictionaryLandscape[newScreen]
    }

    if (menuIconColour.value == MenuColour.DARK) {
      menuColour.value = MenuColour.LIGHT
    } else {
      menuColour.value = MenuColour.DARK
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
      refreshMenu(nextScreen.value)
      menuUtil.resetMenu()
      currentScreen.value = nextScreen.value
      actionInProgress = false
      currentShadowStyle.value = 'shadow'
    }
  }

  /**
   * Used to determine which direction the user has swiped if they're
   * on mobile. "Tapping" on the screen (i.e. a user moving their finger
   * less than 7px) will result in the page scrolling down.
   */
  function checkScrollingDown() {
    if (touchEndYPos <= touchStartYPos) {
      return true
    } else {
      return false
    }
  }

  return {
    currentShadowStyle,
    pagePosition,
    mobile,
    scrollSpeed,
    canScroll,
    setupScroll,
    takedownScroll,
    refreshMenu
  }
})
