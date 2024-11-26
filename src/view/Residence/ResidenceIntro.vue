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
 * The position of the view - kept within the scroll util store
 * for code reuse.
 */
const { pagePosition } = storeToRefs(scrollUtil)

/**
 * Code to run when the page is mounted.
 * Contains the setup for the scrolling/swipe event listeners
 */
onMounted(() => {
  scrollUtil.setupScroll(ScreenType.RESIDENCE_TECH, ScreenType.PROJECTS_INTRO)
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
  <div :class="$style.mainSegment" :style="{ top: `${pagePosition}vh` }">
    <div>
      <div :class="$style.titleContainer">
        <div :class="$style.additionalPadding">
          <div class="section-text">Residence</div>
        </div>
      </div>
      <div :class="$style.bottomSegment">
        <div :class="$style.bodyText">
          Residence is a project of mine that I started on several months ago. It began as a way to
          expand my skills with Vue.js, as well as to take on a variety of complex programming
          challenges.
          <br />
          <br />
          <div :class="$style.lowerContent">
            <div :class="$style.textLower">
              Like many people, my introduction to programming came in my early teens through video
              games. I was fascinated by how they worked, and hoped to create one of my own someday.
              Thinking back on this memory, I started designing the project, and gave it the working
              title "Residence".
              <br />
              <br />
              While the project is still in progress, it's come a long way from the original idea,
              and has far exceeded my initial expectations.
            </div>
            <div :class="$style.imageContainer">
              <img
                :class="$style.image"
                src="@/assets/residenceIntro/titleImage.png"
                alt="Menu screen for the 'Residence' project."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
@import '@/styling/ResidenceIntro.module.css';
</style>
