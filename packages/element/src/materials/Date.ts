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
    icon: 'icon-riqi',
    title: '日期选择',
    schema: {
      component: 'el-date-picker',
      field,
      label: '日期选择',
      fieldProps: {
        type: 'date',
        clearable: true,
        disabled: false,
        placeholder: '',
        valueFormat: 'YYYY-MM-DD',
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
    fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-date-picker', defaultProps: { type: 'date', valueFormat: 'YYYY-MM-DD', placeholder: '请选择默认日期' } }),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
