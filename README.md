# Madison's Web Portfolio

This repository holds the code for Madison's Web Portfolio.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Run Unit Test Coverage with [Vitest](https://vitest.dev/guide/coverage) (v8)

```sh
npm run coverage
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project Organization

The code in this repo is organized into several different directories, which are covered below.

### src/assets

The directory which holds any image files needed for the project.

### src/components

The directory for .vue files that are components of other views.

### src/model

The directory for custom enums that are used in the project.

### src/stores

The directory holding Pinia stores used throughout the project. There are four stores. The first (globalVariables.ts) is used to hold global variables that are needed on various views throughout the project. The second (scrollUtil.ts) holds variables and functions which are used to facilitate scrolling between views. The third (menuUtil.ts) holds variables and functions needed for the side menu. The fourth (ballUtil.ts) holds the variables and functions needed to run FinalPage.vue.

### src/styling

The directory which holds all the .css files. Every view/component has it's own .module.css file, in addition to there being a global.css file. The global file holds styling which is used on multiple pages, or in _App.vue_, while each module has styling which is only used in it's own view.

### src/tests

The directory which holds all the unit tests for the project. The tests are separated into 2 files. One (stores.test.ts) is mainly used to test functionality within the Pinia stores. The second (views.test.ts) is used to test views rendering.

### src/view

The directory which holds all of the project's views.

<ul> <h4> /residence </h4> </ul>

<ul>The directory which holds all the views pertaining to the Residence project.</ul>

## Project Test Coverage

The following is a report of the current project test coverage according to Vitest (v8).

| File                                 | % Stmts | % Branch | % Funcs | % Lines |
| ------------------------------------ | ------- | -------- | ------- | ------- |
| All files                            | 100     | 100      | 100     | 100     |
| &ensp;src                            | 100     | 100      | 100     | 100     |
| &ensp;&ensp;App.vue                  | 100     | 100      | 100     | 100     |
| &ensp;src/components                 | 100     | 100      | 100     | 100     |
| &ensp;&ensp;BackgroundDimmer.vue     | 100     | 100      | 100     | 100     |
| &ensp;&ensp;MenuIcon.vue             | 100     | 100      | 100     | 100     |
| &ensp;&ensp;PageMenu.vue             | 100     | 100      | 100     | 100     |
| &ensp;src/model                      | 100     | 100      | 100     | 100     |
| &ensp;&ensp;MenuColour.ts            | 100     | 100      | 100     | 100     |
| &ensp;&ensp;ScreenType.ts            | 100     | 100      | 100     | 100     |
| &ensp;src/stores                     | 100     | 100      | 100     | 100     |
| &ensp;&ensp;globalVariables.ts       | 100     | 100      | 100     | 100     |
| &ensp;&ensp;ballUtil.ts              | 100     | 100      | 100     | 100     |
| &ensp;&ensp;menuUtil.ts              | 100     | 100      | 100     | 100     |
| &ensp;&ensp;scrollUtil.ts            | 100     | 100      | 100     | 100     |
| &ensp;src/view                       | 100     | 100      | 100     | 100     |
| &ensp;&ensp;AboutPage.vue            | 100     | 100      | 100     | 100     |
| &ensp;&ensp;FinalPage.vue            | 100     | 100      | 100     | 100     |
| &ensp;&ensp;MainTitle.vue            | 100     | 100      | 100     | 100     |
| &ensp;&ensp;OtherPage.vue            | 100     | 100      | 100     | 100     |
| &ensp;src/view/Residence             | 100     | 100      | 100     | 100     |
| &ensp;&ensp;ResidenceGen.vue         | 100     | 100      | 100     | 100     |
| &ensp;&ensp;ResidenceInteraction.vue | 100     | 100      | 100     | 100     |
| &ensp;&ensp;ResidenceIntro.vue       | 100     | 100      | 100     | 100     |
| &ensp;&ensp;ResidenceTech.vue        | 100     | 100      | 100     | 100     |
