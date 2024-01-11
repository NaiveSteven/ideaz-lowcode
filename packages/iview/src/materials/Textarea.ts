import { reactive } from 'vue'
import { uid } from '@ideal-schema/shared'
import {
  defaultTextareaAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  textareaTemplateSchema,
} from '../schemas'

export function TextareaTemplateComponent(key = 'textarea') {
  return {
    id: uid(),
    icon: 'i-coin',
    title: '多行输入',
    schema: {
      component: 'input',
      field: key,
      label: '多行输入',
      fieldProps: {
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
    formItemFormData: reactive({
      ...formItemFormData,
      label: '多行输入',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultTextareaAttrs }),
    componentSchema: textareaTemplateSchema,
    componentOptionsConfig: {},
    fieldFormData: reactive({
      field: key,
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
