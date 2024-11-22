<script setup lang="ts">
import MenuIcon from '@/components/MenuIcon.vue'
import { ScreenType } from '@/model/ScreenType'
import { useGlobalVariables } from '@/stores/globalVariables'
import { useMenuUtil } from '@/stores/menuUtil'
import { useScrollUtil } from '@/stores/scrollUtil'
import { storeToRefs } from 'pinia'

/**
 * The global variables for the app - kept in a pinia store.
 */
const globalVariables = useGlobalVariables()

/**
 * Global variables used on this page. Contains:
 * currentScreen: The current screen that the user is on
 * menuColour: The menu's background colour - changes depending on the current view.
 * menuIconColour: The colour of the icon in the top right corner. Inverse of the menuColour.
 */
const { currentScreen, menuColour, menuIconColour } = storeToRefs(globalVariables)

/**
 * The store for the scrolling utility.
 */
const scrollUtil = useScrollUtil()

/**
 * The menu util store - used to control the sliding in/out of the menu.
 */
const menuUtil = useMenuUtil()

/**
 * The position of the menu in reference to the right side of the screen.
 */
const { menuPosition } = storeToRefs(menuUtil)

/**
 * Function used to change the view when the user clicks on a menu option.
 * @param newScreen The new screen to navigate to.
 */
function navigateToPage(newScreen: ScreenType) {
  currentScreen.value = newScreen
  menuUtil.toggleMenu()
  scrollUtil.refreshMenu(newScreen)
}
</script>

<template>
  <MenuIcon id="hamburgerMenu" @click="menuUtil.toggleMenu"></MenuIcon>
  <div
    :class="$style.menuContainer"
    :style="{
      backgroundColor: `${menuColour}`,
      right: `${menuPosition}rem`
    }"
  >
    <div
      :class="$style.titleContainer"
      :style="{ color: `${menuIconColour}`, textDecorationColor: `${menuIconColour}` }"
    >
      <div
        id="mainTitleButton"
        :class="$style.majorTitle"
        @click="navigateToPage(ScreenType.TITLE)"
      >
        Title
      </div>
      <div
        id="aboutButton"
        :class="$style.majorTitle"
        @click="navigateToPage(ScreenType.PROJECTS_INTRO)"
      >
        About
      </div>
      <div
        id="introButton"
        :class="$style.majorTitle"
        @click="navigateToPage(ScreenType.RESIDENCE_INTRO)"
      >
        Residence
      </div>
      <div
        id="techButton"
        :class="$style.minorTitle"
        @click="navigateToPage(ScreenType.RESIDENCE_TECH)"
      >
        Tech and Summary
      </div>
      <div
        id="genButton"
        :class="$style.minorTitle"
        @click="navigateToPage(ScreenType.RESIDENCE_GEN)"
      >
        World Generation
      </div>
      <div
        id="interactionButton"
        :class="$style.minorTitle"
        @click="navigateToPage(ScreenType.RESIDENCE_INTERACTION)"
      >
        User Interaction
      </div>
      <div id="otherButton" :class="$style.majorTitle" @click="navigateToPage(ScreenType.OTHER)">
        Other
      </div>
    </div>
  </div>
</template>

<style module>
@import '@/styling/PageMenu.module.css';
</style>
