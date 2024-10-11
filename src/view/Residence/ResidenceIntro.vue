<script setup lang="ts">
import { ScreenType } from '@/model/ScreenType'
import { useScrollUtil } from '@/stores/scrollUtil'
import { onMounted, onUnmounted } from 'vue'

/**
 * The store for the scrolling utility.
 */
const scrollUtil = useScrollUtil()

/**
 * Code to run when the page is mounted.
 * Contains the setup for the scrolling/swipe event listeners
 */
onMounted(() => {
  scrollUtil.setupScroll(ScreenType.RESIDENCE_INTRO, ScreenType.PROJECTS_INTRO)
})

/**
 * Code to run when the page is unmounted.
 * Contains the removal of event listeners (cleanup).
 */
onUnmounted(() => {
  scrollUtil.takedownScroll()
})
</script>

<template>
  <div :class="$style.mainSegment">
    <br />
    <div class="text-box-left">
      <div class="section-text">Residence</div>
    </div>
  </div>
</template>

<style module>
@import '@/styling/ResidenceIntro.module.css';
</style>
