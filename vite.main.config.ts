import { defineConfig } from 'vite';
import { resolve } from 'path';

// Note: electron-vite plugins might not be directly used here
// Forge's Vite plugin handles externalization separately if configured.

export default defineConfig({
  // No specific 'main' key needed, config is used directly by Forge
  // plugins: [], // Remove empty plugins array
  build: {
    // Define lib entry for Forge to pick up
    lib: {
      entry: resolve(__dirname, 'src/main/index.ts'),
      formats: ['cjs'] // Ensure CommonJS output for Electron main process
    },
    rollupOptions: {
      output: {
        // Ensure the output filename is main.js
        entryFileNames: 'main.js' 
      },
      // Add externals if needed (Forge plugin might handle this too)
      // external: ['electron', 'path', ...]
    },
    // Forge controls the output directory
    // outDir: '...' 
  }
}); 