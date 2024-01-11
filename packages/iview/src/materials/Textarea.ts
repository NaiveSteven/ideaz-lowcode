import { reactive } from 'vue'
import { uid } from '@ideal-schema/shared'
import {
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  textareaTemplateSchema,
} from '../schemas'

export const defaultTextareaAttrs = {
  type: 'textarea',
  rows: 2,
  minlength: undefined,
  maxlength: undefined,
  placeholder: '',
  suffixIcon: '',
  prefixIcon: '',
  clearable: true,
  readonly: false,
  disabled: false,
  showWordLimit: false,
  autosize: false,
}

export function TextareaTemplateComponent(key = 'textarea') {
  return {
    id: uid(),
    name: '',
    pid: '',
    formItemFormData: reactive({
      ...formItemFormData,
      label: '多行输入',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    icon: 'i-coin',
    label: '多行输入',
    title: '多行输入',
    schema: {
      type: 'input',
      prop: key,
      formItem: { label: '多行输入' },
      attrs: {
        type: 'textarea',
        rows: 2,
        minlength: undefined,
        maxlength: undefined,
        placeholder: '',
        suffixIcon: '',
        prefixIcon: '',
        clearable: true,
        readonly: false,
        disabled: false,
        showWordLimit: false,
        autosize: false,
      },
    },
    templateFormData: reactive({ ...defaultTextareaAttrs }),
    templateSchema: textareaTemplateSchema,
    templateOptionsConfig: {},
    fieldFormData: reactive({
      prop: key,
      default: '',
    }),
    fieldSchema: fieldTemplateSchema(),
    fieldOptionsConfig: {},
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
