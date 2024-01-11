import { reactive } from 'vue'
import { uid } from '@ideal-schema/shared'
import {
  dateRangeTemplateOptionsConfig,
  dateRangeTemplateSchema,
  defaultDateRangeAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
} from '../schemas'

export function DateRangeTemplateComponent() {
  return {
    id: uid(),
    icon: 'i-calendar',
    title: '日期范围',
    schema: {
      component: 'datepicker',
      field: 'datepicker',
      label: '日期范围',
      fieldProps: {
        component: 'daterange',
        clearable: true,
        disabled: false,
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'yyyy-MM-dd',
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '日期范围',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultDateRangeAttrs }),
    componentSchema: dateRangeTemplateSchema,
    componentOptionsConfig: dateRangeTemplateOptionsConfig,
    fieldOptionsConfig: {},
    fieldFormData: reactive({
      field: 'datepicker',
      default: [],
    }),
    fieldSchema: fieldTemplateSchema(),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
