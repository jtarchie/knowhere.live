import { defineConfig } from "vite";
import { resolve } from "path";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "codemirror": [
            "codemirror",
            "@codemirror/view",
            "@codemirror/commands",
            "@codemirror/lang-javascript",
          ],
        },
      },
    },
  },
});
