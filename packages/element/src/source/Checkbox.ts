import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import {
  checkboxTemplateSchema,
  checkboxTemplateOptionsConfig,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  fieldTemplateSchema,
  formItemFormData,
} from '../schemas';

export const defaultCheckboxAttrs = {
  checkbox: [],
  options: [
    { label: '标签1', value: '1', key: uid() },
    { label: '标签2', value: '2', key: uid() },
  ],
  size: 'default',
  textColor: '#ffffff',
  fill: '#409Eff',
  disabled: false,
  min: undefined,
  max: undefined,
};
export const CheckboxTemplateComponent = (key = 'checkbox') => ({
  id: uid(),
  name: '',
  pid: '',
  formItemFormData: reactive({
    ...formItemFormData,
    label: '复选框',
  }),
  formItemTemplateSchema: formItemTemplateSchema,
  formItemOptionsConfig: formItemTemplateOptionsConfig,
  icon: 'i-lightning',
  label: '复选框',
  title: '复选框',
  schema: {
    type: 'checkbox',
    prop: key,
    formItem: { label: '复选框' },
    attrs: {
      size: 'default',
      textColor: '#ffffff',
      fill: '#409Eff',
      disabled: false,
      min: undefined,
      max: undefined,
    },
  },
  templateFormData: reactive({ ...defaultCheckboxAttrs }),
  templateSchema: checkboxTemplateSchema,
  templateOptionsConfig: checkboxTemplateOptionsConfig,
  fieldFormData: reactive({
    prop: key,
    default: [],
    required: false,
  }),
  fieldSchema: fieldTemplateSchema({
    defaultType: 'select',
    defaultAttrs: { multiple: true },
    required: true,
  }),
  fieldOptionsConfig: {
    default: [
      { label: '标签1', value: '1', key: uid() },
      { label: '标签2', value: '2', key: uid() },
    ],
  },
  allowCopy: true,
  allowDelete: true,
  activeCollapseItems: ['field', 'component', 'formItem'],
  children: [],
});
