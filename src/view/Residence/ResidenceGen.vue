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
  scrollUtil.setupScroll(ScreenType.RESIDENCE_INTERACTION, ScreenType.RESIDENCE_TECH)
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
    <div :class="$style.leftBackingTriangle"></div>
    <div :class="$style.rightBackingTriangle"></div>
    <div :class="$style.genSteps">
      <div :class="$style.genStepsTitle">Steps</div>
      I determined the dungeon needed 3 criteria in order to be effective:
      <br />
      &ensp;1. There needed to be enough rooms in the dungeon (25-35).
      <br />
      &ensp;2. All rooms needed to be accessible from the starting room.
      <br />
      &ensp;3. The "goal" room needed to be far enough away from the starting room.
      <br />
      <br />
      <div :class="$style.widerTextBox">
        With these things in mind, I was able to break the level generation process into 9 main
        steps.
        <div :class="$style.thinSpacer"></div>
        <table :class="$style.stepsTable">
          <tbody>
            <tr>
              <td style="white-space: nowrap">Step 1:</td>
              <td>Start with an empty 7x10 grid.</td>
            </tr>
            <tr>
              <td>Step 2:</td>
              <td>Randomly pick one of the cells as the "starting room".</td>
            </tr>
            <tr>
              <td>Step 3:</td>
              <td>
                Go through each cell, and mark whether a cell should be a room based on the 8 cells
                around it. <br />For example, cells with no rooms around them have a 0% chance of
                being a room, cells with 1 room around them have a 90% chance of being a room,
                etc...
                <div :class="$style.thinSpacer"></div>
                While this step generated rooms correctly, it made the map lopsided, favoring the
                bottom right corner over the rest of the map. This had to be rectified in step 4.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :class="$style.bottomTextBox">
        <table :class="$style.stepsTable">
          <tbody>
            <tr>
              <td style="white-space: nowrap">Step 4:</td>
              <td>Run the generation algorithm backwards. (Bottom Right --> Top Left)</td>
            </tr>
            <tr>
              <td>Step 5:</td>
              <td>
                Run a recursive traversal algorithm from the starting room, and mark every reachable
                room.
              </td>
            </tr>
            <tr>
              <td>Step 6:</td>
              <td>Remove rooms which are not marked reachable.</td>
            </tr>
            <tr>
              <td>Step 7:</td>
              <td>
                Pick a room to be the goal room. If it's too close to the starting room, pick
                another one.
              </td>
            </tr>
            <tr>
              <td>Step 8:</td>
              <td>Count the number of rooms.</td>
            </tr>
            <tr>
              <td>Step 9:</td>
              <td>If there are too many or too few rooms, re-run the algorithm.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div :class="$style.titleContainer">
      <div :class="$style.titleText">Residence</div>
      <div :class="$style.subTitle">Level Generation</div>
    </div>
    <div :class="$style.gifBox">
      <img
        src="@/assets/residenceGen/diagram.gif"
        :class="$style.gif"
        alt="A gif showing the 9 steps detailed in the level generation process."
      />
    </div>
  </div>
</template>

<style module>
@import '@/styling/ResidenceGen.module.css';
</style>
