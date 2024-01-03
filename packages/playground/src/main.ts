import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as ElIconModules from '@element-plus/icons';
import App from './App.vue';
import 'element-plus/dist/index.css';
import '@/design/index.scss';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/theme/dracula.css';
import idealUiV3 from '@ideal-schema/ideal-ui-v3';
import '@ideal-schema/ideal-ui-v3/theme-chalk/src/index.scss';
import router from './router/index';
import { store } from '@ideal-schema/playground-store';
import OptionItemWidgetUse from './widgets/option-item-widget';
import CommonComponents from '@ideal-schema/playground-components';

function transElIconName(iconName: string) {
  return `i${iconName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;
}

const app = createApp(App);
app.use(store);
Object.keys(ElIconModules).forEach((item: string) => {
  const cur = item as keyof typeof ElIconModules;
  app.component(transElIconName(item), ElIconModules[cur]);
});

app.component(OptionItemWidgetUse.name, OptionItemWidgetUse);

app.use(idealUiV3);

app
  .use(router)
  // .use(store)
  .use(ElementPlus, { size: 'small' })
  .use(CommonComponents)
  .mount('#app');
