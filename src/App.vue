<script setup lang="ts">
import MainTitle from '@/view/MainTitle.vue'
import '@/styling/global.css'
import { useGlobalVariables } from '@/stores/globalVariables'
import { ScreenType } from './model/ScreenType'
import { storeToRefs } from 'pinia'

/**
 * The global variables for the app - kept in a pinia store.
 */
const globalVariables = useGlobalVariables()

/**
 * The app's current screen - kept as a ref so the page can react to any changes
 * in the variable.
 */
const { currentScreen } = storeToRefs(globalVariables)
</script>

<template>
  <MainTitle v-if="currentScreen == ScreenType.TITLE"></MainTitle>
</template>

<style></style>
