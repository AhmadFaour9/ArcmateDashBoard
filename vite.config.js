import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://arcmate9.nvssoft.cloud/AMService9',  
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api'), // الحفاظ على /api
      },
    },
  },
});
