import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import { FORM_COMPONENT_TYPE } from '../source';

export const getSlotFormItemTemplate = () => {
  const prop = uid();
  const newFormItem = {
    id: uid(),
    name: 'tableForm',
    type: 'placeholder-block',
    title: '插槽',
    prop: prop,
    icon: '',
    schema: {},
    formItem: { label: '插槽' },
    templateFormData: reactive({
      componentType: 'slot',
    }),
    templateSchema: [
      {
        type: 'select',
        prop: 'componentType',
        formItem: {
          label: '组件类别',
        },
      },
    ],
    templateOptionsConfig: {
      componentType: FORM_COMPONENT_TYPE,
    },
    fieldFormData: reactive({
      prop: 'slot',
      slot: 'slot',
    }),
    fieldSchema: [
      {
        type: 'input',
        prop: 'prop',
        formItem: { label: '字段名' },
        attrs: {
          placeholder: '请输入字段名',
        },
      },
      {
        type: 'input',
        prop: 'slot',
        formItem: { label: '插槽名' },
        attrs: {
          placeholder: '请输入插槽名',
        },
      },
    ],
    formItemFormData: {},
    formItemTemplateSchema: [],
    formItemOptionsConfig: {},
    activeCollapseItems: ['field', 'component', 'formItem'],
    allowCopy: true,
    allowDelete: true,
  };

  return { newFormItem, prop };
};
