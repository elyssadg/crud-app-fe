import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const SERVER = 'localhost:8081'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 8081,
    proxy: {
      '/backend/': {
        target: SERVER,
        changeOrigin: true
      }
    }
  }
})