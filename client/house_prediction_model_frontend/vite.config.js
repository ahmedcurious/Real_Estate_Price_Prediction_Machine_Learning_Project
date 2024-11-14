import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/predict_price": "http://127.0.0.1:5000", // Proxy API requests to your backend
    },
  },
});
