<script setup lang="ts">
import { useGlobalVariables } from '@/stores/globalVariables'
import { useMenuUtil } from '@/stores/menuUtil'
import { storeToRefs } from 'pinia'

/**
 * The menu util store - used to control the sliding in/out of the menu.
 */
const menuUtil = useMenuUtil()

/**
 * Variable used to indicate the dimmer's opacity.
 */
const { dimmerOpacity } = storeToRefs(menuUtil)

/**
 * The global variables for the app - kept in a pinia store.
 */
const globalVariables = useGlobalVariables()

/**
 * The boolean value used to indicate if the hamburger menu is open or not.
 */
const { menuOpen } = storeToRefs(globalVariables)

/**
 * Function used to close the menu if the user clicks away.
 * The menu should only be toggled if it is open.
 */
function closeMenu() {
  if (menuOpen.value) {
    menuUtil.toggleMenu()
  }
}
</script>

<template>
  <div
    :class="$style.background"
    @click="closeMenu()"
    :style="{ opacity: `${dimmerOpacity}` }"
  ></div>
</template>

<style module>
@import '@/styling/BackgroundDimmer.module.css';
</style>
