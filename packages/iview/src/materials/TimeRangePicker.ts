import { uid } from '@ideal-schema/shared'
import {
  defaultTimeRangePickerAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema, timeRangePickerTemplateOptionsConfig,
  timeRangePickerTemplateSchema
} from '../schemas'

export function TimeRangePickerTemplateComponent() {
  const field = uid()
  return {
    id: uid(),
    icon: 'i-calendar',
    title: '时间范围选择器',
    schema: {
      component: 'el-time-picker',
      field,
      label: '时间范围',
      fieldProps: {
        isRange: true,
        clearable: true,
        disabled: false,
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        format: 'HH:mm:ss',
        valueFormat: 'HH:mm:ss',
        arrowControl: false,
        editable: true,
        prefixIcon: 'i-clock',
        clearIcon: 'i-circle-close',
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '时间范围选择器',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultTimeRangePickerAttrs }),
    componentSchema: timeRangePickerTemplateSchema,
    componentOptionsConfig: timeRangePickerTemplateOptionsConfig,
    fieldOptionsConfig: {},
    fieldFormData: reactive({
      field,
      default: [],
    }),
    fieldSchema: fieldTemplateSchema(),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
