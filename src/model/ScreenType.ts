/**
 * ScreenType is used to maintain a finite number of options
 * for the currentScreen variable in the globalVariables
 * pinia store.
 */
export enum ScreenType {
  TITLE = 'TITLE',
  PROJECTS_INTRO = 'PROJECTS_INTRO',
  RESIDENCE_INTRO = 'RESIDENCE_INTRO',
  RESIDENCE_TECH = 'RESIDENCE_TECH',
  RESIDENCE_GEN = 'RESIDENCE_GEN',
  RESIDENCE_INTERACTION = 'RESIDENCE_INTERACTION',
  OTHER = 'OTHER'
}
