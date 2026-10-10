import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-router-dom') || id.includes('react-dom') || (id.includes('node_modules/react/') && !id.includes('react-three'))) {
            return 'vendor-react'
          }
          if (id.includes('@react-three') || (id.includes('node_modules/three'))) {
            return 'vendor-three'
          }
          if (id.includes('gsap') || id.includes('framer-motion') || id.includes('lenis')) {
            return 'vendor-anim'
          }
        },
      },
    },
  },
})
