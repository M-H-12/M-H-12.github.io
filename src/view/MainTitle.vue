<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useScrollUtil } from '@/stores/scrollUtil'
import { storeToRefs } from 'pinia'
import { ScreenType } from '@/model/ScreenType'

/**
 * Utility for setting up and taking down the scrolling/scrolling animations.
 */
const scrollUtil = useScrollUtil()

/**
 * Variable to keep track of the page's vertical position on for the "scroll down" animation.
 */
const { pagePosition } = storeToRefs(scrollUtil)

/**
 * The angle for the drop shadow, in radians.
 */
const shadowAngle = ref(0)

/**
 * Code to run when the page is mounted.
 * Contains:
 * - The initialization of an event listener, so we know when the page is resized.
 * - The calling of the getAngle function, so the drop shadow will have the correct angle on load.
 * - The setup for the scrolling/swipe event listeners
 */
onMounted(() => {
  window.addEventListener('resize', getAngle)
  scrollUtil.setupScroll(ScreenType.PROJECTS_INTRO, ScreenType.TITLE)
  getAngle()
})

/**
 * Code to run when the page is unmounted.
 * Contains the removal of an event listener (cleanup).
 */
onUnmounted(() => {
  window.removeEventListener('resize', getAngle)
  scrollUtil.takedownScroll()
})

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
        <div class="text-box-centre">
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
