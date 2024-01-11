import { reactive } from 'vue'
import { uid } from '@ideal-schema/shared'
import {
  fieldTemplateSchema,
  formItemFormData,
  formItemTemplateOptionsConfig,
  formItemTemplateSchema,
  switchTemplateSchema,
} from '../schemas'

export const defaultSwitchAttrs = {
  width: 40,
  activeText: undefined,
  inactiveText: undefined,
  disabled: false,
}

export function SwitchTemplateComponent(key = 'switch') {
  return {
    id: uid(),
    icon: 'i-cpu',
    title: '开关',
    schema: {
      component: 'el-switch',
      field: key,
      label: '开关',
      fieldProps: {
        width: 40,
        activeText: undefined,
        inactiveText: undefined,
        disabled: false,
      },
    },
    formItemFormData: reactive({
      ...formItemFormData,
      label: '开关',
    }),
    formItemTemplateSchema,
    formItemOptionsConfig: formItemTemplateOptionsConfig,
    componentFormData: reactive({ ...defaultSwitchAttrs }),
    componentSchema: switchTemplateSchema,
    componentOptionsConfig: {},
    fieldFormData: reactive({
      field: key,
      default: false,
    }),
    fieldSchema: fieldTemplateSchema({ defaultComponent: 'el-switch', required: true }),
    fieldOptionsConfig: {},
    allowCopy: true,
    allowDelete: true,
    activeCollapseItems: ['field', 'component', 'formItem'],
    children: [],
  }
}
