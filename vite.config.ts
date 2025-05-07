import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: false,
    lib: {
      entry: {
        options: "entry/options.html",
      },
      name: "Blockly",
    },
  },
});
