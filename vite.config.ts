import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import vitePluginString from 'vite-plugin-string';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
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
