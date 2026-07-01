import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Vite config — just enables Vue single-file components.
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})
