

import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import { FORM_COMPONENT_TYPE } from '../source';
import {
  multipleSelectTableProSchema,
  multipleSelectTableProFormData,
  fieldTemplateSchema,
  formItemTemplateOptionsConfig,
} from '../schemas';

export const getMultipleSelectFormItemTemplate = () => {
  const prop = uid();
  const newFormItem = {
    id: uid(),
    name: 'tableForm',
    type: 'select',
    title: '表单项',
    prop: prop,
    icon: '',
    schema: {},
    formItem: { label: '标签' },
    templateFormData: reactive({
      ...multipleSelectTableProFormData,
      componentType: 'multipleSelect',
    }),
    templateSchema: [
      {
        type: 'select',
        prop: 'componentType',
        formItem: {
          label: '组件类别',
        },
      },
      ...multipleSelectTableProSchema,
    ],
    attrs: {
      ...multipleSelectTableProFormData,
      multiple: true,
    },
    templateOptionsConfig: {
      componentType: FORM_COMPONENT_TYPE,
    },
    fieldFormData: reactive({
      prop: prop,
      default: '',
    }),
    fieldSchema: fieldTemplateSchema({ defaultType: 'input' }),
    formItemFormData: reactive({
      label: '标签',
      tooltip: '',
      extra: '',
    }),
    formItemTemplateSchema: [
      {
        type: 'input',
        prop: 'label',
        formItem: { label: '标签' },
        attrs: {
          placeholder: '请输入标签',
        },
      },
      {
        type: 'input',
        prop: 'tooltip',
        formItem: { label: '提示' },
        attrs: {
          placeholder: '请输入提示',
        },
      },
      {
        type: 'input',
        prop: 'extra',
        formItem: { label: '额外信息' },
        attrs: {
          placeholder: '请输入额外信息',
        },
      },
    ],
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    activeCollapseItems: ['field', 'component', 'formItem'],
    allowCopy: true,
    allowDelete: true,
  };

  return { newFormItem, prop };
};
