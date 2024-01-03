import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import {
  selectTemplateOptionsConfig,
  selectTemplateSchema,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  fieldTemplateSchema,
  formItemFormData,
} from '../schemas';

export const defaultSelectAttrs = {
  options: [
    { label: '标签1', value: '1', key: uid() },
    { label: '标签2', value: '2', key: uid() },
  ],
  select: '', // key 为 prop值
  size: 'default',
  placeholder: '',
  popperClass: '',
  clearable: true,
  disabled: false,
  filterable: true,
};

export const SelectTemplateComponent = (key = 'select') => ({
  id: uid(),
  name: '',
  pid: '',
  formItemFormData: reactive({
    ...formItemFormData,
    label: '选择框',
  }),
  formItemTemplateSchema: formItemTemplateSchema,
  formItemOptionsConfig: formItemTemplateOptionsConfig,
  icon: 'i-bicycle',
  label: '选择框',
  title: '选择框',
  schema: {
    type: 'select',
    prop: key,
    formItem: { label: '选择框' },
    attrs: {
      size: 'default',
      placeholder: '',
      popperClass: '',
      clearable: true,
      disabled: false,
      filterable: true,
    },
  },
  templateFormData: reactive({ ...defaultSelectAttrs }),
  templateSchema: selectTemplateSchema,
  templateOptionsConfig: selectTemplateOptionsConfig,
  fieldFormData: reactive({
    prop: key,
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
});
