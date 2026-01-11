import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import path from 'path';

export default defineConfig({
  // Подключаем только существующие плагины
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
  ],
  // корень проекта (где лежит client/index.html и client/src)
  root: path.resolve(__dirname, 'client'),
  // PostCSS для Tailwind
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  build: {
    // несколько точек входа: главная и /accept
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'client/index.html'),
        accept: path.resolve(__dirname, 'client/accept/index.html'),
      },
    },
    // каталог вывода готовых файлов
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
  },
  // настройки dev-сервера (опционально)
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
