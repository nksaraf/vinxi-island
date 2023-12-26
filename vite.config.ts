import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import devtools from 'solid-devtools/vite';
import { crx } from "@vinxi/chrome-extension";
import manifest from "./manifest.json";
import { join } from "path";
import { shadowDomCssPlugin } from "./shadow-dom-css";

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    // shadowDomCssPlugin({
    //   config: {
    //     container: "#crx-root",
    //     output: "shadow.css",
    //   },
    // }),
    crx({ manifest }),
    react(),
  ],
  resolve: {
    alias: {
      "@": join(process.cwd(), "@"),
    },
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    exclude: ["@sqlite.org/sqlite-wasm"],
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[ext]",
        entryFileNames: "assets/[name]",
        chunkFileNames: "assets/[name].js",
      },
    },
  },
});
