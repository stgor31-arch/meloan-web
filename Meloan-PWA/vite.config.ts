import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import path from 'path';

export default defineConfig({
  // только существующие плагины
  plugins: [
    react(),
    runtimeErrorOverlay(),
  ],
  // корень проекта — папка client
  root: path.resolve(__dirname, 'client'),
  // алиас для react‑native
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  // опции сборки
  build: {
    rollupOptions: {
      // несколько точек входа: главная и accept
      input: {
        main: path.resolve(__dirname, 'client/index.html'),
        accept: path.resolve(__dirname, 'client/accept/index.html'),
      },
    },
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
  },
  // настройки dev‑сервера (опционально)
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
