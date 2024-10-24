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
        <div :class="$style.subTitle">Idea and Technology</div>
      </div>
      <div :class="$style.bottomLeftSegment">
        <div :class="$style.bodyText">
          <h3 style="margin-top: 0">Technology</h3>
          Residence is written using a framework called <a href="https://v2.tauri.app/">Tauri</a>. I
          chose this framework because it allows developers to create a desktop app using the
          frontend framework of their choice while still providing a fast and sleek experience
          overall.
          <br />
          <br />
          As mentioned already, I wanted to work on a project that would heighten my abilities with
          Vue.js, so Tauri seemed a good choice.
        </div>
      </div>
    </div>
    <div :class="$style.rightSegment">
      <div :class="$style.bodyText">
        <h3 style="margin-top: 0">Idea</h3>
        My initial idea for the game was a simple dungeon-crawler with a pixelated art style. The
        player would be placed in a dungeon, collect items in different rooms, and would eventually
        make their way to the boss room to finish the level.
        <br />
        <br />
        As time went on, I started to add in more details. I wanted the dungeons to be randomly
        generated, but I also wanted the player to have some input. What if the player was asked
        random questions at the start of the game, and their answers shaped the dungeon's features?
        <br />
        <br />
        I figured that a good place to start would be on the dungeon generation algorithm, and to
        work my way forwards from there.
      </div>
    </div>
  </div>
</template>

<style module>
@import '@/styling/ResidenceTech.module.css';
</style>
