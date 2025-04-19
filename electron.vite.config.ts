import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin()
    ],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/main/index.ts'),
        }
      },
      outDir: resolve(__dirname, '.vite/build') 
    }
  },
  preload: {
    plugins: [
      externalizeDepsPlugin()
    ],
    build: {
      rollupOptions: {
        input: {
          preload: resolve(__dirname, 'src/preload/index.ts'),
        }
      },
      outDir: resolve(__dirname, '.vite/build') 
    }
  },
  renderer: {
    // Base path for assets (relative to index.html)
    base: './', 
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        // Restore original alias using resolve
        '@': resolve(__dirname, 'src') 
      }
    },
    build: {
      rollupOptions: {
        input: {
          // Entry point for the renderer process
          index: resolve(__dirname, 'src/renderer/index.html')
        }
      },
      // Define output directory for renderer process build
      outDir: resolve(__dirname, 'dist')
    }
  }
}); 