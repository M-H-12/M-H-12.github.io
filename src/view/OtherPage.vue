<script setup lang="ts">
import { ScreenType } from '@/model/ScreenType'
import { useScrollUtil } from '@/stores/scrollUtil'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

/**
 * The store for the scrolling utility.
 */
const scrollUtil = useScrollUtil()

/**
 * The position of the view - kept within the scroll util store
 * for code reuse.
 */
const { pagePosition } = storeToRefs(scrollUtil)

/**
 * Code to run when the page is mounted.
 * Contains the setup for the scrolling/swipe event listeners
 */
onMounted(() => {
  scrollUtil.setupScroll(ScreenType.OTHER, ScreenType.RESIDENCE_INTERACTION)
})
</script>

<template>
  <div :class="$style.mainSegment">
    <div :class="$style.topTriangle"></div>
    <div :class="$style.titleText">Other</div>
    <div :class="$style.mainText">
      While Residence is my primary passion project, as I mentioned before, it's still very much a
      work-in-progress. One other project that I've been working on which is completed is this site!
      It's written in Vue.js, and the code is public and available for viewing
      <a href="https://github.com/M-H-12/M-H-12.github.io" :class="$style.githubLink">here</a>.
      <br />
      <br />
      Thank you for taking the time to view my site. If you came here using a link provided by me
      and wish to send me a message, please use the contact information that was provided with the
      link. Thank you!
    </div>
    <div :class="$style.bottomTriangle"></div>
  </div>
</template>

<style module>
@import '@/styling/OtherPage.module.css';
</style>
