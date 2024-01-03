import IlForm from '../../ideal-ui-v3/src/components/form/src/index.vue';
import IlFormItem from '../../ideal-ui-v3/src/components/form/src/FormItem.vue';
import IlSelect from '../../ideal-ui-v3/src/components/select/src/index.vue';
import IlRadio from '../../ideal-ui-v3/src/components/radio/src/index.vue';
import IlCheckbox from '../../ideal-ui-v3/src/components/checkbox/src/index.vue';
import IlContainer from '../../ideal-ui-v3/src/components/container/src/index.vue';
import IlCol from '../../ideal-ui-v3/src/components/col/src/index.vue';
import type { App } from 'vue';

export const register = (app: App) => {
  app.component('IlForm', IlForm);
  app.component('IlFormItem', IlFormItem);
  app.component('IlSelect', IlSelect);
  app.component('IlRadio', IlRadio);
  app.component('IlCheckbox', IlCheckbox);
  app.component('IlContainer', IlContainer);
  app.component('IlCol', IlCol);
};
