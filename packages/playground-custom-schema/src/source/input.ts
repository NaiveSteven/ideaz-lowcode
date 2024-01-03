import { reactive } from 'vue';
import { uid } from '@ideal-schema/shared';
import {
  inputTemplateOptionsConfig,
  inputTemplateSchema,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  fieldTemplateSchema,
  formItemFormData,
} from '../schemas';

export const defaultInputAttrs = {
  size: 'default',
  minlength: undefined,
  maxlength: undefined,
  placeholder: '',
  suffixIcon: '',
  prefixIcon: '',
  clearable: true,
  readonly: false,
  disabled: false,
  showWordLimit: false,
  showPassword: false,
};

export const InputTemplateComponent = (key = 'input') => ({
  id: uid(),
  name: '',
  pid: '',
  formItemFormData: reactive({
    ...formItemFormData,
    label: '输入框',
  }),
  formItemTemplateSchema: formItemTemplateSchema,
  formItemOptionsConfig: formItemTemplateOptionsConfig,
  icon: 'i-lightning',
  label: '输入框',
  title: '输入框',
  schema: {
    type: 'input',
    prop: key,
    formItem: { label: '输入框' },
    attrs: {
      size: 'default',
      minlength: undefined,
      maxlength: undefined,
      placeholder: '',
      suffixIcon: '',
      prefixIcon: '',
      clearable: true,
      readonly: false,
      disabled: false,
      showWordLimit: false,
      showPassword: false,
    },
  },
  templateFormData: reactive({ ...defaultInputAttrs }),
  templateSchema: inputTemplateSchema,
  templateOptionsConfig: inputTemplateOptionsConfig,
  fieldOptionsConfig: {},
  fieldFormData: reactive({
    prop: key,
    default: '',
  }),
  fieldSchema: fieldTemplateSchema(),
  allowCopy: true,
  allowDelete: true,
  activeCollapseItems: ['field', 'component', 'formItem'],
  children: [],
});
