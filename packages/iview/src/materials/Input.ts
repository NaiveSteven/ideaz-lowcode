import { uid } from '@ideal-schema/shared'
import {
  defaultInputAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  inputTemplateOptionsConfig,
  inputTemplateSchema,
} from '../schemas'

export function InputTemplateComponent(key = 'input') {
  return {
    id: uid(),
    icon: 'i-lightning',
    title: '输入框',
    schema: {
      component: 'input',
      field: key,
      label: '输入框',
      fieldProps: {
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
    formItemFormData: reactive({
      ...formItemFormData,
      label: '输入框',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultInputAttrs }),
    componentSchema: inputTemplateSchema,
    componentOptionsConfig: inputTemplateOptionsConfig,
    fieldOptionsConfig: {},
    fieldFormData: reactive({
      field: key,
      default: '',
    }),
    fieldSchema: fieldTemplateSchema(),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
