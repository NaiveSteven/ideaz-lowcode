// import TablePro from './src/index.vue';
import TablePro from './src/TablePro';
import type { App } from 'vue';

export default {
  install(app: App) {
    app.component('IlTablePro', TablePro);
  },
};
