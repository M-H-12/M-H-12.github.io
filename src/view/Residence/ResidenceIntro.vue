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
    <div>
      <div :class="$style.titleContainer">
        <div class="section-text">Residence</div>
      </div>
      <div :class="$style.bottomSegment">
        <div :class="$style.bodyText">
          Residence is a passion project of mine that began several months ago. I started on this
          project as a way to expand my skills with Vue.js, as well as to take on a project which
          would have unique variety of programming challenges.
          <br />
          <br />
          <div :class="$style.lowerContent">
            <div :class="$style.textLower">
              Like many people, my first introduction to programming came in my early teens through
              video games. I was fascinated by how they worked, and hoped to create one of my own
              one day. Thinking back to this memory, I started designing this project, and gave it
              the working title of "Residence".
              <br />
              <br />
              While the project is still very much in progress, it's come a long way from the
              original idea, and has done more than just expand my programming knowledge and
              expertise.
            </div>
            <div :class="$style.imageContainer">
              <img :class="$style.image" src="@/assets/residenceIntro/titleImage.png" />
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
