<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * The angle for the drop shadow, in radians.
 */
const shadowAngle = ref(0)

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
 * The interval for the closing animation. The interval runs
 * every 8 ms, and is responsible for changing the main div's
 * vertical position.
 */
var interval: NodeJS.Timeout

/**
 * Code to run when the page is mounted.
 * Contains:
 * - The initialization of an event listener, so we know when the page is resized.
 * - The calling of the getAngle function, so the drop shadow will have the correct angle on load.
 */
onMounted(() => {
  window.addEventListener('resize', getAngle)
  window.onwheel = function () {
    checkScroll()
  }
  getAngle()
})

/**
 * Code to run when the page is unmounted.
 * Contains:
 * - The removal of an event listener (cleanup).
 * -
 */
onUnmounted(() => {
  window.removeEventListener('resize', getAngle)
})

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
  }
}

/**
 * The function called by the onwheel event. This function
 * sets the interval if it hasn't been set already.
 */
function checkScroll() {
  if (pagePosition.value == 0) {
    interval = setInterval(slideToNextPage, 8)
  }
}

/**
 * Function to get the drop shadow's rotation angle. It has to be calculated due to
 * the site potentially being viewed using different screen sizes.
 */
function getAngle() {
  var opp = window.innerHeight
  var adj = window.innerWidth * 0.75

  var ratio = opp / adj

  shadowAngle.value = Math.atan(ratio)
}
</script>

<template>
  <div :class="$style.pageBacking" :style="{ top: `${pagePosition}vh` }">
    <div :class="$style.nameBlock">
      <div class="vert-centre">
        <div class="text-box">
          <div class="title-text">Madison Hill</div>
          <div class="sub-text">Software Developer</div>
        </div>
      </div>
    </div>
    <div :class="$style.arrowContainer">
      <div :class="$style.downArrow">↓</div>
    </div>
    <div :class="$style.dropShadow" :style="{ transform: `rotate(${shadowAngle}rad)` }"></div>
    <div :class="$style.mainSegment"></div>
  </div>
</template>

<style module>
@import '@/styling/MainTitle.module.css';
</style>
