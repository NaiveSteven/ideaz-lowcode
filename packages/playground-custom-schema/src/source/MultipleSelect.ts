import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import {
  multipleSelectTemplateOptionsConfig,
  multipleSelectTemplateSchema,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  fieldTemplateSchema,
  formItemFormData,
} from '../schemas';

export const defaultMultipleSelectAttrs = {
  multipleSelect: [],
  options: [
    { label: '标签1', value: '1', key: uid() },
    { label: '标签2', value: '2', key: uid() },
  ],
  multiple: true,
  size: 'default',
  placeholder: '',
  popperClass: '',
  clearable: true,
  disabled: false,
  filterable: true,
  collapseTags: false,
  multipleLimit: 0,
};

export const MultipleSelectTemplateComponent = {
  id: uid(),
  name: '',
  pid: '',
  formItemFormData: reactive({
    ...formItemFormData,
    label: '多选框',
  }),
  formItemTemplateSchema: formItemTemplateSchema,
  formItemOptionsConfig: formItemTemplateOptionsConfig,
  icon: 'i-magic-stick',
  label: '多选框',
  title: '多选框',
  schema: {
    type: 'select',
    prop: 'multipleSelect',
    formItem: { label: '多选框' },
    attrs: {
      multiple: true,
      size: 'default',
      placeholder: '',
      popperClass: '',
      clearable: true,
      disabled: false,
      filterable: true,
      collapseTags: false,
      multipleLimit: 0,
    },
  },
  templateFormData: reactive({ ...defaultMultipleSelectAttrs }),
  templateSchema: multipleSelectTemplateSchema,
  templateOptionsConfig: multipleSelectTemplateOptionsConfig,
  fieldFormData: reactive({
    prop: 'multipleSelect',
    default: [],
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
};
