<script setup lang="ts">
import { useGlobalVariables } from '@/stores/globalVariables'
import { useMenuUtil } from '@/stores/menuUtil'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const lineAngle = ref(0)

const topLinePosition = ref(0)

const bottomLinePosition = ref(1.4)

/**
 * The global variables for the app - kept in a pinia store.
 */
const globalVariables = useGlobalVariables()

/**
 * The colour of the menu icon - changes depending on the current view.
 */
const { menuIconColour } = storeToRefs(globalVariables)

/**
 * The menu util store - used to control the positioning of the menu icons
 */
const menuUtil = useMenuUtil()

/**
 * The position of the menu in reference to the right side of the screen.
 */
const { count } = storeToRefs(menuUtil)

function setAngle() {
  lineAngle.value = Math.max(0, -4.5 * count.value + 45)
}

function setPositions() {
  const slope = 0.7 / 9

  topLinePosition.value = Math.min(0.7, -slope * count.value + 14 / 9)
  bottomLinePosition.value = Math.max(0.7, slope * count.value - 7 / 45)
}

watch(count, () => {
  setAngle()
  setPositions()
})
</script>

<template>
  <div :class="$style.menuContainer">
    <div
      :class="$style.topLine"
      :style="{
        backgroundColor: `${menuIconColour}`,
        transform: `rotate(-${lineAngle}deg)`,
        top: `${topLinePosition}rem`
      }"
    ></div>
    <div
      :class="$style.middleLine"
      :style="{
        backgroundColor: `${menuIconColour}`,
        transform: `rotate(${lineAngle}deg)`
      }"
    ></div>
    <div
      :class="$style.bottomLine"
      :style="{
        backgroundColor: `${menuIconColour}`,
        transform: `rotate(${lineAngle}deg)`,
        top: `${bottomLinePosition}rem`
      }"
    ></div>
  </div>
</template>

<style module>
@import '@/styling/MenuIcon.module.css';
</style>
