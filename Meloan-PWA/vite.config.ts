import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import metaImagesPlugin from '@replit/vite-plugin-meta-images';
import path from 'path';

export default defineConfig({
  // Здесь подключаем только плагины (квадратные скобки закрываются до build)
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
  ],
  // Корень проекта — папка client
  root: path.resolve(__dirname, 'client'),
  // Настройка PostCSS (для Tailwind)
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  // Алиасы для React Native
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  // Настройка сборки
  build: {
    // Указываем точки входа: главная страница и /accept
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'client/index.html'),
        accept: path.resolve(__dirname, 'client/accept/index.html'),
      },
    },
    // Папка вывода готовых файлов
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
  },
  // Настройка dev‑сервера (опционально)
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
