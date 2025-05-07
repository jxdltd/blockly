import tailwind from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwind()],
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: false,
    lib: {
      entry: {
        options: 'entry/options.html',
        blocked: 'entry/blocked.html',
        background: 'entry/background.ts',
      },
      name: 'Blockly',
    },
  },
});
