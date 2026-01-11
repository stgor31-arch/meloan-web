import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import metaImagesPlugin from "@replit/vite-plugin-meta-images";
import path from "path";

export default defineConfig({
  // здесь подключаем только плагины
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
  ],
  // корень проекта — папка client
  root: path.resolve(__dirname, "client"),
  // пост‑процессор для TailwindCSS
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  // алиасы для react‑native
  resolve: {
    alias: {
      "react-native": "react-native-web",
    },
  },
  // единственный раздел build, где указываем rollupOptions
  build: {
    // задаём точки входа: главная страница и страница /accept
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "client/index.html"),
        accept: path.resolve(__dirname, "client/accept/index.html"),
      },
    },
    // папка для готовых файлов
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  // прокси для API на 3000 порте (если запускаете сервер локально)
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
