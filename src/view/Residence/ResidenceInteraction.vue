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
  scrollUtil.setupScroll(ScreenType.OTHER, ScreenType.RESIDENCE_GEN)
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
  <div class="main-segment-light" :style="{ top: `${pagePosition}vh` }">
    <div :class="$style.topBar">
      <div :class="$style.titleContainer">
        <div :class="$style.titleText">Residence</div>
        <div :class="$style.subTitle">User Interaction</div>
      </div>
    </div>
    <img
      src="@/assets/residenceInteraction/gameplay.gif"
      :class="$style.gif"
      alt="A gif showing a player moving through different rooms before opening up a treasure chest."
    />
    <div :class="$style.rightBar">
      <div :class="$style.bodyText">
        <div :class="$style.secondSubTitle">Interaction</div>
        Aside from level generation, one of the most important aspects of any game is user
        interaction. Currently, there are 2 main kinds of user interaction - movement, and
        opening/closing menus.
        <br />
        <br />
        <div :class="$style.secondSubTitle">Movement</div>
        Player movement is controlled by keys which are defined in the settings menu. By default,
        the keys are W, A, S, and D. Player movement is restricted by the walls of each room (i.e.
        players stop moving if they walk into a wall), and if a player enters a doorway they move to
        the next room over. Additionally, users are not able to walk through objects, like treasure
        chests.
        <br />
        <br />
        <div :class="$style.secondSubTitle">Menus</div>
        Different menus can be opened by either using set keys (such as "Esc" for the user's
        inventory), or by clicking on interactable objects (such as treasure chests).
      </div>
    </div>
  </div>
</template>

<style module>
@import '@/styling/ResidenceInteraction.module.css';
</style>
