import { defineConfig } from 'vite'

import baseConfig from '../vite.config'
import buildConfig from './build.config'

export default defineConfig(() => {
  return {
    ...baseConfig,
    ...buildConfig,
  }
})