import { defineConfig, transformWithEsbuild } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'js-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        if (!id.includes('/src/') || !id.endsWith('.js')) {
          return null;
        }

        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  define: {
    'process.env.TEMPLATE_IMAGE_URL': JSON.stringify(process.env.TEMPLATE_IMAGE_URL || ''),
  },
});
