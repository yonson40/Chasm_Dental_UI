import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Use the expected key for Forge convention
        main_window_preload: resolve(__dirname, 'src/preload/index.ts') 
      },
      output: {
        // Ensure the output filename matches the key/convention
        entryFileNames: 'main_window_preload.js', 
        format: 'cjs' 
      },
      // external: ['electron']
    },
    // Ensure output directory is correct
    outDir: resolve(__dirname, '.vite/build') 
  }
}); 