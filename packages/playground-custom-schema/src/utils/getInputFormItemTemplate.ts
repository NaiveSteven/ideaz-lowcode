import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import { FORM_COMPONENT_TYPE } from '../source';
import {
  inputTableProFormData,
  inputTableProSchema,
  fieldTemplateSchema,
  formItemTemplateOptionsConfig,
  selectTableProSchema,
  SelectTableProFormData,
} from '../schemas';

export const getInputFormItemTemplate = () => {
  const prop = uid();
  const newFormItem = {
    id: uid(),
    name: 'tableForm',
    type: 'input',
    title: '表单项',
    prop: prop,
    icon: '',
    schema: {},
    formItem: { label: '标签' },
    templateFormData: reactive({
      ...inputTableProFormData,
      componentType: 'input',
    }),
    templateSchema: [
      {
        type: 'select',
        prop: 'componentType',
        formItem: {
          label: '组件类别',
        },
      },
      ...inputTableProSchema,
    ],
    templateOptionsConfig: {
      componentType: FORM_COMPONENT_TYPE,
    },
    fieldFormData: reactive({
      prop: prop,
      default: '',
    }),
    fieldSchema: fieldTemplateSchema({ defaultType: 'el-input' }),
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

export const getSelectFormItemTemplate = () => {
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
      ...SelectTableProFormData,
      componentType: 'select',
    }),
    templateSchema: [
      {
        type: 'select',
        prop: 'componentType',
        formItem: {
          label: '组件类别',
        },
      },
      ...selectTableProSchema,
    ],
    attrs: {
      ...SelectTableProFormData,
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
