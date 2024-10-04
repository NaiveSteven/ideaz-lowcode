import { uid } from '@ideal-schema/shared'
import {
  defaultTimePickerAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  timePickerTemplateOptionsConfig,
  timePickerTemplateSchema,
} from '../schemas'

export function TimePickerTemplateComponent() {
  const field = uid()
  return {
    id: uid(),
    icon: 'icon-shijianxuanze1',
    title: '时间选择器',
    schema: {
      component: 'el-time-picker',
      field,
      label: '时间选择器',
      fieldProps: {
        clearable: true,
        disabled: false,
        placeholder: '',
        format: 'HH:mm:ss',
        valueFormat: 'HH:mm:ss',
        arrowControl: false,
        editable: false,
        prefixIcon: 'i-clock',
        clearIcon: 'i-circle-close',
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '时间选择器',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultTimePickerAttrs }),
    componentSchema: timePickerTemplateSchema,
    componentOptionsConfig: timePickerTemplateOptionsConfig,
    fieldOptionsConfig: {},
    fieldFormData: reactive({
      field,
      default: '',
    }),
    fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-time-picker', defaultProps: { valueFormat: 'HH:mm:ss', format: 'HH:mm:ss', placeholder: '请选择默认时间' } }),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
