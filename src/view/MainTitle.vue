<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
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
 * Code to run when the page is mounted.
 * Contains:
 * - The initialization of an event listener, so we know when the page is resized.
 * - The setup for the scrolling/swipe event listeners
 */
onMounted(() => {
  scrollUtil.setupScroll(ScreenType.PROJECTS_INTRO, ScreenType.TITLE)
})

/**
 * Code to run when the page is unmounted.
 * Contains the removal of an event listener (cleanup).
 */
onUnmounted(() => {
  scrollUtil.takedownScroll()
})
</script>

<template>
  <div
    id="mainTitleMainComponent"
    :class="$style.pageBacking"
    :style="{ top: `${pagePosition}vh` }"
  >
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
    <div :class="$style.mainSegment"></div>
  </div>
</template>

<style module>
@import '@/styling/MainTitle.module.css';
</style>
