<script setup lang="ts">
import { ScreenType } from '@/model/ScreenType'
import { useScrollUtil } from '@/stores/scrollUtil'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue'

/**
 * The store for the scrolling utility.
 */
const scrollUtil = useScrollUtil()

/**
 * currentShadowStyle: A variable controlling the site's drop-shadows. Used for performance improvements
 * on mid to low end devices.
 *
 * pagePosition: The page's position, in vh, with respect to the top of the screen.
 *
 * mobile: boolean value indicating if the user is on mobile.
 *
 */
const { currentShadowStyle, pagePosition, mobile } = storeToRefs(scrollUtil)

/**
 * Code to run when the page is mounted.
 * Contains the setup for the scrolling/swipe event listeners
 */
onMounted(() => {
  if (mobile.value) {
    scrollUtil.setupScroll(ScreenType.OTHER, ScreenType.RESIDENCE_INTERACTION)
  } else {
    scrollUtil.setupScroll(ScreenType.FINAL, ScreenType.RESIDENCE_INTERACTION)
  }
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
  <div class="main-segment-light" :style="{ top: `${mobile ? 0 : pagePosition}vh` }">
    <div :class="[$style.topTriangle, currentShadowStyle]" style="z-index: 0"></div>
    <div :class="$style.titleText">Other</div>
    <div :class="$style.mainText">
      While Residence is my primary project, I do have one other to show - this website! It's
      written in Vue.js, fully unit tested, and the code is publicly available for viewing
      <a href="https://github.com/M-H-12/M-H-12.github.io" :class="$style.githubLink">here</a>.
      <br />
      <br />
      Thank you for taking the time to view my site. If you came here using a link provided by me
      and wish to send me a message, please use the contact information that was provided with the
      link. Thank you!
    </div>
    <div :class="[$style.bottomTriangle, currentShadowStyle]"></div>
  </div>
</template>

<style module>
@import '@/styling/OtherPage.module.css';
</style>
