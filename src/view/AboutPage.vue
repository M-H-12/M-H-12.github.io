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
  scrollUtil.setupScroll(ScreenType.RESIDENCE_INTRO, ScreenType.TITLE)
})

/**
 * Code to run when the page is unmounted.
 * Contains the removal of event listeners (cleanup).
 */
onUnmounted(() => {
  scrollUtil.takedownScroll()
})

/**
 * Function used to get the greeting for the page.
 * The greeting changes depending on if it's morning, afternoon, or evening.
 * Morning is defined as before noon, afternoon is defined as before 6PM, and evening is defined as before midnight.
 */
function getTimeGreeting() {
  var currentTime = new Date()

  var morningEnd = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    12,
    0,
    0
  )

  var afternoonEnd = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    18,
    0,
    0
  )

  if (currentTime < morningEnd) {
    return 'Morning!'
  } else if (currentTime < afternoonEnd) {
    return 'Afternoon!'
  } else {
    return 'Evening!'
  }
}
</script>

<template>
  <div :class="$style.mainSegment" :style="{ top: `${pagePosition}vh` }">
    <br />
    <div :class="$style.leftSegment">
      <div class="section-text">About</div>
    </div>
    <div :class="$style.rightSegment">
      <div :class="$style.introParagraphs">
        <div :class="$style.introParagraphsTitle">Good {{ getTimeGreeting() }}</div>
        <br />
        My name is Madison, and I'm a software developer. The majority of my development experience
        lies in libraries and frameworks such as
        <span :class="$style.vueJSText">Vue.js</span> and
        <span :class="$style.reactText">React</span>, however, I've also had the opportunity to work
        on projects in <span :class="$style.cSharpText">C#</span>,
        <span :class="$style.swiftUIText">SwiftUI</span>,
        <span :class="$style.javaText">Java</span>, and
        <span :class="$style.pythonText">Python</span> (among a few others).
        <br />
        <br />
        I'm always up for learning something new, and always eager to try my hand at unique and
        challenging projects.
        <br />
        <br />
        Currently, I'm focused on one main passion project, which can be viewed on the following
        pages.
      </div>
    </div>
  </div>
</template>

<style module>
@import '@/styling/AboutPage.module.css';
</style>
