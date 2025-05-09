<script setup lang="ts">
import MainTitle from '@/view/MainTitle.vue'
import AboutPage from '@/view/AboutPage.vue'
import { storeToRefs } from 'pinia'
import { useGlobalVariables } from '@/stores/globalVariables'
import { ScreenType } from '@/model/ScreenType'
import '@/styling/global.css'
import ResidenceIntro from '@/view/residence/ResidenceIntro.vue'
import ResidenceTech from '@/view/residence/ResidenceTech.vue'
import ResidenceGen from '@/view/residence/ResidenceGen.vue'
import ResidenceInteraction from '@/view/residence/ResidenceInteraction.vue'
import OtherPage from '@/view/OtherPage.vue'
import PageMenu from '@/components/PageMenu.vue'
import BackgroundDimmer from '@/components/BackgroundDimmer.vue'
import FinalPage from '@/view/FinalPage.vue'

/**
 * The global variables for the app - kept in a pinia store.
 */
const globalVariables = useGlobalVariables()

/**
 * currentScreen: The app's current screen - kept as a ref so the page can react to any changes
 * in the variable.
 * dimmerPresent: Boolean value used to indicate if the screen dimmer should be present (I.e. is the
 * menu partially or completely open)
 */
const { currentScreen, dimmerPresent } = storeToRefs(globalVariables)
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
    <OtherPage v-else-if="currentScreen == ScreenType.OTHER"></OtherPage>
    <FinalPage v-else></FinalPage>
    <BackgroundDimmer v-if="dimmerPresent"></BackgroundDimmer>
    <PageMenu v-if="currentScreen != ScreenType.TITLE"></PageMenu>
  </div>
</template>
