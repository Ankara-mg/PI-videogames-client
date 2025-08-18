import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, 'src/img'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@redux': path.resolve(__dirname, 'src/redux'),
    },
  },
});
