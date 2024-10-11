import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**', 'src/tests/stores.test.ts'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        include: ['src'],
        exclude: ['src/tests', 'src/vite-env.d.ts', 'src/main.ts']
      }
    }
  })
)
