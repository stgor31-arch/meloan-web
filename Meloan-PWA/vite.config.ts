import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import path from 'path';

export default defineConfig({
  // Подключаем существующие плагины
  plugins: [
    react(),
    runtimeErrorOverlay(),
  ],
  // Указываем корень проекта (папка client)
  root: path.resolve(__dirname, 'client'),
  // Настраиваем алиасы. Теперь @ указывает на client/src
  resolve: {
   alias: [
      {
        find: /^@components\//,
        replacement: `${path.resolve(__dirname, 'client/src/components')}/`,
      },
      {
        find: /^@\//,
        replacement: `${path.resolve(__dirname, 'client/src')}/`,
      },
      {
        find: 'react-native',
        replacement: 'react-native-web',
      },
    ],
  },
  // Настройка сборки Vite
  build: {
    rollupOptions: {
      // Несколько точек входа: корень и страница /accept
      input: {
        main: path.resolve(__dirname, 'client/index.html'),
        accept: path.resolve(__dirname, 'client/accept/index.html'),
      },
    },
    // Каталог для готовых файлов
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
  },
  // Настройки dev‑сервера (опционально)
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
