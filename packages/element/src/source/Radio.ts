import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import {
  radioTemplateOptionsConfig,
  radioTemplateSchema,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  fieldTemplateSchema,
  formItemFormData,
} from '../schemas';

export const defaultRadioAttrs = {
  radio: '',
  options: [
    { label: '标签1', value: '1', key: uid() },
    { label: '标签2', value: '2', key: uid() },
  ],
  size: 'default',
  textColor: '#ffffff',
  fill: '#409Eff',
  disabled: false,
};

export const RadioTemplateComponent = {
  id: uid(),
  name: '',
  pid: '',
  formItemFormData: reactive({
    ...formItemFormData,
    label: '单选框',
  }),
  formItemTemplateSchema: formItemTemplateSchema,
  formItemOptionsConfig: formItemTemplateOptionsConfig,
  icon: 'i-ice-cream-square',
  label: '单选框',
  title: '单选框',
  schema: {
    type: 'radio',
    prop: 'radio',
    formItem: { label: '单选框' },
    attrs: {
      size: 'default',
      textColor: '#ffffff',
      fill: '#409Eff',
      disabled: false,
    },
  },
  templateFormData: reactive({ ...defaultRadioAttrs }),
  templateSchema: radioTemplateSchema,
  templateOptionsConfig: radioTemplateOptionsConfig,
  fieldFormData: reactive({
    prop: 'radio',
    default: '',
  }),
  fieldSchema: fieldTemplateSchema({ defaultType: 'select', required: true }),
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
};
