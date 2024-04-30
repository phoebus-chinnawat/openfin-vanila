import { defineConfig } from 'vite';
// import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  server: {
    port: 3000,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
  preview: {
    port: 3000,
    host: 'localhost',
    proxy: {
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      },
  },
  base: './',
  build: {
    sourcemap: false,
    minify: false,
  },
  plugins: [viteStaticCopy({
    targets: [{
      src: 'manifests/manifest.json',
      dest: 'public'
    },{
      src: 'src/preloads/preload.js',
      dest: 'preloads'
    }]
  })]
});
