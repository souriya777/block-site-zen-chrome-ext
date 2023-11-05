import { resolve } from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [
    svelte(),
  ],
  build: {
    rollupOptions: {
      input: {
        // index: resolve(__dirname, 'index.html'),
        options: resolve(__dirname, 'options.html'),
      }
    }
  }
});
