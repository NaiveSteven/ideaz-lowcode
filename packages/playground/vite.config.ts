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
      '@ideaz/iview': resolve('../iview/src'),
      '@ideaz/element': resolve('../ideaz-element'),
      '@ideal-schema/shared': resolve('../shared/src'),
      '@ideal-schema/playground-components': resolve('../playground-components/src'),
      '@ideal-schema/playground-store': resolve('../playground-store/src'),
      '@ideal-schema/playground-demi': resolve('../playground-demi/src'),
      '@ideal-schema/playground-undo': resolve('../playground-undo/src'),
      '@ideal-schema/playground-parser': resolve('../playground-parser/src'),
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
