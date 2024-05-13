import { defineConfig } from 'vite'

import { resolve } from 'node:path'

const __dirname = resolve()

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../mystia',
  }
})
