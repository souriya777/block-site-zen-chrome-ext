import { resolve } from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@background': resolve(__dirname, './src/background'),
      '@common': resolve(__dirname, './src/common'),
      '@content': resolve(__dirname, './src/content'),
      '@options': resolve(__dirname, './src/options'),
      '@popup': resolve(__dirname, './src/popup'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        options: resolve(__dirname, 'options.html'),
        popup: resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'src/background/main.js'),
        content: resolve(__dirname, 'src/content/js/main.js'),
        'hack-content': resolve(__dirname, 'src/content/js/hack-content.js'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
