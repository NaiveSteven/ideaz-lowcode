import type { App } from 'vue';

import CSelect from './components/select';
import IlCol from './components/col';
import CContainer from './components/container';
import Form from './components/form';
import CTable from './components/table';
import CTablePro from './components/table-pro';
import CRadio from './components/radio';
import CCheckbox from './components/checkbox';
import CDynamicComponent from './components/dynamic-component';

const { IlFormItem, IlForm } = Form;

const components = [
  CSelect,
  IlCol,
  CContainer,
  IlFormItem,
  IlForm,
  CTable,
  CTablePro,
  CRadio,
  CCheckbox,
  CDynamicComponent,
];

export * from './types';
export * from './hooks';

export default {
  install(app: App) {
    components.map((item: any) => {
      app.use(item);
    });
  },
};

export {
  CSelect,
  IlCol,
  CContainer,
  IlFormItem,
  IlForm,
  CTable,
  CTablePro,
  CRadio,
  CCheckbox,
  CDynamicComponent,
};
