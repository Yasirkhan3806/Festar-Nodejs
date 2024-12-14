import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // Polyfill 'global' for some Node.js modules
  },
  resolve: {
    alias: {
      buffer: 'buffer', // Use the browser-compatible 'buffer' module
      process: 'process/browser', // Use the browser-compatible 'process' module
    },
  },
});
