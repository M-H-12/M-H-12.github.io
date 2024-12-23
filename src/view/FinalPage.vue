<script setup lang="ts">
import { ScreenType } from '@/model/ScreenType'
import { useBallUtil } from '@/stores/ballUtil'
import { useScrollUtil } from '@/stores/scrollUtil'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * BallUtil used to control the ball's movement.
 */
const ballUtil = useBallUtil()

/**
 * Global refs used to control & set the ball's position, previous position, and acceleration.
 */
const { xPos, yPos, previousX, previousY, xAcceleration, yAcceleration } = storeToRefs(ballUtil)

/**
 * The store for the scrolling utility.
 */
const scrollUtil = useScrollUtil()

/**
 * currentShadowStyle: A variable controlling the site's drop-shadows. Used for performance improvements
 * on mid to low end devices.
 */
const { currentShadowStyle } = storeToRefs(scrollUtil)

/**
 * Boolean indicating if the user has just released the ball.
 */
const firstRelease = ref(false)

/**
 * Boolean indicating if the user is currently
 * holding the ball.
 */
const userHeld = ref(false)

/**
 * The interval that the ball's movement runs on.
 */
let interval: NodeJS.Timeout

/**
 * Function used to set the ball's position when the user is holding it.
 *
 * The ball's position is confined to the borders of the screen, even if the user moves their mouse to the very edge.
 * @param event The mouse movement event.
 */
function setBallPosition(event: MouseEvent) {
  if (userHeld.value) {
    firstRelease.value = true

    previousX.value = xPos.value
    previousY.value = yPos.value

    xPos.value = Math.max(Math.min(event.clientX - 40, window.innerWidth - 80), 0)
    yPos.value = Math.max(
      Math.min(window.innerHeight - event.clientY - 40, window.innerHeight - 80),
      0
    )
  }
}

/**
 * The function used to simulate the ball bouncing. It is run every 30ms.
 */
function runBallBounce() {
  if (!userHeld.value) {
    if (firstRelease.value) {
      xAcceleration.value = (xPos.value - previousX.value) * 1.2
      yAcceleration.value = (yPos.value - previousY.value) * 1.2
      firstRelease.value = false
    }
    ballUtil.moveBallX()
    ballUtil.moveBallY()
  }
}

/**
 * The function used to simulate the ball's initial drop onto the screen.
 * Once the ball appears on screen, this function's interval is cleared, and the
 * other interval is set to allow for regular bouncing.
 */
function initialBallMovement() {
  if (yPos.value < window.innerHeight - 80) {
    clearInterval(interval)
    interval = setInterval(runBallBounce, 30)
  } else {
    yPos.value -= 15
  }
}

/**
 * Code to run when the page is mounted.
 * Contains the setup for the scrolling/swipe/mousemove event listeners,
 * and sets the initial ball movement interval.
 */
onMounted(() => {
  scrollUtil.setupScroll(ScreenType.FINAL, ScreenType.OTHER)
  interval = setInterval(initialBallMovement, 30)
  addEventListener('mousemove', setBallPosition)
})

/**
 * Code to run when the page is unmounted.
 * Contains the removal of the scrolling/mousemove event listeners, and clears the ball
 * bouncing interval.
 */
onUnmounted(() => {
  scrollUtil.takedownScroll()
  clearInterval(interval)
  removeEventListener('mousemove', setBallPosition)
})
</script>

<template>
  <div id="mainBackingFinal" class="main-segment-dark" @click="userHeld = false"></div>
  <div
    id="ball"
    :class="[$style.ball, currentShadowStyle]"
    :style="{ left: `${xPos}px`, bottom: `${yPos}px`, zIndex: 5 }"
    @click="userHeld = !userHeld"
  ></div>
</template>

<style module>
@import '@/styling/FinalPage.module.css';
</style>
