// vite.config.js
import { resolve } from "path";
import { defineConfig } from "file:///Users/SOURIYA/Documents/dev/block-site-zen-chrome-ext/node_modules/.pnpm/vite@4.5.0_sass@1.69.5/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///Users/SOURIYA/Documents/dev/block-site-zen-chrome-ext/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@2.4.6_svelte@4.2.2+vite@4.5.0/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
var __vite_injected_original_dirname = "/Users/SOURIYA/Documents/dev/block-site-zen-chrome-ext";
var vite_config_default = defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "@options": resolve(__vite_injected_original_dirname, "./src/options"),
      "@popup": resolve(__vite_injected_original_dirname, "./src/popup")
    }
  },
  build: {
    rollupOptions: {
      input: {
        options: resolve(__vite_injected_original_dirname, "options.html"),
        popup: resolve(__vite_injected_original_dirname, "popup.html")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvU09VUklZQS9Eb2N1bWVudHMvZGV2L2Jsb2NrLXNpdGUtemVuLWNocm9tZS1leHRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9TT1VSSVlBL0RvY3VtZW50cy9kZXYvYmxvY2stc2l0ZS16ZW4tY2hyb21lLWV4dC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvU09VUklZQS9Eb2N1bWVudHMvZGV2L2Jsb2NrLXNpdGUtemVuLWNocm9tZS1leHQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbc3ZlbHRlKCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAb3B0aW9ucyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvb3B0aW9ucycpLFxuICAgICAgJ0Bwb3B1cCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvcG9wdXAnKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG9wdGlvbnM6IHJlc29sdmUoX19kaXJuYW1lLCAnb3B0aW9ucy5odG1sJyksXG4gICAgICAgIHBvcHVwOiByZXNvbHZlKF9fZGlybmFtZSwgJ3BvcHVwLmh0bWwnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVixTQUFTLGVBQWU7QUFDNVcsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxjQUFjO0FBRnZCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFBQSxFQUNsQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxZQUFZLFFBQVEsa0NBQVcsZUFBZTtBQUFBLE1BQzlDLFVBQVUsUUFBUSxrQ0FBVyxhQUFhO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxTQUFTLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQzFDLE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
