import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '@ideal-schema/shared': resolve('../shared/src'),
      '@ideal-schema/ideal-ui-v3': resolve('../ideal-ui-v3/src'),
      '@ideal-schema/playground-event': resolve('../playground-event/src'),
      '@ideal-schema/playground-components': resolve('../playground-components/src'),
      '@ideal-schema/playground-store': resolve('../playground-store/src'),
      '@ideal-schema/playground-hooks': resolve('../playground-hooks/src'),
      '@ideal-schema/playground-demi': resolve('../playground-demi/src'),
      '@ideal-schema/playground-custom-schema': resolve('../playground-custom-schema/src'),
    },
  },
  build: {
    outDir: resolve(__dirname, '../../dist/playground'),
  },
  server: {
    open: false,
    cors: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/')
    //   }
    // }
  },
});
