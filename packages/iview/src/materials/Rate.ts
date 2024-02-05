import { uid } from '@ideal-schema/shared'
import {
  defaultRateAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  rateTemplateOptionsConfig,
  rateTemplateSchema,
} from '../schemas'

export function RateTemplateComponent() {
  const field = uid()
  return {
    id: uid(),
    icon: 'i-calendar',
    title: '评分',
    schema: {
      component: 'el-rate',
      field,
      label: '评分',
      fieldProps: {},
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '评分',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultRateAttrs }),
    componentSchema: rateTemplateSchema,
    componentOptionsConfig: rateTemplateOptionsConfig,
    fieldOptionsConfig: {},
    fieldFormData: reactive({
      field,
      default: 0,
    }),
    fieldSchema: fieldTemplateSchema(),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
