// import IlForm from './src/index.vue';
// import IlFormItem from './src/FormItemContent.vue';
import IlFormItem from './src/CFormItem';
import IlForm from './src/CForm';
// import IlFormItem from './src/CFormItem';
import type { App } from 'vue';

const names = ['IlForm', 'IlFormItem'];

[IlForm, IlFormItem].forEach((item: any, index) => {
  item.install = (app: App) => {
    app.component(names[index], item);
  };
});
const install = (app: App) => {
  [IlForm, IlFormItem].forEach((item: any, index) => {
    app.component(names[index], item);
  });
};
export default { install, IlForm, IlFormItem };
