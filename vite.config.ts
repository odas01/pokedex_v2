import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  server:{
    port: 3001
  },
  resolve: {
     alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
     },
  },
})