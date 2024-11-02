import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import vitePluginString from 'vite-plugin-string'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    vitePluginString({
      include: 'src/manifests/scripts/*.js',
      compress: false,
    }),
  ],
  build: {
    sourcemap: true,
  },
});
