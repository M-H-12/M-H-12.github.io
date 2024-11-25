<script setup lang="ts">
import { ScreenType } from '@/model/ScreenType'
import { useGlobalVariables } from '@/stores/globalVariables'
import { useScrollUtil } from '@/stores/scrollUtil'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue'

/**
 * The global variables for the app - kept in a pinia store.
 */
const globalVariables = useGlobalVariables()

/**
 * The app's current screen.
 */
const { currentScreen } = storeToRefs(globalVariables)

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
 * Function to change the menu icon's colour should the user switch
 * from landscape to portrait or visa-versa. In the event that the
 * event listener doesn't get removed on page dismount, an if
 * statement prevents the function from fully running on other pages.
 */
function adjustMenuIconColour() {
  if (currentScreen.value === ScreenType.RESIDENCE_TECH) {
    scrollUtil.refreshMenu(ScreenType.RESIDENCE_TECH)
  }
}

/**
 * Code to run when the page is mounted.
 * Contains the setup for the scrolling/swipe event listeners, and event listener
 * for the menu icon colour change.
 */
onMounted(() => {
  scrollUtil.setupScroll(ScreenType.RESIDENCE_GEN, ScreenType.RESIDENCE_INTRO)
  addEventListener('resize', adjustMenuIconColour)
})

/**
 * Code to run when the page is unmounted.
 * Contains the removal of event listeners (cleanup).
 */
onUnmounted(() => {
  scrollUtil.takedownScroll()
  removeEventListener('resize', adjustMenuIconColour)
})
</script>

<template>
  <div :class="$style.mainSegment" :style="{ top: `${pagePosition}vh` }">
    <div :class="$style.leftSegment">
      <div :class="$style.titleContainer">
        <div :class="$style.titleText">Residence</div>
        <div :class="$style.subTitle">Technology and Summary</div>
      </div>
      <div :class="$style.bottomLeftSegment">
        <div :class="$style.sectionWidth">
          <div :class="$style.bodyText">
            <h3 style="margin-top: 0">Technology</h3>
            Residence is written using a framework called
            <a href="https://v2.tauri.app/">Tauri</a>. I chose this framework because it allows
            developers to create a native app using the frontend framework of their choice while at
            the same time providing a Rust backend to allow for window and system interaction.
            <br />
            <br />
            As mentioned already, I wanted to work on a project that would heighten my abilities
            with Vue.js, so Tauri seemed a good choice.
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.rightSegment">
      <div :class="$style.sectionWidth">
        <div :class="$style.bodyText">
          <h3 style="margin-top: 0">Summary</h3>
          The idea for the game was that it should be a simple dungeon-crawler with a pixelated art
          style. The player would be placed in a dungeon, collect items in different rooms, and
          would eventually make their way to the boss room to finish the level.
          <br />
          <br />
          As time went on, I started to add in more details. I wanted the dungeons to be randomly
          generated, but I also wanted the player to have some input. What if the player was asked
          random questions at the start of the game, and their answers shaped the dungeon's
          features?
          <br />
          <br />
          I figured that a good place to start would be on the world generation algorithm, and to
          work my way forwards from there.
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
@import '@/styling/ResidenceTech.module.css';
</style>
