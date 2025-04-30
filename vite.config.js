import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";

// I am using react-responsive-table library and it has some global dependencies thus using below library
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

export default defineConfig({
  optimizeDeps: {
    include: ["buffer", "process"],
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
  define: {
    global: "globalThis",
  },
  envPrefix: "REACT_APP_",
  plugins: [react(), envCompatible],
});
