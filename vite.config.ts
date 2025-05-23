import preact from '@preact/preset-vite';
import tailwind from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), preact(), tailwind()],
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: false,
    lib: {
      formats: ['es'],
      entry: {
        options: 'entry/options.html',
        blocked: 'entry/blocked.html',
        background: 'entry/background.ts',
      },
      name: 'Blockly',
    },
  },
  define: { 'process.env.NODE_ENV': '"production"' },
});
