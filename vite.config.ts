import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      "@api": "/src/api",
      "@hoc": "/src/hoc",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@components": "/src/components",
      "@interfaces": "/src/interfaces",
      "@infrastructure": "/src/infrastructure"
    }
  },
  server: {
    port: 5173,
    host: "127.0.0.1"
  }
});
