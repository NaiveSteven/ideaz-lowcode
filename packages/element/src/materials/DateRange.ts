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

export function DateRangeTemplateComponent(): WorkspaceComponentItem {
  const field = uid()
  return {
    id: uid(),
    icon: 'icon-riqiqujian',
    title: '日期范围',
    schema: {
      component: 'datepicker',
      field,
      label: '日期范围',
      fieldProps: {
        type: 'daterange',
        clearable: true,
        disabled: false,
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD',
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
      field,
      default: [],
    }),
    fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-date-picker', defaultProps: { type: 'daterange', valueFormat: 'YYYY-MM-DD', startPlaceholder: '开始日期', endPlaceholder: '结束日期' } }),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
