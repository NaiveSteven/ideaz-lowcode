import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import * as ElIconModules from '@element-plus/icons';

import vueUi from '../src';
import DemoBlock from './components/DemoBlock.vue';
import './style/global.less';
import './style/index.less';
import './style/relax.less';
import 'element-plus/theme-chalk/src/index.scss';
import '../src/theme-chalk/src/index.scss';

function transElIconName(iconName) {
  return `i${iconName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;
}

const app = createApp(App);
Object.keys(ElIconModules).forEach((item) => {
  const cur = item;
  app.component(transElIconName(item), ElIconModules[cur]);
});
app
  .use(router)
  .use(ElementPlus, { size: 'small' })
  .use(vueUi)
  .component('demo-block', DemoBlock)
  .mount('#app');
