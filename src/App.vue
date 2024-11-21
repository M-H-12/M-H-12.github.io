<script setup lang="ts">
import MainTitle from '@/view/MainTitle.vue'
import AboutPage from '@/view/AboutPage.vue'
import { storeToRefs } from 'pinia'
import { useGlobalVariables } from '@/stores/globalVariables'
import { ScreenType } from '@/model/ScreenType'
import '@/styling/global.css'
import ResidenceIntro from '@/view/Residence/ResidenceIntro.vue'
import ResidenceTech from '@/view/Residence/ResidenceTech.vue'
import ResidenceGen from '@/view/Residence/ResidenceGen.vue'
import ResidenceInteraction from '@/view/Residence/ResidenceInteraction.vue'
import OtherPage from '@/view/OtherPage.vue'
import PageMenu from './components/PageMenu.vue'
import BackgroundDimmer from './components/BackgroundDimmer.vue'

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
  <div class="app-wrapper">
    <MainTitle v-if="currentScreen == ScreenType.TITLE"></MainTitle>
    <AboutPage v-else-if="currentScreen == ScreenType.PROJECTS_INTRO"></AboutPage>
    <ResidenceIntro v-else-if="currentScreen == ScreenType.RESIDENCE_INTRO"></ResidenceIntro>
    <ResidenceTech v-else-if="currentScreen == ScreenType.RESIDENCE_TECH"></ResidenceTech>
    <ResidenceGen v-else-if="currentScreen == ScreenType.RESIDENCE_GEN"></ResidenceGen>
    <ResidenceInteraction
      v-else-if="currentScreen == ScreenType.RESIDENCE_INTERACTION"
    ></ResidenceInteraction>
    <OtherPage v-else></OtherPage>
    <BackgroundDimmer></BackgroundDimmer>
    <PageMenu v-if="currentScreen != ScreenType.TITLE"></PageMenu>
  </div>
</template>
