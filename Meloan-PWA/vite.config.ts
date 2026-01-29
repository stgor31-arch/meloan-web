import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
  ],
  root: path.resolve(__dirname, 'client'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      'react-native': 'react-native-web',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'client/index.html'),
        accept: path.resolve(__dirname, 'client/accept/index.html'),
      },
    },
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
  },
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
