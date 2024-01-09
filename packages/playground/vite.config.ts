import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros'],
      dts: 'auto-imports.d.ts',
      vueTemplate: true,
    }),
  ],
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
      '@ideal-schema/playground-components': resolve('../playground-components/src'),
      '@ideal-schema/playground-store': resolve('../playground-store/src'),
      '@ideal-schema/playground-demi': resolve('../playground-demi/src'),
      '@ideal-schema/element': resolve('../element/src'),
    },
  },
  build: {
    outDir: resolve(__dirname, '../../dist/playground'),
  },
  server: {
    open: false,
    cors: true,
  },
})
