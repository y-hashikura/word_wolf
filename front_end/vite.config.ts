import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      host: "35.73.195.19",
      port: 5173,
      clientPort: 5173
    }
  },
  build: {
    sourcemap: true,
  }
})