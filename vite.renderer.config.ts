import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Set root to the directory containing index.html
  root: 'src/renderer', 
  plugins: [
    react()
  ],
  // base: '/', // Keep default base
  resolve: {
    alias: {
      // Keep alias relative to project root using __dirname
      '@': resolve(__dirname, 'src') 
    }
  },
  build: {
    rollupOptions: {
      input: {
        // Input path relative to the new root 'src/renderer'
        main_window: 'index.html' 
      }
    },
    // Output dir relative to project root, let Forge handle placement
    outDir: resolve(__dirname, 'dist') 
  }
}); 