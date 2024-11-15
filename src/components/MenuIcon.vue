<script setup lang="ts">
import { useGlobalVariables } from '@/stores/globalVariables'
import { storeToRefs } from 'pinia'

/**
 * The global variables for the app - kept in a pinia store.
 */
const globalVariables = useGlobalVariables()

/**
 * The colour of the menu icon - changes depending on the current view.
 */
const { menuIconColour } = storeToRefs(globalVariables)
</script>

<template>
  <div :class="$style.menuContainer">
    <div :class="$style.topLine" :style="{ backgroundColor: `${menuIconColour}` }"></div>
    <div :class="$style.middleLine" :style="{ backgroundColor: `${menuIconColour}` }"></div>
    <div :class="$style.bottomLine" :style="{ backgroundColor: `${menuIconColour}` }"></div>
  </div>
</template>

<style module>
@import '@/styling/MenuIcon.module.css';
</style>
