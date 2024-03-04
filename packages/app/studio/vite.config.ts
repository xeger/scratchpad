import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    // https://github.com/radix-ui/primitives/discussions/1915#discussioncomment-5733178
    include: ['react-dom'],
  },
  plugins: [react(), TanStackRouterVite()],
  server: {
    proxy: {
      '/api': {
        target: 'https://atlaslive.io',
        changeOrigin: true,
      },
    },
  },
});
