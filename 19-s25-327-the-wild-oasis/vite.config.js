import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("react-dom")) return "vendor-react-dom";
            if (id.includes("react-icons")) return "vendor-icons";
            if (id.includes("styled-components")) return "vendor-styled";
            return "vendor";
          }
        },
      },
    },
  },
});
