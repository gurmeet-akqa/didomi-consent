import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Ensure proper resolution of packages
    preserveSymlinks: false,
  },
  optimizeDeps: {
    // Include @didomi/react in pre-bundling
    include: ['@didomi/react'],
  },
})

