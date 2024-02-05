import { uid } from '@ideal-schema/shared'
import {
  dateTemplateOptionsConfig,
  dateTemplateSchema,
  defaultDateAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
} from '../schemas'

export function DateTemplateComponent() {
  const field = uid()
  return {
    id: uid(),
    icon: 'i-calendar',
    title: '日期选择',
    schema: {
      component: 'datepicker',
      field,
      label: '日期选择',
      fieldProps: {
        type: 'date',
        clearable: true,
        disabled: false,
        placeholder: '',
        valueFormat: 'yyyy-MM-dd',
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '日期选择',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultDateAttrs }),
    componentSchema: dateTemplateSchema,
    componentOptionsConfig: dateTemplateOptionsConfig,
    fieldOptionsConfig: {},
    fieldFormData: reactive({
      field,
      default: '',
    }),
    fieldSchema: fieldTemplateSchema(),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
