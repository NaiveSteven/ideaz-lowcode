import { uid } from '@ideal-schema/shared'
import {
  defaultTimeSelectAttrs,
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  timeSelectTemplateOptionsConfig,
  timeSelectTemplateSchema,
} from '../schemas'

export function TimeSelectTemplateComponent() {
  const field = uid()
  return {
    id: uid(),
    icon: 'i-calendar',
    title: '时间选择',
    schema: {
      component: 'el-time-select',
      field,
      label: '时间选择',
      fieldProps: {
        clearable: true,
        disabled: false,
        placeholder: '',
        format: 'HH:mm',
        start: '09:00',
        end: '18:00',
        step: '00:30',
        minTime: '',
        maxTime: '',
        editable: false,
        prefixIcon: 'i-clock',
        clearIcon: 'i-circle-close',
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '时间选择',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultTimeSelectAttrs }),
    componentSchema: timeSelectTemplateSchema,
    componentOptionsConfig: timeSelectTemplateOptionsConfig,
    fieldOptionsConfig: {},
    fieldFormData: reactive({
      field,
      default: '',
    }),
    fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-time-select' }),
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
