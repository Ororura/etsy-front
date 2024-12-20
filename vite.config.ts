import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/ui/components'),
      app: path.resolve(__dirname, './src/ui/app'),
      assets: path.resolve(__dirname, './src/ui/assets'),
      core: path.resolve(__dirname, './src/core'),
      services: path.resolve(__dirname, './src/services'),
      pages: path.resolve(__dirname, './src/ui/pages'),
      hoc: path.resolve(__dirname, './src/ui/hoc'),
    },
  },
});
