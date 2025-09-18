import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],

  // Multi-page application configuration
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        privacy: resolve(__dirname, "privacy.html"),
        terms: resolve(__dirname, "terms.html"),
        contact: resolve(__dirname, "contact.html"),
      },
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    target: "es2015",
    minify: "terser",
    sourcemap: false,
  },

  // Development server configuration
  server: {
    host: "localhost",
    open: true,
  },

  // CSS configuration handled by postcss.config.js

  // Asset handling
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg"],

  // Define aliases for cleaner imports
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "src/assets"),
      "@scripts": resolve(__dirname, "src/scripts"),
      "@styles": resolve(__dirname, "src/styles"),
    },
  },
});
