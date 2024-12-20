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
    icon: 'icon-caozuo-pingxingline',
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
    fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-input-number', defaultProps: { controlsPosition: 'right' } }),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
