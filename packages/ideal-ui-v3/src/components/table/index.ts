import Table from './src/TablePlus';
import type { App } from 'vue';

export default {
  install(app: App) {
    app.component('IlTable', Table);
  },
};
