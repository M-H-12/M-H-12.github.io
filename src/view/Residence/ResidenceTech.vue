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
  scrollUtil.setupScroll(ScreenType.RESIDENCE_TECH, ScreenType.RESIDENCE_INTRO)
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
    <div :class="$style.leftSegment">
      <div :class="$style.titleContainer">
        <div :class="$style.titleText">Residence</div>
        <div :class="$style.subTitle">Summary and Technology</div>
      </div>
      <div :class="$style.bottomLeftSegment"></div>
    </div>
    <div :class="$style.rightSegment"></div>
  </div>
</template>

<style module>
@import '@/styling/ResidenceTech.module.css';
</style>
