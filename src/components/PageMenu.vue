<script setup lang="ts">
import MenuIcon from '@/components/MenuIcon.vue'
import { useGlobalVariables } from '@/stores/globalVariables'
import { useMenuUtil } from '@/stores/menuUtil'
import { storeToRefs } from 'pinia'

/**
 * The global variables for the app - kept in a pinia store.
 */
const globalVariables = useGlobalVariables()

/**
 * The menu's background colour - changes depending on the current view.
 */
const { menuColour } = storeToRefs(globalVariables)

/**
 * The menu util store - used to control the sliding in/out of the menu.
 */
const menuUtil = useMenuUtil()

/**
 * The position of the menu in reference to the right side of the screen.
 */
const { menuPosition } = storeToRefs(menuUtil)
</script>

<template>
  <MenuIcon @click="menuUtil.toggleMenu"></MenuIcon>
  <div
    :class="$style.menuContainer"
    :style="{ backgroundColor: `${menuColour}`, right: `${menuPosition}rem` }"
  ></div>
</template>

<style module>
@import '@/styling/PageMenu.module.css';
</style>
