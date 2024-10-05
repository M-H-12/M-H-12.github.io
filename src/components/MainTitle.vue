<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * The angle for the drop shadow, in radians.
 */
const shadowAngle = ref(0)

/**
 * Code to run when the page is mounted.
 * Contains:
 * - The initialization of an event listener, so we know when the page is resized.
 * - The calling of the getAngle function, so the drop shadow will have the correct angle on load.
 */
onMounted(() => {
  window.addEventListener('resize', getAngle)
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
  <div :class="$style.dropShadow" :style="{ transform: `rotate(${shadowAngle}rad)` }"></div>
  <div :class="$style.mainSegment"></div>
</template>

<style module>
@import '@/styling/MainTitle.module.css';
</style>
