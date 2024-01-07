import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import {
  inputNumberTemplateOptionsConfig,
  inputNumberTemplateSchema,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  fieldTemplateSchema,
  formItemFormData,
} from '../schemas';

export const defaultInputNumberAttrs = {
  size: 'default',
  min: undefined,
  max: undefined,
  step: 1,
  precision: 1,
  placeholder: '',
  disabled: false,
  controls: true,
  stepStrictly: false,
  controlsPosition: 'right',
};

export const InputNumberTemplateComponent = {
  id: uid(),
  name: '',
  pid: '',
  formItemFormData: reactive({
    ...formItemFormData,
    label: '数字输入',
  }),
  formItemTemplateSchema: formItemTemplateSchema,
  formItemOptionsConfig: formItemTemplateOptionsConfig,
  icon: 'i-cherry',
  label: '数字输入',
  title: '数字输入',
  schema: {
    type: 'el-input-number',
    prop: 'inputNumber',
    formItem: { label: '数字输入' },
    attrs: {
      size: 'default',
      min: undefined,
      max: undefined,
      step: 1,
      precision: 1,
      placeholder: '',
      disabled: false,
      controls: true,
      stepStrictly: false,
      controlsPosition: 'right',
    },
  },
  templateFormData: reactive({ ...defaultInputNumberAttrs }),
  templateSchema: inputNumberTemplateSchema,
  templateOptionsConfig: inputNumberTemplateOptionsConfig,
  fieldOptionsConfig: {},
  fieldFormData: reactive({
    prop: 'inputNumber',
    default: 0,
  }),
  fieldSchema: fieldTemplateSchema({
    defaultType: 'el-input-number',
    defaultAttrs: { controlsPosition: 'right' },
    required: true,
  }),
  allowCopy: true,
  allowDelete: true,
  activeCollapseItems: ['field', 'component', 'formItem'],
  children: [],
};
